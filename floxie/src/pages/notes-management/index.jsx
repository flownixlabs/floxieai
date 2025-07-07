import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import NotesTable from './components/NotesTable';
import NotesFilters from './components/NotesFilters';
import BulkActions from './components/BulkActions';
import NotesStats from './components/NotesStats';

import Button from '../../components/ui/Button';

const NotesManagement = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [expandedNotes, setExpandedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ field: 'createdAt', direction: 'desc' });
  const [filters, setFilters] = useState({
    search: '',
    userSearch: '',
    connectionType: 'all',
    lengthCategory: 'all',
    startDate: '',
    endDate: ''
  });

  // Mock data for notes
  const mockNotes = [
    {
      id: 1,
      userName: "Sarah Johnson",
      userPhone: "+1 (555) 123-4567",
      content: `Meeting with the marketing team tomorrow at 2 PM to discuss the Q4 campaign strategy. Need to prepare the presentation slides and gather feedback from the previous campaign performance. Also, remember to bring the budget allocation spreadsheet and timeline for the holiday promotions.`,
      createdAt: "2024-01-15T14:30:00Z",
      source: "Voice Note",
      reminderLinked: true,
      calendarLinked: true,
      relatedActivities: [
        {
          type: "reminder",
          description: "Reminder set for tomorrow 1:30 PM",
          timestamp: "2024-01-16T13:30:00Z"
        },
        {
          type: "calendar",
          description: "Calendar event created: Marketing Team Meeting",
          timestamp: "2024-01-16T14:00:00Z"
        }
      ]
    },
    {
      id: 2,
      userName: "Michael Chen",
      userPhone: "+1 (555) 987-6543",
      content: "Buy groceries: milk, bread, eggs, chicken breast, vegetables for the week. Also pick up the dry cleaning and stop by the pharmacy to refill prescription.",
      createdAt: "2024-01-15T09:15:00Z",
      source: "Text Message",
      reminderLinked: true,
      calendarLinked: false,
      relatedActivities: [
        {
          type: "reminder",
          description: "Reminder set for today 6:00 PM",
          timestamp: "2024-01-15T18:00:00Z"
        }
      ]
    },
    {
      id: 3,
      userName: "Emily Rodriguez",
      userPhone: "+1 (555) 456-7890",
      content: `Project ideas for the new mobile app:\n1. User authentication with biometric login\n2. Real-time chat functionality\n3. Push notifications for important updates\n4. Offline mode for core features\n5. Integration with social media platforms\n6. Advanced search and filtering options\n7. Data analytics dashboard for admin users`,
      createdAt: "2024-01-14T16:45:00Z",
      source: "Text Message",
      reminderLinked: false,
      calendarLinked: false,
      relatedActivities: []
    },
    {
      id: 4,
      userName: "David Thompson",
      userPhone: "+1 (555) 321-0987",
      content: "Doctor appointment next Friday at 10 AM. Need to bring insurance card and list of current medications. Ask about the test results from last week.",
      createdAt: "2024-01-14T11:20:00Z",
      source: "Voice Note",
      reminderLinked: true,
      calendarLinked: true,
      relatedActivities: [
        {
          type: "reminder",
          description: "Reminder set for Friday 9:00 AM",
          timestamp: "2024-01-19T09:00:00Z"
        },
        {
          type: "calendar",
          description: "Calendar event created: Doctor Appointment",
          timestamp: "2024-01-19T10:00:00Z"
        }
      ]
    },
    {
      id: 5,
      userName: "Lisa Wang",
      userPhone: "+1 (555) 654-3210",
      content: "Book recommendations from the book club: 'The Seven Husbands of Evelyn Hugo', 'Where the Crawdads Sing', 'The Silent Patient'. Need to order these before the next meeting.",
      createdAt: "2024-01-13T19:30:00Z",
      source: "Text Message",
      reminderLinked: false,
      calendarLinked: false,
      relatedActivities: []
    },
    {
      id: 6,
      userName: "James Wilson",
      userPhone: "+1 (555) 789-0123",
      content: `Travel checklist for Europe trip:\n- Passport and visa documents\n- Travel insurance\n- Hotel reservations\n- Flight tickets\n- Currency exchange\n- Packing list\n- Camera and chargers\n- Itinerary for each city\n- Emergency contact information\n- Medication for the trip`,
      createdAt: "2024-01-13T08:45:00Z",
      source: "Voice Note",
      reminderLinked: true,
      calendarLinked: true,
      relatedActivities: [
        {
          type: "reminder",
          description: "Reminder set for 2 weeks before trip",
          timestamp: "2024-02-01T10:00:00Z"
        },
        {
          type: "calendar",
          description: "Calendar event created: Europe Trip",
          timestamp: "2024-02-15T08:00:00Z"
        }
      ]
    },
    {
      id: 7,
      userName: "Amanda Foster",
      userPhone: "+1 (555) 234-5678",
      content: "Gift ideas for mom's birthday: jewelry, spa day voucher, her favorite perfume, photo album with family pictures, or a weekend getaway.",
      createdAt: "2024-01-12T15:20:00Z",
      source: "Text Message",
      reminderLinked: true,
      calendarLinked: false,
      relatedActivities: [
        {
          type: "reminder",
          description: "Reminder set for 1 week before birthday",
          timestamp: "2024-01-25T10:00:00Z"
        }
      ]
    },
    {
      id: 8,
      userName: "Robert Kim",
      userPhone: "+1 (555) 876-5432",
      content: "Call the insurance company about the car accident claim. Reference number: CLM-2024-001234. Need to provide additional documentation and photos.",
      createdAt: "2024-01-12T10:15:00Z",
      source: "Voice Note",
      reminderLinked: true,
      calendarLinked: false,
      relatedActivities: [
        {
          type: "reminder",
          description: "Reminder set for today 2:00 PM",
          timestamp: "2024-01-12T14:00:00Z"
        }
      ]
    }
  ];

  // Calculate stats from mock data
  const calculateStats = (notesData) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const thisWeekNotes = notesData.filter(note => 
      new Date(note.createdAt) >= weekAgo
    ).length;
    
    const reminderLinked = notesData.filter(note => note.reminderLinked).length;
    const calendarLinked = notesData.filter(note => note.calendarLinked).length;
    const voiceNotes = notesData.filter(note => note.source === "Voice Note").length;
    
    const totalChars = notesData.reduce((sum, note) => sum + note.content.length, 0);
    const avgLength = notesData.length > 0 ? Math.round(totalChars / notesData.length) : 0;
    
    return {
      totalNotes: notesData.length,
      thisWeekNotes,
      reminderLinked,
      calendarLinked,
      voiceNotes,
      avgLength,
      weeklyGrowth: 12 // Mock growth percentage
    };
  };

  // Filter and sort notes
  const filteredAndSortedNotes = useMemo(() => {
    let filtered = [...mockNotes];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(note =>
        note.content.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply user search filter
    if (filters.userSearch) {
      filtered = filtered.filter(note =>
        note.userName.toLowerCase().includes(filters.userSearch.toLowerCase()) ||
        note.userPhone.includes(filters.userSearch)
      );
    }

    // Apply connection type filter
    if (filters.connectionType !== 'all') {
      switch (filters.connectionType) {
        case 'standalone':
          filtered = filtered.filter(note => !note.reminderLinked && !note.calendarLinked);
          break;
        case 'reminder':
          filtered = filtered.filter(note => note.reminderLinked && !note.calendarLinked);
          break;
        case 'calendar':
          filtered = filtered.filter(note => !note.reminderLinked && note.calendarLinked);
          break;
        case 'both':
          filtered = filtered.filter(note => note.reminderLinked && note.calendarLinked);
          break;
      }
    }

    // Apply length category filter
    if (filters.lengthCategory !== 'all') {
      switch (filters.lengthCategory) {
        case 'short':
          filtered = filtered.filter(note => note.content.length < 100);
          break;
        case 'medium':
          filtered = filtered.filter(note => note.content.length >= 100 && note.content.length <= 500);
          break;
        case 'long':
          filtered = filtered.filter(note => note.content.length > 500);
          break;
      }
    }

    // Apply date range filter
    if (filters.startDate || filters.endDate) {
      filtered = filtered.filter(note => {
        const noteDate = new Date(note.createdAt);
        const startDate = filters.startDate ? new Date(filters.startDate) : null;
        const endDate = filters.endDate ? new Date(filters.endDate) : null;
        
        if (startDate && noteDate < startDate) return false;
        if (endDate && noteDate > endDate) return false;
        return true;
      });
    }

    // Add search term to notes for highlighting
    filtered = filtered.map(note => ({
      ...note,
      searchTerm: filters.search
    }));

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.field];
      let bValue = b[sortConfig.field];

      if (sortConfig.field === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortConfig.field === 'user') {
        aValue = a.userName;
        bValue = b.userName;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [filters, sortConfig]);

  const stats = useMemo(() => calculateStats(mockNotes), []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setNotes(mockNotes);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectNote = (noteId) => {
    setSelectedNotes(prev => 
      prev.includes(noteId) 
        ? prev.filter(id => id !== noteId)
        : [...prev, noteId]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotes.length === filteredAndSortedNotes.length) {
      setSelectedNotes([]);
    } else {
      setSelectedNotes(filteredAndSortedNotes.map(note => note.id));
    }
  };

  const handleExpandNote = (noteId) => {
    setExpandedNotes(prev =>
      prev.includes(noteId)
        ? prev.filter(id => id !== noteId)
        : [...prev, noteId]
    );
  };

  const handleSort = (config) => {
    setSortConfig(config);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setSelectedNotes([]); // Clear selection when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      userSearch: '',
      connectionType: 'all',
      lengthCategory: 'all',
      startDate: '',
      endDate: ''
    });
  };

  const handleBulkAction = (action, noteIds, options = {}) => {
    console.log(`Bulk action: ${action}`, noteIds, options);
    
    switch (action) {
      case 'export':
        // Simulate export
        alert(`Exporting ${noteIds.length} notes in ${options.format} format`);
        break;
      case 'categorize':
        alert(`Adding category to ${noteIds.length} notes`);
        break;
      case 'notify':
        alert(`Sending notifications for ${noteIds.length} notes`);
        break;
      case 'archive':
        alert(`Archiving ${noteIds.length} notes`);
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete ${noteIds.length} notes? This action cannot be undone.`)) {
          alert(`Deleting ${noteIds.length} notes`);
        }
        break;
      default:
        break;
    }
    
    setSelectedNotes([]);
  };

  const notificationCounts = {
    users: 3,
    messages: 12,
    reminders: 8,
    calendar: 2
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex">
        <AdminSidebar user={user} onLogout={logout} notificationCounts={notificationCounts} />
        <div className="flex-1 lg:ml-64">
          <div className="p-6 lg:p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              <div className="h-16 bg-gray-200 rounded-lg"></div>
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
        <div className="p-4 lg:p-8">
          <BreadcrumbNavigation />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-text-primary mb-2">
                Notes Management
              </h1>
              <p className="text-text-secondary">
                Manage and organize all user-generated notes and system annotations
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="RefreshCw"
                onClick={() => window.location.reload()}
                className="text-text-secondary hover:text-primary"
              >
                Refresh
              </Button>
              
              <Button
                variant="primary"
                iconName="Download"
                iconPosition="left"
              >
                Export All
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <NotesStats stats={stats} />

          {/* Filters */}
          <NotesFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            totalNotes={mockNotes.length}
            filteredCount={filteredAndSortedNotes.length}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedNotes={selectedNotes}
            onClearSelection={() => setSelectedNotes([])}
            onBulkAction={handleBulkAction}
          />

          {/* Notes Table */}
          <NotesTable
            notes={filteredAndSortedNotes}
            selectedNotes={selectedNotes}
            onSelectNote={handleSelectNote}
            onSelectAll={handleSelectAll}
            onExpandNote={handleExpandNote}
            expandedNotes={expandedNotes}
            onSort={handleSort}
            sortConfig={sortConfig}
          />

          {/* Pagination would go here if needed */}
          {filteredAndSortedNotes.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-text-secondary">
                Showing {filteredAndSortedNotes.length} of {mockNotes.length} notes
              </p>
              
              {filteredAndSortedNotes.length < mockNotes.length && (
                <Button
                  variant="outline"
                  iconName="MoreHorizontal"
                  onClick={() => alert('Load more functionality would be implemented here')}
                >
                  Load More
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesManagement;