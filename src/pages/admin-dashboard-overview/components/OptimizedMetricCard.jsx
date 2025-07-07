import React, { memo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OptimizedMetricCard = memo(({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon, 
  color = 'primary',
  actionLabel,
  onActionClick,
  isLoading = false 
}) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600 border-primary-100',
    secondary: 'bg-secondary-50 text-secondary-600 border-secondary-100',
    success: 'bg-success-50 text-success-600 border-success-100',
    warning: 'bg-warning-50 text-warning-600 border-warning-100',
    error: 'bg-error-50 text-error-600 border-error-100'
  };

  const iconBgClasses = {
    primary: 'bg-primary-100',
    secondary: 'bg-secondary-100',
    success: 'bg-success-100',
    warning: 'bg-warning-100',
    error: 'bg-error-100'
  };

  if (isLoading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="w-20 h-8 bg-gray-200 rounded mb-2"></div>
        <div className="w-24 h-4 bg-gray-200 rounded mb-4"></div>
        <div className="w-full h-8 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className={`card p-6 hover-lift transition-all duration-200 border-l-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${iconBgClasses[color]} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className={`text-${color}-600`} />
        </div>
        {trend && trendValue && (
          <div className={`flex items-center space-x-1 ${
            trend === 'up' ? 'text-success-600' : trend === 'down' ? 'text-error-600' : 'text-text-muted'
          }`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} size={16} />
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-2xl font-heading font-bold text-text-primary mb-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
        <p className="text-sm text-text-secondary font-medium">{title}</p>
      </div>

      {actionLabel && onActionClick && (
        <Button
          variant="ghost"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={onActionClick}
          className="w-full justify-between text-text-secondary hover:text-primary"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
});

OptimizedMetricCard.displayName = 'OptimizedMetricCard';

export default OptimizedMetricCard;