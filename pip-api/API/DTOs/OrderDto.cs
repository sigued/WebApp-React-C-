using API.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderDto
    {

        public OrderDto(Guid id, Guid userId, DateTime creationDate, ICollection<ParameterDto> parameterList, OrderStatus status)
        {
            Id = id;
            UserId = userId;
            CreationDate = creationDate;
            ParameterList = parameterList;
            Status = status;
        }

        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreationDate { get; set; }
        public ICollection<ParameterDto> ParameterList { get; set; }
        public OrderStatus Status { get; set; }
    }
}
