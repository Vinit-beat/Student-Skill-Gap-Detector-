// src/components/layout/AppLayout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Toast from '../common/Toast';
import { useApp } from '../../context/AppContext';

export default function AppLayout({ children }) {
  const location = useLocation();
  const { toast } = useApp();
  const isFullWidth = location.pathname === '/' || location.pathname.startsWith('/auth');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-brand-indigo-500 selection:text-white">
      <Navbar />

      {isFullWidth ? (
        // Landing page & Auth page: full-width layout
        <main className="flex-1 w-full">
          {children}
        </main>
      ) : (
        // App views: Sidebar on desktop + main workspace
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          <Sidebar />
          <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      )}

      <Footer />
      {toast && <Toast toast={toast} />}
    </div>
  );
}
