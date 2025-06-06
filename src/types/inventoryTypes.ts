export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  status: string;
  lastUpdated: string;
  toolId?: string;
  supplyId?: string;
  equipmentId?: string;
  hardwareId?: string;
}

export interface InventoryFilter {
  category?: string | undefined;
  location?: string | undefined;
  searchQuery?: string | undefined;
}

export interface InventoryPagination {
  currentPage: number;
  pageSize: number;
}
