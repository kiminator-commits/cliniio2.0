import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiBarcode, mdiCheckCircle, mdiAccountGroup, mdiBroom, mdiBiohazard, mdiPackageVariant, mdiShieldAlert, mdiWrench, mdiOfficeBuilding } from '@mdi/js';
import { useEnvironmentalClean } from '../../context/EnvironmentalCleanContext';

interface EnvironmentalCleanHeaderProps {
  onScan: () => void;
}

const EnvironmentalCleanHeader: React.FC<EnvironmentalCleanHeaderProps> = ({
  onScan
}) => {
  const { showStatusModal, setShowStatusModal, scannedRoom, updateRoomStatus } = useEnvironmentalClean();
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const handleClose = () => {
    setShowStatusModal(false);
    setSelectedStatuses([]);
  };
  const handleShow = () => setShowStatusModal(true);

  const handleStatusSelect = (statusId: string) => {
    setSelectedStatuses(prev => {
      if (prev.includes(statusId)) {
        return prev.filter(id => id !== statusId);
      }
      return [...prev, statusId];
    });
  };

  const handleScan = () => {
    if (scannedRoom && selectedStatuses.length > 0) {
      selectedStatuses.forEach(status => {
        updateRoomStatus(scannedRoom, status as any);
      });
      onScan();
      setShowStatusModal(false);
      setSelectedStatuses([]);
    }
  };

  // Status options configuration
  const statusOptions = [
    {
      id: 'available',
      label: 'Available',
      color: '#4ECDC4',
      icon: mdiCheckCircle
    },
    {
      id: 'occupied',
      label: 'Occupied',
      color: '#FF6B6B',
      icon: mdiAccountGroup
    },
    {
      id: 'dirty',
      label: 'Dirty',
      color: '#FFD93D',
      icon: mdiBroom
    },
    {
      id: 'biohazard',
      label: 'Biohazard',
      color: '#FF0000',
      icon: mdiBiohazard
    },
    {
      id: 'lowInventory',
      label: 'Low Inventory',
      color: '#FFA500',
      icon: mdiPackageVariant
    },
    {
      id: 'theft',
      label: 'Theft',
      color: '#800000',
      icon: mdiShieldAlert
    },
    {
      id: 'outOfOrder',
      label: 'Out of Order',
      color: '#808080',
      icon: mdiWrench
    },
    {
      id: 'publicAreas',
      label: 'Public Areas',
      color: '#4169E1',
      icon: mdiOfficeBuilding
    }
  ];

  return (
    <div className="mb-2 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 p-4 md:p-0">
      <div className="bg-white rounded-xl shadow border-l-4 border-[#4ECDC4] p-3 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-[#E0F7F4] rounded-full p-2 flex items-center justify-center">
            <Icon path={mdiBarcode} size={1} color="#4ECDC4" />
          </span>
          <span className="text-lg font-semibold text-[#5b5b5b]">Room Scanner</span>
        </div>
        <button
          onClick={handleShow}
          className="bg-[#4ECDC4] hover:bg-[#3db8b0] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Room Scanner
        </button>
      </div>

      <Modal show={showStatusModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {scannedRoom ? `Update Status for Room ${scannedRoom}` : 'Room Scanner'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-6">
            {/* Room Status Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statusOptions.map((status) => (
                <button
                  key={status.id}
                  onClick={() => handleStatusSelect(status.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors ${
                    selectedStatuses.includes(status.id) ? 'ring-2 ring-[#4ECDC4]' : ''
                  }`}
                  style={{ borderLeftColor: status.color, borderLeftWidth: '4px' }}
                >
                  <Icon path={status.icon} size={1} color={status.color} />
                  <span className="font-medium text-gray-700">{status.label}</span>
                </button>
              ))}
            </div>

            {/* Scanner Overlay - Only show if at least one status is selected */}
            {selectedStatuses.length > 0 && (
              <div className="relative w-full h-[400px] bg-black/90 rounded-lg overflow-hidden">
                {/* Camera viewfinder simulation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-[#4ECDC4] rounded-lg relative">
                    {/* Scanning animation */}
                    <div
                      className="absolute left-0 right-0 h-0.5 bg-[#4ECDC4]"
                      style={{
                        animation: 'scan 2s linear infinite',
                      }}
                    />
                  </div>
                </div>
                
                {/* Status indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white">
                  <div className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-pulse" />
                  <span className="text-sm font-medium">Camera Active</span>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EnvironmentalCleanHeader; 