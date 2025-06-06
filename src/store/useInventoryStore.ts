import { create } from 'zustand';
import { InventoryItem, InventoryFilter, InventoryPagination } from '../types/inventoryTypes';

interface InventoryStore {
  inventoryItems: InventoryItem[];
  filters: InventoryFilter;
  pagination: InventoryPagination;
  sorting: {
    field: keyof InventoryItem | null;
    direction: 'asc' | 'desc';
  };
  setInventoryItems: (items: InventoryItem[]) => void;
  addInventoryItem: (item: InventoryItem) => void;
  setFilters: (filters: InventoryFilter) => void;
  setPagination: (pagination: InventoryPagination) => void;
  setSorting: (sorting: { field: keyof InventoryItem | null; direction: 'asc' | 'desc' }) => void;
}

export const useInventoryStore = create<InventoryStore>(set => ({
  inventoryItems: [],
  filters: {},
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
  sorting: {
    field: null,
    direction: 'asc',
  },
  setInventoryItems: items => set({ inventoryItems: items }),
  addInventoryItem: item => set(state => ({ inventoryItems: [...state.inventoryItems, item] })),
  setFilters: filters => set({ filters }),
  setPagination: pagination => set({ pagination }),
  setSorting: sorting => set({ sorting }),
}));
