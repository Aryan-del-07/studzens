import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import process from 'node:process';

dotenv.config({ path: '../.env' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Helper to build facilities array
function mkFacilities(hostel: boolean, gym: boolean, library: boolean, sports: boolean, cafeteria: boolean, lab: boolean, wifi: boolean, medical: boolean) {
  return {
    create: [
      { name: 'Boys Hostel', hasFacility: hostel, details: hostel ? 'On-campus hostel for male students' : null },
      { name: 'Girls Hostel', hasFacility: hostel, details: hostel ? 'On-campus hostel for female students' : null },
      { name: 'Gymnasium', hasFacility: gym, details: gym ? 'Fully equipped gymnasium' : null },
      { name: 'Central Library', hasFacility: library, details: library ? '24x7 digital and physical library' : null },
      { name: 'Sports Complex', hasFacility: sports, details: sports ? 'Cricket, football, basketball courts and swimming pool' : null },
      { name: 'Cafeteria', hasFacility: cafeteria, details: cafeteria ? 'Multiple mess and food outlets on campus' : null },
      { name: 'Research Labs', hasFacility: lab, details: lab ? 'State-of-the-art computing and research labs' : null },
      { name: 'Wi-Fi Campus', hasFacility: wifi, details: wifi ? 'High-speed Wi-Fi across entire campus' : null },
      { name: 'Medical Centre', hasFacility: medical, details: medical ? 'On-campus health centre with ambulance' : null },
    ],
  };
}

async function main() {
  console.log('Starting comprehensive Indian college seed...');

  // Clear all existing data first
  await prisma.facility.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.program.deleteMany();
  await prisma.collegeExam.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.review.deleteMany();
  await prisma.college.deleteMany();
  await prisma.exam.deleteMany();
  console.log('Cleared old data');

  // Create entrance exams
  const jeeAdv    = await prisma.exam.create({ data: { name: 'JEE Advanced', fullName: 'Joint Entrance Examination Advanced', level: 'National' } });
  const jeeMains  = await prisma.exam.create({ data: { name: 'JEE Mains', fullName: 'Joint Entrance Examination Mains', level: 'National' } });
  const cat       = await prisma.exam.create({ data: { name: 'CAT', fullName: 'Common Admission Test', level: 'National' } });
  const gate      = await prisma.exam.create({ data: { name: 'GATE', fullName: 'Graduate Aptitude Test in Engineering', level: 'National' } });
  const bitsat    = await prisma.exam.create({ data: { name: 'BITSAT', fullName: 'BITS Admission Test', level: 'National' } });
  const viteee    = await prisma.exam.create({ data: { name: 'VITEEE', fullName: 'VIT Engineering Entrance Examination', level: 'National' } });
  const srmjeee   = await prisma.exam.create({ data: { name: 'SRMJEEE', fullName: 'SRM Joint Engineering Entrance Examination', level: 'National' } });
  const mhtcet    = await prisma.exam.create({ data: { name: 'MHT-CET', fullName: 'Maharashtra Common Entrance Test', level: 'State' } });
  const keam      = await prisma.exam.create({ data: { name: 'KEAM', fullName: 'Kerala Engineering Architecture Medical', level: 'State' } });
  const kcet      = await prisma.exam.create({ data: { name: 'KCET', fullName: 'Karnataka Common Entrance Test', level: 'State' } });
  const tseamcet  = await prisma.exam.create({ data: { name: 'TS EAMCET', fullName: 'Telangana State Engineering Agriculture and Medical CET', level: 'State' } });
  const wbjee     = await prisma.exam.create({ data: { name: 'WBJEE', fullName: 'West Bengal Joint Entrance Examinations', level: 'State' } });
  const upsee     = await prisma.exam.create({ data: { name: 'UPSEE', fullName: 'Uttar Pradesh State Entrance Examination', level: 'State' } });
  const comedk    = await prisma.exam.create({ data: { name: 'COMEDK', fullName: 'Consortium of Medical Engineering and Dental Colleges of Karnataka', level: 'State' } });
  const neet      = await prisma.exam.create({ data: { name: 'NEET', fullName: 'National Eligibility cum Entrance Test', level: 'National' } });
  console.log('Created 15 entrance exams');

  const colleges = [];

  // ── 1. IIT Bombay ────────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Technology Bombay', shortName: 'IIT Bombay',
    establishedYear: 1958, city: 'Mumbai', state: 'Maharashtra',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '550 acres',
    facultyCount: 700, website: 'https://www.iitb.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 171 },
      { name: 'Electrical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 150 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 140 },
      { name: 'Chemical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 130 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 70 },
      { name: 'Aerospace Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 60 },
      { name: 'Computer Science and Engineering', type: 'MTECH', duration: 2, annualFee: 100000, intake: 80 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 23.5, highestPackage: 450, placementRate: 85 },
      { year: 2023, avgPackageLpa: 21.82, highestPackage: 367, placementRate: 82 },
      { year: 2022, avgPackageLpa: 20.34, highestPackage: 301, placementRate: 80 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeAdv.id }, { examId: gate.id }] },
  }}));

  // ── 2. IIT Delhi ─────────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Technology Delhi', shortName: 'IIT Delhi',
    establishedYear: 1961, city: 'New Delhi', state: 'Delhi',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '325 acres',
    facultyCount: 600, website: 'https://home.iitd.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 173 },
      { name: 'Electrical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 170 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 140 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 80 },
      { name: 'Chemical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 70 },
      { name: 'Production and Industrial Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 65 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 22.0, highestPackage: 300, placementRate: 88 },
      { year: 2023, avgPackageLpa: 20.98, highestPackage: 253, placementRate: 86 },
      { year: 2022, avgPackageLpa: 19.5, highestPackage: 240, placementRate: 84 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeAdv.id }, { examId: gate.id }] },
  }}));

  // ── 3. IIT Madras ────────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Technology Madras', shortName: 'IIT Madras',
    establishedYear: 1959, city: 'Chennai', state: 'Tamil Nadu',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '617 acres',
    facultyCount: 650, website: 'https://www.iitm.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 170 },
      { name: 'Electrical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 155 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 145 },
      { name: 'Aerospace Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 55 },
      { name: 'Naval Architecture and Ocean Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 40 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 22.0, highestPackage: 400, placementRate: 87 },
      { year: 2023, avgPackageLpa: 20.79, highestPackage: 252, placementRate: 85 },
      { year: 2022, avgPackageLpa: 19.0, highestPackage: 210, placementRate: 83 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeAdv.id }, { examId: gate.id }] },
  }}));

  // ── 4. IIT Kanpur ────────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Technology Kanpur', shortName: 'IIT Kanpur',
    establishedYear: 1959, city: 'Kanpur', state: 'Uttar Pradesh',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '1055 acres',
    facultyCount: 500, website: 'https://www.iitk.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 170 },
      { name: 'Electrical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 160 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 140 },
      { name: 'Aerospace Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 70 },
      { name: 'Chemical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 65 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 26.0, highestPackage: 500, placementRate: 80 },
      { year: 2023, avgPackageLpa: 23.5, highestPackage: 415, placementRate: 78 },
      { year: 2022, avgPackageLpa: 21.0, highestPackage: 300, placementRate: 76 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeAdv.id }, { examId: gate.id }] },
  }}));

  // ── 5. IIT Kharagpur ─────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Technology Kharagpur', shortName: 'IIT KGP',
    establishedYear: 1951, city: 'Kharagpur', state: 'West Bengal',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '2100 acres',
    facultyCount: 750, website: 'https://www.iitkgp.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 170 },
      { name: 'Electrical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 170 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 165 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 140 },
      { name: 'Mining Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 55 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 20.0, highestPackage: 250, placementRate: 84 },
      { year: 2023, avgPackageLpa: 18.61, highestPackage: 202, placementRate: 82 },
      { year: 2022, avgPackageLpa: 17.5, highestPackage: 180, placementRate: 80 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeAdv.id }, { examId: gate.id }] },
  }}));

  // ── 6. IIT Roorkee ───────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Technology Roorkee', shortName: 'IIT Roorkee',
    establishedYear: 1847, city: 'Roorkee', state: 'Uttarakhand',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '365 acres',
    facultyCount: 550, website: 'https://www.iitr.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 170 },
      { name: 'Electrical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 140 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 130 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 130 },
      { name: 'Biotechnology', type: 'BTECH', duration: 4, annualFee: 200000, intake: 40 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 19.5, highestPackage: 260, placementRate: 83 },
      { year: 2023, avgPackageLpa: 18.24, highestPackage: 201, placementRate: 81 },
      { year: 2022, avgPackageLpa: 16.5, highestPackage: 170, placementRate: 79 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeAdv.id }, { examId: gate.id }] },
  }}));

  // ── 7. IIT Hyderabad ─────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Technology Hyderabad', shortName: 'IIT Hyderabad',
    establishedYear: 2008, city: 'Hyderabad', state: 'Telangana',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '576 acres',
    facultyCount: 250, website: 'https://iith.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 130 },
      { name: 'Electrical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 100 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 90 },
      { name: 'Artificial Intelligence', type: 'BTECH', duration: 4, annualFee: 200000, intake: 60 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 18.0, highestPackage: 200, placementRate: 82 },
      { year: 2023, avgPackageLpa: 16.5, highestPackage: 180, placementRate: 80 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeAdv.id }, { examId: gate.id }] },
  }}));

  // ── 8. IIT Guwahati ──────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Technology Guwahati', shortName: 'IIT Guwahati',
    establishedYear: 1994, city: 'Guwahati', state: 'Assam',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '705 acres',
    facultyCount: 400, website: 'https://www.iitg.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 130 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 120 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 110 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 80 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 17.0, highestPackage: 120, placementRate: 78 },
      { year: 2023, avgPackageLpa: 15.5, highestPackage: 110, placementRate: 76 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeAdv.id }, { examId: gate.id }] },
  }}));

  // ── 9. IIT BHU Varanasi ──────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Technology BHU Varanasi', shortName: 'IIT BHU',
    establishedYear: 1919, city: 'Varanasi', state: 'Uttar Pradesh',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '1350 acres',
    facultyCount: 450, website: 'https://www.iitbhu.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 120 },
      { name: 'Electronics Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 100 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 100 },
      { name: 'Mining Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 60 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 16.5, highestPackage: 100, placementRate: 77 },
      { year: 2023, avgPackageLpa: 15.0, highestPackage: 93, placementRate: 75 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeAdv.id }, { examId: gate.id }] },
  }}));

  // ── 10. IIT Indore ───────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Technology Indore', shortName: 'IIT Indore',
    establishedYear: 2009, city: 'Indore', state: 'Madhya Pradesh',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '510 acres',
    facultyCount: 200, website: 'https://www.iiti.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 100 },
      { name: 'Electrical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 80 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 80 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 15.0, highestPackage: 120, placementRate: 78 },
      { year: 2023, avgPackageLpa: 14.0, highestPackage: 110, placementRate: 76 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeAdv.id }, { examId: gate.id }] },
  }}));

  // ── 11. IIT Jodhpur ──────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Technology Jodhpur', shortName: 'IIT Jodhpur',
    establishedYear: 2008, city: 'Jodhpur', state: 'Rajasthan',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '852 acres',
    facultyCount: 180, website: 'https://www.iitj.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 100 },
      { name: 'Electrical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 80 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 80 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 14.5, highestPackage: 100, placementRate: 77 },
      { year: 2023, avgPackageLpa: 13.0, highestPackage: 90, placementRate: 75 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeAdv.id }, { examId: gate.id }] },
  }}));

  // ── 12. IIT Mandi ────────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Technology Mandi', shortName: 'IIT Mandi',
    establishedYear: 2009, city: 'Mandi', state: 'Himachal Pradesh',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '537 acres',
    facultyCount: 160, website: 'https://www.iitmandi.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 80 },
      { name: 'Electrical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 75 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 60 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 13.0, highestPackage: 85, placementRate: 74 },
      { year: 2023, avgPackageLpa: 12.0, highestPackage: 75, placementRate: 72 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeAdv.id }, { examId: gate.id }] },
  }}));

  // ── 13. NIT Trichy ───────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'National Institute of Technology Tiruchirappalli', shortName: 'NIT Trichy',
    establishedYear: 1964, city: 'Tiruchirappalli', state: 'Tamil Nadu',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '800 acres',
    facultyCount: 380, website: 'https://www.nitt.edu/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 150000, intake: 165 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 150000, intake: 165 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 150000, intake: 165 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 150000, intake: 100 },
      { name: 'Chemical Engineering', type: 'BTECH', duration: 4, annualFee: 150000, intake: 100 },
      { name: 'Electrical and Electronics Engineering', type: 'BTECH', duration: 4, annualFee: 150000, intake: 150 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 14.0, highestPackage: 100, placementRate: 90 },
      { year: 2023, avgPackageLpa: 12.82, highestPackage: 91, placementRate: 88 },
      { year: 2022, avgPackageLpa: 11.5, highestPackage: 80, placementRate: 85 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }, { examId: gate.id }] },
  }}));

  // ── 14. NIT Warangal ─────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'National Institute of Technology Warangal', shortName: 'NIT Warangal',
    establishedYear: 1959, city: 'Warangal', state: 'Telangana',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '247 acres',
    facultyCount: 350, website: 'https://www.nitw.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 165 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 165 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 165 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 100 },
      { name: 'Electrical Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 150 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 13.5, highestPackage: 90, placementRate: 89 },
      { year: 2023, avgPackageLpa: 12.5, highestPackage: 83, placementRate: 87 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }, { examId: tseamcet.id }, { examId: gate.id }] },
  }}));

  // ── 15. NITK Surathkal ───────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'National Institute of Technology Karnataka Surathkal', shortName: 'NITK Surathkal',
    establishedYear: 1960, city: 'Surathkal', state: 'Karnataka',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '295 acres',
    facultyCount: 300, website: 'https://www.nitk.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 165 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 165 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 155 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 120 },
      { name: 'Chemical Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 100 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 13.0, highestPackage: 85, placementRate: 87 },
      { year: 2023, avgPackageLpa: 12.1, highestPackage: 70, placementRate: 85 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }, { examId: kcet.id }, { examId: gate.id }] },
  }}));

  // ── 16. NIT Calicut ──────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'National Institute of Technology Calicut', shortName: 'NIT Calicut',
    establishedYear: 1961, city: 'Kozhikode', state: 'Kerala',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '124 acres',
    facultyCount: 320, website: 'https://www.nitc.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 160 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 150 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 150 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 90 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 12.5, highestPackage: 75, placementRate: 87 },
      { year: 2023, avgPackageLpa: 11.8, highestPackage: 68, placementRate: 85 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }, { examId: keam.id }, { examId: gate.id }] },
  }}));

  // ── 17. NIT Rourkela ─────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'National Institute of Technology Rourkela', shortName: 'NIT Rourkela',
    establishedYear: 1964, city: 'Rourkela', state: 'Odisha',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '675 acres',
    facultyCount: 330, website: 'https://www.nitrkl.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 165 },
      { name: 'Electrical Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 150 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 150 },
      { name: 'Metallurgical and Materials Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 90 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 12.0, highestPackage: 72, placementRate: 85 },
      { year: 2023, avgPackageLpa: 11.0, highestPackage: 65, placementRate: 83 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }, { examId: gate.id }] },
  }}));

  // ── 18. NIT Durgapur ─────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'National Institute of Technology Durgapur', shortName: 'NIT Durgapur',
    establishedYear: 1960, city: 'Durgapur', state: 'West Bengal',
    tier: 'TIER_2', ownership: 'GOVERNMENT', campusSize: '288 acres',
    facultyCount: 280, website: 'https://www.nitdgp.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 140 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 130 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 130 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 11.0, highestPackage: 65, placementRate: 82 },
      { year: 2023, avgPackageLpa: 10.0, highestPackage: 58, placementRate: 80 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }, { examId: wbjee.id }] },
  }}));

  // ── 19. MNIT Jaipur ──────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Malaviya National Institute of Technology Jaipur', shortName: 'MNIT Jaipur',
    establishedYear: 1963, city: 'Jaipur', state: 'Rajasthan',
    tier: 'TIER_2', ownership: 'GOVERNMENT', campusSize: '317 acres',
    facultyCount: 280, website: 'https://www.mnit.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 165 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 165 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 150 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 11.5, highestPackage: 70, placementRate: 83 },
      { year: 2023, avgPackageLpa: 10.5, highestPackage: 63, placementRate: 81 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }] },
  }}));

  // ── 20. Delhi Technological University ───────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Delhi Technological University', shortName: 'DTU',
    establishedYear: 1941, city: 'New Delhi', state: 'Delhi',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '164 acres',
    facultyCount: 500, website: 'http://dtu.ac.in/',
    programs: { create: [
      { name: 'Computer Engineering', type: 'BTECH', duration: 4, annualFee: 219000, intake: 480 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 219000, intake: 360 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 219000, intake: 240 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 219000, intake: 180 },
      { name: 'Software Engineering', type: 'BTECH', duration: 4, annualFee: 219000, intake: 180 },
      { name: 'Electrical Engineering', type: 'BTECH', duration: 4, annualFee: 219000, intake: 240 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 16.5, highestPackage: 130, placementRate: 92 },
      { year: 2023, avgPackageLpa: 15.1, highestPackage: 120, placementRate: 90 },
      { year: 2022, avgPackageLpa: 13.5, highestPackage: 105, placementRate: 88 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }] },
  }}));

  // ── 21. NSUT Delhi ───────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Netaji Subhas University of Technology', shortName: 'NSUT',
    establishedYear: 1983, city: 'New Delhi', state: 'Delhi',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '145 acres',
    facultyCount: 250, website: 'http://www.nsut.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 360 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 240 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 180 },
      { name: 'Information Technology', type: 'BTECH', duration: 4, annualFee: 200000, intake: 240 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 14.0, highestPackage: 90, placementRate: 88 },
      { year: 2023, avgPackageLpa: 12.5, highestPackage: 82, placementRate: 86 },
    ]},
    facilities: mkFacilities(true, false, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }] },
  }}));

  // ── 22. BITS Pilani ──────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'BITS Pilani', shortName: 'BITS Pilani',
    establishedYear: 1964, city: 'Pilani', state: 'Rajasthan',
    tier: 'TIER_1', ownership: 'PRIVATE', campusSize: '328 acres',
    facultyCount: 440, website: 'https://www.bits-pilani.ac.in/',
    programs: { create: [
      { name: 'Computer Science', type: 'BTECH', duration: 4, annualFee: 550000, intake: 320 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 550000, intake: 220 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 550000, intake: 160 },
      { name: 'Chemical Engineering', type: 'BTECH', duration: 4, annualFee: 550000, intake: 100 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 550000, intake: 90 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 22.0, highestPackage: 300, placementRate: 93 },
      { year: 2023, avgPackageLpa: 20.0, highestPackage: 250, placementRate: 91 },
      { year: 2022, avgPackageLpa: 18.0, highestPackage: 220, placementRate: 89 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: bitsat.id }] },
  }}));

  // ── 23. BITS Goa ─────────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'BITS Pilani Goa Campus', shortName: 'BITS Goa',
    establishedYear: 2004, city: 'Goa', state: 'Goa',
    tier: 'TIER_1', ownership: 'PRIVATE', campusSize: '180 acres',
    facultyCount: 250, website: 'https://www.bits-pilani.ac.in/goa/',
    programs: { create: [
      { name: 'Computer Science', type: 'BTECH', duration: 4, annualFee: 550000, intake: 200 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 550000, intake: 180 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 550000, intake: 120 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 20.0, highestPackage: 220, placementRate: 91 },
      { year: 2023, avgPackageLpa: 18.5, highestPackage: 200, placementRate: 89 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: bitsat.id }] },
  }}));

  // ── 24. BITS Hyderabad ───────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'BITS Pilani Hyderabad Campus', shortName: 'BITS Hyderabad',
    establishedYear: 2008, city: 'Hyderabad', state: 'Telangana',
    tier: 'TIER_1', ownership: 'PRIVATE', campusSize: '200 acres',
    facultyCount: 300, website: 'https://www.bits-pilani.ac.in/hyderabad/',
    programs: { create: [
      { name: 'Computer Science', type: 'BTECH', duration: 4, annualFee: 550000, intake: 280 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 550000, intake: 200 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 550000, intake: 130 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 19.0, highestPackage: 200, placementRate: 90 },
      { year: 2023, avgPackageLpa: 17.5, highestPackage: 180, placementRate: 88 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: bitsat.id }, { examId: tseamcet.id }] },
  }}));

  // ── 25. IIM Ahmedabad ────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Management Ahmedabad', shortName: 'IIM-A',
    establishedYear: 1961, city: 'Ahmedabad', state: 'Gujarat',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '103 acres',
    facultyCount: 100, website: 'https://www.iima.ac.in/',
    programs: { create: [
      { name: 'Post Graduate Programme in Management', type: 'MBA', duration: 2, annualFee: 1600000, intake: 400 },
      { name: 'Executive MBA', type: 'MBA', duration: 1, annualFee: 3300000, intake: 60 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 35.1, highestPackage: 500, placementRate: 100 },
      { year: 2023, avgPackageLpa: 32.5, highestPackage: 400, placementRate: 100 },
      { year: 2022, avgPackageLpa: 30.0, highestPackage: 350, placementRate: 100 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, false, true, true),
    exams: { create: [{ examId: cat.id }] },
  }}));

  // ── 26. IIM Bangalore ────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Management Bangalore', shortName: 'IIM-B',
    establishedYear: 1973, city: 'Bengaluru', state: 'Karnataka',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '100 acres',
    facultyCount: 120, website: 'https://www.iimb.ac.in/',
    programs: { create: [
      { name: 'Post Graduate Programme in Management', type: 'MBA', duration: 2, annualFee: 2400000, intake: 505 },
      { name: 'Executive Post Graduate Programme', type: 'MBA', duration: 1, annualFee: 3000000, intake: 100 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 34.1, highestPackage: 450, placementRate: 100 },
      { year: 2023, avgPackageLpa: 31.5, highestPackage: 390, placementRate: 100 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, false, true, true),
    exams: { create: [{ examId: cat.id }] },
  }}));

  // ── 27. IIM Calcutta ─────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Management Calcutta', shortName: 'IIM-C',
    establishedYear: 1961, city: 'Kolkata', state: 'West Bengal',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '135 acres',
    facultyCount: 110, website: 'https://www.iimcal.ac.in/',
    programs: { create: [
      { name: 'Post Graduate Programme in Management', type: 'MBA', duration: 2, annualFee: 2700000, intake: 480 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 35.1, highestPackage: 440, placementRate: 100 },
      { year: 2023, avgPackageLpa: 32.0, highestPackage: 400, placementRate: 100 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, false, true, true),
    exams: { create: [{ examId: cat.id }] },
  }}));

  // ── 28. IIM Lucknow ──────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Management Lucknow', shortName: 'IIM-L',
    establishedYear: 1984, city: 'Lucknow', state: 'Uttar Pradesh',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '200 acres',
    facultyCount: 100, website: 'https://www.iiml.ac.in/',
    programs: { create: [
      { name: 'Post Graduate Programme in Management', type: 'MBA', duration: 2, annualFee: 2200000, intake: 480 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 31.5, highestPackage: 350, placementRate: 100 },
      { year: 2023, avgPackageLpa: 30.0, highestPackage: 310, placementRate: 100 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, false, true, true),
    exams: { create: [{ examId: cat.id }] },
  }}));

  // ── 29. IIM Kozhikode ────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Management Kozhikode', shortName: 'IIM-K',
    establishedYear: 1996, city: 'Kozhikode', state: 'Kerala',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '100 acres',
    facultyCount: 90, website: 'https://www.iimk.ac.in/',
    programs: { create: [
      { name: 'Post Graduate Programme in Management', type: 'MBA', duration: 2, annualFee: 2100000, intake: 390 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 29.5, highestPackage: 300, placementRate: 100 },
      { year: 2023, avgPackageLpa: 27.9, highestPackage: 280, placementRate: 100 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, false, true, true),
    exams: { create: [{ examId: cat.id }] },
  }}));

  // ── 30. IIIT Hyderabad ───────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'International Institute of Information Technology Hyderabad', shortName: 'IIIT Hyderabad',
    establishedYear: 1998, city: 'Hyderabad', state: 'Telangana',
    tier: 'TIER_1', ownership: 'SEMI_GOVERNMENT', campusSize: '66 acres',
    facultyCount: 150, website: 'https://www.iiit.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 315000, intake: 200 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 315000, intake: 130 },
      { name: 'Computer Science and Engineering', type: 'MTECH', duration: 2, annualFee: 200000, intake: 200 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 20.0, highestPackage: 200, placementRate: 90 },
      { year: 2023, avgPackageLpa: 18.5, highestPackage: 180, placementRate: 88 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeAdv.id }, { examId: tseamcet.id }, { examId: gate.id }] },
  }}));

  // ── 31. IIIT Delhi ───────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indraprastha Institute of Information Technology Delhi', shortName: 'IIIT Delhi',
    establishedYear: 2008, city: 'New Delhi', state: 'Delhi',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '25 acres',
    facultyCount: 120, website: 'https://www.iiitd.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 335000, intake: 300 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 335000, intake: 150 },
      { name: 'Computational Biology', type: 'BTECH', duration: 4, annualFee: 335000, intake: 60 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 17.0, highestPackage: 120, placementRate: 87 },
      { year: 2023, avgPackageLpa: 15.5, highestPackage: 110, placementRate: 85 },
    ]},
    facilities: mkFacilities(true, true, true, false, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }, { examId: gate.id }] },
  }}));

  // ── 32. Jadavpur University ──────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Jadavpur University', shortName: 'JU',
    establishedYear: 1955, city: 'Kolkata', state: 'West Bengal',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '65 acres',
    facultyCount: 600, website: 'https://jadavpuruniversity.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 15000, intake: 100 },
      { name: 'Electronics and Telecommunication Engineering', type: 'BTECH', duration: 4, annualFee: 15000, intake: 100 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 15000, intake: 100 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 15000, intake: 80 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 12.0, highestPackage: 80, placementRate: 82 },
      { year: 2023, avgPackageLpa: 11.0, highestPackage: 72, placementRate: 80 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: wbjee.id }, { examId: jeeMains.id }] },
  }}));

  // ── 33. Anna University - CEG ────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Anna University College of Engineering Guindy', shortName: 'CEG Anna University',
    establishedYear: 1794, city: 'Chennai', state: 'Tamil Nadu',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '185 acres',
    facultyCount: 350, website: 'https://www.annauniv.edu/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 75000, intake: 180 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 75000, intake: 180 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 75000, intake: 120 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 75000, intake: 90 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 9.5, highestPackage: 65, placementRate: 85 },
      { year: 2023, avgPackageLpa: 8.9, highestPackage: 58, placementRate: 83 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }] },
  }}));

  // ── 34. PEC Chandigarh ───────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Punjab Engineering College', shortName: 'PEC Chandigarh',
    establishedYear: 1921, city: 'Chandigarh', state: 'Chandigarh',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '143 acres',
    facultyCount: 220, website: 'https://www.pec.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 120 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 120 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 90 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 135000, intake: 80 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 12.5, highestPackage: 80, placementRate: 83 },
      { year: 2023, avgPackageLpa: 11.5, highestPackage: 72, placementRate: 81 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }] },
  }}));

  // ── 35. COEP Technological University ───────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'COEP Technological University', shortName: 'COEP Pune',
    establishedYear: 1854, city: 'Pune', state: 'Maharashtra',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '52 acres',
    facultyCount: 250, website: 'https://www.coeptech.ac.in/',
    programs: { create: [
      { name: 'Computer Engineering', type: 'BTECH', duration: 4, annualFee: 150000, intake: 120 },
      { name: 'Electronics and Telecommunication Engineering', type: 'BTECH', duration: 4, annualFee: 150000, intake: 120 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 150000, intake: 120 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 150000, intake: 90 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 11.0, highestPackage: 70, placementRate: 85 },
      { year: 2023, avgPackageLpa: 10.0, highestPackage: 63, placementRate: 83 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: mhtcet.id }, { examId: jeeMains.id }] },
  }}));

  // ── 36. VIT Vellore ──────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'VIT University Vellore', shortName: 'VIT Vellore',
    establishedYear: 1984, city: 'Vellore', state: 'Tamil Nadu',
    tier: 'TIER_2', ownership: 'PRIVATE', campusSize: '372 acres',
    facultyCount: 3000, website: 'https://vit.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 400000, intake: 1800 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 400000, intake: 900 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 400000, intake: 720 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 400000, intake: 420 },
      { name: 'Biomedical Engineering', type: 'BTECH', duration: 4, annualFee: 400000, intake: 300 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 8.5, highestPackage: 60, placementRate: 82 },
      { year: 2023, avgPackageLpa: 7.84, highestPackage: 50, placementRate: 80 },
      { year: 2022, avgPackageLpa: 7.0, highestPackage: 44, placementRate: 78 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: viteee.id }, { examId: jeeMains.id }] },
  }}));

  // ── 37. SRM Institute of Science and Technology ──────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'SRM Institute of Science and Technology', shortName: 'SRMIST',
    establishedYear: 1985, city: 'Kattankulathur', state: 'Tamil Nadu',
    tier: 'TIER_2', ownership: 'PRIVATE', campusSize: '252 acres',
    facultyCount: 2700, website: 'https://www.srmist.edu.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 350000, intake: 2400 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 350000, intake: 900 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 350000, intake: 600 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 7.0, highestPackage: 48, placementRate: 79 },
      { year: 2023, avgPackageLpa: 6.54, highestPackage: 42, placementRate: 77 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: srmjeee.id }, { examId: jeeMains.id }] },
  }}));

  // ── 38. Manipal Institute of Technology ──────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Manipal Institute of Technology', shortName: 'MIT Manipal',
    establishedYear: 1957, city: 'Manipal', state: 'Karnataka',
    tier: 'TIER_2', ownership: 'PRIVATE', campusSize: '608 acres',
    facultyCount: 1500, website: 'https://manipal.edu/mit.html',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 450000, intake: 900 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 450000, intake: 720 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 450000, intake: 480 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 450000, intake: 240 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 9.5, highestPackage: 70, placementRate: 84 },
      { year: 2023, avgPackageLpa: 8.89, highestPackage: 62, placementRate: 82 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: kcet.id }, { examId: jeeMains.id }] },
  }}));

  // ── 39. Thapar University ────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Thapar Institute of Engineering and Technology', shortName: 'Thapar University',
    establishedYear: 1956, city: 'Patiala', state: 'Punjab',
    tier: 'TIER_2', ownership: 'PRIVATE', campusSize: '250 acres',
    facultyCount: 600, website: 'https://www.thapar.edu/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 400000, intake: 450 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 400000, intake: 300 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 400000, intake: 240 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 10.5, highestPackage: 72, placementRate: 85 },
      { year: 2023, avgPackageLpa: 9.5, highestPackage: 65, placementRate: 83 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }] },
  }}));

  // ── 40. VJTI Mumbai ──────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Veermata Jijabai Technological Institute', shortName: 'VJTI Mumbai',
    establishedYear: 1887, city: 'Mumbai', state: 'Maharashtra',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '13 acres',
    facultyCount: 180, website: 'https://vjti.ac.in/',
    programs: { create: [
      { name: 'Computer Engineering', type: 'BTECH', duration: 4, annualFee: 130000, intake: 120 },
      { name: 'Electronics Engineering', type: 'BTECH', duration: 4, annualFee: 130000, intake: 120 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 130000, intake: 120 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 130000, intake: 60 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 10.5, highestPackage: 65, placementRate: 86 },
      { year: 2023, avgPackageLpa: 9.7, highestPackage: 58, placementRate: 84 },
    ]},
    facilities: mkFacilities(false, true, true, false, true, true, true, true),
    exams: { create: [{ examId: mhtcet.id }, { examId: jeeMains.id }] },
  }}));

  // ── 41. PSG College of Technology ───────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'PSG College of Technology', shortName: 'PSG Tech',
    establishedYear: 1951, city: 'Coimbatore', state: 'Tamil Nadu',
    tier: 'TIER_2', ownership: 'PRIVATE', campusSize: '40 acres',
    facultyCount: 500, website: 'https://www.psgtech.edu/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 120000, intake: 120 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 120000, intake: 120 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 120000, intake: 120 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 8.0, highestPackage: 45, placementRate: 84 },
      { year: 2023, avgPackageLpa: 7.4, highestPackage: 40, placementRate: 82 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }] },
  }}));

  // ── 42. BMS College of Engineering ──────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'BMS College of Engineering', shortName: 'BMSCE',
    establishedYear: 1946, city: 'Bengaluru', state: 'Karnataka',
    tier: 'TIER_2', ownership: 'PRIVATE', campusSize: '20 acres',
    facultyCount: 350, website: 'https://www.bmsce.ac.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 180 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 180 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 120 },
      { name: 'Civil Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 90 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 9.0, highestPackage: 55, placementRate: 83 },
      { year: 2023, avgPackageLpa: 8.3, highestPackage: 48, placementRate: 81 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: kcet.id }, { examId: comedk.id }, { examId: jeeMains.id }] },
  }}));

  // ── 43. RV College of Engineering ───────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'R.V. College of Engineering', shortName: 'RVCE',
    establishedYear: 1963, city: 'Bengaluru', state: 'Karnataka',
    tier: 'TIER_2', ownership: 'PRIVATE', campusSize: '16 acres',
    facultyCount: 350, website: 'https://www.rvce.edu.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 270000, intake: 180 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 270000, intake: 180 },
      { name: 'Information Science and Engineering', type: 'BTECH', duration: 4, annualFee: 270000, intake: 120 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 9.5, highestPackage: 60, placementRate: 85 },
      { year: 2023, avgPackageLpa: 8.8, highestPackage: 54, placementRate: 83 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: kcet.id }, { examId: comedk.id }, { examId: jeeMains.id }] },
  }}));

  // ── 44. PES University ───────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'PES University', shortName: 'PESU',
    establishedYear: 1988, city: 'Bengaluru', state: 'Karnataka',
    tier: 'TIER_2', ownership: 'PRIVATE', campusSize: '50 acres',
    facultyCount: 450, website: 'https://pes.edu/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 340000, intake: 360 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 340000, intake: 180 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 340000, intake: 120 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 10.0, highestPackage: 65, placementRate: 86 },
      { year: 2023, avgPackageLpa: 9.2, highestPackage: 58, placementRate: 84 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: kcet.id }, { examId: comedk.id }] },
  }}));

  // ── 45. Amity University ─────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Amity University Uttar Pradesh', shortName: 'Amity University',
    establishedYear: 2005, city: 'Noida', state: 'Uttar Pradesh',
    tier: 'TIER_2', ownership: 'PRIVATE', campusSize: '1000 acres',
    facultyCount: 4000, website: 'https://www.amity.edu/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 350000, intake: 900 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 350000, intake: 400 },
      { name: 'Business Administration', type: 'BBA', duration: 3, annualFee: 250000, intake: 500 },
      { name: 'Master of Business Administration', type: 'MBA', duration: 2, annualFee: 400000, intake: 500 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 6.5, highestPackage: 45, placementRate: 76 },
      { year: 2023, avgPackageLpa: 6.0, highestPackage: 40, placementRate: 74 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }, { examId: upsee.id }] },
  }}));

  // ── 46. Shiv Nadar University ────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Shiv Nadar University', shortName: 'SNU',
    establishedYear: 2011, city: 'Greater Noida', state: 'Uttar Pradesh',
    tier: 'TIER_2', ownership: 'PRIVATE', campusSize: '286 acres',
    facultyCount: 600, website: 'https://snu.edu.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 450000, intake: 400 },
      { name: 'Electronics and Communication Engineering', type: 'BTECH', duration: 4, annualFee: 450000, intake: 200 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 450000, intake: 150 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 13.0, highestPackage: 90, placementRate: 88 },
      { year: 2023, avgPackageLpa: 12.0, highestPackage: 82, placementRate: 86 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }, { examId: upsee.id }] },
  }}));

  // ── 47. Ashoka University ────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Ashoka University', shortName: 'Ashoka',
    establishedYear: 2014, city: 'Sonipat', state: 'Haryana',
    tier: 'TIER_2', ownership: 'PRIVATE', campusSize: '25 acres',
    facultyCount: 300, website: 'https://www.ashoka.edu.in/',
    programs: { create: [
      { name: 'Bachelor of Arts', type: 'BA', duration: 4, annualFee: 1050000, intake: 300 },
      { name: 'Master of Arts in Economics', type: 'MA', duration: 2, annualFee: 900000, intake: 100 },
      { name: 'Master of Business Administration', type: 'MBA', duration: 2, annualFee: 1400000, intake: 60 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 11.0, highestPackage: 60, placementRate: 82 },
      { year: 2023, avgPackageLpa: 10.0, highestPackage: 52, placementRate: 80 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, false, true, true),
    exams: { create: [] },
  }}));

  // ── 48. Lovely Professional University ──────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Lovely Professional University', shortName: 'LPU',
    establishedYear: 2005, city: 'Phagwara', state: 'Punjab',
    tier: 'TIER_3', ownership: 'PRIVATE', campusSize: '600 acres',
    facultyCount: 5000, website: 'https://www.lpu.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 3000 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 900 },
      { name: 'Business Administration', type: 'BBA', duration: 3, annualFee: 160000, intake: 1200 },
      { name: 'Master of Business Administration', type: 'MBA', duration: 2, annualFee: 240000, intake: 600 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 5.5, highestPackage: 38, placementRate: 70 },
      { year: 2023, avgPackageLpa: 5.0, highestPackage: 35, placementRate: 68 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }] },
  }}));

  // ── 49. Chandigarh University ────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Chandigarh University', shortName: 'CU Mohali',
    establishedYear: 2012, city: 'Mohali', state: 'Punjab',
    tier: 'TIER_3', ownership: 'PRIVATE', campusSize: '200 acres',
    facultyCount: 2000, website: 'https://www.cuchd.in/',
    programs: { create: [
      { name: 'Computer Science and Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 2000 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 600 },
      { name: 'Business Administration', type: 'BBA', duration: 3, annualFee: 150000, intake: 800 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 5.8, highestPackage: 42, placementRate: 73 },
      { year: 2023, avgPackageLpa: 5.3, highestPackage: 38, placementRate: 71 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, true, true, true),
    exams: { create: [{ examId: jeeMains.id }] },
  }}));

  // ── 50. KJ Somaiya College of Engineering ───────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'K.J. Somaiya College of Engineering', shortName: 'KJSCE Mumbai',
    establishedYear: 1983, city: 'Mumbai', state: 'Maharashtra',
    tier: 'TIER_2', ownership: 'PRIVATE', campusSize: '20 acres',
    facultyCount: 200, website: 'https://kjsce.somaiya.edu/',
    programs: { create: [
      { name: 'Computer Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 180 },
      { name: 'Electronics Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 120 },
      { name: 'Mechanical Engineering', type: 'BTECH', duration: 4, annualFee: 200000, intake: 120 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 8.5, highestPackage: 50, placementRate: 82 },
      { year: 2023, avgPackageLpa: 7.9, highestPackage: 45, placementRate: 80 },
    ]},
    facilities: mkFacilities(false, true, true, true, true, true, true, false),
    exams: { create: [{ examId: mhtcet.id }, { examId: jeeMains.id }] },
  }}));

  // ── 51. IIM Indore ───────────────────────────────────────────────────────────
  colleges.push(await prisma.college.create({ data: {
    name: 'Indian Institute of Management Indore', shortName: 'IIM-I',
    establishedYear: 1996, city: 'Indore', state: 'Madhya Pradesh',
    tier: 'TIER_1', ownership: 'GOVERNMENT', campusSize: '193 acres',
    facultyCount: 100, website: 'https://www.iimidr.ac.in/',
    programs: { create: [
      { name: 'Post Graduate Programme in Management', type: 'MBA', duration: 2, annualFee: 1800000, intake: 550 },
      { name: 'Integrated Programme in Management', type: 'BBA', duration: 5, annualFee: 1200000, intake: 120 },
    ]},
    placements: { create: [
      { year: 2024, avgPackageLpa: 28.0, highestPackage: 280, placementRate: 100 },
      { year: 2023, avgPackageLpa: 26.5, highestPackage: 250, placementRate: 100 },
    ]},
    facilities: mkFacilities(true, true, true, true, true, false, true, true),
    exams: { create: [{ examId: cat.id }] },
  }}));

  console.log(`Seeded ${colleges.length} colleges successfully!`);
  console.log('Data includes: Programs, Placements (2022-2024), Facilities, Entrance Exams');
  console.log('Coverage: 9 IITs, 7 NITs, 4 IIMs, BITS (3 campuses), 2 IIITs, DTU, NSUT,');
  console.log('          Jadavpur, Anna Univ, PEC, COEP, VJTI, VIT, SRM, Manipal, Thapar,');
  console.log('          PSG Tech, BMSCE, RVCE, PESU, Amity, SNU, Ashoka, LPU, CU, KJSCE');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });


