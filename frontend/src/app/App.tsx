import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import ProtectedRoute from '../features/authentication/components/ProtectedRoute';
import React, { Suspense } from 'react';

const LandingPage = React.lazy(() => import('../pages/LandingPage'));
const SearchPage = React.lazy(() => import('../pages/SearchPage'));
const ExamHubPage = React.lazy(() => import('../pages/ExamHubPage'));
const ExamDetailsPage = React.lazy(() => import('../pages/ExamDetailsPage'));
const CareerExplorerPage = React.lazy(() => import('../pages/CareerExplorerPage'));
const DashboardPage = React.lazy(() => import('../pages/DashboardPage'));
const CollegeProfilePage = React.lazy(() => import('../pages/CollegeProfilePage'));
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const OnboardingPage = React.lazy(() => import('../pages/OnboardingPage'));
const ProfilePage = React.lazy(() => import('../pages/ProfilePage'));
const ComparePage = React.lazy(() => import('../pages/ComparePage'));
const MapPage = React.lazy(() => import('../pages/MapPage'));

const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

const CollegeProfileRoute = () => {
 const { id } = useParams<{ id: string }>();
 return <CollegeProfilePage key={id} />;
};

import { ErrorBoundary } from '../components/common/ErrorBoundary';

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F6F7FB]">
    <div className="flex flex-col items-center gap-3 text-[#697386]">
      <div className="w-8 h-8 border-4 border-[#E3E8EF] border-t-[#635BFF] rounded-full animate-spin"></div>
      <div className="text-sm font-semibold animate-pulse">Loading...</div>
    </div>
  </div>
);

export default function App() {
 return (
 <Router>
 <ErrorBoundary>
 <Suspense fallback={<PageLoader />}>
 <Routes>
 <Route element={<PageShell />}>
 {/* Public Routes */}
 <Route path="/"element={<LandingPage />} />
 <Route path="/search"element={<SearchPage />} />
 <Route path="/college/:id"element={<CollegeProfileRoute />} />
 <Route path="/exams"element={<ExamHubPage />} />
 <Route path="/exams/:id"element={<ExamDetailsPage />} />
 <Route path="/careers"element={<CareerExplorerPage />} />
 <Route path="/login"element={<LoginPage />} />

 {/* Protected Routes */}
 <Route element={<ProtectedRoute />}>
 <Route path="/onboarding"element={<OnboardingPage />} />
 <Route path="/dashboard"element={<DashboardPage />} />
 <Route path="/profile"element={<ProfilePage />} />
 <Route path="/compare"element={<ComparePage />} />
 <Route path="/map"element={<MapPage />} />

 </Route>

 {/* Wildcard 404 Route */}
 <Route path="*"element={<NotFoundPage />} />
 </Route>
 </Routes>
 </Suspense>
 </ErrorBoundary>
 </Router>
 );
}
