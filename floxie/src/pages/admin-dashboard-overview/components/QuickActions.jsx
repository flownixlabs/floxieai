import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'add-user',
      label: 'Add New User',
      description: 'Manually register a new user',
      icon: 'UserPlus',
      color: 'primary',
      action: () => onActionClick('users-management')
    },
    {
      id: 'send-broadcast',
      label: 'Send Broadcast',
      description: 'Send message to all users',
      icon: 'MessageSquare',
      color: 'secondary',
      action: () => onActionClick('broadcast')
    },
    {
      id: 'system-health',
      label: 'System Health',
      description: 'Check system status',
      icon: 'Activity',
      color: 'success',
      action: () => onActionClick('system-health')
    },
    {
      id: 'export-data',
      label: 'Export Data',
      description: 'Download system reports',
      icon: 'Download',
      color: 'warning',
      action: () => onActionClick('export')
    }
  ];

  const colorClasses = {
    primary: 'bg-primary-50 hover:bg-primary-100 text-primary-700 border-primary-200',
    secondary: 'bg-secondary-50 hover:bg-secondary-100 text-secondary-700 border-secondary-200',
    success: 'bg-success-50 hover:bg-success-100 text-success-700 border-success-200',
    warning: 'bg-warning-50 hover:bg-warning-100 text-warning-700 border-warning-200'
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-lg font-heading font-semibold text-text-primary">
          Quick Actions
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          Frequently used administrative tasks
        </p>
      </div>
      
      <div className="card-content">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-left hover-lift
                ${colorClasses[action.color]}
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-sm`}>
                  <Icon 
                    name={action.icon} 
                    size={20} 
                    className={`text-${action.color}-600`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1">
                    {action.label}
                  </h3>
                  <p className="text-xs opacity-80">
                    {action.description}
                  </p>
                </div>
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="opacity-60 mt-1"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;