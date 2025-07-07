import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserDetailsModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-success-100 text-success-700';
      case 'inactive':
        return 'bg-error-100 text-error-700';
      case 'suspended':
        return 'bg-warning-100 text-warning-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const recentActivity = [
    {
      id: 1,
      type: 'reminder_created',
      description: 'Created reminder: "Team meeting tomorrow"',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: 'Bell'
    },
    {
      id: 2,
      type: 'message_sent',
      description: 'Sent message to WhatsApp bot',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      icon: 'MessageCircle'
    },
    {
      id: 3,
      type: 'calendar_sync',
      description: 'Synced with Google Calendar',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      icon: 'Calendar'
    },
    {
      id: 4,
      type: 'note_created',
      description: 'Created note: "Project ideas"',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      icon: 'FileText'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
              <Icon name="User" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                {user.name}
              </h2>
              <p className="text-sm text-text-secondary">
                User ID: {user.id}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* User Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-medium text-text-primary">
                Contact Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">WhatsApp Number:</span>
                  <span className="text-sm font-mono text-text-primary">
                    {user.whatsappNumber}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Email:</span>
                  <span className="text-sm text-text-primary">
                    {user.email || 'Not provided'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Status:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-heading font-medium text-text-primary">
                Usage Statistics
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Total Reminders:</span>
                  <span className="text-sm font-medium text-text-primary">
                    {user.totalReminders}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Active Reminders:</span>
                  <span className="text-sm font-medium text-text-primary">
                    {user.activeReminders || 0}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Total Notes:</span>
                  <span className="text-sm font-medium text-text-primary">
                    {user.totalNotes || 0}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Calendar Events:</span>
                  <span className="text-sm font-medium text-text-primary">
                    {user.calendarEvents || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="mb-8">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
              Account Details
            </h3>
            
            <div className="bg-surface-hover rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Joined Date:</span>
                <span className="text-sm text-text-primary">
                  {formatDate(user.joinedDate)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Last Active:</span>
                <span className="text-sm text-text-primary">
                  {formatDate(user.lastActive)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Time Zone:</span>
                <span className="text-sm text-text-primary">
                  {user.timezone || 'UTC'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Language:</span>
                <span className="text-sm text-text-primary">
                  {user.language || 'English'}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
              Recent Activity
            </h3>
            
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-surface-hover rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name={activity.icon} size={16} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary">
                      {activity.description}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-surface-hover">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            iconName="Edit"
            iconPosition="left"
          >
            Edit User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;