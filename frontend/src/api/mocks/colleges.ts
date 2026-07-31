import type { Stream, CollegeCategory, Ownership, Tier, Subject, College, TransitNode } from '../../types/college';

/**
 * colleges.ts
 *
 * WHAT THIS FILE DOES:
 *   Contains the complete database of colleges in the app.
 *   This is the single source of truth for all college information.
 *
 * WHY IT EXISTS:
 *   Instead of fetching from a real API, this app stores all data locally.
 *   This makes it fast and works offline, but limits the data to what's
 *   hardcoded here. In a real app, this would be replaced by API calls.
 *
 * KEY CONCEPTS:
 *   - `colleges`: Array of curated college objects with complete details
 *   - `getCollegeById`: Helper function to find a college by ID
 *   - `getFilteredColleges`: Applies filters to the college list
 *   - `getRelatedColleges`: Finds similar colleges based on stream/type
 *   - Each college has: name, location, fees, ranking, courses, facilities, etc.
 */
export type { Stream, CollegeCategory, Ownership, Tier, Subject, College, TransitNode };

export const categoryColors: Record<CollegeCategory, string> = {
  Engineering: '#67d6ff',
  Medical: '#ff8c6a',
  'Arts & Humanities': '#f4ca78',
  'Commerce & Management': '#8ef0b6',
  Law: '#c7b5ff',
  Design: '#ff98c3',
};

export const streamOptions: Stream[] = ['MPC', 'BiPC', 'Commerce', 'Arts'];

export const categoryOptions: CollegeCategory[] = [
  'Engineering',
  'Medical',
  'Arts & Humanities',
  'Commerce & Management',
  'Law',
  'Design',
];

export const tierOptions: Tier[] = ['Tier 1', 'Tier 2', 'Tier 3'];
export const ownershipOptions: Ownership[] = ['Private'];

export const subjectOptions: Subject[] = [
  'Math',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Economics',
  'Accountancy',
  'Business Studies',
  'Literature',
  'History',
  'Psychology',
  'Political Science',
  'Sociology',
  'Design',
  'Fine Arts',
];

export const defaultGoalsByStream: Record<Stream, CollegeCategory[]> = {
  MPC: ['Engineering', 'Design'],
  BiPC: ['Medical'],
  Commerce: ['Commerce & Management'],
  Arts: ['Arts & Humanities', 'Law'],
};

export const defaultSubjectsByStream: Record<Stream, Subject[]> = {
  MPC: ['Math', 'Physics', 'Computer Science'],
  BiPC: ['Biology', 'Chemistry', 'Psychology'],
  Commerce: ['Economics', 'Accountancy', 'Business Studies'],
  Arts: ['Literature', 'Political Science', 'Psychology'],
};

// =============================================================================
// CURATED COLLEGE DATABASE
// VIT campuses + SRM campuses + BITS + Manipal campuses + Law + Medical
// =============================================================================

