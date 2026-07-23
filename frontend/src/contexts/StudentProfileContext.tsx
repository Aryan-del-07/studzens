/**
 * ============================================================================
 * StudentProfileContext.tsx
 * ============================================================================
 * WHAT THIS FILE DOES:
 * This file creates the Student Profile Context and Provider.
 * It stores everything about a student's academic identity: their class, board,
 * marks, preferred states/cities, target careers, and which exams they are tracking.
 *
 * KEY CONCEPTS FOR BEGINNERS:
 * - React Context is like a shared bulletin board: any component can read or post
 * updates to the student's profile without passing props through every parent.
 * - We use `useLocalStorage` so the profile survives page refreshes.
 * - `Partial<StudentProfile>` means"only some fields of the profile"— useful for
 * updating just one thing (like adding a new tracked exam) without rewriting everything.
 *
 * CONNECTS TO:
 * - OnboardingPage.tsx (fills initial profile data)
 * - DashboardPage.tsx (shows tracked exams and target careers)
 * - ProfilePage.tsx (lets the student edit their details)
 * - ExamHubPage.tsx (pins/unpins exams)
 * ============================================================================
 */

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

import type { UserProfile } from '../types/user';

// ------------------------------------------------------------------------------
// TYPE DEFINITIONS
// ------------------------------------------------------------------------------

/**
 * StudentProfile extends the base UserProfile with app-specific fields.
 * It omits `id`, `name`, and `email` (managed by AuthContext) and adds:
 * - targetCareers: which career paths the student is interested in
 * - trackedExams: which entrance exams they are actively preparing for
 * - jeeMainTarget / neetTarget: their personal score goals
 */
export type StudentProfile = Omit<UserProfile, 'id' | 'name' | 'email'> & {
 targetCareers: string[]; // e.g., ["engineering","design"]
 trackedExams: string[]; // e.g., ["jee-main","bitsat"]
 jeeMainTarget: number | null; // Their target percentile/score for JEE Main
 neetTarget: number | null; // Their target score for NEET
};

/**
 * defaultProfile is the"empty"profile used when a new student first opens the app.
 * All fields start blank or empty so the onboarding flow can fill them in.
 */
const defaultProfile: StudentProfile = {
 academicProfile: {},
 examScores: {},
 preferences: {
 preferredStates: [],
 preferredCities: [],
 goals: [],
 favoriteSubjects: [],
 careerInterests: []
 },
 savedColleges: [],
 pinnedExams: [],
 targetCareers: [],
 trackedExams: [],
 jeeMainTarget: null,
 neetTarget: null,
 customRoadmaps: [],
};

/**
 * StudentProfileContextType defines what any component can read or do with the profile.
 */
interface StudentProfileContextType {
 profile: StudentProfile;
 updateProfile: (updates: Partial<StudentProfile>) => void; // Update any subset of fields
 trackExam: (examId: string) => void; // Add an exam to the tracking list
 untrackExam: (examId: string) => void; // Remove an exam from the tracking list
 targetCareer: (careerId: string) => void; // Add a career interest
 untargetCareer: (careerId: string) => void; // Remove a career interest
 saveRoadmap: (roadmap: NonNullable<StudentProfile['customRoadmaps']>[0]) => void; // Add a custom roadmap
 deleteRoadmap: (roadmapId: string) => void; // Remove a custom roadmap
}

// ------------------------------------------------------------------------------
// CONTEXT CREATION
// ------------------------------------------------------------------------------

const StudentProfileContext = createContext<StudentProfileContextType | undefined>(undefined);

// ------------------------------------------------------------------------------
// StudentProfileProvider COMPONENT
// ------------------------------------------------------------------------------

/**
 * StudentProfileProvider wraps the app and keeps the student's profile in sync
 * with localStorage. Any child component can read or update the profile via
 * the `useStudentProfile()` hook.
 *
 * @param children - React components that need access to the student profile.
 */
export function StudentProfileProvider({ children }: { children: ReactNode }) {
 // Load the profile from localStorage (or start with defaultProfile if first visit)
 const [profile, setProfile] = useLocalStorage<StudentProfile>('stuzen_student_profile', defaultProfile);

 /**
 * updateProfile: Merges new data into the existing profile.
 * Example: updateProfile({ academicProfile: { currentClass: '12th' } })
 * This only updates the currentClass field and keeps everything else unchanged.
 */
 const updateProfile = (updates: Partial<StudentProfile>) => {
 setProfile(prev => ({ ...prev, ...updates }));
 };

 /**
 * trackExam: Adds an exam ID to the trackedExams list.
 * Uses a guard check to prevent duplicates (won't add the same exam twice).
 */
 const trackExam = (examId: string) => {
 setProfile(prev => ({
 ...prev,
 trackedExams: prev.trackedExams.includes(examId)
 ? prev.trackedExams // Already tracking — return unchanged
 : [...prev.trackedExams, examId] // Add new exam to the end of the list
 }));
 };

 /**
 * untrackExam: Removes an exam ID from the trackedExams list.
 * Uses .filter() to create a new array without the matching ID.
 */
 const untrackExam = (examId: string) => {
 setProfile(prev => ({
 ...prev,
 trackedExams: prev.trackedExams.filter(id => id !== examId)
 }));
 };

 /**
 * targetCareer: Adds a career ID to the targetCareers list.
 * Guard check prevents duplicates.
 */
 const targetCareer = (careerId: string) => {
 setProfile(prev => ({
 ...prev,
 targetCareers: prev.targetCareers.includes(careerId)
 ? prev.targetCareers
 : [...prev.targetCareers, careerId]
 }));
 };

 /**
 * untargetCareer: Removes a career ID from the targetCareers list.
 */
 const untargetCareer = (careerId: string) => {
 setProfile(prev => ({
 ...prev,
 targetCareers: prev.targetCareers.filter(id => id !== careerId)
 }));
 };

 /**
 * saveRoadmap: Appends a new custom roadmap to the student's profile.
 * Roadmaps are personalized study plans the student builds in the app.
 */
 const saveRoadmap = (roadmap: NonNullable<StudentProfile['customRoadmaps']>[0]) => {
 setProfile(prev => ({
 ...prev,
 customRoadmaps: [...(prev.customRoadmaps || []), roadmap]
 }));
 };

 /**
 * deleteRoadmap: Removes a roadmap by its unique ID.
 */
 const deleteRoadmap = (roadmapId: string) => {
 setProfile(prev => ({
 ...prev,
 customRoadmaps: (prev.customRoadmaps || []).filter(r => r.id !== roadmapId)
 }));
 };

 // Provide all profile data and functions to children via React Context
 return (
 <StudentProfileContext.Provider
 value={{
 profile,
 updateProfile,
 trackExam,
 untrackExam,
 targetCareer,
 untargetCareer,
 saveRoadmap,
 deleteRoadmap
 }}
 >
 {children}
 </StudentProfileContext.Provider>
 );
}

// ------------------------------------------------------------------------------
// CUSTOM HOOK: useStudentProfile
// ------------------------------------------------------------------------------

/**
 * useStudentProfile is a convenience hook for reading or updating the student's profile.
 * It throws a clear error if used outside the StudentProfileProvider.
 *
 * Usage in any component:
 * const { profile, trackExam, targetCareer } = useStudentProfile();
 */
export function useStudentProfile() {
 const context = useContext(StudentProfileContext);
 if (context === undefined) {
 throw new Error('useStudentProfile must be used within a StudentProfileProvider');
 }
 return context;
}
