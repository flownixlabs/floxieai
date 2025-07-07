import React, { Suspense } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import AuthenticationGuard from "components/ui/AuthenticationGuard";
import NotFound from "pages/NotFound";
import AdminAuthentication from "pages/admin-authentication";

// Lazy loaded components
import {
  AdminDashboardOverview,
  UsersManagement,
  NotesManagement,
  CalendarEventsManagement,
  PublicLandingPage,
  PageLoader
} from "components/ui/LazyComponents";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <AuthenticationGuard>
          <Suspense fallback={<PageLoader />}>
            <RouterRoutes>
              <Route path="/" element={<PublicLandingPage />} />
              <Route path="/public-landing-page" element={<PublicLandingPage />} />
              <Route path="/admin-authentication" element={<AdminAuthentication />} />
              <Route path="/admin-dashboard-overview" element={<AdminDashboardOverview />} />
              <Route path="/users-management" element={<UsersManagement />} />
              <Route path="/notes-management" element={<NotesManagement />} />
              <Route path="/calendar-events-management" element={<CalendarEventsManagement />} />
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </Suspense>
        </AuthenticationGuard>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;