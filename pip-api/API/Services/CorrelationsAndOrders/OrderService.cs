using API.DTOs;
using API.Entities.CorrelationsAndOrders;
using API.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.Json;
using API.Common.Enums;

namespace API.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<bool> AddNewOrder(NewOrderDto order)
        {
            var newOrder = new Order(order.UserId, DateTime.UtcNow, JsonSerializer.Serialize(order.Parameters), OrderStatus.Pendig);
            return await _orderRepository.Add(newOrder);
        }

        public async Task<ICollection<OrderDto>> GetAllUserOrders(Guid userId)
        {
            var orders = await _orderRepository.GetAllUserOrders(userId);
            var ordersList = new List<OrderDto>();
            foreach(var  o in orders)
            {
                ordersList.Add(new OrderDto(o.Id, o.UserId, o.CreationDate, JsonSerializer.Deserialize<ICollection<ParameterDto>>(o.ParameterList), o.Status));
            }
            return ordersList;
        }

        public async Task<string> GetPathFileToDownload(string orderId)
        {
            var order = await _orderRepository.GetById(Guid.Parse(orderId));
            return  $"./PDF/ResultatsRapport/{order.UserId}_{order.Id}.pdf";
            
        }
    }
}
