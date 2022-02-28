using API.Common.ConfigModels;
using API.Common.Enums;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static API.Common.Constants.Constants;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IEmailRepository _emailRepository;
        private readonly IEmailSendingService _emailSendingService;
        private readonly UserManager<AppUser> _userManager;
        private readonly BaseUrlConfigModel _baseUrlConfig;

        public EmailService(IEmailRepository emailRepository, IEmailSendingService emailSendingService,
            IOptions<BaseUrlConfigModel> baseUrlConfig, UserManager<AppUser> userManager)
        {
            _emailRepository = emailRepository;
            _emailSendingService = emailSendingService;
            _userManager = userManager;
            _baseUrlConfig = baseUrlConfig.Value;
        }

        public async Task<IEnumerable<AppEmail>> GetEmails()
        {
            if (await _emailRepository.UpdateStatus())
                return await _emailRepository.GetAllEmail();
            return null;
        }

        public async Task<bool> ResendEmailLink(Guid emailId)
        {
            var email = await _emailRepository.GetEmailById(emailId);

            if(email != null)
            {
                if (email.Status == AppEmailStatus.PendingUse || email.Status == AppEmailStatus.Expired)
                {
                    email.CreationDate = DateTime.UtcNow;
                    email.SetEndDate();
                    email.Status = AppEmailStatus.PendingUse;
                    if (await _emailRepository.Update(email))
                        return await _emailSendingService.SendConfirmationEmail(email.ReceiverEmail,
                     EmailMessages.AccountRecoverySubject, email.Url.ToString());
                }
            }
            return false;
        }


        public async Task<bool> CreateAndSendEmail(AppUser user, SubscriptionCreationDto subscriptionCreationDto)
        {
            var email = new AppEmail(AppEmailType.AccountCreation, user.Id, subscriptionCreationDto.Email,
                                subscriptionCreationDto.Description, _baseUrlConfig.AccountCreation);
            var emailResult = await _emailRepository.AddEmail(email);
            if (emailResult)
                return await _emailSendingService.SendConfirmationEmail(email.ReceiverEmail,
                     EmailMessages.AccountRecoverySubject, email.Url.ToString());
            return false;
        }

        public async Task<AppUser> ValidateAccountCreationEmail(string guid)
        {
            var MyGuid = new Guid(guid);
            var email = await _emailRepository.GetEmailById(MyGuid);
            if (email.EndDate > DateTime.UtcNow && email.Status == AppEmailStatus.PendingUse)
            {
                //TODO: ne pas mettre le lien used avantr le register
                //email.Status = AppEmailStatus.Used;
                var result = await _emailRepository.Update(email);
                if (result) return await _userManager.FindByIdAsync(email.ReceiverUserId.ToString());
            }
            return null;
        }

        public async Task<bool> CreateAndSendConfirmationEmail(AppUser user, string subject, string msg)
        {
            return await _emailSendingService
                .SendConfirmationEmail(user?.Email, subject, msg);
        }



    }
}
