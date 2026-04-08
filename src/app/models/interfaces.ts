// User Model
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'EMPLOYEE' | 'WAREHOUSE' | 'OPERATIONS' | 'ADMIN';
  department?: string;
  avatar?: string;
}

// Order Models
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  createdBy: string;
  createdDate: Date;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  shippingAddress?: Address;
  description?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  reservedQuantity?: number;
  unitPrice: number;
  totalPrice: number;
  sku?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

// Order Status History
export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  changedBy: string;
  changedDate: Date;
  notes?: string;
}

// Inventory Models
export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  warehouseId?: string;
  location?: string;
}

export interface InventoryReservation {
  id: string;
  orderId: string;
  itemId: string;
  quantity: number;
  reservedDate: Date;
  expiryDate: Date;
  status: 'ACTIVE' | 'FULFILLED' | 'EXPIRED' | 'CANCELLED';
}

// Shipment Models
export interface Shipment {
  id: string;
  shipmentNumber: string;
  orderId: string;
  orderNumber: string;
  status: ShipmentStatus;
  createdDate: Date;
  estimatedDeliveryDate?: Date;
  trackingNumber?: string;
  carrier?: string;
  tasks: DeliveryTask[];
  exceptions: ExceptionRecord[];
}

export type ShipmentStatus = 'PENDING' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'FAILED';

export interface DeliveryTask {
  id: string;
  shipmentId: string;
  taskNumber: string;
  assignedTo?: string;
  type: 'PICK' | 'PACK' | 'DISPATCH' | 'DELIVER';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  createdDate: Date;
  completedDate?: Date;
  notes?: string;
}

export interface ExceptionRecord {
  id: string;
  shipmentId: string;
  exceptionCode: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdDate: Date;
  resolvedDate?: Date;
  resolvedBy?: string;
  attachments?: string[];
}

// Notification Model
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  isRead: boolean;
  createdDate: Date;
  actionUrl?: string;
  icon?: string;
}

// Dashboard Statistics
export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  activeShipments: number;
  failedDeliveries: number;
}

// Create Order DTO
export interface CreateOrderDto {
  customerId: string;
  customerName: string;
  items: CreateOrderItemDto[];
  totalAmount: number;
  shippingAddress: Address;
  description?: string;
}

export interface CreateOrderItemDto {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}
