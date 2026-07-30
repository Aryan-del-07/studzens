/**
 * ============================================================================
 * PageShell.tsx
 * ============================================================================
 * WHAT THIS FILE DOES:
 * This component is the master layout wrapper for the entire Stuzen app.
 * It provides:
 * - A sticky top header with navigation links (desktop + mobile)
 * - A mobile bottom tab bar for quick navigation
 * - The main content area where child routes render via <Outlet />
 *
 * KEY CONCEPTS FOR BEGINNERS:
 * - React Router's `<Outlet />` is a placeholder that renders the current route's
 * component. Think of it as a dynamic slot that changes based on the URL.
 * - `useLocation` from react-router-dom tells us which page the user is on,
 * so we can highlight the active navigation link.
 * - `useAuth` lets us conditionally hide the nav when the user is on login
 * or onboarding pages — giving those pages a clean, distraction-free look.
 * - The mobile menu uses simple React state (`useState`) to toggle open/close.
 * - We use small helper components (NavLink, MobileNavItem) at the bottom of
 * this file to keep the JSX clean and avoid repeating the same markup.
 *
 * CONNECTS TO:
 * - App.tsx (wrapped around all routes via the router)
 * - All page components (rendered inside <Outlet />)
 * ============================================================================
 */

import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Compass, GitCompareArrows, User, Menu, X, GraduationCap, LayoutDashboard, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

/**
 * PageShell is the main layout component for the Stuzen app.
 * It renders the navigation, the current page content, and the mobile bottom bar.
 */
