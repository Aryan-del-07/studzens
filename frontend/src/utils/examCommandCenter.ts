
/**
 * examCommandCenter.ts
 *
 * WHAT THIS FILE DOES:
 * Manages exam-related logic: countdown calculations, readiness scoring,
 * suggestion engine, and priority generation for the dashboard.
 *
 * WHY IT EXISTS:
 * The dashboard needs to know which exams are coming up, how prepared
 * the student is, and what they should focus on next. This file handles
 * all that calculation in one place.
 *
 * KEY CONCEPTS:
 * - `calculateReadinessScore`: 0-100 score based on marks, exam attempts, and preferences
 * - `getSuggestedExams`: Recommends exams the student should consider
 * - `getTodayPriorities`: Generates a daily todo list from exam dates
 * - `getMissingActions`: Identifies what the student hasn't completed yet
 * - `getExamDates`: Returns upcoming dates for tracked exams
 */
// This utility file contains calculation helpers for the Stuzen Exam Command Center.
// It computes readiness scores based on profile details, suggests exams to pin based on stream,
// compiles lists of missing actions (like missing board marks), and sorts target calendar events.
// This utility connects to DashboardPage and ExamHubPage to keep calculations unified and clean.

import type { StudentProfile } from '../contexts/StudentProfileContext';
import type { Exam } from '../types/exam';

export interface MissingAction {
 id: string;
 text: string;
 actionText: string;
 link: string;
}

export interface CalendarEvent {
 date: string;
 title: string;
 type: 'registration_start' | 'registration_end' | 'exam' | 'result' | 'counseling';
 examId: string;
 examName: string;
}

export interface TodayPriority {
 id: string;
 text: string;
 done: boolean;
 type: 'registration' | 'document' | 'admit_card' | 'counseling' | 'general';
}

/**
 * Calculates a student's readiness score between 0 and 100 based on their profile completion
 * and target tasks for entrance exam preparation.
 */
export function calculateReadinessScore(profile: StudentProfile): { score: number; breakdown: Record<string, number> } {
 const breakdown: Record<string, number> = {
 profileCompletion: 0, // max 25
 examSelection: 0, // max 25
 marksRegistration: 0, // max 25
 preferencesSet: 0, // max 25
 };

 // 1. Profile Completion (Class, Board, Stream)
 if (profile.academicProfile?.currentClass) {
 breakdown.profileCompletion += 10;
 }
 if (profile.academicProfile?.board) {
 breakdown.profileCompletion += 10;
 }
 if (profile.academicProfile?.stream) {
 breakdown.profileCompletion += 5;
 }

 // 2. Exam Selection (Tracking exams)
 const trackedCount = profile.trackedExams?.length || 0;
 if (trackedCount > 0) {
 breakdown.examSelection = Math.min(25, trackedCount * 12.5); // 12.5 per exam, max 25
 }

 // 3. Marks details entered
 if (profile.academicProfile?.marks10) {
 breakdown.marksRegistration += 12.5;
 }
 if (profile.academicProfile?.marks12) {
 breakdown.marksRegistration += 12.5;
 }

 // 4. Preferences configured
 const hasStates = (profile.preferences as any)?.preferredStates?.length > 0;
 const hasCareers = profile.targetCareers?.length > 0;
 if (hasStates) {
 breakdown.preferencesSet += 12.5;
 }
 if (hasCareers) {
 breakdown.preferencesSet += 12.5;
 }

 const score = breakdown.profileCompletion + breakdown.examSelection + breakdown.marksRegistration + breakdown.preferencesSet;
 return { score, breakdown };
}

/**
 * Compiles a list of concrete missing actions the student can take to improve preparation readiness.
 */
export function getMissingActions(profile: StudentProfile): MissingAction[] {
 const actions: MissingAction[] = [];

 if (!profile.academicProfile?.currentClass || !profile.academicProfile?.board) {
 actions.push({
 id: 'complete-profile',
 text: 'Academic background is incomplete.',
 actionText: 'Complete Profile Details',
 link: '/profile'
 });
 }

 if ((profile.trackedExams?.length || 0) === 0) {
 actions.push({
 id: 'pin-exams',
 text: 'No entrance exams pinned to track deadlines.',
 actionText: 'Browse & Pin Exams',
 link: '/exams'
 });
 }

 if (!profile.academicProfile?.marks12 && !profile.academicProfile?.marks10) {
 actions.push({
 id: 'add-marks',
 text: '10th & 12th board marks/estimates are missing.',
 actionText: 'Add Academic Marks',
 link: '/profile'
 });
 }

 if (!(profile.preferences as any)?.preferredStates?.length) {
 actions.push({
 id: 'set-states',
 text: 'Preferred states for admission are not set.',
 actionText: 'Update Target Locations',
 link: '/profile'
 });
 }

 return actions;
}

/**
 * Recommends exams that the student has not yet pinned based on their profile data (marks, stream, etc.).
 */
