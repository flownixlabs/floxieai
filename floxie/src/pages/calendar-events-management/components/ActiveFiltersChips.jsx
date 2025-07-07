import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFiltersChips = ({ filters, onRemoveFilter, onClearAll, resultCount }) => {
  const getActiveFilters = () => {
    const active = [];
    
    if (filters.search) {
      active.push({
        key: 'search',
        label: `Search: "${filters.search}"`,
        value: filters.search
      });
    }
    
    if (filters.status) {
      active.push({
        key: 'status',
        label: `Status: ${filters.status}`,
        value: filters.status
      });
    }
    
    if (filters.dateRange.start || filters.dateRange.end) {
      const start = filters.dateRange.start ? new Date(filters.dateRange.start).toLocaleDateString() : '';
      const end = filters.dateRange.end ? new Date(filters.dateRange.end).toLocaleDateString() : '';
      let dateLabel = 'Date: ';
      
      if (start && end) {
        dateLabel += `${start} - ${end}`;
      } else if (start) {
        dateLabel += `From ${start}`;
      } else if (end) {
        dateLabel += `Until ${end}`;
      }
      
      active.push({
        key: 'dateRange',
        label: dateLabel,
        value: filters.dateRange
      });
    }
    
    if (filters.calendarSource) {
      active.push({
        key: 'calendarSource',
        label: `Source: ${filters.calendarSource}`,
        value: filters.calendarSource
      });
    }
    
    if (filters.user) {
      active.push({
        key: 'user',
        label: `User: "${filters.user}"`,
        value: filters.user
      });
    }
    
    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) return null;

  const handleRemoveFilter = (key) => {
    if (key === 'dateRange') {
      onRemoveFilter(key, { start: '', end: '' });
    } else {
      onRemoveFilter(key, '');
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-text-primary">
            Active Filters
          </span>
          <span className="text-xs text-text-secondary">
            ({resultCount} result{resultCount !== 1 ? 's' : ''})
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="xs"
          iconName="X"
          iconPosition="left"
          onClick={onClearAll}
          className="text-text-secondary hover:text-error"
        >
          Clear All
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <div
            key={filter.key}
            className="inline-flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm border border-primary-200"
          >
            <span className="mr-2">{filter.label}</span>
            <button
              onClick={() => handleRemoveFilter(filter.key)}
              className="hover:bg-primary-100 rounded-full p-0.5 transition-colors duration-150"
              aria-label={`Remove ${filter.label} filter`}
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFiltersChips;