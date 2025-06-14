
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 bg-muted">
        <Sidebar />
        <main className="flex-1 px-4 md:px-8 py-8 bg-background rounded-tl-2xl shadow-inner min-h-[80vh]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
