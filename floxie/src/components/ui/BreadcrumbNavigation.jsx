import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/admin-dashboard-overview': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/users-management': { label: 'Users Management', icon: 'Users' },
    '/notes-management': { label: 'Notes Management', icon: 'FileText' },
    '/calendar-events-management': { label: 'Calendar Events', icon: 'Calendar' },
    '/admin-authentication': { label: 'Authentication', icon: 'Lock' },
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Dashboard', path: '/admin-dashboard-overview', icon: 'Home' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap[currentPath];
      
      if (routeInfo && currentPath !== '/admin-dashboard-overview') {
        breadcrumbs.push({
          label: routeInfo.label,
          path: currentPath,
          icon: routeInfo.icon,
          isLast: index === pathSegments.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path || index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-muted mx-2" 
              />
            )}
            
            <div className="flex items-center">
              {crumb.icon && (
                <Icon 
                  name={crumb.icon} 
                  size={16} 
                  className={`mr-2 ${
                    crumb.isLast 
                      ? 'text-text-primary' :'text-text-secondary'
                  }`}
                />
              )}
              
              {crumb.isLast || !crumb.path ? (
                <span className="font-medium text-text-primary">
                  {crumb.label}
                </span>
              ) : (
                <button
                  onClick={() => handleNavigation(crumb.path)}
                  className="font-medium text-text-secondary hover:text-primary transition-colors duration-150 focus-ring rounded px-1 py-0.5"
                >
                  {crumb.label}
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;