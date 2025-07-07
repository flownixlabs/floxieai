import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ 
  selectedCount, 
  onRetrySync, 
  onUpdateStatus, 
  onExportData, 
  onClearSelection 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExportData();
    } finally {
      setIsExporting(false);
    }
  };

  const handleStatusUpdate = (status) => {
    onUpdateStatus(status);
    setShowStatusMenu(false);
  };

  const statusOptions = [
    { value: 'synced', label: 'Mark as Synced', icon: 'CheckCircle' },
    { value: 'pending', label: 'Mark as Pending', icon: 'Clock' },
    { value: 'failed', label: 'Mark as Failed', icon: 'XCircle' }
  ];

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary-700">
              {selectedCount} event{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          <Button
            variant="ghost"
            size="xs"
            iconName="X"
            onClick={onClearSelection}
            className="text-primary-600 hover:text-primary-700"
          >
            Clear
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Retry Sync */}
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={onRetrySync}
            className="border-primary-200 text-primary-700 hover:bg-primary-100"
          >
            Retry Sync
          </Button>

          {/* Update Status */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="border-primary-200 text-primary-700 hover:bg-primary-100"
            >
              Update Status
            </Button>
            
            {showStatusMenu && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-surface border border-border rounded-lg shadow-lg z-10">
                <div className="py-1">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleStatusUpdate(option.value)}
                      className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors duration-150"
                    >
                      <Icon name={option.icon} size={16} className="mr-2" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Export Data */}
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={handleExport}
            loading={isExporting}
            className="border-primary-200 text-primary-700 hover:bg-primary-100"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;