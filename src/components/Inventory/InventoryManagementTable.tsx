import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditItemModal from './EditItemModal';
import TrackItemModal from './TrackItemModal';
import { InventoryItem } from '../../types/inventory';

interface InventoryManagementTableProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onTrack: (item: InventoryItem) => void;
}

const InventoryManagementTable: React.FC<InventoryManagementTableProps> = ({
  items,
  onEdit,
  onTrack,
}) => {
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [trackingItem, setTrackingItem] = useState<InventoryItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = item => {
    setEditingItem(item);
  };

  const handleTrackClick = item => {
    setTrackingItem(item);
  };

  const handleCloseEditModal = () => {
    setEditingItem(null);
  };

  const handleCloseTrackModal = () => {
    setTrackingItem(null);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search items..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>ID</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.id}</td>
              <td>{item.location}</td>
              <td>{item.status}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </Button>
                <Button variant="info" size="sm" onClick={() => handleTrackClick(item)}>
                  Track
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(number)}>
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <EditItemModal
          show={!!editingItem}
          onHide={handleCloseEditModal}
          item={editingItem}
          onSave={() => {
            onEdit(editingItem);
            handleCloseEditModal();
          }}
        />
      )}

      {/* Track Modal */}
      {trackingItem && (
        <TrackItemModal
          show={!!trackingItem}
          onHide={handleCloseTrackModal}
          item={trackingItem}
          onSave={() => {
            onTrack(trackingItem);
            handleCloseTrackModal();
          }}
        />
      )}
    </div>
  );
};

export default InventoryManagementTable;
