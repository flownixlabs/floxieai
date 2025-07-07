import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarEventModal = ({ event, isOpen, onClose, onRetrySync }) => {
  if (!isOpen || !event) return null;

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRetrySync = () => {
    onRetrySync(event.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <Icon name="Calendar" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Event Details</h2>
              <p className="text-sm text-text-secondary">Calendar synchronization information</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Event Information */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Event Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-text-secondary">Title</label>
                <p className="text-text-primary font-medium">{event.title}</p>
              </div>
              
              {event.description && (
                <div>
                  <label className="text-sm font-medium text-text-secondary">Description</label>
                  <p className="text-text-primary">{event.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Date & Time</label>
                  <p className="text-text-primary">{formatDateTime(event.dateTime)}</p>
                </div>
                
                {event.location && (
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Location</label>
                    <p className="text-text-primary flex items-center">
                      <Icon name="MapPin" size={16} className="mr-2" />
                      {event.location}
                    </p>
                  </div>
                )}
              </div>
              
              {event.attendees && (
                <div>
                  <label className="text-sm font-medium text-text-secondary">Attendees</label>
                  <p className="text-text-primary">{event.attendees}</p>
                </div>
              )}
            </div>
          </div>

          {/* User Information */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">User Information</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{event.userName}</p>
                  <p className="text-sm text-text-secondary">{event.userPhone}</p>
                  <p className="text-sm text-text-secondary">{event.userEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sync Status */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Synchronization Status</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-secondary">Current Status</span>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                  <Icon name={getStatusIcon(event.status)} size={16} className="mr-2" />
                  {event.status}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Calendar Source</label>
                  <p className="text-text-primary flex items-center">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    {event.calendarSource}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-text-secondary">Event ID</label>
                  <p className="text-text-primary font-mono text-sm">{event.eventId}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Last Sync Attempt</label>
                  <p className="text-text-primary">{formatDateTime(event.lastSyncAttempt)}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-text-secondary">Sync Attempts</label>
                  <p className="text-text-primary">{event.syncAttempts}</p>
                </div>
              </div>
              
              {event.syncError && (
                <div>
                  <label className="text-sm font-medium text-text-secondary">Error Details</label>
                  <div className="bg-error-50 border border-error-100 rounded-md p-3 mt-1">
                    <p className="text-error text-sm">{event.syncError}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sync History */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Sync History</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                {event.syncHistory?.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={entry.success ? "CheckCircle" : "XCircle"} 
                        size={16} 
                        className={entry.success ? "text-success" : "text-error"} 
                      />
                      <div>
                        <p className="text-sm text-text-primary">{formatDateTime(entry.timestamp)}</p>
                        {entry.error && (
                          <p className="text-xs text-error">{entry.error}</p>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      entry.success ? 'bg-success-100 text-success-700' : 'bg-error-100 text-error-700'
                    }`}>
                      {entry.success ? 'Success' : 'Failed'}
                    </span>
                  </div>
                )) || (
                  <p className="text-sm text-text-secondary">No sync history available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          {event.status === 'failed' && (
            <Button
              variant="primary"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={handleRetrySync}
            >
              Retry Sync
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarEventModal;