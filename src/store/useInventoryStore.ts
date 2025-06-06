import { create } from 'zustand';
import { InventoryItem, InventoryFilter } from '../types/inventoryTypes';

interface InventoryStore {
  inventoryItems: InventoryItem[];
  filters: InventoryFilter;
  setInventoryItems: (items: InventoryItem[]) => void;
  addInventoryItem: (item: InventoryItem) => void;
  setFilters: (filters: InventoryFilter) => void;
}

export const useInventoryStore = create<InventoryStore>(set => ({
  inventoryItems: [],
  filters: {},
  setInventoryItems: items => set({ inventoryItems: items }),
  addInventoryItem: item => set(state => ({ inventoryItems: [...state.inventoryItems, item] })),
  setFilters: filters => set({ filters }),
}));
