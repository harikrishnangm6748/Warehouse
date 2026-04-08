using System;

namespace Warehouse.Domain.Entities
{
    public class ExceptionRecord
    {
        public int Id { get; set; }
        public int ShipmentId { get; set; }
        public Shipment? Shipment { get; set; }
        public string ExceptionType { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime ReportedAt { get; set; }
        public string ReportedBy { get; set; } = string.Empty;
    }
}
