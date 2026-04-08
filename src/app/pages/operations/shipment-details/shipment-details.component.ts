import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Shipment, DeliveryTask, ExceptionRecord } from '../../../models/interfaces';

@Component({
  selector: 'app-shipment-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.css']
})
export class ShipmentDetailsComponent implements OnInit {
  shipment: Shipment | null = null;
  shipmentId: string = '';
  loading = false;
  activeTab: 'tasks' | 'exceptions' = 'tasks';
  showExceptionForm = false;
  newException = { description: '', severity: 'MEDIUM' as const };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.shipmentId = params['id'];
      this.loadShipmentDetails();
    });
  }

  loadShipmentDetails(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.shipment = {
        id: this.shipmentId,
        shipmentNumber: 'SHIP-2024-001',
        orderId: '1',
        orderNumber: 'ORD-001',
        status: 'IN_TRANSIT',
        createdDate: new Date('2024-04-03'),
        estimatedDeliveryDate: new Date('2024-04-06'),
        trackingNumber: 'TRACK-123456',
        carrier: 'FedEx',
        tasks: [
          {
            id: '1',
            shipmentId: this.shipmentId,
            taskNumber: 'TASK-001',
            type: 'PICK',
            assignedTo: 'John Warehouse',
            status: 'COMPLETED',
            createdDate: new Date('2024-04-03 10:00:00'),
            completedDate: new Date('2024-04-03 10:30:00'),
            notes: 'Items picked from location A-01'
          },
          {
            id: '2',
            shipmentId: this.shipmentId,
            taskNumber: 'TASK-002',
            type: 'PACK',
            assignedTo: 'Jane Packer',
            status: 'COMPLETED',
            createdDate: new Date('2024-04-03 10:30:00'),
            completedDate: new Date('2024-04-03 11:15:00'),
            notes: 'Items packed and labeled'
          },
          {
            id: '3',
            shipmentId: this.shipmentId,
            taskNumber: 'TASK-003',
            type: 'DISPATCH',
            assignedTo: 'Bob Dispatcher',
            status: 'COMPLETED',
            createdDate: new Date('2024-04-03 11:15:00'),
            completedDate: new Date('2024-04-03 12:00:00'),
            notes: 'Handed to FedEx courier'
          }
        ],
        exceptions: [
          {
            id: '1',
            shipmentId: this.shipmentId,
            exceptionCode: 'EXC-001',
            description: 'Minor damage on package surface',
            severity: 'LOW',
            status: 'RESOLVED',
            createdDate: new Date('2024-04-03 10:15:00'),
            resolvedDate: new Date('2024-04-03 10:20:00'),
            resolvedBy: 'John Warehouse'
          }
        ]
      };
      this.loading = false;
    }, 500);
  }

  switchTab(tab: 'tasks' | 'exceptions'): void {
    this.activeTab = tab;
  }

  getTaskIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'PICK': '📦',
      'PACK': '📫',
      'DISPATCH': '🚚',
      'DELIVER': '📍'
    };
    return icons[type] || '•';
  }

  getTaskColor(status: string): string {
    const colors: { [key: string]: string } = {
      'PENDING': '#ffc107',
      'IN_PROGRESS': '#007bff',
      'COMPLETED': '#28a745',
      'FAILED': '#dc3545'
    };
    return colors[status] || '#6c757d';
  }

  getSeverityColor(severity: string): string {
    const colors: { [key: string]: string } = {
      'LOW': '#28a745',
      'MEDIUM': '#ffc107',
      'HIGH': '#fd7e14',
      'CRITICAL': '#dc3545'
    };
    return colors[severity] || '#6c757d';
  }

  addException(): void {
    if (this.shipment && this.newException.description) {
      const exception: ExceptionRecord = {
        id: Math.random().toString(36).substr(2, 9),
        shipmentId: this.shipment.id,
        exceptionCode: `EXC-${Date.now()}`,
        description: this.newException.description,
        severity: this.newException.severity,
        status: 'OPEN',
        createdDate: new Date()
      };
      this.shipment.exceptions.push(exception);
      this.newException = { description: '', severity: 'MEDIUM' };
      this.showExceptionForm = false;
    }
  }

  resolveException(id: string): void {
    if (this.shipment) {
      const exception = this.shipment.exceptions.find(e => e.id === id);
      if (exception) {
        exception.status = 'RESOLVED';
        exception.resolvedDate = new Date();
        exception.resolvedBy = 'Current User';
      }
    }
  }

  getProgressPercentage(): number {
    if (!this.shipment || this.shipment.tasks.length === 0) return 0;
    const completed = this.shipment.tasks.filter(t => t.status === 'COMPLETED').length;
    return Math.round((completed / this.shipment.tasks.length) * 100);
  }

  goBack(): void {
    this.router.navigate(['/app/operations/shipments-queue']);
  }

  getShipmentStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'PENDING': '#ffc107',
      'IN_TRANSIT': '#17a2b8',
      'OUT_FOR_DELIVERY': '#007bff',
      'DELIVERED': '#28a745',
      'FAILED': '#dc3545'
    };
    return colors[status] || '#6c757d';
  }
}
