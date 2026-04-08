using System.Collections.Generic;

namespace Warehouse.Domain.Entities
{
    public class InventoryItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int WarehouseId { get; set; }
        public Warehouse? Warehouse { get; set; }
        public ICollection<InventoryStock> Stocks { get; set; } = new List<InventoryStock>();
        public ICollection<InventoryReservation> Reservations { get; set; } = new List<InventoryReservation>();
    }
}
