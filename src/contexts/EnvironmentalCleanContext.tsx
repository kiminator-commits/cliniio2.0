import React, { createContext, useContext, useState } from 'react';

export type RoomStatusType =
  | 'Available'
  | 'Dirty'
  | 'LowInventory'
  | 'Biohazard'
  | 'Theft'
  | 'InProgress'
  | 'Supervisor'
  | 'Isolation'
  | 'Quarantine'
  | 'OutOfService'
  | 'Unassigned';

export interface Room {
  id: string;
  name: string;
  status: RoomStatusType;
}

interface CleanedRoomEntry {
  room: string;
  cleanedAt: string;
  cleanedBy: string;
}

interface EnvironmentalCleanContextType {
  cleanedRooms: CleanedRoomEntry[];
  logRoomCleaned: (room: string, cleanedBy: string) => void;
  rooms: Room[];
  updateRoomStatus: (roomId: string, newStatus: RoomStatusType) => void;
}

const EnvironmentalCleanContext = createContext<EnvironmentalCleanContextType | undefined>(
  undefined
);

export const EnvironmentalCleanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cleanedRooms, setCleanedRooms] = useState<CleanedRoomEntry[]>([]);
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', name: 'Room 101', status: 'Available' },
    { id: '2', name: 'Room 102', status: 'Dirty' },
    { id: '3', name: 'Room 103', status: 'Supervisor' },
    { id: '4', name: 'Room 104', status: 'Biohazard' },
  ]);

  const logRoomCleaned = (room: string, cleanedBy: string) => {
    const newEntry: CleanedRoomEntry = {
      room,
      cleanedAt: new Date().toISOString(),
      cleanedBy,
    };
    setCleanedRooms(prev => [newEntry, ...prev]);
  };

  const updateRoomStatus = (roomId: string, newStatus: RoomStatusType) => {
    setRooms(prevRooms =>
      prevRooms.map(room => (room.id === roomId ? { ...room, status: newStatus } : room))
    );

    if (newStatus === 'Available') {
      const cleanedRoom = rooms.find(room => room.id === roomId);
      if (cleanedRoom) {
        logRoomCleaned(cleanedRoom.name, 'System'); // Replace 'System' with actual user later
      }
    }
  };

  return (
    <EnvironmentalCleanContext.Provider
      value={{ cleanedRooms, logRoomCleaned, rooms, updateRoomStatus }}
    >
      {children}
    </EnvironmentalCleanContext.Provider>
  );
};

export const useEnvironmentalCleanContext = (): EnvironmentalCleanContextType => {
  const context = useContext(EnvironmentalCleanContext);
  if (!context) {
    throw new Error(
      'useEnvironmentalCleanContext must be used within an EnvironmentalCleanProvider'
    );
  }
  return context;
};
