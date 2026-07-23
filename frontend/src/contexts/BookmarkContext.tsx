/**
 * ============================================================================
 * BookmarkContext.tsx
 * ============================================================================
 * WHAT THIS FILE DOES:
 * This file creates the Bookmarks Context and Provider.
 * It manages the list of colleges a student has"saved"or"bookmarked"for
 * later comparison. Each saved college can be categorized by fit level:
 * Dream, Target, Safe, or Uncategorized.
 *
 * KEY CONCEPTS FOR BEGINNERS:
 * - React Context lets any component (like a college card or the dashboard)
 * save or unsave a college without prop drilling.
 * - `FitType` is a custom type that restricts values to specific strings — this
 * is called a"union type"and helps prevent typos.
 * - `SavedCollege` stores not just the college ID, but also the student's notes
 * and when they saved it, making this data useful for future comparison.
 * - Everything is synced to localStorage via `useLocalStorage`.
 *
 * CONNECTS TO:
 * - SearchPage.tsx (save button on college cards)
 * - CollegeProfilePage.tsx (save/unsave toggle on detail view)
 * - DashboardPage.tsx (shows saved colleges in the"Shortlist"section)
 * ============================================================================
 */

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// ------------------------------------------------------------------------------
// TYPE DEFINITIONS
// ------------------------------------------------------------------------------

/**
 * FitType represents how confident a student feels about getting into a college.
 * - Dream: Reach schools (hard to get into, but aspirational)
 * - Target: Realistic schools (student has a good chance)
 * - Safe: Fallback schools (student is very likely to get in)
 * - Uncategorized: Default when first saved, before the student categorizes it
 */
export type FitType = 'Dream' | 'Target' | 'Safe' | 'Uncategorized';

/**
 * SavedCollege represents a single bookmarked college with metadata.
 */
export interface SavedCollege {
 collegeId: string; // Links to the College.id in our data
 fit: FitType; // The student's confidence category
 notes?: string; // Optional personal notes (e.g.,"Visited campus, liked labs")
 savedAt: string; // ISO date string — when the student saved it
}

/**
 * BookmarkContextType defines everything a component can do with bookmarks.
 */
interface BookmarkContextType {
 savedColleges: SavedCollege[]; // The full list of bookmarks
 saveCollege: (collegeId: string, fit?: FitType) => void; // Add a bookmark
 removeCollege: (collegeId: string) => void; // Remove a bookmark
 updateFit: (collegeId: string, fit: FitType) => void; // Change the fit category
 updateNotes: (collegeId: string, notes: string) => void; // Edit personal notes
 isSaved: (collegeId: string) => boolean; // Quick check: is this college saved?
}

// ------------------------------------------------------------------------------
// CONTEXT CREATION
// ------------------------------------------------------------------------------

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

// ------------------------------------------------------------------------------
// BookmarkProvider COMPONENT
// ------------------------------------------------------------------------------

/**
 * BookmarkProvider wraps the app and manages the saved-colleges list.
 * It persists bookmarks to localStorage so the student's shortlist survives
 * page refreshes and browser restarts.
 *
 * @param children - React components that can save or view bookmarked colleges.
 */
export function BookmarkProvider({ children }: { children: ReactNode }) {
 // Load bookmarks from localStorage, or start with an empty array
 const [savedColleges, setSavedColleges] = useLocalStorage<SavedCollege[]>('stuzen_saved_colleges', []);

 /**
 * saveCollege: Adds a new college to the bookmark list.
 * If the college is already saved, it does nothing (guard check via .some()).
 * The timestamp is recorded in ISO format for consistent sorting later.
 */
 const saveCollege = (collegeId: string, fit: FitType = 'Uncategorized') => {
 setSavedColleges(prev => {
 // Check if already saved to avoid duplicates
 if (prev.some(c => c.collegeId === collegeId)) return prev;
 // Return a new array with the new college appended
 return [...prev, { collegeId, fit, savedAt: new Date().toISOString() }];
 });
 };

 /**
 * removeCollege: Removes a college from the bookmark list by its ID.
 * Uses .filter() to create a new array without the matching college.
 */
 const removeCollege = (collegeId: string) => {
 setSavedColleges(prev => prev.filter(c => c.collegeId !== collegeId));
 };

 /**
 * updateFit: Changes the fit category (Dream/Target/Safe/Uncategorized)
 * for an already-saved college. Uses .map() to create a new array with the
 * updated item, leaving all other items unchanged.
 */
 const updateFit = (collegeId: string, fit: FitType) => {
 setSavedColleges(prev => prev.map(c =>
 c.collegeId === collegeId ? { ...c, fit } : c
 ));
 };

 /**
 * updateNotes: Updates the personal notes for a saved college.
 * Useful for students to jot down impressions during campus visits or research.
 */
 const updateNotes = (collegeId: string, notes: string) => {
 setSavedColleges(prev => prev.map(c =>
 c.collegeId === collegeId ? { ...c, notes } : c
 ));
 };

 /**
 * isSaved: A helper function that returns true if a given college ID
 * is already in the bookmark list. Useful for toggling heart/star icons.
 */
 const isSaved = (collegeId: string) => {
 return savedColleges.some(c => c.collegeId === collegeId);
 };

 // Provide all bookmark data and functions to child components
 return (
 <BookmarkContext.Provider value={{
 savedColleges,
 saveCollege,
 removeCollege,
 updateFit,
 updateNotes,
 isSaved
 }}>
 {children}
 </BookmarkContext.Provider>
 );
}

// ------------------------------------------------------------------------------
// CUSTOM HOOK: useBookmarks
// ------------------------------------------------------------------------------

/**
 * useBookmarks is a convenience hook for accessing the bookmark system.
 * It throws a clear error if used outside the BookmarkProvider.
 *
 * Usage in any component:
 * const { savedColleges, saveCollege, isSaved } = useBookmarks();
 */
export function useBookmarks() {
 const context = useContext(BookmarkContext);
 if (context === undefined) {
 throw new Error('useBookmarks must be used within a BookmarkProvider');
 }
 return context;
}
