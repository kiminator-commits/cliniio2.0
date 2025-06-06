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
  setCategoryFilter: (category: string | undefined) => void;
  setLocationFilter: (location: string | undefined) => void;
  setSearchQuery: (query: string | undefined) => void;
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
  setCategoryFilter: category =>
    set(state => ({
      filters: { ...state.filters, category },
    })),
  setLocationFilter: location =>
    set(state => ({
      filters: { ...state.filters, location },
    })),
  setSearchQuery: query =>
    set(state => ({
      filters: { ...state.filters, searchQuery: query },
    })),
  setPagination: pagination => set({ pagination }),
  setSorting: sorting => set({ sorting }),
}));
