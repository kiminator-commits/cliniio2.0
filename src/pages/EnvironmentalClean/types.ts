// Define room status types
export type RoomStatusType = 'available' | 'occupied' | 'dirty' | 'biohazard' | 'low_inventory' | 'theft' | 'out_of_order' | 'public_areas';

// Room statuses collection interface
export interface RoomStatuses {
  [key: string]: string[];
}

// Room interface
export interface Room {
  id: string;
  status: RoomStatusType;
  lastUpdated?: string;
  lastCleanedBy?: string;
  lastCleanedAt?: string;
}

// Room status option interface
export interface RoomStatusOption {
  id: RoomStatusType;
  label: string;
  icon: string;
  color: string;
} 