/**
 * ============================================================================
 * ErrorBoundary.tsx
 * ============================================================================
 * WHAT THIS FILE DOES:
 * This component catches JavaScript errors anywhere in its child component tree
 * and displays a friendly fallback UI instead of crashing the entire app.
 *
 * WHY THIS MATTERS FOR BEGINNERS:
 * - Without an error boundary, a single bug in any component (like a map failing
 * to load or a chart throwing an error) would crash the entire application
 * and show a blank white screen. This is terrible user experience.
 * - Error boundaries are the ONLY way in React to catch errors during rendering.
 * Normal try/catch blocks do NOT work inside JSX render methods.
 * - This is a class component (not a function component) because React's
 * error-boundary lifecycle methods (`getDerivedStateFromError`, `componentDidCatch`)
 * are only available in class components.
 *
 * KEY CONCEPTS FOR BEGINNERS:
 * - `getDerivedStateFromError` is a lifecycle method that runs when a child
 * throws an error. It returns new state so the next render shows the fallback UI.
 * - `componentDidCatch` runs AFTER the error is caught. You can log the error
 * to an analytics service (like Sentry) here.
 * - We provide a"Try Again"button that resets the boundary state and re-renders
 * the children, giving the user a chance to recover.
 * - The `fallback` prop lets parent components override the default error UI
 * with a custom one for specific sections.
 *
 * USAGE:
 * Wrap sections of your app where you want error isolation:
 * <ErrorBoundary>
 * <SomeRiskyComponent />
 * </ErrorBoundary>
 *
 * In App.tsx we wrap the ENTIRE app so users always see a friendly message.
 * ============================================================================
 */

import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

// ------------------------------------------------------------------------------
// TYPE DEFINITIONS
// ------------------------------------------------------------------------------

/**
 * Props define what the ErrorBoundary accepts from its parent.
 * - children: The components this boundary will protect
 * - fallback: Optional custom UI to show instead of the default error page
 */
interface Props {
 /** The components this boundary will protect */
 children: ReactNode;
 /** Optional: custom fallback UI instead of the default */
 fallback?: ReactNode;
}

/**
 * State tracks whether an error has been caught and stores the error object.
 */
interface State {
 /** true when an error has been caught */
 hasError: boolean;
 /** The error object (used for debugging and showing details to the user) */
 error: Error | null;
}

// ------------------------------------------------------------------------------
// ErrorBoundary CLASS COMPONENT
// ------------------------------------------------------------------------------

export class ErrorBoundary extends Component<Props, State> {
 /**
 * The constructor initializes the component state.
 * We start with hasError = false because no error has occurred yet.
 */
 constructor(props: Props) {
 super(props);
 this.state = { hasError: false, error: null };
 }

 /**
 * getDerivedStateFromError is a React lifecycle method that runs when a child
 * component throws an error. It receives the error object and must return new state.
 *
 * Why this matters: Updating state here tells React to re-render this component
 * with the new state, which lets us show the fallback UI instead of the broken children.
 */
 static getDerivedStateFromError(error: Error): State {
 return { hasError: true, error };
 }

 /**
 * componentDidCatch is another lifecycle method that runs AFTER the error is caught.
 * This is the ideal place to log the error to an external service (e.g., Sentry,
 * LogRocket, or your own analytics dashboard).
 *
 * For now, we just log to the console. In production, replace this with a real
 * error-tracking service.
 */
 componentDidCatch(error: Error, errorInfo: ErrorInfo) {
 
 console.error('[ErrorBoundary] Caught an error:', error, errorInfo);
 }

 /**
 * handleReset lets the user try to recover from the error.
 * It resets the boundary state to"no error", which triggers a re-render
 * of the children. If the error was temporary (e.g., a network blip),
 * this may fully recover the app.
 */
 handleReset = () => {
 this.setState({ hasError: false, error: null });
 };

 // ------------------------------------------------------------------------------
 // RENDER METHOD
 // ------------------------------------------------------------------------------
 render() {
 // If a custom fallback is provided and an error occurred, render it instead
 if (this.state.hasError && this.props.fallback) {
 return this.props.fallback;
 }

 // DEFAULT FALLBACK UI: Show a friendly error page when a crash occurs
 if (this.state.hasError) {
 return (
 <div className="min-h-screen flex items-center justify-center bg-[#F6F7FB] px-4">
 <div className="sz-card-elevated max-w-md w-full text-center p-8 animate-scale-in">
 {/* Icon bubble */}
 <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
 <AlertTriangle size={32} className="text-red-500"/>
 </div>

 {/* Headline */}
 <h1 className="text-2xl font-bold text-[#0A2540] mb-2">
 Something went wrong
 </h1>

 {/* Reassuring message */}
 <p className="text-[#697386] text-sm mb-6 leading-relaxed">
 We encountered an unexpected error. Don't worry — your data is safe.
 Try refreshing the page or go back home.
 </p>

 {/* Error details (for debugging — only shown when an error exists) */}
 {this.state.error && (
 <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left overflow-auto">
 <p className="text-xs font-mono text-red-500 mb-1">
 {this.state.error.name}
 </p>
 <p className="text-xs font-mono text-[#697386]">
 {this.state.error.message}
 </p>
 </div>
 )}

 {/* Recovery buttons */}
 <div className="flex flex-col sm:flex-row gap-3 justify-center">
 <button
 onClick={this.handleReset}
 className="btn-primary"
 >
 <RefreshCw size={16} />
 Try Again
 </button>
 <Link to="/dashboard"className="btn-secondary">
 <Home size={16} />
 Go Home
 </Link>
 </div>
 </div>
 </div>
 );
 }

 // No error — render children normally, as if the boundary isn't even there
 return this.props.children;
 }
}
