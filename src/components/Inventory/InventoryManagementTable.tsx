import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import AddItemModal from './AddItemModal';
import EditItemModal from './EditItemModal';
import TrackItemModal from './TrackItemModal';
import NewAddItemModal from './NewAddItemModal';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  p2Status: string;
  lastUpdated: string;
}

const InventoryManagementTable: React.FC = () => {
  // State Management
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [p2StatusFilter, setP2StatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof InventoryItem>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock data - replace with actual API call
  const [items] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Stethoscope',
      category: 'diagnostic',
      location: 'cabinet-a',
      quantity: 5,
      p2Status: 'available',
      lastUpdated: '2024-02-20'
    },
    // ... other items
  ]);

  // Filtering Logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterLocation || item.location === filterLocation;
    const matchesP2Status = !filterStatus || item.p2Status === filterStatus;
    return matchesSearch && matchesCategory && matchesP2Status;
  });

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // Event Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterLocation(e.target.value);
    setCurrentPage(1);
  };

  const handleP2StatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleTrackItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowTrackModal(true);
  };

  const handleSaveEdit = (updatedItem: InventoryItem) => {
    // Implement edit save logic
    console.log('Save edited item:', updatedItem);
    setShowEditModal(false);
  };

  const handleSaveTrack = (trackedItem: InventoryItem) => {
    // Implement track save logic
    console.log('Save tracked item:', trackedItem);
    setShowTrackModal(false);
  };

  const handleDeleteItem = (id: string) => {
    // Implement delete functionality
    console.log('Delete item:', id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow p-6">
        {/* Top Controls Section */}
        <div className="flex flex-col">
          {/* Top Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Left Controls */}
            <div className="flex flex-col sm:flex-row gap-4 min-w-[200px]">
              <Form.Control
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
              <Form.Select
                value={p2StatusFilter}
                onChange={(e) => setP2StatusFilter(e.target.value)}
                className="w-full sm:w-40"
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="in-use">In Use</option>
                <option value="maintenance">Maintenance</option>
              </Form.Select>
            </div>

            {/* Right Controls */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="success">Add Item</Button>
              <Button variant="outline-primary" onClick={() => setShowTrackModal(true)}>
                Track Items
              </Button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full">
          <Table responsive hover className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Quantity</th>
                <th>P2 Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.location}</td>
                  <td>{item.quantity}</td>
                  <td>{item.p2Status}</td>
                  <td>{item.lastUpdated}</td>
                  <td>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEditItem(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleTrackItem(item)}
                      >
                        Track
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Bottom Controls - Condensed */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <Form.Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="w-24 h-8 text-sm"
          >
            <option value={10}>10/page</option>
            <option value={25}>25/page</option>
            <option value={50}>50/page</option>
          </Form.Select>

          <div className="flex items-center gap-1">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="h-8 px-2"
            >
              First
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 px-2"
            >
              Prev
            </Button>
            <span className="text-sm text-gray-600 px-2">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 px-2"
            >
              Next
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="h-8 px-2"
            >
              Last
            </Button>
          </div>
        </div>

        {/* Modals */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} backdrop="static" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter item name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select>
                  <option value="">Select Category</option>
                  <option value="diagnostic">Diagnostic</option>
                  <option value="monitoring">Monitoring</option>
                  <option value="surgical">Surgical</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Select>
                  <option value="">Select Location</option>
                  <option value="cabinet-a">Cabinet A</option>
                  <option value="cabinet-b">Cabinet B</option>
                  <option value="storage">Storage</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" min="0" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>P2 Status</Form.Label>
                <Form.Select>
                  <option value="">Select Status</option>
                  <option value="available">Available</option>
                  <option value="in-use">In Use</option>
                  <option value="maintenance">Maintenance</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={() => {/* handle save logic */}}>
              Save Item
            </Button>
          </Modal.Footer>
        </Modal>
        <EditItemModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          item={selectedItem}
          onSave={handleSaveEdit}
        />
        <TrackItemModal
          show={showTrackModal}
          onHide={() => setShowTrackModal(false)}
          item={selectedItem}
          onTrack={handleSaveTrack}
        />
      </div>
    </div>
  );
};

export default InventoryManagementTable;
