using System;

namespace Warehouse.Domain.Entities
{
    public class DeliveryTask
    {
        public int Id { get; set; }
        public int ShipmentId { get; set; }
        public Shipment? Shipment { get; set; }
        public string TaskType { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime AssignedAt { get; set; }
        public string AssignedTo { get; set; } = string.Empty;
    }
}
