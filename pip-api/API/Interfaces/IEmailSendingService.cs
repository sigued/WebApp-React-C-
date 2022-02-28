using API.Common.Enums;
using API.DTOs;
using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IEmailSendingService
    {
        Task<bool> SendConfirmationEmail(string emailAdress, string subject, string msg);
    }
}
