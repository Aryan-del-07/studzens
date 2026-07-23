import type { Exam } from '../../types/exam';


/**
 * exams.ts
 *
 * WHAT THIS FILE DOES:
 * Contains the complete database of entrance exams in the app.
 * Includes exam dates, eligibility, syllabus, and related colleges.
 *
 * WHY IT EXISTS:
 * Like colleges.ts, this stores all exam data locally for fast access
 * and offline functionality. A real app would fetch this from an API.
 *
 * KEY CONCEPTS:
 * - `exams`: Array of exam objects with dates, eligibility, and patterns
 * - `getExamById`: Helper function to find an exam by ID
 * - `getRelatedColleges`: Finds which colleges accept a given exam
 * - Categories: Engineering, Medical, Law, Design, etc.
 * - Mock exam dates: Used for countdown timers and calendar events
 */
export const exams: Exam[] = [
 {
 id:"jee-main",
 name:"JEE Main",
 fullName:"Joint Entrance Examination - Main",
 category:"Engineering",
 level:"National",
 conductingBody:"NTA",
 officialWebsite:"https://jeemain.nta.ac.in/",
 description:"National level exam for admission to NITs, IIITs, and other GFTIs.",
 eligibility: ["10+2 with Physics, Chemistry, Mathematics","75% aggregate in 12th board"],
 pattern: {
 mode:"Computer Based Test (CBT)",
 durationMinutes: 180,
 totalMarks: 300,
 totalQuestions: 90,
 sections: [
 { name:"Physics", questions: 30, marks: 100 },
 { name:"Chemistry", questions: 30, marks: 100 },
 { name:"Mathematics", questions: 30, marks: 100 }
 ]
 },
 markingScheme: { correct: 4, incorrect: -1, unanswered: 0 },
 syllabusOverview:"Class 11 and 12 CBSE syllabus for Physics, Chemistry, and Mathematics.",
 importantDates: {
 registrationStart:"2025-11-01",
 registrationEnd:"2025-12-15",
 admitCard:"2026-01-20",
 examStart:"2026-01-24",
 examEnd:"2026-02-01",
 resultExpected:"2026-02-12",
 counselingStart:"2026-06-15"
 },
 acceptedBy: ["NITs","IIITs","GFTIs"],
 difficultyLevel: 4
 },
 {
 id:"jee-advanced",
 name:"JEE Advanced",
 fullName:"Joint Entrance Examination - Advanced",
 category:"Engineering",
 level:"National",
 conductingBody:"IIT",
 officialWebsite:"https://jeeadv.ac.in/",
 description:"Second tier of JEE for admission to IITs.",
 eligibility: ["Top 2.5 lakh rankers in JEE Main"],
 pattern: {
 mode:"Computer Based Test (CBT)",
 durationMinutes: 360,
 totalMarks: 360,
 totalQuestions: 108,
 sections: [
 { name:"Physics", questions: 36, marks: 120 },
 { name:"Chemistry", questions: 36, marks: 120 },
 { name:"Mathematics", questions: 36, marks: 120 }
 ]
 },
 markingScheme: { correct: 3, incorrect: -1, unanswered: 0 },
 syllabusOverview:"Advanced level Physics, Chemistry, and Mathematics concepts.",
 importantDates: {
 registrationStart:"2026-04-20",
 registrationEnd:"2026-05-05",
 admitCard:"2026-05-15",
 examStart:"2026-06-05",
 resultExpected:"2026-06-18",
 counselingStart:"2026-06-25"
 },
 acceptedBy: ["IITs"],
 difficultyLevel: 5
 },
 {
 id:"bitsat",
 name:"BITSAT",
 fullName:"Birla Institute of Technology and Science Admission Test",
 category:"Engineering",
 level:"National",
 conductingBody:"BITS Pilani",
 officialWebsite:"https://www.bitsadmission.com/",
 description:"Entrance exam for BITS campuses in Pilani, Goa, and Hyderabad.",
 eligibility: ["10+2 with PCM","75% aggregate in PCM"],
 pattern: {
 mode:"Computer Based Test (CBT)",
 durationMinutes: 180,
 totalMarks: 390,
 totalQuestions: 130,
 sections: [
 { name:"Physics", questions: 30, marks: 90 },
 { name:"Chemistry", questions: 30, marks: 90 },
 { name:"English Proficiency", questions: 10, marks: 30 },
 { name:"Logical Reasoning", questions: 20, marks: 60 },
 { name:"Mathematics", questions: 40, marks: 120 }
 ]
 },
 markingScheme: { correct: 3, incorrect: -1, unanswered: 0 },
 syllabusOverview:"Class 11 and 12 CBSE syllabus along with English and Logical Reasoning.",
 importantDates: {
 registrationStart:"2026-01-15",
 registrationEnd:"2026-04-10",
 admitCard:"2026-05-15",
 examStart:"2026-05-20",
 examEnd:"2026-05-25",
 resultExpected:"2026-06-05",
 counselingStart:"2026-06-15"
 },
 acceptedBy: ["BITS Pilani","BITS Goa","BITS Hyderabad"],
 difficultyLevel: 4
 },
 {
 id:"viteee",
 name:"VITEEE",
 fullName:"VIT Engineering Entrance Examination",
 category:"Engineering",
 level:"University",
 conductingBody:"Vellore Institute of Technology",
 officialWebsite:"https://viteee.vit.ac.in/",
 description:"Entrance exam for VIT campuses.",
 eligibility: ["10+2 with PCM/PCB","60% aggregate in PCM/PCB"],
 pattern: {
 mode:"Computer Based Test (CBT)",
 durationMinutes: 150,
 totalMarks: 125,
 totalQuestions: 125,
 sections: [
 { name:"Physics", questions: 35, marks: 35 },
 { name:"Chemistry", questions: 35, marks: 35 },
 { name:"Mathematics", questions: 40, marks: 40 },
 { name:"Aptitude", questions: 10, marks: 10 },
 { name:"English", questions: 5, marks: 5 }
 ]
 },
 markingScheme: { correct: 1, incorrect: 0, unanswered: 0 },
 syllabusOverview:"State Board/CBSE syllabus for Class 11 and 12.",
 importantDates: {
 registrationStart:"2025-11-01",
 registrationEnd:"2026-03-30",
 admitCard:"2026-04-05",
 examStart:"2026-04-15",
 examEnd:"2026-04-25",
 resultExpected:"2026-05-05",
 counselingStart:"2026-05-10"
 },
 acceptedBy: ["VIT Vellore","VIT Chennai","VIT AP","VIT Bhopal"],
 difficultyLevel: 3
 },
 {
 id:"srmjeee",
 name:"SRMJEEE",
 fullName:"SRM Joint Engineering Entrance Examination",
 category:"Engineering",
 level:"University",
 conductingBody:"SRM Institute of Science and Technology",
 officialWebsite:"https://www.srmist.edu.in/",
 description:"University level exam for B.Tech admission to SRM campuses.",
 eligibility: ["10+2 with PCM","60% minimum aggregate"],
 pattern: {
 mode:"Remote Proctored Online Mode",
 durationMinutes: 150,
 totalMarks: 125,
 totalQuestions: 125,
 sections: [
 { name:"Physics", questions: 35, marks: 35 },
 { name:"Chemistry", questions: 35, marks: 35 },
 { name:"Mathematics", questions: 40, marks: 40 },
 { name:"English", questions: 5, marks: 5 },
 { name:"Aptitude", questions: 10, marks: 10 }
 ]
 },
 markingScheme: { correct: 1, incorrect: 0, unanswered: 0 },
 syllabusOverview:"Physics, Chemistry, Maths, English, and Aptitude.",
 importantDates: {
 registrationStart:"2025-11-10",
 registrationEnd:"2026-04-10",
 admitCard:"2026-04-15",
 examStart:"2026-04-20",
 examEnd:"2026-04-22",
 resultExpected:"2026-05-01",
 counselingStart:"2026-05-05"
 },
 acceptedBy: ["SRM Kattankulathur","SRM Ramapuram","SRM AP","SRM NCR"],
 difficultyLevel: 3
 },
 {
 id:"comedk",
 name:"COMEDK UGET",
 fullName:"Consortium of Medical, Engineering and Dental Colleges of Karnataka",
 category:"Engineering",
 level:"State",
 conductingBody:"COMEDK",
 officialWebsite:"https://www.comedk.org/",
 description:"Entrance exam for private engineering colleges in Karnataka.",
 eligibility: ["10+2 with PCM","45% minimum aggregate"],
 pattern: {
 mode:"Computer Based Test (CBT)",
 durationMinutes: 180,
 totalMarks: 180,
 totalQuestions: 180,
 sections: [
 { name:"Physics", questions: 60, marks: 60 },
 { name:"Chemistry", questions: 60, marks: 60 },
 { name:"Mathematics", questions: 60, marks: 60 }
 ]
 },
 markingScheme: { correct: 1, incorrect: 0, unanswered: 0 },
 syllabusOverview:"Class 11 and 12 CBSE/State syllabus for PCM.",
 importantDates: {
 registrationStart:"2026-02-01",
 registrationEnd:"2026-04-05",
 admitCard:"2026-05-05",
 examStart:"2026-05-12",
 resultExpected:"2026-05-25",
 counselingStart:"2026-06-10"
 },
 acceptedBy: ["RVCE","BMSCE","MSRIT","Other Karnataka Private Colleges"],
 difficultyLevel: 3
 },
 {
 id:"kcet",
 name:"KCET",
 fullName:"Karnataka Common Entrance Test",
 category:"Engineering",
 level:"State",
 conductingBody:"KEA",
 officialWebsite:"https://cetonline.karnataka.gov.in/kea/",
 description:"State level exam for engineering colleges in Karnataka.",
 eligibility: ["10+2 with PCM","Karnataka domicile (generally)"],
 pattern: {
 mode:"Offline (Pen and Paper)",
 durationMinutes: 240, 
 totalMarks: 180,
 totalQuestions: 180,
 sections: [
 { name:"Physics", questions: 60, marks: 60 },
 { name:"Chemistry", questions: 60, marks: 60 },
 { name:"Mathematics", questions: 60, marks: 60 }
 ]
 },
 markingScheme: { correct: 1, incorrect: 0, unanswered: 0 },
 syllabusOverview:"First and Second PUC syllabus prescribed by the Department of Pre-University Education of Karnataka State.",
 importantDates: {
 registrationStart:"2026-02-15",
 registrationEnd:"2026-03-20",
 admitCard:"2026-04-05",
 examStart:"2026-04-18",
 examEnd:"2026-04-19",
 resultExpected:"2026-05-20",
 counselingStart:"2026-06-15"
 },
 acceptedBy: ["Karnataka State Engineering Colleges"],
 difficultyLevel: 3
 },
 {
 id:"mht-cet",
 name:"MHT CET",
 fullName:"Maharashtra Common Entrance Test",
 category:"Engineering",
 level:"State",
 conductingBody:"State CET Cell, Maharashtra",
 officialWebsite:"https://cetcell.mahacet.org/",
 description:"State level entrance exam for admission to engineering and pharmacy colleges in Maharashtra.",
 eligibility: ["10+2 with PCM/PCB","Maharashtra Domicile (preferred)"],
 pattern: {
 mode:"Computer Based Test (CBT)",
 durationMinutes: 180,
 totalMarks: 200,
 totalQuestions: 150,
 sections: [
 { name:"Physics", questions: 50, marks: 50 },
 { name:"Chemistry", questions: 50, marks: 50 },
 { name:"Mathematics", questions: 50, marks: 100 }
 ]
 },
 markingScheme: { correct: 1, incorrect: 0, unanswered: 0 },
 syllabusOverview:"Maharashtra State Board syllabus for Class 11 (20% weightage) and Class 12 (80% weightage).",
 importantDates: {
 registrationStart:"2026-01-16",
 registrationEnd:"2026-03-01",
 admitCard:"2026-04-10",
 examStart:"2026-04-25",
 examEnd:"2026-05-05",
 resultExpected:"2026-06-10",
 counselingStart:"2026-06-25"
 },
 acceptedBy: ["COEP","VJTI","SPIT","Other Maharashtra Engineering Colleges"],
 difficultyLevel: 3
 },
 {
 id:"wbjee",
 name:"WBJEE",
 fullName:"West Bengal Joint Entrance Examinations",
 category:"Engineering",
 level:"State",
 conductingBody:"WBJEEB",
 officialWebsite:"https://wbjeeb.nic.in/",
 description:"State-level exam for admission to undergraduate engineering courses in West Bengal.",
 eligibility: ["10+2 with PCM","45% minimum aggregate"],
 pattern: {
 mode:"Offline (Pen and Paper)",
 durationMinutes: 240,
 totalMarks: 200,
 totalQuestions: 155,
 sections: [
 { name:"Mathematics", questions: 75, marks: 100 },
 { name:"Physics", questions: 40, marks: 50 },
 { name:"Chemistry", questions: 40, marks: 50 }
 ]
 },
 markingScheme: { correct: 1, incorrect: -0.25, unanswered: 0 },
 syllabusOverview:"Class 11 and 12 curriculum of Physics, Chemistry, and Mathematics.",
 importantDates: {
 registrationStart:"2025-12-25",
 registrationEnd:"2026-01-31",
 admitCard:"2026-04-18",
 examStart:"2026-04-28",
 resultExpected:"2026-05-25",
 counselingStart:"2026-06-15"
 },
 acceptedBy: ["Jadavpur University","IEM Kolkata","Other West Bengal Colleges"],
 difficultyLevel: 4
 },
 {
 id:"neet",
 name:"NEET",
 fullName:"National Eligibility cum Entrance Test",
 category:"Medical",
 level:"National",
 conductingBody:"NTA",
 officialWebsite:"https://neet.nta.nic.in/",
 description:"National level medical entrance exam for MBBS and BDS admissions.",
 eligibility: ["10+2 with Physics, Chemistry, Biology/Biotechnology","50% aggregate in PCB"],
 pattern: {
 mode:"Offline (Pen and Paper)",
 durationMinutes: 200,
 totalMarks: 720,
 totalQuestions: 200,
 sections: [
 { name:"Physics", questions: 50, marks: 180 },
 { name:"Chemistry", questions: 50, marks: 180 },
 { name:"Botany", questions: 50, marks: 180 },
 { name:"Zoology", questions: 50, marks: 180 }
 ]
 },
 markingScheme: { correct: 4, incorrect: -1, unanswered: 0 },
 syllabusOverview:"Class 11 and 12 NCERT syllabus for Physics, Chemistry, and Biology.",
 importantDates: {
 registrationStart:"2026-02-09",
 registrationEnd:"2026-03-09",
 admitCard:"2026-05-01",
 examStart:"2026-05-05",
 resultExpected:"2026-06-14",
 counselingStart:"2026-07-01"
 },
 acceptedBy: ["AIIMS","JIPMER","All Medical Colleges in India"],
 difficultyLevel: 5
 },
 {
 id:"cuet",
 name:"CUET UG",
 fullName:"Common University Entrance Test",
 category:"General",
 level:"National",
 conductingBody:"NTA",
 officialWebsite:"https://cuet.samarth.ac.in/",
 description:"National level exam for admission to Central Universities and other participating institutions.",
 eligibility: ["10+2 passed or appearing"],
 pattern: {
 mode:"Computer Based Test (CBT)",
 durationMinutes: 180,
 totalMarks: 800,
 totalQuestions: 140,
 sections: [
 { name:"Languages", questions: 40, marks: 200 },
 { name:"Domain Specific Subjects", questions: 40, marks: 200 },
 { name:"General Test", questions: 50, marks: 250 }
 ]
 },
 markingScheme: { correct: 5, incorrect: -1, unanswered: 0 },
 syllabusOverview:"NCERT Class 12 syllabus for domain subjects, General Knowledge, and Language Comprehension.",
 importantDates: {
 registrationStart:"2026-02-27",
 registrationEnd:"2026-03-26",
 admitCard:"2026-05-10",
 examStart:"2026-05-15",
 examEnd:"2026-05-31",
 resultExpected:"2026-06-30",
 counselingStart:"2026-07-15"
 },
 acceptedBy: ["Delhi University","JNU","BHU","AMU","Other Central Universities"],
 difficultyLevel: 3
 },
 {
 id:"clat",
 name:"CLAT",
 fullName:"Common Law Admission Test",
 category:"Law",
 level:"National",
 conductingBody:"Consortium of NLUs",
 officialWebsite:"https://consortiumofnlus.ac.in/",
 description:"National level entrance exam for admissions to National Law Universities (NLUs).",
 eligibility: ["10+2 passed or appearing","45% minimum aggregate"],
 pattern: {
 mode:"Offline (Pen and Paper)",
 durationMinutes: 120,
 totalMarks: 120,
 totalQuestions: 120,
 sections: [
 { name:"English Language", questions: 24, marks: 24 },
 { name:"Current Affairs & GK", questions: 28, marks: 28 },
 { name:"Legal Reasoning", questions: 32, marks: 32 },
 { name:"Logical Reasoning", questions: 24, marks: 24 },
 { name:"Quantitative Techniques", questions: 12, marks: 12 }
 ]
 },
 markingScheme: { correct: 1, incorrect: -0.25, unanswered: 0 },
 syllabusOverview:"English, Current Affairs, Legal Reasoning, Logical Reasoning, and basic Math.",
 importantDates: {
 registrationStart:"2025-07-01",
 registrationEnd:"2025-11-03",
 admitCard:"2025-11-20",
 examStart:"2025-12-01",
 resultExpected:"2025-12-10",
 counselingStart:"2025-12-20"
 },
 acceptedBy: ["NLSIU Bangalore","NALSAR Hyderabad","Other NLUs"],
 difficultyLevel: 4
 },
 {
 id:"nata",
 name:"NATA",
 fullName:"National Aptitude Test in Architecture",
 category:"Architecture",
 level:"National",
 conductingBody:"Council of Architecture",
 officialWebsite:"https://www.nata.in/",
 description:"National level exam for admission to B.Arch degree programs.",
 eligibility: ["10+2 with Physics, Chemistry, and Mathematics","50% minimum aggregate"],
 pattern: {
 mode:"Computer Based Test (CBT)",
 durationMinutes: 180,
 totalMarks: 200,
 totalQuestions: 125,
 sections: [
 { name:"Aptitude & Logical Reasoning", questions: 40, marks: 80 },
 { name:"Maths, Physics & Chemistry", questions: 45, marks: 45 },
 { name:"Drawing & Visual Composition", questions: 40, marks: 75 }
 ]
 },
 markingScheme: { correct: 1, incorrect: 0, unanswered: 0 },
 syllabusOverview:"Aptitude, Mathematics, Physics, Chemistry, and Drawing skills.",
 importantDates: {
 registrationStart:"2026-03-01",
 registrationEnd:"2026-03-31",
 admitCard:"2026-04-03",
 examStart:"2026-04-06",
 resultExpected:"2026-04-15",
 counselingStart:"2026-05-01"
 },
 acceptedBy: ["Architecture Colleges across India (except IITs, NITs)"],
 difficultyLevel: 3
 },
 {
 id:"uceed",
 name:"UCEED",
 fullName:"Undergraduate Common Entrance Examination for Design",
 category:"Design",
 level:"National",
 conductingBody:"IIT Bombay",
 officialWebsite:"http://www.uceed.iitb.ac.in/",
 description:"Entrance exam for B.Des programs at IITs and other participating institutes.",
 eligibility: ["10+2 passed or appearing in any stream"],
 pattern: {
 mode:"CBT + Drawing",
 durationMinutes: 180,
 totalMarks: 300,
 totalQuestions: 69,
 sections: [
 { name:"Part A (CBT: NAT, MSQ, MCQ)", questions: 68, marks: 240 },
 { name:"Part B (Drawing)", questions: 1, marks: 60 }
 ]
 },
 markingScheme: { correct: 4, incorrect: -1, unanswered: 0 },
 syllabusOverview:"Visualization and spatial ability, environmental and social awareness, analytical and logical reasoning.",
 importantDates: {
 registrationStart:"2025-10-03",
 registrationEnd:"2025-11-13",
 admitCard:"2026-01-05",
 examStart:"2026-01-21",
 resultExpected:"2026-03-08",
 counselingStart:"2026-03-15"
 },
 acceptedBy: ["IIT Bombay","IIT Delhi","IIT Guwahati","IIT Hyderabad","IIITDM Jabalpur"],
 difficultyLevel: 4
 },
 {
 id:"ceed",
 name:"CEED",
 fullName:"Common Entrance Examination for Design",
 category:"Design",
 level:"National",
 conductingBody:"IIT Bombay",
 officialWebsite:"http://www.ceed.iitb.ac.in/",
 description:"National level exam for admission to M.Des and Ph.D programs in Design.",
 eligibility: ["Degree / Diploma / Post Graduate degree program of minimum 3 years"],
 pattern: {
 mode:"CBT + Pen & Paper",
 durationMinutes: 180,
 totalMarks: 200,
 totalQuestions: 46,
 sections: [
 { name:"Part A (CBT)", questions: 41, marks: 100 },
 { name:"Part B (Design/Drawing)", questions: 5, marks: 100 }
 ]
 },
 markingScheme: { correct: 2, incorrect: -0.5, unanswered: 0 },
 syllabusOverview:"Visual perception, drawing, design theory, communication skills.",
 importantDates: {
 registrationStart:"2025-10-03",
 registrationEnd:"2025-11-13",
 admitCard:"2026-01-05",
 examStart:"2026-01-21",
 resultExpected:"2026-03-06",
 counselingStart:"2026-03-15"
 },
 acceptedBy: ["IITs","IISc Bangalore","Other Design Institutes"],
 difficultyLevel: 4
 }
];
