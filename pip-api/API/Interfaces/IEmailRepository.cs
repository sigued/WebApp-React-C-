using API.Common.Enums;
using API.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IEmailRepository
    {
        Task<AppEmail> GetEmailById(Guid id);
        Task<bool> AddEmail(AppEmail email);
        Task<IEnumerable<AppEmail>> GetAllEmail();
        Task<bool> Update(AppEmail email);
        Task<bool> Delete(AppEmail email);
        Task<bool> BulkDeleteByStatus(AppEmailStatus status);
        public Task<bool> UpdateStatus();
    }
}
