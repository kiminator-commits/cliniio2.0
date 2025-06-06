import React, { useMemo } from 'react';
import { InventoryItem } from '../../types/inventory';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import InventoryTableRow from './InventoryTableRow';
import { useInventoryStore } from '../../store/useInventoryStore';
import SortableTableHeader from '../../common/SortableTableHeader';

interface InventoryTableProps {
  items: InventoryItem[];
  onSearch: (query: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  onSearch,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pagination = useInventoryStore(state => state.pagination);
  const sorting = useInventoryStore(state => state.sorting);
  const setSorting = useInventoryStore(state => state.setSorting);
  const filters = useInventoryStore(state => state.filters);

  const handleSort = (field: keyof InventoryItem) => {
    if (sorting.field === field) {
      const newDirection = sorting.direction === 'asc' ? 'desc' : 'asc';
      setSorting({ field, direction: newDirection });
    } else {
      setSorting({ field, direction: 'asc' });
    }
  };

  const memoizedItems = useMemo(() => items, [items]);

  const filteredItems = useMemo(() => {
    return memoizedItems.filter(item => {
      const matchesCategory = !filters.category || item.category === filters.category;
      const matchesLocation = !filters.location || item.location === filters.location;
      const matchesSearch =
        !filters.searchQuery || item.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
      return matchesCategory && matchesLocation && matchesSearch;
    });
  }, [memoizedItems, filters]);

  const sortedItems = useMemo(() => {
    if (!sorting.field) return filteredItems;

    return [...filteredItems].sort((a, b) => {
      const fieldA = a[sorting.field];
      const fieldB = b[sorting.field];

      if (fieldA === fieldB) return 0;
      if (sorting.direction === 'asc') {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });
  }, [filteredItems, sorting]);

  const paginatedItems = useMemo(() => {
    const startIndex = Math.max((pagination.currentPage - 1) * pagination.pageSize, 0);
    const endIndex = startIndex + pagination.pageSize;
    return sortedItems.slice(startIndex, endIndex);
  }, [sortedItems, pagination]);

  const handleSearch = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value),
    [onSearch]
  );

  const handlePreviousPage = useMemo(
    () => () => onPageChange(currentPage - 1),
    [currentPage, onPageChange]
  );

  const handleNextPage = useMemo(
    () => () => onPageChange(currentPage + 1),
    [currentPage, onPageChange]
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon path={mdiMagnify} size={1.35} color="#9ca3af" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search inventory..."
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableTableHeader
                label="Item"
                field="name"
                activeField={sorting.field}
                direction={sorting.direction}
                onSort={handleSort}
              />
              <SortableTableHeader
                label="Category"
                field="category"
                activeField={sorting.field}
                direction={sorting.direction}
                onSort={handleSort}
              />
              <SortableTableHeader
                label="Location"
                field="location"
                activeField={sorting.field}
                direction={sorting.direction}
                onSort={handleSort}
              />
              <SortableTableHeader
                label="Status"
                field="status"
                activeField={sorting.field}
                direction={sorting.direction}
                onSort={handleSort}
              />
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedItems.map(item => (
              <InventoryTableRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          Showing page {currentPage} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
