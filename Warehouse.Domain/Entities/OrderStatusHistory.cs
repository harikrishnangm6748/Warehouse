using System;

namespace Warehouse.Domain.Entities
{
    public class OrderStatusHistory
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime ChangedAt { get; set; }
        public string ChangedBy { get; set; } = string.Empty;
    }
}
