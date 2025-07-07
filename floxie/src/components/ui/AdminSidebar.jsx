import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = ({ user, onLogout, notificationCounts = {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin-dashboard-overview',
      icon: 'LayoutDashboard',
      description: 'System overview and key metrics'
    },
    {
      label: 'Users',
      path: '/users-management',
      icon: 'Users',
      description: 'Manage user accounts and permissions',
      badge: notificationCounts.users || 0
    },
    {
      label: 'Messages',
      path: '/notes-management',
      icon: 'MessageSquare',
      description: 'Monitor WhatsApp interactions',
      badge: notificationCounts.messages || 0
    },
    {
      label: 'Reminders',
      path: '/notes-management',
      icon: 'Bell',
      description: 'Reminder lifecycle management',
      badge: notificationCounts.reminders || 0
    },
    {
      label: 'Notes',
      path: '/notes-management',
      icon: 'FileText',
      description: 'User-generated content management'
    },
    {
      label: 'Calendar Events',
      path: '/calendar-events-management',
      icon: 'Calendar',
      description: 'Google Calendar sync monitoring',
      badge: notificationCounts.calendar || 0
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/admin-authentication');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-surface rounded-lg shadow-md border border-border hover:bg-surface-hover transition-colors duration-150 focus-ring"
        aria-label="Toggle navigation menu"
      >
        <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-surface border-r border-border z-50 transition-all duration-300 ease-out
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:static lg:translate-x-0
        flex flex-col
      `}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b border-border ${isCollapsed ? 'px-2' : ''}`}>
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md">
                  <Icon name="MessageCircle" size={18} color="white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Sparkles" size={8} color="white" strokeWidth={3} />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-heading font-semibold text-text-primary">Floxie</h1>
                <p className="text-xs text-text-secondary font-medium">Admin Panel</p>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-surface-hover transition-colors duration-150 focus-ring"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin">
          {navigationItems.map((item) => {
            const isActive = isActiveRoute(item.path);
            
            return (
              <div key={item.path} className="relative group">
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }
                    ${isCollapsed ? 'justify-center' : 'justify-start'}
                  `}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={`flex-shrink-0 ${!isCollapsed && 'mr-3'}`}
                  />
                  
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-error text-error-foreground rounded-full">
                          {item.badge > 99 ? '99+' : item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-text-primary text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                    <div className="flex items-center space-x-2">
                      <span>{item.label}</span>
                      {item.badge > 0 && (
                        <span className="px-1.5 py-0.5 text-xs bg-error rounded-full">
                          {item.badge > 99 ? '99+' : item.badge}
                        </span>
                      )}
                    </div>
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-text-primary rotate-45"></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-2 border-t border-border">
          {!isCollapsed && user && (
            <div className="px-3 py-2 mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {user.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    {user.email || 'admin@floxie.com'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            iconName="LogOut"
            iconPosition={isCollapsed ? undefined : "left"}
            onClick={handleLogout}
            className={`w-full ${isCollapsed ? 'px-2' : ''} text-text-secondary hover:text-error hover:bg-error-50`}
          >
            {!isCollapsed && 'Sign Out'}
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation (for very small screens) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-40 sm:hidden">
        <div className="flex items-center justify-around py-2">
          {navigationItems.slice(0, 5).map((item) => {
            const isActive = isActiveRoute(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-150 relative
                  ${isActive 
                    ? 'text-primary' :'text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                <Icon name={item.icon} size={20} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default AdminSidebar;