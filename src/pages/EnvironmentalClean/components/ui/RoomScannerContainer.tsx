import React from 'react';
import RoomScannerButton from './RoomScannerButton';

interface RoomScannerContainerProps {
  isScanning: boolean;
  onScan: () => void;
}

const RoomScannerContainer: React.FC<RoomScannerContainerProps> = ({ isScanning, onScan }) => {
  return (
    <div>
      <RoomScannerButton isScanning={isScanning} onScan={onScan} />
    </div>
  );
};

export default RoomScannerContainer; 