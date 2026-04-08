using System;

namespace Warehouse.Domain.Entities
{
    public class InventoryStock
    {
        public int Id { get; set; }
        public int InventoryItemId { get; set; }
        public InventoryItem? InventoryItem { get; set; }
        public int Quantity { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
