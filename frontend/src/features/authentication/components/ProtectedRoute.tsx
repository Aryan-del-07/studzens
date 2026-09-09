import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

interface ProtectedRouteProps {
  /** If provided, only users with one of these roles can access the route. */
  allowedRoles?: string[];
}

/**
 * Redirects unauthenticated users to /login.
 * If `allowedRoles` is set, users whose role is not in the list are redirected
 * to /dashboard instead of seeing a 403.
 */
export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Logged in but wrong role — send them to their own dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
