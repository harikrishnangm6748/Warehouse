using Microsoft.EntityFrameworkCore;
using Warehouse.Domain.Entities;
using Warehouse.Infrastructure.Data;

namespace Warehouse.Infrastructure.Repositories
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(ApplicationDbContext context) : base(context) { }
        public async Task<Order?> GetOrderWithItemsAsync(int id)
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.InventoryItem)
                .Include(o => o.StatusHistory)
                .FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
