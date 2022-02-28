using API.Common.Enums;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly ISubscriptionService _subscriptionService;

        public UserService(UserManager<AppUser> userManager, IUserRepository userRepository, ISubscriptionService subscriptionService)
        {
            _userManager = userManager;
            _userRepository = userRepository;
            _subscriptionService = subscriptionService;
        }

        public async Task<bool> EditRoles(AppUser user, string role)
        {

            if (await _userManager.IsInRoleAsync(user, role))
                return true;
            
            if (role.ToLower() == AppRolesType.sadmin.ToString())
            {
                var res = await _userManager.AddToRoleAsync(user, AppRolesType.admin.ToString());
                
                if (!res.Succeeded) return false;
            }

            var result = await _userManager.AddToRoleAsync(user, role);

            if (!result.Succeeded) return false;

            return true;
        }

        public async Task<IEnumerable<MemberDto>> getUsersWithRoles()
        {
            var members = await _userRepository.GetMembersAsync();
            return members;
        }

        public async Task<AppUser> CreateMember(SubscriptionCreationDto subscriptionCreationDto)
        {
            var user = new AppUser();
            var result = await _userManager.CreateAsync(user, "Pa$$w0rd");

            if (result.Succeeded)
            {
                result = await AddRoleToUser(user, subscriptionCreationDto);
                if (result.Succeeded)
                {
                    if (await IsCreatedByAdmin(subscriptionCreationDto)) return user;
                }
            }

            return null;
        }

        public async Task<bool> IsCreatedByAdmin(SubscriptionCreationDto subscriptionCreationDto)
        {
            var admin = await _userManager.FindByNameAsync(subscriptionCreationDto.CreatedBy);
            var role = subscriptionCreationDto.Role.ToLower();


            if (admin != null)
            {
                if(role == AppRolesType.member.ToString())
                    return await _userManager.IsInRoleAsync(admin, AppRolesType.admin.ToString());

                if (role == AppRolesType.admin.ToString() || role == AppRolesType.sadmin.ToString())
                    return await _userManager.IsInRoleAsync(admin, AppRolesType.sadmin.ToString());

            }
            return false;
        }

        public async Task<AppUser> RegisterMemberAsync(RegisterDto registerDto)
        {
            //TODO: modifier status actif
            //TODO: regarder logique
            var user = await _userManager.FindByIdAsync(registerDto.Id.ToString());
            user.UserName = registerDto.Username;
            user.Email = registerDto.Email;
            user.Status = AppUserStatus.Active;
            var res = await _userManager.UpdateAsync(user);
            if (res.Succeeded) return user;

            return null;

        }

        public async Task<bool> DeleteUserAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return false;

            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded) return true;

            return false;

        }


        public async Task<bool> UpdateStatusAsync(Guid userId, AppUserStatus status)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) return false;
            
            user.Status = status;
            var result = await _userManager.UpdateAsync(user);
            
            if (result.Succeeded) return true;
            
            return false;

        }


        //TODO: methode trop complexe
        public async Task<AppUser> UpdateMember(SubscriptionCreationDto subscriptionDto)
        {
            var user = await _userManager.FindByEmailAsync(subscriptionDto.Email);
            if (user != null)
            {
                user.Status = AppUserStatus.Active;
                if (await EditRoles(user, subscriptionDto.Role))
                {
                    var result = await _userManager.UpdateAsync(user);

                    if (result.Succeeded)
                    {
                        if (await IsCreatedByAdmin(subscriptionDto)) return user;
                    }
                }


                
            }
            return null;
        }

        public async Task<AppUser> GetActiveUser(LoginDto loginDto)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user != null)
            {
                if (await _userManager.IsInRoleAsync(user, AppRolesType.admin.ToString()) || await _userManager.IsInRoleAsync(user, AppRolesType.sadmin.ToString()))
                    return user;

                if(await _subscriptionService.IsSubscriptionValid(user.Id))
                    return user;
                user.Status = AppUserStatus.Inactive;
                var res = await _userManager.UpdateAsync(user);

                if (res.Succeeded) return null;
            }    
            return null;
        }

        public async Task<IdentityResult> AddRoleToUser(AppUser user, SubscriptionCreationDto subscriptionCreationDto)
        {
            var role = subscriptionCreationDto.Role.ToLower();

            if (role == AppRolesType.sadmin.ToString())
            {
                return await _userManager.AddToRolesAsync(user, new[] { AppRolesType.sadmin.ToString(), AppRolesType.admin.ToString(), AppRolesType.member.ToString() });
            }

            if (role == AppRolesType.admin.ToString())
            {
                return await _userManager.AddToRolesAsync(user, new[] { AppRolesType.admin.ToString(), AppRolesType.member.ToString() });
            }

            return await _userManager.AddToRoleAsync(user, AppRolesType.member.ToString());
            
        }



    }
}
