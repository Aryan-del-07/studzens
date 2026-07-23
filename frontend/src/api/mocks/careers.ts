import type { CareerPath } from '../../types/career';


/**
 * careers.ts
 *
 * WHAT THIS FILE DOES:
 * Contains the complete database of career options in the app.
 * Includes salary, growth rate, required degrees, and related courses.
 *
 * WHY IT EXISTS:
 * Career data is needed for the CareerExplorer page and for AI
 * counselor responses. Storing it locally ensures fast access.
 *
 * KEY CONCEPTS:
 * - `careers`: Array of career objects with title, description, salary, etc.
 * - `getRelatedCareers`: Finds careers related to a given stream
 * - `getTrendingCareers`: Returns high-growth career options
 * - Categories: Engineering, Medical, Law, Design, Management, etc.
 * - Each career has: icon, title, description, salary range, growth rate, courses
 */
export const careers: CareerPath[] = [
 {
 id:"engineering",
 title:"Engineering",
 category:"Engineering",
 description:"The application of science and mathematics to solve problems, innovate, and design structures, machines, and systems.",
 typicalPath: {
 schoolSubjects: ["Physics","Chemistry","Mathematics"],
 entranceExams: ["JEE Main","JEE Advanced","BITSAT","VITEEE"],
 degrees: ["B.Tech","B.E.","M.Tech","MS"]
 },
 possibleCareers: [
 {
 id:"software-engineer",
 title:"Software Engineer",
 description:"Designs, develops, and tests software applications and systems.",
 skillsRequired: ["Programming","Problem Solving","System Design"],
 certifications: ["AWS Certified Developer","Google Cloud Professional"],
 expectedSalary: { starting: 6, midLevel: 15, senior: 35 },
 growthPotential:"Very High"
 },
 {
 id:"mechanical-engineer",
 title:"Mechanical Engineer",
 description:"Designs, analyzes, and manufactures mechanical systems.",
 skillsRequired: ["CAD/CAM","Thermodynamics","Materials Science"],
 certifications: ["AutoCAD Professional","Six Sigma"],
 expectedSalary: { starting: 4, midLevel: 10, senior: 25 },
 growthPotential:"Medium"
 },
 {
 id:"data-scientist",
 title:"Data Scientist",
 description:"Analyzes large amounts of data to find patterns and insights.",
 skillsRequired: ["Machine Learning","Python","Statistics"],
 certifications: ["IBM Data Science","AWS Machine Learning"],
 expectedSalary: { starting: 8, midLevel: 18, senior: 40 },
 growthPotential:"Very High"
 }
 ],
 higherStudies: ["M.Tech","MS Abroad","MBA"]
 },
 {
 id:"medical",
 title:"Medical & Healthcare",
 category:"Medical",
 description:"The science and practice of caring for a patient, managing the diagnosis, prognosis, prevention, treatment, or palliation of their injury or disease.",
 typicalPath: {
 schoolSubjects: ["Physics","Chemistry","Biology"],
 entranceExams: ["NEET UG","AIIMS PG","NEET PG"],
 degrees: ["MBBS","BDS","MD","MS"]
 },
 possibleCareers: [
 {
 id:"physician",
 title:"General Physician",
 description:"Diagnoses and treats various illnesses and injuries.",
 skillsRequired: ["Clinical Knowledge","Empathy","Decision Making"],
 certifications: ["State Medical Council Registration"],
 expectedSalary: { starting: 8, midLevel: 15, senior: 30 },
 growthPotential:"High"
 },
 {
 id:"surgeon",
 title:"Surgeon",
 description:"Performs surgical procedures on patients.",
 skillsRequired: ["Surgical Precision","Stamina","Anatomy Expertise"],
 certifications: ["Specialization Certifications (MS/DNB)"],
 expectedSalary: { starting: 12, midLevel: 25, senior: 60 },
 growthPotential:"High"
 },
 {
 id:"dentist",
 title:"Dentist",
 description:"Specializes in dentistry, the diagnosis, prevention, and treatment of conditions of the oral cavity.",
 skillsRequired: ["Manual Dexterity","Diagnostic Skills","Patient Management"],
 certifications: ["Dental Council Registration"],
 expectedSalary: { starting: 5, midLevel: 12, senior: 25 },
 growthPotential:"Medium"
 }
 ],
 higherStudies: ["MD","MS","Fellowships"]
 },
 {
 id:"commerce",
 title:"Commerce & Finance",
 category:"Commerce",
 description:"The exchange of goods, services, or something of value, between businesses or entities.",
 typicalPath: {
 schoolSubjects: ["Accountancy","Business Studies","Economics","Mathematics"],
 entranceExams: ["CA Foundation","CUET","CS Executive Entrance"],
 degrees: ["B.Com","BBA","Chartered Accountancy (CA)","M.Com"]
 },
 possibleCareers: [
 {
 id:"chartered-accountant",
 title:"Chartered Accountant",
 description:"Offers financial advice, audits accounts, and provides trustworthy information about financial records.",
 skillsRequired: ["Accounting","Taxation","Auditing","Analytical Skills"],
 certifications: ["CA Certification by ICAI"],
 expectedSalary: { starting: 7, midLevel: 15, senior: 35 },
 growthPotential:"High"
 },
 {
 id:"investment-banker",
 title:"Investment Banker",
 description:"Helps clients raise capital and provides financial advisory services.",
 skillsRequired: ["Financial Modeling","Valuation","Networking"],
 certifications: ["CFA","Series 7/79 (US)"],
 expectedSalary: { starting: 12, midLevel: 25, senior: 70 },
 growthPotential:"Very High"
 },
 {
 id:"financial-analyst",
 title:"Financial Analyst",
 description:"Evaluates investment opportunities and provides financial insights.",
 skillsRequired: ["Excel","Financial Analysis","Forecasting"],
 certifications: ["CFA Level 1","Financial Modeling Certification"],
 expectedSalary: { starting: 5, midLevel: 12, senior: 25 },
 growthPotential:"High"
 }
 ],
 higherStudies: ["MBA Finance","CFA","M.Com"]
 },
 {
 id:"law",
 title:"Law & Legal Services",
 category:"Law",
 description:"The system of rules which a particular country or community recognizes as regulating the actions of its members.",
 typicalPath: {
 schoolSubjects: ["Any Stream (Arts/Commerce/Science)"],
 entranceExams: ["CLAT","AILET","LSAT"],
 degrees: ["BA LLB","BBA LLB","LLM","PhD"]
 },
 possibleCareers: [
 {
 id:"corporate-lawyer",
 title:"Corporate Lawyer",
 description:"Advises corporations on their legal rights, obligations, and privileges.",
 skillsRequired: ["Contract Law","Negotiation","Attention to Detail"],
 certifications: ["Bar Council Registration"],
 expectedSalary: { starting: 8, midLevel: 20, senior: 50 },
 growthPotential:"High"
 },
 {
 id:"litigation-lawyer",
 title:"Litigation Lawyer",
 description:"Represents plaintiffs and defendants in civil/criminal lawsuits.",
 skillsRequired: ["Public Speaking","Analytical Skills","Legal Research"],
 certifications: ["Bar Council Registration"],
 expectedSalary: { starting: 4, midLevel: 15, senior: 40 },
 growthPotential:"Medium"
 },
 {
 id:"legal-advisor",
 title:"Legal Advisor",
 description:"Provides legal counsel to businesses, organizations, or individuals.",
 skillsRequired: ["Advisory","Regulatory Compliance","Communication"],
 certifications: ["Company Secretary (CS) - Optional"],
 expectedSalary: { starting: 6, midLevel: 14, senior: 30 },
 growthPotential:"High"
 }
 ],
 higherStudies: ["LLM","Specialized Diplomas"]
 },
 {
 id:"design",
 title:"Design & Arts",
 category:"Design",
 description:"The creation of a plan or convention for the construction of an object, system or measurable human interaction.",
 typicalPath: {
 schoolSubjects: ["Any Stream","Fine Arts (Optional)"],
 entranceExams: ["NID DAT","UCEED","NIFT"],
 degrees: ["B.Des","BFA","M.Des"]
 },
 possibleCareers: [
 {
 id:"ux-ui-designer",
 title:"UX/UI Designer",
 description:"Creates intuitive and aesthetically pleasing user interfaces for digital products.",
 skillsRequired: ["Wireframing","Figma","User Research"],
 certifications: ["Google UX Design","Interaction Design Foundation"],
 expectedSalary: { starting: 6, midLevel: 15, senior: 30 },
 growthPotential:"Very High"
 },
 {
 id:"industrial-designer",
 title:"Industrial Designer",
 description:"Develops concepts and designs for manufactured products.",
 skillsRequired: ["3D Modeling","Prototyping","Material Knowledge"],
 certifications: ["SolidWorks Certification"],
 expectedSalary: { starting: 5, midLevel: 12, senior: 25 },
 growthPotential:"Medium"
 },
 {
 id:"graphic-designer",
 title:"Graphic Designer",
 description:"Creates visual text and imagery concepts to communicate ideas that inspire, inform, or captivate consumers.",
 skillsRequired: ["Adobe Creative Suite","Typography","Creativity"],
 certifications: ["Adobe Certified Expert"],
 expectedSalary: { starting: 3, midLevel: 8, senior: 18 },
 growthPotential:"Medium"
 }
 ],
 higherStudies: ["M.Des","Specialized Design Courses"]
 },
 {
 id:"management",
 title:"Business Management",
 category:"Management",
 description:"The administration of a business, which includes activities that set the strategy of an organization and coordinate the efforts of its employees.",
 typicalPath: {
 schoolSubjects: ["Any Stream"],
 entranceExams: ["IPMAT","CAT","XAT","GMAT"],
 degrees: ["BBA","BMS","MBA","PGDM"]
 },
 possibleCareers: [
 {
 id:"management-consultant",
 title:"Management Consultant",
 description:"Helps organizations improve their performance and solve complex business problems.",
 skillsRequired: ["Problem Solving","Data Analysis","Communication"],
 certifications: ["Certified Management Consultant (CMC)"],
 expectedSalary: { starting: 10, midLevel: 25, senior: 50 },
 growthPotential:"Very High"
 },
 {
 id:"marketing-manager",
 title:"Marketing Manager",
 description:"Develops strategies and campaigns to promote a product, service, or brand.",
 skillsRequired: ["Digital Marketing","Market Research","Campaign Management"],
 certifications: ["Google Ads Certification","HubSpot Content Marketing"],
 expectedSalary: { starting: 6, midLevel: 15, senior: 35 },
 growthPotential:"High"
 },
 {
 id:"human-resources-manager",
 title:"HR Manager",
 description:"Plans, directs, and coordinates the administrative functions of an organization.",
 skillsRequired: ["Recruitment","Employee Relations","Labor Laws"],
 certifications: ["SHRM Certified Professional (SHRM-CP)"],
 expectedSalary: { starting: 5, midLevel: 12, senior: 28 },
 growthPotential:"Medium"
 }
 ],
 higherStudies: ["Executive MBA","PhD in Management"]
 }
];
