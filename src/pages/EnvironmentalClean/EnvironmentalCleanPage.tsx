import React from 'react';
import EnvironmentalCleanHeader from './components/ui/EnvironmentalCleanHeader';
import RoomStatusSummary from './components/ui/RoomStatusSummary';
import CleaningAnalytics from './components/ui/CleaningAnalytics';
import RecentlyCleaned from './components/ui/RecentlyCleaned';
import CleaningChecklists from './components/ui/CleaningChecklists';

const EnvironmentalCleanPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <EnvironmentalCleanHeader />

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <RoomStatusSummary />
            </div>
            <div className="flex-1">
              <CleaningAnalytics />
              <div className="mt-4">
                <RecentlyCleaned />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <CleaningChecklists />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalCleanPage;
