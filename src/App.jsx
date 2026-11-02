// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';

// Pages
import LandingPage from './pages/LandingPage';
import AssessmentPage from './pages/AssessmentPage';
import DashboardPage from './pages/DashboardPage';
import GapAnalysisPage from './pages/GapAnalysisPage';
import RoadmapPage from './pages/RoadmapPage';
import CareerExplorerPage from './pages/CareerExplorerPage';
import ReportPage from './pages/ReportPage';
import AuthPage from './pages/AuthPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<Navigate to="/auth?mode=signin" replace />} />
            <Route path="/register" element={<Navigate to="/auth?mode=signup" replace />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/gap-analysis" element={<GapAnalysisPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/career-explorer" element={<CareerExplorerPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </AppProvider>
    </BrowserRouter>
  );
}
