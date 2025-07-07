import React from 'react';
import Icon from '../../../components/AppIcon';

const CalendarSyncMetrics = ({ metrics }) => {
  const metricCards = [
    {
      title: 'Total Events',
      value: metrics.totalEvents,
      icon: 'Calendar',
      color: 'bg-primary-50 text-primary-600',
      iconColor: 'var(--color-primary)'
    },
    {
      title: 'Successfully Synced',
      value: metrics.syncedEvents,
      icon: 'CheckCircle',
      color: 'bg-success-50 text-success-600',
      iconColor: 'var(--color-success)',
      percentage: metrics.totalEvents > 0 ? Math.round((metrics.syncedEvents / metrics.totalEvents) * 100) : 0
    },
    {
      title: 'Pending Sync',
      value: metrics.pendingEvents,
      icon: 'Clock',
      color: 'bg-warning-50 text-warning-600',
      iconColor: 'var(--color-warning)',
      percentage: metrics.totalEvents > 0 ? Math.round((metrics.pendingEvents / metrics.totalEvents) * 100) : 0
    },
    {
      title: 'Failed Syncs',
      value: metrics.failedEvents,
      icon: 'XCircle',
      color: 'bg-error-50 text-error-600',
      iconColor: 'var(--color-error)',
      percentage: metrics.totalEvents > 0 ? Math.round((metrics.failedEvents / metrics.totalEvents) * 100) : 0
    },
    {
      title: 'Connected Users',
      value: metrics.connectedUsers,
      icon: 'Users',
      color: 'bg-accent-50 text-accent-600',
      iconColor: 'var(--color-accent)'
    },
    {
      title: 'Calendar Sources',
      value: metrics.calendarSources,
      icon: 'Link',
      color: 'bg-secondary-50 text-secondary-600',
      iconColor: 'var(--color-secondary)'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {metricCards.map((metric, index) => (
        <div key={index} className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metric.color}`}>
              <Icon name={metric.icon} size={20} color={metric.iconColor} />
            </div>
            {metric.percentage !== undefined && (
              <span className="text-xs font-medium text-text-secondary">
                {metric.percentage}%
              </span>
            )}
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary mb-1">
              {metric.value.toLocaleString()}
            </p>
            <p className="text-sm text-text-secondary">{metric.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarSyncMetrics;