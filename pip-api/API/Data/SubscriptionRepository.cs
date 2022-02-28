using API.Common.Enums;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class SubscriptionRepository: ISubscriptionRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public SubscriptionRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AppSubscription> GetSubscriptionById(Guid id)
        {
            return await _context.AppSubscriptions.FindAsync(id);
        }

        public async Task<AppSubscription> GetSubscriptionByUserId(Guid id)
        {
            return await _context.AppSubscriptions.SingleOrDefaultAsync(x => x.UserId == id);
        }

        public async Task<bool> AddSubscription(AppSubscription subscription)
        {
            await _context.AppSubscriptions.AddAsync(subscription);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<AppSubscription>> GetAllSubscriptions()
        {
            return await _context.AppSubscriptions.ToListAsync();
        }

        public async Task<bool> Update(AppSubscription subscription)
        {
            _context.Entry(subscription).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(AppSubscription subscription)
        {
            _context.Entry(subscription).State = EntityState.Deleted;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<InvitationDto>> GetInvitations()
        {
            return await _context.AppSubscriptions
                .Where(s => s.Status == SubscriptionStatus.Active || s.Status == SubscriptionStatus.Expired || s.Status == SubscriptionStatus.Blocked)
                .Include(s => s.User)
                .ProjectTo<InvitationDto>(_mapper.ConfigurationProvider)
                .ToArrayAsync();
        }

    }
}
