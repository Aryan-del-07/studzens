import type { College } from './colleges';

// Helper to create engineering college entries concisely
function eng(id: string, name: string, city: string, state: string, lat: number, lng: number, cluster: string, fee: number, pkg: number, comfort: number, website: string, programs: string[] = ['CSE', 'ECE', 'Mechanical', 'Civil'], tier: 'Tier 1' | 'Tier 2' | 'Tier 3' = 'Tier 1'): College {
 let vibe = 'Premier government engineering institute with strong academics and placements.';
 if (id.startsWith('iit-')) {
 vibe = tier === 'Tier 1' 
 ? 'Top-tier IIT with rigorous academics and exceptional research opportunities.'
 : 'Growing IIT with solid foundation and modern infrastructure.';
 } else if (id.startsWith('nit-')) {
 vibe = tier === 'Tier 1'
 ? 'Leading NIT known for excellent engineering outcomes and vibrant campus life.'
 : 'Established NIT with strong core engineering focus and regional prominence.';
 } else if (id.startsWith('iiit-')) {
 vibe = 'Specialized institute focusing deeply on IT, CS, and modern tech skills.';
 }

 return {
 id, name, city, state, lat, lng, cluster,
 primaryCategory: 'Engineering',
 categories: ['Engineering'],
 tier,
 ownership: 'Government',
 annualFeeLpa: fee,
 avgPackageLpa: pkg,
 entranceExams: ['JEE Main', 'JEE Advanced'],
 streams: ['MPC'],
 subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
 programs,
 vibe,
 boardComfort: comfort,
 website,
 };
}

function nit(id: string, name: string, city: string, state: string, lat: number, lng: number, cluster: string, fee: number, pkg: number, comfort: number, website: string, programs?: string[]): College {
 return {
 ...eng(id, name, city, state, lat, lng, cluster, fee, pkg, comfort, website, programs),
 entranceExams: ['JEE Main'],
 tier: 'Tier 1',
 };
}

function iiit(id: string, name: string, city: string, state: string, lat: number, lng: number, cluster: string, fee: number, pkg: number, comfort: number, website: string): College {
 return {
 ...eng(id, name, city, state, lat, lng, cluster, fee, pkg, comfort, website, ['CSE', 'ECE', 'IT', 'Data Science']),
 entranceExams: ['JEE Main'],
 tier: 'Tier 1',
 };
}

