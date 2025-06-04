import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { TabType } from '../../pages/Inventory/models';

interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
  description: string;
}

interface InventoryManagementTableProps {
  activeTab: TabType;
}

const InventoryManagementTable: React.FC<InventoryManagementTableProps> = ({ activeTab }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field: keyof Item) => {
    setItems(prev => 
      [...prev].sort((a, b) => {
        if (typeof a[field] === 'string') {
          return (a[field] as string).localeCompare(b[field] as string);
        }
        return (a[field] as number) - (b[field] as number);
      })
    );
  };

  const handleEdit = (item: Item) => {
    // Implement edit logic
  };

  const handleDelete = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <Form.Group className="mb-0">
          <Form.Label htmlFor="search">Search Items</Form.Label>
          <Form.Control
            id="search"
            type="text"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
      </div>

      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('quantity')}>Quantity</th>
            <th onClick={() => handleSort('category')}>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InventoryManagementTable;
