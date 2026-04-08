import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { CreateOrderComponent } from './pages/employee/create-order/create-order.component';
import { MyOrdersComponent } from './pages/employee/my-orders/my-orders.component';
import { OrderDetailsComponent } from './pages/employee/order-details/order-details.component';
import { OrderStatusTimelineComponent } from './pages/employee/order-status-timeline/order-status-timeline.component';
import { OrdersQueueComponent } from './pages/warehouse/orders-queue/orders-queue.component';
import { InventoryCheckComponent } from './pages/warehouse/inventory-check/inventory-check.component';
import { DispatchOrderComponent } from './pages/warehouse/dispatch-order/dispatch-order.component';
import { ShipmentsQueueComponent } from './pages/operations/shipments-queue/shipments-queue.component';
import { ShipmentDetailsComponent } from './pages/operations/shipment-details/shipment-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      // Employee Routes
      {
        path: 'employee',
        children: [
          {
            path: 'create-order',
            component: CreateOrderComponent,
          },
          {
            path: 'my-orders',
            component: MyOrdersComponent,
          },
          {
            path: 'order-details/:id',
            component: OrderDetailsComponent,
          },
          {
            path: 'order-status/:id',
            component: OrderStatusTimelineComponent,
          },
        ],
      },
      // Warehouse Routes
      {
        path: 'warehouse',
        children: [
          {
            path: 'orders-queue',
            component: OrdersQueueComponent,
          },
          {
            path: 'inventory-check',
            component: InventoryCheckComponent,
          },
          {
            path: 'dispatch-order/:id',
            component: DispatchOrderComponent,
          },
        ],
      },
      // Operations Routes
      {
        path: 'operations',
        children: [
          {
            path: 'shipments-queue',
            component: ShipmentsQueueComponent,
          },
          {
            path: 'shipment-details/:id',
            component: ShipmentDetailsComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
