import React, { useState } from 'react';
import { DrawerMenu } from '../../components/Navigation/DrawerMenu';
import NavBar from '../../components/NavBar';
import { FaBars } from 'react-icons/fa';

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  // Menu icon width + desired gap (12px + 60px)
  const navBarMarginLeft = drawerOpen ? 24 : 72;
  // Top margin to align with Cliniio logo (e.g., 24px)
  const navBarMarginTop = 24;

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
              left: 12, // about 0.5 inch from the left edge
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
        <div style={{ marginLeft: navBarMarginLeft, marginTop: navBarMarginTop }}>
          <NavBar />
        </div>
      </div>
    </div>
  );
}
