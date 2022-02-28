using API.Common.Enums;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class EmailRepository: IEmailRepository
    {
        private readonly DataContext _context;
        public EmailRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<AppEmail> GetEmailById(Guid id)
        {
            return await _context.AppEmails.FindAsync(id);
        }

        public async Task<bool> AddEmail(AppEmail email)
        {
            await _context.AppEmails.AddAsync(email);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<AppEmail>> GetAllEmail()
        {
            return await _context.AppEmails.ToListAsync();
        }

        public async Task<bool> Update(AppEmail email)
        {
            _context.Entry(email).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(AppEmail email)
        {
            _context.Entry(email).State = EntityState.Deleted;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> BulkDeleteByStatus(AppEmailStatus status)
        {
            var emailsToRemove = await _context.AppEmails.Where(s => s.Status == status).ToListAsync();

            _context.RemoveRange(emailsToRemove);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateStatus()
        {
            var emails = await _context.AppEmails.Where(e => e.EndDate > DateTime.UtcNow).ToListAsync();
            emails.ForEach(e => e.Status = AppEmailStatus.Expired);
            return await _context.SaveChangesAsync() > 0;
        }

    }
}
