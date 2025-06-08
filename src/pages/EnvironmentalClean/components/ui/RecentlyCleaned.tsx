import React from 'react';

const RecentlyCleaned: React.FC = () => {
  return (
    <div className="bg-white p-3 md:p-4 rounded-xl shadow-lg border-l-4 border-[#4ECDC4] mb-6 mt-2">
      <h3 className="text-lg font-semibold text-[#5b5b5b] mb-3">Recently Cleaned</h3>

      <div className="flex flex-col gap-2">
        <div className="p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors relative group">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#5b5b5b]">Room 101</span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
              Completed
            </span>
          </div>
          <div className="absolute left-0 -top-8 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            5:58:31 AM
          </div>
        </div>

        <div className="p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors relative group">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#5b5b5b]">Room 102</span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
              Completed
            </span>
          </div>
          <div className="absolute left-0 -top-8 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            5:28:31 AM
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyCleaned;
