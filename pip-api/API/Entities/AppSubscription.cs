using API.Common.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppSubscription
    {
        public AppSubscription( Guid userId, SubscriptionDuration duration, string createdBy)
        {
            Id = Guid.NewGuid();
            UserId = userId;
            Status = SubscriptionStatus.PendingStart;
            Duration = duration;
            StartDate = DateTime.MinValue;
            EndDate = DateTime.MinValue;
            CreatedBy = createdBy;
            CreationDate = DateTime.UtcNow;
        }

        [Key, Column(Order = 1)]
        public Guid Id { get; set; }

        [Key, Column(Order = 2)]
        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public AppUser User { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreationDate { get; set; }
        public SubscriptionStatus Status { get; set; } 
        public SubscriptionDuration Duration { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public void StartSubscription()
        {
            StartDate = DateTime.UtcNow;
            EndDate = StartDate.AddMonths((int)Duration);
            Status = SubscriptionStatus.Active;
        }             
    }
}
