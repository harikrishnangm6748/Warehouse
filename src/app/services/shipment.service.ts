import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Shipment {
  id: string;
  shipmentNumber: string;
  orderId: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'exception';
  createdDate: Date;
  expectedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  carrier: string;
  trackingNumber: string;
  tasks: DeliveryTask[];
  exceptions: ExceptionRecord[];
}

export interface DeliveryTask {
  id: string;
  shipmentId: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  assignedTo?: string;
  completedDate?: Date;
  notes: string;
}

export interface ExceptionRecord {
  id: string;
  shipmentId: string;
  exceptionType: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'resolved';
  createdDate: Date;
  resolvedDate?: Date;
  actionTaken?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  private apiUrl = 'http://localhost:5000/api/shipments';
  private shipmentsSubject = new BehaviorSubject<Shipment[]>([]);
  public shipments$ = this.shipmentsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${this.apiUrl}`).pipe(
      tap((shipments) => {
        this.shipmentsSubject.next(shipments);
      })
    );
  }

  getShipmentById(id: string): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.apiUrl}/${id}`);
  }

  getShipmentsQueue(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${this.apiUrl}/queue`);
  }

  updateShipmentStatus(
    id: string,
    status: string
  ): Observable<Shipment> {
    return this.http.patch<Shipment>(`${this.apiUrl}/${id}/status`, {
      status,
    });
  }

  getDeliveryTasks(shipmentId: string): Observable<DeliveryTask[]> {
    return this.http.get<DeliveryTask[]>(
      `${this.apiUrl}/${shipmentId}/tasks`
    );
  }

  updateDeliveryTask(
    taskId: string,
    data: Partial<DeliveryTask>
  ): Observable<DeliveryTask> {
    return this.http.patch<DeliveryTask>(
      `${this.apiUrl}/tasks/${taskId}`,
      data
    );
  }

  getExceptionRecords(shipmentId: string): Observable<ExceptionRecord[]> {
    return this.http.get<ExceptionRecord[]>(
      `${this.apiUrl}/${shipmentId}/exceptions`
    );
  }

  createException(
    shipmentId: string,
    exception: Partial<ExceptionRecord>
  ): Observable<ExceptionRecord> {
    return this.http.post<ExceptionRecord>(
      `${this.apiUrl}/${shipmentId}/exceptions`,
      exception
    );
  }

  resolveException(
    exceptionId: string,
    actionTaken: string
  ): Observable<ExceptionRecord> {
    return this.http.patch<ExceptionRecord>(
      `${this.apiUrl}/exceptions/${exceptionId}/resolve`,
      { actionTaken, status: 'resolved' }
    );
  }
}
