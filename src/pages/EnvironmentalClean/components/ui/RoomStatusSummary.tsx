import React from 'react';
import { RoomStatus } from '../models';
import Icon from '@mdi/react';
import {
  mdiBroom,
  mdiProgressClock,
  mdiCheckCircle,
  mdiClipboardCheck,
  mdiPackageVariant,
  mdiShieldAlert,
  mdiWrench,
  mdiOfficeBuilding,
  mdiMapMarker,
} from '@mdi/js';

interface RoomStatusSummaryProps {
  roomStatuses?: RoomStatus[];
}

const RoomStatusSummary: React.FC<RoomStatusSummaryProps> = ({
  roomStatuses = [],
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#4ECDC4] mb-6">
      <h2 className="text-xl font-semibold mb-4 text-[#5b5b5b] flex items-center">
        <Icon path={mdiMapMarker} size={1.1} color="#4ECDC4" className="mr-2" />
        Room Status Summary
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-red-100 rounded-full p-1">
              <Icon path={mdiBroom} size={0.8} color="#dc2626" />
            </div>
            <span className="text-sm font-medium text-gray-600">Dirty</span>
          </div>
          <div className="text-2xl font-semibold text-red-600 text-center">
            {roomStatuses?.filter(status => status.status === 'dirty').length || 0}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-yellow-100 rounded-full p-1">
              <Icon path={mdiProgressClock} size={0.8} color="#ca8a04" />
            </div>
            <span className="text-sm font-medium text-gray-600">In Progress</span>
          </div>
          <div className="text-2xl font-semibold text-yellow-600 text-center">
            {roomStatuses?.filter(status => status.status === 'in_progress').length || 0}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-green-100 rounded-full p-1">
              <Icon path={mdiCheckCircle} size={0.8} color="#16a34a" />
            </div>
            <span className="text-sm font-medium text-gray-600">Clean</span>
          </div>
          <div className="text-2xl font-semibold text-green-600 text-center">
            {roomStatuses?.filter(status => status.status === 'clean').length || 0}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-blue-100 rounded-full p-1">
              <Icon path={mdiClipboardCheck} size={0.8} color="#2563eb" />
            </div>
            <span className="text-sm font-medium text-gray-600">Inspected</span>
          </div>
          <div className="text-2xl font-semibold text-blue-600 text-center">
            {roomStatuses?.filter(status => status.status === 'inspected').length || 0}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-purple-100 rounded-full p-1">
              <Icon path={mdiPackageVariant} size={0.8} color="#9333ea" />
            </div>
            <span className="text-sm font-medium text-gray-600">Low Inventory</span>
          </div>
          <div className="text-2xl font-semibold text-purple-600 text-center">
            {roomStatuses?.filter(status => status.status === 'low_inventory').length || 0}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gray-100 rounded-full p-1">
              <Icon path={mdiShieldAlert} size={0.8} color="#4b5563" />
            </div>
            <span className="text-sm font-medium text-gray-600">Theft</span>
          </div>
          <div className="text-2xl font-semibold text-gray-600 text-center">
            {roomStatuses?.filter(status => status.status === 'theft').length || 0}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-amber-100 rounded-full p-1">
              <Icon path={mdiWrench} size={0.8} color="#b45309" />
            </div>
            <span className="text-sm font-medium text-gray-600">Out of Order</span>
          </div>
          <div className="text-2xl font-semibold text-amber-700 text-center">
            {roomStatuses?.filter(status => status.status === 'out_of_order').length || 0}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-emerald-100 rounded-full p-1">
              <Icon path={mdiOfficeBuilding} size={0.8} color="#047857" />
            </div>
            <span className="text-sm font-medium text-gray-600">Public Areas</span>
          </div>
          <div className="text-2xl font-semibold text-emerald-700 text-center">
            {roomStatuses?.filter(status => status.status === 'public_areas').length || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomStatusSummary;
