using System;
using System.Collections.Generic;

namespace Warehouse.Domain.Entities
{
    public class Shipment
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public string TrackingNumber { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime ShippedAt { get; set; }
        public ICollection<DeliveryTask> DeliveryTasks { get; set; } = new List<DeliveryTask>();
    }
}
