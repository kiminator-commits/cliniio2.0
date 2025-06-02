import React, { useState } from 'react';
import { TimeSavedCard } from './TimeSavedCard';
import { CostSavingsCard } from './CostSavingsCard';
import { AiEfficiencyCard } from './AiEfficiencyCard';
import { TeamPerformanceCard } from './TeamPerformanceCard';
import { MdInsertChart } from 'react-icons/md';

interface MetricsData {
  timeSaved: {
    daily: number;
    monthly: number;
  };
  costSavings: {
    monthly: number;
    annual: number;
  };
  aiEfficiency: {
    timeSavings: number;
    proactiveMgmt: number;
  };
  teamPerformance: {
    skills: number;
    inventory: number;
    sterilization: number;
  };
}

interface PerformanceMetricsProps {
  metrics: MetricsData;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  const [selectedTimeframe] = useState('daily');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="bg-teal-100 rounded-md p-1">
          <MdInsertChart size={24} color="#4ECDC4" />
        </span>
        <h2 className="text-lg font-semibold text-[#38b2ac]">Performance Metrics</h2>
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
