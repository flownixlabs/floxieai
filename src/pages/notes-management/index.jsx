import NotesStats from './components/NotesStats';

import Button from '../../components/ui/Button';
import { useDebounce } from '../../hooks/useDebounce';

const NotesManagement = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [expandedNotes, setExpandedNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ field: 'createdAt', direction: 'desc' });
  const [filters, setFilters] = useState({
    let filtered = [...mockNotes];

    // Apply search filter
    if (debouncedSearchTerm || filters.search) {
      const searchValue = debouncedSearchTerm || filters.search;
      filtered = filtered.filter(note =>
        note.content.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Add search term to notes for highlighting
    filtered = filtered.map(note => ({
      ...note,
      searchTerm: debouncedSearchTerm || filters.search
    }));

    return filtered;
  }, [filters, sortConfig, debouncedSearchTerm]);
}