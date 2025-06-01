import React, { useState } from 'react';
import { DrawerMenu } from '../../components/Navigation/DrawerMenu';
import { FaBars } from 'react-icons/fa';

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div className="bg-gray-100 min-h-screen">
      {!drawerOpen && (
        <button
          onClick={() => setDrawerOpen(true)}
          style={{
            position: 'fixed',
            top: 24,
            left: 0,
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
      <DrawerMenu isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
