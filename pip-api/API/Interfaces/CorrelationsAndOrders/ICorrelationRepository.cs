using API.Entities.CorrelationsAndOrders;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ICorrelationRepository
    {
        Task<bool> Add(Correlation correlation);
        Task<bool> Delete(Correlation correlation);
        Task<ICollection<Correlation>> GetAll();
        Task<Correlation> GetById(Guid id);
        Task<bool> Update(Correlation correlation);
    }
}