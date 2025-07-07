import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ActivityTable = ({ activities = [], isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  const activityTypes = [
    { value: 'all', label: 'All Activities' },
    { value: 'user_registration', label: 'User Registration' },
    { value: 'reminder_created', label: 'Reminder Created' },
    { value: 'message_sent', label: 'Message Sent' },
    { value: 'calendar_sync', label: 'Calendar Sync' },
    { value: 'note_created', label: 'Note Created' }
  ];

  const statusColors = {
    success: 'bg-success-100 text-success-700',
    pending: 'bg-warning-100 text-warning-700',
    failed: 'bg-error-100 text-error-700',
    processing: 'bg-primary-100 text-primary-700'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      case 'processing': return 'Loader';
      default: return 'Circle';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration': return 'UserPlus';
      case 'reminder_created': return 'Bell';
      case 'message_sent': return 'MessageSquare';
      case 'calendar_sync': return 'Calendar';
      case 'note_created': return 'FileText';
      default: return 'Activity';
    }
  };

  const filteredActivities = activities
    .filter(activity => {
      const matchesSearch = activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.action.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || activity.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="card-content">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Recent Activity
          </h2>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm focus-ring bg-surface"
            >
              {activityTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card-content p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-hover border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Activity
                </th>
                <th 
                  className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary"
                  onClick={() => handleSort('user')}
                >
                  <div className="flex items-center space-x-1">
                    <span>User</span>
                    <Icon 
                      name={sortBy === 'user' && sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                      size={14} 
                    />
                  </div>
                </th>
                <th 
                  className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary"
                  onClick={() => handleSort('timestamp')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Time</span>
                    <Icon 
                      name={sortBy === 'timestamp' && sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                      size={14} 
                    />
                  </div>
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Icon name="Search" size={24} className="text-text-muted" />
                      <p className="text-text-secondary">No activities found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-surface-hover transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                          <Icon 
                            name={getActivityIcon(activity.type)} 
                            size={16} 
                            className="text-primary-600" 
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {activity.action}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {activity.details}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <Icon name="User" size={12} className="text-text-secondary" />
                        </div>
                        <span className="text-sm text-text-primary font-medium">
                          {activity.user}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {formatTimestamp(activity.timestamp)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[activity.status]}`}>
                        <Icon 
                          name={getStatusIcon(activity.status)} 
                          size={12} 
                          className="mr-1" 
                        />
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ExternalLink"
                        onClick={() => console.log('View details:', activity.id)}
                        className="text-text-secondary hover:text-primary"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityTable;