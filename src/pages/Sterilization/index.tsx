import React from 'react';

const Sterilization: React.FC = () => {
  return (
    <div className="p-6 max-h-screen overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sterilization Management</h1>
        <p className="text-gray-600">Track and manage sterilization processes and equipment</p>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
          <p className="text-2xl font-semibold text-blue-600">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Completed Today</h3>
          <p className="text-2xl font-semibold text-green-600">45</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-semibold text-yellow-600">8</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Failed</h3>
          <p className="text-2xl font-semibold text-red-600">2</p>
        </div>
      </div>

      {/* Sterilization Cycles Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Sterilization Cycles</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Start New Cycle
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cycle ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Sample data - replace with actual data */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #ST-2024-001
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Surgical Instruments Set A
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2024-03-15 14:30
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    In Progress
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                  <button className="text-red-600 hover:text-red-900">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sterilization Log */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Sterilization Log</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {/* Sample log entry - replace with actual data */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
              </div>
              <div>
                <p className="text-sm text-gray-900">
                  Cycle #ST-2024-001 completed successfully
                </p>
                <p className="text-xs text-gray-500">2024-03-15 15:45</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sterilization; 