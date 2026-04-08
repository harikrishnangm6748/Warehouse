import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { InventoryItem, InventoryReservation } from '../../../models/interfaces';

@Component({
  selector: 'app-inventory-check',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inventory-check.component.html',
  styleUrls: ['./inventory-check.component.css']
})
export class InventoryCheckComponent implements OnInit {
  inventoryItems: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  selectedItems: InventoryReservation[] = [];
  loading = false;
  searchQuery = '';
  selectedWarehouse = 'ALL';
  showReservationForm = false;
  selectedItemForReservation: InventoryItem | null = null;
  reservationQuantity = 0;

  warehouses = ['ALL', 'Warehouse A', 'Warehouse B', 'Warehouse C'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.inventoryItems = [
        {
          id: '1',
          productId: 'PROD-001',
          productName: 'Widget A',
          sku: 'SKU-001',
          quantity: 100,
          reservedQuantity: 35,
          availableQuantity: 65,
          warehouseId: 'WH-001',
          location: 'Rack A-01'
        },
        {
          id: '2',
          productId: 'PROD-002',
          productName: 'Widget B',
          sku: 'SKU-002',
          quantity: 50,
          reservedQuantity: 20,
          availableQuantity: 30,
          warehouseId: 'WH-002',
          location: 'Rack B-05'
        },
        {
          id: '3',
          productId: 'PROD-003',
          productName: 'Widget C',
          sku: 'SKU-003',
          quantity: 200,
          reservedQuantity: 100,
          availableQuantity: 100,
          warehouseId: 'WH-001',
          location: 'Rack C-02'
        },
        {
          id: '4',
          productId: 'PROD-004',
          productName: 'Widget D',
          sku: 'SKU-004',
          quantity: 10,
          reservedQuantity: 8,
          availableQuantity: 2,
          warehouseId: 'WH-003',
          location: 'Rack D-10'
        },
        {
          id: '5',
          productId: 'PROD-005',
          productName: 'Widget E',
          sku: 'SKU-005',
          quantity: 75,
          reservedQuantity: 0,
          availableQuantity: 75,
          warehouseId: 'WH-002',
          location: 'Rack E-03'
        }
      ];
      this.filterInventory();
      this.loading = false;
    }, 500);
  }

  filterInventory(): void {
    this.filteredItems = this.inventoryItems.filter(item => {
      const searchMatch = 
        item.productName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(this.searchQuery.toLowerCase());
      return searchMatch;
    });
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.filterInventory();
  }

  openReservationForm(item: InventoryItem): void {
    this.selectedItemForReservation = item;
    this.reservationQuantity = 0;
    this.showReservationForm = true;
  }

  closeReservationForm(): void {
    this.showReservationForm = false;
    this.selectedItemForReservation = null;
    this.reservationQuantity = 0;
  }

  reserveItem(): void {
    if (this.selectedItemForReservation && this.reservationQuantity > 0 && this.reservationQuantity <= this.selectedItemForReservation.availableQuantity) {
      const reservation: InventoryReservation = {
        id: Math.random().toString(36).substr(2, 9),
        orderId: 'ORD-001',
        itemId: this.selectedItemForReservation.id,
        quantity: this.reservationQuantity,
        reservedDate: new Date(),
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'ACTIVE'
      };

      this.selectedItems.push(reservation);
      this.selectedItemForReservation.availableQuantity -= this.reservationQuantity;
      this.selectedItemForReservation.reservedQuantity += this.reservationQuantity;

      this.closeReservationForm();
    }
  }

  removeReservation(index: number): void {
    const reservation = this.selectedItems[index];
    const item = this.inventoryItems.find(i => i.id === reservation.itemId);
    if (item) {
      item.availableQuantity += reservation.quantity;
      item.reservedQuantity -= reservation.quantity;
    }
    this.selectedItems.splice(index, 1);
  }

  confirmReservations(): void {
    if (this.selectedItems.length > 0) {
      alert('Reservations confirmed for ' + this.selectedItems.length + ' items');
      this.selectedItems = [];
      this.loadInventory();
    }
  }

  getStockStatus(availableQuantity: number, totalQuantity: number): string {
    const percentage = (availableQuantity / totalQuantity) * 100;
    if (percentage > 50) return 'In Stock';
    if (percentage > 20) return 'Low Stock';
    return 'Critical';
  }

  getStockColor(availableQuantity: number, totalQuantity: number): string {
    const percentage = (availableQuantity / totalQuantity) * 100;
    if (percentage > 50) return '#28a745';
    if (percentage > 20) return '#ffc107';
    return '#dc3545';
  }
}
