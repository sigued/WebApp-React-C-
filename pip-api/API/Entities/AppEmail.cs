using API.Common.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppEmail
    {
        public AppEmail() { }
        public AppEmail( AppEmailType type, Guid receiverUserId, string receiverEmail, string description,
                         string url)
        {
            Id = Guid.NewGuid();
            Type = type;
            ReceiverUserId = receiverUserId;
            ReceiverEmail = receiverEmail;
            Status = AppEmailStatus.PendingUse;
            Description = description;
            Url = new Uri($"{url}/{Id.ToString()}");
            CreationDate = DateTime.UtcNow;
            SetEndDate();
        }

        public Guid Id { get; set; }
        public AppEmailType Type { get; set;} 
        public Guid ReceiverUserId { get; set; }

        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string ReceiverEmail { get; set; }
        public AppEmailStatus Status { get; set; }
        public string Description { get; set; }
        public Uri Url { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime EndDate { get; set; }

        public void SetEndDate()
        {
            switch(Type)
            {
                case AppEmailType.AccountCreation:
                    EndDate = CreationDate.AddDays(7);
                    break;
                default:
                    break;
            }
               
        }
    }
}
