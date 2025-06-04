import React from 'react';
import Icon from '@mdi/react';
import { mdiPencil, mdiDotsVertical, mdiCheckCircleOutline } from '@mdi/js';
import { InventoryItem, TabType } from '../../pages/Inventory/models';

interface InventoryRowProps {
  item: InventoryItem;
  activeTab: TabType;
  onEdit: (item: InventoryItem) => void;
  onDelete: (item: InventoryItem) => void;
  onTrack: (item: InventoryItem) => void;
}

const InventoryRow: React.FC<InventoryRowProps> = ({
  item,
  activeTab,
  onEdit,
  onDelete,
  onTrack,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-gray-900">{item.name}</div>
            <div className="text-sm text-gray-500">{item.toolId}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{item.category}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{item.location}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}
        >
          {item.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={() => onEdit(item)}
            className="text-blue-600 hover:text-blue-900"
            aria-label="Edit item"
          >
            <Icon path={mdiPencil} size={1.2} />
          </button>
          <button
            onClick={() => onTrack(item)}
            className="text-green-600 hover:text-green-900"
            aria-label="Track item"
          >
            <Icon path={mdiCheckCircleOutline} size={1.2} />
          </button>
          <button
            onClick={() => onDelete(item)}
            className="text-red-600 hover:text-red-900"
            aria-label="Delete item"
          >
            <Icon path={mdiDotsVertical} size={1.2} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InventoryRow;
