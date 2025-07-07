import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthenticationGuard');
  }
  return context;
};

const AuthenticationGuard = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contextReady, setContextReady] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = ['/public-landing-page', '/admin-authentication'];
  const protectedRoutes = [
    '/admin-dashboard-overview',
    '/users-management',
    '/notes-management',
    '/calendar-events-management'
  ];

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (contextReady) {
      handleRouteProtection();
    }
  }, [isAuthenticated, location.pathname, isLoading, contextReady]);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('floxie_admin_token');
      const userData = localStorage.getItem('floxie_admin_user');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        const tokenExpiry = localStorage.getItem('floxie_token_expiry');
        
        if (tokenExpiry && new Date().getTime() < parseInt(tokenExpiry)) {
          setUser(parsedUser);
          setIsAuthenticated(true);
        } else {
          clearAuthData();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearAuthData();
    } finally {
      setIsLoading(false);
      setContextReady(true);
    }
  };

  const handleRouteProtection = () => {
    if (isLoading) return;

    const currentPath = location.pathname;
    const isPublicRoute = publicRoutes.includes(currentPath);
    const isProtectedRoute = protectedRoutes.includes(currentPath);

    if (isProtectedRoute && !isAuthenticated) {
      navigate('/admin-authentication', { 
        state: { from: currentPath },
        replace: true 
      });
    } else if (currentPath === '/admin-authentication' && isAuthenticated) {
      const from = location.state?.from || '/admin-dashboard-overview';
      navigate(from, { replace: true });
    } else if (currentPath === '/' || currentPath === '') {
      navigate('/public-landing-page', { replace: true });
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      
      // Simulate API call - replace with actual authentication logic
      const mockUser = {
        id: 1,
        name: 'Admin User',
        email: credentials.email,
        role: 'admin',
        permissions: ['dashboard', 'users', 'messages', 'reminders', 'notes', 'calendar']
      };

      const mockToken = 'mock_jwt_token_' + Date.now();
      const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours

      localStorage.setItem('floxie_admin_token', mockToken);
      localStorage.setItem('floxie_admin_user', JSON.stringify(mockUser));
      localStorage.setItem('floxie_token_expiry', expiryTime.toString());

      setUser(mockUser);
      setIsAuthenticated(true);

      const from = location.state?.from || '/admin-dashboard-overview';
      navigate(from, { replace: true });

      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    navigate('/admin-authentication', { replace: true });
  };

  const clearAuthData = () => {
    localStorage.removeItem('floxie_admin_token');
    localStorage.removeItem('floxie_admin_user');
    localStorage.removeItem('floxie_token_expiry');
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const token = localStorage.getItem('floxie_admin_token');
      if (!token) {
        throw new Error('No token found');
      }

      // Simulate token refresh - replace with actual API call
      const newExpiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('floxie_token_expiry', newExpiryTime.toString());

      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return false;
    }
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  const updateUser = (updatedUserData) => {
    const newUser = { ...user, ...updatedUserData };
    setUser(newUser);
    localStorage.setItem('floxie_admin_user', JSON.stringify(newUser));
  };

  const authValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshToken,
    hasPermission,
    updateUser,
    clearAuthData
  };

  // Don't render children until context is ready
  if (!contextReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg animate-pulse">
              <Icon name="MessageCircle" size={28} color="white" strokeWidth={2.5} />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Sparkles" size={12} color="white" strokeWidth={3} />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-heading font-semibold text-text-primary mb-1">
              Floxie Admin
            </h2>
            <p className="text-sm text-text-secondary">Initializing...</p>
          </div>
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authValue}>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <Icon name="MessageCircle" size={28} color="white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center animate-pulse">
                <Icon name="Sparkles" size={12} color="white" strokeWidth={3} />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-heading font-semibold text-text-primary mb-1">
                Floxie Admin
              </h2>
              <p className="text-sm text-text-secondary">Loading...</p>
            </div>
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthenticationGuard;