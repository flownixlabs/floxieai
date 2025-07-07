import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserTableRow = ({ 
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
    <tr className="hover:bg-surface-hover transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(user.id, e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
          />
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <Icon name="User" size={20} color="var(--color-primary)" />
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-text-primary">
              {user.name}
            </div>
            <div className="text-sm text-text-secondary">
              ID: {user.id}
            </div>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-text-primary font-mono">
          {user.whatsappNumber}
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-text-secondary">
          {formatLastActive(user.lastActive)}
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
          {user.totalReminders}
        </span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
          {user.status}
        </span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Eye"
            onClick={() => onViewDetails(user)}
            className="text-text-secondary hover:text-primary"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            onClick={() => onEditUser(user)}
            className="text-text-secondary hover:text-primary"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName={user.status === 'active' ? 'UserX' : 'UserCheck'}
            onClick={() => onToggleStatus(user)}
            className={`${
              user.status === 'active' ?'text-text-secondary hover:text-error' :'text-text-secondary hover:text-success'
            }`}
          />
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;