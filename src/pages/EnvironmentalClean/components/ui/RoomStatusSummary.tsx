import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@mdi/react';
import { mdiMapMarker } from '@mdi/js';
import { RoomStatuses, RoomStatusType } from '../../types';
import RoomStatusCard from './RoomStatusCard';
import { useEnvironmentalClean } from '../../context/EnvironmentalCleanContext';
import { Modal } from 'react-bootstrap';

interface RoomStatusSummaryProps {
  roomStatuses: RoomStatuses;
  statusOptions: { id: RoomStatusType; label: string; color: string; icon: string }[];
}

const RoomStatusSummary: React.FC<RoomStatusSummaryProps> = ({
  roomStatuses,
  statusOptions
}) => {
  const { handleUpdateRoomStatus } = useEnvironmentalClean();
  const [selectedStatus, setSelectedStatus] = useState<RoomStatusType | null>(null);
  const [showBlankModal, setShowBlankModal] = useState(false);
  const [modalSelectedStatuses, setModalSelectedStatuses] = useState<RoomStatusType[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  const handleStatusOptionClick = (statusId: RoomStatusType) => {
    setSelectedStatus(prevStatus => prevStatus === statusId ? null : statusId);
  };

  const handleBlankButtonClick = (room: string) => {
    setCurrentRoom(room);
    // Find the current status of the room
    const currentStatuses = Object.entries(roomStatuses)
      .filter(([_, rooms]) => rooms.includes(room))
      .map(([status]) => status as RoomStatusType);
    setModalSelectedStatuses(currentStatuses);
    setShowBlankModal(true);
  };

  const handleModalStatusSelect = (statusId: RoomStatusType) => {
    setModalSelectedStatuses(prev => {
      // If selecting Available or Out of Order
      if (statusId === 'available' || statusId === 'outOfOrder') {
        // If it's already selected, deselect it
        if (prev.includes(statusId)) {
          return [];
        }
        // Otherwise, select only this status
        return [statusId];
      }

      // If Available or Out of Order is already selected, remove it and add the new status
      if (prev.includes('available') || prev.includes('outOfOrder')) {
        return [statusId];
      }

      // For other statuses (dirty, biohazard, theft, low inventory)
      if (prev.includes(statusId)) {
        // Remove the status if it's already selected
        return prev.filter(id => id !== statusId);
      } else {
        // Add the new status
        return [...prev, statusId];
      }
    });
  };

  const handleModalClose = () => {
    if (currentRoom && modalSelectedStatuses.length > 0) {
      // Update room statuses
      modalSelectedStatuses.forEach(status => {
        handleUpdateRoomStatus(currentRoom, status);
      });
    }
    setShowBlankModal(false);
    setModalSelectedStatuses([]);
    setCurrentRoom(null);
  };

  // Count rooms for each status
  const getRoomCount = (status: RoomStatusType) => {
    return roomStatuses[status]?.length || 0;
  };

  // Get rooms for selected status
  const getRoomsForStatus = (status: RoomStatusType) => {
    return roomStatuses[status] || [];
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 md:p-6 rounded-xl shadow-lg mb-4 md:mb-6 border-l-4 border-[#4ECDC4] overflow-hidden"
    >
      <h2 className="text-lg md:text-xl font-bold flex items-center mb-4 text-[#5b5b5b] truncate">
        <div className="p-1.5 md:p-2 bg-[#4ECDC4] bg-opacity-10 rounded-full mr-2 flex-shrink-0">
          <Icon path={mdiMapMarker} size={0.9} className="text-[#4ECDC4]" />
        </div>
        <span className="truncate">Room Status Summary</span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusOptions.map((option) => (
          <div key={option.id} className="relative">
            <RoomStatusCard
              option={option}
              count={getRoomCount(option.id)}
              isSelected={selectedStatus === option.id}
              onClick={() => handleStatusOptionClick(option.id)}
            />
          </div>
        ))}
      </div>

      {/* Room List for Selected Status */}
      {selectedStatus && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-4 md:mt-6 border-t pt-4"
        >
          <h3 className="text-md font-medium mb-3 text-[#5b5b5b] flex items-center truncate">
            <Icon 
              path={statusOptions.find(opt => opt.id === selectedStatus)?.icon || mdiMapMarker} 
              size={0.8}
              className="mr-2 flex-shrink-0"
              style={{ color: statusOptions.find(opt => opt.id === selectedStatus)?.color || '#4ECDC4' }}
            />
            <span className="truncate">{statusOptions.find(opt => opt.id === selectedStatus)?.label} Rooms</span>
          </h3>
          <div className="space-y-2 max-h-[200px] md:max-h-[250px] overflow-y-auto p-1 -mx-1">
            {getRoomsForStatus(selectedStatus).length > 0 ? (
              getRoomsForStatus(selectedStatus).map((room, index) => (
                <motion.div 
                  key={room}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors min-h-[48px]"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm text-gray-600">{room}</span>
                    <button 
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
                      onClick={() => handleBlankButtonClick(room)}
                    >
                      BLANK BUTTON
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-gray-500 py-3 text-center bg-gray-50 rounded-lg">No rooms in this status</p>
            )}
          </div>
        </motion.div>
      )}

      <Modal show={showBlankModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Status for Room {currentRoom}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 gap-4">
            {statusOptions.map((status) => {
              const isSelected = modalSelectedStatuses.includes(status.id);
              return (
                <button
                  key={status.id}
                  onClick={() => handleModalStatusSelect(status.id)}
                  className={`p-4 rounded-lg border-2 transition-colors flex items-center gap-2 hover:bg-opacity-10 cursor-pointer ${
                    isSelected ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{ 
                    borderColor: isSelected ? status.color : '#E5E7EB',
                    color: isSelected ? status.color : '#6B7280',
                    backgroundColor: isSelected ? `${status.color}20` : 'transparent'
                  }}
                >
                  <Icon path={status.icon} size={1} style={{ color: status.color }} />
                  <span className="flex-1 text-left">{status.label}</span>
                  {isSelected && (
                    <span className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </motion.div>
  );
};

export default RoomStatusSummary; 