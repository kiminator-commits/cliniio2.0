import React, { ReactNode } from 'react';
import Notification from './ui/Notification';
import ScannerOverlay from './modals/ScannerOverlay';

interface EnvironmentalCleanLayoutProps {
  header: ReactNode;
  roomStatusSummary: ReactNode;
  mainContent: ReactNode;
  isScanning: boolean;
  notification: {
    message: string;
    type: string;
  } | null;
  onCloseNotification: () => void;
  modals?: ReactNode;
}

const EnvironmentalCleanLayout: React.FC<EnvironmentalCleanLayoutProps> = ({
  header,
  roomStatusSummary,
  mainContent,
  isScanning,
  notification,
  onCloseNotification,
  modals
}) => {
  return (
    <div className="pt-1 md:pt-2 px-3 md:px-6 pb-6 bg-gradient-to-br from-blue-50 to-teal-50 min-h-screen overflow-x-hidden">
      <Notification
        notification={notification}
        onClose={onCloseNotification}
      />

      <ScannerOverlay isScanning={isScanning} />

      <div className="max-w-screen-xl mx-auto w-full">
        {header}
      </div>

      <div className="max-w-screen-xl mx-auto w-full mt-0">
        {roomStatusSummary}
      </div>

      <div className="max-w-screen-xl mx-auto w-full mt-4 md:mt-6">
        {mainContent}
      </div>
      
      {modals}
    </div>
  );
};

export default React.memo(EnvironmentalCleanLayout); 