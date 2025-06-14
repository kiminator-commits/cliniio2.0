import React, { useState, useEffect } from 'react';
import { PageLayout } from '../../components/Layout/PageLayout';
import InventoryInsightsCard from '../../components/Inventory/InventoryInsightsCard';
import CategoriesCard from '../../components/Inventory/CategoriesCard';
import { TabType } from './types';
import { Button, Modal } from 'react-bootstrap';
import Icon from '@mdi/react';
import {
  mdiWrench,
  mdiPackageVariant,
  mdiDesktopClassic,
  mdiPrinter3d,
  mdiQrcodeScan,
} from '@mdi/js';
import { useInventoryStore } from '../../store/useInventoryStore';

const mockData = [
  {
    item: 'Scalpel',
    category: 'Tools',
    toolId: 'T-001',
    location: 'OR 1',
    p2Status: 'Active',
    cost: 150.0,
  },
  {
    item: 'Gauze',
    category: 'Supplies',
    toolId: 'S-002',
    location: 'Supply Room',
    p2Status: 'Inactive',
    cost: 25.5,
  },
  {
    item: 'Monitor',
    category: 'Equipment',
    toolId: 'E-003',
    location: 'ICU',
    p2Status: 'Active',
    cost: 2500.0,
  },
];

const mockSuppliesData = [
  {
    item: 'Gauze',
    category: 'Supplies',
    supplyId: 'S-002',
    location: 'Supply Room',
    quantity: 200,
    expiration: '2024-12-31',
    cost: 25.5,
  },
  {
    item: 'Syringe',
    category: 'Supplies',
    supplyId: 'S-003',
    location: 'Supply Room',
    quantity: 150,
    expiration: '2025-03-15',
    cost: 15.75,
  },
];

const mockEquipmentData = [
  {
    item: 'Monitor',
    category: 'Equipment',
    equipmentId: 'E-003',
    location: 'ICU',
    status: 'Operational',
    lastServiced: '2024-01-10',
    cost: 2500.0,
  },
  {
    item: 'Defibrillator',
    category: 'Equipment',
    equipmentId: 'E-004',
    location: 'ER',
    status: 'Maintenance',
    lastServiced: '2023-11-05',
    cost: 3500.0,
  },
];

const mockOfficeHardwareData = [
  {
    item: 'Printer',
    category: 'Office Hardware',
    hardwareId: 'H-001',
    location: 'Admin Office',
    status: 'Online',
    warranty: '2025-06-30',
    cost: 800.0,
  },
  {
    item: 'Desktop Computer',
    category: 'Office Hardware',
    hardwareId: 'H-002',
    location: 'Reception',
    status: 'Offline',
    warranty: '2024-09-15',
    cost: 1200.0,
  },
];

interface BaseInventoryItem {
  item: string;
  category: string;
  location: string;
  cost: number;
}

interface ToolItem extends BaseInventoryItem {
  toolId: string;
  p2Status: string;
}

interface SupplyItem extends BaseInventoryItem {
  supplyId: string;
  quantity: number;
  expiration: string;
}

interface EquipmentItem extends BaseInventoryItem {
  equipmentId: string;
  status: string;
  lastServiced: string;
}

interface OfficeHardwareItem extends BaseInventoryItem {
  hardwareId: string;
  status: string;
  warranty: string;
}

type LocalInventoryItem = ToolItem | SupplyItem | EquipmentItem | OfficeHardwareItem;

const Inventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('tools');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<LocalInventoryItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);

  const setCategoryFilter = useInventoryStore(state => state.setCategoryFilter);
  const setLocationFilter = useInventoryStore(state => state.setLocationFilter);
  const setSearchQuery = useInventoryStore(state => state.setSearchQuery);
  const filters = useInventoryStore(state => state.filters);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseTrackModal = () => setShowTrackModal(false);
  const handleShowTrackModal = () => setShowTrackModal(true);

  const handleEditClick = (item: LocalInventoryItem) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingItem(null);
  };

  const handleDeleteItem = () => {
    if (activeTab === 'tools') {
      // Implementation of delete for tools
    } else if (activeTab === 'supplies') {
      // Implementation of delete for supplies
    } else if (activeTab === 'equipment') {
      // Implementation of delete for equipment
    } else if (activeTab === 'officeHardware') {
      // Implementation of delete for office hardware
    }
  };

  // Filtered data based on search
  const filteredData = mockData.filter(
    row =>
      row.item.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.category.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.toolId.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.location.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.p2Status.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '')
  );

  const filteredSuppliesData = mockSuppliesData.filter(
    row =>
      row.item.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.category.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.supplyId.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.location.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.expiration.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '')
  );

  const filteredEquipmentData = mockEquipmentData.filter(
    row =>
      row.item.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.category.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.equipmentId.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.location.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.status.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.lastServiced.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '')
  );

  const filteredOfficeHardwareData = mockOfficeHardwareData.filter(
    row =>
      row.item.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.category.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.hardwareId.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.location.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.status.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '') ||
      row.warranty.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '')
  );

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    new FormData(form); // Create FormData but don't store it since it's not used yet

    if (activeTab === 'tools') {
      // Implementation of update for tools
    } else if (activeTab === 'supplies') {
      // Implementation of update for supplies
    } else if (activeTab === 'equipment') {
      // Implementation of update for equipment
    } else if (activeTab === 'officeHardware') {
      // Implementation of update for office hardware
    }
  };

  const handleCloseScanModal = () => setShowScanModal(false);
  const handleShowScanModal = () => setShowScanModal(true);

  const getItemId = (item: LocalInventoryItem): string => {
    if ('toolId' in item) return item.toolId;
    if ('supplyId' in item) return item.supplyId;
    if ('equipmentId' in item) return item.equipmentId;
    if ('hardwareId' in item) return item.hardwareId;
    return '';
  };

  return (
    <PageLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#5b5b5b] mb-1">Inventory Management</h1>
            <p className="text-gray-500 text-sm">
              Track and manage your inventory items and equipment
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-[#4ECDC4] flex items-center gap-4">
            <span className="text-gray-600">Item Scanner</span>
            <Button
              variant="success"
              onClick={handleShowScanModal}
              className="bg-[#4ECDC4] hover:bg-[#3db8b0] border-[#4ECDC4] hover:border-[#3db8b0] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Scan Item
            </Button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div
            className={`flex flex-col gap-4 lg:w-1/4 pl-4 transition-all duration-500 ${isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
          >
            <InventoryInsightsCard />
            <CategoriesCard onCategoryChange={handleCategoryChange} />
          </div>
          <div className="flex-1 pr-4">
            <div className="bg-white rounded-lg shadow p-6 w-full min-h-[calc(100vh-200px)] border-l-4 border-[#4ECDC4]">
              {/* Table Header and Top Controls */}
              {activeTab === 'tools' && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-700 tracking-tight flex items-center">
                    <Icon path={mdiWrench} size={1.1} color="#4ECDC4" className="mr-2" />
                    Tool Management
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      className="bg-[#4ECDC4] hover:bg-[#3db8b0] border-[#4ECDC4] hover:border-[#3db8b0] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                      onClick={handleShowAddModal}
                    >
                      Add Item
                    </Button>
                    <Button
                      variant="primary"
                      className="bg-[#4169E1] hover:bg-[#3154b3] border-[#4169E1] hover:border-[#3154b3] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                      onClick={handleShowTrackModal}
                    >
                      Track Tools
                    </Button>
                  </div>
                </div>
              )}
              {activeTab === 'supplies' && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-700 tracking-tight flex items-center">
                    <Icon path={mdiPackageVariant} size={1.1} color="#4ECDC4" className="mr-2" />
                    Supplies Management
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      className="bg-[#4ECDC4] hover:bg-[#3db8b0] border-[#4ECDC4] hover:border-[#3db8b0] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                      onClick={handleShowAddModal}
                    >
                      Add Item
                    </Button>
                  </div>
                </div>
              )}
              {activeTab === 'equipment' && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-700 tracking-tight flex items-center">
                    <Icon path={mdiPrinter3d} size={1.1} color="#4ECDC4" className="mr-2" />
                    Equipment Management
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      className="bg-[#4ECDC4] hover:bg-[#3db8b0] border-[#4ECDC4] hover:border-[#3db8b0] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                      onClick={handleShowAddModal}
                    >
                      Add Item
                    </Button>
                  </div>
                </div>
              )}
              {activeTab === 'officeHardware' && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-700 tracking-tight flex items-center">
                    <Icon path={mdiDesktopClassic} size={1.1} color="#4ECDC4" className="mr-2" />
                    Office Hardware Management
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      className="bg-[#4ECDC4] hover:bg-[#3db8b0] border-[#4ECDC4] hover:border-[#3db8b0] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                      onClick={handleShowAddModal}
                    >
                      Add Item
                    </Button>
                  </div>
                </div>
              )}
              {/* Inventory Table Controls */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline-secondary"
                    className="font-medium px-4 py-2 rounded-md border border-gray-300 shadow-sm flex items-center"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <span className="mr-2">&#x1F50D;</span> Filters
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline-secondary"
                    className="font-medium px-4 py-2 rounded-md border border-gray-300 shadow-sm flex items-center"
                    onClick={handleShowScanModal}
                  >
                    <span className="mr-2">&#x1F50D;</span> Scan Invoice
                  </Button>
                  <input
                    type="text"
                    placeholder="Search inventory..."
                    className="form-control w-full md:w-72 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.searchQuery || ''}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              {/* Expanded Filter Panel */}
              {showFilters && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-wrap gap-4">
                  {activeTab === 'tools' && (
                    <>
                      <div>
                        <label
                          htmlFor="item-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Item
                        </label>
                        <select id="item-select" className="form-select">
                          <option value="">All</option>
                          <option value="Scalpel">Scalpel</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="category-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Category
                        </label>
                        <select
                          id="category-select"
                          className="form-select"
                          value={filters.category || ''}
                          onChange={e => setCategoryFilter(e.target.value || undefined)}
                        >
                          <option value="">All</option>
                          <option value="Tools">Tools</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="location-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Location
                        </label>
                        <select
                          id="location-select"
                          className="form-select"
                          value={filters.location || ''}
                          onChange={e => setLocationFilter(e.target.value || undefined)}
                        >
                          <option value="">All</option>
                          <option value="Storage Room">Storage Room</option>
                          <option value="Lab">Lab</option>
                        </select>
                      </div>
                    </>
                  )}
                  {activeTab === 'supplies' && (
                    <>
                      <div>
                        <label
                          htmlFor="supply-item-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Item
                        </label>
                        <select id="supply-item-select" className="form-select">
                          <option value="">All</option>
                          <option value="Gauze">Gauze</option>
                          <option value="Syringe">Syringe</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="supply-category-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Category
                        </label>
                        <select id="supply-category-select" className="form-select">
                          <option value="">All</option>
                          <option value="Supplies">Supplies</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="supply-id-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Supply ID
                        </label>
                        <select id="supply-id-select" className="form-select">
                          <option value="">All</option>
                          <option value="S-002">S-002</option>
                          <option value="S-003">S-003</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="supply-location-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Location
                        </label>
                        <select id="supply-location-select" className="form-select">
                          <option value="">All</option>
                          <option value="Supply Room">Supply Room</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="quantity-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Quantity
                        </label>
                        <select id="quantity-select" className="form-select">
                          <option value="">All</option>
                          <option value="200">200</option>
                          <option value="150">150</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="expiration-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Expiration
                        </label>
                        <select id="expiration-select" className="form-select">
                          <option value="">All</option>
                          <option value="2024-12-31">2024-12-31</option>
                          <option value="2025-03-15">2025-03-15</option>
                        </select>
                      </div>
                    </>
                  )}
                  {activeTab === 'equipment' && (
                    <>
                      <div>
                        <label
                          htmlFor="equipment-item-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Item
                        </label>
                        <select id="equipment-item-select" className="form-select">
                          <option value="">All</option>
                          <option value="Monitor">Monitor</option>
                          <option value="Defibrillator">Defibrillator</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="equipment-category-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Category
                        </label>
                        <select id="equipment-category-select" className="form-select">
                          <option value="">All</option>
                          <option value="Equipment">Equipment</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="equipment-id-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Equipment ID
                        </label>
                        <select id="equipment-id-select" className="form-select">
                          <option value="">All</option>
                          <option value="E-003">E-003</option>
                          <option value="E-004">E-004</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="equipment-location-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Location
                        </label>
                        <select id="equipment-location-select" className="form-select">
                          <option value="">All</option>
                          <option value="ICU">ICU</option>
                          <option value="ER">ER</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="equipment-status-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Status
                        </label>
                        <select id="equipment-status-select" className="form-select">
                          <option value="">All</option>
                          <option value="Operational">Operational</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="last-serviced-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Last Serviced
                        </label>
                        <select id="last-serviced-select" className="form-select">
                          <option value="">All</option>
                          <option value="2024-01-10">2024-01-10</option>
                          <option value="2023-11-05">2023-11-05</option>
                        </select>
                      </div>
                    </>
                  )}
                  {activeTab === 'officeHardware' && (
                    <>
                      <div>
                        <label
                          htmlFor="hardware-item-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Item
                        </label>
                        <select id="hardware-item-select" className="form-select">
                          <option value="">All</option>
                          <option value="Printer">Printer</option>
                          <option value="Desktop Computer">Desktop Computer</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="hardware-category-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Category
                        </label>
                        <select id="hardware-category-select" className="form-select">
                          <option value="">All</option>
                          <option value="Office Hardware">Office Hardware</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="hardware-id-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Hardware ID
                        </label>
                        <select id="hardware-id-select" className="form-select">
                          <option value="">All</option>
                          <option value="H-005">H-005</option>
                          <option value="H-006">H-006</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="hardware-location-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Location
                        </label>
                        <select id="hardware-location-select" className="form-select">
                          <option value="">All</option>
                          <option value="Admin Office">Admin Office</option>
                          <option value="Reception">Reception</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="hardware-status-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Status
                        </label>
                        <select id="hardware-status-select" className="form-select">
                          <option value="">All</option>
                          <option value="Online">Online</option>
                          <option value="Offline">Offline</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="hardware-warranty-select"
                          className="block text-xs font-semibold text-gray-600 mb-1"
                        >
                          Warranty
                        </label>
                        <select id="hardware-warranty-select" className="form-select">
                          <option value="">All</option>
                          <option value="2025-06-30">2025-06-30</option>
                          <option value="2024-09-15">2024-09-15</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              )}
              {/* Inventory Table */}
              {activeTab === 'tools' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Tool ID
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          P2 STATUS
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.slice(0, itemsPerPage).map((row, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 whitespace-nowrap">{row.item}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.category}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.toolId}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.location}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.p2Status}</td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <div className="flex gap-2">
                              <Button
                                variant="link"
                                size="sm"
                                className="text-[#4169E1] hover:text-[#3154b3] p-1"
                                onClick={() => handleEditClick(row)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="link"
                                size="sm"
                                className="text-red-600 hover:text-red-700 p-1"
                                onClick={() => handleDeleteItem()}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="link"
                                size="sm"
                                className="text-[#20B2AA] hover:text-[#1a8f89]"
                              >
                                Track
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'supplies' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Supply ID
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Expiration
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSuppliesData.slice(0, itemsPerPage).map((row, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 whitespace-nowrap">{row.item}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.category}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.supplyId}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.location}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.quantity}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.expiration}</td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <div className="flex gap-2">
                              <Button
                                variant="link"
                                size="sm"
                                className="text-[#4169E1] hover:text-[#3154b3] p-1"
                                onClick={() => handleEditClick(row)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="link"
                                size="sm"
                                className="text-red-600 hover:text-red-700 p-1"
                                onClick={() => handleDeleteItem()}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="link"
                                size="sm"
                                className="text-[#20B2AA] hover:text-[#1a8f89]"
                              >
                                Track
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'equipment' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Equipment ID
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Last Serviced
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredEquipmentData.slice(0, itemsPerPage).map((row, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 whitespace-nowrap">{row.item}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.category}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.equipmentId}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.location}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.status}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.lastServiced}</td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <div className="flex gap-2">
                              <Button
                                variant="link"
                                size="sm"
                                className="text-[#4169E1] hover:text-[#3154b3] p-1"
                                onClick={() => handleEditClick(row)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="link"
                                size="sm"
                                className="text-red-600 hover:text-red-700 p-1"
                                onClick={() => handleDeleteItem()}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="link"
                                size="sm"
                                className="text-[#20B2AA] hover:text-[#1a8f89]"
                              >
                                Track
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'officeHardware' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Hardware ID
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          Warranty
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#5b5b5b] uppercase tracking-wider">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredOfficeHardwareData.slice(0, itemsPerPage).map((row, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 whitespace-nowrap">{row.item}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.category}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.hardwareId}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.location}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.status}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.warranty}</td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <div className="flex gap-2">
                              <Button
                                variant="link"
                                size="sm"
                                className="text-[#4169E1] hover:text-[#3154b3] p-1"
                                onClick={() => handleEditClick(row)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="link"
                                size="sm"
                                className="text-red-600 hover:text-red-700 p-1"
                                onClick={() => handleDeleteItem()}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="link"
                                size="sm"
                                className="text-[#20B2AA] hover:text-[#1a8f89]"
                              >
                                Track
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Items per page dropdown at the bottom */}
              <div className="flex justify-end mt-4">
                <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-600">
                  Items per page:
                </label>
                <select
                  id="itemsPerPage"
                  className="form-select w-auto"
                  value={itemsPerPage}
                  onChange={e => setItemsPerPage(Number(e.target.value))}
                >
                  {[10, 25, 50, 100].map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Inventory Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* General Information */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">General Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="add-item-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Item Name
                  </label>
                  <input
                    id="add-item-name"
                    type="text"
                    className="form-control"
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <label htmlFor="add-category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select id="add-category" className="form-select">
                    <option value="">Select category</option>
                    <option value="tools">Tools</option>
                    <option value="supplies">Supplies</option>
                    <option value="equipment">Equipment</option>
                    <option value="officeHardware">Office Hardware</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="add-id" className="block text-sm font-medium text-gray-700">
                    ID / Serial #
                  </label>
                  <input
                    id="add-id"
                    type="text"
                    className="form-control"
                    placeholder="Enter ID or Serial #"
                  />
                </div>
                <div>
                  <label htmlFor="add-location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    id="add-location"
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
                  />
                </div>
              </div>
            </div>
            {/* Purchase Information */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Purchase Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="add-purchase-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Purchase Date
                  </label>
                  <input id="add-purchase-date" type="date" className="form-control" />
                </div>
                <div>
                  <label htmlFor="add-vendor" className="block text-sm font-medium text-gray-700">
                    Vendor
                  </label>
                  <input
                    id="add-vendor"
                    type="text"
                    className="form-control"
                    placeholder="Enter vendor name"
                  />
                </div>
                <div>
                  <label htmlFor="add-cost" className="block text-sm font-medium text-gray-700">
                    Cost
                  </label>
                  <input
                    id="add-cost"
                    type="number"
                    className="form-control"
                    placeholder="Enter cost"
                  />
                </div>
                <div>
                  <label htmlFor="add-warranty" className="block text-sm font-medium text-gray-700">
                    Warranty Expiry
                  </label>
                  <input id="add-warranty" type="date" className="form-control" />
                </div>
              </div>
            </div>
            {/* Maintenance Information */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Maintenance Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="add-maintenance-schedule"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Maintenance Schedule
                  </label>
                  <input
                    id="add-maintenance-schedule"
                    type="text"
                    className="form-control"
                    placeholder="e.g. Monthly, Quarterly"
                  />
                </div>
                <div>
                  <label
                    htmlFor="add-last-serviced"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Serviced
                  </label>
                  <input id="add-last-serviced" type="date" className="form-control" />
                </div>
                <div>
                  <label htmlFor="add-next-due" className="block text-sm font-medium text-gray-700">
                    Next Due
                  </label>
                  <input id="add-next-due" type="date" className="form-control" />
                </div>
                <div>
                  <label
                    htmlFor="add-service-provider"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Service Provider
                  </label>
                  <input
                    id="add-service-provider"
                    type="text"
                    className="form-control"
                    placeholder="Enter provider name"
                  />
                </div>
              </div>
            </div>
            {/* Usage Information */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="add-assigned-to"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Assigned To
                  </label>
                  <input
                    id="add-assigned-to"
                    type="text"
                    className="form-control"
                    placeholder="Enter assignee"
                  />
                </div>
                <div>
                  <label htmlFor="add-status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select id="add-status" className="form-select">
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="add-quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    id="add-quantity"
                    type="number"
                    className="form-control"
                    placeholder="Enter quantity"
                  />
                </div>
                <div>
                  <label htmlFor="add-notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    id="add-notes"
                    className="form-control"
                    placeholder="Additional notes"
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseAddModal}
            className="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="bg-[#20B2AA] hover:bg-[#1a8f89] border-[#20B2AA] hover:border-[#1a8f89] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Save Item
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Track Tools Modal */}
      <Modal
        show={showTrackModal}
        onHide={handleCloseTrackModal}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Track Tool Sterilization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* Select Tool */}
            <div className="mb-4">
              <label htmlFor="tool-select" className="block text-sm font-medium text-gray-700 mb-1">
                Select Tool
              </label>
              <select id="tool-select" className="form-select">
                <option value="">Select Tool</option>
                <option value="Scalpel">Scalpel</option>
                <option value="Forceps">Forceps</option>
                <option value="Retractor">Retractor</option>
              </select>
            </div>
            {/* Current Status */}
            <div className="mb-4">
              <label
                htmlFor="current-status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Status
              </label>
              <input
                id="current-status"
                type="text"
                className="form-control"
                value="Awaiting Sterilization"
                readOnly
              />
            </div>
            {/* Sterilization Details */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Sterilization Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sterilization-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date/Time
                  </label>
                  <input id="sterilization-date" type="datetime-local" className="form-control" />
                </div>
                <div>
                  <label
                    htmlFor="sterilization-method"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sterilization Method
                  </label>
                  <select id="sterilization-method" className="form-select">
                    <option value="">Select method</option>
                    <option value="Autoclave">Autoclave</option>
                    <option value="Chemical">Chemical</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="operator" className="block text-sm font-medium text-gray-700">
                    Operator/Technician
                  </label>
                  <input
                    id="operator"
                    type="text"
                    className="form-control"
                    placeholder="Enter operator name"
                  />
                </div>
                <div>
                  <label htmlFor="batch-number" className="block text-sm font-medium text-gray-700">
                    Batch/Lot Number
                  </label>
                  <input
                    id="batch-number"
                    type="text"
                    className="form-control"
                    placeholder="Enter batch/lot number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sterilization-location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    id="sterilization-location"
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sterilization-notes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Notes/Comments
                  </label>
                  <textarea
                    id="sterilization-notes"
                    className="form-control"
                    placeholder="Additional notes"
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseTrackModal}
            className="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="bg-[#4169E1] hover:bg-[#3154b3] border-[#4169E1] hover:border-[#3154b3] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Inventory Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveEdit}>
            {/* General Information */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">General Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
                    Item Name
                  </label>
                  <input
                    id="itemName"
                    type="text"
                    name="itemName"
                    className="form-control"
                    defaultValue={editingItem?.item}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-select"
                    defaultValue={editingItem?.category}
                    required
                  >
                    <option value="Tools">Tools</option>
                    <option value="Supplies">Supplies</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Office Hardware">Office Hardware</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="itemId" className="block text-sm font-medium text-gray-700">
                    ID / Serial #
                  </label>
                  <input
                    id="itemId"
                    type="text"
                    name="id"
                    className="form-control"
                    defaultValue={editingItem ? getItemId(editingItem) : ''}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    className="form-control"
                    defaultValue={editingItem?.location}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Purchase Information */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Purchase Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">
                    Purchase Date
                  </label>
                  <input
                    id="purchaseDate"
                    type="date"
                    name="purchaseDate"
                    className="form-control"
                  />
                </div>
                <div>
                  <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">
                    Vendor
                  </label>
                  <input
                    id="vendor"
                    type="text"
                    name="vendor"
                    className="form-control"
                    placeholder="Enter vendor name"
                  />
                </div>
                <div>
                  <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
                    Cost
                  </label>
                  <input
                    id="cost"
                    type="number"
                    name="cost"
                    className="form-control"
                    placeholder="Enter cost"
                  />
                </div>
                <div>
                  <label htmlFor="warranty" className="block text-sm font-medium text-gray-700">
                    Warranty Expiry
                  </label>
                  <input id="warranty" type="date" name="warranty" className="form-control" />
                </div>
              </div>
            </div>

            {/* Maintenance Information */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Maintenance Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="maintenanceSchedule"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Maintenance Schedule
                  </label>
                  <input
                    id="maintenanceSchedule"
                    type="text"
                    name="maintenanceSchedule"
                    className="form-control"
                    placeholder="e.g. Monthly, Quarterly"
                  />
                </div>
                <div>
                  <label htmlFor="lastServiced" className="block text-sm font-medium text-gray-700">
                    Last Serviced
                  </label>
                  <input
                    id="lastServiced"
                    type="date"
                    name="lastServiced"
                    className="form-control"
                  />
                </div>
                <div>
                  <label htmlFor="nextDue" className="block text-sm font-medium text-gray-700">
                    Next Due
                  </label>
                  <input id="nextDue" type="date" name="nextDue" className="form-control" />
                </div>
                <div>
                  <label
                    htmlFor="serviceProvider"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Service Provider
                  </label>
                  <input
                    id="serviceProvider"
                    type="text"
                    name="serviceProvider"
                    className="form-control"
                    placeholder="Enter provider name"
                  />
                </div>
              </div>
            </div>

            {/* Usage Information */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                    Assigned To
                  </label>
                  <input
                    id="assignedTo"
                    type="text"
                    name="assignedTo"
                    className="form-control"
                    placeholder="Enter assignee"
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select id="status" name="status" className="form-select" required>
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    className="form-control"
                    placeholder="Enter quantity"
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-control"
                    placeholder="Additional notes"
                  />
                </div>
              </div>
            </div>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseEditModal}
                className="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="success"
                className="bg-[#20B2AA] hover:bg-[#1a8f89] border-[#20B2AA] hover:border-[#1a8f89] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      {/* Scan Invoice Modal */}
      <Modal
        show={showScanModal}
        onHide={handleCloseScanModal}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Scan Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center p-8">
            <div className="mb-4">
              <Icon path={mdiQrcodeScan} size={3} color="#4ECDC4" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Scan Invoice QR Code</h3>
            <p className="text-gray-600 mb-4">Position the QR code within the frame to scan</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Scanner viewfinder would go here */}
                <div className="absolute inset-0 border-2 border-[#4ECDC4] rounded-lg"></div>
              </div>
            </div>
            <Button variant="outline-secondary" className="mt-4" onClick={handleCloseScanModal}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </PageLayout>
  );
};

export default Inventory;
