import React, { useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditItemModal from './EditItemModal';
import TrackItemModal from './TrackItemModal';
import { InventoryItem } from '../../types/inventory';
import { useInventoryStore } from '../../store/useInventoryStore';
import Pagination from '../../common/Pagination';

interface InventoryManagementTableProps {
  items: InventoryItem[];
  onAddItem: (item: InventoryItem) => void;
  onEditItem: (item: InventoryItem) => void;
  onDeleteItem: (itemId: string) => void;
}

const InventoryManagementTable: React.FC<InventoryManagementTableProps> = ({
  items,
  onAddItem,
  onEditItem,
  onDeleteItem,
}) => {
  const [editingItem, setEditingItem] = React.useState<InventoryItem | null>(null);
  const [trackingItem, setTrackingItem] = React.useState<InventoryItem | null>(null);
  const pagination = useInventoryStore(state => state.pagination);
  const setPagination = useInventoryStore(state => state.setPagination);
  const inventoryItems = useInventoryStore(state => state.inventoryItems);
  const totalPages = Math.ceil(inventoryItems.length / pagination.pageSize);

  const handleAddItem = useCallback(() => {
    onAddItem({
      id: '',
      name: '',
      category: '',
      quantity: 0,
      location: '',
    } as InventoryItem);
  }, [onAddItem]);

  const handleEditItem = useCallback((item: InventoryItem) => {
    setEditingItem(item);
  }, []);

  const handleDeleteItem = useCallback(
    (itemId: string) => {
      onDeleteItem(itemId);
    },
    [onDeleteItem]
  );

  const handleCloseEditModal = useCallback(() => {
    setEditingItem(null);
  }, []);

  const handleCloseTrackModal = useCallback(() => {
    setTrackingItem(null);
  }, []);

  return (
    <div>
      <div className="mb-4">
        <Button variant="primary" onClick={handleAddItem}>
          Add Item
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.location}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditItem(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setPagination({ ...pagination, currentPage: page })}
      />

      <EditItemModal
        show={!!editingItem}
        onHide={handleCloseEditModal}
        item={editingItem}
        onSave={() => {
          if (editingItem) {
            onEditItem(editingItem);
            handleCloseEditModal();
          }
        }}
      />

      <TrackItemModal
        show={!!trackingItem}
        onHide={handleCloseTrackModal}
        item={trackingItem}
        onSave={handleCloseTrackModal}
      />
    </div>
  );
};

export default InventoryManagementTable;
