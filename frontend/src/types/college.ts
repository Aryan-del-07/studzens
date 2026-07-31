
/**
 * college.ts
 *
 * WHAT THIS FILE DOES:
 * Defines TypeScript types/interfaces for college data.
 * These types ensure that all college data is structured consistently
 * throughout the app, preventing bugs from mismatched data shapes.
 *
 * WHY IT EXISTS:
 * TypeScript's main benefit is catching type errors at compile time.
 * These types act as a"contract"that all college data must follow.
 *
 * KEY CONCEPTS:
 * - `College`: Main type with all college properties
 * - `CollegeType`: Union type for ownership categories (Govt, Private, Deemed, etc.)
 * - `Stream`: Union type for academic streams (Engineering, Medical, etc.)
 * - `CourseDetail`: Type for individual course information
 * - `FacilityDetail`: Type for facility information with rating
 */
export type Stream = 'MPC' | 'BiPC' | 'Commerce' | 'Arts';

export type CollegeCategory =
 | 'Engineering'
 | 'Medical'
 | 'Arts & Humanities'
 | 'Commerce & Management'
 | 'Law'
 | 'Design';

export type Ownership = 'Private';
export type Tier = 'Tier 1' | 'Tier 2' | 'Tier 3';

export type Subject =
 | 'Math'
 | 'Physics'
 | 'Chemistry'
 | 'Biology'
 | 'Computer Science'
 | 'Economics'
 | 'Accountancy'
 | 'Business Studies'
 | 'Literature'
 | 'History'
 | 'Psychology'
 | 'Political Science'
 | 'Sociology'
 | 'Design'
 | 'Fine Arts';

export type VerificationStatus = 'Verified' | 'Pending' | 'Unavailable';

export interface VerificationSource {
 source: string; // e.g."NIRF 2025","JoSAA 2025","Official Placement Report"
 status: VerificationStatus;
 lastUpdated: string; // YYYY-MM-DD
 confidenceScore: number; // Scale of 0-10
}

export interface VerificationMetadata {
 fees?: VerificationSource;
 placements?: VerificationSource;
 cutoffs?: VerificationSource;
 general?: VerificationSource;
}

export interface TransitNode {
 name: string;
 distanceKm: number;
 travelTimeMinutes: number;
 estimatedCostInr?: number;
 distance: string;
 time: string;
 cost?: string;
}

export interface College {
 id: string;
 name: string;
 shortName?: string; // e.g."IITB","MIT"
 establishedYear?: number;
 studentStrength?: number;
 nirfRank?: number;
 city: string;
 state: string;
 country?: string; // default"India"
 currency?: string; // default"INR"
 lat: number;
 lng: number;
 cluster: string;
 primaryCategory: CollegeCategory;
 categories: CollegeCategory[];
 tier: Tier;
 ownership: Ownership;
 annualFeeLpa: number;
 avgPackageLpa: number;
 highestPackageLpa?: number;
 hostelAvailable?: boolean;
 campusSize?: string;
 facultyCount?: number;
 researchOutput?: string;
 studentRating?: number;
 communityStats?: {
 totalReviews: number;
 averageRating: number;
 campusConfessions: number;
 qaThreads: number;
 };
 entranceExams: string[];
 streams: Stream[];
 subjects: Subject[];
 programs: string[];
 vibe: string;
 boardComfort: number;
 website: string;
 transit?: {
 airport: TransitNode | string;
 railway: TransitNode | string;
 metro?: TransitNode;
 busStation?: TransitNode;
 cityCenter?: { distance: string; time: string } | string;
 cityDistance?: string;
 convenienceScore?: number;
 };
 scores?: {
 walkability: number;
 publicTransport: number;
 safety: number;
 convenience: number;
 };
 transitCoordinates?: {
 airport?: { lat: number; lng: number };
 railway?: { lat: number; lng: number };
 metro?: { lat: number; lng: number };
 cityCenter?: { lat: number; lng: number };
 };
 verificationMetadata?: VerificationMetadata;
}
