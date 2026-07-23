/**
 * ============================================================================
 * NotificationContext.tsx
 * ============================================================================
 * WHAT THIS FILE DOES:
 * This file creates the Notification Context and Provider.
 * It manages a list of in-app notifications (like toast messages or alerts)
 * that inform the user about important events: exam deadlines, saved colleges,
 * errors, or successes.
 *
 * KEY CONCEPTS FOR BEGINNERS:
 * - React Context lets any component push a notification without prop drilling.
 * - `useCallback` is a React hook that memoizes functions so they don't get
 * recreated on every render. This is important here because these functions
 * are passed as context values and would otherwise trigger unnecessary re-renders.
 * - Each notification gets a random ID so we can target it individually for
 *"mark as read"or"dismiss"actions.
 * - `unreadCount` is a derived value — it recalculates automatically whenever
 * the notifications array changes.
 *
 * CONNECTS TO:
 * - Any component that needs to show a toast (e.g.,"College saved!"or"Exam registration opens today")
 * - The notification bell / dropdown in the header
 * ============================================================================
 */

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

// ------------------------------------------------------------------------------
// TYPE DEFINITIONS
// ------------------------------------------------------------------------------

/**
 * NotificationType controls the visual style of the notification.
 * - info: Neutral blue style (general updates)
 * - success: Green style (positive feedback like"Saved successfully")
 * - warning: Yellow/amber style (cautionary updates like"Deadline approaching")
 * - error: Red style (something went wrong)
 */
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

/**
 * Notification represents a single message in the notification center.
 */
export interface Notification {
 id: string; // Unique random ID for targeting this notification
 title: string; // Short headline (e.g.,"JEE Main Registration")
 message: string; // Longer description
 type: NotificationType;
 read: boolean; // Has the user seen this yet?
 createdAt: string; // ISO timestamp for sorting (newest first)
}

/**
 * NotificationContextType defines everything a component can do with notifications.
 */
interface NotificationContextType {
 notifications: Notification[]; // All notifications, newest first
 unreadCount: number; // How many haven't been read yet
 addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
 markAsRead: (id: string) => void; // Mark one notification as read
 markAllAsRead: () => void; // Mark all as read (e.g., clicking"Dismiss all")
 removeNotification: (id: string) => void; // Permanently delete a notification
 clearAll: () => void; // Delete every notification
}

// ------------------------------------------------------------------------------
// CONTEXT CREATION
// ------------------------------------------------------------------------------

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// ------------------------------------------------------------------------------
// NotificationProvider COMPONENT
// ------------------------------------------------------------------------------

/**
 * NotificationProvider manages the in-app notification center.
 * Unlike auth and profile, notifications are NOT persisted to localStorage
 * because they are ephemeral — they represent current events, not long-term data.
 *
 * @param children - React components that can read or push notifications.
 */
export function NotificationProvider({ children }: { children: ReactNode }) {
 // Start with an empty inbox; notifications are added dynamically by the app
 const [notifications, setNotifications] = useState<Notification[]>([]);

 // unreadCount is"derived state"— it automatically updates when notifications change
 const unreadCount = notifications.filter(n => !n.read).length;

 /**
 * addNotification: Creates a new notification and places it at the top of the list.
 * The caller only needs to provide title, message, and type — we auto-generate
 * the ID, set read to false, and add a timestamp.
 *
 * useCallback ensures this function doesn't change identity on every render,
 * which prevents unnecessary re-renders in consumers.
 */
 const addNotification = useCallback((notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
 const newNotification: Notification = {
 ...notification,
 // Generate a short random ID (base-36 string) for this notification
 id: Math.random().toString(36).substring(2, 9),
 read: false,
 createdAt: new Date().toISOString(),
 };

 // Place the newest notification at the beginning of the array
 setNotifications(prev => [newNotification, ...prev]);
 }, []);

 /**
 * markAsRead: Sets the `read` flag to true for one specific notification.
 * Uses .map() to create a new array with the updated item.
 */
 const markAsRead = useCallback((id: string) => {
 setNotifications(prev => prev.map(n =>
 n.id === id ? { ...n, read: true } : n
 ));
 }, []);

 /**
 * markAllAsRead: Bulk-sets every notification to read.
 * Useful for a"Dismiss all"or"Mark all as read"button in the UI.
 */
 const markAllAsRead = useCallback(() => {
 setNotifications(prev => prev.map(n => ({ ...n, read: true })));
 }, []);

 /**
 * removeNotification: Permanently deletes a single notification by ID.
 * Uses .filter() to create a new array without the matching item.
 */
 const removeNotification = useCallback((id: string) => {
 setNotifications(prev => prev.filter(n => n.id !== id));
 }, []);

 /**
 * clearAll: Empties the entire notification inbox.
 */
 const clearAll = useCallback(() => {
 setNotifications([]);
 }, []);

 // Provide all notification data and functions to child components
 return (
 <NotificationContext.Provider value={{
 notifications,
 unreadCount,
 addNotification,
 markAsRead,
 markAllAsRead,
 removeNotification,
 clearAll
 }}>
 {children}
 </NotificationContext.Provider>
 );
}

// ------------------------------------------------------------------------------
// CUSTOM HOOK: useNotifications
// ------------------------------------------------------------------------------

/**
 * useNotifications is a convenience hook for pushing or reading notifications.
 * It throws a clear error if used outside the NotificationProvider.
 *
 * Usage in any component:
 * const { addNotification, unreadCount } = useNotifications();
 * addNotification({ title: 'Success!', message: 'College saved.', type: 'success' });
 */
export function useNotifications() {
 const context = useContext(NotificationContext);
 if (context === undefined) {
 throw new Error('useNotifications must be used within a NotificationProvider');
 }
 return context;
}
