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
  selectedItems: string[];
  categories: string[];
  isInventoryLoading: boolean;
  isCategoriesLoading: boolean;
  setInventoryItems: (items: InventoryItem[]) => void;
  addInventoryItem: (item: InventoryItem) => void;
  setFilters: (filters: InventoryFilter) => void;
  setCategoryFilter: (category: string | undefined) => void;
  setLocationFilter: (location: string | undefined) => void;
  setSearchQuery: (query: string | undefined) => void;
  setPagination: (pagination: InventoryPagination) => void;
  setSorting: (sorting: { field: keyof InventoryItem | null; direction: 'asc' | 'desc' }) => void;
  setSelectedItems: (ids: string[]) => void;
  toggleSelectedItem: (id: string) => void;
  setCategories: (categories: string[]) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  setInventoryLoading: (loading: boolean) => void;
  setCategoriesLoading: (loading: boolean) => void;
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
  selectedItems: [],
  categories: [],
  isInventoryLoading: false,
  isCategoriesLoading: false,
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
  setSelectedItems: ids => set({ selectedItems: ids }),
  toggleSelectedItem: id =>
    set(state => ({
      selectedItems: state.selectedItems.includes(id)
        ? state.selectedItems.filter(itemId => itemId !== id)
        : [...state.selectedItems, id],
    })),
  setCategories: categories => set({ categories }),
  addCategory: category =>
    set(state => ({
      categories: state.categories.includes(category)
        ? state.categories
        : [...state.categories, category],
    })),
  removeCategory: category =>
    set(state => ({
      categories: state.categories.filter(c => c !== category),
    })),
  setInventoryLoading: loading => set({ isInventoryLoading: loading }),
  setCategoriesLoading: loading => set({ isCategoriesLoading: loading }),
}));
