import React, { useState } from 'react';
import './styles.css';
import { ErrorBoundary } from 'react-error-boundary';

// Context
import { EnvironmentalCleanProvider, useEnvironmentalClean } from './context/EnvironmentalCleanContext';

// Components
import EnvironmentalCleanLayout from './components/layout/EnvironmentalCleanLayout';
import EnvironmentalCleanHeader from './components/ui/EnvironmentalCleanHeader';
import RoomStatusSummary from './components/ui/RoomStatusSummary';
import MainContent from './components/ui/MainContent';
import Modals from './components/Modals';
import { Notification } from './components/ui/Notification';
import StatusButtons from './components/ui/StatusButtons';

const EnvironmentalCleanContent: React.FC = () => {
  const {
    roomStatuses,
    statusOptions,
    handleUpdateRoomStatus,
    handleStartWorkflow
  } = useEnvironmentalClean();

  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <ErrorBoundary>
      <EnvironmentalCleanLayout
        header={<EnvironmentalCleanHeader onScan={() => {}} />}
        roomStatusSummary={
          <RoomStatusSummary
            roomStatuses={roomStatuses}
            statusOptions={statusOptions}
            onUpdateStatus={handleUpdateRoomStatus}
            onStartWorkflow={handleStartWorkflow}
          />
        }
        mainContent={
          <>
            <StatusButtons
              currentStatuses={['available', 'dirty']}
              onStatusSelect={(status) => console.log('Selected status:', status)}
            />
            <MainContent />
          </>
        }
        notification={notification}
        onCloseNotification={closeNotification}
        modals={<Modals />}
      />
    </ErrorBoundary>
  );
};

const EnvironmentalClean: React.FC = () => {
  return (
    <ErrorBoundary>
      <EnvironmentalCleanProvider>
        <EnvironmentalCleanContent />
      </EnvironmentalCleanProvider>
    </ErrorBoundary>
  );
};

export default EnvironmentalClean; 