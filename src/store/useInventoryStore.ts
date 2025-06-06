import { create } from 'zustand';
import { InventoryItem, InventoryFilter, InventoryPagination } from '../types/inventoryTypes';

interface InventoryStore {
  inventoryItems: InventoryItem[];
  filters: InventoryFilter;
  pagination: InventoryPagination;
  setInventoryItems: (items: InventoryItem[]) => void;
  addInventoryItem: (item: InventoryItem) => void;
  setFilters: (filters: InventoryFilter) => void;
  setPagination: (pagination: InventoryPagination) => void;
}

export const useInventoryStore = create<InventoryStore>(set => ({
  inventoryItems: [],
  filters: {},
  pagination: {
    currentPage: 1,
    pageSize: 10
  },
  setInventoryItems: items => set({ inventoryItems: items }),
  addInventoryItem: item => set(state => ({ inventoryItems: [...state.inventoryItems, item] })),
  setFilters: filters => set({ filters }),
  setPagination: pagination => set({ pagination }),
}));
