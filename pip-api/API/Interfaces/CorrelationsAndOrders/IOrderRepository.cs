using API.Entities.CorrelationsAndOrders;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IOrderRepository
    {
        Task<bool> Add(Order order);
        Task<bool> Delete(Order order);
        Task<ICollection<Order>> GetAll();
        Task<Order> GetById(Guid id);
        Task<bool> Update(Order order);
        Task<ICollection<Order>> GetAllUserOrders(Guid userId);
    }
}