export const colleges: College[] = [
  // ============================================================
  // VIT CAMPUSES (4)
  // ============================================================
  {
    id: 'vit-vellore',
    name: 'VIT Vellore',
    shortName: 'VIT',
    nirfRank: 12,
    establishedYear: 1984,
    city: 'Vellore',
    state: 'Tamil Nadu',
    lat: 12.97,
    lng: 79.16,
    cluster: 'Vellore',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Design'],
    tier: 'Tier 1',
    ownership: 'Private',
    annualFeeLpa: 3.5,
    avgPackageLpa: 12.5,
    highestPackageLpa: 1.5,
    hostelAvailable: true,
    campusSize: '360 acres',
    facultyCount: 1800,
    researchOutput: 'High',
    studentRating: 4.3,
    communityStats: { totalReviews: 5000, averageRating: 4.3, campusConfessions: 1200, qaThreads: 2000 },
    entranceExams: ['VITEEE', 'JEE Main'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Design'],
    programs: ['Computer Science', 'IT', 'Electronics', 'Mechanical', 'Civil', 'Fashion Technology'],
    vibe: 'Massive private campus with global exposure, vibrant fests, and strong placements.',
    boardComfort: 89,
    website: 'https://vit.ac.in',
    transit: {
      airport: { name: 'Chennai International', distanceKm: 130, travelTimeMinutes: 150, estimatedCostInr: 1800, distance: '130 km', time: '2.5 hr', cost: '₹1,800' },
      railway: { name: 'Katpadi Junction', distanceKm: 2, travelTimeMinutes: 8, estimatedCostInr: 50, distance: '2 km', time: '8 min', cost: '₹50' },
      cityCenter: { distance: '2 km', time: '8 min' },
      cityDistance: '2 km',
      convenienceScore: 8.5,
    },
  },
  {
    id: 'vit-ap',
    name: 'VIT Andhra Pradesh',
    shortName: 'VIT-AP',
    nirfRank: 28,
    establishedYear: 2017,
    city: 'Amaravati',
    state: 'Andhra Pradesh',
    lat: 16.51,
    lng: 80.52,
    cluster: 'Amaravati',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Design'],
    tier: 'Tier 1',
    ownership: 'Private',
    annualFeeLpa: 3.8,
    avgPackageLpa: 10.5,
    highestPackageLpa: 1.2,
    hostelAvailable: true,
    campusSize: '200 acres',
    facultyCount: 400,
    researchOutput: 'High',
    studentRating: 4.2,
    communityStats: { totalReviews: 1500, averageRating: 4.2, campusConfessions: 350, qaThreads: 600 },
    entranceExams: ['VITEEE', 'JEE Main'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Design'],
    programs: ['Computer Science', 'IT', 'Electronics', 'Mechanical', 'Civil', 'Design'],
    vibe: 'Modern campus with global curriculum, strong research focus, and international collaborations.',
    boardComfort: 87,
    website: 'https://vitap.ac.in',
    transit: {
      airport: { name: 'Vijayawada Airport', distanceKm: 50, travelTimeMinutes: 70, estimatedCostInr: 800, distance: '50 km', time: '70 min', cost: '₹800' },
      railway: { name: 'Vijayawada Junction', distanceKm: 40, travelTimeMinutes: 55, estimatedCostInr: 500, distance: '40 km', time: '55 min', cost: '₹500' },
      cityCenter: { distance: '40 km', time: '55 min' },
      cityDistance: '40 km',
      convenienceScore: 7.0,
    },
  },
  {
    id: 'vit-bhopal',
    name: 'VIT Bhopal',
    shortName: 'VIT-B',
    nirfRank: 35,
    establishedYear: 2017,
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    lat: 23.26,
    lng: 77.41,
    cluster: 'Bhopal',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Private',
    annualFeeLpa: 3.6,
    avgPackageLpa: 9.5,
    highestPackageLpa: 1.0,
    hostelAvailable: true,
    campusSize: '250 acres',
    facultyCount: 350,
    researchOutput: 'High',
    studentRating: 4.1,
    communityStats: { totalReviews: 1200, averageRating: 4.1, campusConfessions: 280, qaThreads: 500 },
    entranceExams: ['VITEEE', 'JEE Main'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'IT', 'Electronics', 'Mechanical', 'Civil'],
    vibe: 'Modern campus with CALTech-inspired curriculum and strong industry connect.',
    boardComfort: 86,
    website: 'https://vitbhopal.ac.in',
    transit: {
      airport: { name: 'Raja Bhoj Airport', distanceKm: 20, travelTimeMinutes: 30, estimatedCostInr: 400, distance: '20 km', time: '30 min', cost: '₹400' },
      railway: { name: 'Bhopal Junction', distanceKm: 15, travelTimeMinutes: 22, estimatedCostInr: 250, distance: '15 km', time: '22 min', cost: '₹250' },
      cityCenter: { distance: '15 km', time: '22 min' },
      cityDistance: '15 km',
      convenienceScore: 7.8,
    },
  },
  {
    id: 'vit-chennai',
    name: 'VIT Chennai',
    shortName: 'VIT-C',
    nirfRank: 25,
    establishedYear: 2010,
    city: 'Chennai',
    state: 'Tamil Nadu',
    lat: 12.84,
    lng: 80.15,
    cluster: 'Chennai',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Design'],
    tier: 'Tier 1',
    ownership: 'Private',
    annualFeeLpa: 3.7,
    avgPackageLpa: 11.0,
    highestPackageLpa: 1.3,
    hostelAvailable: true,
    campusSize: '180 acres',
    facultyCount: 500,
    researchOutput: 'High',
    studentRating: 4.2,
    communityStats: { totalReviews: 2000, averageRating: 4.2, campusConfessions: 450, qaThreads: 800 },
    entranceExams: ['VITEEE', 'JEE Main'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Design'],
    programs: ['Computer Science', 'IT', 'Electronics', 'Mechanical', 'Civil', 'Fashion Technology'],
    vibe: 'Coastal campus with strong industry ties and vibrant cultural scene.',
    boardComfort: 88,
    website: 'https://chennai.vit.ac.in',
    transit: {
      airport: { name: 'Chennai International', distanceKm: 45, travelTimeMinutes: 55, estimatedCostInr: 700, distance: '45 km', time: '55 min', cost: '₹700' },
      railway: { name: 'Chengalpattu Railway Station', distanceKm: 8, travelTimeMinutes: 15, estimatedCostInr: 100, distance: '8 km', time: '15 min', cost: '₹100' },
      cityCenter: { distance: '25 km', time: '40 min' },
      cityDistance: '25 km',
      convenienceScore: 8.0,
    },
  },

  // ============================================================
  // SRM CAMPUSES (2)
  // ============================================================
  {
    id: 'srm-chennai',
    name: 'SRM University Chennai',
    shortName: 'SRM',
    nirfRank: 18,
    establishedYear: 1985,
    city: 'Chennai',
    state: 'Tamil Nadu',
    lat: 12.82,
    lng: 80.04,
    cluster: 'Chennai',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Medical', 'Arts & Humanities'],
    tier: 'Tier 1',
    ownership: 'Private',
    annualFeeLpa: 4.0,
    avgPackageLpa: 11.0,
    highestPackageLpa: 1.2,
    hostelAvailable: true,
    campusSize: '250 acres',
    facultyCount: 1500,
    researchOutput: 'High',
    studentRating: 4.2,
    communityStats: { totalReviews: 4500, averageRating: 4.2, campusConfessions: 1000, qaThreads: 1800 },
    entranceExams: ['SRMJEEE', 'NEET', 'JEE Main'],
    streams: ['MPC', 'BiPC', 'Arts'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Biology', 'Literature'],
    programs: ['Computer Science', 'Mechanical', 'Civil', 'MBBS', 'BBA', 'Law'],
    vibe: 'Diverse private university with medical, engineering, and liberal arts programs.',
    boardComfort: 88,
    website: 'https://www.srmist.edu.in',
    transit: {
      airport: { name: 'Chennai International', distanceKm: 35, travelTimeMinutes: 45, estimatedCostInr: 600, distance: '35 km', time: '45 min', cost: '₹600' },
      railway: { name: 'Potheri Railway Station', distanceKm: 2, travelTimeMinutes: 8, estimatedCostInr: 50, distance: '2 km', time: '8 min', cost: '₹50' },
      cityCenter: { distance: '25 km', time: '40 min' },
      cityDistance: '25 km',
      convenienceScore: 8.5,
    },
  },
  {
    id: 'srm-ap',
    name: 'SRM University Andhra Pradesh',
    shortName: 'SRM-AP',
    nirfRank: 32,
    establishedYear: 2017,
    city: 'Guntur',
    state: 'Andhra Pradesh',
    lat: 16.43,
    lng: 80.57,
    cluster: 'Guntur',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Medical', 'Arts & Humanities'],
    tier: 'Tier 1',
    ownership: 'Private',
    annualFeeLpa: 3.5,
    avgPackageLpa: 9.0,
    highestPackageLpa: 1.0,
    hostelAvailable: true,
    campusSize: '200 acres',
    facultyCount: 600,
    researchOutput: 'High',
    studentRating: 4.1,
    communityStats: { totalReviews: 1000, averageRating: 4.1, campusConfessions: 250, qaThreads: 450 },
    entranceExams: ['SRMJEEE', 'NEET', 'JEE Main'],
    streams: ['MPC', 'BiPC', 'Arts'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Biology', 'Literature'],
    programs: ['Computer Science', 'Mechanical', 'Civil', 'MBBS', 'BBA', 'Law'],
    vibe: 'Modern campus with interdisciplinary programs and strong research focus.',
    boardComfort: 86,
    website: 'https://srmap.edu.in',
    transit: {
      airport: { name: 'Vijayawada Airport', distanceKm: 55, travelTimeMinutes: 75, estimatedCostInr: 900, distance: '55 km', time: '75 min', cost: '₹900' },
      railway: { name: 'Guntur Railway Station', distanceKm: 15, travelTimeMinutes: 25, estimatedCostInr: 200, distance: '15 km', time: '25 min', cost: '₹200' },
      cityCenter: { distance: '15 km', time: '25 min' },
      cityDistance: '15 km',
      convenienceScore: 7.5,
    },
  },

  // ============================================================
  // BITS + MANIPAL CAMPUSES (5)
  // ============================================================
  {
    id: 'bits-pilani',
    name: 'BITS Pilani',
    shortName: 'BITS',
    nirfRank: 13,
    establishedYear: 1964,
    city: 'Pilani',
    state: 'Rajasthan',
    lat: 28.36,
    lng: 75.59,
    cluster: 'Pilani',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Commerce & Management', 'Arts & Humanities'],
    tier: 'Tier 1',
    ownership: 'Private',
    annualFeeLpa: 5.5,
    avgPackageLpa: 22.0,
    highestPackageLpa: 1.8,
    hostelAvailable: true,
    campusSize: '328 acres',
    facultyCount: 400,
    researchOutput: 'High',
    studentRating: 4.6,
    communityStats: { totalReviews: 3500, averageRating: 4.6, campusConfessions: 900, qaThreads: 1500 },
    entranceExams: ['BITSAT', 'JEE Main'],
    streams: ['MPC', 'Arts'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Economics', 'Psychology'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Chemical', 'Economics', 'Pharmacy'],
    vibe: 'No attendance rule, strong coding culture, and legendary alumni network.',
    boardComfort: 92,
    website: 'https://www.bits-pilani.ac.in',
    transit: {
      airport: { name: 'Indira Gandhi International, Delhi', distanceKm: 200, travelTimeMinutes: 240, estimatedCostInr: 3000, distance: '200 km', time: '4 hr', cost: '₹3,000' },
      railway: { name: 'Loharu Junction', distanceKm: 25, travelTimeMinutes: 40, estimatedCostInr: 300, distance: '25 km', time: '40 min', cost: '₹300' },
      cityCenter: { distance: '25 km', time: '40 min' },
      cityDistance: '25 km',
      convenienceScore: 6.0,
    },
  },
  {
    id: 'manipal',
    name: 'Manipal Academy of Higher Education',
    shortName: 'MAHE',
    nirfRank: 16,
    establishedYear: 1953,
    city: 'Manipal',
    state: 'Karnataka',
    lat: 13.35,
    lng: 74.78,
    cluster: 'Manipal',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Medical', 'Commerce & Management', 'Arts & Humanities'],
    tier: 'Tier 1',
    ownership: 'Private',
    annualFeeLpa: 6.0,
    avgPackageLpa: 14.0,
    highestPackageLpa: 1.5,
    hostelAvailable: true,
    campusSize: '600 acres',
    facultyCount: 1200,
    researchOutput: 'High',
    studentRating: 4.4,
    communityStats: { totalReviews: 4000, averageRating: 4.4, campusConfessions: 950, qaThreads: 1600 },
    entranceExams: ['MET', 'NEET', 'JEE Main', 'CAT'],
    streams: ['MPC', 'BiPC', 'Commerce', 'Arts'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Biology', 'Economics', 'Literature', 'Psychology'],
    programs: ['Computer Science', 'Engineering', 'MBBS', 'BBA', 'Architecture', 'Media', 'Psychology'],
    vibe: 'Tropical campus with world-class medical school and international student body.',
    boardComfort: 90,
    website: 'https://manipal.edu',
    transit: {
      airport: { name: 'Mangalore International', distanceKm: 65, travelTimeMinutes: 90, estimatedCostInr: 1200, distance: '65 km', time: '90 min', cost: '₹1,200' },
      railway: { name: 'Udupi Railway Station', distanceKm: 5, travelTimeMinutes: 12, estimatedCostInr: 100, distance: '5 km', time: '12 min', cost: '₹100' },
      cityCenter: { distance: '5 km', time: '12 min' },
      cityDistance: '5 km',
      convenienceScore: 7.5,
    },
  },
  {
    id: 'manipal-jaipur',
    name: 'Manipal University Jaipur',
    shortName: 'MUJ',
    nirfRank: 38,
    establishedYear: 2011,
    city: 'Jaipur',
    state: 'Rajasthan',
    lat: 26.85,
    lng: 75.65,
    cluster: 'Jaipur',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Commerce & Management', 'Arts & Humanities', 'Law'],
    tier: 'Tier 1',
    ownership: 'Private',
    annualFeeLpa: 5.5,
    avgPackageLpa: 10.0,
    highestPackageLpa: 1.2,
    hostelAvailable: true,
    campusSize: '300 acres',
    facultyCount: 400,
    researchOutput: 'High',
    studentRating: 4.2,
    communityStats: { totalReviews: 2000, averageRating: 4.2, campusConfessions: 450, qaThreads: 800 },
    entranceExams: ['MET', 'JEE Main', 'CAT', 'CLAT'],
    streams: ['MPC', 'Commerce', 'Arts'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Economics', 'Literature', 'Psychology'],
    programs: ['Computer Science', 'Engineering', 'BBA', 'Law', 'Architecture', 'Design', 'Media'],
    vibe: 'Desert campus with modern infrastructure and strong industry connections in Rajasthan.',
    boardComfort: 87,
    website: 'https://jaipur.manipal.edu',
    transit: {
      airport: { name: 'Jaipur International', distanceKm: 30, travelTimeMinutes: 45, estimatedCostInr: 600, distance: '30 km', time: '45 min', cost: '₹600' },
      railway: { name: 'Jaipur Junction', distanceKm: 25, travelTimeMinutes: 40, estimatedCostInr: 400, distance: '25 km', time: '40 min', cost: '₹400' },
      cityCenter: { distance: '25 km', time: '40 min' },
      cityDistance: '25 km',
      convenienceScore: 7.8,
    },
  },
  {
    id: 'manipal-bangalore',
    name: 'Manipal Academy of Higher Education Bangalore',
    shortName: 'MAHE-BLR',
    nirfRank: 40,
    establishedYear: 2012,
    city: 'Bengaluru',
    state: 'Karnataka',
    lat: 12.95,
    lng: 77.57,
    cluster: 'Bengaluru',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Medical', 'Commerce & Management', 'Arts & Humanities'],
    tier: 'Tier 1',
    ownership: 'Private',
    annualFeeLpa: 6.5,
    avgPackageLpa: 12.0,
    highestPackageLpa: 1.4,
    hostelAvailable: true,
    campusSize: '150 acres',
    facultyCount: 500,
    researchOutput: 'High',
    studentRating: 4.3,
    communityStats: { totalReviews: 1500, averageRating: 4.3, campusConfessions: 350, qaThreads: 650 },
    entranceExams: ['MET', 'NEET', 'JEE Main', 'CAT'],
    streams: ['MPC', 'BiPC', 'Commerce', 'Arts'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Biology', 'Economics', 'Literature', 'Psychology'],
    programs: ['Computer Science', 'Engineering', 'MBBS', 'BBA', 'Architecture', 'Media', 'Psychology'],
    vibe: 'Tech city campus with strong industry connections and startup ecosystem.',
    boardComfort: 88,
    website: 'https://bangalore.manipal.edu',
    transit: {
      airport: { name: 'Kempegowda International', distanceKm: 35, travelTimeMinutes: 50, estimatedCostInr: 600, distance: '35 km', time: '50 min', cost: '₹600' },
      railway: { name: 'Bengaluru City Railway Station', distanceKm: 8, travelTimeMinutes: 15, estimatedCostInr: 200, distance: '8 km', time: '15 min', cost: '₹200' },
      metro: { name: 'Jayanagar', distanceKm: 3, travelTimeMinutes: 8, distance: '3 km', time: '8 min' },
      cityCenter: { distance: '8 km', time: '15 min' },
      cityDistance: '8 km',
      convenienceScore: 8.5,
    },
  },

  // ============================================================
  // LAW COLLEGES (3)
  // ============================================================
  {
    id: 'jindal-law',
    name: 'Jindal Global Law School',
    shortName: 'JGLS',
    nirfRank: 1,
    establishedYear: 2009,
    city: 'Sonipat',
    state: 'Haryana',
    lat: 28.99,
    lng: 77.09,
    cluster: 'Delhi NCR',
    primaryCategory: 'Law',
    categories: ['Law'],
    tier: 'Tier 1',
    ownership: 'Private',
    annualFeeLpa: 8.5,
    avgPackageLpa: 16.0,
    highestPackageLpa: 1.5,
    hostelAvailable: true,
    campusSize: '80 acres',
    facultyCount: 200,
    researchOutput: 'High',
    studentRating: 4.4,
    communityStats: { totalReviews: 1200, averageRating: 4.4, campusConfessions: 300, qaThreads: 500 },
    entranceExams: ['LSAT India', 'CLAT', 'Jindal Scholastic Aptitude Test'],
    streams: ['Arts'],
    subjects: ['Literature', 'Political Science', 'History', 'Psychology'],
    programs: ['BA LLB', 'BBA LLB', 'LLM', 'PhD Law'],
    vibe: 'World-class law school with global faculty and moot court dominance.',
    boardComfort: 90,
    website: 'https://www.jgls.edu.in',
    transit: {
      airport: { name: 'Indira Gandhi International', distanceKm: 50, travelTimeMinutes: 60, estimatedCostInr: 800, distance: '50 km', time: '60 min', cost: '₹800' },
      railway: { name: 'Sonipat Railway Station', distanceKm: 15, travelTimeMinutes: 25, estimatedCostInr: 200, distance: '15 km', time: '25 min', cost: '₹200' },
      cityCenter: { distance: '15 km', time: '25 min' },
      cityDistance: '15 km',
      convenienceScore: 7.5,
    },
  },

  {
    id: 'cmc-vellore',
    name: 'CMC Vellore',
    shortName: 'CMC',
    nirfRank: 3,
    establishedYear: 1900,
    city: 'Vellore',
    state: 'Tamil Nadu',
    lat: 12.91,
    lng: 79.13,
    cluster: 'Vellore',
    primaryCategory: 'Medical',
    categories: ['Medical'],
    tier: 'Tier 1',
    ownership: 'Private',
    annualFeeLpa: 1.5,
    avgPackageLpa: 15.0,
    highestPackageLpa: 0.9,
    hostelAvailable: true,
    campusSize: '200 acres',
    facultyCount: 500,
    researchOutput: 'Very High',
    studentRating: 4.7,
    communityStats: { totalReviews: 2000, averageRating: 4.7, campusConfessions: 500, qaThreads: 900 },
    entranceExams: ['NEET UG', 'NEET PG', 'CMC Entrance'],
    streams: ['BiPC'],
    subjects: ['Biology', 'Chemistry', 'Physics', 'Psychology'],
    programs: ['MBBS', 'MD', 'MS', 'BSc Nursing', 'Allied Health', 'MSc'],
    vibe: 'Legendary medical institution with global reputation and missionary values.',
    boardComfort: 94,
    website: 'https://www.cmcvellore.ac.in',
    transit: {
      airport: { name: 'Chennai International', distanceKm: 140, travelTimeMinutes: 150, estimatedCostInr: 1800, distance: '140 km', time: '2.5 hr', cost: '₹1,800' },
      railway: { name: 'Katpadi Junction', distanceKm: 3, travelTimeMinutes: 8, estimatedCostInr: 50, distance: '3 km', time: '8 min', cost: '₹50' },
      cityCenter: { distance: '3 km', time: '8 min' },
      cityDistance: '3 km',
      convenienceScore: 8.5,
    },
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/** Find a college by its unique ID string. Returns undefined if not found. */
export function getCollegeById(id: string): College | undefined {
  return colleges.find(c => c.id === id);
}

/** Find a college by its short name (e.g., "IITB", "BITS"). Returns undefined if not found. */
export function getCollegeByShortName(shortName: string): College | undefined {
  return colleges.find(c => c.shortName === shortName);
}

/** Find all colleges in a given state. */
export function getCollegesByState(state: string): College[] {
  return colleges.filter(c => c.state === state);
}

/** Find all colleges in a given category (e.g., "Engineering", "Medical"). */
export function getCollegesByCategory(category: CollegeCategory): College[] {
  return colleges.filter(c => c.categories.includes(category));
}

/** Find all colleges in a given tier (e.g., "Tier 1", "Tier 2"). */
export function getCollegesByTier(tier: Tier): College[] {
  return colleges.filter(c => c.tier === tier);
}

/** Find all colleges with a given ownership type (e.g., "Government", "Private"). */
export function getCollegesByOwnership(ownership: Ownership): College[] {
  return colleges.filter(c => c.ownership === ownership);
}

/** Find all colleges within a fee range (in lakhs per year). */
export function getCollegesByFeeRange(minFee: number, maxFee: number): College[] {
  return colleges.filter(c => c.annualFeeLpa >= minFee && c.annualFeeLpa <= maxFee);
}

/** Find all colleges that accept a given entrance exam. */
export function getCollegesByEntranceExam(exam: string): College[] {
  return colleges.filter(c => c.entranceExams.includes(exam));
}

/** Find all colleges that teach a given stream. */
export function getCollegesByStream(stream: Stream): College[] {
  return colleges.filter(c => c.streams.includes(stream));
}

/** Find all colleges that teach a given subject. */
export function getCollegesBySubject(subject: Subject): College[] {
  return colleges.filter(c => c.subjects.includes(subject));
}

/** Find all colleges that offer a given program. */
export function getCollegesByProgram(program: string): College[] {
  return colleges.filter(c => c.programs.some(p => p.toLowerCase().includes(program.toLowerCase())));
}

/** Find all colleges near a given city (within a cluster). */
export function getCollegesByCluster(cluster: string): College[] {
  return colleges.filter(c => c.cluster === cluster);
}

/** Find colleges ranked in the top N by NIRF. */
export function getTopRankedColleges(n: number): College[] {
  return colleges
    .filter(c => c.nirfRank !== undefined)
    .sort((a, b) => (a.nirfRank || 999) - (b.nirfRank || 999))
    .slice(0, n);
}

/** Find colleges with highest average placement packages. */
export function getTopPlacementColleges(n: number): College[] {
  return colleges
    .sort((a, b) => b.avgPackageLpa - a.avgPackageLpa)
    .slice(0, n);
}

/** Find colleges with lowest annual fees. */
export function getMostAffordableColleges(n: number): College[] {
  return colleges
    .sort((a, b) => a.annualFeeLpa - b.annualFeeLpa)
    .slice(0, n);
}

/** Find colleges with highest board comfort score. */
export function getMostComfortableColleges(n: number): College[] {
  return colleges
    .sort((a, b) => b.boardComfort - a.boardComfort)
    .slice(0, n);
}

/** Find colleges with hostel availability. */
export function getCollegesWithHostel(): College[] {
  return colleges.filter(c => c.hostelAvailable === true);
}

/** Find colleges without hostel availability. */
export function getCollegesWithoutHostel(): College[] {
  return colleges.filter(c => c.hostelAvailable === false);
}

/** Find colleges by name search (case-insensitive partial match). */
export function searchCollegesByName(query: string): College[] {
  const q = query.toLowerCase();
  return colleges.filter(c =>
    c.name.toLowerCase().includes(q) ||
    (c.shortName && c.shortName.toLowerCase().includes(q))
  );
}

/** Find colleges with a specific facility (e.g., "Library", "Sports Complex"). */
export function getCollegesByFacility(_facilityName: string): College[] {
  return colleges; // All colleges have facilities; for a real app, you'd filter by facility array
}

/** Find colleges within a given radius (km) from a point (lat, lng). */
export function getCollegesWithinRadius(lat: number, lng: number, radiusKm: number): College[] {
  return colleges.filter(c => {
    const dLat = c.lat - lat;
    const dLng = c.lng - lng;
    const distance = Math.sqrt(dLat * dLat + dLng * dLng) * 111; // rough km conversion
    return distance <= radiusKm;
  });
}

/** Find colleges that match a given stream and category. */
export function getCollegesByStreamAndCategory(stream: Stream, category: CollegeCategory): College[] {
  return colleges.filter(c => c.streams.includes(stream) && c.categories.includes(category));
}

/** Find colleges that match a given tier and ownership. */
export function getCollegesByTierAndOwnership(tier: Tier, ownership: Ownership): College[] {
  return colleges.filter(c => c.tier === tier && c.ownership === ownership);
}

/** Find colleges that have a specific entrance exam and fee range. */
export function getCollegesByExamAndFee(exam: string, minFee: number, maxFee: number): College[] {
  return colleges.filter(c => c.entranceExams.includes(exam) && c.annualFeeLpa >= minFee && c.annualFeeLpa <= maxFee);
}

/** Find colleges that have a specific program and are in a specific state. */
export function getCollegesByProgramAndState(program: string, state: string): College[] {
  return colleges.filter(c =>
    c.programs.some(p => p.toLowerCase().includes(program.toLowerCase())) &&
    c.state === state
  );
}

/** Find colleges that are similar to a given college (same category, tier, or state). */
export function getRelatedColleges(collegeId: string, limit: number = 5): College[] {
  const college = getCollegeById(collegeId);
  if (!college) return [];

  return colleges
    .filter(c => c.id !== collegeId)
    .filter(c =>
      c.categories.some(cat => college.categories.includes(cat)) ||
      c.tier === college.tier ||
      c.state === college.state
    )
    .slice(0, limit);
}

/** Find all unique states in the college database. */
export function getAllStates(): string[] {
  return [...new Set(colleges.map(c => c.state))].sort();
}

/** Find all unique cities in the college database. */
export function getAllCities(): string[] {
  return [...new Set(colleges.map(c => c.city))].sort();
}

/** Find all unique clusters in the college database. */
export function getAllClusters(): string[] {
  return [...new Set(colleges.map(c => c.cluster))].sort();
}

/** Find all unique entrance exams in the college database. */
export function getAllEntranceExams(): string[] {
  const exams = new Set<string>();
  colleges.forEach(c => c.entranceExams.forEach(e => exams.add(e)));
  return [...exams].sort();
}

/** Find all unique programs in the college database. */
export function getAllPrograms(): string[] {
  const programs = new Set<string>();
  colleges.forEach(c => c.programs.forEach(p => programs.add(p)));
  return [...programs].sort();
}

/** Find all unique subjects in the college database. */
export function getAllSubjects(): Subject[] {
  const subjects = new Set<Subject>();
  colleges.forEach(c => c.subjects.forEach(s => subjects.add(s)));
  return [...subjects].sort();
}

/** Find all unique streams in the college database. */
export function getAllStreams(): Stream[] {
  const streams = new Set<Stream>();
  colleges.forEach(c => c.streams.forEach(s => streams.add(s)));
  return [...streams].sort();
}

/** Find all unique categories in the college database. */
export function getAllCategories(): CollegeCategory[] {
  const categories = new Set<CollegeCategory>();
  colleges.forEach(c => c.categories.forEach(cat => categories.add(cat)));
  return [...categories].sort();
}

/** Find all unique tiers in the college database. */
export function getAllTiers(): Tier[] {
  return [...new Set(colleges.map(c => c.tier))].sort();
}

/** Find all unique ownership types in the college database. */
export function getAllOwnerships(): Ownership[] {
  return [...new Set(colleges.map(c => c.ownership))].sort();
}

/** Find colleges with a specific combination of filters. */
export function getFilteredColleges(filters: {
  state?: string;
  city?: string;
  cluster?: string;
  category?: CollegeCategory;
  tier?: Tier;
  ownership?: Ownership;
  minFee?: number;
  maxFee?: number;
  entranceExam?: string;
  stream?: Stream;
  subject?: Subject;
  program?: string;
  hasHostel?: boolean;
  minNirfRank?: number;
  maxNirfRank?: number;
  searchQuery?: string;
}): College[] {
  let result = [...colleges];

  const category = filters.category;
  const tier = filters.tier;
  const ownership = filters.ownership;
  const state = filters.state;
  const city = filters.city;
  const cluster = filters.cluster;
  const entranceExam = filters.entranceExam;
  const stream = filters.stream;
  const subject = filters.subject;
  const program = filters.program;
  const minFee = filters.minFee;
  const maxFee = filters.maxFee;
  const hasHostel = filters.hasHostel;
  const minNirfRank = filters.minNirfRank;
  const maxNirfRank = filters.maxNirfRank;
  const searchQuery = filters.searchQuery;

  if (state) result = result.filter(c => c.state === state);
  if (city) result = result.filter(c => c.city === city);
  if (cluster) result = result.filter(c => c.cluster === cluster);
  if (category) result = result.filter(c => c.categories.includes(category));
  if (tier) result = result.filter(c => c.tier === tier);
  if (ownership) result = result.filter(c => c.ownership === ownership);
  if (minFee !== undefined) result = result.filter(c => c.annualFeeLpa >= minFee);
  if (maxFee !== undefined) result = result.filter(c => c.annualFeeLpa <= maxFee);
  if (entranceExam) result = result.filter(c => c.entranceExams.includes(entranceExam));
  if (stream) result = result.filter(c => c.streams.includes(stream));
  if (subject) result = result.filter(c => c.subjects.includes(subject));
  if (program) result = result.filter(c => c.programs.some(p => p.toLowerCase().includes(program.toLowerCase())));
  if (hasHostel !== undefined) result = result.filter(c => c.hostelAvailable === hasHostel);
  if (minNirfRank !== undefined) result = result.filter(c => (c.nirfRank || 999) >= minNirfRank);
  if (maxNirfRank !== undefined) result = result.filter(c => (c.nirfRank || 999) <= maxNirfRank);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    result = result.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.shortName && c.shortName.toLowerCase().includes(q)) ||
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q)
    );
  }

  return result;
}

/** Get statistics about the college database. */
export function getCollegeStats() {
  return {
    total: colleges.length,
    byCategory: {
      Engineering: colleges.filter(c => c.categories.includes('Engineering')).length,
      Medical: colleges.filter(c => c.categories.includes('Medical')).length,
      'Arts & Humanities': colleges.filter(c => c.categories.includes('Arts & Humanities')).length,
      'Commerce & Management': colleges.filter(c => c.categories.includes('Commerce & Management')).length,
      Law: colleges.filter(c => c.categories.includes('Law')).length,
      Design: colleges.filter(c => c.categories.includes('Design')).length,
    },
    byOwnership: {
      Private: colleges.filter(c => c.ownership === 'Private').length,
    },
    byTier: {
      'Tier 1': colleges.filter(c => c.tier === 'Tier 1').length,
      'Tier 2': colleges.filter(c => c.tier === 'Tier 2').length,
      'Tier 3': colleges.filter(c => c.tier === 'Tier 3').length,
    },
    avgFee: colleges.reduce((sum, c) => sum + c.annualFeeLpa, 0) / colleges.length,
    avgPackage: colleges.reduce((sum, c) => sum + c.avgPackageLpa, 0) / colleges.length,
    withHostel: colleges.filter(c => c.hostelAvailable).length,
    withoutHostel: colleges.filter(c => !c.hostelAvailable).length,
  };
}
