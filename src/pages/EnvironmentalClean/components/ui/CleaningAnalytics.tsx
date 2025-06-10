import React from 'react';
import Icon from '@mdi/react';
import { mdiChartBar } from '@mdi/js';
import { useEnvironmentalCleanContext } from '../../../../contexts/EnvironmentalCleanContext';

const CleaningAnalytics: React.FC = () => {
  const { getDailyCleanedRoomsCount, getDailyDirtyRoomsCount, getEfficiencyMetrics } = useEnvironmentalCleanContext();
  const dailyCleanedCount = getDailyCleanedRoomsCount();
  const dailyDirtyCount = getDailyDirtyRoomsCount();
  const { qualityScore } = getEfficiencyMetrics();

  return (
    <div className="bg-white p-3 md:p-4 rounded-xl shadow-lg border-l-4 border-[#4ECDC4] mb-6">
      <h2 className="text-lg font-semibold mb-2 text-[#5b5b5b] flex items-center">
        <Icon path={mdiChartBar} size={1.1} color="#4ECDC4" className="mr-2" />
        Cleaning Analytics
      </h2>
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 bg-green-100 rounded-lg text-center">
          <h3 className="text-sm text-green-700 font-medium mb-1">Clean Rooms</h3>
          <p className="text-xl font-bold text-green-700">{dailyCleanedCount}</p>
        </div>
        <div className="p-2 bg-orange-100 rounded-lg text-center">
          <h3 className="text-sm text-orange-700 font-medium mb-1">Dirty Rooms</h3>
          <p className="text-xl font-bold text-orange-700">{dailyDirtyCount}</p>
        </div>
        <div className="p-2 bg-purple-100 rounded-lg text-center">
          <h3 className="text-sm text-purple-700 font-medium mb-1">Efficiency</h3>
          <p className="text-xl font-bold text-purple-700">{Math.round(qualityScore)}%</p>
        </div>
      </div>
    </div>
  );
};

export default CleaningAnalytics;
