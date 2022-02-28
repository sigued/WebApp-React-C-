using API.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IOrderService
    {
        Task<bool> AddNewOrder(NewOrderDto order);
        Task<ICollection<OrderDto>> GetAllUserOrders(Guid userId);
        Task<string> GetPathFileToDownload(string orderId);
    }
}