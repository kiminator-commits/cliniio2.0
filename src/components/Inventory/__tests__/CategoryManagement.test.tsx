import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useInventoryStore } from '../../../store/useInventoryStore';
import CategoryManagement from '../CategoryManagement';

describe('CategoryManagement', () => {
  beforeEach(() => {
    const { setState } = useInventoryStore.getState() as any;
    setState({ categories: [] });
  });

  it('renders category input and add button', () => {
    render(<CategoryManagement />);
    expect(screen.getByPlaceholderText(/new category/i)).toBeInTheDocument();
    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });

  it('adds a new category', () => {
    render(<CategoryManagement />);
    fireEvent.change(screen.getByPlaceholderText(/new category/i), { target: { value: 'Test Category' } });
    fireEvent.click(screen.getByText(/add/i));
    expect(useInventoryStore.getState().categories).toContain('Test Category');
  });
}); 