import React, { useState } from 'react';
import { TimeSavedCard } from '../Dashboard/TimeSavedCard';
import { CostSavingsCard } from '../Dashboard/CostSavingsCard';
import { AiEfficiencyCard } from '../Dashboard/AiEfficiencyCard';
import { TeamPerformanceCard } from '../Dashboard/TeamPerformanceCard';
import { MdInsertChart } from 'react-icons/md';
import { MetricsData } from '../../types/homeTypes';

export interface PerformanceMetricsProps {
  metrics: MetricsData;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  const [selectedTimeframe] = useState('daily');

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-6" style={{ marginTop: '-6px' }}>
        <div className="flex items-center gap-2">
          <span className="bg-teal-100 rounded-md p-1">
            <MdInsertChart size={24} color="#4ECDC4" />
          </span>
          <h2 className="text-lg font-semibold text-[#38b2ac]">Performance Metrics</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TimeSavedCard data={metrics.timeSaved} timeframe={selectedTimeframe} />
        <CostSavingsCard data={metrics.costSavings} timeframe={selectedTimeframe} />
        <AiEfficiencyCard data={metrics.aiEfficiency} timeframe={selectedTimeframe} />
        <TeamPerformanceCard data={metrics.teamPerformance} timeframe={selectedTimeframe} />
      </div>
    </div>
  );
};
