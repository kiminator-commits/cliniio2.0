import React from 'react';
import { Button } from 'react-bootstrap';

interface EnvironmentalCleanHeaderProps {
  isScanning?: boolean;
  onScan?: () => void;
}

const EnvironmentalCleanHeader: React.FC<EnvironmentalCleanHeaderProps> = ({
  isScanning,
  onScan,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
      <div>
        <h1 className="text-2xl font-bold text-[#5b5b5b] mb-1">Environmental Clean</h1>
        <p className="text-gray-500 text-sm">
          Track and manage room cleaning workflows and maintain compliance standards.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-4 border-l-4 border-[#4ECDC4] flex items-center gap-4">
        <span className="text-gray-600">Room Scanner</span>
        <Button
          variant="success"
          onClick={onScan}
          disabled={isScanning}
          className="bg-[#4ECDC4] hover:bg-[#3db8b0] border-[#4ECDC4] hover:border-[#3db8b0] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          {isScanning ? 'Scanning...' : 'Scan Room'}
        </Button>
      </div>
    </div>
  );
};

export default EnvironmentalCleanHeader;
