using API.Common.Enums;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static API.Common.Constants.Constants;

namespace API.Services
{
    public class AccountService : IAccountService
    {
        private readonly IEmailService _emailService;
        private readonly IUserService _memberService;
        private readonly ISubscriptionService _subscriptionService;

        public AccountService(IEmailService emailService, IUserService memberService, ISubscriptionService subscriptionService)
        {
            _emailService = emailService;
            _memberService = memberService;
            _subscriptionService = subscriptionService;
        }

        // a renommer ceate account
        public async Task<bool> CreateAccountAsync(SubscriptionCreationDto subscriptionCreationDto)
        {
            //TODO: trouver une solution pour le password
            var user = await _memberService.CreateMember(subscriptionCreationDto);

            if (await _subscriptionService.CreateSubscription(user, subscriptionCreationDto))
                return await _emailService.CreateAndSendEmail(user, subscriptionCreationDto);
            return false;
        }

        public async Task<AppUser> ValidateEmailLink(string guid)
        {
            //TODO: regarder logique => fonction modifie par sid 
            return await _emailService.ValidateAccountCreationEmail(guid);

        }


        public async Task<bool> RegisterAccount(RegisterDto registerDto)
        {
            //TODO: modifier status actif
            //TODO: regarder logique
            var user = await _memberService.RegisterMemberAsync(registerDto);
            //res = await _userManager.ChangePasswordAsync(user, "Pa$$w0rd", registerDto.Password);
            //if (!res.Succeeded)
            //    return false;
            if (user != null) 
            {
                if (await _subscriptionService.StartSubscription(user.Id)) 
                    return await _emailService
                        .CreateAndSendConfirmationEmail(user, EmailMessages.AccountCreactionSubject, EmailMessages.AccountCreationMsg);
            }
            return false;
        }

        public async Task<bool> CancelAccountAsync(Guid userId)
        {
            if (await _memberService.UpdateStatusAsync(userId, AppUserStatus.Inactive))
                return await _subscriptionService.UpdateSubscriptionStatusAsync(userId, SubscriptionStatus.Blocked);
            return false;
        }

        public async Task<bool> DeleteAccountAsync(string userId, bool isAdmin)
        {
            if (!isAdmin)
                await _subscriptionService.DeleteSubscriptionStatusAsync(userId);
            return await _memberService.DeleteUserAsync(userId);

        }

        public async Task<bool> UpdateAccountAsync(SubscriptionCreationDto subscriptionDto)
        {
            var user = await _memberService.UpdateMember(subscriptionDto);

            if (await _subscriptionService.UpdateSubscription(user.Id, subscriptionDto))
                return await _emailService.CreateAndSendConfirmationEmail(user, EmailMessages.AccountRecoverySubject, EmailMessages.AccountRecoveryMsg); 
            return false;
        }

        public async Task<IEnumerable<MemberDto>> GetUsers()
        {
            return await _memberService.getUsersWithRoles();
        }

        public async Task<IEnumerable<InvitationDto>> GetInvitations()
        {
            return await _subscriptionService.GetInvitations();
        }


    }
}
