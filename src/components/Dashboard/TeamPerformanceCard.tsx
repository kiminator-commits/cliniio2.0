import Icon from '@mdi/react';
import { mdiAccountGroup } from '@mdi/js';

export default function TeamPerformanceCard({ metrics }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[#4ECDC4] bg-opacity-10 rounded-full">
          <Icon path={mdiAccountGroup} size={1} className="text-[#4ECDC4]" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Team Performance</h3>
          <p className="text-xs text-gray-500">Skills & Efficiency Metrics</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold text-[#FF1493]">
          {metrics.teamPerformance.skills}%
        </div>
        <div className="text-sm text-gray-500">{metrics.teamPerformance.inventory}% inventory</div>
      </div>
    </div>
  );
}
