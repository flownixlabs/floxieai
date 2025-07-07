import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedNotes, onClearSelection, onBulkAction }) => {
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');

  const bulkActions = [
    {
      id: 'export',
      label: 'Export Selected',
      icon: 'Download',
      description: 'Export notes to file',
      action: () => setIsExportModalOpen(true)
    },
    {
      id: 'categorize',
      label: 'Add Category',
      icon: 'Tag',
      description: 'Categorize selected notes',
      action: () => onBulkAction('categorize', selectedNotes)
    },
    {
      id: 'notify',
      label: 'Notify Users',
      icon: 'MessageCircle',
      description: 'Send notification to note authors',
      action: () => onBulkAction('notify', selectedNotes)
    },
    {
      id: 'archive',
      label: 'Archive Notes',
      icon: 'Archive',
      description: 'Move notes to archive',
      action: () => onBulkAction('archive', selectedNotes),
      variant: 'warning'
    },
    {
      id: 'delete',
      label: 'Delete Notes',
      icon: 'Trash2',
      description: 'Permanently delete selected notes',
      action: () => onBulkAction('delete', selectedNotes),
      variant: 'danger'
    }
  ];

  const exportFormats = [
    { value: 'csv', label: 'CSV File', description: 'Comma-separated values' },
    { value: 'json', label: 'JSON File', description: 'JavaScript Object Notation' },
    { value: 'txt', label: 'Text File', description: 'Plain text format' },
    { value: 'pdf', label: 'PDF Report', description: 'Formatted PDF document' }
  ];

  const handleExport = () => {
    onBulkAction('export', selectedNotes, { format: exportFormat });
    setIsExportModalOpen(false);
    setIsActionsMenuOpen(false);
  };

  if (selectedNotes.length === 0) {
    return null;
  }

  return (
    <>
      {/* Bulk Actions Bar */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                {selectedNotes.length} note{selectedNotes.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearSelection}
              className="text-primary hover:text-primary-700 hover:bg-primary-100"
            >
              Clear selection
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Actions */}
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => setIsExportModalOpen(true)}
              className="border-primary text-primary hover:bg-primary-50"
            >
              Export
            </Button>

            {/* More Actions Dropdown */}
            <div className="relative">
              <Button
                variant="primary"
                size="sm"
                iconName="MoreHorizontal"
                onClick={() => setIsActionsMenuOpen(!isActionsMenuOpen)}
              >
                Actions
              </Button>

              {isActionsMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-surface rounded-lg border border-border shadow-lg z-50">
                  <div className="p-2">
                    {bulkActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => {
                          action.action();
                          if (action.id !== 'export') {
                            setIsActionsMenuOpen(false);
                          }
                        }}
                        className={`w-full flex items-start space-x-3 px-3 py-2 rounded-md text-left transition-colors duration-150 ${
                          action.variant === 'danger' ?'hover:bg-error-50 text-error-600 hover:text-error-700'
                            : action.variant === 'warning' ?'hover:bg-warning-50 text-warning-600 hover:text-warning-700' :'hover:bg-surface-hover text-text-primary'
                        }`}
                      >
                        <Icon 
                          name={action.icon} 
                          size={16} 
                          className="mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm font-medium">{action.label}</p>
                          <p className="text-xs opacity-75">{action.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg border border-border shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-text-primary">Export Notes</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setIsExportModalOpen(false)}
                  className="text-text-secondary hover:text-text-primary"
                />
              </div>

              <div className="mb-6">
                <p className="text-sm text-text-secondary mb-4">
                  Export {selectedNotes.length} selected note{selectedNotes.length !== 1 ? 's' : ''} in your preferred format.
                </p>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Export Format
                  </label>
                  {exportFormats.map((format) => (
                    <label key={format.value} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="exportFormat"
                        value={format.value}
                        checked={exportFormat === format.value}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2 mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{format.label}</p>
                        <p className="text-xs text-text-secondary">{format.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsExportModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExport}
                >
                  Export Notes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close actions menu */}
      {isActionsMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsActionsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default BulkActions;