import { useState } from 'react';

interface UseRoomScannerProps {
  onSuccess: (roomName: string) => void;
  onNotification: (message: string, type: 'info' | 'success' | 'error') => void;
}

const useRoomScanner = ({ onSuccess, onNotification }: UseRoomScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);

  /**
   * Start scanning for a room
   * This simulates a barcode/QR code scanning process
   */
  const startScan = () => {
    // Set scanning state to true
    setIsScanning(true);
    
    // Show notification that scanning has begun
    onNotification('Scanning room barcode...', 'info');
    
    // Simulate barcode scanning with a timeout
    setTimeout(() => {
      // Generate a random room ID for demonstration
      const rooms = [
        'Room 101', 'Room 102', 'Room 103', 'Room 201', 
        'Room 202', 'Room 301', 'Room 401', 'Room 501'
      ];
      const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
      
      // Show success notification
      onNotification(`Scanned ${randomRoom}`, 'success');
      
      // End scanning state
      setIsScanning(false);
      
      // Call success callback with the scanned room
      onSuccess(randomRoom);
    }, 1500); // Simulate scanning for 1.5 seconds
  };

  return {
    isScanning,
    startScan
  };
};

export default useRoomScanner; 