
/**
 * exam.ts
 *
 * WHAT THIS FILE DOES:
 * Defines TypeScript types/interfaces for exam data.
 * Ensures all exam-related data follows the same structure.
 *
 * WHY IT EXISTS:
 * TypeScript types catch errors early. If a component expects an Exam
 * object but receives something else, the compiler will flag it.
 *
 * KEY CONCEPTS:
 * - `Exam`: Main type with exam properties (dates, eligibility, pattern, etc.)
 * - `ExamPattern`: Type for exam structure (sections, marks, duration)
 * - `ExamCategory`: Union type for exam categories
 * - `ExamDates`: Type for upcoming date information
 * - `ExamScore`: Type for student's exam score data
 */
export interface ExamDate {
 title: string;
 date: string; // YYYY-MM-DD or descriptive like"May 2026"
 isConfirmed: boolean;
}

export interface Exam {
 id: string;
 name: string;
 fullName: string;
 category: 'Engineering' | 'Medical' | 'Law' | 'Design' | 'Architecture' | 'General' | 'Scholarship';
 level: 'National' | 'State' | 'University';
 conductingBody: string;
 officialWebsite: string;
 description: string;
 
 eligibility: string[];
 pattern: {
 mode: string;
 durationMinutes: number;
 totalMarks: number;
 totalQuestions: number;
 sections: { name: string; questions: number; marks: number }[];
 };
 markingScheme: {
 correct: number;
 incorrect: number;
 unanswered: number;
 };
 syllabusOverview: string;
 
 importantDates: {
 registrationStart: string;
 registrationEnd: string;
 admitCard: string;
 examStart: string;
 examEnd?: string;
 resultExpected: string;
 counselingStart?: string;
 };

 acceptedBy: string[]; // List of college IDs or categories (e.g."All NITs")
 difficultyLevel: 1 | 2 | 3 | 4 | 5;
}
