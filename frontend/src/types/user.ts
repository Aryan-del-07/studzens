import type { CollegeCategory, Stream, Subject } from './college';


/**
 * user.ts
 *
 * WHAT THIS FILE DOES:
 * Defines TypeScript types for user-related data.
 * Includes auth user, student profile, preferences, and academic info.
 *
 * WHY IT EXISTS:
 * The user profile is complex (academic, preferences, exams, scores).
 * These types ensure all profile data is consistent across the app.
 *
 * KEY CONCEPTS:
 * - `AuthUser`: Type for logged-in user (id, name, email, role)
 * - `StudentProfile`: Type for complete student profile
 * - `AcademicProfile`: Type for academic background (class, board, marks, etc.)
 * - `Preferences`: Type for student preferences (states, budget, careers)
 * - `ExamScore`: Type for student's exam scores
 * - `Notification`: Type for in-app notifications
 */
export interface UserProfile {
 id: string;
 name: string;
 email: string;
 phone?: string;
 city?: string;
 state?: string;
 
 academicProfile: {
 currentClass?: '10th' | '11th' | '12th' | 'Dropper' | 'College';
 marks10?: number;
 marks11?: number;
 marks12?: number;
 board?: 'CBSE' | 'ICSE' | 'State Board' | 'IB' | 'IGCSE';
 category?: 'General' | 'OBC-NCL' | 'SC' | 'ST' | 'EWS';
 gender?: 'Male' | 'Female' | 'Other';
 homeState?: string;
 stream?: Stream;
 };

 examScores: {
 [examId: string]: {
 score?: number;
 rank?: number;
 percentile?: number;
 };
 };

 preferences: {
 budgetLimitLpa?: number;
 preferredStates: string[];
 preferredCities: string[];
 goals: CollegeCategory[];
 favoriteSubjects: Subject[];
 careerInterests: string[];
 };

 savedColleges: string[]; // College IDs
 pinnedExams: string[]; // Exam IDs
 customRoadmaps?: {
 id: string;
 createdAt: string;
 steps: {
 id: string;
 type: 'schooling' | 'exam' | 'course' | 'college' | 'career';
 title: string;
 description?: string;
 }[];
 }[];
}
