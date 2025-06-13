import React from 'react';
import Icon from '@mdi/react';
import { mdiViewList, mdiCurrencyUsd, mdiCalendarAlert } from '@mdi/js';

const InventoryInsightsCard: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg p-3 border-l-4 border-[#4ECDC4]">
    <h3 className="text-base font-semibold mb-3 flex items-center text-[#5b5b5b]">
      <Icon path={mdiViewList} size={1.1} color="#4ECDC4" className="mr-2" />
      Inventory Insights
    </h3>
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="flex items-center text-gray-600">
            <Icon path={mdiViewList} size={0.8} className="mr-1" />
            Total Items
          </span>
          <span className="font-semibold">0</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '100%' }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="flex items-center text-gray-600">
            <Icon path={mdiCurrencyUsd} size={0.8} className="mr-1" />
            Total Value
          </span>
          <span className="font-semibold">$0.00</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '100%' }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="flex items-center text-gray-600">
            <Icon path={mdiCalendarAlert} size={0.8} className="mr-1" />
            Maintenance Due
          </span>
          <span className="font-semibold">0</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '0%' }} />
        </div>
      </div>
    </div>
  </div>
);

export default InventoryInsightsCard;
