import React from 'react';
import Sidebar from '@/components/Navigation/Sidebar';
import TopNavbar from '@/components/Navigation/TopNavbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <TopNavbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
} 