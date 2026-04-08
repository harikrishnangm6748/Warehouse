using System;

namespace Warehouse.Domain.Entities
{
    public class InventoryReservation
    {
        public int Id { get; set; }
        public int InventoryItemId { get; set; }
        public InventoryItem? InventoryItem { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public int ReservedQuantity { get; set; }
        public DateTime ReservedAt { get; set; }
    }
}
