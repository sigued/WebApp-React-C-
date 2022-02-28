using API.Common.Enums;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUserService
    {
        Task<bool> EditRoles(AppUser user, string role);
        Task<IEnumerable<MemberDto>> getUsersWithRoles();
        Task<AppUser> CreateMember(SubscriptionCreationDto subscriptionCreationDto);
        Task<bool> IsCreatedByAdmin(SubscriptionCreationDto subscriptionCreationDto);
        Task<AppUser> RegisterMemberAsync(RegisterDto registerDto);
        Task<bool> UpdateStatusAsync(Guid userId, AppUserStatus status);
        Task<bool> DeleteUserAsync(string userId);
        Task <AppUser> UpdateMember(SubscriptionCreationDto subscriptionDto);
        Task<AppUser> GetActiveUser(LoginDto loginDto);
        Task<IdentityResult> AddRoleToUser(AppUser user, SubscriptionCreationDto subscriptionCreationDto);
    }
}
