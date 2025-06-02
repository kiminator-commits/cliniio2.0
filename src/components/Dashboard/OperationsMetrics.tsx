import React, { useState } from 'react';
import { TimeSavedCard } from './TimeSavedCard';
import { CostSavingsCard } from './CostSavingsCard';
import { AiEfficiencyCard } from './AiEfficiencyCard';
import { TeamPerformanceCard } from './TeamPerformanceCard';

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

interface OperationsMetricsProps {
  metrics: MetricsData;
}

export const OperationsMetrics: React.FC<OperationsMetricsProps> = ({ metrics }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('daily');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
  };

  const handleMetricChange = (metric: string) => {
    setSelectedMetric(metric);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Operations Metrics</h2>
        <div className="flex space-x-4">
          <div>
            <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700">
              Timeframe
            </label>
            <select
              id="timeframe"
              value={selectedTimeframe}
              onChange={(e) => handleTimeframeChange(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label htmlFor="metric" className="block text-sm font-medium text-gray-700">
              Metric
            </label>
            <select
              id="metric"
              value={selectedMetric}
              onChange={(e) => handleMetricChange(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">All Metrics</option>
              <option value="time">Time Saved</option>
              <option value="cost">Cost Savings</option>
              <option value="ai">AI Efficiency</option>
              <option value="team">Team Performance</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TimeSavedCard data={metrics.timeSaved} timeframe={selectedTimeframe} />
        <CostSavingsCard data={metrics.costSavings} timeframe={selectedTimeframe} />
        <AiEfficiencyCard data={metrics.aiEfficiency} timeframe={selectedTimeframe} />
        <TeamPerformanceCard data={metrics.teamPerformance} timeframe={selectedTimeframe} />
      </div>
    </div>
  );
};