export default function PageShell() {
 // Controls whether the mobile hamburger menu is open or closed
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 // Current URL location — used to highlight the active nav link
 const location = useLocation();

 // Check if the user is logged in; used to hide/show navigation
 const { isAuthenticated } = useAuth();

 // Hide the navigation on login and onboarding pages for a cleaner user experience
 const hideNav = ['/login', '/onboarding'].some(p => location.pathname.startsWith(p));
 const isLandingPage = location.pathname === '/';
 return (
 <div className="min-h-screen bg-white font-sans text-[#0A2540] pb-20 lg:pb-0 transition-colors duration-200">
 {/* ------------------------------------------------------------------------------
 STICKY HEADER (only shown when logged in and not on login/onboarding pages)
 ------------------------------------------------------------------------------ */}
 {(!hideNav && (isAuthenticated || isLandingPage)) && (
 <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E3E8EF] transition-colors duration-200">
 <div className="w-full max-w-[1400px] mx-auto px-6 h-16 relative flex items-center justify-between">
 
 {/* Left side: Desktop navigation */}
 <div className="flex-1 flex items-center justify-start">
 {isAuthenticated && !isLandingPage && (
 <nav className="hidden lg:flex items-center gap-1">
 <NavLink to="/dashboard" icon={<LayoutDashboard size={17} />} label="Dashboard" active={location.pathname === '/dashboard'} />
 <NavLink to="/for-you" icon={<Sparkles size={17} />} label="For You" active={location.pathname === '/for-you'} />
 <NavLink to="/search" icon={<Search size={17} />} label="Colleges" active={location.pathname === '/search'} />
 <NavLink to="/compare" icon={<GitCompareArrows size={17} />} label="Compare" active={location.pathname === '/compare'} />
 <NavLink to="/careers" icon={<Compass size={17} />} label="Careers" active={location.pathname === '/careers'} />
 <NavLink to="/exams" icon={<GraduationCap size={17} />} label="Exams" active={location.pathname.startsWith('/exams')} />
 </nav>
 )}
 </div>

 {/* Center: Logo */}
 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
 <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center group">
 <img src="/logo.png" alt="Studzens Logo" className="h-8 md:h-9 w-auto object-contain mix-blend-multiply" />
 </Link>
 </div>

 {/* Right side: Profile icon + Mobile hamburger button */}
 <div className="flex-1 flex items-center justify-end gap-3">
 {isAuthenticated && !isLandingPage && (
 <>
 {/* Profile icon — only visible on small screens and up */}
 <Link
 to="/profile"
 className="w-9 h-9 rounded-full bg-slate-50 border border-[#E3E8EF] flex items-center justify-center hover:bg-slate-100 dark:bg-slate-700 hover:border-slate-300 dark:border-slate-600 transition-colors hidden sm:flex"
 >
 <User size={17} className="text-[#425466]"/>
 </Link>

 {/* Hamburger button — only visible on mobile (lg:hidden) */}
 <button
 className="lg:hidden p-2 text-[#697386] hover:text-[#0A2540] dark:text-slate-100 transition-colors"
 onClick={() => setIsMenuOpen(!isMenuOpen)}
 >
 {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
 </button>
 </>
 )}
 </div>
 </div>

 {/* ------------------------------------------------------------------------------
 MOBILE DROPDOWN MENU
 Slides down when the hamburger button is clicked.
 ------------------------------------------------------------------------------ */}
 {isMenuOpen && (
 <div className="lg:hidden bg-white border-t border-[#E3E8EF] px-4 py-4 space-y-1 animate-slide-up">
 {[
 { to: '/dashboard', label: 'Dashboard' },
 { to: '/for-you', label: 'For You ✨' },
 { to: '/search', label: 'Colleges' },
 { to: '/compare', label: 'Compare Colleges' },
 { to: '/careers', label: 'Careers' },
 { to: '/exams', label: 'Exams' },
 { to: '/profile', label: 'Profile' },
 ].map(({ to, label }) => (
 <Link
 key={to}
 to={to}
 onClick={() => setIsMenuOpen(false)} // Close menu when a link is tapped
 className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
 location.pathname === to
 ? 'bg-slate-100 text-black'
 : 'text-[#425466] hover:bg-[#F6F7FB]'
 }`}
 >
 {label}
 </Link>
 ))}
 </div>
 )}
 </header>
 )}

 {/* ------------------------------------------------------------------------------
 MAIN CONTENT AREA
 React Router renders the current page component here via <Outlet />.
 ------------------------------------------------------------------------------ */}
 <main className="w-full flex-grow">
 <Outlet />
 </main>

 {/* ------------------------------------------------------------------------------
 MOBILE BOTTOM NAVIGATION BAR
 Fixed to the bottom of the screen on mobile devices.
 Provides quick access to the 5 most important sections.
 ------------------------------------------------------------------------------ */}
 {isAuthenticated && !hideNav && (
 <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E3E8EF] z-[9999] pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
 <div className="flex items-center justify-around h-16">
 <MobileNavItem to="/dashboard" icon={<LayoutDashboard size={22} />} label="Home" active={location.pathname === '/dashboard'} />
 <MobileNavItem to="/for-you" icon={<Sparkles size={22} />} label="For You" active={location.pathname === '/for-you'} />
 <MobileNavItem to="/search" icon={<Search size={22} />} label="Colleges" active={location.pathname === '/search'} />
 <MobileNavItem to="/exams" icon={<GraduationCap size={22} />} label="Exams" active={location.pathname.startsWith('/exams')} />
 <MobileNavItem to="/profile" icon={<User size={22} />} label="Me" active={location.pathname === '/profile'} />
 </div>
 </nav>
 )}

 </div>
 );
}

// ------------------------------------------------------------------------------
// HELPER COMPONENT: NavLink
// ------------------------------------------------------------------------------

/**
 * NavLink renders a single desktop navigation link with an icon and label.
 * It highlights itself when the current URL matches the `to` prop.
 *
 * @param to - The URL path this link navigates to
 * @param icon - A Lucide React icon component
 * @param label - The text label shown next to the icon
 * @param active - Whether this link matches the current page
 */
function NavLink({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
 return (
 <Link
 to={to}
 className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
 active
 ? 'bg-slate-100 text-black '
 : 'text-[#697386] hover:bg-slate-50 :bg-slate-800 hover:text-[#0A2540] :text-slate-100'
 }`}
 >
 {icon}
 {label}
 </Link>
 );
}

// ------------------------------------------------------------------------------
// HELPER COMPONENT: MobileNavItem
// ------------------------------------------------------------------------------

/**
 * MobileNavItem renders a single item in the bottom tab bar.
 * It shows an icon and a small label below it, with a highlight state
 * when the user is on that page.
 *
 * @param to - The URL path
 * @param icon - Lucide React icon
 * @param label - Short label (max ~5 chars for mobile)
 * @param active - Whether this tab is active
 */
function MobileNavItem({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
 return (
 <Link
 to={to}
 className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
 active ? 'text-black ' : 'text-[#9DA6B4] hover:text-[#425466] :text-slate-300'
 }`}
 >
 <div className={`p-1.5 rounded-xl transition-all ${active ? 'bg-slate-100 ' : ''}`}>
 {icon}
 </div>
 <span className="text-[10px] font-semibold">{label}</span>
 </Link>
 );
}
