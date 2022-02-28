using API.Common.Enums;
using System;

namespace API.DTOs
{
    public class EmailDto
    {
        public Guid Id { get; set; }
        public AppEmailType Type { get; set; }
        public Guid ReceiverUserId { get; set; }
        public string ReceiverEmail { get; set; }
        public AppEmailStatus Status { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
