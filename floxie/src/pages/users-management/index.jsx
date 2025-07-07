import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import UserTableRow from './components/UserTableRow';
import UserCard from './components/UserCard';
import FilterBar from './components/FilterBar';
import BulkActionsBar from './components/BulkActionsBar';
import UserDetailsModal from './components/UserDetailsModal';
import SearchBar from './components/SearchBar';
import PaginationControls from './components/PaginationControls';

const UsersManagement = () => {
  const { user, logout } = useAuth();
  
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    status: '',
    dateRange: { start: '', end: '' },
    reminderRange: ''
  });

  // Mock data
  const mockUsers = [
    {
      id: 'USR001',
      name: 'Sarah Johnson',
      whatsappNumber: '+1-555-0123',
      email: 'sarah.johnson@email.com',
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      totalReminders: 45,
      activeReminders: 8,
      totalNotes: 23,
      calendarEvents: 12,
      status: 'active',
      joinedDate: new Date('2024-01-15'),
      timezone: 'America/New_York',
      language: 'English'
    },
    {
      id: 'USR002',
      name: 'Michael Chen',
      whatsappNumber: '+1-555-0124',
      email: 'michael.chen@email.com',
      lastActive: new Date(Date.now() - 5 * 60 * 60 * 1000),
      totalReminders: 78,
      activeReminders: 15,
      totalNotes: 34,
      calendarEvents: 28,
      status: 'active',
      joinedDate: new Date('2024-01-10'),
      timezone: 'America/Los_Angeles',
      language: 'English'
    },
    {
      id: 'USR003',
      name: 'Emily Rodriguez',
      whatsappNumber: '+1-555-0125',
      email: 'emily.rodriguez@email.com',
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
      totalReminders: 23,
      activeReminders: 3,
      totalNotes: 15,
      calendarEvents: 7,
      status: 'inactive',
      joinedDate: new Date('2024-02-01'),
      timezone: 'America/Chicago',
      language: 'Spanish'
    },
    {
      id: 'USR004',
      name: 'David Thompson',
      whatsappNumber: '+1-555-0126',
      email: 'david.thompson@email.com',
      lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      totalReminders: 156,
      activeReminders: 22,
      totalNotes: 67,
      calendarEvents: 45,
      status: 'active',
      joinedDate: new Date('2023-12-20'),
      timezone: 'America/New_York',
      language: 'English'
    },
    {
      id: 'USR005',
      name: 'Lisa Wang',
      whatsappNumber: '+1-555-0127',
      email: 'lisa.wang@email.com',
      lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      totalReminders: 89,
      activeReminders: 12,
      totalNotes: 41,
      calendarEvents: 19,
      status: 'suspended',
      joinedDate: new Date('2024-01-25'),
      timezone: 'America/Los_Angeles',
      language: 'English'
    },
    {
      id: 'USR006',
      name: 'James Wilson',
      whatsappNumber: '+1-555-0128',
      email: 'james.wilson@email.com',
      lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000),
      totalReminders: 34,
      activeReminders: 6,
      totalNotes: 18,
      calendarEvents: 9,
      status: 'active',
      joinedDate: new Date('2024-02-10'),
      timezone: 'America/Denver',
      language: 'English'
    },
    {
      id: 'USR007',
      name: 'Maria Garcia',
      whatsappNumber: '+1-555-0129',
      email: 'maria.garcia@email.com',
      lastActive: new Date(Date.now() - 12 * 60 * 60 * 1000),
      totalReminders: 67,
      activeReminders: 11,
      totalNotes: 29,
      calendarEvents: 16,
      status: 'active',
      joinedDate: new Date('2024-01-08'),
      timezone: 'America/Phoenix',
      language: 'Spanish'
    },
    {
      id: 'USR008',
      name: 'Robert Kim',
      whatsappNumber: '+1-555-0130',
      email: 'robert.kim@email.com',
      lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      totalReminders: 112,
      activeReminders: 18,
      totalNotes: 52,
      calendarEvents: 31,
      status: 'active',
      joinedDate: new Date('2023-12-15'),
      timezone: 'America/Los_Angeles',
      language: 'English'
    }
  ];

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let filtered = mockUsers;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.whatsappNumber.includes(searchTerm) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(user => user.status === filters.status);
    }

    // Apply date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      filtered = filtered.filter(user => {
        const userDate = new Date(user.lastActive);
        const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
        const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : null;

        if (startDate && endDate) {
          return userDate >= startDate && userDate <= endDate;
        } else if (startDate) {
          return userDate >= startDate;
        } else if (endDate) {
          return userDate <= endDate;
        }
        return true;
      });
    }

    // Apply reminder range filter
    if (filters.reminderRange) {
      filtered = filtered.filter(user => {
        const count = user.totalReminders;
        switch (filters.reminderRange) {
          case '0-10':
            return count >= 0 && count <= 10;
          case '11-50':
            return count >= 11 && count <= 50;
          case '51-100':
            return count >= 51 && count <= 100;
          case '100+':
            return count > 100;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [searchTerm, filters]);

  // Sorting logic
  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers];
    sorted.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'lastActive' || sortConfig.key === 'joinedDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [filteredUsers, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

  // Event handlers
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      dateRange: { start: '', end: '' },
      reminderRange: ''
    });
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSelectUser = (userId, isSelected) => {
    setSelectedUsers(prev => 
      isSelected 
        ? [...prev, userId]
        : prev.filter(id => id !== userId)
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(paginatedUsers.map(user => user.id));
  };

  const handleDeselectAll = () => {
    setSelectedUsers([]);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    console.log('Edit user:', user);
    // Implement edit functionality
  };

  const handleToggleStatus = (user) => {
    console.log('Toggle status for user:', user);
    // Implement status toggle functionality
  };

  const handleBulkStatusUpdate = (status) => {
    console.log('Bulk status update:', status, selectedUsers);
    // Implement bulk status update
    setSelectedUsers([]);
  };

  const handleBulkExport = () => {
    console.log('Bulk export:', selectedUsers);
    // Implement bulk export functionality
  };

  const handleBulkDelete = () => {
    console.log('Bulk delete:', selectedUsers);
    // Implement bulk delete functionality
    setSelectedUsers([]);
  };

  const handleExportData = () => {
    console.log('Export all data');
    // Implement data export functionality
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedUsers([]);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setSelectedUsers([]);
  };

  const tableHeaders = [
    { key: 'name', label: 'User', sortable: true },
    { key: 'whatsappNumber', label: 'WhatsApp Number', sortable: true },
    { key: 'lastActive', label: 'Last Active', sortable: true },
    { key: 'totalReminders', label: 'Reminders', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar 
          user={user} 
          onLogout={logout}
          notificationCounts={{
            users: 3,
            messages: 12,
            reminders: 8,
            calendar: 5
          }}
        />
        
        <main className="flex-1 lg:ml-0 pb-20 sm:pb-0">
          <div className="container-fluid py-6 lg:py-8">
            <BreadcrumbNavigation />
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                  Users Management
                </h1>
                <p className="text-text-secondary">
                  Monitor and manage all WhatsApp assistant users
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExportData}
                >
                  Export All
                </Button>
                <Button
                  variant="primary"
                  iconName="UserPlus"
                  iconPosition="left"
                >
                  Add User
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onClearSearch={handleClearSearch}
              resultsCount={filteredUsers.length}
            />

            {/* Filter Bar */}
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              onExportData={handleExportData}
              totalResults={filteredUsers.length}
            />

            {/* Bulk Actions Bar */}
            <BulkActionsBar
              selectedCount={selectedUsers.length}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              onBulkStatusUpdate={handleBulkStatusUpdate}
              onBulkExport={handleBulkExport}
              onBulkDelete={handleBulkDelete}
              totalCount={paginatedUsers.length}
            />

            {/* Content Area */}
            {sortedUsers.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  No users found
                </h3>
                <p className="text-text-secondary">
                  {searchTerm || Object.values(filters).some(f => f && (typeof f === 'string' ? f : f.start || f.end))
                    ? 'Try adjusting your search or filters' :'Get started by adding your first user'
                  }
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                {!isMobileView ? (
                  <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-border">
                        <thead className="bg-surface-hover">
                          <tr>
                            <th className="px-6 py-3 text-left">
                              <input
                                type="checkbox"
                                checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                                onChange={(e) => e.target.checked ? handleSelectAll() : handleDeselectAll()}
                                className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                              />
                            </th>
                            {tableHeaders.map((header) => (
                              <th
                                key={header.key}
                                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
                              >
                                {header.sortable ? (
                                  <button
                                    onClick={() => handleSort(header.key)}
                                    className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-150"
                                  >
                                    <span>{header.label}</span>
                                    <Icon
                                      name={
                                        sortConfig.key === header.key
                                          ? sortConfig.direction === 'asc' ?'ChevronUp' :'ChevronDown' :'ChevronsUpDown'
                                      }
                                      size={16}
                                    />
                                  </button>
                                ) : (
                                  header.label
                                )}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-surface divide-y divide-border">
                          {paginatedUsers.map((user) => (
                            <UserTableRow
                              key={user.id}
                              user={user}
                              isSelected={selectedUsers.includes(user.id)}
                              onSelect={handleSelectUser}
                              onViewDetails={handleViewDetails}
                              onEditUser={handleEditUser}
                              onToggleStatus={handleToggleStatus}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  /* Mobile Card View */
                  <div className="space-y-4">
                    {paginatedUsers.map((user) => (
                      <UserCard
                        key={user.id}
                        user={user}
                        isSelected={selectedUsers.includes(user.id)}
                        onSelect={handleSelectUser}
                        onViewDetails={handleViewDetails}
                        onEditUser={handleEditUser}
                        onToggleStatus={handleToggleStatus}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="mt-6">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={sortedUsers.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
      />
    </div>
  );
};

export default UsersManagement;