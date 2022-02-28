using API.Entities.CorrelationsAndOrders;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IParameterRepository
    {
        Task<bool> Add(Parameter parameter);
        Task<bool> Delete(Parameter parameter);
        Task<ICollection<Parameter>> GetAll();
        Task<Parameter> GetById(Guid id);
        Task<bool> Update(Parameter parameter);
        Task<Parameter> GetBySymboleAndCategory(string symbole, string category);
    }
}