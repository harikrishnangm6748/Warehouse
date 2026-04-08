import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Shipment, ShipmentStatus } from '../../../models/interfaces';

@Component({
  selector: 'app-shipments-queue',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shipments-queue.component.html',
  styleUrls: ['./shipments-queue.component.css']
})
export class ShipmentsQueueComponent implements OnInit {
  shipments: Shipment[] = [];
  filteredShipments: Shipment[] = [];
  loading = false;
  selectedStatus: ShipmentStatus | 'ALL' = 'ALL';
  searchQuery = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.shipments = [
        {
          id: '1',
          shipmentNumber: 'SHIP-2024-001',
          orderId: '1',
          orderNumber: 'ORD-001',
          status: 'IN_TRANSIT',
          createdDate: new Date('2024-04-03'),
          estimatedDeliveryDate: new Date('2024-04-06'),
          trackingNumber: 'TRACK-123456',
          carrier: 'FedEx',
          tasks: [
            { id: '1', shipmentId: '1', taskNumber: 'TASK-001', type: 'PICK', status: 'COMPLETED', createdDate: new Date() },
            { id: '2', shipmentId: '1', taskNumber: 'TASK-002', type: 'PACK', status: 'COMPLETED', createdDate: new Date() },
            { id: '3', shipmentId: '1', taskNumber: 'TASK-003', type: 'DISPATCH', status: 'COMPLETED', createdDate: new Date() }
          ],
          exceptions: []
        },
        {
          id: '2',
          shipmentNumber: 'SHIP-2024-002',
          orderId: '2',
          orderNumber: 'ORD-002',
          status: 'OUT_FOR_DELIVERY',
          createdDate: new Date('2024-04-02'),
          estimatedDeliveryDate: new Date('2024-04-05'),
          trackingNumber: 'TRACK-234567',
          carrier: 'UPS',
          tasks: [
            { id: '4', shipmentId: '2', taskNumber: 'TASK-004', type: 'DELIVER', status: 'IN_PROGRESS', createdDate: new Date() }
          ],
          exceptions: []
        },
        {
          id: '3',
          shipmentNumber: 'SHIP-2024-003',
          orderId: '3',
          orderNumber: 'ORD-003',
          status: 'PENDING',
          createdDate: new Date('2024-04-04'),
          estimatedDeliveryDate: new Date('2024-04-07'),
          trackingNumber: 'TRACK-345678',
          carrier: 'DHL',
          tasks: [
            { id: '5', shipmentId: '3', taskNumber: 'TASK-005', type: 'PICK', status: 'PENDING', createdDate: new Date() }
          ],
          exceptions: []
        },
        {
          id: '4',
          shipmentNumber: 'SHIP-2024-004',
          orderId: '4',
          orderNumber: 'ORD-004',
          status: 'DELIVERED',
          createdDate: new Date('2024-03-31'),
          estimatedDeliveryDate: new Date('2024-04-03'),
          trackingNumber: 'TRACK-456789',
          carrier: 'FedEx',
          tasks: [
            { id: '6', shipmentId: '4', taskNumber: 'TASK-006', type: 'DELIVER', status: 'COMPLETED', createdDate: new Date() }
          ],
          exceptions: []
        }
      ];
      this.filterShipments();
      this.loading = false;
    }, 500);
  }

  filterShipments(): void {
    this.filteredShipments = this.shipments.filter(shipment => {
      const statusMatch = this.selectedStatus === 'ALL' || shipment.status === this.selectedStatus;
      const searchMatch = 
        shipment.shipmentNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        shipment.orderNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        shipment.trackingNumber?.toLowerCase().includes(this.searchQuery.toLowerCase());
      return statusMatch && searchMatch;
    });
  }

  onStatusChange(status: ShipmentStatus | 'ALL'): void {
    this.selectedStatus = status;
    this.filterShipments();
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.filterShipments();
  }

  viewDetails(shipmentId: string): void {
    this.router.navigate(['/app/operations/shipment-details', shipmentId]);
  }

  getStatusColor(status: ShipmentStatus): string {
    const colors: { [key in ShipmentStatus]: string } = {
      'PENDING': '#ffc107',
      'IN_TRANSIT': '#17a2b8',
      'OUT_FOR_DELIVERY': '#007bff',
      'DELIVERED': '#28a745',
      'FAILED': '#dc3545'
    };
    return colors[status] || '#6c757d';
  }

  getStatusIcon(status: ShipmentStatus): string {
    const icons: { [key in ShipmentStatus]: string } = {
      'PENDING': '⏳',
      'IN_TRANSIT': '🚚',
      'OUT_FOR_DELIVERY': '📍',
      'DELIVERED': '✓',
      'FAILED': '✗'
    };
    return icons[status] || '•';
  }

  getProgressPercentage(shipment: Shipment): number {
    if (shipment.tasks.length === 0) return 0;
    const completed = shipment.tasks.filter(t => t.status === 'COMPLETED').length;
    return Math.round((completed / shipment.tasks.length) * 100);
  }
}
