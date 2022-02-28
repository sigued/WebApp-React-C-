using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ParametersToClientDto
    {
        public ParametersToClientDto(string category, ICollection<ParameterDto> parameterList)
        {
            Category = category;
            ParameterList = parameterList;
        }

        public string Category { get; set; }
        public ICollection<ParameterDto> ParameterList { get; set; }
    }
}
