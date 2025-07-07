import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarEventCard = ({ event, onViewDetails, onRetrySync, isSelected, onSelect }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'synced':
        return 'text-success bg-success-50';
      case 'pending':
        return 'text-warning bg-warning-50';
      case 'failed':
        return 'text-error bg-error-50';
      case 'disconnected':
        return 'text-text-muted bg-gray-100';
      default:
        return 'text-text-secondary bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'synced':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      case 'disconnected':
        return 'WifiOff';
      default:
        return 'Circle';
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(event.id, e.target.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
          />
          <div className="flex-1">
            <h3 className="font-medium text-text-primary text-sm line-clamp-2">
              {event.title}
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              {event.userName} • {event.calendarSource}
            </p>
          </div>
        </div>
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
          <Icon name={getStatusIcon(event.status)} size={12} className="mr-1" />
          {event.status}
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center text-xs text-text-secondary">
          <Icon name="Calendar" size={14} className="mr-2" />
          {formatDateTime(event.dateTime)}
        </div>
        {event.location && (
          <div className="flex items-center text-xs text-text-secondary">
            <Icon name="MapPin" size={14} className="mr-2" />
            {event.location}
          </div>
        )}
        {event.lastSyncAttempt && (
          <div className="flex items-center text-xs text-text-secondary">
            <Icon name="RefreshCw" size={14} className="mr-2" />
            Last sync: {formatDateTime(event.lastSyncAttempt)}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <Button
          variant="ghost"
          size="xs"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(event)}
        >
          Details
        </Button>
        {event.status === 'failed' && (
          <Button
            variant="outline"
            size="xs"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => onRetrySync(event.id)}
          >
            Retry
          </Button>
        )}
      </div>
    </div>
  );
};

export default CalendarEventCard;