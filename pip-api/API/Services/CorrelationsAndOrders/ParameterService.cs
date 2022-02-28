using API.DTOs;
using API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Services
{
    public class ParameterService : IParameterService
    {
        private readonly IParameterRepository _parameterRepository;
        public ParameterService(IParameterRepository parameterRepository)
        {
            _parameterRepository = parameterRepository;
        }

        public async Task<ICollection<ParametersToClientDto>> GetAll()
        {
            var parameters = await _parameterRepository.GetAll();
            var CategoryList = parameters.Select(p => p.Category).Distinct().ToList();
            var ParametersToClientDto = new List<ParametersToClientDto>();

            foreach (var c in CategoryList)
                ParametersToClientDto.Add(new ParametersToClientDto(c, new List<ParameterDto>()));

            foreach (var p in parameters)
                ParametersToClientDto[CategoryList.FindIndex(c => c == p.Category)].ParameterList.Add(new ParameterDto(p.Id, p.Category, p.Symbole, p.Name, p.Unit, p.Value));
            
            return ParametersToClientDto;
        }
    }
}
