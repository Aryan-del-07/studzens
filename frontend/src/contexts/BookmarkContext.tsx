/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { api } from '../services/api';

export type FitType = 'Dream' | 'Target' | 'Safe' | 'Uncategorized';

export interface SavedCollege {
  collegeId: string;
  fit: FitType;
  notes?: string;
  savedAt: string;
}

interface BookmarkContextType {
  savedColleges: SavedCollege[];
  saveCollege: (collegeId: string, fit?: FitType) => void;
  removeCollege: (collegeId: string) => void;
  updateFit: (collegeId: string, fit: FitType) => void;
  updateNotes: (collegeId: string, notes: string) => void;
  isSaved: (collegeId: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [savedColleges, setSavedColleges] = useLocalStorage<SavedCollege[]>('stuzen_saved_colleges', []);

  const saveCollege = (collegeId: string, fit: FitType = 'Uncategorized') => {
    setSavedColleges(prev => {
      if (prev.some(c => c.collegeId === collegeId)) return prev;
      return [...prev, { collegeId, fit, savedAt: new Date().toISOString() }];
    });

    if (localStorage.getItem('access_token')) {
      const categoryMap: Record<string, string> = { Dream: 'Dream', Target: 'Target', Safe: 'Safety', Uncategorized: 'Target' };
      api.bookmarks.add(collegeId, categoryMap[fit] || 'Target').catch(() => {});
    }
  };

  const removeCollege = (collegeId: string) => {
    setSavedColleges(prev => prev.filter(c => c.collegeId !== collegeId));
  };

  const updateFit = (collegeId: string, fit: FitType) => {
    setSavedColleges(prev => prev.map(c =>
      c.collegeId === collegeId ? { ...c, fit } : c
    ));
  };

  const updateNotes = (collegeId: string, notes: string) => {
    setSavedColleges(prev => prev.map(c =>
      c.collegeId === collegeId ? { ...c, notes } : c
    ));
  };

  const isSaved = (collegeId: string) => savedColleges.some(c => c.collegeId === collegeId);

  return (
    <BookmarkContext.Provider value={{ savedColleges, saveCollege, removeCollege, updateFit, updateNotes, isSaved }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
