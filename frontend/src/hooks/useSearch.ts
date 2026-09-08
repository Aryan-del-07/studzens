import { useState, useEffect, useMemo } from 'react';

interface SearchOptions<T> {
  data: T[];
  searchKeys: (keyof T)[];
  debounceMs?: number;
}

/**
 * Debounced, case-insensitive search across multiple object properties.
 */
export function useSearch<T>({ data, searchKeys, debounceMs = 300 }: SearchOptions<T>) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), debounceMs);
    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return data;
    const lowerQuery = debouncedQuery.toLowerCase();

    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        if (typeof value === 'string') return value.toLowerCase().includes(lowerQuery);
        if (Array.isArray(value)) return value.some((v) => typeof v === 'string' && v.toLowerCase().includes(lowerQuery));
        return false;
      })
    );
  }, [data, debouncedQuery, searchKeys]);

  return { query, setQuery, results, isSearching: query !== debouncedQuery };
}
