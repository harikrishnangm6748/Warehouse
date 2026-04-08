import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-page">
      <div class="page-header">
        <h1>Notifications</h1>
        <div class="header-actions">
          <button class="btn btn-secondary" (click)="markAllAsRead()">
            Mark all as read
          </button>
          <button class="btn btn-danger" (click)="deleteAll()">
            Delete all
          </button>
        </div>
      </div>

      <div class="notifications-list">
        <div *ngIf="(notifications$ | async) as notifications">
          <div *ngIf="notifications.length === 0" class="empty-state">
            <p>No notifications</p>
          </div>

          <div *ngFor="let notification of notifications" class="notification-item" [ngClass]="{ unread: !notification.read }">
            <div class="notification-badge" [ngClass]="'type-' + notification.type"></div>
            <div class="notification-content">
              <h3 class="notification-title">{{ notification.title }}</h3>
              <p class="notification-message">{{ notification.message }}</p>
              <small class="notification-date">{{ notification.createdDate | date: 'medium' }}</small>
            </div>
            <div class="notification-actions">
              <button
                class="btn-icon"
                (click)="markAsRead(notification.id)"
                *ngIf="!notification.read"
                title="Mark as read"
              >
                ✓
              </button>
              <button
                class="btn-icon"
                (click)="delete(notification.id)"
                title="Delete"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notifications-page {
      max-width: 900px;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .page-header h1 {
      margin: 0;
      color: #2c3e50;
    }

    .header-actions {
      display: flex;
      gap: 10px;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-secondary {
      background-color: #95a5a6;
      color: white;
    }

    .btn-secondary:hover {
      background-color: #7f8c8d;
    }

    .btn-danger {
      background-color: #e74c3c;
      color: white;
    }

    .btn-danger:hover {
      background-color: #c0392b;
    }

    .notifications-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: #7f8c8d;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .notification-item {
      display: flex;
      gap: 15px;
      padding: 15px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #bdc3c7;
      transition: background-color 0.3s ease;
    }

    .notification-item.unread {
      background-color: #f0f8ff;
      border-left-color: #3498db;
    }

    .notification-badge {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .type-info {
      background-color: #3498db;
    }

    .type-warning {
      background-color: #f39c12;
    }

    .type-error {
      background-color: #e74c3c;
    }

    .type-success {
      background-color: #27ae60;
    }

    .notification-content {
      flex: 1;
      min-width: 0;
    }

    .notification-title {
      margin: 0 0 8px;
      color: #2c3e50;
      font-size: 14px;
      font-weight: 600;
    }

    .notification-message {
      margin: 0 0 8px;
      color: #7f8c8d;
      font-size: 13px;
      word-wrap: break-word;
    }

    .notification-date {
      color: #95a5a6;
      font-size: 12px;
    }

    .notification-actions {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }

    .btn-icon {
      width: 32px;
      height: 32px;
      border: 1px solid #bdc3c7;
      background-color: white;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .btn-icon:hover {
      background-color: #ecf0f1;
      border-color: #95a5a6;
    }
  `],
})
export class NotificationsComponent implements OnInit {
  notifications$ = this.notificationService.notifications$;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe();
  }

  markAsRead(id: string): void {
    this.notificationService.markAsRead(id).subscribe();
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe(() => {
      this.notificationService.getNotifications().subscribe();
    });
  }

  delete(id: string): void {
    this.notificationService.deleteNotification(id).subscribe(() => {
      this.notificationService.getNotifications().subscribe();
    });
  }

  deleteAll(): void {
    this.notificationService.deleteAllNotifications().subscribe(() => {
      this.notificationService.getNotifications().subscribe();
    });
  }
}
