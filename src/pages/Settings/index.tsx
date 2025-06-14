import React from 'react';
import { PageLayout } from '../../components/Layout/PageLayout';

const Settings: React.FC = () => {
  return (
    <PageLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#5b5b5b] mb-1">Settings</h1>
            <p className="text-gray-500 text-sm">
              Configure your application preferences and account settings
            </p>
          </div>
        </div>
        {/* Add your settings-specific content here */}
      </div>
    </PageLayout>
  );
};

export default Settings;
