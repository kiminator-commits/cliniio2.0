import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddItemModal from '../AddItemModal';

interface InventoryStoreState {
  inventoryItems: unknown[];
  categories: string[];
  addInventoryItem: (item: unknown) => void;
}

const mockStore: InventoryStoreState = {
  inventoryItems: [],
  categories: ['Category 1', 'Category 2'],
  addInventoryItem: jest.fn(),
};

jest.mock('@/store/useInventoryStore', () => ({
  useInventoryStore: (selector: (state: InventoryStoreState) => unknown) => {
    if (selector) {
      return selector(mockStore);
    }
    return mockStore;
  },
}));

describe('AddItemModal', () => {
  const mockOnHide = jest.fn();
  const mockOnAddItem = jest.fn();

  beforeEach(() => {
    mockStore.inventoryItems = [];
    mockStore.categories = ['Test Category'];
    mockStore.addInventoryItem.mockClear();
    mockOnHide.mockClear();
    mockOnAddItem.mockClear();
  });

  it('renders modal fields correctly', () => {
    render(
      <AddItemModal
        show={true}
        onHide={mockOnHide}
        onAddItem={mockOnAddItem}
        container={document.body}
      />
    );
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
  });

  it('submits form and updates store', async () => {
    render(
      <AddItemModal
        show={true}
        onHide={mockOnHide}
        onAddItem={mockOnAddItem}
        container={document.body}
      />
    );

    const nameInput = screen.getByLabelText(/Name/i);
    const categoryInput = screen.getByLabelText(/Category/i);
    const quantityInput = screen.getByLabelText(/Quantity/i);
    const locationInput = screen.getByLabelText(/Location/i);

    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.change(categoryInput, { target: { value: 'Test Category' } });
    fireEvent.change(quantityInput, { target: { value: '5' } });
    fireEvent.change(locationInput, { target: { value: 'A1' } });

    const saveButton = screen.getByRole('button', { name: /Add Item/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockStore.addInventoryItem).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Item',
          category: 'Test Category',
          quantity: 5,
          location: 'A1',
        })
      );
      expect(mockOnAddItem).toHaveBeenCalled();
      expect(mockOnHide).toHaveBeenCalled();
    });
  });

  it('validates required fields', async () => {
    render(
      <AddItemModal
        show={true}
        onHide={mockOnHide}
        onAddItem={mockOnAddItem}
        container={document.body}
      />
    );

    const saveButton = screen.getByRole('button', { name: /Add Item/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Category is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Location is required/i)).toBeInTheDocument();
    });

    expect(mockStore.addInventoryItem).not.toHaveBeenCalled();
    expect(mockOnAddItem).not.toHaveBeenCalled();
    expect(mockOnHide).not.toHaveBeenCalled();
  });
});
