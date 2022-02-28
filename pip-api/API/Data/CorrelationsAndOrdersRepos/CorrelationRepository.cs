using API.Entities.CorrelationsAndOrders;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class CorrelationRepository : ICorrelationRepository
    {
        private readonly DataContext _context;
        public CorrelationRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Correlation> GetById(Guid id)
        {
            return await _context.Correlations.FindAsync(id);
        }

        public async Task<bool> Add(Correlation correlation)
        {
            await _context.Correlations.AddAsync(correlation);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<ICollection<Correlation>> GetAll()
        {
            return await _context.Correlations.Include("Equations").Include("Abaques").Include("InputsList").ToListAsync();
        }

        public async Task<bool> Update(Correlation correlation)
        {
            _context.Entry(correlation).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(Correlation correlation)
        {
            _context.Entry(correlation).State = EntityState.Deleted;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
