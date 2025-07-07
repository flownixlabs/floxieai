import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotesTable = ({ 
  notes, 
  selectedNotes, 
  onSelectNote, 
  onSelectAll, 
  onExpandNote, 
  expandedNotes,
  onSort,
  sortConfig 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleSort = (field) => {
    const direction = sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSort({ field, direction });
  };

  const getSortIcon = (field) => {
    if (sortConfig.field !== field) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConnectionBadge = (note) => {
    if (note.reminderLinked && note.calendarLinked) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
          <Icon name="Link" size={12} className="mr-1" />
          Both
        </span>
      );
    } else if (note.reminderLinked) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning-100 text-warning-700">
          <Icon name="Bell" size={12} className="mr-1" />
          Reminder
        </span>
      );
    } else if (note.calendarLinked) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700">
          <Icon name="Calendar" size={12} className="mr-1" />
          Calendar
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        <Icon name="FileText" size={12} className="mr-1" />
        Standalone
      </span>
    );
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-sm overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="w-12 px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedNotes.length === notes.length && notes.length > 0}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                />
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('user')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-150"
                >
                  <span>User</span>
                  <Icon name={getSortIcon('user')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-medium text-text-primary">Note Preview</span>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-150"
                >
                  <span>Created</span>
                  <Icon name={getSortIcon('createdAt')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-medium text-text-primary">Connection</span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-medium text-text-primary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {notes.map((note) => (
              <React.Fragment key={note.id}>
                <tr
                  className={`hover:bg-surface-hover transition-colors duration-150 ${
                    selectedNotes.includes(note.id) ? 'bg-primary-50' : ''
                  }`}
                  onMouseEnter={() => setHoveredRow(note.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedNotes.includes(note.id)}
                      onChange={() => onSelectNote(note.id)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{note.userName}</p>
                        <p className="text-xs text-text-secondary">{note.userPhone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-md">
                      <p className="text-sm text-text-primary leading-relaxed">
                        {highlightSearchTerm(truncateText(note.content), note.searchTerm)}
                      </p>
                      {note.content.length > 100 && (
                        <button
                          onClick={() => onExpandNote(note.id)}
                          className="text-xs text-primary hover:text-primary-700 mt-1 font-medium"
                        >
                          {expandedNotes.includes(note.id) ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-text-secondary">
                      <p>{formatDate(note.createdAt)}</p>
                      {note.source && (
                        <p className="text-xs text-text-muted mt-1">
                          via {note.source}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getConnectionBadge(note)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onExpandNote(note.id)}
                        className="text-text-secondary hover:text-primary"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        className="text-text-secondary hover:text-primary"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                        className="text-text-secondary hover:text-primary"
                      />
                    </div>
                  </td>
                </tr>
                {expandedNotes.includes(note.id) && (
                  <tr className="bg-gray-50">
                    <td colSpan="6" className="px-6 py-4">
                      <div className="bg-surface rounded-lg p-4 border border-border">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-text-primary">Full Note Content</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="X"
                            onClick={() => onExpandNote(note.id)}
                            className="text-text-secondary hover:text-primary"
                          />
                        </div>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                            {highlightSearchTerm(note.content, note.searchTerm)}
                          </p>
                        </div>
                        {note.relatedActivities && note.relatedActivities.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <h5 className="text-xs font-medium text-text-secondary mb-2">Related Activities</h5>
                            <div className="space-y-2">
                              {note.relatedActivities.map((activity, index) => (
                                <div key={index} className="flex items-center space-x-2 text-xs text-text-secondary">
                                  <Icon name={activity.type === 'reminder' ? 'Bell' : 'Calendar'} size={12} />
                                  <span>{activity.description}</span>
                                  <span className="text-text-muted">• {formatDate(activity.timestamp)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {notes.map((note) => (
          <div key={note.id} className="p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedNotes.includes(note.id)}
                onChange={() => onSelectNote(note.id)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} color="var(--color-primary)" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{note.userName}</p>
                      <p className="text-xs text-text-secondary">{note.userPhone}</p>
                    </div>
                  </div>
                  {getConnectionBadge(note)}
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-text-primary leading-relaxed">
                    {highlightSearchTerm(truncateText(note.content, 80), note.searchTerm)}
                  </p>
                  {note.content.length > 80 && (
                    <button
                      onClick={() => onExpandNote(note.id)}
                      className="text-xs text-primary hover:text-primary-700 mt-1 font-medium"
                    >
                      {expandedNotes.includes(note.id) ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>{formatDate(note.createdAt)}</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onExpandNote(note.id)}
                      className="text-text-secondary hover:text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                      className="text-text-secondary hover:text-primary"
                    />
                  </div>
                </div>

                {expandedNotes.includes(note.id) && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                        {highlightSearchTerm(note.content, note.searchTerm)}
                      </p>
                      {note.relatedActivities && note.relatedActivities.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <h5 className="text-xs font-medium text-text-secondary mb-2">Related Activities</h5>
                          <div className="space-y-1">
                            {note.relatedActivities.map((activity, index) => (
                              <div key={index} className="flex items-center space-x-2 text-xs text-text-secondary">
                                <Icon name={activity.type === 'reminder' ? 'Bell' : 'Calendar'} size={10} />
                                <span>{activity.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No notes found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default NotesTable;