import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateOrderDto, OrderItem, Address } from '../../../models/interfaces';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  createOrderForm!: FormGroup;
  orderItems: OrderItem[] = [];
  newItem: Partial<OrderItem> = {};
  totalAmount = 0;
  isLoading = false;
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.createOrderForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      customerName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      description: [''],
      productId: [''],
      productName: [''],
      quantity: [''],
      unitPrice: ['']
    });
  }

  addItem(): void {
    const productId = this.createOrderForm.get('productId')?.value;
    const productName = this.createOrderForm.get('productName')?.value;
    const quantity = this.createOrderForm.get('quantity')?.value;
    const unitPrice = this.createOrderForm.get('unitPrice')?.value;

    if (productId && productName && quantity && unitPrice) {
      const item: OrderItem = {
        id: Math.random().toString(36).substr(2, 9),
        productId,
        productName,
        quantity: Number(quantity),
        unitPrice: Number(unitPrice),
        totalPrice: Number(quantity) * Number(unitPrice)
      };
      this.orderItems.push(item);
      this.calculateTotal();
      this.createOrderForm.patchValue({
        productId: '',
        productName: '',
        quantity: '',
        unitPrice: ''
      });
    }
  }

  removeItem(index: number): void {
    this.orderItems.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  submitOrder(): void {
    if (this.createOrderForm.valid && this.orderItems.length > 0) {
      this.isLoading = true;
      const orderData: CreateOrderDto = {
        customerId: this.createOrderForm.get('customerId')?.value,
        customerName: this.createOrderForm.get('customerName')?.value,
        items: this.orderItems,
        totalAmount: this.totalAmount,
        shippingAddress: {
          street: this.createOrderForm.get('street')?.value,
          city: this.createOrderForm.get('city')?.value,
          state: this.createOrderForm.get('state')?.value,
          zipCode: this.createOrderForm.get('zipCode')?.value,
          country: this.createOrderForm.get('country')?.value
        },
        description: this.createOrderForm.get('description')?.value
      };

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.successMessage = 'Order created successfully!';
        setTimeout(() => {
          this.router.navigate(['/app/employee/my-orders']);
        }, 2000);
      }, 1500);
    }
  }
}
