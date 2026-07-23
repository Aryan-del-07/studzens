/**
 * ============================================================================
 * useSearch.ts
 * ============================================================================
 * WHAT THIS FILE DOES:
 * This is a custom React Hook that adds a search/filter feature to any list of data.
 * It provides:
 * - A live query string that updates as the user types
 * -"Debounced"filtering (waits for the user to stop typing before filtering)
 * - Case-insensitive search across multiple object properties
 * - A loading flag while the debounce timer is running
 *
 * KEY CONCEPTS FOR BEGINNERS:
 * -"Debouncing"means delaying an action until the user stops typing for a set
 * amount of time. This prevents the app from filtering on every single keystroke,
 * which would make it feel slow.
 * - `useMemo` remembers the filtered results and only recalculates when the
 * query, data, or search keys change. This is an optimization to avoid redoing
 * the filter on every render.
 * - `useEffect` with `setTimeout` / `clearTimeout` is the classic pattern for
 * implementing debounce in React.
 * - The hook is generic (`<T>`) so it works with ANY array of objects —
 * colleges, exams, careers, or any future data type.
 *
 * USAGE EXAMPLE:
 * const { query, setQuery, results, isSearching } = useSearch({
 * data: colleges,
 * searchKeys: ['name', 'city', 'state'],
 * debounceMs: 300
 * });
 * // `results` contains only colleges whose name/city/state matches the query
 * ============================================================================
 */

import { useState, useEffect, useMemo } from 'react';

// ------------------------------------------------------------------------------
// TYPE DEFINITIONS
// ------------------------------------------------------------------------------

/**
 * SearchOptions configures how the search should behave.
 * @param data - The array of objects to search through
 * @param searchKeys - Which object properties to search (e.g., ['name', 'city'])
 * @param debounceMs - How long to wait after typing stops before filtering (default 300ms)
 */
interface SearchOptions<T> {
 data: T[];
 searchKeys: (keyof T)[];
 debounceMs?: number;
}

// ------------------------------------------------------------------------------
// useSearch HOOK
// ------------------------------------------------------------------------------

/**
 * useSearch is a reusable hook for adding fast, debounced search to any data list.
 *
 * @param options - Configuration object with data, searchKeys, and optional debounceMs
 * @returns An object with query, setter, filtered results, and a loading flag
 */
export function useSearch<T>({ data, searchKeys, debounceMs = 300 }: SearchOptions<T>) {
 // `query` is the live text from the input field (updates immediately on every keystroke)
 const [query, setQuery] = useState('');

 // `debouncedQuery` is the"stable"version that only updates after the user pauses typing
 const [debouncedQuery, setDebouncedQuery] = useState('');

 // ------------------------------------------------------------------------------
 // DEBOUNCE LOGIC
 // ------------------------------------------------------------------------------
 // When the user types, we start a timer. If they type again before the timer
 // finishes, we cancel the old timer and start a new one. Only when the timer
 // actually completes do we update `debouncedQuery`.
 useEffect(() => {
 const timer = setTimeout(() => {
 setDebouncedQuery(query);
 }, debounceMs);

 // Cleanup function: if the effect re-runs (user typed again), cancel the old timer
 return () => clearTimeout(timer);
 }, [query, debounceMs]);

 // ------------------------------------------------------------------------------
 // FILTERING LOGIC
 // ------------------------------------------------------------------------------
 // useMemo ensures we only recalculate the filtered results when necessary:
 // when `data`, `debouncedQuery`, or `searchKeys` change.
 const results = useMemo(() => {
 // If the user hasn't typed anything, return the full dataset
 if (!debouncedQuery.trim()) {
 return data;
 }

 // Convert the query to lowercase for case-insensitive matching
 const lowerQuery = debouncedQuery.toLowerCase();

 // Filter the data array: keep items where ANY of the searchKeys matches
 return data.filter((item) => {
 return searchKeys.some((key) => {
 const value = item[key];

 // If the value is a string, check if it includes the query
 if (typeof value === 'string') {
 return value.toLowerCase().includes(lowerQuery);
 }

 // If the value is an array, check if ANY array element matches
 if (Array.isArray(value)) {
 return value.some((v) =>
 typeof v === 'string' && v.toLowerCase().includes(lowerQuery)
 );
 }

 // For other types (numbers, booleans, etc.), skip this key
 return false;
 });
 });
 }, [data, debouncedQuery, searchKeys]);

 // ------------------------------------------------------------------------------
 // RETURN VALUE
 // ------------------------------------------------------------------------------
 // `isSearching` is true when the user is actively typing but the debounce timer
 // hasn't finished yet. This is useful for showing a tiny spinner or dimming results.
 return {
 query,
 setQuery,
 results,
 isSearching: query !== debouncedQuery
 };
}
