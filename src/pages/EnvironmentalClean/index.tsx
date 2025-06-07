import React, { useState } from 'react';
import { PageLayout } from '../../components/Layout/PageLayout';
import RoomStatusSummary from './components/ui/RoomStatusSummary';
import { RoomStatuses, RoomStatusType } from './types';
import Icon from '@mdi/react';
import { 
  mdiMapMarker,
  mdiCheckCircle,
  mdiAccountGroup,
  mdiBroom,
  mdiBiohazard,
  mdiPackageVariant,
  mdiShieldAlert,
  mdiWrench,
  mdiOfficeBuilding
} from '@mdi/js';
import { useRoomScanner } from './hooks';
import { EnvironmentalCleanProvider, useEnvironmentalClean } from './context/EnvironmentalCleanContext';
import EnvironmentalCleanHeader from './components/ui/EnvironmentalCleanHeader';

const EnvironmentalCleanPage: React.FC = () => {
  const { showNotification, setScannedRoom, setShowStatusModal } = useEnvironmentalClean();
  const { isScanning, startScan } = useRoomScanner({
    onSuccess: (roomName: string) => {
      setScannedRoom(roomName);
      setShowStatusModal(true);
    },
    onNotification: showNotification
  });

  // Mock data for room statuses
  const [roomStatuses, setRoomStatuses] = useState<RoomStatuses>({
    available: ['101', '102', '103'],
    occupied: ['201', '202'],
    dirty: ['301', '302', '303'],
    biohazard: ['401'],
    lowInventory: ['501', '502'],
    theft: ['601'],
    outOfOrder: ['701', '702'],
    publicAreas: ['Lobby', 'Cafeteria', 'Waiting Room']
  });

  // Status options configuration
  const statusOptions = [
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

  const handleUpdateStatus = (roomName: string) => {
    setScannedRoom(roomName);
    setShowStatusModal(true);
  };

  const handleStartWorkflow = (roomName: string) => {
    // TODO: Implement workflow start logic
    console.log('Starting workflow for room:', roomName);
  };

  return (
    <EnvironmentalCleanProvider>
      <PageLayout
        title="Environmental Clean"
        description="Manage room status and cleaning workflows"
        headerAction={<EnvironmentalCleanHeader isScanning={isScanning} onScan={startScan} />}
      >
        <div className="flex flex-col gap-6 p-4">
          <RoomStatusSummary
            roomStatuses={roomStatuses}
            statusOptions={statusOptions}
            onUpdateStatus={handleUpdateStatus}
            onStartWorkflow={handleStartWorkflow}
          />
        </div>
      </PageLayout>
    </EnvironmentalCleanProvider>
  );
};

export default EnvironmentalCleanPage;
