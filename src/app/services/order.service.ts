import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdDate: Date;
  expectedDeliveryDate: Date;
  items: OrderItem[];
  totalAmount: number;
  notes?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  reserved: number;
}

export interface CreateOrderRequest {
  customerId: string;
  items: OrderItem[];
  notes?: string;
}

export interface OrderStatusUpdate {
  status: string;
  timestamp: Date;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/orders';
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}`).pipe(
      tap((orders) => {
        this.ordersSubject.next(orders);
      })
    );
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my-orders`);
  }

  createOrder(request: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}`, request);
  }

  updateOrderStatus(
    id: string,
    status: string
  ): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${id}/status`, {
      status,
    });
  }

  getOrderStatusHistory(orderId: string): Observable<OrderStatusUpdate[]> {
    return this.http.get<OrderStatusUpdate[]>(
      `${this.apiUrl}/${orderId}/status-history`
    );
  }

  getOrdersQueue(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/queue`);
  }

  dispatchOrder(
    id: string,
    warehouseNotes: string
  ): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/${id}/dispatch`, {
      warehouseNotes,
    });
  }
}
