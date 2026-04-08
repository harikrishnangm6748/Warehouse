using Warehouse.Application.DTOs;

namespace Warehouse.Application.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDto?> GetOrderByIdAsync(int id);
        Task<IEnumerable<OrderDto>> GetOrdersByUserAsync(int userId);
        Task<OrderDto> CreateOrderAsync(CreateOrderDto createOrderDto);
        Task UpdateOrderStatusAsync(int orderId, string status, string changedBy);
    }
}
