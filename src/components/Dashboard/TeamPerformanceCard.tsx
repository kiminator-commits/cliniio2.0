import React from 'react';
import { FaUsers } from 'react-icons/fa';

interface TeamPerformanceData {
  skills: number;
  inventory: number;
  sterilization: number;
}

interface TeamPerformanceCardProps {
  data: TeamPerformanceData;
  timeframe: string;
}

export const TeamPerformanceCard: React.FC<TeamPerformanceCardProps> = ({ data, timeframe }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#4ECDC4]">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[#4ECDC4] bg-opacity-10 rounded-full">
          <FaUsers className="text-[#4ECDC4]" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Team Performance</h3>
          <p className="text-xs text-gray-500">Skills & Inventory Management</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-semibold text-[#FF1493]">{data.skills}%</div>
        <div className="text-sm text-gray-500">{data.inventory}% inventory</div>
      </div>
    </div>
  );
};

