import React from 'react';
import { FaRobot } from 'react-icons/fa';

interface AiEfficiencyData {
  timeSavings: number;
  proactiveMgmt: number;
}

interface AiEfficiencyCardProps {
  data: AiEfficiencyData;
  timeframe: string;
}

export const AiEfficiencyCard: React.FC<AiEfficiencyCardProps> = ({ data, timeframe }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#4ECDC4]">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[#4ECDC4] bg-opacity-10 rounded-full">
          <FaRobot className="text-[#4ECDC4]" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">AI & Process Efficiency</h3>
          <p className="text-xs text-gray-500">Time Savings & Proactive Management</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-semibold text-[#FF1493]">{data.timeSavings}%</div>
        <div className="text-sm text-gray-500">{data.proactiveMgmt}% proactive</div>
      </div>
    </div>
  );
}; 