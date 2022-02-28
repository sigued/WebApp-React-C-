using API.Entities.CorrelationsAndOrders;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class ParameterRepository : IParameterRepository
    {
        private readonly DataContext _context;
        public ParameterRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Parameter> GetById(Guid id)
        {
            return await _context.Parameters.FindAsync(id);
        }

        public async Task<Parameter> GetBySymboleAndCategory(string symbole, string category)
        {
            return await _context.Parameters.FirstOrDefaultAsync(x => x.Symbole == symbole && x.Category == category);
        }

        public async Task<bool> Add(Parameter parameter)
        {
            await _context.Parameters.AddAsync(parameter);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<ICollection<Parameter>> GetAll()
        {
            var parameters = await _context.Parameters.ToListAsync();
            return parameters.AsQueryable().Where(o => o.IsConst == false).ToList();
            
        }

        public async Task<bool> Update(Parameter parameter)
        {
            _context.Entry(parameter).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(Parameter parameter)
        {
            _context.Entry(parameter).State = EntityState.Deleted;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
