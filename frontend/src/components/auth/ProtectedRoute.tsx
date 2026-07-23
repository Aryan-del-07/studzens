/**
 * ============================================================================
 * ProtectedRoute.tsx
 * ============================================================================
 * WHAT THIS FILE DOES:
 * This component acts as a security gatekeeper for private pages in the Stuzen app.
 * It wraps sensitive routes like /dashboard, /profile, and /onboarding.
 * If the user is logged in, it renders the child pages (via <Outlet />).
 * If the user is NOT logged in, it redirects them to /login.
 *
 * KEY CONCEPTS FOR BEGINNERS:
 * - React Router's `<Outlet />` renders the nested child routes.
 * Think of it as"insert the requested page here."
 * - `<Navigate>` is a React Router component that performs a redirect.
 * It replaces the current URL in the browser history so the user can't
 * go back to the private page with the back button.
 * - `state={{ from: location }}` is a neat trick: it remembers WHERE the user
 * was trying to go. After they log in, the Login page can send them back
 * to that original destination instead of always dumping them on /dashboard.
 * - `useLocation` gives us the current URL so we can save it for later.
 *
 * CONNECTS TO:
 * - App.tsx (used as a route wrapper around private routes)
 * - AuthContext.tsx (reads isAuthenticated to make the decision)
 * - LoginPage.tsx (can read `state.from` to redirect back after login)
 * ============================================================================
 */

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ProtectedRoute is a route wrapper that guards private pages.
 *
 * How it works:
 * 1. It reads `isAuthenticated` from the AuthContext.
 * 2. If NOT authenticated → redirect to /login and save the current URL.
 * 3. If authenticated → render the child route normally via <Outlet />.
 *
 * Usage in App.tsx:
 * <Route element={<ProtectedRoute />}>
 * <Route path="/dashboard"element={<DashboardPage />} />
 * <Route path="/profile"element={<ProfilePage />} />
 * </Route>
 */
export default function ProtectedRoute() {
 // Check if the user is currently logged in
 const { isAuthenticated } = useAuth();

 // Capture the current URL so we can send the user back after login
 const location = useLocation();

 // If the user is not logged in, redirect them to the login page
 if (!isAuthenticated) {
 // `state={{ from: location }}` saves the original destination in the navigation state
 // `replace` means we overwrite the current history entry instead of adding a new one
 return <Navigate to="/login"state={{ from: location }} replace />;
 }

 // User is authenticated — render the requested page (the child route)
 return <Outlet />;
}
