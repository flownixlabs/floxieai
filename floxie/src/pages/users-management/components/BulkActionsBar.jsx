import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ 
  selectedCount, 
  onSelectAll, 
  onDeselectAll, 
  onBulkStatusUpdate, 
  onBulkExport, 
  onBulkDelete,
  totalCount 
}) => {
  if (selectedCount === 0) {
    return null;
  }

  const bulkActions = [
    {
      label: 'Activate Selected',
      icon: 'UserCheck',
      action: () => onBulkStatusUpdate('active'),
      variant: 'success'
    },
    {
      label: 'Suspend Selected',
      icon: 'UserX',
      action: () => onBulkStatusUpdate('suspended'),
      variant: 'warning'
    },
    {
      label: 'Export Selected',
      icon: 'Download',
      action: onBulkExport,
      variant: 'outline'
    },
    {
      label: 'Delete Selected',
      icon: 'Trash2',
      action: onBulkDelete,
      variant: 'danger'
    }
  ];

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        {/* Selection Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary-700">
              {selectedCount} of {totalCount} users selected
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSelectAll}
              className="text-primary-600 hover:text-primary-700 hover:bg-primary-100"
            >
              Select All
            </Button>
            <span className="text-primary-300">|</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDeselectAll}
              className="text-primary-600 hover:text-primary-700 hover:bg-primary-100"
            >
              Deselect All
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {bulkActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              size="sm"
              iconName={action.icon}
              iconPosition="left"
              onClick={action.action}
              className="whitespace-nowrap"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;