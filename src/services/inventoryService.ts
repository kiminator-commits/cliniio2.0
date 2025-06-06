import { InventoryItem } from '../types/inventoryTypes';

export const inventoryService = {
  async fetchInventoryItems(): Promise<InventoryItem[]> {
    // TODO: Implement actual API call
    return []; // Temporary mock
  },

  async addInventoryItem(item: InventoryItem): Promise<InventoryItem> {
    // TODO: Implement actual API call
    return item; // Temporary mock
  },

  async deleteInventoryItem(): Promise<void> {
    // TODO: Implement actual API call
    return; // Temporary mock
  },
};
