import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemAlerts = ({ alerts = [], onDismissAlert }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);

  const alertTypes = {
    critical: {
      icon: 'AlertTriangle',
      bgColor: 'bg-error-50',
      borderColor: 'border-error-200',
      textColor: 'text-error-700',
      iconColor: 'text-error-600'
    },
    warning: {
      icon: 'AlertCircle',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
      textColor: 'text-warning-700',
      iconColor: 'text-warning-600'
    },
    info: {
      icon: 'Info',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      textColor: 'text-primary-700',
      iconColor: 'text-primary-600'
    },
    success: {
      icon: 'CheckCircle',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      textColor: 'text-success-700',
      iconColor: 'text-success-600'
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return alertTime.toLocaleDateString();
  };

  const toggleExpanded = (alertId) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  if (alerts.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            System Alerts
          </h2>
        </div>
        <div className="card-content">
          <div className="text-center py-8">
            <Icon name="Shield" size={32} className="text-success-600 mx-auto mb-3" />
            <p className="text-text-secondary">All systems running smoothly</p>
            <p className="text-sm text-text-muted mt-1">No alerts at this time</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            System Alerts
          </h2>
          <span className="badge badge-error">
            {alerts.length} active
          </span>
        </div>
      </div>
      
      <div className="card-content p-0">
        <div className="divide-y divide-border">
          {alerts.map((alert) => {
            const alertStyle = alertTypes[alert.type] || alertTypes.info;
            const isExpanded = expandedAlert === alert.id;
            
            return (
              <div key={alert.id} className={`p-4 ${alertStyle.bgColor} border-l-4 ${alertStyle.borderColor}`}>
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={alertStyle.icon} 
                    size={20} 
                    className={`${alertStyle.iconColor} mt-0.5 flex-shrink-0`}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`font-medium text-sm ${alertStyle.textColor} mb-1`}>
                          {alert.title}
                        </h3>
                        <p className={`text-sm ${alertStyle.textColor} opacity-80`}>
                          {alert.message}
                        </p>
                        
                        {isExpanded && alert.details && (
                          <div className="mt-3 p-3 bg-white rounded-md border">
                            <p className="text-sm text-text-secondary">
                              {alert.details}
                            </p>
                            {alert.actionRequired && (
                              <div className="mt-2 flex space-x-2">
                                <Button
                                  variant="primary"
                                  size="xs"
                                  onClick={() => console.log('Taking action for:', alert.id)}
                                >
                                  Take Action
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="xs"
                                  onClick={() => console.log('Viewing details for:', alert.id)}
                                >
                                  View Details
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="text-xs text-text-muted whitespace-nowrap">
                          {formatTimestamp(alert.timestamp)}
                        </span>
                        
                        {alert.details && (
                          <Button
                            variant="ghost"
                            size="xs"
                            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                            onClick={() => toggleExpanded(alert.id)}
                            className="text-text-secondary hover:text-text-primary"
                          />
                        )}
                        
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="X"
                          onClick={() => onDismissAlert(alert.id)}
                          className="text-text-secondary hover:text-error"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SystemAlerts;