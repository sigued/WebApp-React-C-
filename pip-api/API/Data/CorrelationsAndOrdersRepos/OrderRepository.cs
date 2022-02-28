using API.Entities.CorrelationsAndOrders;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;
        public OrderRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Order> GetById(Guid id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public async Task<bool> Add(Order order)
        {
            await _context.Orders.AddAsync(order);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<ICollection<Order>> GetAll()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<ICollection<Order>> GetAllUserOrders(Guid userId)
        {
            var orders = await _context.Orders.ToListAsync();
            return orders.AsQueryable().Where(o=> o.UserId == userId).ToList();
        }
        public async Task<bool> Update(Order order)
        {
            _context.Entry(order).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(Order order)
        {
            _context.Entry(order).State = EntityState.Deleted;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
