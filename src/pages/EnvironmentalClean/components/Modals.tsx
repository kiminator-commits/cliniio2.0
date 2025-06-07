import React from 'react';
import { Modal } from 'react-bootstrap';
import Icon from '@mdi/react';
import { 
  mdiCheckCircle, 
  mdiAccountGroup, 
  mdiBroom, 
  mdiBiohazard, 
  mdiPackageVariant, 
  mdiShieldAlert, 
  mdiWrench, 
  mdiOfficeBuilding 
} from '@mdi/js';
import { RoomStatusType } from '../types';

interface ModalsProps {
  show: boolean;
  onClose: () => void;
  roomName: string;
  currentStatuses: RoomStatusType[];
  onUpdateStatus: (roomName: string, status: RoomStatusType) => void;
}

const statusOptions = [
  { id: 'available', label: 'Available', icon: mdiCheckCircle, color: '#4ECDC4' },
  { id: 'occupied', label: 'Occupied', icon: mdiAccountGroup, color: '#FF6B6B' },
  { id: 'dirty', label: 'Dirty', icon: mdiBroom, color: '#FFD93D' },
  { id: 'biohazard', label: 'Biohazard', icon: mdiBiohazard, color: '#FF0000' },
  { id: 'lowInventory', label: 'Low Inventory', icon: mdiPackageVariant, color: '#FFA500' },
  { id: 'theft', label: 'Theft', icon: mdiShieldAlert, color: '#800000' },
  { id: 'outOfOrder', label: 'Out of Order', icon: mdiWrench, color: '#808080' },
  { id: 'publicAreas', label: 'Public Areas', icon: mdiOfficeBuilding, color: '#4169E1' }
];

const Modals: React.FC<ModalsProps> = ({ show, onClose, roomName, currentStatuses, onUpdateStatus }) => {
  const handleStatusSelect = (status: RoomStatusType) => {
    onUpdateStatus(roomName, status);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Status for Room {roomName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-2 gap-4">
          {statusOptions.map((status) => {
            const isCurrentStatus = currentStatuses.includes(status.id as RoomStatusType);
            return (
              <button
                key={status.id}
                onClick={() => handleStatusSelect(status.id as RoomStatusType)}
                className={`p-4 rounded-lg border-2 transition-colors flex items-center gap-2 ${
                  isCurrentStatus 
                    ? 'opacity-100 cursor-pointer' 
                    : 'hover:bg-opacity-10 cursor-pointer'
                }`}
                style={{ 
                  borderColor: status.color,
                  color: status.color,
                  backgroundColor: isCurrentStatus ? `${status.color}33` : 'transparent'
                }}
              >
                <Icon path={status.icon} size={1} />
                <span className="flex-1 text-left">{status.label}</span>
                {isCurrentStatus && (
                  <span className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Modals; 