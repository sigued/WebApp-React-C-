using API.Common.Enums;
using API.DTOs;
using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IAccountService
    {
        Task<bool> CreateAccountAsync(SubscriptionCreationDto subscriptionCreationDto);
        Task<AppUser> ValidateEmailLink(string guid);
        Task<bool> RegisterAccount(RegisterDto registerDto);
        Task<bool> UpdateAccountAsync(SubscriptionCreationDto subscriptionDto);
        Task<bool> CancelAccountAsync(Guid userId);
        Task<bool> DeleteAccountAsync(string userId, bool isAdmin);
        Task<IEnumerable<MemberDto>> GetUsers();
        Task<IEnumerable<InvitationDto>> GetInvitations();
    }
}
