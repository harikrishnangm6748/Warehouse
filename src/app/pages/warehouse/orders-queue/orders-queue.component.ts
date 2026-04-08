import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Order } from '../../../models/interfaces';

@Component({
  selector: 'app-orders-queue',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders-queue.component.html',
  styleUrls: ['./orders-queue.component.css']
})
export class OrdersQueueComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  loading = false;
  selectedFilter: 'ALL' | 'PENDING' | 'CONFIRMED' | 'PROCESSING' = 'PENDING';
  searchQuery = '';
  sortBy: 'date' | 'items' = 'date';

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
          createdBy: 'Employee 1',
          createdDate: new Date('2024-04-01 10:00:00'),
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
          createdBy: 'Employee 2',
          createdDate: new Date('2024-04-02 14:30:00'),
          items: [
            { id: '2', productId: 'PROD-002', productName: 'Widget B', quantity: 3, unitPrice: 75, totalPrice: 225 },
            { id: '3', productId: 'PROD-003', productName: 'Widget C', quantity: 2, unitPrice: 100, totalPrice: 200 }
          ],
          status: 'PENDING',
          totalAmount: 425
        },
        {
          id: '3',
          orderNumber: 'ORD-003',
          customerId: 'CUST-003',
          customerName: 'Bob Wilson',
          createdBy: 'Employee 1',
          createdDate: new Date('2024-03-31 09:15:00'),
          items: [
            { id: '4', productId: 'PROD-004', productName: 'Widget D', quantity: 1, unitPrice: 150, totalPrice: 150 }
          ],
          status: 'PROCESSING',
          totalAmount: 150
        }
      ];
      this.filterOrders();
      this.loading = false;
    }, 500);
  }

  filterOrders(): void {
    let results = this.orders.filter(order => {
      const statusMatch = this.selectedFilter === 'ALL' || order.status === this.selectedFilter;
      const searchMatch = 
        order.orderNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(this.searchQuery.toLowerCase());
      return statusMatch && searchMatch;
    });

    // Sort
    if (this.sortBy === 'date') {
      results.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    } else if (this.sortBy === 'items') {
      results.sort((a, b) => b.items.length - a.items.length);
    }

    this.filteredOrders = results;
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.filterOrders();
  }

  onFilterChange(filter: 'ALL' | 'PENDING' | 'CONFIRMED' | 'PROCESSING'): void {
    this.selectedFilter = filter;
    this.filterOrders();
  }

  onSortChange(sort: 'date' | 'items'): void {
    this.sortBy = sort;
    this.filterOrders();
  }

  viewDetails(orderId: string): void {
    this.router.navigate(['/app/warehouse/dispatch-order', orderId]);
  }

  checkInventory(orderId: string): void {
    this.router.navigate(['/app/warehouse/inventory-check']);
  }

  getItemCount(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'PENDING': '#ffc107',
      'CONFIRMED': '#17a2b8',
      'PROCESSING': '#007bff'
    };
    return colors[status] || '#6c757d';
  }
}
