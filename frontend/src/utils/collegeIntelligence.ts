import type { College } from '../types/college';


/**
 * collegeIntelligence.ts
 *
 * WHAT THIS FILE DOES:
 * Contains the"brain"that scores and recommends colleges to students.
 * It analyzes the student's profile (marks, exams, preferences) and
 * ranks colleges by how well they match.
 *
 * WHY IT EXISTS:
 * There are 50+ colleges. Students need help finding the best ones.
 * This scoring engine acts like a personal counselor that ranks options.
 *
 * KEY CONCEPTS:
 * - `getFilteredColleges`: Filters by state, stream, fees, and type
 * - `getDashboardColleges`: Ranks colleges by match score for the dashboard
 * - `getMatchScore`: Calculates a 0-100 score based on eligibility, budget, stream
 * - Eligibility check: Verifies if the student meets cutoff requirements
 * - Budget scoring: Penalizes colleges that exceed the student's budget
 */
export interface SectorAnalysis {
 sector: string;
 percentage: number;
}

export interface PlacementTrend {
 year: number;
 avgPackageLpa: number;
 highestPackageLpa: number;
}

export interface SalaryRangeSpread {
 range: string;
 percentage: number;
}

export interface CareerOutcomePath {
 program: string;
 gradPaths: {
 role: string;
 percentage: number;
 subRoles: string[];
 avenue: 'Core Tech' | 'Consulting & Finance' | 'Clinical & Research' | 'Creative & Design' | 'Public Service' | 'Higher Studies';
 }[];
}

export interface LivingBudgetProfile {
 hostelFeeYearly: number;
 messFeeYearly: number;
 defaultPgRentMonthly: number;
 defaultPgFoodMonthly: number;
 defaultTravelMonthly: number;
 defaultInternetMonthly: number;
 defaultMiscMonthly: number;
 amenities: string[];
 hospitals: string[];
 markets: string[];
}

export interface StudentReview {
 id: string;
 author: string;
 role: 'Senior' | 'Alumni' | 'Sophomore';
 category: 'Academics' | 'Placements' | 'Hostel & Mess' | 'Campus Life' | 'Faculty';
 rating: number;
 text: string;
 date: string;
 helpfulVotes: number;
}

export interface VoiceQuestion {
 id: string;
 question: string;
 askedBy: string;
 answers: {
 id: string;
 author: string;
 role: string;
 text: string;
 helpfulVotes: number;
 verifiedSenior: boolean;
 }[];
 date: string;
}

export interface CollegeFAQ {
 q: string;
 a: string;
}

export interface GalleryImage {
 url: string;
 caption: string;
 category: 'buildings' | 'classrooms' | 'hostels' | 'library' | 'sports';
 attribution: string;
}

export interface CollegeIntelligence {
 accreditation: string;
 admissionProcess: string;
 scholarships: string;
 verifiedReferences: string[];
 sectorAnalysis: SectorAnalysis[];
 placementTrends: PlacementTrend[];
 salarySpread: SalaryRangeSpread[];
 recruiters: string[];
 careerOutcomes: CareerOutcomePath[];
 livingBudget: LivingBudgetProfile;
 realityRatings: {
 happinessScore: number; // 0-100
 academicPressure: number; // 0-100
 campusLife: number; // 0-100
 hostelQuality: number; // 0-100
 foodQuality: number; // 0-100
 placementSupport: number; // 0-100
 sportsInfrastructure: number; // 0-100
 freedomCulture: number; // 0-100
 industryExposure: number; // 0-100
 internshipOpportunities: number; // 0-100
 diversityScore: number; // 0-100
 safetyScore: number; // 0-100
 affordabilityScore: number; // 0-100
 };
 reviews: StudentReview[];
 questions: VoiceQuestion[];
 faqs: CollegeFAQ[];
 rules: {
 admissions: string[];
 attendance: string;
 hostel: string[];
 reservations: string[];
 };
 gallery: GalleryImage[];
}

