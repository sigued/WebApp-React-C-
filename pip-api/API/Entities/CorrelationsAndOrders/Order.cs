using API.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.CorrelationsAndOrders
{
    public class Order
    {
        public Order() { }

        public Order(Guid userId, DateTime creationDate, string parameterList, OrderStatus status)
        {
            Id = Guid.NewGuid();
            UserId = userId;
            CreationDate = creationDate;
            ParameterList = parameterList;
            Status = status;
        }

        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreationDate { get; set; }
        public string ParameterList { get; set; }
        public OrderStatus Status { get; set; }
        public string PdfPath { get; set; }
    }
}
