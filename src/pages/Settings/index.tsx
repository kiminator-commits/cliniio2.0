import React, { useState } from 'react';
import { DrawerMenu } from '../../components/Navigation/DrawerMenu';
import { FaBars } from 'react-icons/fa';

const Settings: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {drawerOpen && (
        <DrawerMenu isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      )}
      <div className="flex-1">
        {!drawerOpen && (
          <button
            onClick={() => setDrawerOpen(true)}
            style={{
              position: 'fixed',
              top: 24,
              left: 12,
              zIndex: 50,
              background: '#4ECDC4',
              color: 'white',
              borderRadius: '0 8px 8px 0',
              padding: '12px 8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Open main menu"
          >
            <FaBars size={20} />
          </button>
        )}
        <div className="mb-6" style={{ marginLeft: drawerOpen ? 24 : 0, marginTop: 24 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-[#5b5b5b] mb-2">Settings</h1>
          <p className="text-sm text-gray-500 mb-4">Configure your application preferences and account settings</p>
        </div>
        {/* No additional content */}
      </div>
    </div>
  );
};

export default Settings; 