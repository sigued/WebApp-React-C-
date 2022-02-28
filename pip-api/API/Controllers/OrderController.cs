using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class OrderController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IOrderProcessService _orderProcessService;
        private readonly IParameterService _parameterService;

        public OrderController(IOrderService orderService, IOrderProcessService orderProcessService, IParameterService parameterService)
        {
            _orderService = orderService;
            _orderProcessService = orderProcessService;
            _parameterService = parameterService;
        }

        //[Authorize(Policy = "RequireMemberRole")]
        [HttpPost("add-order")]
        public async Task<ActionResult> AddOrder(NewOrderDto order)
        {
            var res = await _orderService.AddNewOrder(order);
            await _orderProcessService.Process();
            if (res)
                return Ok("Order successfully created");
            return StatusCode(500);
        }

        [Authorize(Policy = "RequireMemberRole")]
        [HttpGet("{uid}")]
        public async Task<ActionResult<ICollection<OrderDto>>> GetUserOrders(string uid)
        {
            try
            {
                var res = await _orderService.GetAllUserOrders(Guid.Parse(uid));
                return res.ToList();
            }
            catch(Exception e)
            {
                Debug.WriteLine(e.Message);
                return StatusCode(500);
            }
        }

        [Authorize(Policy = "RequireMemberRole")]
        [HttpGet("get-parameters")]
        public async Task<ActionResult<ICollection<ParametersToClientDto>>> GetAllParameters()
        {
            try
            {
                var res = await _parameterService.GetAll();
                return res.ToList();
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
                return StatusCode(500);
            }
        }

        [Authorize(Policy = "RequireMemberRole")]
        [HttpGet("download/{orderId}")]
        public async Task<ActionResult> downloadPdfResult(string orderId)
        {
            try
            {
                var path = await _orderService.GetPathFileToDownload(orderId);
                var bytes = await System.IO.File.ReadAllBytesAsync(path);

                return File(bytes, GetContentType(path), "ResultatRapport.pdf");
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
                return StatusCode(500);
            }
        }

        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();

            if (!provider.TryGetContentType(path, out string contentType))
                contentType = "application/octet-stream";
            return contentType;
        }
    }
}
