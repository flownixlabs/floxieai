import React from 'react';
import Icon from '../../../components/AppIcon';

const NotesStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Notes',
      value: stats.totalNotes || 0,
      icon: 'FileText',
      color: 'primary',
      description: 'All user notes'
    },
    {
      title: 'This Week',
      value: stats.thisWeekNotes || 0,
      icon: 'TrendingUp',
      color: 'secondary',
      description: 'Notes created this week'
    },
    {
      title: 'Reminder Linked',
      value: stats.reminderLinked || 0,
      icon: 'Bell',
      color: 'warning',
      description: 'Notes with reminders'
    },
    {
      title: 'Calendar Linked',
      value: stats.calendarLinked || 0,
      icon: 'Calendar',
      color: 'accent',
      description: 'Notes with calendar events'
    },
    {
      title: 'Voice Notes',
      value: stats.voiceNotes || 0,
      icon: 'Mic',
      color: 'success',
      description: 'Transcribed voice notes'
    },
    {
      title: 'Avg Length',
      value: stats.avgLength || 0,
      icon: 'Type',
      color: 'info',
      description: 'Average characters per note',
      suffix: ' chars'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        icon: 'text-primary',
        text: 'text-primary-700'
      },
      secondary: {
        bg: 'bg-secondary-50',
        icon: 'text-secondary',
        text: 'text-secondary-700'
      },
      warning: {
        bg: 'bg-warning-50',
        icon: 'text-warning-600',
        text: 'text-warning-700'
      },
      accent: {
        bg: 'bg-accent-50',
        icon: 'text-accent',
        text: 'text-accent-700'
      },
      success: {
        bg: 'bg-success-50',
        icon: 'text-success',
        text: 'text-success-700'
      },
      info: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        text: 'text-blue-700'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {statCards.map((stat) => {
        const colors = getColorClasses(stat.color);
        
        return (
          <div
            key={stat.title}
            className="bg-surface rounded-lg border border-border p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                <Icon name={stat.icon} size={20} className={colors.icon} />
              </div>
              
              {stat.title === 'This Week' && stats.weeklyGrowth && (
                <div className={`flex items-center text-xs ${
                  stats.weeklyGrowth > 0 ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={stats.weeklyGrowth > 0 ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                    className="mr-1" 
                  />
                  {Math.abs(stats.weeklyGrowth)}%
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-baseline">
                <span className="text-2xl font-semibold text-text-primary">
                  {formatNumber(stat.value)}
                </span>
                {stat.suffix && (
                  <span className="text-sm text-text-secondary ml-1">
                    {stat.suffix}
                  </span>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium text-text-primary">{stat.title}</p>
                <p className="text-xs text-text-secondary">{stat.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotesStats;