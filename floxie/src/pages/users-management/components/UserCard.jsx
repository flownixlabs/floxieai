import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserCard = ({ 
  user, 
  isSelected, 
  onSelect, 
  onViewDetails, 
  onEditUser, 
  onToggleStatus 
}) => {
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

  const formatLastActive = (date) => {
    const now = new Date();
    const lastActive = new Date(date);
    const diffInHours = Math.floor((now - lastActive) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return lastActive.toLocaleDateString();
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 hover:shadow-md transition-shadow duration-150">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(user.id, e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-border rounded mt-1"
          />
          <div className="flex-shrink-0 h-12 w-12">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
              <Icon name="User" size={24} color="var(--color-primary)" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-medium text-text-primary">
              {user.name}
            </h3>
            <p className="text-sm text-text-secondary">
              ID: {user.id}
            </p>
          </div>
        </div>
        
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
          {user.status}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">WhatsApp:</span>
          <span className="text-sm font-mono text-text-primary">
            {user.whatsappNumber}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Last Active:</span>
          <span className="text-sm text-text-primary">
            {formatLastActive(user.lastActive)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Total Reminders:</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
            {user.totalReminders}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-2 pt-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          iconName="Eye"
          onClick={() => onViewDetails(user)}
          className="text-text-secondary hover:text-primary"
        >
          View
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Edit"
          onClick={() => onEditUser(user)}
          className="text-text-secondary hover:text-primary"
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName={user.status === 'active' ? 'UserX' : 'UserCheck'}
          onClick={() => onToggleStatus(user)}
          className={`${
            user.status === 'active' ?'text-text-secondary hover:text-error' :'text-text-secondary hover:text-success'
          }`}
        >
          {user.status === 'active' ? 'Suspend' : 'Activate'}
        </Button>
      </div>
    </div>
  );
};

export default UserCard;