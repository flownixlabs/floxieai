import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarEventTable = ({ 
  events, 
  onSort, 
  sortField, 
  sortDirection, 
  selectedEvents, 
  onSelectEvent, 
  onSelectAll, 
  onViewDetails, 
  onRetrySync 
}) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (eventId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'synced':
        return 'text-success bg-success-50';
      case 'pending':
        return 'text-warning bg-warning-50';
      case 'failed':
        return 'text-error bg-error-50';
      case 'disconnected':
        return 'text-text-muted bg-gray-100';
      default:
        return 'text-text-secondary bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'synced':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      case 'disconnected':
        return 'WifiOff';
      default:
        return 'Circle';
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const allSelected = events.length > 0 && selectedEvents.length === events.length;
  const someSelected = selectedEvents.length > 0 && selectedEvents.length < events.length;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('userName')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors duration-150"
                >
                  <span>User</span>
                  <Icon name={getSortIcon('userName')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('title')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors duration-150"
                >
                  <span>Event Title</span>
                  <Icon name={getSortIcon('title')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('dateTime')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors duration-150"
                >
                  <span>Date & Time</span>
                  <Icon name={getSortIcon('dateTime')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('calendarSource')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors duration-150"
                >
                  <span>Calendar Source</span>
                  <Icon name={getSortIcon('calendarSource')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors duration-150"
                >
                  <span>Sync Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-xs font-medium text-text-secondary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events.map((event) => (
              <React.Fragment key={event.id}>
                <tr className="hover:bg-surface-hover transition-colors duration-150">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event.id)}
                      onChange={(e) => onSelectEvent(event.id, e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{event.userName}</p>
                        <p className="text-xs text-text-secondary">{event.userPhone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-text-primary line-clamp-2">{event.title}</p>
                      {event.description && (
                        <p className="text-xs text-text-secondary mt-1 line-clamp-1">{event.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm text-text-primary">{formatDateTime(event.dateTime)}</p>
                      {event.location && (
                        <p className="text-xs text-text-secondary mt-1 flex items-center">
                          <Icon name="MapPin" size={12} className="mr-1" />
                          {event.location}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} color="var(--color-primary)" />
                      <span className="text-sm text-text-primary">{event.calendarSource}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      <Icon name={getStatusIcon(event.status)} size={12} className="mr-1" />
                      {event.status}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName={expandedRows.has(event.id) ? "ChevronUp" : "ChevronDown"}
                        onClick={() => toggleRowExpansion(event.id)}
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Eye"
                        onClick={() => onViewDetails(event)}
                      />
                      {event.status === 'failed' && (
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="RefreshCw"
                          onClick={() => onRetrySync(event.id)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
                {expandedRows.has(event.id) && (
                  <tr>
                    <td colSpan="7" className="px-4 py-3 bg-gray-50">
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-text-primary mb-2">Event Details</h4>
                            <div className="space-y-1 text-xs text-text-secondary">
                              <p><span className="font-medium">Event ID:</span> {event.eventId}</p>
                              <p><span className="font-medium">Created:</span> {formatDateTime(event.createdAt)}</p>
                              <p><span className="font-medium">Last Modified:</span> {formatDateTime(event.lastModified)}</p>
                              {event.attendees && (
                                <p><span className="font-medium">Attendees:</span> {event.attendees}</p>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-text-primary mb-2">Sync History</h4>
                            <div className="space-y-1 text-xs text-text-secondary">
                              <p><span className="font-medium">Last Sync:</span> {formatDateTime(event.lastSyncAttempt)}</p>
                              <p><span className="font-medium">Sync Count:</span> {event.syncAttempts}</p>
                              {event.syncError && (
                                <p className="text-error"><span className="font-medium">Error:</span> {event.syncError}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarEventTable;