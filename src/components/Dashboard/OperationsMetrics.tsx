import React from 'react';
import { FaClipboardList, FaFilter, FaChartBar, FaInfoCircle, FaClock, FaChartLine, FaLightbulb, FaDollarSign, FaRobot } from 'react-icons/fa';
import TeamPerformanceCard from './TeamPerformanceCard';

interface Metrics {
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
  metrics: Metrics;
  calculateAvailablePoints: () => number;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export const OperationsMetrics = ({ metrics, calculateAvailablePoints, showFilters, setShowFilters }: OperationsMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Daily Operations Tasks Container */}
      <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-[#4ECDC4]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="p-2 bg-[#4ECDC4] bg-opacity-10 rounded-lg">
              <FaClipboardList size={24} className="text-[#4ECDC4]" />
            </div>
            <h2 className="ml-3 text-lg font-semibold text-[#4ECDC4]">Daily Operations Tasks</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hidden sm:inline-block">
              Available: {calculateAvailablePoints()} Points
            </span>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 flex items-center"
            >
              <FaFilter size={16} className="text-[#4B5563]" />
              <span className="ml-1 text-sm hidden sm:inline-block">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Performance Metrics Container */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#4ECDC4]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Performance Metrics</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="space-y-6">
          {/* Time Savings */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#4ECDC4] bg-opacity-10 rounded-full">
                <FaClock className="text-[#4ECDC4]" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Time Savings</h3>
                <p className="text-xs text-gray-500">Daily & Monthly Impact</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-[#4ECDC4]">{metrics.timeSaved.daily}h</div>
              <div className="text-sm text-gray-500">{metrics.timeSaved.monthly}h/mo</div>
            </div>
          </div>

          {/* Cost Savings */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#4ECDC4] bg-opacity-10 rounded-full">
                <FaDollarSign className="text-[#4ECDC4]" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Cost Savings</h3>
                <p className="text-xs text-gray-500">Monthly & Annual Impact</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-[#4ECDC4]">${metrics.costSavings.monthly}</div>
              <div className="text-sm text-gray-500">${metrics.costSavings.annual}/yr</div>
            </div>
          </div>

          {/* AI & Process Efficiency */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#4ECDC4] bg-opacity-10 rounded-full">
                <FaRobot className="text-[#4ECDC4]" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">AI & Process Efficiency</h3>
                <p className="text-xs text-gray-500">Time Savings & Proactive Management</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-[#4ECDC4]">{metrics.aiEfficiency.timeSavings}%</div>
              <div className="text-sm text-gray-500">{metrics.aiEfficiency.proactiveMgmt}% proactive</div>
            </div>
          </div>

          {/* Team Performance */}
          <TeamPerformanceCard metrics={metrics} />
        </div>
      </div>
    </div>
  );
}; 