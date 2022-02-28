using API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IParameterService
    {
        Task<ICollection<ParametersToClientDto>> GetAll();
    }
}