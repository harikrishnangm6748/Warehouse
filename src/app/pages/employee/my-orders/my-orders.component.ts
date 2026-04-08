import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Order, OrderStatus } from '../../../models/interfaces';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  loading = false;
  selectedStatus: OrderStatus | 'ALL' = 'ALL';
  searchQuery = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.orders = [
        {
          id: '1',
          orderNumber: 'ORD-001',
          customerId: 'CUST-001',
          customerName: 'John Smith',
          createdBy: 'current-user',
          createdDate: new Date('2024-04-01'),
          items: [
            { id: '1', productId: 'PROD-001', productName: 'Widget A', quantity: 5, unitPrice: 50, totalPrice: 250 }
          ],
          status: 'CONFIRMED',
          totalAmount: 250
        },
        {
          id: '2',
          orderNumber: 'ORD-002',
          customerId: 'CUST-002',
          customerName: 'Jane Doe',
          createdBy: 'current-user',
          createdDate: new Date('2024-04-02'),
          items: [
            { id: '2', productId: 'PROD-002', productName: 'Widget B', quantity: 3, unitPrice: 75, totalPrice: 225 }
          ],
          status: 'PENDING',
          totalAmount: 225
        },
        {
          id: '3',
          orderNumber: 'ORD-003',
          customerId: 'CUST-003',
          customerName: 'Bob Wilson',
          createdBy: 'current-user',
          createdDate: new Date('2024-03-28'),
          items: [
            { id: '3', productId: 'PROD-003', productName: 'Widget C', quantity: 2, unitPrice: 100, totalPrice: 200 }
          ],
          status: 'SHIPPED',
          totalAmount: 200
        },
        {
          id: '4',
          orderNumber: 'ORD-004',
          customerId: 'CUST-004',
          customerName: 'Alice Brown',
          createdBy: 'current-user',
          createdDate: new Date('2024-03-25'),
          items: [
            { id: '4', productId: 'PROD-004', productName: 'Widget D', quantity: 1, unitPrice: 150, totalPrice: 150 }
          ],
          status: 'DELIVERED',
          totalAmount: 150
        }
      ];
      this.filterOrders();
      this.loading = false;
    }, 500);
  }

  filterOrders(): void {
    this.filteredOrders = this.orders.filter(order => {
      const statusMatch = this.selectedStatus === 'ALL' || order.status === this.selectedStatus;
      const searchMatch = 
        order.orderNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(this.searchQuery.toLowerCase());
      return statusMatch && searchMatch;
    });
  }

  onStatusChange(status: OrderStatus | 'ALL'): void {
    this.selectedStatus = status;
    this.filterOrders();
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.filterOrders();
  }

  viewDetails(orderId: string): void {
    this.router.navigate(['/app/employee/order-details', orderId]);
  }

  viewStatus(orderId: string): void {
    this.router.navigate(['/app/employee/order-status', orderId]);
  }

  getStatusClass(status: OrderStatus): string {
    const statusClasses: { [key in OrderStatus]: string } = {
      'PENDING': 'status-pending',
      'CONFIRMED': 'status-confirmed',
      'PROCESSING': 'status-processing',
      'SHIPPED': 'status-shipped',
      'DELIVERED': 'status-delivered',
      'CANCELLED': 'status-cancelled'
    };
    return statusClasses[status];
  }
}
