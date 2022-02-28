using API.Common.Enums;
using API.DTOs;
using API.Entities;
using API.Entities.CorrelationsAndOrders;
using API.Interfaces;
using API.Pdf;
using API.Services.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Services
{
    public class OrderProcessService : IOrderProcessService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICorrelationRepository _correlationRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IParameterRepository _parameterRepository;
        private readonly IReportPdfService _reportPdfService;
        private readonly PythonHelper _pythonHelper;


        public OrderProcessService(IOrderRepository orderRepository, ICorrelationRepository correlationRepository, IParameterRepository parameterRepository, 
            UserManager<AppUser> userManager, IReportPdfService reportPdfService)
        {
            _orderRepository = orderRepository;
            _correlationRepository = correlationRepository;
            _parameterRepository = parameterRepository;
            _userManager = userManager;
            _reportPdfService = reportPdfService;
            _pythonHelper = new PythonHelper();
        }

        public async Task Process()
        {
            var orders = await _orderRepository.GetAll();
            foreach (var o in orders)
            {
                if (o.Status == OrderStatus.Pendig)
                    await GenerateResult(o);
            }
            
        }

        private async Task GenerateResult(Order order)
        {
            await UpdateOrderStatus(order, OrderStatus.Processing);

            var userInputs = JsonSerializer.Deserialize<ICollection<ParameterDto>>(order.ParameterList);
            var pdfContent = await CreatePdfContentModel(userInputs, order);
            var selectedCorr = await SelectCorrelations(userInputs);

            var res = await Calculate(selectedCorr, pdfContent);
            await UpdateOrderStatus(order, (res) ? OrderStatus.Completed : OrderStatus.Error);
            pdfContent.OrderInfos.Status = order.Status.ToString();
            _reportPdfService.Export(pdfContent);

        }

        private async Task UpdateOrderStatus(Order order, OrderStatus status)
        {
            order.Status = status;
            await _orderRepository.Update(order);
        }

        private async Task<PdfContentModel> CreatePdfContentModel(ICollection<ParameterDto> userInputs, Order order)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == order.UserId);
            var userInfos = new PdfUserInformationsModel(user.Id, user.UserName, user.Email);
            var orderInfos = new PdfOrderInfoModel(order.Id, order.CreationDate, order.Status.ToString());
            var userInputList = new List<PdfParameterModel>();

            foreach(var i in userInputs)
                userInputList.Add(new PdfParameterModel(i.Category, i.Symbole, i.Name, i.Unit, i.Value));

            var correlations = new List<PdfCorrelationResultModel>();
            var pdfContentModel = new PdfContentModel(userInfos, orderInfos, userInputList, correlations);

            return pdfContentModel;
        }

        private async Task<ICollection<Correlation>> SelectCorrelations(ICollection<ParameterDto> userInputs)
        {
            var correlations = await _correlationRepository.GetAll();
            var selectedCorrelations = new List<Correlation>();
            foreach (var cor in correlations)
            {
                var parameters = cor.InputsList.Select(x => { return x.Id; });
                var parUser = userInputs.Select(x => { return x.Id; });
                if (parameters.Intersect(parUser).Count() == parameters.Count())
                    selectedCorrelations.Add(cor);
            }

            return selectedCorrelations;
        }

        private async Task<bool> Calculate(ICollection<Correlation> correlations, PdfContentModel pdfContent)
        {
            foreach (var cor in correlations)
            {
                var output = await CreatePdfParameterModel(cor.OutputId);
                var inputList = CreatePdfInputList(cor.InputsList);

                if (cor.Type == CorrelationType.Equation)
                {
                    if (!AddEquationsToPdfContent(pdfContent, cor, inputList, output)) return false;
                }
                else
                    AddAbaqueToPdfContent(pdfContent, cor, inputList, output);
            }
            return true;
        }

        private bool AddEquationsToPdfContent(PdfContentModel pdfContent, Correlation cor, ICollection<PdfParameterModel> inputList, PdfParameterModel output)
        {
            var listEquationResult = new List<PdfEquationResultModel>();
            foreach (var e in cor.Equations)
            {
                var resultString = CalculateEquation(e, pdfContent.UserInputList);
                try
                {
                    listEquationResult.Add(new PdfEquationResultModel(e.equation, e.Applicability, e.Reference, ParseResult(resultString), output.Unit));
                }
                catch
                {
                    Debug.WriteLine($"Synthax erreur dans la formule {resultString}");
                    return false;
                }
            }
            pdfContent.Correlations.Add(new PdfCorrelationResultModel(inputList, output, cor.Type, listEquationResult, null, cor.Description));
            return true;
        }

        private void AddAbaqueToPdfContent(PdfContentModel pdfContent, Correlation cor, ICollection<PdfParameterModel> inputList, PdfParameterModel output)
        {
            var listAbaque = new List<PdfAbaqueModel>();
            foreach (var a in cor.Abaques)
                listAbaque.Add(new PdfAbaqueModel(a.Title, a.Path));
            pdfContent.Correlations.Add(new PdfCorrelationResultModel(inputList, output, cor.Type, null, listAbaque, cor.Description));
        }

        private double ParseResult(string evalResult)
        {
            double resultDouble = double.Parse(evalResult);
            return Math.Round(resultDouble, 3);
        }

        private async Task<PdfParameterModel> CreatePdfParameterModel(Guid outputId )
        {
            var corOutput = await _parameterRepository.GetById(outputId);
            return new PdfParameterModel(corOutput.Category, corOutput.Symbole, corOutput.Name, corOutput.Unit, 0);
        }

        private ICollection<PdfParameterModel> CreatePdfInputList(ICollection<Parameter> corInputList)
        {
            var inputsList = new List<PdfParameterModel>();
            foreach (var i in corInputList)
                inputsList.Add(new PdfParameterModel(i.Category, i.Symbole, i.Name, i.Unit, 0));
            return inputsList;
        }

        private string CalculateEquation(Equation r, ICollection<PdfParameterModel> userInputs)
        {
            var equation = r.equation;
            foreach (var p in userInputs)
                equation = equation.Replace(p.Symbole, p.Value.ToString());

            return (string)_pythonHelper.CallFunction("evalFunc", equation);
        }

    }
}
