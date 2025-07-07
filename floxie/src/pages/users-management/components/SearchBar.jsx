import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  onClearSearch, 
  placeholder = "Search users by name, WhatsApp number, or ID...",
  resultsCount 
}) => {
  const handleClear = () => {
    onClearSearch();
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-text-muted" />
        </div>
        
        <Input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 py-3 text-sm w-full"
        />
        
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={handleClear}
              className="text-text-muted hover:text-text-primary p-1"
            />
          </div>
        )}
      </div>
      
      {searchTerm && resultsCount !== undefined && (
        <div className="mt-2 text-sm text-text-secondary">
          {resultsCount === 0 ? (
            <span className="text-error">No users found matching "{searchTerm}"</span>
          ) : (
            <span>
              Found {resultsCount} user{resultsCount !== 1 ? 's' : ''} matching "{searchTerm}"
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;