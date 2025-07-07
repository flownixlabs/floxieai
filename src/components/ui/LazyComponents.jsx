import { lazy } from 'react';

// Lazy load heavy components
export const AdminDashboardOverview = lazy(() => import('../../pages/admin-dashboard-overview'));
export const UsersManagement = lazy(() => import('../../pages/users-management'));
export const NotesManagement = lazy(() => import('../../pages/notes-management'));
export const CalendarEventsManagement = lazy(() => import('../../pages/calendar-events-management'));
export const PublicLandingPage = lazy(() => import('../../pages/public-landing-page'));

// Loading component
export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm text-text-secondary">Loading...</p>
    </div>
  </div>
);