import { act } from 'react-dom/test-utils';
import { create } from 'zustand';
import { useInventoryStore } from '../useInventoryStore';

describe('useInventoryStore', () => {
  beforeEach(() => {
    const { setState } = useInventoryStore.getState() as any;
    setState({
      inventoryItems: [],
      filters: {},
      pagination: { currentPage: 1, pageSize: 10 },
      sorting: { field: null, direction: 'asc' },
      selectedItems: [],
      categories: [],
    });
  });

  it('adds an inventory item correctly', () => {
    act(() => {
      useInventoryStore.getState().addInventoryItem({
        id: '1',
        name: 'Test Item',
        category: 'Test',
        quantity: 5,
        location: 'A1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });

    const items = useInventoryStore.getState().inventoryItems;
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe('Test Item');
  });
});
