import React from 'react';

const CleaningChecklists: React.FC = () => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border-l-4 border-[#4ECDC4] mb-4">
      <div className="flex space-x-4 mb-6 border-b">
        <button className="pb-2 px-1 font-medium text-[#4ECDC4] border-b-2 border-[#4ECDC4]">
          Cleaning Checklists
        </button>
        <button className="pb-2 px-1 font-medium text-gray-500 hover:text-gray-700">
          SDS Sheets
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm transition-all min-h-[64px] flex-1">
          <div className="p-2 rounded-full bg-[#4ECDC4] bg-opacity-10 flex-shrink-0 mr-3">
            <div className="w-6 h-6 bg-[#4ECDC4] rounded-full"></div>
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-[#5b5b5b] text-base">Setup/Take Down</h3>
            <p className="text-sm text-gray-500">3 tasks</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm transition-all min-h-[64px] flex-1">
          <div className="p-2 rounded-full bg-[#4ECDC4] bg-opacity-10 flex-shrink-0 mr-3">
            <div className="w-6 h-6 bg-[#4ECDC4] rounded-full"></div>
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-[#5b5b5b] text-base">Per Patient</h3>
            <p className="text-sm text-gray-500">3 tasks</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm transition-all min-h-[64px] flex-1">
          <div className="p-2 rounded-full bg-[#4ECDC4] bg-opacity-10 flex-shrink-0 mr-3">
            <div className="w-6 h-6 bg-[#4ECDC4] rounded-full"></div>
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-[#5b5b5b] text-base">Weekly</h3>
            <p className="text-sm text-gray-500">3 tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleaningChecklists;
