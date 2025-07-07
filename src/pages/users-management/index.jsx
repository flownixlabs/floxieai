@@ .. @@
 import Icon from '../../components/AppIcon';
 import Button from '../../components/ui/Button';
+import { useDebounce } from '../../hooks/useDebounce';
+import VirtualizedTable from '../../components/ui/VirtualizedTable';
 
 // Import all components
 import UserTableRow from './components/UserTableRow';
@@ .. @@
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedUsers, setSelectedUsers] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
+  const debouncedSearchTerm = useDebounce(searchTerm, 300);
   const [itemsPerPage, setItemsPerPage] = useState(25);
   const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
@@ .. @@
   // Filter and search logic
   const filteredUsers = useMemo(() => {
     let filtered = mockUsers;
 
     // Apply search filter
-    if (searchTerm) {
+    if (debouncedSearchTerm) {
       filtered = filtered.filter(user =>
-        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
-        user.whatsappNumber.includes(searchTerm) ||
-        user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
-        user.email.toLowerCase().includes(searchTerm.toLowerCase())
+        user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
+        user.whatsappNumber.includes(debouncedSearchTerm) ||
+        user.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
+        user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
       );
     }
@@ .. @@
     return filtered;
-  }, [searchTerm, filters]);
+  }, [debouncedSearchTerm, filters]);
 
   // Sorting logic
   const sortedUsers = useMemo(() => {
@@ .. @@
             <SearchBar
               searchTerm={searchTerm}
               onSearchChange={handleSearchChange}
               onClearSearch={handleClearSearch}
-              resultsCount={filteredUsers.length}
+              resultsCount={debouncedSearchTerm ? filteredUsers.length : undefined}
             />