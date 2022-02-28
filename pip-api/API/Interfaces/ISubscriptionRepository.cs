using API.DTOs;
using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ISubscriptionRepository
    {
        Task<AppSubscription> GetSubscriptionById(Guid id);
        Task<AppSubscription> GetSubscriptionByUserId(Guid id);
        Task<bool> AddSubscription(AppSubscription subscription);
        Task<IEnumerable<AppSubscription>> GetAllSubscriptions();
        Task<bool> Update(AppSubscription subscription);
        Task<bool> Delete(AppSubscription subscription);
        Task<IEnumerable<InvitationDto>> GetInvitations();

    }
}
