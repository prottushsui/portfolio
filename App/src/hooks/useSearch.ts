import { useState, useMemo, useCallback } from 'react';
import type { SearchResult } from '@/types';

interface UseSearchOptions {
  items: SearchResult[];
  debounceMs?: number;
}

export function useSearch({ items }: UseSearchOptions) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return items.filter(item =>
      item.title.toLowerCase().includes(lowerQuery)
    ).slice(0, 10);
  }, [query, items]);

  const openSearch = useCallback(() => {
    setIsOpen(true);
    setQuery('');
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  const toggleSearch = useCallback(() => {
    setIsOpen(prev => !prev);
    if (isOpen) setQuery('');
  }, [isOpen]);

  const executeSearch = useCallback((result: SearchResult) => {
    result.action();
    closeSearch();
  }, [closeSearch]);

  return {
    query,
    setQuery,
    results,
    isOpen,
    openSearch,
    closeSearch,
    toggleSearch,
    executeSearch,
  };
}
