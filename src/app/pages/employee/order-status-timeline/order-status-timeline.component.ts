import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderStatusHistory } from '../../../models/interfaces';

@Component({
  selector: 'app-order-status-timeline',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-status-timeline.component.html',
  styleUrls: ['./order-status-timeline.component.css']
})
export class OrderStatusTimelineComponent implements OnInit {
  orderId: string = '';
  orderNumber: string = 'ORD-001';
  statusHistory: OrderStatusHistory[] = [];
  loading = false;
  currentStatus: string = 'CONFIRMED';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.loadStatusTimeline();
    });
  }

  loadStatusTimeline(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.statusHistory = [
        {
          id: '1',
          orderId: this.orderId,
          status: 'PENDING',
          changedBy: 'John Manager',
          changedDate: new Date('2024-04-01 10:00:00'),
          notes: 'Order created'
        },
        {
          id: '2',
          orderId: this.orderId,
          status: 'CONFIRMED',
          changedBy: 'Admin User',
          changedDate: new Date('2024-04-01 11:30:00'),
          notes: 'Order confirmed and payment verified'
        },
        {
          id: '3',
          orderId: this.orderId,
          status: 'PROCESSING',
          changedBy: 'Warehouse Staff',
          changedDate: new Date('2024-04-02 09:00:00'),
          notes: 'Order moved to warehouse for processing'
        },
        {
          id: '4',
          orderId: this.orderId,
          status: 'SHIPPED',
          changedBy: 'Warehouse Staff',
          changedDate: new Date('2024-04-03 14:30:00'),
          notes: 'Order shipped with tracking #TRK123456'
        }
      ];
      this.currentStatus = this.statusHistory[this.statusHistory.length - 1].status;
      this.loading = false;
    }, 500);
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'PENDING': '⏳',
      'CONFIRMED': '✓',
      'PROCESSING': '⚙',
      'SHIPPED': '📦',
      'DELIVERED': '✓✓',
      'CANCELLED': '✗'
    };
    return icons[status] || '•';
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'PENDING': '#ffc107',
      'CONFIRMED': '#17a2b8',
      'PROCESSING': '#007bff',
      'SHIPPED': '#6c757d',
      'DELIVERED': '#28a745',
      'CANCELLED': '#dc3545'
    };
    return colors[status] || '#6c757d';
  }

  goBack(): void {
    this.router.navigate(['/app/employee/my-orders']);
  }
}
