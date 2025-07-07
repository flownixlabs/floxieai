import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

// Import components
import CalendarEventTable from './components/CalendarEventTable';
import CalendarEventCard from './components/CalendarEventCard';
import CalendarEventFilters from './components/CalendarEventFilters';
import CalendarEventModal from './components/CalendarEventModal';
import CalendarSyncMetrics from './components/CalendarSyncMetrics';
import BulkActionsBar from './components/BulkActionsBar';
import ActiveFiltersChips from './components/ActiveFiltersChips';

const CalendarEventsManagement = () => {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'timeline'
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  
  // Sorting state
  const [sortField, setSortField] = useState('dateTime');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    dateRange: { start: '', end: '' },
    calendarSource: '',
    user: ''
  });

  // Mock data
  const mockEvents = [
    {
      id: 1,
      eventId: 'evt_001_google_cal',
      title: 'Team Standup Meeting',
      description: 'Daily standup meeting with the development team to discuss progress and blockers.',
      dateTime: '2024-01-15T09:00:00Z',
      location: 'Conference Room A',
      userName: 'John Smith',
      userPhone: '+1234567890',
      userEmail: 'john.smith@example.com',
      calendarSource: 'Google Calendar',
      status: 'synced',
      attendees: 'john.smith@example.com, jane.doe@example.com, mike.wilson@example.com',
      createdAt: '2024-01-10T10:30:00Z',
      lastModified: '2024-01-14T16:45:00Z',
      lastSyncAttempt: '2024-01-14T16:45:00Z',
      syncAttempts: 3,
      syncError: null,
      syncHistory: [
        { timestamp: '2024-01-14T16:45:00Z', success: true },
        { timestamp: '2024-01-13T09:15:00Z', success: true },
        { timestamp: '2024-01-12T14:20:00Z', success: false, error: 'Network timeout' }
      ]
    },
    {
      id: 2,
      eventId: 'evt_002_google_cal',
      title: 'Client Presentation',
      description: 'Quarterly business review presentation for our key client.',
      dateTime: '2024-01-16T14:00:00Z',
      location: 'Client Office, Downtown',
      userName: 'Sarah Johnson',
      userPhone: '+1234567891',
      userEmail: 'sarah.johnson@example.com',
      calendarSource: 'Google Calendar',
      status: 'pending',
      attendees: 'sarah.johnson@example.com, client@company.com',
      createdAt: '2024-01-11T11:00:00Z',
      lastModified: '2024-01-15T09:30:00Z',
      lastSyncAttempt: '2024-01-15T09:30:00Z',
      syncAttempts: 1,
      syncError: null,
      syncHistory: [
        { timestamp: '2024-01-15T09:30:00Z', success: false, error: 'Calendar API rate limit exceeded' }
      ]
    },
    {
      id: 3,
      eventId: 'evt_003_outlook_cal',
      title: 'Doctor Appointment',
      description: 'Annual health checkup appointment.',
      dateTime: '2024-01-17T10:30:00Z',
      location: 'Medical Center, Suite 205',
      userName: 'Mike Wilson',
      userPhone: '+1234567892',
      userEmail: 'mike.wilson@example.com',
      calendarSource: 'Outlook Calendar',
      status: 'failed',
      attendees: 'mike.wilson@example.com',
      createdAt: '2024-01-12T15:20:00Z',
      lastModified: '2024-01-15T12:00:00Z',
      lastSyncAttempt: '2024-01-15T12:00:00Z',
      syncAttempts: 5,
      syncError: 'Authentication failed: Invalid OAuth token',
      syncHistory: [
        { timestamp: '2024-01-15T12:00:00Z', success: false, error: 'Authentication failed' },
        { timestamp: '2024-01-15T08:30:00Z', success: false, error: 'Authentication failed' },
        { timestamp: '2024-01-14T18:15:00Z', success: false, error: 'Network error' }
      ]
    },
    {
      id: 4,
      eventId: 'evt_004_google_cal',
      title: 'Project Planning Session',
      description: 'Planning session for the new mobile app project.',
      dateTime: '2024-01-18T13:00:00Z',
      location: 'Virtual Meeting',
      userName: 'Emily Davis',
      userPhone: '+1234567893',
      userEmail: 'emily.davis@example.com',
      calendarSource: 'Google Calendar',
      status: 'synced',
      attendees: 'emily.davis@example.com, team@company.com',
      createdAt: '2024-01-13T09:45:00Z',
      lastModified: '2024-01-15T14:20:00Z',
      lastSyncAttempt: '2024-01-15T14:20:00Z',
      syncAttempts: 2,
      syncError: null,
      syncHistory: [
        { timestamp: '2024-01-15T14:20:00Z', success: true },
        { timestamp: '2024-01-14T10:30:00Z', success: true }
      ]
    },
    {
      id: 5,
      eventId: 'evt_005_apple_cal',
      title: 'Family Dinner',
      description: 'Monthly family dinner at grandparents house.',
      dateTime: '2024-01-19T18:00:00Z',
      location: 'Grandparents House',
      userName: 'David Brown',
      userPhone: '+1234567894',
      userEmail: 'david.brown@example.com',
      calendarSource: 'Apple Calendar',
      status: 'disconnected',
      attendees: 'family@example.com',
      createdAt: '2024-01-14T16:30:00Z',
      lastModified: '2024-01-15T10:15:00Z',
      lastSyncAttempt: '2024-01-15T10:15:00Z',
      syncAttempts: 0,
      syncError: 'Calendar integration not configured',
      syncHistory: []
    },
    {
      id: 6,
      eventId: 'evt_006_google_cal',
      title: 'Workout Session',
      description: 'Personal training session at the gym.',
      dateTime: '2024-01-20T07:00:00Z',
      location: 'Fitness Center',
      userName: 'Lisa Anderson',
      userPhone: '+1234567895',
      userEmail: 'lisa.anderson@example.com',
      calendarSource: 'Google Calendar',
      status: 'synced',
      attendees: 'lisa.anderson@example.com, trainer@gym.com',
      createdAt: '2024-01-15T12:45:00Z',
      lastModified: '2024-01-15T12:45:00Z',
      lastSyncAttempt: '2024-01-15T12:45:00Z',
      syncAttempts: 1,
      syncError: null,
      syncHistory: [
        { timestamp: '2024-01-15T12:45:00Z', success: true }
      ]
    }
  ];

  const mockMetrics = {
    totalEvents: 6,
    syncedEvents: 3,
    pendingEvents: 1,
    failedEvents: 1,
    connectedUsers: 5,
    calendarSources: 3
  };

  const notificationCounts = {
    users: 12,
    messages: 8,
    reminders: 15,
    calendar: 2
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [events, filters, sortField, sortDirection]);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEvents(mockEvents);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...events];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.userName.toLowerCase().includes(searchTerm) ||
        event.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(event => event.status === filters.status);
    }

    // Apply date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.dateTime);
        const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
        const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : null;

        if (startDate && endDate) {
          return eventDate >= startDate && eventDate <= endDate;
        } else if (startDate) {
          return eventDate >= startDate;
        } else if (endDate) {
          return eventDate <= endDate;
        }
        return true;
      });
    }

    // Apply calendar source filter
    if (filters.calendarSource) {
      filtered = filtered.filter(event => event.calendarSource === filters.calendarSource);
    }

    // Apply user filter
    if (filters.user) {
      const userTerm = filters.user.toLowerCase();
      filtered = filtered.filter(event => 
        event.userName.toLowerCase().includes(userTerm)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'dateTime') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredEvents(filtered);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      dateRange: { start: '', end: '' },
      calendarSource: '',
      user: ''
    });
  };

  const handleRemoveFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSelectEvent = (eventId, isSelected) => {
    if (isSelected) {
      setSelectedEvents(prev => [...prev, eventId]);
    } else {
      setSelectedEvents(prev => prev.filter(id => id !== eventId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedEvents(filteredEvents.map(event => event.id));
    } else {
      setSelectedEvents([]);
    }
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleRetrySync = async (eventId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update event status
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, status: 'pending', lastSyncAttempt: new Date().toISOString() }
          : event
      ));
    } catch (error) {
      console.error('Failed to retry sync:', error);
    }
  };

  const handleBulkRetrySync = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update selected events
      setEvents(prev => prev.map(event => 
        selectedEvents.includes(event.id)
          ? { ...event, status: 'pending', lastSyncAttempt: new Date().toISOString() }
          : event
      ));
      
      setSelectedEvents([]);
    } catch (error) {
      console.error('Failed to bulk retry sync:', error);
    }
  };

  const handleBulkUpdateStatus = async (status) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update selected events
      setEvents(prev => prev.map(event => 
        selectedEvents.includes(event.id)
          ? { ...event, status }
          : event
      ));
      
      setSelectedEvents([]);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleExportData = async () => {
    try {
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedEventsData = events.filter(event => selectedEvents.includes(event.id));
      const csvContent = [
        ['Event ID', 'Title', 'User', 'Date/Time', 'Status', 'Calendar Source'].join(','),
        ...selectedEventsData.map(event => [
          event.eventId,
          `"${event.title}"`,
          event.userName,
          event.dateTime,
          event.status,
          event.calendarSource
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `calendar-events-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export data:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex">
        <AdminSidebar user={user} onLogout={logout} notificationCounts={notificationCounts} />
        <div className="flex-1 lg:ml-64">
          <div className="p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar user={user} onLogout={logout} notificationCounts={notificationCounts} />
      
      <div className="flex-1 lg:ml-64">
        <div className="p-4 lg:p-6 pb-20 sm:pb-6">
          <BreadcrumbNavigation />
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                Calendar Events Management
              </h1>
              <p className="text-text-secondary">
                Monitor and manage Google Calendar synchronization across all user accounts
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                size="sm"
                iconName="Filter"
                iconPosition="left"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                Filters
              </Button>
              
              <div className="hidden lg:flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'table' ? 'primary' : 'ghost'}
                  size="xs"
                  iconName="Table"
                  onClick={() => setViewMode('table')}
                >
                  Table
                </Button>
                <Button
                  variant={viewMode === 'timeline' ? 'primary' : 'ghost'}
                  size="xs"
                  iconName="Calendar"
                  onClick={() => setViewMode('timeline')}
                >
                  Timeline
                </Button>
              </div>
              
              <Button
                variant="primary"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={loadEvents}
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Metrics */}
          <CalendarSyncMetrics metrics={mockMetrics} />

          {/* Filters and Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Filters */}
            {showFilters && (
              <div className="hidden lg:block lg:w-80 flex-shrink-0">
                <CalendarEventFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Active Filters */}
              <ActiveFiltersChips
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearFilters}
                resultCount={filteredEvents.length}
              />

              {/* Bulk Actions */}
              <BulkActionsBar
                selectedCount={selectedEvents.length}
                onRetrySync={handleBulkRetrySync}
                onUpdateStatus={handleBulkUpdateStatus}
                onExportData={handleExportData}
                onClearSelection={() => setSelectedEvents([])}
              />

              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" 
                  />
                  <Input
                    type="search"
                    placeholder="Search events by title, user, or description..."
                    value={filters.search}
                    onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Events Display */}
              {viewMode === 'table' ? (
                <div className="hidden lg:block">
                  <CalendarEventTable
                    events={filteredEvents}
                    onSort={handleSort}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    selectedEvents={selectedEvents}
                    onSelectEvent={handleSelectEvent}
                    onSelectAll={handleSelectAll}
                    onViewDetails={handleViewDetails}
                    onRetrySync={handleRetrySync}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map(event => (
                    <CalendarEventCard
                      key={event.id}
                      event={event}
                      onViewDetails={handleViewDetails}
                      onRetrySync={handleRetrySync}
                      isSelected={selectedEvents.includes(event.id)}
                      onSelect={handleSelectEvent}
                    />
                  ))}
                </div>
              )}

              {/* Mobile Cards (always visible on mobile) */}
              <div className="lg:hidden space-y-4">
                {filteredEvents.map(event => (
                  <CalendarEventCard
                    key={event.id}
                    event={event}
                    onViewDetails={handleViewDetails}
                    onRetrySync={handleRetrySync}
                    isSelected={selectedEvents.includes(event.id)}
                    onSelect={handleSelectEvent}
                  />
                ))}
              </div>

              {/* Empty State */}
              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Calendar" size={32} className="text-text-muted" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">
                    No events found
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {Object.values(filters).some(f => f !== '' && (typeof f !== 'object' || Object.values(f).some(v => v !== '')))
                      ? 'Try adjusting your filters to see more results.' :'No calendar events have been synced yet.'
                    }
                  </p>
                  {Object.values(filters).some(f => f !== '' && (typeof f !== 'object' || Object.values(f).some(v => v !== ''))) && (
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <CalendarEventFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
          isMobile={true}
          onClose={() => setShowMobileFilters(false)}
        />
      )}

      {/* Event Details Modal */}
      <CalendarEventModal
        event={selectedEvent}
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setSelectedEvent(null);
        }}
        onRetrySync={handleRetrySync}
      />
    </div>
  );
};

export default CalendarEventsManagement;