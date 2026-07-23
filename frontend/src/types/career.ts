
/**
 * career.ts
 *
 * WHAT THIS FILE DOES:
 * Defines TypeScript types/interfaces for career data.
 * Ensures all career-related data follows the same structure.
 *
 * WHY IT EXISTS:
 * Consistent typing prevents bugs. If a component expects a Career
 * object with a salary field, TypeScript ensures that field exists.
 *
 * KEY CONCEPTS:
 * - `Career`: Main type with career properties (title, salary, growth, etc.)
 * - `CareerCategory`: Union type for career categories
 * - `RelatedCourse`: Type for courses that lead to this career
 * - `CareerInsight`: Type for AI-generated career insights
 * - `CareerPath`: Type for step-by-step career progression
 */
export interface CareerOption {
 id: string;
 title: string;
 description: string;
 skillsRequired: string[];
 certifications: string[];
 expectedSalary: {
 starting: number; // in LPA
 midLevel: number;
 senior: number;
 };
 growthPotential: 'Very High' | 'High' | 'Medium' | 'Low';
}

export interface CareerPath {
 id: string;
 title: string;
 category: 'Engineering' | 'Medical' | 'Commerce' | 'Law' | 'Design' | 'Management' | 'Government Exams' | 'Entrepreneurship' | 'Study Abroad';
 description: string;
 
 typicalPath: {
 schoolSubjects: string[];
 entranceExams: string[];
 degrees: string[];
 };
 
 possibleCareers: CareerOption[];
 higherStudies: string[];
}
