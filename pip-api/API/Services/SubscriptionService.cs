using API.Common.Enums;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Services
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly ISubscriptionRepository _subscriptionRepo;

        public SubscriptionService(ISubscriptionRepository subscriptionRepo)
        {
            _subscriptionRepo = subscriptionRepo;
        }

        public async Task<bool> CreateSubscription(AppUser user, SubscriptionCreationDto subscriptionCreationDto)
        {
            var subscription = new AppSubscription(user.Id, subscriptionCreationDto.Duration, subscriptionCreationDto.CreatedBy);
            return await _subscriptionRepo.AddSubscription(subscription);
        }

        public async Task<bool> StartSubscription(Guid userId)
        {
            var subscription = await _subscriptionRepo.GetSubscriptionByUserId(userId);
            subscription.StartSubscription();
            return await _subscriptionRepo.Update(subscription);
        }

        public async Task<bool> UpdateSubscription(Guid userId, SubscriptionCreationDto subscriptionCreationDto)
        {
            var subscription = await _subscriptionRepo.GetSubscriptionByUserId(userId);
            subscription.Duration = subscriptionCreationDto.Duration;
            subscription.StartSubscription();
            return await _subscriptionRepo.Update(subscription);
        }

        public async Task<bool> UpdateSubscriptionStatusAsync(Guid userId, SubscriptionStatus status)
        {
            var subscription = await _subscriptionRepo.GetSubscriptionByUserId(userId);
            subscription.Status = status;
            return await _subscriptionRepo.Update(subscription);
        }

        public async Task<bool> DeleteSubscriptionStatusAsync(string userId)
        {
            var subscription = await _subscriptionRepo.GetSubscriptionByUserId(new Guid(userId));
            return await _subscriptionRepo.Delete(subscription);
        }

        public async Task<IEnumerable<InvitationDto>> GetInvitations()
        {
            var subscriptions = await _subscriptionRepo.GetInvitations();
            return subscriptions;
        }

        public async Task<bool> IsSubscriptionValid(Guid userId)
        {
            var subscription = await _subscriptionRepo.GetSubscriptionByUserId(userId);
            if (subscription.EndDate >= DateTime.UtcNow)
            {
                if (await UpdateSubscriptionStatusAsync(userId, SubscriptionStatus.Expired))
                    return false;
            }
            if (subscription.Status == SubscriptionStatus.Active)
                return true;

            return false;
        }

    }
}
