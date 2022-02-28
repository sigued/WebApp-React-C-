using API.Common.Enums;
using API.DTOs;
using API.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IEmailService
    {
        Task<IEnumerable<AppEmail>> GetEmails();
        Task<bool> ResendEmailLink(Guid emailId);
        Task<AppUser> ValidateAccountCreationEmail(string guid);
        Task<bool> CreateAndSendEmail(AppUser user, SubscriptionCreationDto subscriptionCreationDto);
        Task<bool> CreateAndSendConfirmationEmail(AppUser user, string subject, string msg);

    }
}
