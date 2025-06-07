import React, { createContext, useContext, useState } from 'react';
import { RoomStatusType, RoomStatuses } from '../types';
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

interface EnvironmentalCleanContextType {
  scannedRoom: string | null;
  showStatusModal: boolean;
  setScannedRoom: (room: string | null) => void;
  setShowStatusModal: (show: boolean) => void;
  showNotification: (message: string) => void;
  closeNotification: () => void;
  notification: string | null;
  roomStatuses: RoomStatuses;
  statusOptions: Array<{
    id: RoomStatusType;
    label: string;
    color: string;
    icon: string;
  }>;
  handleUpdateRoomStatus: (roomName: string) => void;
  handleStartWorkflow: (roomName: string) => void;
  updateRoomStatus: (roomName: string, newStatus: RoomStatusType) => void;
}

const defaultRoomStatuses: RoomStatuses = {
  available: ['101', '102', '103'],
  occupied: ['201', '202'],
  dirty: ['301', '302', '303'],
  biohazard: ['401'],
  lowInventory: ['501', '502'],
  theft: ['601'],
  outOfOrder: ['701', '702'],
  publicAreas: ['Lobby', 'Cafeteria', 'Waiting Room']
};

const defaultStatusOptions = [
  {
    id: 'available' as RoomStatusType,
    label: 'Available',
    color: '#4ECDC4',
    icon: mdiCheckCircle
  },
  {
    id: 'occupied' as RoomStatusType,
    label: 'Occupied',
    color: '#FF6B6B',
    icon: mdiAccountGroup
  },
  {
    id: 'dirty' as RoomStatusType,
    label: 'Dirty',
    color: '#FFD93D',
    icon: mdiBroom
  },
  {
    id: 'biohazard' as RoomStatusType,
    label: 'Biohazard',
    color: '#FF0000',
    icon: mdiBiohazard
  },
  {
    id: 'lowInventory' as RoomStatusType,
    label: 'Low Inventory',
    color: '#FFA500',
    icon: mdiPackageVariant
  },
  {
    id: 'theft' as RoomStatusType,
    label: 'Theft',
    color: '#800000',
    icon: mdiShieldAlert
  },
  {
    id: 'outOfOrder' as RoomStatusType,
    label: 'Out of Order',
    color: '#808080',
    icon: mdiWrench
  },
  {
    id: 'publicAreas' as RoomStatusType,
    label: 'Public Areas',
    color: '#4169E1',
    icon: mdiOfficeBuilding
  }
];

const EnvironmentalCleanContext = createContext<EnvironmentalCleanContextType>({
  scannedRoom: null,
  showStatusModal: false,
  setScannedRoom: () => {},
  setShowStatusModal: () => {},
  showNotification: () => {},
  closeNotification: () => {},
  notification: null,
  roomStatuses: defaultRoomStatuses,
  statusOptions: defaultStatusOptions,
  handleUpdateRoomStatus: () => {},
  handleStartWorkflow: () => {},
  updateRoomStatus: () => {}
});

export const EnvironmentalCleanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scannedRoom, setScannedRoom] = useState<string | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [roomStatuses, setRoomStatuses] = useState<RoomStatuses>(defaultRoomStatuses);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const handleUpdateRoomStatus = (roomName: string) => {
    setScannedRoom(roomName);
    setShowStatusModal(true);
  };

  const handleStartWorkflow = (roomName: string) => {
    console.log('Starting workflow for room:', roomName);
  };

  const updateRoomStatus = (roomName: string, newStatus: RoomStatusType) => {
    setRoomStatuses(prevStatuses => {
      const newStatuses = { ...prevStatuses };
      
      // Remove room from all statuses
      Object.keys(newStatuses).forEach(status => {
        newStatuses[status as RoomStatusType] = newStatuses[status as RoomStatusType].filter(
          room => room !== roomName
        );
      });
      
      // Add room to new status
      newStatuses[newStatus] = [...newStatuses[newStatus], roomName];
      
      return newStatuses;
    });
    
    showNotification(`Room ${roomName} status updated to ${newStatus}`);
  };

  return (
    <EnvironmentalCleanContext.Provider
      value={{
        scannedRoom,
        showStatusModal,
        setScannedRoom,
        setShowStatusModal,
        showNotification,
        closeNotification,
        notification,
        roomStatuses,
        statusOptions: defaultStatusOptions,
        handleUpdateRoomStatus,
        handleStartWorkflow,
        updateRoomStatus
      }}
    >
      {children}
    </EnvironmentalCleanContext.Provider>
  );
};

export const useEnvironmentalClean = () => useContext(EnvironmentalCleanContext); 