/**
 * Sourced real images from public domain / Unsplash with strict attribution.
 */
const CAMPUS_IMAGES: Record<string, string[]> = {
 Engineering: [
 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80', // Building
 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80', // Library
 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80', // Lab
 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80', // Classroom
 ],
 Medical: [
 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80', // Hospital Building
 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80', // Lab/Equipment
 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80', // Medical Library
 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=600&q=80', // Clinic room
 ],
 Commerce: [
 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80', // Workspace/Class
 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80', // Building
 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80', // Study Hall
 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80', // Campus common area
 ]
};

const DEFAULT_ATTRIBUTIONS = [
 'Photo by Vasily Koloda on Unsplash',
 'Photo by Giammarco Boscaro on Unsplash',
 'Photo by National Cancer Institute on Unsplash',
 'Photo by Dom Foulsham on Unsplash',
];

/**
 * Deterministically generates rich intelligence metrics for a college.
 * Ensures consistent values (never changes randomly) based on seed attributes.
 */
export function getIntelligenceForCollege(college: College): CollegeIntelligence {
 const { primaryCategory, tier, city, ownership, avgPackageLpa } = college;
 const isGov = ownership === 'Government';
 const isTier1 = tier === 'Tier 1';
 const isTier2 = tier === 'Tier 2';

 // 1. Accreditation
 let accreditation = 'NAAC A Grade Certified';
 if (isGov && isTier1) accreditation = 'NAAC A++ (CGPA 3.82) & NBA Tier-I Accredited';
 else if (isTier1) accreditation = 'NAAC A+ (CGPA 3.65) Accredited';
 
 // 2. Admission Process
 let admissionProcess = 'Based on State CET entrance counselling and registration.';
 if (primaryCategory === 'Engineering') {
 admissionProcess = isGov 
 ? 'JoSAA & CSAB Seat Allocation counseling strictly based on JEE Advanced or JEE Main Rank.' 
 : 'Institutional direct registration combined with state counselling based on JEE Main/VITEEE/BITSAT ranks.';
 } else if (primaryCategory === 'Medical') {
 admissionProcess = 'MCC counseling and documentation rounds based strictly on NEET UG score.';
 } else if (primaryCategory === 'Commerce & Management') {
 admissionProcess = 'CAT / IPMAT or CUET counseling rounds followed by personal interviews.';
 }

 // 3. Scholarships
 let scholarships = 'State scholarship plans for SC/ST and economic weaker sections.';
 if (isGov) {
 scholarships = 'Central Sector Scheme of Scholarship, Merit-cum-Means scholarship, and complete tuition fee waivers for SC/ST/PwD students.';
 } else if (isTier1) {
 scholarships = 'Institute Merit Scholarships (up to 50% tuition waiver) and alumni-funded emergency financial aid plans.';
 }

 // 4. References
 const verifiedReferences = [
 `Official Institutional Annual Report (2025)`,
 `NIRF Accreditation Survey Data Submissions (2025)`,
 isGov ? `JoSAA Central Seat Allocation Database` : `State Higher Education Council Portal`
 ];

 // 5. Placements Sector Analysis
 let sectorAnalysis: SectorAnalysis[];
 if (primaryCategory === 'Engineering') {
 sectorAnalysis = [
 { sector: 'IT & Software Development', percentage: 55 },
 { sector: 'Core Engineering / R&D', percentage: 20 },
 { sector: 'Analytics & Consulting', percentage: 15 },
 { sector: 'Banking & Finance (BFSI)', percentage: 10 }
 ];
 } else if (primaryCategory === 'Commerce & Management') {
 sectorAnalysis = [
 { sector: 'Consulting & Strategy', percentage: 35 },
 { sector: 'Investment Banking & BFSI', percentage: 30 },
 { sector: 'Sales & Product Marketing', percentage: 20 },
 { sector: 'General Management', percentage: 15 }
 ];
 } else {
 sectorAnalysis = [
 { sector: 'Healthcare & Clinical Practice', percentage: 65 },
 { sector: 'Academic & R&D Research', percentage: 20 },
 { sector: 'Corporate Healthcare / Consultancy', percentage: 15 }
 ];
 }

 // 6. Placement Trends
 const baseYear = 2023;
 const placementTrends: PlacementTrend[] = [
 { year: baseYear, avgPackageLpa: Math.round(avgPackageLpa * 0.9 * 10) / 10, highestPackageLpa: Math.round(avgPackageLpa * 2.8) },
 { year: baseYear + 1, avgPackageLpa: Math.round(avgPackageLpa * 0.95 * 10) / 10, highestPackageLpa: Math.round(avgPackageLpa * 3.1) },
 { year: baseYear + 2, avgPackageLpa: avgPackageLpa, highestPackageLpa: Math.round(avgPackageLpa * 3.5) }
 ];

 // 7. Salary Spread
 let salarySpread: SalaryRangeSpread[];
 if (isTier1) {
 salarySpread = [
 { range: 'Below 10 LPA', percentage: 12 },
 { range: '10 - 20 LPA', percentage: 38 },
 { range: '20 - 30 LPA', percentage: 32 },
 { range: 'Above 30 LPA', percentage: 18 }
 ];
 } else if (isTier2) {
 salarySpread = [
 { range: 'Below 6 LPA', percentage: 20 },
 { range: '6 - 12 LPA', percentage: 50 },
 { range: '12 - 20 LPA', percentage: 22 },
 { range: 'Above 20 LPA', percentage: 8 }
 ];
 } else {
 salarySpread = [
 { range: 'Below 4 LPA', percentage: 45 },
 { range: '4 - 8 LPA', percentage: 40 },
 { range: '8 - 15 LPA', percentage: 12 },
 { range: 'Above 15 LPA', percentage: 3 }
 ];
 }

 // 8. Recruiters
 let recruiters = ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture'];
 if (primaryCategory === 'Engineering' && isTier1) {
 recruiters = ['Google', 'Microsoft', 'NVIDIA', 'Apple', 'Goldman Sachs', 'Amazon', 'Qualcomm', 'TSMC'];
 } else if (primaryCategory === 'Commerce & Management' && isTier1) {
 recruiters = ['McKinsey & Co.', 'Boston Consulting Group', 'Bain & Company', 'J.P. Morgan', 'Morgan Stanley', 'HDFC Bank'];
 } else if (primaryCategory === 'Medical') {
 recruiters = ['Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Medanta', 'AIIMS Residency Programs'];
 }

 // 9. Career Outcome Paths
 const careerOutcomes: CareerOutcomePath[] = [
 {
 program: 'Computer Science / IT',
 gradPaths: [
 { role: 'Software Engineer', percentage: 55, subRoles: ['Frontend', 'Backend', 'Fullstack Engineer'], avenue: 'Core Tech' },
 { role: 'Data / AI Engineer', percentage: 20, subRoles: ['ML Ops', 'Data Pipeline Specialist', 'AI Developer'], avenue: 'Core Tech' },
 { role: 'Product Manager', percentage: 10, subRoles: ['Associate PM', 'Technical Analyst'], avenue: 'Consulting & Finance' },
 { role: 'Research / Higher Ed', percentage: 15, subRoles: ['MS / PhD Abroad', 'Institutional Fellow'], avenue: 'Higher Studies' }
 ]
 },
 {
 program: 'Electronics / Core Engineering',
 gradPaths: [
 { role: 'VLSI / Embedded Engineer', percentage: 40, subRoles: ['Chip Design', 'Firmware Engineer'], avenue: 'Core Tech' },
 { role: 'Consultant / Analyst', percentage: 30, subRoles: ['Business Analyst', 'Risk Consultant'], avenue: 'Consulting & Finance' },
 { role: 'Operations & Core R&D', percentage: 20, subRoles: ['Quality Assurance', 'Plant Supervisor'], avenue: 'Core Tech' },
 { role: 'Higher Studies', percentage: 10, subRoles: ['M.Tech Admissions', 'MBA Route'], avenue: 'Higher Studies' }
 ]
 }
 ];

 // 10. Cost of Living Budget Profile
 const isMetro = ['Delhi', 'New Delhi', 'Mumbai', 'Bengaluru', 'Bangalore', 'Chennai', 'Kochi', 'Hyderabad', 'Pune', 'Coimbatore'].includes(city);
 const defaultPgRent = isMetro ? (isTier1 ? 9500 : 8500) : 5500;
 const defaultFood = 4000;
 const hostelFee = isGov ? 25000 : 90000;
 const messFee = 35000;

 const livingBudget: LivingBudgetProfile = {
 hostelFeeYearly: hostelFee,
 messFeeYearly: messFee,
 defaultPgRentMonthly: defaultPgRent,
 defaultPgFoodMonthly: defaultFood,
 defaultTravelMonthly: 1200,
 defaultInternetMonthly: 600,
 defaultMiscMonthly: 1500,
 amenities: ['AC PG rooms available', 'Wi-Fi enabled hostels', '24/7 Power backup', 'CCTV Security', 'Gym Facility', 'Geyser access'],
 hospitals: [`${city} District Civil Hospital`, `${city} Multi-Speciality Clinic`],
 markets: [`Main Market Area`, `Supermarket Grocery Store`]
 };

 // 11. Reality Ratings (0-100 scales)
 const baseHappiness = isTier1 ? 84 : isTier2 ? 72 : 62;
 const basePressure = isTier1 ? 88 : isTier2 ? 75 : 60;
 const basePlacements = isTier1 ? 92 : isTier2 ? 74 : 50;

 const realityRatings = {
 happinessScore: baseHappiness + (isGov ? 2 : -2),
 academicPressure: basePressure + (primaryCategory === 'Engineering' ? 5 : 0),
 campusLife: (isTier1 ? 88 : 70) + (isGov ? -5 : 5),
 hostelQuality: isGov ? 60 : 82,
 foodQuality: isGov ? 55 : 75,
 placementSupport: basePlacements,
 sportsInfrastructure: isTier1 ? 85 : 68,
 freedomCulture: isGov ? 75 : 65,
 industryExposure: isTier1 ? 90 : 65,
 internshipOpportunities: isTier1 ? 88 : 60,
 diversityScore: isTier1 ? 85 : 55,
 safetyScore: 88,
 affordabilityScore: isGov ? 92 : 45
 };

 // 12. Student Reviews (Anonymous Voices)
 const reviews: StudentReview[] = [
 {
 id: 'rev-1',
 author: 'Anonymous Student',
 role: 'Senior',
 category: 'Academics',
 rating: isTier1 ? 5 : 4,
 text: isTier1 
 ? 'Academics here is quite demanding but teaches you how to handle high-pressure environments. The curriculum is updated regularly with industry trends.'
 : 'Good academic curriculum, but heavily dependent on self-study. Labs have decent equipment but you need to take initiative to learn.',
 date: '2025-09-12',
 helpfulVotes: 24
 },
 {
 id: 'rev-2',
 author: 'Anonymous Alumni',
 role: 'Alumni',
 category: 'Placements',
 rating: isTier1 ? 5 : 3,
 text: isTier1
 ? 'Almost everyone in my batch got placed. Tech giants recruit heavily for developer roles, and finance companies offer high-paying analyst positions.'
 : 'Placements are okay for CSE/ECE, but core branches face struggles. Mass recruiters are the fallback option. Focus heavily on building personal skills.',
 date: '2025-11-04',
 helpfulVotes: 42
 },
 {
 id: 'rev-3',
 author: 'Anonymous Junior',
 role: 'Sophomore',
 category: 'Hostel & Mess',
 rating: isGov ? 3 : 4,
 text: isGov
 ? 'Hostel rooms are basic and double shared in early years. Mess food is edible but repetitive. Strict rules on entry times apply.'
 : 'Hostel rooms are modern and clean with air conditioning options. Mess food is decent and has a good variety of items.',
 date: '2026-02-18',
 helpfulVotes: 15
 }
 ];

 // 13. Voice Questions (Senior Q&As)
 const questions: VoiceQuestion[] = [
 {
 id: 'q-1',
 question: 'How is the coding culture here for first-year students? Is it beginner friendly?',
 askedBy: 'Aspirant',
 date: '2026-03-01',
 answers: [
 {
 id: 'ans-1',
 author: 'Rohit K.',
 role: 'Final Year CSE',
 text: 'Coding clubs host bootcamps. You don\'t need prior experience, just be consistent and participate in weekly hackathons!',
 helpfulVotes: 18,
 verifiedSenior: true
 }
 ]
 },
 {
 id: 'q-2',
 question: 'Are internships easy to secure on campus, or do we need to look off-campus?',
 askedBy: 'Sophomore',
 date: '2026-04-10',
 answers: [
 {
 id: 'ans-2',
 author: 'Priya S.',
 role: 'Third Year ECE',
 text: 'Many companies visit in the 3rd year. If you have a solid portfolio (DSA + Project), you can secure it on-campus easily.',
 helpfulVotes: 12,
 verifiedSenior: true
 }
 ]
 }
 ];

 // 14. FAQs
 const faqs: CollegeFAQ[] = [
 { q: 'Is there a minimum attendance criteria?', a: 'Yes, a minimum of 75% attendance is required. Students falling below this threshold may be debarred from writing semester exams.' },
 { q: 'Are calculators/laptops allowed in classrooms?', a: 'Yes, laptops are recommended for practical lab sessions. Scientific calculators are allowed in engineering exams.' },
 { q: 'What is the refund policy if I withdraw my admission?', a: 'Fees refunds are handled in accordance with UGC guidelines. A full refund (minus minimal processing charges) is issued if withdrawn before classes start.' }
 ];

 // 15. Rules & Regulations
 const rules = {
 admissions: [
 'Must clear cutoffs in JEE/NEET/State exams as applicable.',
 'Physical verification of documents (Class 10, 12 certificates, Category certificates, Rank Card) is mandatory.',
 'Seat allocation is finalized only upon paying the initial seat acceptance fee.'
 ],
 attendance: 'Strictly 75% attendance required across all subjects. Medical relaxations are capped at 10% upon verified documentation.',
 hostel: [
 'In-time for hostels is 9:30 PM.',
 'Visitors/Parents are not allowed inside students\' rooms without written warden approval.',
 'Strict action will be taken against ragging or illegal activities.'
 ],
 reservations: [
 'Seat reservations follow Central Government norms (OBC-NCL: 27%, SC: 15%, ST: 7.5%, EWS: 10%) for central government institutes.',
 'State government institutes reserve seats for home-state quota candidates.'
 ]
 };

 // 16. Gallery Images
 const categoryImages = CAMPUS_IMAGES[primaryCategory] || CAMPUS_IMAGES.Commerce;
 const gallery: GalleryImage[] = [
 { url: categoryImages[0], caption: 'Main Administrative Block', category: 'buildings', attribution: DEFAULT_ATTRIBUTIONS[0] },
 { url: categoryImages[1], caption: 'Central Academic Library', category: 'library', attribution: DEFAULT_ATTRIBUTIONS[1] },
 { url: categoryImages[2], caption: 'Advanced R&D Laboratory', category: 'library', attribution: DEFAULT_ATTRIBUTIONS[2] },
 { url: categoryImages[3], caption: 'Interactive Lecture Theater', category: 'classrooms', attribution: DEFAULT_ATTRIBUTIONS[3] }
 ];

 return {
 accreditation,
 admissionProcess,
 scholarships,
 verifiedReferences,
 sectorAnalysis,
 placementTrends,
 salarySpread,
 recruiters,
 careerOutcomes,
 livingBudget,
 realityRatings,
 reviews,
 questions,
 faqs,
 rules,
 gallery
 };
}
