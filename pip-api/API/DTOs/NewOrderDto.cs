using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class NewOrderDto
    {
        public NewOrderDto(ICollection<ParameterDto> parameters, Guid userId)
        {
            Parameters = parameters;
            UserId = userId;
        }

        public ICollection<ParameterDto> Parameters { get; set; }
        public Guid UserId { get; set; }

    }
}
