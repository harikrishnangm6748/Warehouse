import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  reserved: number;
  available: number;
  warehouseLocation: string;
  reorderLevel: number;
}

export interface InventoryReservation {
  id: string;
  orderId: string;
  items: InventoryItem[];
  status: 'pending' | 'confirmed' | 'cancelled';
  createdDate: Date;
  confirmationDeadline: Date;
}

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = 'http://localhost:5000/api/inventory';

  constructor(private http: HttpClient) {}

  getInventory(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.apiUrl}`);
  }

  checkInventoryAvailability(
    items: any[]
  ): Observable<{ available: boolean; missingItems: any[] }> {
    return this.http.post<{
      available: boolean;
      missingItems: any[];
    }>(`${this.apiUrl}/check-availability`, { items });
  }

  reserveInventory(orderId: string, items: any[]): Observable<InventoryReservation> {
    return this.http.post<InventoryReservation>(
      `${this.apiUrl}/reserve`,
      { orderId, items }
    );
  }

  confirmReservation(reservationId: string): Observable<InventoryReservation> {
    return this.http.post<InventoryReservation>(
      `${this.apiUrl}/reserve/${reservationId}/confirm`,
      {}
    );
  }

  getReservations(): Observable<InventoryReservation[]> {
    return this.http.get<InventoryReservation[]>(
      `${this.apiUrl}/reservations`
    );
  }

  getInventoryItem(id: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.apiUrl}/${id}`);
  }
}
