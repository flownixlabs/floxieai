import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import BrandingHeader from './components/BrandingHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';

const AdminAuthentication = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin-dashboard-overview" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Authentication Card */}
        <div className="bg-surface rounded-2xl shadow-xl border border-border p-8">
          <BrandingHeader />
          <LoginForm />
          <SecurityBadges />
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-text-muted">
            <a 
              href="/public-landing-page" 
              className="hover:text-primary transition-colors duration-150 focus-ring rounded px-2 py-1"
            >
              Back to Home
            </a>
            <span>•</span>
            <a 
              href="#privacy" 
              className="hover:text-primary transition-colors duration-150 focus-ring rounded px-2 py-1"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a 
              href="#support" 
              className="hover:text-primary transition-colors duration-150 focus-ring rounded px-2 py-1"
            >
              Support
            </a>
          </div>
          <p className="mt-4 text-xs text-text-muted">
            © {new Date().getFullYear()} Floxie AI Assistant. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthentication;