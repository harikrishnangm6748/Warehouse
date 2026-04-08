using System;
using System.Collections.Generic;

namespace Warehouse.Application.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
        public List<OrderStatusHistoryDto> StatusHistory { get; set; } = new();
    }
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int InventoryItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }
    public class OrderStatusHistoryDto
    {
        public string Status { get; set; } = string.Empty;
        public DateTime ChangedAt { get; set; }
        public string ChangedBy { get; set; } = string.Empty;
    }
}
