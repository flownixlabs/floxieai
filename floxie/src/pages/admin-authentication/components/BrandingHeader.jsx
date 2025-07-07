import React from 'react';
import Icon from '../../../components/AppIcon';

const BrandingHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl">
            <Icon name="MessageCircle" size={32} color="white" strokeWidth={2.5} />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg">
            <Icon name="Sparkles" size={14} color="white" strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Brand Name & Tagline */}
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Floxie Admin
        </h1>
        <p className="text-lg text-text-secondary font-medium mb-1">
          AI Assistant Management
        </p>
        <p className="text-sm text-text-muted">
          Secure access to your dashboard
        </p>
      </div>

      {/* Welcome Message */}
      <div className="bg-primary-50 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-heading font-semibold text-primary mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-primary-700">
          Sign in to access your admin dashboard and manage Floxie AI assistant operations.
        </p>
      </div>
    </div>
  );
};

export default BrandingHeader;