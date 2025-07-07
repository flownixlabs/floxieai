import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CalendarEventFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isMobile = false,
  onClose 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      status: '',
      dateRange: { start: '', end: '' },
      calendarSource: '',
      user: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters();
  };

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'synced', label: 'Synced' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'disconnected', label: 'Disconnected' }
  ];

  const calendarSourceOptions = [
    { value: '', label: 'All Sources' },
    { value: 'Google Calendar', label: 'Google Calendar' },
    { value: 'Outlook Calendar', label: 'Outlook Calendar' },
    { value: 'Apple Calendar', label: 'Apple Calendar' }
  ];

  const activeFiltersCount = Object.values(localFilters).filter(value => {
    if (typeof value === 'string') return value !== '';
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v !== '');
    }
    return false;
  }).length;

  const FilterContent = () => (
    <div className="space-y-4">
      {isMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>
      )}

      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Search Events
        </label>
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" 
          />
          <Input
            type="search"
            placeholder="Search by event title or user..."
            value={localFilters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Sync Status
        </label>
        <select
          value={localFilters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Date Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="date"
            value={localFilters.dateRange.start}
            onChange={(e) => handleFilterChange('dateRange', { 
              ...localFilters.dateRange, 
              start: e.target.value 
            })}
            placeholder="Start date"
          />
          <Input
            type="date"
            value={localFilters.dateRange.end}
            onChange={(e) => handleFilterChange('dateRange', { 
              ...localFilters.dateRange, 
              end: e.target.value 
            })}
            placeholder="End date"
          />
        </div>
      </div>

      {/* Calendar Source */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Calendar Source
        </label>
        <select
          value={localFilters.calendarSource}
          onChange={(e) => handleFilterChange('calendarSource', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {calendarSourceOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* User Filter */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          User
        </label>
        <div className="relative">
          <Icon 
            name="User" 
            size={16} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" 
          />
          <Input
            type="text"
            placeholder="Filter by user name..."
            value={localFilters.user}
            onChange={(e) => handleFilterChange('user', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={handleClearAll}
            fullWidth={isMobile}
          >
            Clear All Filters ({activeFiltersCount})
          </Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
        <div className="fixed right-0 top-0 h-full w-80 bg-surface shadow-xl overflow-y-auto">
          <div className="p-4">
            <FilterContent />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <FilterContent />
    </div>
  );
};

export default CalendarEventFilters;