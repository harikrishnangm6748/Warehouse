import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { ShipmentService } from '../../services/shipment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {{ (currentUser$ | async)?.name }}!</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-content">
            <h3>Total Orders</h3>
            <p class="stat-value">{{ totalOrders }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">⏳</div>
          <div class="stat-content">
            <h3>Pending Orders</h3>
            <p class="stat-value">{{ pendingOrders }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <h3>Shipped</h3>
            <p class="stat-value">{{ shippedOrders }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🚚</div>
          <div class="stat-content">
            <h3>Active Shipments</h3>
            <p class="stat-value">{{ activeShipments }}</p>
          </div>
        </div>
      </div>

      <div class="dashboard-content">
        <section class="recent-orders">
          <h2>Recent Orders</h2>
          <div class="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Status</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let order of recentOrders">
                  <td><strong>{{ order.orderNumber }}</strong></td>
                  <td>
                    <span class="badge" [ngClass]="'status-' + order.status">
                      {{ order.status | uppercase }}
                    </span>
                  </td>
                  <td>{{ order.items.length }} items</td>
                  <td>${{ order.totalAmount | number: '1.2-2' }}</td>
                  <td>{{ order.createdDate | date: 'short' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="active-shipments">
          <h2>Active Shipments</h2>
          <div class="shipments-list">
            <div *ngFor="let shipment of recentShipments" class="shipment-item">
              <div class="shipment-info">
                <h4>{{ shipment.shipmentNumber }}</h4>
                <p>Tracking: {{ shipment.trackingNumber }}</p>
                <small>Expected: {{ shipment.expectedDeliveryDate | date: 'short' }}</small>
              </div>
              <div class="shipment-status">
                <span class="badge" [ngClass]="'status-' + shipment.status">
                  {{ shipment.status | uppercase }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 30px;
    }

    .dashboard-header h1 {
      margin: 0 0 10px;
      color: #2c3e50;
      font-size: 32px;
    }

    .dashboard-header p {
      margin: 0;
      color: #7f8c8d;
      font-size: 16px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 20px;
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .stat-icon {
      font-size: 40px;
    }

    .stat-content h3 {
      margin: 0;
      color: #7f8c8d;
      font-size: 14px;
      font-weight: 500;
    }

    .stat-value {
      margin: 8px 0 0;
      color: #2c3e50;
      font-size: 28px;
      font-weight: bold;
    }

    .dashboard-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    section h2 {
      margin: 0 0 20px;
      color: #2c3e50;
      font-size: 18px;
    }

    .orders-table {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      text-align: left;
      padding: 12px;
      border-bottom: 1px solid #ecf0f1;
    }

    th {
      background-color: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }

    tr:hover {
      background-color: #f8f9fa;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .status-pending {
      background-color: #fdeaa8;
      color: #856404;
    }

    .status-processing {
      background-color: #bee5eb;
      color: #0c5460;
    }

    .status-shipped {
      background-color: #d1ecf1;
      color: #0c5460;
    }

    .status-delivered {
      background-color: #d4edda;
      color: #155724;
    }

    .status-in-transit {
      background-color: #d1ecf1;
      color: #0c5460;
    }

    .status-exception {
      background-color: #f8d7da;
      color: #721c24;
    }

    .shipments-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .shipment-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background-color: #f8f9fa;
      border-radius: 6px;
    }

    .shipment-info h4 {
      margin: 0;
      color: #2c3e50;
      font-size: 14px;
    }

    .shipment-info p {
      margin: 4px 0;
      color: #7f8c8d;
      font-size: 12px;
    }

    .shipment-info small {
      color: #95a5a6;
    }

    @media (max-width: 768px) {
      .dashboard-content {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class DashboardComponent implements OnInit {
  currentUser$ = this.authService.currentUser$;
  totalOrders = 0;
  pendingOrders = 0;
  shippedOrders = 0;
  activeShipments = 0;
  recentOrders: any[] = [];
  recentShipments: any[] = [];

  constructor(
    private orderService: OrderService,
    private shipmentService: ShipmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.totalOrders = orders.length;
        this.pendingOrders = orders.filter((o) => o.status === 'pending').length;
        this.shippedOrders = orders.filter((o) => o.status === 'shipped').length;
        this.recentOrders = orders.slice(0, 5);
      },
    });

    this.shipmentService.getShipments().subscribe({
      next: (shipments) => {
        this.activeShipments = shipments.filter(
          (s) => s.status === 'in-transit'
        ).length;
        this.recentShipments = shipments.slice(0, 3);
      },
    });
  }
}