export function getSuggestedExams(profile: StudentProfile, allExams: Exam[]): Exam[] {
 const stream = profile.academicProfile?.stream;
 if (!stream) return [];

 const tracked = new Set(profile.trackedExams || []);
 const suggestions: Exam[] = [];

 for (const exam of allExams) {
 if (tracked.has(exam.id)) continue;

 // MPC stream suggestions (Engineering/Design/Architecture)
 if (stream === 'MPC') {
 if (exam.category === 'Engineering' || exam.category === 'Design' || exam.category === 'Architecture') {
 suggestions.push(exam);
 }
 }
 // BiPC stream suggestions (Medical/General science)
 else if (stream === 'BiPC') {
 if (exam.category === 'Medical' || exam.id === 'cuet') {
 suggestions.push(exam);
 }
 }
 // Commerce / Arts suggestions
 else {
 if (exam.category === 'Law' || exam.id === 'cuet' || exam.category === 'General') {
 suggestions.push(exam);
 }
 }
 }

 return suggestions.slice(0, 3);
}

/**
 * Compiles Today's Academic Priorities based on the student's pinned exams and deadline states.
 */
export function getTodayPriorities(profile: StudentProfile): TodayPriority[] {
 const trackedIds = new Set(profile.trackedExams || []);
 const priorities: TodayPriority[] = [];

 if (trackedIds.size === 0) {
 return [
 { id: 'p-pin', text: 'Browse and pin your target entrance exams in the Exam Hub', done: false, type: 'general' },
 { id: 'p-profile', text: 'Complete your profile preferences to get matched colleges', done: false, type: 'general' }
 ];
 }

 if (trackedIds.has('jee-main')) {
 priorities.push({ id: 'p-jee-1', text: 'Verify JEE Main application eligibility checklist', done: false, type: 'registration' });
 priorities.push({ id: 'p-jee-2', text: 'Download JEE Main chapter-wise syllabus PDF', done: false, type: 'general' });
 }
 if (trackedIds.has('jee-advanced') || trackedIds.has('jee-adv')) {
 priorities.push({ id: 'p-jeeadv-1', text: 'Review JEE Advanced reservation category document criteria', done: false, type: 'document' });
 }
 if (trackedIds.has('bitsat')) {
 priorities.push({ id: 'p-bitsat-1', text: 'Complete BITSAT mock test registration slot booking', done: false, type: 'registration' });
 }
 if (trackedIds.has('viteee')) {
 priorities.push({ id: 'p-viteee-1', text: 'Check VITEEE slot booking guidelines and dates', done: false, type: 'registration' });
 }
 if (trackedIds.has('neet')) {
 priorities.push({ id: 'p-neet-1', text: 'Prepare NEET UG Category certificate for document verification', done: false, type: 'document' });
 priorities.push({ id: 'p-neet-2', text: 'Download NEET admit card from NTA portal', done: false, type: 'admit_card' });
 }

 // Fallbacks if only other exams are tracked
 if (priorities.length === 0) {
 priorities.push({ id: 'p-gen-1', text: 'Visit official websites of your pinned exams for date confirmations', done: false, type: 'general' });
 priorities.push({ id: 'p-gen-2', text: 'Check document verification checklists for state admissions', done: false, type: 'document' });
 }

 return priorities.slice(0, 4);
}

/**
 * Returns a list of calendar events for a student's pinned exams.
 */
export function getCalendarEvents(trackedExamIds: string[], allExams: Exam[]): CalendarEvent[] {
 const events: CalendarEvent[] = [];
 const trackedSet = new Set(trackedExamIds);

 const trackedExams = allExams.filter(e => trackedSet.has(e.id));

 for (const exam of trackedExams) {
 const dates = exam.importantDates;
 if (dates.registrationStart) {
 events.push({
 date: dates.registrationStart,
 title: `${exam.name} Registration Opens`,
 type: 'registration_start',
 examId: exam.id,
 examName: exam.name
 });
 }
 if (dates.registrationEnd) {
 events.push({
 date: dates.registrationEnd,
 title: `${exam.name} Registration Closes`,
 type: 'registration_end',
 examId: exam.id,
 examName: exam.name
 });
 }
 if (dates.examStart) {
 events.push({
 date: dates.examStart,
 title: `${exam.name} Exam Starts`,
 type: 'exam',
 examId: exam.id,
 examName: exam.name
 });
 }
 if (dates.resultExpected) {
 events.push({
 date: dates.resultExpected,
 title: `${exam.name} Results Expected`,
 type: 'result',
 examId: exam.id,
 examName: exam.name
 });
 }
 if (dates.counselingStart) {
 events.push({
 date: dates.counselingStart,
 title: `${exam.name} Counselling Starts`,
 type: 'counseling',
 examId: exam.id,
 examName: exam.name
 });
 }
 }

 return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
