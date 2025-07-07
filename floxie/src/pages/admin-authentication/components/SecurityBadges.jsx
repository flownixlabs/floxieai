import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      label: 'Secure Login',
      description: 'Multi-factor ready'
    },
    {
      icon: 'Eye',
      label: 'Privacy Protected',
      description: 'GDPR compliant'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex items-center justify-center space-x-6">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-text-muted">
            <div className="w-8 h-8 bg-success-50 rounded-full flex items-center justify-center">
              <Icon name={feature.icon} size={16} className="text-success" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-medium text-text-secondary">{feature.label}</p>
              <p className="text-xs text-text-muted">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;