import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import MetricCard from './components/MetricCard';
import ActivityTable from './components/ActivityTable';
import QuickActions from './components/QuickActions';
import SystemAlerts from './components/SystemAlerts';

const AdminDashboardOverview = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(3);

  // Mock data for dashboard metrics
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalUsers: 1247,
    activeUsersThisWeek: 892,
    totalReminders: 5634,
    failedReminderLogs: 23,
    calendarSyncs: 1156
  });

  // Mock data for recent activities
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'user_registration',
      action: 'New User Registration',
      details: 'User signed up via WhatsApp',
      user: 'Sarah Johnson',
      timestamp: new Date(Date.now() - 300000),
      status: 'success'
    },
    {
      id: 2,
      type: 'reminder_created',
      action: 'Reminder Created',
      details: 'Meeting reminder set for tomorrow',
      user: 'Michael Chen',
      timestamp: new Date(Date.now() - 600000),
      status: 'success'
    },
    {
      id: 3,
      type: 'calendar_sync',
      action: 'Calendar Sync Failed',
      details: 'Google Calendar authentication expired',
      user: 'Emma Wilson',
      timestamp: new Date(Date.now() - 900000),
      status: 'failed'
    },
    {
      id: 4,
      type: 'message_sent',
      action: 'Broadcast Message Sent',
      details: 'Weekly newsletter delivered to 1,200+ users',
      user: 'System',
      timestamp: new Date(Date.now() - 1200000),
      status: 'success'
    },
    {
      id: 5,
      type: 'note_created',
      action: 'Voice Note Transcribed',
      details: 'Audio message converted to text',
      user: 'David Rodriguez',
      timestamp: new Date(Date.now() - 1500000),
      status: 'processing'
    }
  ]);

  // Mock data for system alerts
  const [systemAlerts, setSystemAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'WhatsApp API Rate Limit Warning',
      message: 'Approaching daily message limit (85% used)',
      details: 'Current usage: 8,500/10,000 messages. Consider upgrading plan or implementing message queuing.',
      timestamp: new Date(Date.now() - 1800000),
      actionRequired: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'Calendar Sync Failures',
      message: '12 users experiencing sync issues',
      details: 'Google Calendar API returning authentication errors. Users may need to re-authorize their accounts.',
      timestamp: new Date(Date.now() - 3600000),
      actionRequired: true
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance planned for this weekend',
      details: 'Database optimization and server updates scheduled for Saturday 2:00 AM - 4:00 AM EST.',
      timestamp: new Date(Date.now() - 7200000),
      actionRequired: false
    }
  ]);

  const notificationCounts = {
    users: 5,
    messages: 12,
    reminders: 3,
    calendar: 8
  };

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  const handleMetricCardClick = (route) => {
    navigate(route);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'users-management': navigate('/users-management');
        break;
      case 'broadcast': console.log('Opening broadcast modal...');
        break;
      case 'system-health': console.log('Opening system health dashboard...');
        break;
      case 'export':
        console.log('Starting data export...');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleDismissAlert = (alertId) => {
    setSystemAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleGlobalSearch = (e) => {
    if (e.key === 'Enter') {
      console.log('Searching for:', searchTerm);
      // Implement global search functionality
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar 
        user={user} 
        onLogout={logout}
        notificationCounts={notificationCounts}
      />
      
      <div className="lg:ml-64 min-h-screen">
        {/* Top Header */}
        <header className="bg-surface border-b border-border sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" 
                  />
                  <Input
                    type="search"
                    placeholder="Search users, messages, reminders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleGlobalSearch}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Bell"
                  className="relative"
                  onClick={() => console.log('Opening notifications...')}
                >
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </Button>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="var(--color-primary)" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-text-primary">
                      {user?.name || 'Admin User'}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Administrator
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 pb-20 lg:pb-6">
          <BreadcrumbNavigation />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
              Dashboard Overview
            </h1>
            <p className="text-text-secondary">
              Monitor system performance and user activity across all Floxie services
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            <MetricCard
              title="Total Users"
              value={dashboardMetrics.totalUsers}
              trend="up"
              trendValue="+12%"
              icon="Users"
              color="primary"
              actionLabel="Manage Users"
              onActionClick={() => handleMetricCardClick('/users-management')}
              isLoading={isLoading}
            />
            
            <MetricCard
              title="Active This Week"
              value={dashboardMetrics.activeUsersThisWeek}
              trend="up"
              trendValue="+8%"
              icon="UserCheck"
              color="success"
              actionLabel="View Activity"
              onActionClick={() => handleMetricCardClick('/users-management')}
              isLoading={isLoading}
            />
            
            <MetricCard
              title="Total Reminders"
              value={dashboardMetrics.totalReminders}
              trend="up"
              trendValue="+24%"
              icon="Bell"
              color="secondary"
              actionLabel="View Reminders"
              onActionClick={() => handleMetricCardClick('/notes-management')}
              isLoading={isLoading}
            />
            
            <MetricCard
              title="Failed Logs"
              value={dashboardMetrics.failedReminderLogs}
              trend="down"
              trendValue="-15%"
              icon="AlertTriangle"
              color="error"
              actionLabel="Review Failures"
              onActionClick={() => handleMetricCardClick('/notes-management')}
              isLoading={isLoading}
            />
            
            <MetricCard
              title="Calendar Syncs"
              value={dashboardMetrics.calendarSyncs}
              trend="up"
              trendValue="+18%"
              icon="Calendar"
              color="warning"
              actionLabel="Manage Calendar"
              onActionClick={() => handleMetricCardClick('/calendar-events-management')}
              isLoading={isLoading}
            />
          </div>

          {/* System Alerts */}
          <div className="mb-8">
            <SystemAlerts 
              alerts={systemAlerts}
              onDismissAlert={handleDismissAlert}
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Recent Activity - Takes 2 columns */}
            <div className="xl:col-span-2">
              <ActivityTable 
                activities={recentActivities}
                isLoading={isLoading}
              />
            </div>
            
            {/* Quick Actions - Takes 1 column */}
            <div className="xl:col-span-1">
              <QuickActions onActionClick={handleQuickAction} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;