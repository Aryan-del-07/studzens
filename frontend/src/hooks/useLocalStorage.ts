/**
 * ============================================================================
 * useLocalStorage.ts
 * ============================================================================
 * WHAT THIS FILE DOES:
 * This is a custom React Hook that syncs a piece of React state with the
 * browser's localStorage. Whenever the state changes, it automatically saves
 * to localStorage. When the component first mounts, it reads from localStorage
 * to restore the previous value (survives page refreshes!).
 *
 * KEY CONCEPTS FOR BEGINNERS:
 * - A"custom hook"is just a function that starts with"use"and can call
 * other React hooks (like useState, useEffect) inside it.
 * - localStorage is a simple key-value database built into every browser.
 * Data stays even if the user closes the tab.
 * - JSON.stringify converts JavaScript objects into strings for storage.
 * - JSON.parse converts those strings back into objects when reading.
 * - We use a"lazy initializer"for useState (the function form) so we only
 * read from localStorage once — on the very first render.
 * - The `storage` event lets us sync state across multiple browser tabs
 * (e.g., if the user changes something in Tab 1, Tab 2 updates automatically).
 *
 * USAGE EXAMPLE:
 * const [name, setName] = useLocalStorage<string>('my-app-name', 'Guest');
 * // name starts as 'Guest', but if localStorage has a saved name, that is used.
 * ============================================================================
 */

import { useState, useEffect } from 'react';

/**
 * useLocalStorage is a reusable hook for persisting React state to localStorage.
 *
 * @param key - The localStorage key (should be unique across your app)
 * @param initialValue - The value to use if localStorage has no saved data
 * @returns A tuple [storedValue, setValue] just like useState
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
 // ------------------------------------------------------------------------------
 // STEP 1: Initialize state from localStorage (or fall back to initialValue)
 // ------------------------------------------------------------------------------
 // We pass a FUNCTION to useState instead of a raw value.
 // This function only runs during the first render, making it more efficient
 // than reading localStorage on every render.
 const [storedValue, setStoredValue] = useState<T>(() => {
 // Guard: if we're running on the server (SSR), skip localStorage access
 if (typeof window === 'undefined') {
 return initialValue;
 }
 try {
 // Try to read the saved value from localStorage
 const item = window.localStorage.getItem(key);
 // If item exists, parse it from JSON back to an object.
 // If it doesn't exist, use the initialValue.
 return item ? JSON.parse(item) : initialValue;
 } catch (error) {
 // If parsing fails (corrupted data), warn in the console and return default
 console.warn(`Error reading localStorage key"${key}":`, error);
 return initialValue;
 }
 });

 // ------------------------------------------------------------------------------
 // STEP 2: Create a setter that writes to both React state AND localStorage
 // ------------------------------------------------------------------------------
 /**
 * setValue is a wrapped version of the regular state setter.
 * It accepts either a raw value OR a function (just like useState).
 * After updating React state, it serializes the value to JSON and
 * writes it into localStorage.
 */
 const setValue = (value: T | ((val: T) => T)) => {
 try {
 // Allow value to be a function so we have the same API as useState
 // Example: setValue(prev => prev + 1)
 const valueToStore = value instanceof Function ? value(storedValue) : value;

 // Save to React state (triggers a re-render)
 setStoredValue(valueToStore);

 // Save to localStorage so it persists across page refreshes
 if (typeof window !== 'undefined') {
 window.localStorage.setItem(key, JSON.stringify(valueToStore));
 }
 } catch (error) {
 // If writing fails (e.g., localStorage is full), warn but don't crash
 console.warn(`Error setting localStorage key"${key}":`, error);
 }
 };

 // ------------------------------------------------------------------------------
 // STEP 3: Listen for changes from OTHER tabs/windows
 // ------------------------------------------------------------------------------
 // If the user has the app open in two tabs and changes something in Tab 1,
 // this listener ensures Tab 2 also updates automatically.
 useEffect(() => {
 const handleStorageChange = (event: StorageEvent) => {
 // Only react if the changed key matches our key and has a new value
 if (event.key === key && event.newValue) {
 try {
 // Parse the new value and update our React state
 setStoredValue(JSON.parse(event.newValue));
 } catch (error) {
 console.warn(`Error parsing storage event for key"${key}":`, error);
 }
 }
 };

 // Subscribe to browser storage events
 window.addEventListener('storage', handleStorageChange);

 // Cleanup: unsubscribe when the component unmounts
 return () => window.removeEventListener('storage', handleStorageChange);
 }, [key]);

 // Return the same shape as useState: [value, setter]
 // The `as const` tells TypeScript this is a fixed-order tuple, not a generic array.
 return [storedValue, setValue] as const;
}
