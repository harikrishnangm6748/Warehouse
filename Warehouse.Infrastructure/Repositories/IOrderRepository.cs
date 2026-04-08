using Warehouse.Domain.Entities;

namespace Warehouse.Infrastructure.Repositories
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<Order?> GetOrderWithItemsAsync(int id);
    }
}
