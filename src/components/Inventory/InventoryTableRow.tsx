import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { InventoryItem } from '../../types/inventory';

interface InventoryTableRowProps {
  item: InventoryItem;
}

const InventoryTableRow: React.FC<InventoryTableRowProps> = ({ item }) => {
  const getItemId = () => {
    return item.toolId || item.supplyId || item.equipmentId || item.hardwareId || '';
  };

  const getItemStatus = () => {
    return item.p2Status || item.status || item.quantity || item.expiration || item.warranty || '';
  };

  return (
    <tr>
      <td className="px-4 py-2 whitespace-nowrap">{item.name}</td>
      <td className="px-4 py-2 whitespace-nowrap">{item.category}</td>
      <td className="px-4 py-2 whitespace-nowrap">{getItemId()}</td>
      <td className="px-4 py-2 whitespace-nowrap">{item.location}</td>
      <td className="px-4 py-2 whitespace-nowrap">{getItemStatus()}</td>
      <td className="px-4 py-2 whitespace-nowrap">
        <div className="flex gap-2">
          <Button variant="link" size="sm" className="text-[#4169E1] hover:text-[#3154b3] p-1">
            <FaPencilAlt size={16} />
          </Button>
          <Button variant="link" size="sm" className="text-red-600 hover:text-red-700 p-1">
            <FaTrash size={16} />
          </Button>
          <Button variant="link" size="sm" className="text-[#20B2AA] hover:text-[#1a8f89]">
            Track
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default InventoryTableRow;
