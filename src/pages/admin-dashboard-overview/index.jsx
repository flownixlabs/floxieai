@@ .. @@
 import Icon from '../../components/AppIcon';
 import Button from '../../components/ui/Button';
 import Input from '../../components/ui/Input';
-import MetricCard from './components/MetricCard';
+import OptimizedMetricCard from './components/OptimizedMetricCard';
 import ActivityTable from './components/ActivityTable';
 import QuickActions from './components/QuickActions';
 import SystemAlerts from './components/SystemAlerts';
+import { useDebounce } from '../../hooks/useDebounce';
 
 const AdminDashboardOverview = () => {
   const { user, logout } = useAuth();
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState('');
 }
+  const debouncedSearchTerm = useDebounce(searchTerm, 300);
   const [notifications, setNotifications] = useState(3);
 
   // Mock data for dashboard metrics
@@ .. @@
           {/* Metrics Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
-            <MetricCard
+            <OptimizedMetricCard
               title="Total Users"
               value={dashboardMetrics.totalUsers}
               trend="up"
@@ .. @@
               isLoading={isLoading}
             />
             
-            <MetricCard
+            <OptimizedMetricCard
               title="Active This Week"
               value={dashboardMetrics.activeUsersThisWeek}
               trend="up"
@@ .. @@
               isLoading={isLoading}
             />
             
-            <MetricCard
+            <OptimizedMetricCard
               title="Total Reminders"
               value={dashboardMetrics.totalReminders}
               trend="up"
@@ .. @@
               isLoading={isLoading}
             />
             
-            <MetricCard
+            <OptimizedMetricCard
               title="Failed Logs"
               value={dashboardMetrics.failedReminderLogs}
               trend="down"
@@ .. @@
               isLoading={isLoading}
             />
             
-            <MetricCard
+            <OptimizedMetricCard
               title="Calendar Syncs"
               value={dashboardMetrics.calendarSyncs}
               trend="up"