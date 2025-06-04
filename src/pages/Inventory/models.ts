export type TabType = 'tools' | 'supplies' | 'equipment' | 'officeHardware';

export interface BaseInventoryItem {
  id: number;
  name: string;
  category: string;
  toolId: string;
  location: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  type: string;
}

export interface InventoryItem extends BaseInventoryItem {
  lastMaintenance: string;
  nextMaintenance: string;
  maintenanceStatus: 'Up to Date' | 'Due Soon' | 'Overdue';
  usageCount: number;
  lastUsed: string;
}

export interface SupplyItem extends BaseInventoryItem {
  quantity: number;
  minQuantity: number;
  reorderPoint: number;
  supplier: string;
  lastOrdered: string;
  nextOrderDate: string;
}

export interface EquipmentItem extends BaseInventoryItem {
  serialNumber: string;
  manufacturer: string;
  model: string;
  purchaseDate: string;
  warrantyExpiry: string;
  maintenanceHistory: {
    date: string;
    type: string;
    notes: string;
  }[];
}

export interface OfficeHardwareItem extends BaseInventoryItem {
  assignedTo: string;
  department: string;
  purchaseDate: string;
  warrantyExpiry: string;
  condition: 'New' | 'Good' | 'Fair' | 'Poor';
  notes: string;
}
