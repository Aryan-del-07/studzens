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
export const ownershipOptions: Ownership[] = ['Government', 'Private', 'Semi-Government'];

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
// All IITs + VIT campuses + SRM campuses + BITS + Manipal campuses + Law + Govt + Medical
// =============================================================================

export const colleges: College[] = [
  // ============================================================
  // ALL IITs (23)
  // ============================================================
  {
    id: 'iit-delhi',
    name: 'IIT Delhi',
    shortName: 'IITD',
    nirfRank: 2,
    establishedYear: 1961,
    city: 'New Delhi',
    state: 'Delhi',
    lat: 28.545,
    lng: 77.192,
    cluster: 'Delhi NCR',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Design'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.2,
    avgPackageLpa: 25.2,
    highestPackageLpa: 2.0,
    hostelAvailable: true,
    campusSize: '325 acres',
    facultyCount: 650,
    researchOutput: 'Very High',
    studentRating: 4.7,
    communityStats: { totalReviews: 3200, averageRating: 4.7, campusConfessions: 850, qaThreads: 1200 },
    entranceExams: ['JEE Advanced', 'CEED', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Design'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Textile', 'Design'],
    vibe: 'Deep-tech flagship with room for product and design crossovers.',
    boardComfort: 94,
    website: 'https://home.iitd.ac.in',
    transit: {
      airport: { name: 'Indira Gandhi International', distanceKm: 12, travelTimeMinutes: 25, estimatedCostInr: 350, distance: '12 km', time: '25 min', cost: '₹350' },
      railway: { name: 'New Delhi Railway Station', distanceKm: 15, travelTimeMinutes: 35, estimatedCostInr: 200, distance: '15 km', time: '35 min', cost: '₹200' },
      metro: { name: 'Hauz Khas', distanceKm: 2, travelTimeMinutes: 8, distance: '2 km', time: '8 min' },
      cityCenter: { distance: '12 km', time: '25 min' },
      cityDistance: '12 km',
      convenienceScore: 9.5,
    },
  },
  {
    id: 'iit-bombay',
    name: 'IIT Bombay',
    shortName: 'IITB',
    nirfRank: 1,
    establishedYear: 1958,
    city: 'Mumbai',
    state: 'Maharashtra',
    lat: 19.133,
    lng: 72.915,
    cluster: 'Mumbai',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Design'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.3,
    avgPackageLpa: 28.5,
    highestPackageLpa: 3.5,
    hostelAvailable: true,
    campusSize: '550 acres',
    facultyCount: 700,
    researchOutput: 'Very High',
    studentRating: 4.8,
    communityStats: { totalReviews: 4500, averageRating: 4.8, campusConfessions: 1100, qaThreads: 1800 },
    entranceExams: ['JEE Advanced', 'CEED', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Design'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Aerospace', 'Metallurgy', 'Design'],
    vibe: 'The most celebrated IIT with unmatched startup and consulting placement culture.',
    boardComfort: 95,
    website: 'https://www.iitb.ac.in',
    transit: {
      airport: { name: 'Chhatrapati Shivaji Maharaj International', distanceKm: 10, travelTimeMinutes: 30, estimatedCostInr: 400, distance: '10 km', time: '30 min', cost: '₹400' },
      railway: { name: 'Mumbai Central', distanceKm: 25, travelTimeMinutes: 50, estimatedCostInr: 300, distance: '25 km', time: '50 min', cost: '₹300' },
      metro: { name: 'Ghatkopar', distanceKm: 5, travelTimeMinutes: 15, distance: '5 km', time: '15 min' },
      cityCenter: { distance: '20 km', time: '45 min' },
      cityDistance: '20 km',
      convenienceScore: 9.2,
    },
  },
  {
    id: 'iit-madras',
    name: 'IIT Madras',
    shortName: 'IITM',
    nirfRank: 3,
    establishedYear: 1959,
    city: 'Chennai',
    state: 'Tamil Nadu',
    lat: 12.991,
    lng: 80.236,
    cluster: 'Chennai',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.1,
    avgPackageLpa: 23.8,
    highestPackageLpa: 1.9,
    hostelAvailable: true,
    campusSize: '620 acres',
    facultyCount: 600,
    researchOutput: 'Very High',
    studentRating: 4.7,
    communityStats: { totalReviews: 3800, averageRating: 4.7, campusConfessions: 900, qaThreads: 1400 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Ocean Engineering'],
    vibe: 'Research powerhouse with serene green campus and strong industry ties.',
    boardComfort: 94,
    website: 'https://www.iitm.ac.in',
    transit: {
      airport: { name: 'Chennai International', distanceKm: 12, travelTimeMinutes: 30, estimatedCostInr: 350, distance: '12 km', time: '30 min', cost: '₹350' },
      railway: { name: 'Chennai Central', distanceKm: 15, travelTimeMinutes: 35, estimatedCostInr: 250, distance: '15 km', time: '35 min', cost: '₹250' },
      metro: { name: 'IIT Madras', distanceKm: 2, travelTimeMinutes: 8, distance: '2 km', time: '8 min' },
      cityCenter: { distance: '15 km', time: '35 min' },
      cityDistance: '15 km',
      convenienceScore: 9.4,
    },
  },
  {
    id: 'iit-kanpur',
    name: 'IIT Kanpur',
    shortName: 'IITK',
    nirfRank: 4,
    establishedYear: 1959,
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    lat: 26.512,
    lng: 80.232,
    cluster: 'Kanpur',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.2,
    avgPackageLpa: 22.5,
    highestPackageLpa: 1.8,
    hostelAvailable: true,
    campusSize: '1055 acres',
    facultyCount: 550,
    researchOutput: 'Very High',
    studentRating: 4.6,
    communityStats: { totalReviews: 2800, averageRating: 4.6, campusConfessions: 700, qaThreads: 1000 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Aerospace', 'Chemical'],
    vibe: 'Academic rigor meets laid-back campus life with world-class labs.',
    boardComfort: 93,
    website: 'https://www.iitk.ac.in',
    transit: {
      airport: { name: 'Kanpur Airport', distanceKm: 15, travelTimeMinutes: 30, estimatedCostInr: 300, distance: '15 km', time: '30 min', cost: '₹300' },
      railway: { name: 'Kanpur Central', distanceKm: 12, travelTimeMinutes: 25, estimatedCostInr: 150, distance: '12 km', time: '25 min', cost: '₹150' },
      cityCenter: { distance: '12 km', time: '25 min' },
      cityDistance: '12 km',
      convenienceScore: 8.5,
    },
  },
  {
    id: 'iit-kharagpur',
    name: 'IIT Kharagpur',
    shortName: 'IITKGP',
    nirfRank: 5,
    establishedYear: 1951,
    city: 'Kharagpur',
    state: 'West Bengal',
    lat: 22.319,
    lng: 87.31,
    cluster: 'Kharagpur',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Law', 'Arts & Humanities'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 21.5,
    highestPackageLpa: 1.7,
    hostelAvailable: true,
    campusSize: '2100 acres',
    facultyCount: 650,
    researchOutput: 'Very High',
    studentRating: 4.6,
    communityStats: { totalReviews: 3500, averageRating: 4.6, campusConfessions: 950, qaThreads: 1300 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC', 'Arts'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Economics', 'History'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Economics', 'Law'],
    vibe: 'The oldest IIT with the largest campus and the most diverse student body.',
    boardComfort: 92,
    website: 'https://www.iitkgp.ac.in',
    transit: {
      airport: { name: 'Netaji Subhas Chandra Bose International', distanceKm: 130, travelTimeMinutes: 150, estimatedCostInr: 2000, distance: '130 km', time: '2.5 hr', cost: '₹2,000' },
      railway: { name: 'Kharagpur Junction', distanceKm: 2, travelTimeMinutes: 8, estimatedCostInr: 50, distance: '2 km', time: '8 min', cost: '₹50' },
      cityCenter: { distance: '2 km', time: '8 min' },
      cityDistance: '2 km',
      convenienceScore: 8.8,
    },
  },
  {
    id: 'iit-roorkee',
    name: 'IIT Roorkee',
    shortName: 'IITR',
    nirfRank: 6,
    establishedYear: 1847,
    city: 'Roorkee',
    state: 'Uttarakhand',
    lat: 29.865,
    lng: 77.894,
    cluster: 'Roorkee',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Design'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.1,
    avgPackageLpa: 20.5,
    highestPackageLpa: 1.6,
    hostelAvailable: true,
    campusSize: '365 acres',
    facultyCount: 500,
    researchOutput: 'Very High',
    studentRating: 4.5,
    communityStats: { totalReviews: 2500, averageRating: 4.5, campusConfessions: 650, qaThreads: 900 },
    entranceExams: ['JEE Advanced', 'GATE', 'CEED'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Design'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Architecture', 'Design'],
    vibe: 'India\'s oldest technical institution with stunning Himalayan backdrop.',
    boardComfort: 91,
    website: 'https://www.iitr.ac.in',
    transit: {
      airport: { name: 'Dehradun Airport', distanceKm: 65, travelTimeMinutes: 90, estimatedCostInr: 1200, distance: '65 km', time: '1.5 hr', cost: '₹1,200' },
      railway: { name: 'Roorkee Railway Station', distanceKm: 2, travelTimeMinutes: 8, estimatedCostInr: 50, distance: '2 km', time: '8 min', cost: '₹50' },
      cityCenter: { distance: '2 km', time: '8 min' },
      cityDistance: '2 km',
      convenienceScore: 8.3,
    },
  },
  {
    id: 'iit-guwahati',
    name: 'IIT Guwahati',
    shortName: 'IITG',
    nirfRank: 7,
    establishedYear: 1994,
    city: 'Guwahati',
    state: 'Assam',
    lat: 26.187,
    lng: 91.691,
    cluster: 'Guwahati',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Design'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 20.0,
    highestPackageLpa: 1.5,
    hostelAvailable: true,
    campusSize: '700 acres',
    facultyCount: 450,
    researchOutput: 'High',
    studentRating: 4.5,
    communityStats: { totalReviews: 1800, averageRating: 4.5, campusConfessions: 450, qaThreads: 700 },
    entranceExams: ['JEE Advanced', 'GATE', 'CEED'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Design'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Design'],
    vibe: 'Scenic campus on the Brahmaputra with a close-knit community.',
    boardComfort: 90,
    website: 'https://www.iitg.ac.in',
    transit: {
      airport: { name: 'Lokpriya Gopinath Bordoloi International', distanceKm: 25, travelTimeMinutes: 45, estimatedCostInr: 500, distance: '25 km', time: '45 min', cost: '₹500' },
      railway: { name: 'Guwahati Railway Station', distanceKm: 18, travelTimeMinutes: 30, estimatedCostInr: 250, distance: '18 km', time: '30 min', cost: '₹250' },
      cityCenter: { distance: '18 km', time: '30 min' },
      cityDistance: '18 km',
      convenienceScore: 8.0,
    },
  },
  {
    id: 'iit-hyderabad',
    name: 'IIT Hyderabad',
    shortName: 'IITH',
    nirfRank: 8,
    establishedYear: 2008,
    city: 'Hyderabad',
    state: 'Telangana',
    lat: 17.594,
    lng: 78.123,
    cluster: 'Hyderabad',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.2,
    avgPackageLpa: 22.0,
    highestPackageLpa: 1.8,
    hostelAvailable: true,
    campusSize: '576 acres',
    facultyCount: 400,
    researchOutput: 'High',
    studentRating: 4.5,
    communityStats: { totalReviews: 1500, averageRating: 4.5, campusConfessions: 400, qaThreads: 600 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Materials Science'],
    vibe: 'Youngest Tier 1 IIT with modern curriculum and strong research focus.',
    boardComfort: 91,
    website: 'https://www.iith.ac.in',
    transit: {
      airport: { name: 'Rajiv Gandhi International', distanceKm: 35, travelTimeMinutes: 50, estimatedCostInr: 600, distance: '35 km', time: '50 min', cost: '₹600' },
      railway: { name: 'Secunderabad Junction', distanceKm: 25, travelTimeMinutes: 40, estimatedCostInr: 300, distance: '25 km', time: '40 min', cost: '₹300' },
      cityCenter: { distance: '25 km', time: '40 min' },
      cityDistance: '25 km',
      convenienceScore: 8.2,
    },
  },
  {
    id: 'iit-indore',
    name: 'IIT Indore',
    shortName: 'IITI',
    nirfRank: 9,
    establishedYear: 2009,
    city: 'Indore',
    state: 'Madhya Pradesh',
    lat: 22.52,
    lng: 75.92,
    cluster: 'Indore',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Arts & Humanities'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 20.0,
    highestPackageLpa: 1.5,
    hostelAvailable: true,
    campusSize: '500 acres',
    facultyCount: 350,
    researchOutput: 'High',
    studentRating: 4.4,
    communityStats: { totalReviews: 1200, averageRating: 4.4, campusConfessions: 300, qaThreads: 500 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC', 'Arts'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Economics'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Economics'],
    vibe: 'Modern campus with interdisciplinary approach and growing industry connections.',
    boardComfort: 90,
    website: 'https://www.iiti.ac.in',
    transit: {
      airport: { name: 'Devi Ahilya Bai Holkar Airport', distanceKm: 30, travelTimeMinutes: 45, estimatedCostInr: 400, distance: '30 km', time: '45 min', cost: '₹400' },
      railway: { name: 'Indore Junction', distanceKm: 20, travelTimeMinutes: 30, estimatedCostInr: 200, distance: '20 km', time: '30 min', cost: '₹200' },
      cityCenter: { distance: '20 km', time: '30 min' },
      cityDistance: '20 km',
      convenienceScore: 8.0,
    },
  },
  {
    id: 'iit-bhu',
    name: 'IIT BHU Varanasi',
    shortName: 'IITBHU',
    nirfRank: 10,
    establishedYear: 1919,
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    lat: 25.267,
    lng: 82.991,
    cluster: 'Varanasi',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 19.5,
    highestPackageLpa: 1.4,
    hostelAvailable: true,
    campusSize: '1300 acres',
    facultyCount: 400,
    researchOutput: 'High',
    studentRating: 4.4,
    communityStats: { totalReviews: 2000, averageRating: 4.4, campusConfessions: 550, qaThreads: 800 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Ceramic Engineering'],
    vibe: 'Historic campus on the Ganges with deep-rooted engineering traditions.',
    boardComfort: 90,
    website: 'https://www.iitbhu.ac.in',
    transit: {
      airport: { name: 'Lal Bahadur Shastri International', distanceKm: 25, travelTimeMinutes: 40, estimatedCostInr: 400, distance: '25 km', time: '40 min', cost: '₹400' },
      railway: { name: 'Varanasi Junction', distanceKm: 8, travelTimeMinutes: 20, estimatedCostInr: 150, distance: '8 km', time: '20 min', cost: '₹150' },
      cityCenter: { distance: '8 km', time: '20 min' },
      cityDistance: '8 km',
      convenienceScore: 8.5,
    },
  },
  {
    id: 'iit-ropar',
    name: 'IIT Ropar',
    shortName: 'IITRPR',
    nirfRank: 22,
    establishedYear: 2008,
    city: 'Rupnagar',
    state: 'Punjab',
    lat: 30.97,
    lng: 76.52,
    cluster: 'Rupnagar',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 18.0,
    highestPackageLpa: 1.2,
    hostelAvailable: true,
    campusSize: '400 acres',
    facultyCount: 200,
    researchOutput: 'High',
    studentRating: 4.2,
    communityStats: { totalReviews: 800, averageRating: 4.2, campusConfessions: 200, qaThreads: 350 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
    vibe: 'Young IIT with close faculty-student interaction and growing research.',
    boardComfort: 88,
    website: 'https://www.iitrpr.ac.in',
    transit: {
      airport: { name: 'Chandigarh International', distanceKm: 50, travelTimeMinutes: 70, estimatedCostInr: 800, distance: '50 km', time: '70 min', cost: '₹800' },
      railway: { name: 'Rupnagar Railway Station', distanceKm: 5, travelTimeMinutes: 12, estimatedCostInr: 100, distance: '5 km', time: '12 min', cost: '₹100' },
      cityCenter: { distance: '5 km', time: '12 min' },
      cityDistance: '5 km',
      convenienceScore: 7.5,
    },
  },
  {
    id: 'iit-patna',
    name: 'IIT Patna',
    shortName: 'IITP',
    nirfRank: 24,
    establishedYear: 2008,
    city: 'Patna',
    state: 'Bihar',
    lat: 25.535,
    lng: 84.851,
    cluster: 'Patna',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 17.5,
    highestPackageLpa: 1.2,
    hostelAvailable: true,
    campusSize: '500 acres',
    facultyCount: 200,
    researchOutput: 'High',
    studentRating: 4.2,
    communityStats: { totalReviews: 900, averageRating: 4.2, campusConfessions: 250, qaThreads: 400 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
    vibe: 'Rapidly growing IIT with modern facilities and strong community outreach.',
    boardComfort: 88,
    website: 'https://www.iitp.ac.in',
    transit: {
      airport: { name: 'Jay Prakash Narayan International', distanceKm: 20, travelTimeMinutes: 35, estimatedCostInr: 350, distance: '20 km', time: '35 min', cost: '₹350' },
      railway: { name: 'Patna Junction', distanceKm: 15, travelTimeMinutes: 25, estimatedCostInr: 200, distance: '15 km', time: '25 min', cost: '₹200' },
      cityCenter: { distance: '15 km', time: '25 min' },
      cityDistance: '15 km',
      convenienceScore: 8.0,
    },
  },
  {
    id: 'iit-gandhinagar',
    name: 'IIT Gandhinagar',
    shortName: 'IITGN',
    nirfRank: 20,
    establishedYear: 2008,
    city: 'Gandhinagar',
    state: 'Gujarat',
    lat: 23.211,
    lng: 72.684,
    cluster: 'Gandhinagar',
    primaryCategory: 'Engineering',
    categories: ['Engineering', 'Arts & Humanities'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 17.0,
    highestPackageLpa: 1.2,
    hostelAvailable: true,
    campusSize: '400 acres',
    facultyCount: 180,
    researchOutput: 'High',
    studentRating: 4.2,
    communityStats: { totalReviews: 700, averageRating: 4.2, campusConfessions: 180, qaThreads: 300 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC', 'Arts'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Literature', 'History'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Cognitive Science'],
    vibe: 'Innovative pedagogy with strong humanities and entrepreneurship culture.',
    boardComfort: 87,
    website: 'https://www.iitgn.ac.in',
    transit: {
      airport: { name: 'Sardar Vallabhbhai Patel International', distanceKm: 20, travelTimeMinutes: 30, estimatedCostInr: 400, distance: '20 km', time: '30 min', cost: '₹400' },
      railway: { name: 'Gandhinagar Capital', distanceKm: 8, travelTimeMinutes: 15, estimatedCostInr: 150, distance: '8 km', time: '15 min', cost: '₹150' },
      cityCenter: { distance: '8 km', time: '15 min' },
      cityDistance: '8 km',
      convenienceScore: 8.2,
    },
  },
  {
    id: 'iit-bhubaneswar',
    name: 'IIT Bhubaneswar',
    shortName: 'IITBBS',
    nirfRank: 26,
    establishedYear: 2008,
    city: 'Bhubaneswar',
    state: 'Odisha',
    lat: 20.296,
    lng: 85.818,
    cluster: 'Bhubaneswar',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 16.5,
    highestPackageLpa: 1.1,
    hostelAvailable: true,
    campusSize: '936 acres',
    facultyCount: 200,
    researchOutput: 'High',
    studentRating: 4.1,
    communityStats: { totalReviews: 800, averageRating: 4.1, campusConfessions: 200, qaThreads: 350 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
    vibe: 'Sprawling campus with modern architecture and strong regional industry ties.',
    boardComfort: 86,
    website: 'https://www.iitbbs.ac.in',
    transit: {
      airport: { name: 'Biju Patnaik International', distanceKm: 15, travelTimeMinutes: 25, estimatedCostInr: 300, distance: '15 km', time: '25 min', cost: '₹300' },
      railway: { name: 'Bhubaneswar Railway Station', distanceKm: 10, travelTimeMinutes: 18, estimatedCostInr: 150, distance: '10 km', time: '18 min', cost: '₹150' },
      cityCenter: { distance: '10 km', time: '18 min' },
      cityDistance: '10 km',
      convenienceScore: 8.2,
    },
  },
  {
    id: 'iit-mandi',
    name: 'IIT Mandi',
    shortName: 'IITMD',
    nirfRank: 30,
    establishedYear: 2009,
    city: 'Mandi',
    state: 'Himachal Pradesh',
    lat: 31.78,
    lng: 76.98,
    cluster: 'Mandi',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 15.0,
    highestPackageLpa: 1.0,
    hostelAvailable: true,
    campusSize: '500 acres',
    facultyCount: 150,
    researchOutput: 'High',
    studentRating: 4.0,
    communityStats: { totalReviews: 600, averageRating: 4.0, campusConfessions: 150, qaThreads: 250 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
    vibe: 'Mountain campus with serene Himalayan views and strong research community.',
    boardComfort: 85,
    website: 'https://www.iitmandi.ac.in',
    transit: {
      airport: { name: 'Kullu-Manali Airport', distanceKm: 50, travelTimeMinutes: 90, estimatedCostInr: 1000, distance: '50 km', time: '90 min', cost: '₹1,000' },
      railway: { name: 'Kiratpur Sahib', distanceKm: 40, travelTimeMinutes: 60, estimatedCostInr: 500, distance: '40 km', time: '60 min', cost: '₹500' },
      cityCenter: { distance: '10 km', time: '20 min' },
      cityDistance: '10 km',
      convenienceScore: 6.5,
    },
  },
  {
    id: 'iit-jodhpur',
    name: 'IIT Jodhpur',
    shortName: 'IITJ',
    nirfRank: 32,
    establishedYear: 2008,
    city: 'Jodhpur',
    state: 'Rajasthan',
    lat: 26.28,
    lng: 73.02,
    cluster: 'Jodhpur',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 15.5,
    highestPackageLpa: 1.1,
    hostelAvailable: true,
    campusSize: '852 acres',
    facultyCount: 180,
    researchOutput: 'High',
    studentRating: 4.0,
    communityStats: { totalReviews: 700, averageRating: 4.0, campusConfessions: 180, qaThreads: 300 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Biosciences'],
    vibe: 'Desert campus with modern architecture and emerging research programs.',
    boardComfort: 85,
    website: 'https://www.iitj.ac.in',
    transit: {
      airport: { name: 'Jodhpur Airport', distanceKm: 12, travelTimeMinutes: 20, estimatedCostInr: 250, distance: '12 km', time: '20 min', cost: '₹250' },
      railway: { name: 'Jodhpur Junction', distanceKm: 10, travelTimeMinutes: 18, estimatedCostInr: 150, distance: '10 km', time: '18 min', cost: '₹150' },
      cityCenter: { distance: '10 km', time: '18 min' },
      cityDistance: '10 km',
      convenienceScore: 7.8,
    },
  },
  {
    id: 'iit-tirupati',
    name: 'IIT Tirupati',
    shortName: 'IITTP',
    nirfRank: 35,
    establishedYear: 2015,
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    lat: 13.63,
    lng: 79.42,
    cluster: 'Tirupati',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 14.0,
    highestPackageLpa: 1.0,
    hostelAvailable: true,
    campusSize: '400 acres',
    facultyCount: 120,
    researchOutput: 'Medium',
    studentRating: 3.9,
    communityStats: { totalReviews: 500, averageRating: 3.9, campusConfessions: 120, qaThreads: 200 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
    vibe: 'Newest IIT with temple-town charm and growing academic reputation.',
    boardComfort: 84,
    website: 'https://www.iittp.ac.in',
    transit: {
      airport: { name: 'Tirupati Airport', distanceKm: 20, travelTimeMinutes: 30, estimatedCostInr: 300, distance: '20 km', time: '30 min', cost: '₹300' },
      railway: { name: 'Tirupati Railway Station', distanceKm: 15, travelTimeMinutes: 22, estimatedCostInr: 150, distance: '15 km', time: '22 min', cost: '₹150' },
      cityCenter: { distance: '15 km', time: '22 min' },
      cityDistance: '15 km',
      convenienceScore: 7.8,
    },
  },
  {
    id: 'iit-palakkad',
    name: 'IIT Palakkad',
    shortName: 'IITPKD',
    nirfRank: 38,
    establishedYear: 2015,
    city: 'Palakkad',
    state: 'Kerala',
    lat: 10.79,
    lng: 76.65,
    cluster: 'Palakkad',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 13.5,
    highestPackageLpa: 0.9,
    hostelAvailable: true,
    campusSize: '400 acres',
    facultyCount: 100,
    researchOutput: 'Medium',
    studentRating: 3.9,
    communityStats: { totalReviews: 400, averageRating: 3.9, campusConfessions: 100, qaThreads: 180 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
    vibe: 'Scenic Kerala campus with lush greenery and strong academic focus.',
    boardComfort: 84,
    website: 'https://www.iitpkd.ac.in',
    transit: {
      airport: { name: 'Coimbatore International', distanceKm: 55, travelTimeMinutes: 75, estimatedCostInr: 800, distance: '55 km', time: '75 min', cost: '₹800' },
      railway: { name: 'Palakkad Junction', distanceKm: 10, travelTimeMinutes: 15, estimatedCostInr: 100, distance: '10 km', time: '15 min', cost: '₹100' },
      cityCenter: { distance: '10 km', time: '15 min' },
      cityDistance: '10 km',
      convenienceScore: 7.5,
    },
  },
  {
    id: 'iit-dhanbad',
    name: 'IIT Dhanbad',
    shortName: 'IITISM',
    nirfRank: 15,
    establishedYear: 1926,
    city: 'Dhanbad',
    state: 'Jharkhand',
    lat: 23.81,
    lng: 86.43,
    cluster: 'Dhanbad',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 16.0,
    highestPackageLpa: 1.2,
    hostelAvailable: true,
    campusSize: '218 acres',
    facultyCount: 350,
    researchOutput: 'High',
    studentRating: 4.2,
    communityStats: { totalReviews: 1500, averageRating: 4.2, campusConfessions: 400, qaThreads: 650 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Mining', 'Petroleum', 'Mineral Engineering'],
    vibe: 'Oldest mining school with strong industry connections and unique programs.',
    boardComfort: 87,
    website: 'https://www.iitism.ac.in',
    transit: {
      airport: { name: 'Birsa Munda Airport, Ranchi', distanceKm: 140, travelTimeMinutes: 180, estimatedCostInr: 2000, distance: '140 km', time: '3 hr', cost: '₹2,000' },
      railway: { name: 'Dhanbad Junction', distanceKm: 3, travelTimeMinutes: 8, estimatedCostInr: 50, distance: '3 km', time: '8 min', cost: '₹50' },
      cityCenter: { distance: '3 km', time: '8 min' },
      cityDistance: '3 km',
      convenienceScore: 8.0,
    },
  },
  {
    id: 'iit-bhilai',
    name: 'IIT Bhilai',
    shortName: 'IITBH',
    nirfRank: 45,
    establishedYear: 2016,
    city: 'Bhilai',
    state: 'Chhattisgarh',
    lat: 21.21,
    lng: 81.33,
    cluster: 'Bhilai',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 12.0,
    highestPackageLpa: 0.8,
    hostelAvailable: true,
    campusSize: '300 acres',
    facultyCount: 80,
    researchOutput: 'Medium',
    studentRating: 3.8,
    communityStats: { totalReviews: 300, averageRating: 3.8, campusConfessions: 80, qaThreads: 150 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
    vibe: 'Youngest IIT with modern curriculum and strong industry support from Bhilai Steel.',
    boardComfort: 83,
    website: 'https://www.iitbhilai.ac.in',
    transit: {
      airport: { name: 'Swami Vivekananda Airport, Raipur', distanceKm: 35, travelTimeMinutes: 50, estimatedCostInr: 500, distance: '35 km', time: '50 min', cost: '₹500' },
      railway: { name: 'Bhilai Power House', distanceKm: 8, travelTimeMinutes: 15, estimatedCostInr: 100, distance: '8 km', time: '15 min', cost: '₹100' },
      cityCenter: { distance: '8 km', time: '15 min' },
      cityDistance: '8 km',
      convenienceScore: 7.5,
    },
  },
  {
    id: 'iit-goa',
    name: 'IIT Goa',
    shortName: 'IITGOA',
    nirfRank: 48,
    establishedYear: 2016,
    city: 'Farmagudi',
    state: 'Goa',
    lat: 15.4,
    lng: 73.95,
    cluster: 'Goa',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 13.0,
    highestPackageLpa: 0.9,
    hostelAvailable: true,
    campusSize: '300 acres',
    facultyCount: 70,
    researchOutput: 'Medium',
    studentRating: 3.8,
    communityStats: { totalReviews: 250, averageRating: 3.8, campusConfessions: 60, qaThreads: 120 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
    vibe: 'Beachside IIT with relaxed culture and growing research focus.',
    boardComfort: 82,
    website: 'https://www.iitgoa.ac.in',
    transit: {
      airport: { name: 'Dabolim Airport', distanceKm: 30, travelTimeMinutes: 45, estimatedCostInr: 500, distance: '30 km', time: '45 min', cost: '₹500' },
      railway: { name: 'Madgaon Junction', distanceKm: 20, travelTimeMinutes: 30, estimatedCostInr: 250, distance: '20 km', time: '30 min', cost: '₹250' },
      cityCenter: { distance: '15 km', time: '25 min' },
      cityDistance: '15 km',
      convenienceScore: 7.5,
    },
  },
  {
    id: 'iit-jammu',
    name: 'IIT Jammu',
    shortName: 'IITJMU',
    nirfRank: 50,
    establishedYear: 2016,
    city: 'Jammu',
    state: 'Jammu & Kashmir',
    lat: 32.73,
    lng: 74.87,
    cluster: 'Jammu',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 12.0,
    highestPackageLpa: 0.8,
    hostelAvailable: true,
    campusSize: '400 acres',
    facultyCount: 70,
    researchOutput: 'Medium',
    studentRating: 3.8,
    communityStats: { totalReviews: 250, averageRating: 3.8, campusConfessions: 60, qaThreads: 120 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
    vibe: 'Hill campus with unique location and growing research infrastructure.',
    boardComfort: 82,
    website: 'https://www.iitjammu.ac.in',
    transit: {
      airport: { name: 'Jammu Airport', distanceKm: 15, travelTimeMinutes: 25, estimatedCostInr: 300, distance: '15 km', time: '25 min', cost: '₹300' },
      railway: { name: 'Jammu Tawi', distanceKm: 10, travelTimeMinutes: 18, estimatedCostInr: 150, distance: '10 km', time: '18 min', cost: '₹150' },
      cityCenter: { distance: '10 km', time: '18 min' },
      cityDistance: '10 km',
      convenienceScore: 7.8,
    },
  },
  {
    id: 'iit-dharwad',
    name: 'IIT Dharwad',
    shortName: 'IITDH',
    nirfRank: 52,
    establishedYear: 2016,
    city: 'Dharwad',
    state: 'Karnataka',
    lat: 15.46,
    lng: 75.01,
    cluster: 'Dharwad',
    primaryCategory: 'Engineering',
    categories: ['Engineering'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 2.0,
    avgPackageLpa: 12.5,
    highestPackageLpa: 0.8,
    hostelAvailable: true,
    campusSize: '300 acres',
    facultyCount: 70,
    researchOutput: 'Medium',
    studentRating: 3.8,
    communityStats: { totalReviews: 250, averageRating: 3.8, campusConfessions: 60, qaThreads: 120 },
    entranceExams: ['JEE Advanced', 'GATE'],
    streams: ['MPC'],
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
    programs: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
    vibe: 'Young IIT with modern campus and strong academic culture in Karnataka.',
    boardComfort: 82,
    website: 'https://www.iitdh.ac.in',
    transit: {
      airport: { name: 'Hubli Airport', distanceKm: 25, travelTimeMinutes: 35, estimatedCostInr: 350, distance: '25 km', time: '35 min', cost: '₹350' },
      railway: { name: 'Dharwad Railway Station', distanceKm: 8, travelTimeMinutes: 12, estimatedCostInr: 100, distance: '8 km', time: '12 min', cost: '₹100' },
      cityCenter: { distance: '8 km', time: '12 min' },
      cityDistance: '8 km',
      convenienceScore: 7.8,
    },
  },

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
    id: 'nlsiu',
    name: 'National Law School of India University',
    shortName: 'NLSIU',
    nirfRank: 2,
    establishedYear: 1986,
    city: 'Bengaluru',
    state: 'Karnataka',
    lat: 12.96,
    lng: 77.58,
    cluster: 'Bengaluru',
    primaryCategory: 'Law',
    categories: ['Law'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 0.5,
    avgPackageLpa: 18.0,
    highestPackageLpa: 1.8,
    hostelAvailable: true,
    campusSize: '30 acres',
    facultyCount: 80,
    researchOutput: 'High',
    studentRating: 4.7,
    communityStats: { totalReviews: 2000, averageRating: 4.7, campusConfessions: 500, qaThreads: 900 },
    entranceExams: ['CLAT'],
    streams: ['Arts'],
    subjects: ['Literature', 'Political Science', 'History', 'Psychology'],
    programs: ['BA LLB', 'LLM', 'MPhil', 'PhD'],
    vibe: 'India\'s premier law school with unmatched alumni network and advocacy culture.',
    boardComfort: 94,
    website: 'https://www.nls.ac.in',
    transit: {
      airport: { name: 'Kempegowda International', distanceKm: 40, travelTimeMinutes: 60, estimatedCostInr: 700, distance: '40 km', time: '60 min', cost: '₹700' },
      railway: { name: 'Bengaluru City Railway Station', distanceKm: 12, travelTimeMinutes: 25, estimatedCostInr: 200, distance: '12 km', time: '25 min', cost: '₹200' },
      cityCenter: { distance: '12 km', time: '25 min' },
      cityDistance: '12 km',
      convenienceScore: 8.0,
    },
  },
  {
    id: 'nlud',
    name: 'National Law University Delhi',
    shortName: 'NLUD',
    nirfRank: 3,
    establishedYear: 2008,
    city: 'New Delhi',
    state: 'Delhi',
    lat: 28.6,
    lng: 77.22,
    cluster: 'Delhi NCR',
    primaryCategory: 'Law',
    categories: ['Law'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 0.4,
    avgPackageLpa: 16.5,
    highestPackageLpa: 1.5,
    hostelAvailable: true,
    campusSize: '25 acres',
    facultyCount: 60,
    researchOutput: 'High',
    studentRating: 4.6,
    communityStats: { totalReviews: 1500, averageRating: 4.6, campusConfessions: 400, qaThreads: 700 },
    entranceExams: ['AILET'],
    streams: ['Arts'],
    subjects: ['Literature', 'Political Science', 'History', 'Psychology'],
    programs: ['BA LLB', 'LLM', 'PhD'],
    vibe: 'Top-tier law school in the capital with strong policy and judicial connections.',
    boardComfort: 93,
    website: 'https://www.nludelhi.ac.in',
    transit: {
      airport: { name: 'Indira Gandhi International', distanceKm: 20, travelTimeMinutes: 30, estimatedCostInr: 400, distance: '20 km', time: '30 min', cost: '₹400' },
      railway: { name: 'New Delhi Railway Station', distanceKm: 15, travelTimeMinutes: 25, estimatedCostInr: 200, distance: '15 km', time: '25 min', cost: '₹200' },
      cityCenter: { distance: '15 km', time: '25 min' },
      cityDistance: '15 km',
      convenienceScore: 8.8,
    },
  },

  // ============================================================
  // GOVERNMENT COLLEGES (3)
  // ============================================================
  {
    id: 'du',
    name: 'Delhi University',
    shortName: 'DU',
    nirfRank: 14,
    establishedYear: 1922,
    city: 'New Delhi',
    state: 'Delhi',
    lat: 28.69,
    lng: 77.21,
    cluster: 'Delhi NCR',
    primaryCategory: 'Arts & Humanities',
    categories: ['Arts & Humanities', 'Commerce & Management', 'Law'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 0.3,
    avgPackageLpa: 8.0,
    highestPackageLpa: 0.8,
    hostelAvailable: true,
    campusSize: '1000 acres',
    facultyCount: 7000,
    researchOutput: 'High',
    studentRating: 4.3,
    communityStats: { totalReviews: 8000, averageRating: 4.3, campusConfessions: 2000, qaThreads: 3500 },
    entranceExams: ['CUET', 'CLAT', 'DU JAT'],
    streams: ['Arts', 'Commerce', 'MPC'],
    subjects: ['Literature', 'Political Science', 'History', 'Economics', 'Accountancy', 'Math'],
    programs: ['B.Com', 'BA English', 'BA Economics', 'BSc Math', 'LLB', 'BBA'],
    vibe: 'Iconic central university with 90+ colleges, vibrant campus life, and political legacy.',
    boardComfort: 92,
    website: 'https://www.du.ac.in',
    transit: {
      airport: { name: 'Indira Gandhi International', distanceKm: 15, travelTimeMinutes: 25, estimatedCostInr: 350, distance: '15 km', time: '25 min', cost: '₹350' },
      railway: { name: 'New Delhi Railway Station', distanceKm: 5, travelTimeMinutes: 12, estimatedCostInr: 100, distance: '5 km', time: '12 min', cost: '₹100' },
      cityCenter: { distance: '5 km', time: '12 min' },
      cityDistance: '5 km',
      convenienceScore: 9.5,
    },
  },
  {
    id: 'jnu',
    name: 'Jawaharlal Nehru University',
    shortName: 'JNU',
    nirfRank: 8,
    establishedYear: 1969,
    city: 'New Delhi',
    state: 'Delhi',
    lat: 28.54,
    lng: 77.17,
    cluster: 'Delhi NCR',
    primaryCategory: 'Arts & Humanities',
    categories: ['Arts & Humanities', 'Commerce & Management', 'Law'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 0.15,
    avgPackageLpa: 7.5,
    highestPackageLpa: 0.6,
    hostelAvailable: true,
    campusSize: '1000 acres',
    facultyCount: 600,
    researchOutput: 'Very High',
    studentRating: 4.5,
    communityStats: { totalReviews: 3000, averageRating: 4.5, campusConfessions: 800, qaThreads: 1400 },
    entranceExams: ['JNUEE', 'CUET'],
    streams: ['Arts', 'Commerce'],
    subjects: ['Literature', 'Political Science', 'History', 'Economics', 'Psychology', 'Sociology'],
    programs: ['MA', 'BA', 'MPhil', 'PhD', 'International Studies', 'Economics'],
    vibe: 'Intellectual powerhouse with activist culture and world-class research in social sciences.',
    boardComfort: 93,
    website: 'https://www.jnu.ac.in',
    transit: {
      airport: { name: 'Indira Gandhi International', distanceKm: 18, travelTimeMinutes: 30, estimatedCostInr: 400, distance: '18 km', time: '30 min', cost: '₹400' },
      railway: { name: 'New Delhi Railway Station', distanceKm: 18, travelTimeMinutes: 30, estimatedCostInr: 250, distance: '18 km', time: '30 min', cost: '₹250' },
      cityCenter: { distance: '18 km', time: '30 min' },
      cityDistance: '18 km',
      convenienceScore: 8.5,
    },
  },
  {
    id: 'bhu',
    name: 'Banaras Hindu University',
    shortName: 'BHU',
    nirfRank: 11,
    establishedYear: 1916,
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    lat: 25.27,
    lng: 82.99,
    cluster: 'Varanasi',
    primaryCategory: 'Arts & Humanities',
    categories: ['Arts & Humanities', 'Engineering', 'Medical', 'Law'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 0.4,
    avgPackageLpa: 8.5,
    highestPackageLpa: 0.8,
    hostelAvailable: true,
    campusSize: '1300 acres',
    facultyCount: 2000,
    researchOutput: 'Very High',
    studentRating: 4.4,
    communityStats: { totalReviews: 4000, averageRating: 4.4, campusConfessions: 1000, qaThreads: 1800 },
    entranceExams: ['CUET', 'BHU UET', 'NEET', 'JEE Main'],
    streams: ['Arts', 'MPC', 'BiPC'],
    subjects: ['Literature', 'Political Science', 'History', 'Math', 'Physics', 'Chemistry', 'Biology'],
    programs: ['BA', 'MA', 'BSc', 'Engineering', 'MBBS', 'LLB', 'Agriculture'],
    vibe: 'Spiritual Varanasi meets rigorous academia — Asia\'s largest residential university.',
    boardComfort: 91,
    website: 'https://www.bhu.ac.in',
    transit: {
      airport: { name: 'Lal Bahadur Shastri International', distanceKm: 25, travelTimeMinutes: 40, estimatedCostInr: 400, distance: '25 km', time: '40 min', cost: '₹400' },
      railway: { name: 'Varanasi Junction', distanceKm: 6, travelTimeMinutes: 15, estimatedCostInr: 100, distance: '6 km', time: '15 min', cost: '₹100' },
      cityCenter: { distance: '6 km', time: '15 min' },
      cityDistance: '6 km',
      convenienceScore: 8.5,
    },
  },

  // ============================================================
  // MEDICAL COLLEGES (4)
  // ============================================================
  {
    id: 'aiims-delhi',
    name: 'AIIMS Delhi',
    shortName: 'AIIMS',
    nirfRank: 1,
    establishedYear: 1956,
    city: 'New Delhi',
    state: 'Delhi',
    lat: 28.567,
    lng: 77.21,
    cluster: 'Delhi NCR',
    primaryCategory: 'Medical',
    categories: ['Medical'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 0.2,
    avgPackageLpa: 18.0,
    highestPackageLpa: 1.0,
    hostelAvailable: true,
    campusSize: '50 acres',
    facultyCount: 800,
    researchOutput: 'Very High',
    studentRating: 4.8,
    communityStats: { totalReviews: 2500, averageRating: 4.8, campusConfessions: 600, qaThreads: 1100 },
    entranceExams: ['NEET UG', 'NEET PG', 'INI CET'],
    streams: ['BiPC'],
    subjects: ['Biology', 'Chemistry', 'Physics', 'Psychology'],
    programs: ['MBBS', 'MD', 'MS', 'DM', 'MCh', 'BSc Nursing'],
    vibe: 'Premier clinical training with a very high-intensity peer group.',
    boardComfort: 96,
    website: 'https://www.aiims.edu',
    transit: {
      airport: { name: 'Indira Gandhi International', distanceKm: 15, travelTimeMinutes: 25, estimatedCostInr: 350, distance: '15 km', time: '25 min', cost: '₹350' },
      railway: { name: 'New Delhi Railway Station', distanceKm: 8, travelTimeMinutes: 18, estimatedCostInr: 150, distance: '8 km', time: '18 min', cost: '₹150' },
      cityCenter: { distance: '8 km', time: '18 min' },
      cityDistance: '8 km',
      convenienceScore: 9.2,
    },
  },
  {
    id: 'aiims-bhopal',
    name: 'AIIMS Bhopal',
    shortName: 'AIIMS-B',
    nirfRank: 8,
    establishedYear: 2012,
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    lat: 23.26,
    lng: 77.41,
    cluster: 'Bhopal',
    primaryCategory: 'Medical',
    categories: ['Medical'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 0.15,
    avgPackageLpa: 14.0,
    highestPackageLpa: 0.8,
    hostelAvailable: true,
    campusSize: '150 acres',
    facultyCount: 300,
    researchOutput: 'High',
    studentRating: 4.5,
    communityStats: { totalReviews: 800, averageRating: 4.5, campusConfessions: 200, qaThreads: 400 },
    entranceExams: ['NEET UG', 'NEET PG', 'INI CET'],
    streams: ['BiPC'],
    subjects: ['Biology', 'Chemistry', 'Physics', 'Psychology'],
    programs: ['MBBS', 'MD', 'MS', 'BSc Nursing', 'Allied Health'],
    vibe: 'Modern AIIMS with excellent infrastructure and growing research output.',
    boardComfort: 92,
    website: 'https://www.aiimsbhopal.edu.in',
    transit: {
      airport: { name: 'Raja Bhoj Airport', distanceKm: 15, travelTimeMinutes: 25, estimatedCostInr: 300, distance: '15 km', time: '25 min', cost: '₹300' },
      railway: { name: 'Bhopal Junction', distanceKm: 10, travelTimeMinutes: 18, estimatedCostInr: 150, distance: '10 km', time: '18 min', cost: '₹150' },
      cityCenter: { distance: '10 km', time: '18 min' },
      cityDistance: '10 km',
      convenienceScore: 8.5,
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
  {
    id: 'mamc',
    name: 'Maulana Azad Medical College',
    shortName: 'MAMC',
    nirfRank: 6,
    establishedYear: 1958,
    city: 'New Delhi',
    state: 'Delhi',
    lat: 28.64,
    lng: 77.24,
    cluster: 'Delhi NCR',
    primaryCategory: 'Medical',
    categories: ['Medical'],
    tier: 'Tier 1',
    ownership: 'Government',
    annualFeeLpa: 0.15,
    avgPackageLpa: 16.0,
    highestPackageLpa: 0.9,
    hostelAvailable: true,
    campusSize: '30 acres',
    facultyCount: 400,
    researchOutput: 'High',
    studentRating: 4.6,
    communityStats: { totalReviews: 1500, averageRating: 4.6, campusConfessions: 400, qaThreads: 700 },
    entranceExams: ['NEET UG', 'NEET PG'],
    streams: ['BiPC'],
    subjects: ['Biology', 'Chemistry', 'Physics', 'Psychology'],
    programs: ['MBBS', 'MD', 'MS', 'BDS', 'BSc Nursing'],
    vibe: 'Top Delhi medical college with unmatched clinical exposure at Lok Nayak Hospital.',
    boardComfort: 93,
    website: 'https://www.mamc.ac.in',
    transit: {
      airport: { name: 'Indira Gandhi International', distanceKm: 18, travelTimeMinutes: 30, estimatedCostInr: 400, distance: '18 km', time: '30 min', cost: '₹400' },
      railway: { name: 'New Delhi Railway Station', distanceKm: 4, travelTimeMinutes: 10, estimatedCostInr: 100, distance: '4 km', time: '10 min', cost: '₹100' },
      cityCenter: { distance: '4 km', time: '10 min' },
      cityDistance: '4 km',
      convenienceScore: 9.3,
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
      Government: colleges.filter(c => c.ownership === 'Government').length,
      Private: colleges.filter(c => c.ownership === 'Private').length,
      'Semi-Government': colleges.filter(c => c.ownership === 'Semi-Government').length,
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
