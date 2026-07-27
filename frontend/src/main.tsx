import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import { StudentProfileProvider } from './contexts/StudentProfileContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import { NotificationProvider } from './contexts/NotificationContext';
import App from './app/App.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
 <StrictMode>
 <AuthProvider>
 <StudentProfileProvider>
 <BookmarkProvider>
 <NotificationProvider>
 <App />
 </NotificationProvider>
 </BookmarkProvider>
 </StudentProfileProvider>
 </AuthProvider>
 </StrictMode>,
);
