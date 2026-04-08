using System.Collections.Generic;

namespace Warehouse.Application.DTOs
{
    public class CreateOrderDto
    {
        public int UserId { get; set; }
        public List<OrderItemCreateDto> Items { get; set; } = new();
    }
    public class OrderItemCreateDto
    {
        public int InventoryItemId { get; set; }
        public int Quantity { get; set; }
    }
}
