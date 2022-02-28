using API.Common.ConfigModels;
using API.Interfaces;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.Services
{
    public class EmailSendingService : IEmailSendingService
    {
        private readonly SMTPConfigModel _smptConfig;
        private readonly SmtpClient _client;

        public EmailSendingService(IOptions<SMTPConfigModel> smtpConfig)
        {
            _smptConfig = smtpConfig.Value;
            _client = new SmtpClient(_smptConfig.Host, _smptConfig.Port)
            {
                Credentials = new NetworkCredential(_smptConfig.UserName, _smptConfig.Password),
                EnableSsl = _smptConfig.EnableSSL
            };
        }

        public async Task<bool> SendConfirmationEmail(string emailAdress, string subject, string msg)
        {
            try
            {
                await _client.SendMailAsync(_smptConfig.SenderAddress, emailAdress, subject, msg);
            }
            catch (Exception e)
            {
                Console.WriteLine("Error sending email: " + e.Message);
                return false;
            }
            return true;
            //TODO: a modifier
        }
    }
}
