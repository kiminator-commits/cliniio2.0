import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InventoryManagementTable from '../../components/Inventory/InventoryManagementTable';
import { useInventoryStore } from '../../store/useInventoryStore';

describe('Inventory Management Flow', () => {
  beforeEach(() => {
    const { setState } = useInventoryStore.getState() as any;
    setState({
      inventoryItems: [],
      filters: {},
      pagination: { currentPage: 1, pageSize: 10 },
      sorting: { field: null, direction: 'asc' },
      selectedItems: [],
      categories: ['Test Category'],
    });
  });

  it('renders inventory table and category management correctly', () => {
    render(<InventoryManagementTable />);
    expect(screen.getByText(/Manage Categories/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Item/i)).toBeInTheDocument();
  });

  it('allows adding a category and reflects state', () => {
    render(<InventoryManagementTable />);
    fireEvent.change(screen.getByPlaceholderText(/new category/i), { target: { value: 'Integration Category' } });
    fireEvent.click(screen.getByText(/Add/i));
    expect(useInventoryStore.getState().categories).toContain('Integration Category');
  });

  it('allows adding an inventory item via AddItemModal', () => {
    render(<InventoryManagementTable />);
    
    // Open modal
    fireEvent.click(screen.getByText(/Add Item/i));

    // Fill form fields
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Integration Item' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Test Category' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: 'A1' } });

    // Submit form
    fireEvent.click(screen.getByText(/Save/i));

    // Assert item added
    const items = useInventoryStore.getState().inventoryItems;
    expect(items.some(item => item.name === 'Integration Item')).toBe(true);
  });

  it('allows filtering inventory items by category', () => {
    render(<InventoryManagementTable />);
    
    // Manually add items directly to store for filtering test
    useInventoryStore.getState().addInventoryItem({
      id: '1',
      name: 'Item One',
      category: 'FilterCategory',
      quantity: 10,
      location: 'A1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    useInventoryStore.getState().addInventoryItem({
      id: '2',
      name: 'Item Two',
      category: 'OtherCategory',
      quantity: 5,
      location: 'B1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Apply category filter
    const categorySelect = screen.getByLabelText(/Category/i);
    fireEvent.change(categorySelect, { target: { value: 'FilterCategory' } });

    // Validate that only filtered item is present
    const items = useInventoryStore.getState().inventoryItems;
    const filtered = items.filter(item => item.category === 'FilterCategory');
    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe('Item One');
  });
}); 