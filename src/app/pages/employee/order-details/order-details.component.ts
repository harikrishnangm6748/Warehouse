import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Order } from '../../../models/interfaces';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: Order | null = null;
  loading = false;
  orderId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.loadOrderDetails();
    });
  }

  loadOrderDetails(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.order = {
        id: this.orderId,
        orderNumber: 'ORD-001',
        customerId: 'CUST-001',
        customerName: 'John Smith',
        createdBy: 'John Manager',
        createdDate: new Date('2024-04-01'),
        items: [
          { 
            id: '1', 
            productId: 'PROD-001', 
            productName: 'Widget A',
            sku: 'SKU-001',
            quantity: 5,
            reservedQuantity: 5,
            unitPrice: 50,
            totalPrice: 250
          },
          { 
            id: '2', 
            productId: 'PROD-002', 
            productName: 'Widget B',
            sku: 'SKU-002',
            quantity: 3,
            reservedQuantity: 3,
            unitPrice: 75,
            totalPrice: 225
          }
        ],
        status: 'CONFIRMED',
        totalAmount: 475,
        shippingAddress: {
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        description: 'Bulk order for warehouse inventory'
      };
      this.loading = false;
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/app/employee/my-orders']);
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
}
