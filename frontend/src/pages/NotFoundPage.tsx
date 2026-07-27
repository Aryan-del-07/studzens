import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';


/**
 * NotFoundPage.tsx
 *
 * WHAT THIS FILE DOES:
 * A friendly 404 error page shown when the user visits a URL
 * that doesn't exist in the app.
 *
 * WHY IT EXISTS:
 * Instead of a browser default error, we show a branded page with
 * helpful navigation links so the user isn't stuck.
 *
 * KEY CONCEPTS:
 * - `useLocation`: Reads the current URL to show in the error message
 * - Animated illustration using CSS keyframes
 * - Helpful navigation links back to home and dashboard
 * - Responsive layout that works on mobile and desktop
 */
export default function NotFoundPage() {
 return (
 <div className="min-h-[calc(100vh-73px)] bg-[#F6F7FB] flex flex-col items-center justify-center p-4 text-[#0A2540]">
 <div className="studzens-card max-w-md w-full p-10 text-center animate-slide-up">
 <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-[#E3E8EF] flex items-center justify-center mx-auto mb-6">
 <AlertTriangle className="text-black"size={40} />
 </div>
 
 <h1 className="text-6xl font-bold text-[#0A2540] mb-2 tracking-tight font-sans">404</h1>
 <h2 className="text-xl font-semibold text-[#425466] mb-4 font-sans">Page not found</h2>
 
 <p className="text-[#697386] mb-8 font-sans text-sm">
 The page you're looking for doesn't exist or has been moved to another URL.
 </p>
 
 <Link 
 to="/"
 className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer font-sans"
 >
 <Home size={18} />
 Back to Home
 </Link>
 </div>
 </div>
 );
}
