using API.Common.Enums;
using API.DTOs;
using API.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ISubscriptionService
    {
        Task<bool> StartSubscription(Guid userId);
        Task<bool> UpdateSubscriptionStatusAsync(Guid userId, SubscriptionStatus status);
        Task<bool> DeleteSubscriptionStatusAsync(string userId);
        Task<bool> CreateSubscription(AppUser user, SubscriptionCreationDto subscriptionCreationDto);
        Task<bool> UpdateSubscription(Guid id, SubscriptionCreationDto subscriptionDto);
        Task<IEnumerable<InvitationDto>> GetInvitations();
        Task<bool> IsSubscriptionValid(Guid userId);

    }
}