export const governmentColleges: College[] = [
 // ── IITs ──
 eng('iit-kanpur', 'IIT Kanpur', 'Kanpur', 'Uttar Pradesh', 26.512, 80.233, 'North Belt', 2.2, 22.5, 93, 'https://www.iitk.ac.in', ['CSE', 'Aerospace', 'Chemical', 'Electrical']),
 eng('iit-kharagpur', 'IIT Kharagpur', 'Kharagpur', 'West Bengal', 22.315, 87.310, 'Kolkata', 2.1, 20.8, 92, 'https://www.iitkgp.ac.in', ['CSE', 'Architecture', 'Ocean', 'Mining']),
 eng('iit-guwahati', 'IIT Guwahati', 'Guwahati', 'Assam', 26.190, 91.694, 'North East', 2.2, 18.5, 90, 'https://www.iitg.ac.in', ['CSE', 'Design', 'Biosciences', 'Electronics']),
 eng('iit-hyderabad', 'IIT Hyderabad', 'Hyderabad', 'Telangana', 17.592, 78.123, 'Hyderabad', 2.3, 18.2, 89, 'https://iith.ac.in', ['CSE', 'AI', 'Biomedical', 'Materials']),
 eng('iit-bhu', 'IIT BHU Varanasi', 'Varanasi', 'Uttar Pradesh', 25.268, 82.991, 'North Belt', 2.0, 17.8, 90, 'https://www.iitbhu.ac.in', ['CSE', 'Ceramic', 'Mining', 'Metallurgy']),
 eng('iit-indore', 'IIT Indore', 'Indore', 'Madhya Pradesh', 22.521, 75.920, 'Central India', 2.3, 16.5, 87, 'https://www.iiti.ac.in', ['CSE', 'Electrical', 'Mechanical', 'Civil']),
 eng('iit-tirupati', 'IIT Tirupati', 'Tirupati', 'Andhra Pradesh', 13.714, 79.491, 'Chennai', 2.0, 14.8, 85, 'https://www.iittp.ac.in'),
 eng('iit-dhanbad', 'IIT (ISM) Dhanbad', 'Dhanbad', 'Jharkhand', 23.815, 86.441, 'Kolkata', 2.1, 16.2, 88, 'https://www.iitism.ac.in', ['CSE', 'Mining', 'Petroleum', 'Environmental']),
 eng('iit-patna', 'IIT Patna', 'Patna', 'Bihar', 25.536, 84.851, 'North Belt', 2.2, 15.5, 86, 'https://www.iitp.ac.in'),
 eng('iit-jodhpur', 'IIT Jodhpur', 'Jodhpur', 'Rajasthan', 26.472, 73.114, 'North Belt', 2.3, 14.2, 85, 'https://iitj.ac.in'),
 eng('iit-gandhinagar', 'IIT Gandhinagar', 'Gandhinagar', 'Gujarat', 23.212, 72.684, 'Ahmedabad', 2.2, 15.8, 87, 'https://www.iitgn.ac.in', ['CSE', 'Cognitive Science', 'Materials', 'Earth Sciences']),
 eng('iit-ropar', 'IIT Ropar', 'Rupnagar', 'Punjab', 30.968, 76.473, 'North Belt', 2.2, 14.5, 85, 'https://www.iitrpr.ac.in'),
 eng('iit-bbs', 'IIT Bhubaneswar', 'Bhubaneswar', 'Odisha', 20.148, 85.671, 'Bhubaneswar-Cuttack', 2.1, 14.8, 86, 'https://www.iitbbs.ac.in'),
 eng('iit-mandi', 'IIT Mandi', 'Mandi', 'Himachal Pradesh', 31.776, 76.985, 'North Belt', 2.2, 13.5, 84, 'https://www.iitmandi.ac.in'),
 eng('iit-palakkad', 'IIT Palakkad', 'Palakkad', 'Kerala', 10.867, 76.727, 'Coastal Karnataka', 2.0, 13.2, 83, 'https://iitpkd.ac.in'),
 eng('iit-jammu', 'IIT Jammu', 'Jammu', 'Jammu & Kashmir', 32.741, 74.821, 'North Belt', 2.1, 12.5, 82, 'https://www.iitjammu.ac.in'),
 eng('iit-goa', 'IIT Goa', 'Goa', 'Goa', 15.420, 73.979, 'Mumbai-Pune', 2.2, 13.0, 83, 'https://www.iitgoa.ac.in'),
 eng('iit-dharwad', 'IIT Dharwad', 'Dharwad', 'Karnataka', 15.392, 75.021, 'Bengaluru', 2.1, 12.8, 82, 'https://www.iitdh.ac.in'),
 eng('iit-bhilai', 'IIT Bhilai', 'Bhilai', 'Chhattisgarh', 21.177, 81.385, 'Central India', 2.0, 12.5, 82, 'https://www.iitbhilai.ac.in'),

 // ── NITs ──
 nit('nit-trichy', 'NIT Tiruchirappalli', 'Tiruchirappalli', 'Tamil Nadu', 10.760, 78.815, 'Tamil Nadu Interior', 1.5, 14.2, 88, 'https://www.nitt.edu', ['CSE', 'ECE', 'Instrumentation', 'Chemical']),
 nit('nit-warangal', 'NIT Warangal', 'Warangal', 'Telangana', 17.982, 79.531, 'Hyderabad', 1.4, 13.5, 87, 'https://www.nitw.ac.in'),
 nit('nit-surathkal', 'NIT Karnataka (Surathkal)', 'Surathkal', 'Karnataka', 13.011, 74.794, 'Coastal Karnataka', 1.5, 14.8, 88, 'https://www.nitk.ac.in'),
 nit('nit-calicut', 'NIT Calicut', 'Calicut', 'Kerala', 11.322, 75.932, 'Coastal Karnataka', 1.3, 12.5, 86, 'https://www.nitc.ac.in'),
 nit('nit-rourkela', 'NIT Rourkela', 'Rourkela', 'Odisha', 22.253, 84.903, 'Bhubaneswar-Cuttack', 1.4, 12.8, 86, 'https://www.nitrkl.ac.in'),
 nit('nit-allahabad', 'MNNIT Allahabad', 'Prayagraj', 'Uttar Pradesh', 25.492, 81.863, 'North Belt', 1.3, 11.5, 85, 'https://www.mnnit.ac.in'),
 nit('nit-jaipur', 'MNIT Jaipur', 'Jaipur', 'Rajasthan', 26.862, 75.810, 'North Belt', 1.4, 11.8, 85, 'https://www.mnit.ac.in'),
 nit('nit-nagpur', 'VNIT Nagpur', 'Nagpur', 'Maharashtra', 21.126, 79.048, 'Central India', 1.4, 12.0, 85, 'https://vnit.ac.in'),
 nit('nit-bhopal', 'MANIT Bhopal', 'Bhopal', 'Madhya Pradesh', 23.213, 77.410, 'Central India', 1.3, 10.8, 83, 'https://www.manit.ac.in'),
 nit('nit-kurukshetra', 'NIT Kurukshetra', 'Kurukshetra', 'Haryana', 29.949, 76.818, 'Delhi NCR', 1.3, 11.2, 84, 'https://www.nitkkr.ac.in'),
 nit('nit-durgapur', 'NIT Durgapur', 'Durgapur', 'West Bengal', 23.547, 87.297, 'Kolkata', 1.2, 10.5, 83, 'https://nitdgp.ac.in'),
 nit('nit-hamirpur', 'NIT Hamirpur', 'Hamirpur', 'Himachal Pradesh', 31.708, 76.525, 'North Belt', 1.2, 9.8, 81, 'https://nith.ac.in'),
 nit('nit-jalandhar', 'NIT Jalandhar', 'Jalandhar', 'Punjab', 31.395, 75.535, 'North Belt', 1.3, 10.2, 82, 'https://www.nitj.ac.in'),
 nit('nit-patna', 'NIT Patna', 'Patna', 'Bihar', 25.621, 85.171, 'North Belt', 1.2, 10.5, 82, 'https://www.nitp.ac.in'),
 nit('nit-raipur', 'NIT Raipur', 'Raipur', 'Chhattisgarh', 21.250, 81.604, 'Central India', 1.2, 9.5, 80, 'https://www.nitrr.ac.in'),
 nit('nit-silchar', 'NIT Silchar', 'Silchar', 'Assam', 24.749, 92.791, 'North East', 1.2, 9.8, 80, 'https://www.nits.ac.in'),
 nit('nit-agartala', 'NIT Agartala', 'Agartala', 'Tripura', 23.836, 91.277, 'North East', 1.1, 8.5, 78, 'https://www.nita.ac.in'),
 nit('nit-srinagar', 'NIT Srinagar', 'Srinagar', 'Jammu & Kashmir', 34.090, 74.797, 'North Belt', 1.1, 8.8, 79, 'https://www.nitsri.ac.in'),
 nit('nit-meghalaya', 'NIT Meghalaya', 'Shillong', 'Meghalaya', 25.605, 91.896, 'North East', 1.1, 8.2, 77, 'https://www.nitm.ac.in'),
 nit('nit-arunachal', 'NIT Arunachal Pradesh', 'Yupia', 'Arunachal Pradesh', 27.127, 93.739, 'North East', 1.0, 7.5, 75, 'https://www.nitap.ac.in'),
 nit('nit-manipur', 'NIT Manipur', 'Imphal', 'Manipur', 24.752, 93.896, 'North East', 1.0, 7.8, 76, 'https://www.nitmanipur.ac.in'),
 nit('nit-mizoram', 'NIT Mizoram', 'Aizawl', 'Mizoram', 23.737, 92.716, 'North East', 1.0, 7.2, 75, 'https://www.nitmz.ac.in'),
 nit('nit-nagaland', 'NIT Nagaland', 'Dimapur', 'Nagaland', 25.893, 93.721, 'North East', 1.0, 7.0, 74, 'https://www.nitnagaland.ac.in'),
 nit('nit-sikkim', 'NIT Sikkim', 'Ravangla', 'Sikkim', 27.309, 88.376, 'North East', 1.0, 7.5, 75, 'https://www.nitsikkim.ac.in'),
 nit('nit-uttarakhand', 'NIT Uttarakhand', 'Srinagar', 'Uttarakhand', 30.223, 78.783, 'North Belt', 1.1, 8.0, 77, 'https://www.nituk.ac.in'),
 nit('nit-goa', 'NIT Goa', 'Goa', 'Goa', 15.404, 73.981, 'Mumbai-Pune', 1.2, 9.0, 79, 'https://www.nitgoa.ac.in'),
 nit('nit-puducherry', 'NIT Puducherry', 'Karaikal', 'Puducherry', 10.924, 79.838, 'Chennai', 1.1, 8.5, 78, 'https://nitpy.ac.in'),
 nit('nit-andhra', 'NIT Andhra Pradesh', 'Tadepalligudem', 'Andhra Pradesh', 16.807, 81.508, 'Hyderabad', 1.2, 9.2, 79, 'https://www.nitandhra.ac.in'),
 nit('nit-delhi', 'NIT Delhi', 'New Delhi', 'Delhi', 28.735, 77.118, 'Delhi NCR', 1.5, 12.0, 84, 'https://www.nitdelhi.ac.in'),
 nit('nit-surat', 'SVNIT Surat', 'Surat', 'Gujarat', 21.163, 72.784, 'Ahmedabad', 1.3, 11.5, 84, 'https://www.svnit.ac.in'),
 nit('nit-jamshedpur', 'NIT Jamshedpur', 'Jamshedpur', 'Jharkhand', 22.776, 86.144, 'Kolkata', 1.3, 10.8, 83, 'https://www.nitjsr.ac.in'),

 // ── IIITs ──
 iiit('iiit-hyderabad', 'IIIT Hyderabad', 'Hyderabad', 'Telangana', 17.445, 78.349, 'Hyderabad', 2.5, 18.5, 90, 'https://www.iiit.ac.in'),
 iiit('iiit-bangalore', 'IIIT Bangalore', 'Bengaluru', 'Karnataka', 12.844, 77.663, 'Bengaluru', 3.8, 16.2, 88, 'https://www.iiitb.ac.in'),
 iiit('iiit-allahabad', 'IIIT Allahabad', 'Prayagraj', 'Uttar Pradesh', 25.429, 81.770, 'North Belt', 1.8, 14.5, 86, 'https://www.iiita.ac.in'),
 iiit('iiit-delhi', 'IIIT Delhi', 'New Delhi', 'Delhi', 28.545, 77.274, 'Delhi NCR', 3.2, 17.8, 89, 'https://iiitd.ac.in'),
 iiit('iiit-gwalior', 'ABV-IIITM Gwalior', 'Gwalior', 'Madhya Pradesh', 26.247, 78.173, 'Central India', 1.5, 12.5, 84, 'https://www.iiitm.ac.in'),
 iiit('iiit-jabalpur', 'IIITDM Jabalpur', 'Jabalpur', 'Madhya Pradesh', 23.176, 79.982, 'Central India', 1.8, 11.8, 83, 'https://www.iiitdmj.ac.in'),
 iiit('iiit-kancheepuram', 'IIITDM Kancheepuram', 'Kancheepuram', 'Tamil Nadu', 12.822, 80.041, 'Chennai', 1.8, 12.2, 84, 'https://www.iiitdm.ac.in'),
 iiit('iiit-kurnool', 'IIIT Kurnool', 'Kurnool', 'Andhra Pradesh', 15.839, 78.025, 'Hyderabad', 1.2, 9.5, 80, 'https://www.iiitkurnool.ac.in'),
 iiit('iiit-lucknow', 'IIIT Lucknow', 'Lucknow', 'Uttar Pradesh', 26.800, 81.007, 'North Belt', 1.5, 10.8, 82, 'https://iiitl.ac.in'),
 iiit('iiit-sri-city', 'IIIT Sri City', 'Sri City', 'Andhra Pradesh', 13.554, 80.022, 'Chennai', 2.0, 11.5, 83, 'https://www.iiits.ac.in'),
 iiit('iiit-vadodara', 'IIIT Vadodara', 'Vadodara', 'Gujarat', 22.310, 73.174, 'Ahmedabad', 1.5, 10.2, 81, 'https://iiitvadodara.ac.in'),
 iiit('iiit-ranchi', 'IIIT Ranchi', 'Ranchi', 'Jharkhand', 23.355, 85.321, 'Kolkata', 1.2, 9.0, 79, 'https://iiitranchi.ac.in'),
 iiit('iiit-nagpur', 'IIIT Nagpur', 'Nagpur', 'Maharashtra', 21.102, 79.004, 'Central India', 1.5, 10.5, 81, 'https://iiitn.ac.in'),
 iiit('iiit-pune', 'IIIT Pune', 'Pune', 'Maharashtra', 18.507, 73.808, 'Mumbai-Pune', 1.8, 11.0, 82, 'https://www.iiitp.ac.in'),
 iiit('iiit-kalyani', 'IIIT Kalyani', 'Kalyani', 'West Bengal', 22.975, 88.434, 'Kolkata', 1.2, 9.2, 79, 'https://iiitkalyani.ac.in'),
 iiit('iiit-sonepat', 'IIIT Sonepat', 'Sonepat', 'Haryana', 28.985, 77.019, 'Delhi NCR', 1.5, 10.0, 80, 'https://iiitsonepat.ac.in'),
 iiit('iiit-una', 'IIIT Una', 'Una', 'Himachal Pradesh', 31.470, 76.268, 'North Belt', 1.2, 8.5, 78, 'https://iiitu.ac.in'),
 iiit('iiit-manipur', 'IIIT Manipur', 'Imphal', 'Manipur', 24.822, 93.951, 'North East', 1.0, 7.5, 76, 'https://www.iiitmanipur.ac.in'),
 iiit('iiit-trichy', 'IIIT Tiruchirappalli', 'Tiruchirappalli', 'Tamil Nadu', 10.807, 78.702, 'Tamil Nadu Interior', 1.5, 10.5, 82, 'https://www.iiitt.ac.in'),
 iiit('iiit-dharwad', 'IIIT Dharwad', 'Dharwad', 'Karnataka', 15.440, 74.992, 'Bengaluru', 1.5, 10.0, 80, 'https://www.iiitdwd.ac.in'),
];
