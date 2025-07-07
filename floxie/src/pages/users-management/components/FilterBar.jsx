import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onExportData,
  totalResults 
}) => {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const reminderRanges = [
    { value: '', label: 'All Reminders' },
    { value: '0-10', label: '0-10 Reminders' },
    { value: '11-50', label: '11-50 Reminders' },
    { value: '51-100', label: '51-100 Reminders' },
    { value: '100+', label: '100+ Reminders' }
  ];

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status) count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.reminderRange) count++;
    return count;
  };

  const handleDateRangeChange = (field, value) => {
    onFilterChange('dateRange', {
      ...filters.dateRange,
      [field]: value
    });
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-surface rounded-lg border border-border p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Status Filter */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-text-secondary mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-surface"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-text-secondary mb-1">
              Last Active Range
            </label>
            <div className="flex items-center space-x-2">
              <Input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="text-sm"
              />
              <span className="text-text-secondary">to</span>
              <Input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="text-sm"
              />
            </div>
          </div>

          {/* Reminder Range Filter */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-text-secondary mb-1">
              Reminder Count
            </label>
            <select
              value={filters.reminderRange}
              onChange={(e) => onFilterChange('reminderRange', e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-surface"
            >
              {reminderRanges.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={onClearFilters}
              className="text-text-secondary hover:text-error"
            >
              Clear Filters ({activeFiltersCount})
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExportData}
          >
            Export Data
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      {totalResults !== undefined && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              Showing {totalResults} user{totalResults !== 1 ? 's' : ''}
              {activeFiltersCount > 0 && (
                <span className="ml-1">
                  with {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
                </span>
              )}
            </p>
            
            {/* Active Filter Chips */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center space-x-2">
                {filters.status && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                    Status: {filters.status}
                    <button
                      onClick={() => onFilterChange('status', '')}
                      className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-primary-200"
                    >
                      <Icon name="X" size={10} />
                    </button>
                  </span>
                )}
                
                {(filters.dateRange.start || filters.dateRange.end) && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700">
                    Date Range
                    <button
                      onClick={() => onFilterChange('dateRange', { start: '', end: '' })}
                      className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-secondary-200"
                    >
                      <Icon name="X" size={10} />
                    </button>
                  </span>
                )}
                
                {filters.reminderRange && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
                    Reminders: {filters.reminderRange}
                    <button
                      onClick={() => onFilterChange('reminderRange', '')}
                      className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-accent-200"
                    >
                      <Icon name="X" size={10} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;