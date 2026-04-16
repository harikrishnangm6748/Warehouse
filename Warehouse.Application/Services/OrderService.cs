using Warehouse.Application.DTOs;
using Warehouse.Application.Interfaces;
using Warehouse.Domain.Entities;
using Warehouse.Infrastructure.Repositories;
using Warehouse.Infrastructure.Data;

namespace Warehouse.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IRepository<OrderItem> _orderItemRepository;
        private readonly IRepository<OrderStatusHistory> _statusHistoryRepository;
        private readonly IRepository<InventoryReservation> _reservationRepository;
        private readonly ApplicationDbContext _context;
        public OrderService(IOrderRepository orderRepository, IRepository<OrderItem> orderItemRepository, IRepository<OrderStatusHistory> statusHistoryRepository, IRepository<InventoryReservation> reservationRepository, ApplicationDbContext context)
        {
            _orderRepository = orderRepository;
            _orderItemRepository = orderItemRepository;
            _statusHistoryRepository = statusHistoryRepository;
            _reservationRepository = reservationRepository;
            _context = context;
        }
        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await _orderRepository.GetOrderWithItemsAsync(id);
            if (order == null) return null;
            return new OrderDto
            {
                Id = order.Id,
                UserId = order.UserId,
                Status = order.Status,
                CreatedAt = order.CreatedAt,
                Items = order.OrderItems.Select(oi => new OrderItemDto
                {
                    Id = oi.Id,
                    InventoryItemId = oi.InventoryItemId,
                    Name = oi.InventoryItem?.Name ?? "",
                    Quantity = oi.Quantity
                }).ToList(),
                StatusHistory = order.StatusHistory.Select(sh => new OrderStatusHistoryDto
                {
                    Status = sh.Status,
                    ChangedAt = sh.ChangedAt,
                    ChangedBy = sh.ChangedBy
                }).ToList()
            };
        }
        public async Task<IEnumerable<OrderDto>> GetOrdersByUserAsync(int userId)
        {
            var orders = await _orderRepository.FindAsync(o => o.UserId == userId);
            return orders.Select(o => new OrderDto
            {
                Id = o.Id,
                Status = o.Status,
                CreatedAt = o.CreatedAt
            });
        }
        public async Task<OrderDto> CreateOrderAsync(CreateOrderDto createOrderDto)
        {
            var order = new Order
            {
                UserId = createOrderDto.UserId,
                CreatedAt = DateTime.UtcNow,
                Status = "Pending"
            };
            await _orderRepository.AddAsync(order);
            foreach (var item in createOrderDto.Items)
            {
                var orderItem = new OrderItem
                {
                    OrderId = order.Id,
                    InventoryItemId = item.InventoryItemId,
                    Quantity = item.Quantity
                };
                await _orderItemRepository.AddAsync(orderItem);
                var reservation = new InventoryReservation
                {
                    InventoryItemId = item.InventoryItemId,
                    OrderId = order.Id,
                    ReservedQuantity = item.Quantity,
                    ReservedAt = DateTime.UtcNow
                };
                await _reservationRepository.AddAsync(reservation);
            }
            await _context.SaveChangesAsync();
            return new OrderDto { Id = order.Id, Status = order.Status, CreatedAt = order.CreatedAt };
        }
        public async Task UpdateOrderStatusAsync(int orderId, string status, string changedBy)
        {
            var order = await _orderRepository.GetByIdAsync(orderId);
            if (order != null)
            {
                order.Status = status;
                _orderRepository.Update(order);
                var history = new OrderStatusHistory
                {
                    OrderId = orderId,
                    Status = status,
                    ChangedAt = DateTime.UtcNow,
                    ChangedBy = changedBy
                };
                await _statusHistoryRepository.AddAsync(history);
                await _context.SaveChangesAsync();
            }
        }
    }
}
