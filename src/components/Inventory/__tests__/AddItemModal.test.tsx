import React from 'react';
import { render, screen } from '@testing-library/react';
import AddItemModal from '../AddItemModal';
import { useInventoryStore } from '../../../store/useInventoryStore';

describe('AddItemModal', () => {
  beforeEach(() => {
    const { setState } = useInventoryStore.getState() as any;
    setState({
      inventoryItems: [],
      categories: ['Category A', 'Category B'],
    });
  });

  const onHide = jest.fn();

  it('renders modal fields correctly', () => {
    render(<AddItemModal show={true} onHide={onHide} />);
    expect(screen.getByText(/Add Item/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
  });
}); 