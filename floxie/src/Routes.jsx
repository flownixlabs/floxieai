import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import AuthenticationGuard from "components/ui/AuthenticationGuard";
// Add your imports here
import PublicLandingPage from "pages/public-landing-page";
import AdminAuthentication from "pages/admin-authentication";
import AdminDashboardOverview from "pages/admin-dashboard-overview";
import UsersManagement from "pages/users-management";
import NotesManagement from "pages/notes-management";
import CalendarEventsManagement from "pages/calendar-events-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <AuthenticationGuard>
          <RouterRoutes>
            {/* Define your routes here */}
            <Route path="/" element={<PublicLandingPage />} />
            <Route path="/public-landing-page" element={<PublicLandingPage />} />
            <Route path="/admin-authentication" element={<AdminAuthentication />} />
            <Route path="/admin-dashboard-overview" element={<AdminDashboardOverview />} />
            <Route path="/users-management" element={<UsersManagement />} />
            <Route path="/notes-management" element={<NotesManagement />} />
            <Route path="/calendar-events-management" element={<CalendarEventsManagement />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </AuthenticationGuard>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;