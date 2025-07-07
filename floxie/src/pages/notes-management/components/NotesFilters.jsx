import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NotesFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  totalNotes,
  filteredCount 
}) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: filters.startDate || '',
    endDate: filters.endDate || ''
  });

  const connectionTypes = [
    { value: 'all', label: 'All Notes', icon: 'FileText' },
    { value: 'standalone', label: 'Standalone', icon: 'FileText' },
    { value: 'reminder', label: 'Reminder Linked', icon: 'Bell' },
    { value: 'calendar', label: 'Calendar Linked', icon: 'Calendar' },
    { value: 'both', label: 'Both Linked', icon: 'Link' }
  ];

  const lengthCategories = [
    { value: 'all', label: 'All Lengths' },
    { value: 'short', label: 'Short (< 100 chars)' },
    { value: 'medium', label: 'Medium (100-500 chars)' },
    { value: 'long', label: 'Long (> 500 chars)' }
  ];

  const handleSearchChange = (e) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleUserSearchChange = (e) => {
    onFiltersChange({ ...filters, userSearch: e.target.value });
  };

  const handleConnectionTypeChange = (type) => {
    onFiltersChange({ ...filters, connectionType: type });
  };

  const handleLengthCategoryChange = (category) => {
    onFiltersChange({ ...filters, lengthCategory: category });
  };

  const handleDateRangeChange = (field, value) => {
    const newDateRange = { ...dateRange, [field]: value };
    setDateRange(newDateRange);
    onFiltersChange({ 
      ...filters, 
      startDate: newDateRange.startDate,
      endDate: newDateRange.endDate 
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.userSearch) count++;
    if (filters.connectionType && filters.connectionType !== 'all') count++;
    if (filters.lengthCategory && filters.lengthCategory !== 'all') count++;
    if (filters.startDate || filters.endDate) count++;
    return count;
  };

  const removeFilter = (filterType) => {
    const newFilters = { ...filters };
    switch (filterType) {
      case 'search':
        newFilters.search = '';
        break;
      case 'userSearch':
        newFilters.userSearch = '';
        break;
      case 'connectionType':
        newFilters.connectionType = 'all';
        break;
      case 'lengthCategory':
        newFilters.lengthCategory = 'all';
        break;
      case 'dateRange':
        newFilters.startDate = '';
        newFilters.endDate = '';
        setDateRange({ startDate: '', endDate: '' });
        break;
      default:
        break;
    }
    onFiltersChange(newFilters);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 mb-6">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" 
            />
            <Input
              type="search"
              placeholder="Search notes content..."
              value={filters.search || ''}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-sm text-text-secondary">
            {filteredCount} of {totalNotes} notes
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            iconPosition="left"
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={getActiveFiltersCount() > 0 ? 'border-primary text-primary' : ''}
          >
            Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
          </Button>

          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearFilters}
              className="text-text-secondary hover:text-error"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Chips */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.search && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700">
              <Icon name="Search" size={14} className="mr-1" />
              Content: "{filters.search}"
              <button
                onClick={() => removeFilter('search')}
                className="ml-2 hover:text-primary-900"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters.userSearch && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100 text-secondary-700">
              <Icon name="User" size={14} className="mr-1" />
              User: "{filters.userSearch}"
              <button
                onClick={() => removeFilter('userSearch')}
                className="ml-2 hover:text-secondary-900"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters.connectionType && filters.connectionType !== 'all' && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent-100 text-accent-700">
              <Icon name="Link" size={14} className="mr-1" />
              {connectionTypes.find(t => t.value === filters.connectionType)?.label}
              <button
                onClick={() => removeFilter('connectionType')}
                className="ml-2 hover:text-accent-900"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters.lengthCategory && filters.lengthCategory !== 'all' && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-warning-100 text-warning-700">
              <Icon name="Type" size={14} className="mr-1" />
              {lengthCategories.find(c => c.value === filters.lengthCategory)?.label}
              <button
                onClick={() => removeFilter('lengthCategory')}
                className="ml-2 hover:text-warning-900"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {(filters.startDate || filters.endDate) && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-success-100 text-success-700">
              <Icon name="Calendar" size={14} className="mr-1" />
              Date Range
              <button
                onClick={() => removeFilter('dateRange')}
                className="ml-2 hover:text-success-900"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Filter Panel */}
      {isFilterPanelOpen && (
        <div className="border-t border-border pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* User Search */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Search by User
              </label>
              <div className="relative">
                <Icon 
                  name="User" 
                  size={16} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" 
                />
                <Input
                  type="search"
                  placeholder="User name or phone..."
                  value={filters.userSearch || ''}
                  onChange={handleUserSearchChange}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Connection Type */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Connection Type
              </label>
              <div className="space-y-2">
                {connectionTypes.map((type) => (
                  <label key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      name="connectionType"
                      value={type.value}
                      checked={filters.connectionType === type.value}
                      onChange={() => handleConnectionTypeChange(type.value)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
                    />
                    <div className="ml-2 flex items-center">
                      <Icon name={type.icon} size={14} className="mr-1 text-text-secondary" />
                      <span className="text-sm text-text-primary">{type.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Length Category */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Note Length
              </label>
              <div className="space-y-2">
                {lengthCategories.map((category) => (
                  <label key={category.value} className="flex items-center">
                    <input
                      type="radio"
                      name="lengthCategory"
                      value={category.value}
                      checked={filters.lengthCategory === category.value}
                      onChange={() => handleLengthCategoryChange(category.value)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-text-primary">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date Range
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-text-secondary mb-1">From</label>
                  <Input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary mb-1">To</label>
                  <Input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Panel */}
      <div className="lg:hidden">
        {isFilterPanelOpen && (
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsFilterPanelOpen(false)}>
            <div 
              className="fixed right-0 top-0 h-full w-80 bg-surface shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-text-primary">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => setIsFilterPanelOpen(false)}
                  />
                </div>
              </div>
              
              <div className="p-4 space-y-6">
                {/* Mobile filter content - same as desktop but in vertical layout */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Search by User
                  </label>
                  <div className="relative">
                    <Icon 
                      name="User" 
                      size={16} 
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" 
                    />
                    <Input
                      type="search"
                      placeholder="User name or phone..."
                      value={filters.userSearch || ''}
                      onChange={handleUserSearchChange}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Connection Type
                  </label>
                  <div className="space-y-2">
                    {connectionTypes.map((type) => (
                      <label key={type.value} className="flex items-center">
                        <input
                          type="radio"
                          name="connectionType"
                          value={type.value}
                          checked={filters.connectionType === type.value}
                          onChange={() => handleConnectionTypeChange(type.value)}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
                        />
                        <div className="ml-2 flex items-center">
                          <Icon name={type.icon} size={14} className="mr-1 text-text-secondary" />
                          <span className="text-sm text-text-primary">{type.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Note Length
                  </label>
                  <div className="space-y-2">
                    {lengthCategories.map((category) => (
                      <label key={category.value} className="flex items-center">
                        <input
                          type="radio"
                          name="lengthCategory"
                          value={category.value}
                          checked={filters.lengthCategory === category.value}
                          onChange={() => handleLengthCategoryChange(category.value)}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
                        />
                        <span className="ml-2 text-sm text-text-primary">{category.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Date Range
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">From</label>
                      <Input
                        type="date"
                        value={dateRange.startDate}
                        onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">To</label>
                      <Input
                        type="date"
                        value={dateRange.endDate}
                        onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesFilters;