import { inventoryService } from '../inventoryService';
import { InventoryItem } from '../../types/inventoryTypes';

describe('inventoryService', () => {
  it('should return mock inventory items from fetchInventoryItems', async () => {
    const items = await inventoryService.fetchInventoryItems();
    expect(Array.isArray(items)).toBe(true);
  });

  it('should add inventory item correctly with addInventoryItem', async () => {
    const mockItem: InventoryItem = {
      id: '123',
      name: 'New Item',
      category: 'Test',
      quantity: 10,
      location: 'A1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await inventoryService.addInventoryItem(mockItem);
    expect(result).toEqual(mockItem);
  });

  it('should resolve deleteInventoryItem without throwing', async () => {
    await expect(inventoryService.deleteInventoryItem('123')).resolves.toBeUndefined();
  });
});
