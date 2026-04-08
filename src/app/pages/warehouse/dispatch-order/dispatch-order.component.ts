import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Order, Shipment } from '../../../models/interfaces';

@Component({
  selector: 'app-dispatch-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './dispatch-order.component.html',
  styleUrls: ['./dispatch-order.component.css']
})
export class DispatchOrderComponent implements OnInit {
  dispatchForm!: FormGroup;
  order: Order | null = null;
  orderId: string = '';
  loading = false;
  isSubmitting = false;
  successMessage = '';
  carriers = ['FedEx', 'UPS', 'DHL', 'Local Delivery'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.loadOrder();
    });
  }

  initializeForm(): void {
    this.dispatchForm = this.formBuilder.group({
      carrier: ['FedEx', Validators.required],
      trackingNumber: ['', Validators.required],
      estimatedDelivery: ['', Validators.required],
      notes: [''],
      pickupDate: ['', Validators.required],
      dispatchedBy: ['Warehouse Staff', Validators.required]
    });
  }

  loadOrder(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.order = {
        id: this.orderId,
        orderNumber: 'ORD-001',
        customerId: 'CUST-001',
        customerName: 'John Smith',
        createdBy: 'Employee 1',
        createdDate: new Date('2024-04-01'),
        items: [
          { 
            id: '1', 
            productId: 'PROD-001', 
            productName: 'Widget A',
            quantity: 5,
            unitPrice: 50,
            totalPrice: 250
          }
        ],
        status: 'PROCESSING',
        totalAmount: 250,
        shippingAddress: {
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        }
      };
      this.loading = false;
    }, 500);
  }

  dispatchOrder(): void {
    if (this.dispatchForm.valid && this.order) {
      this.isSubmitting = true;

      const shipment: Shipment = {
        id: Math.random().toString(36).substr(2, 9),
        shipmentNumber: `SHIP-${Date.now()}`,
        orderId: this.order.id,
        orderNumber: this.order.orderNumber,
        status: 'IN_TRANSIT',
        createdDate: new Date(),
        estimatedDeliveryDate: new Date(this.dispatchForm.get('estimatedDelivery')?.value),
        trackingNumber: this.dispatchForm.get('trackingNumber')?.value,
        carrier: this.dispatchForm.get('carrier')?.value,
        tasks: [],
        exceptions: []
      };

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.successMessage = 'Order dispatched successfully! Shipment: ' + shipment.shipmentNumber;
        setTimeout(() => {
          this.router.navigate(['/app/warehouse/orders-queue']);
        }, 2000);
      }, 1500);
    }
  }

  goBack(): void {
    this.router.navigate(['/app/warehouse/orders-queue']);
  }

  generateTrackingNumber(): void {
    const trackingNumber = 'TRACK-' + Date.now();
    this.dispatchForm.patchValue({ trackingNumber });
  }
}
