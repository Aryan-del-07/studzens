/**
 * ============================================================================
 * AuthContext.tsx
 * ============================================================================
 * WHAT THIS FILE DOES:
 * This file creates the Authentication Context and Provider for the entire app.
 * Think of it as the"security guard"of the app — it tracks who is logged in,
 * whether they have finished onboarding, and provides functions to log in, log out,
 * and complete onboarding.
 *
 * KEY CONCEPTS FOR BEGINNERS:
 * - React Context lets you share data (like user info) across many components
 * without manually passing props through every level.
 * - A"Provider"wraps your app and makes the context data available to all
 * children components.
 * - The custom hook `useAuth()` lets any component easily read or update auth state.
 * - We use `useLocalStorage` so the user stays logged in even after refreshing
 * the browser (data is saved in the browser's localStorage).
 *
 * CONNECTS TO:
 * - ProtectedRoute.tsx (blocks unauthenticated users from private pages)
 * - LoginPage.tsx (calls login() after successful sign-in)
 * - OnboardingPage.tsx (calls completeOnboarding() when setup is done)
 * ============================================================================
 */

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// ------------------------------------------------------------------------------
// TYPE DEFINITIONS
// ------------------------------------------------------------------------------

/**
 * AuthUser represents a logged-in user.
 * The `role` field lets us differentiate between students and admins in the future.
 */
interface AuthUser {
 id: string; // Unique identifier generated at login
 name: string; // Display name of the user
 email: string; // Used as the unique key for per-user settings
 avatar?: string; // Optional profile picture URL
 role: 'student' | 'admin';
}

/**
 * AuthContextType defines the"shape"of the data that any component can access.
 * It includes the user object, boolean flags, and functions to change auth state.
 */
interface AuthContextType {
 user: AuthUser | null; // null = not logged in
 isAuthenticated: boolean; // true when user is not null
 hasCompletedOnboarding: boolean; // true when the user finished the welcome setup
 login: (userData: Omit<AuthUser, 'id'>) => void; // Function to log in (id is auto-generated)
 logout: () => void; // Function to log out
 completeOnboarding: () => void; // Function to mark onboarding as done
}

// ------------------------------------------------------------------------------
// CONTEXT CREATION
// ------------------------------------------------------------------------------

// Create the context with an undefined default so we can detect if a component
// tries to use it outside the Provider (which would be a bug).
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ------------------------------------------------------------------------------
// AuthProvider COMPONENT
// ------------------------------------------------------------------------------

/**
 * AuthProvider wraps the app (or a large section of it) and manages all
 * authentication state. It persists the logged-in user and onboarding status
 * to localStorage so the state survives page refreshes.
 *
 * @param children - All React components inside this Provider can access auth data.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
 // Use our custom useLocalStorage hook to keep the user object saved in the browser.
 // If the user refreshes the page, they will still be logged in.
 const [user, setUser] = useLocalStorage<AuthUser | null>('stuzen_auth_user', null);

 // Per-user onboarding map keyed by email so multiple users can share the same browser
 // without mixing up their onboarding progress. Stored in localStorage.
 const [onboardingMap, setOnboardingMap] = useLocalStorage<Record<string, boolean>>(
 'stuzen_onboarding_v2',
 {}
 );

 // ------------------------------------------------------------------------------
 // ONE-TIME MIGRATION: Old global flag → new per-user map
 // ------------------------------------------------------------------------------
 // Earlier versions of the app stored a single global onboarding flag.
 // This useEffect runs once per login to copy that old flag into the new
 // per-user map so existing users don't have to redo onboarding.
 // ------------------------------------------------------------------------------
 const migratedRef = useRef(false);
 useEffect(() => {
 // Only run if we haven't migrated yet AND there is a logged-in user with an email
 if (!migratedRef.current && user?.email) {
 try {
 // Look for the old flag in localStorage (not managed by our hook)
 const oldFlag = window.localStorage.getItem('stuzen_onboarding_done');
 if (oldFlag) {
 const parsed = JSON.parse(oldFlag);
 if (parsed === true) {
 // Copy the old flag into the new per-user map
 setOnboardingMap(prev => ({ ...prev, [user.email]: true }));
 }
 }
 } catch {
 // If JSON.parse fails, silently ignore — don't crash the app
 }
 // Mark migration as complete so this effect doesn't run again
 migratedRef.current = true;
 }
 }, [user, setOnboardingMap]);

 // Derive whether the current user has completed onboarding from the per-user map.
 // If the user is null (not logged in), default to false.
 const hasCompletedOnboarding = user ? (onboardingMap[user.email] ?? false) : false;

 // ------------------------------------------------------------------------------
 // AUTH ACTIONS
 // ------------------------------------------------------------------------------

 /**
 * login: Called from the Login page after a user enters their credentials.
 * Generates a random ID and saves the user to localStorage via our hook.
 */
 const login = (userData: Omit<AuthUser, 'id'>) => {
 setUser({
 ...userData,
 // Generate a short random ID using base-36 math (letters + numbers)
 id: Math.random().toString(36).substring(2, 9),
 });
 // Reset migration gate so the new user can also be checked for old flags
 migratedRef.current = false;
 };

 /**
 * logout: Clears the user from state and localStorage.
 * The app will immediately redirect to the login page via ProtectedRoute.
 */
 const logout = () => {
 setUser(null);
 };

 /**
 * completeOnboarding: Marks the current user as having finished onboarding.
 * This unlocks the full dashboard experience.
 */
 const completeOnboarding = () => {
 if (user) {
 setOnboardingMap(prev => ({ ...prev, [user.email]: true }));
 }
 };

 // ------------------------------------------------------------------------------
 // RENDER: Provide the auth data to all child components
 // ------------------------------------------------------------------------------
 return (
 <AuthContext.Provider value={{
 user,
 isAuthenticated: !!user, // Converts truthy/falsy to true/false
 hasCompletedOnboarding,
 login,
 logout,
 completeOnboarding,
 }}>
 {children}
 </AuthContext.Provider>
 );
}

// ------------------------------------------------------------------------------
// CUSTOM HOOK: useAuth
// ------------------------------------------------------------------------------

/**
 * useAuth is a convenience hook so components don't have to write useContext(AuthContext)
 * every time. It also throws a helpful error if someone accidentally uses it outside
 * the AuthProvider (a common beginner mistake).
 *
 * Usage in any component:
 * const { user, isAuthenticated, login, logout } = useAuth();
 */
export function useAuth() {
 const context = useContext(AuthContext);
 if (context === undefined) {
 throw new Error('useAuth must be used within an AuthProvider');
 }
 return context;
}
