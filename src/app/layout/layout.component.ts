import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <h1 class="logo">Warehouse</h1>
        </div>

        <nav class="sidebar-nav">
          <a routerLink="/app/dashboard" routerLinkActive="active" class="nav-item">
            <i class="icon">📊</i>
            Dashboard
          </a>
          <a routerLink="/app/notifications" routerLinkActive="active" class="nav-item">
            <i class="icon">🔔</i>
            Notifications
            <span class="badge" *ngIf="(unreadCount$ | async) as count" [hidden]="count === 0">
              {{ count }}
            </span>
          </a>

          <div class="nav-section">
            <h3>Employee</h3>
            <a routerLink="/app/employee/create-order" routerLinkActive="active" class="nav-item">
              <i class="icon">➕</i>
              Create Order
            </a>
            <a routerLink="/app/employee/my-orders" routerLinkActive="active" class="nav-item">
              <i class="icon">📋</i>
              My Orders
            </a>
          </div>

          <div class="nav-section">
            <h3>Warehouse</h3>
            <a routerLink="/app/warehouse/orders-queue" routerLinkActive="active" class="nav-item">
              <i class="icon">📦</i>
              Orders Queue
            </a>
            <a routerLink="/app/warehouse/inventory-check" routerLinkActive="active" class="nav-item">
              <i class="icon">🔍</i>
              Inventory Check
            </a>
          </div>

          <div class="nav-section">
            <h3>Operations</h3>
            <a routerLink="/app/operations/shipments-queue" routerLinkActive="active" class="nav-item">
              <i class="icon">🚚</i>
              Shipments Queue
            </a>
          </div>
        </nav>

        <div class="sidebar-footer">
          <button class="logout-btn" (click)="logout()">
            <i class="icon">🚪</i>
            Logout
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Top Bar -->
        <header class="top-bar">
          <div class="top-bar-content">
            <div class="user-info">
              <span class="user-name">{{ (currentUser$ | async)?.name }}</span>
              <span class="user-role">{{ (currentUser$ | async)?.role | uppercase }}</span>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <div class="page-content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      height: 100vh;
      background-color: #f5f5f5;
    }

    .sidebar {
      width: 280px;
      background-color: #2c3e50;
      color: white;
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
    }

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .logo {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }

    .sidebar-nav {
      flex: 1;
      padding: 20px 0;
      overflow-y: auto;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      color: #ecf0f1;
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
    }

    .nav-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
      padding-left: 24px;
    }

    .nav-item.active {
      background-color: #3498db;
      color: white;
      border-left: 4px solid #2980b9;
    }

    .nav-section {
      padding: 15px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav-section h3 {
      margin: 0;
      padding: 0 20px 10px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      color: #95a5a6;
      letter-spacing: 1px;
    }

    .icon {
      font-size: 18px;
      display: inline-block;
      min-width: 24px;
    }

    .badge {
      position: absolute;
      right: 20px;
      background-color: #e74c3c;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }

    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .logout-btn {
      width: 100%;
      padding: 10px;
      background-color: #e74c3c;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: background-color 0.3s ease;
    }

    .logout-btn:hover {
      background-color: #c0392b;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .top-bar {
      background-color: white;
      border-bottom: 1px solid #ecf0f1;
      padding: 15px 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .top-bar-content {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }

    .user-name {
      font-weight: bold;
      color: #2c3e50;
    }

    .user-role {
      font-size: 12px;
      color: #7f8c8d;
    }

    .page-content {
      flex: 1;
      padding: 30px;
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      .layout {
        flex-direction: column;
      }

      .sidebar {
        width: 100%;
        height: auto;
        flex-direction: row;
      }

      .sidebar-nav {
        display: flex;
        flex: 1;
        padding: 0;
        gap: 0;
      }

      .nav-section {
        display: none;
      }

      .page-content {
        padding: 15px;
      }
    }
  `],
})
export class LayoutComponent implements OnInit {
  currentUser$ = this.authService.currentUser$;
  unreadCount$ = this.notificationService.unreadCount$;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notificationService.getUnreadCount().subscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
