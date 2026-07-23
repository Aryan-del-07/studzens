/**
 * STUDZENS TRANSIT HUB DATABASE
 * 
 * Single source of truth for all transit node coordinates in India.
 * Every coordinate is sourced from official airport/railway/metro authority data.
 * 
 * IMPORTANT: Never fabricate coordinates. If a transit node cannot be verified,
 * do not include it. Show"Data unavailable"instead.
 */

export interface TransitHub {
 id: string;
 name: string;
 type: 'airport' | 'railway' | 'metro' | 'bus_terminal';
 lat: number;
 lng: number;
 city: string;
 state: string;
 iataCode?: string;
 railwayCode?: string;
 verified: boolean;
 lastVerified: string; // YYYY-MM-DD
}

// ─── AIRPORTS ────────────────────────────────────────────────────────

const AIRPORTS: TransitHub[] = [
 { id: 'del', name: 'Indira Gandhi International Airport', type: 'airport', lat: 28.556, lng: 77.100, city: 'New Delhi', state: 'Delhi', iataCode: 'DEL', verified: true, lastVerified: '2025-06-01' },
 { id: 'bom', name: 'Chhatrapati Shivaji Maharaj International Airport', type: 'airport', lat: 19.089, lng: 72.868, city: 'Mumbai', state: 'Maharashtra', iataCode: 'BOM', verified: true, lastVerified: '2025-06-01' },
 { id: 'blr', name: 'Kempegowda International Airport', type: 'airport', lat: 13.198, lng: 77.706, city: 'Bengaluru', state: 'Karnataka', iataCode: 'BLR', verified: true, lastVerified: '2025-06-01' },
 { id: 'hyd', name: 'Rajiv Gandhi International Airport', type: 'airport', lat: 17.240, lng: 78.430, city: 'Hyderabad', state: 'Telangana', iataCode: 'HYD', verified: true, lastVerified: '2025-06-01' },
 { id: 'maa', name: 'Chennai International Airport', type: 'airport', lat: 12.994, lng: 80.171, city: 'Chennai', state: 'Tamil Nadu', iataCode: 'MAA', verified: true, lastVerified: '2025-06-01' },
 { id: 'pnq', name: 'Pune International Airport', type: 'airport', lat: 18.582, lng: 73.919, city: 'Pune', state: 'Maharashtra', iataCode: 'PNQ', verified: true, lastVerified: '2025-06-01' },
 { id: 'ccu', name: 'Netaji Subhash Chandra Bose International Airport', type: 'airport', lat: 22.654, lng: 88.446, city: 'Kolkata', state: 'West Bengal', iataCode: 'CCU', verified: true, lastVerified: '2025-06-01' },
 { id: 'amd', name: 'Sardar Vallabhbhai Patel International Airport', type: 'airport', lat: 23.077, lng: 72.633, city: 'Ahmedabad', state: 'Gujarat', iataCode: 'AMD', verified: true, lastVerified: '2025-06-01' },
 { id: 'gau', name: 'Lokpriya Gopinath Bordoloi International Airport', type: 'airport', lat: 26.106, lng: 91.586, city: 'Guwahati', state: 'Assam', iataCode: 'GAU', verified: true, lastVerified: '2025-06-01' },
 { id: 'lko', name: 'Chaudhary Charan Singh International Airport', type: 'airport', lat: 26.761, lng: 80.884, city: 'Lucknow', state: 'Uttar Pradesh', iataCode: 'LKO', verified: true, lastVerified: '2025-06-01' },
 { id: 'jai', name: 'Jaipur International Airport', type: 'airport', lat: 26.825, lng: 75.812, city: 'Jaipur', state: 'Rajasthan', iataCode: 'JAI', verified: true, lastVerified: '2025-06-01' },
 { id: 'bbi', name: 'Biju Patnaik International Airport', type: 'airport', lat: 20.245, lng: 85.818, city: 'Bhubaneswar', state: 'Odisha', iataCode: 'BBI', verified: true, lastVerified: '2025-06-01' },
 { id: 'ixc', name: 'Chandigarh International Airport', type: 'airport', lat: 30.673, lng: 76.788, city: 'Chandigarh', state: 'Chandigarh', iataCode: 'IXC', verified: true, lastVerified: '2025-06-01' },
 { id: 'cjb', name: 'Coimbatore International Airport', type: 'airport', lat: 11.030, lng: 77.044, city: 'Coimbatore', state: 'Tamil Nadu', iataCode: 'CJB', verified: true, lastVerified: '2025-06-01' },
 { id: 'idr', name: 'Devi Ahilyabai Holkar Airport', type: 'airport', lat: 22.722, lng: 75.801, city: 'Indore', state: 'Madhya Pradesh', iataCode: 'IDR', verified: true, lastVerified: '2025-06-01' },
 { id: 'nag', name: 'Dr. Babasaheb Ambedkar International Airport', type: 'airport', lat: 21.092, lng: 79.047, city: 'Nagpur', state: 'Maharashtra', iataCode: 'NAG', verified: true, lastVerified: '2025-06-01' },
 { id: 'pat', name: 'Jay Prakash Narayan Airport', type: 'airport', lat: 25.591, lng: 85.088, city: 'Patna', state: 'Bihar', iataCode: 'PAT', verified: true, lastVerified: '2025-06-01' },
 { id: 'trv', name: 'Trivandrum International Airport', type: 'airport', lat: 8.483, lng: 76.920, city: 'Thiruvananthapuram', state: 'Kerala', iataCode: 'TRV', verified: true, lastVerified: '2025-06-01' },
 { id: 'vns', name: 'Lal Bahadur Shastri International Airport', type: 'airport', lat: 25.452, lng: 82.859, city: 'Varanasi', state: 'Uttar Pradesh', iataCode: 'VNS', verified: true, lastVerified: '2025-06-01' },
 { id: 'ixe', name: 'Mangalore International Airport', type: 'airport', lat: 12.961, lng: 74.890, city: 'Mangalore', state: 'Karnataka', iataCode: 'IXE', verified: true, lastVerified: '2025-06-01' },
 { id: 'vtz', name: 'Visakhapatnam Airport', type: 'airport', lat: 17.724, lng: 83.225, city: 'Visakhapatnam', state: 'Andhra Pradesh', iataCode: 'VTZ', verified: true, lastVerified: '2025-06-01' },
 { id: 'cok', name: 'Cochin International Airport', type: 'airport', lat: 10.152, lng: 76.402, city: 'Kochi', state: 'Kerala', iataCode: 'COK', verified: true, lastVerified: '2025-06-01' },
 { id: 'ded', name: 'Jolly Grant Airport', type: 'airport', lat: 30.190, lng: 78.180, city: 'Dehradun', state: 'Uttarakhand', iataCode: 'DED', verified: true, lastVerified: '2025-06-01' },
 { id: 'rpr', name: 'Swami Vivekananda Airport', type: 'airport', lat: 21.180, lng: 81.739, city: 'Raipur', state: 'Chhattisgarh', iataCode: 'RPR', verified: true, lastVerified: '2025-06-01' },
 { id: 'rnc', name: 'Birsa Munda Airport', type: 'airport', lat: 23.314, lng: 85.322, city: 'Ranchi', state: 'Jharkhand', iataCode: 'IXR', verified: true, lastVerified: '2025-06-01' },
 { id: 'tir', name: 'Tirupati Airport', type: 'airport', lat: 13.633, lng: 79.543, city: 'Tirupati', state: 'Andhra Pradesh', iataCode: 'TIR', verified: true, lastVerified: '2025-06-01' },
];

// ─── RAILWAY STATIONS ────────────────────────────────────────────────

const RAILWAY_STATIONS: TransitHub[] = [
 { id: 'ndls', name: 'New Delhi Railway Station', type: 'railway', lat: 28.643, lng: 77.220, city: 'New Delhi', state: 'Delhi', railwayCode: 'NDLS', verified: true, lastVerified: '2025-06-01' },
 { id: 'mmct', name: 'Mumbai Central Railway Station', type: 'railway', lat: 18.969, lng: 72.815, city: 'Mumbai', state: 'Maharashtra', railwayCode: 'MMCT', verified: true, lastVerified: '2025-06-01' },
 { id: 'sbc', name: 'KSR Bengaluru City Railway Station', type: 'railway', lat: 12.978, lng: 77.569, city: 'Bengaluru', state: 'Karnataka', railwayCode: 'SBC', verified: true, lastVerified: '2025-06-01' },
 { id: 'sc', name: 'Secunderabad Junction', type: 'railway', lat: 17.434, lng: 78.502, city: 'Hyderabad', state: 'Telangana', railwayCode: 'SC', verified: true, lastVerified: '2025-06-01' },
 { id: 'mas', name: 'Chennai Central Railway Station', type: 'railway', lat: 13.082, lng: 80.275, city: 'Chennai', state: 'Tamil Nadu', railwayCode: 'MAS', verified: true, lastVerified: '2025-06-01' },
 { id: 'pune-jn', name: 'Pune Junction Railway Station', type: 'railway', lat: 18.528, lng: 73.873, city: 'Pune', state: 'Maharashtra', railwayCode: 'PUNE', verified: true, lastVerified: '2025-06-01' },
 { id: 'hwh', name: 'Howrah Junction Railway Station', type: 'railway', lat: 22.583, lng: 88.341, city: 'Kolkata', state: 'West Bengal', railwayCode: 'HWH', verified: true, lastVerified: '2025-06-01' },
 { id: 'adi', name: 'Ahmedabad Junction Railway Station', type: 'railway', lat: 23.028, lng: 72.600, city: 'Ahmedabad', state: 'Gujarat', railwayCode: 'ADI', verified: true, lastVerified: '2025-06-01' },
 { id: 'ghy', name: 'Guwahati Railway Station', type: 'railway', lat: 26.185, lng: 91.739, city: 'Guwahati', state: 'Assam', railwayCode: 'GHY', verified: true, lastVerified: '2025-06-01' },
 { id: 'lko-rly', name: 'Lucknow Charbagh Railway Station', type: 'railway', lat: 26.834, lng: 80.922, city: 'Lucknow', state: 'Uttar Pradesh', railwayCode: 'LKO', verified: true, lastVerified: '2025-06-01' },
 { id: 'jp', name: 'Jaipur Junction Railway Station', type: 'railway', lat: 26.920, lng: 75.788, city: 'Jaipur', state: 'Rajasthan', railwayCode: 'JP', verified: true, lastVerified: '2025-06-01' },
 { id: 'bbs', name: 'Bhubaneswar Railway Station', type: 'railway', lat: 20.269, lng: 85.841, city: 'Bhubaneswar', state: 'Odisha', railwayCode: 'BBS', verified: true, lastVerified: '2025-06-01' },
 { id: 'cdg', name: 'Chandigarh Junction Railway Station', type: 'railway', lat: 30.694, lng: 76.799, city: 'Chandigarh', state: 'Chandigarh', railwayCode: 'CDG', verified: true, lastVerified: '2025-06-01' },
 { id: 'cbe', name: 'Coimbatore Junction Railway Station', type: 'railway', lat: 11.000, lng: 76.960, city: 'Coimbatore', state: 'Tamil Nadu', railwayCode: 'CBE', verified: true, lastVerified: '2025-06-01' },
 { id: 'indb', name: 'Indore Junction Railway Station', type: 'railway', lat: 22.718, lng: 75.868, city: 'Indore', state: 'Madhya Pradesh', railwayCode: 'INDB', verified: true, lastVerified: '2025-06-01' },
 { id: 'ngp', name: 'Nagpur Junction Railway Station', type: 'railway', lat: 21.149, lng: 79.090, city: 'Nagpur', state: 'Maharashtra', railwayCode: 'NGP', verified: true, lastVerified: '2025-06-01' },
 { id: 'pnbe', name: 'Patna Junction Railway Station', type: 'railway', lat: 25.610, lng: 85.113, city: 'Patna', state: 'Bihar', railwayCode: 'PNBE', verified: true, lastVerified: '2025-06-01' },
 { id: 'tvc', name: 'Thiruvananthapuram Central Railway Station', type: 'railway', lat: 8.504, lng: 76.950, city: 'Thiruvananthapuram', state: 'Kerala', railwayCode: 'TVC', verified: true, lastVerified: '2025-06-01' },
 { id: 'bsb', name: 'Varanasi Junction Railway Station', type: 'railway', lat: 25.318, lng: 83.008, city: 'Varanasi', state: 'Uttar Pradesh', railwayCode: 'BSB', verified: true, lastVerified: '2025-06-01' },
 { id: 'cnb', name: 'Kanpur Central Railway Station', type: 'railway', lat: 26.453, lng: 80.349, city: 'Kanpur', state: 'Uttar Pradesh', railwayCode: 'CNB', verified: true, lastVerified: '2025-06-01' },
 { id: 'rkl', name: 'Roorkee Railway Station', type: 'railway', lat: 29.869, lng: 77.888, city: 'Roorkee', state: 'Uttarakhand', railwayCode: 'RK', verified: true, lastVerified: '2025-06-01' },
 { id: 'kpd', name: 'Katpadi Junction Railway Station', type: 'railway', lat: 12.969, lng: 79.150, city: 'Vellore', state: 'Tamil Nadu', railwayCode: 'KPD', verified: true, lastVerified: '2025-06-01' },
 { id: 'ubl', name: 'Udupi Railway Station', type: 'railway', lat: 13.342, lng: 74.761, city: 'Udupi', state: 'Karnataka', railwayCode: 'UD', verified: true, lastVerified: '2025-06-01' },
 { id: 'kgp', name: 'Kharagpur Junction Railway Station', type: 'railway', lat: 22.346, lng: 87.323, city: 'Kharagpur', state: 'West Bengal', railwayCode: 'KGP', verified: true, lastVerified: '2025-06-01' },
 { id: 'dhne', name: 'Dhanbad Junction Railway Station', type: 'railway', lat: 23.793, lng: 86.419, city: 'Dhanbad', state: 'Jharkhand', railwayCode: 'DHN', verified: true, lastVerified: '2025-06-01' },
 { id: 'ernk', name: 'Ernakulam Junction Railway Station', type: 'railway', lat: 9.966, lng: 76.285, city: 'Kochi', state: 'Kerala', railwayCode: 'ERS', verified: true, lastVerified: '2025-06-01' },
 { id: 'sur', name: 'Suratkal Railway Station', type: 'railway', lat: 13.000, lng: 74.790, city: 'Mangalore', state: 'Karnataka', railwayCode: 'SL', verified: true, lastVerified: '2025-06-01' },
 { id: 'jodhpur', name: 'Jodhpur Junction Railway Station', type: 'railway', lat: 26.289, lng: 73.020, city: 'Jodhpur', state: 'Rajasthan', railwayCode: 'JU', verified: true, lastVerified: '2025-06-01' },
 { id: 'tpty', name: 'Tirupati Railway Station', type: 'railway', lat: 13.633, lng: 79.420, city: 'Tirupati', state: 'Andhra Pradesh', railwayCode: 'TPTY', verified: true, lastVerified: '2025-06-01' },
 { id: 'vskp', name: 'Visakhapatnam Junction Railway Station', type: 'railway', lat: 17.719, lng: 83.314, city: 'Visakhapatnam', state: 'Andhra Pradesh', railwayCode: 'VSKP', verified: true, lastVerified: '2025-06-01' },
 { id: 'rpr-rly', name: 'Raipur Junction Railway Station', type: 'railway', lat: 21.252, lng: 81.614, city: 'Raipur', state: 'Chhattisgarh', railwayCode: 'R', verified: true, lastVerified: '2025-06-01' },
];

// ─── METRO STATIONS (major interchange hubs only) ─────────────────────

const METRO_STATIONS: TransitHub[] = [
 { id: 'metro-hauz-khas', name: 'Hauz Khas Metro (Yellow/Magenta)', type: 'metro', lat: 28.543, lng: 77.206, city: 'New Delhi', state: 'Delhi', verified: true, lastVerified: '2025-06-01' },
 { id: 'metro-rajiv-chowk', name: 'Rajiv Chowk Metro (Blue/Yellow)', type: 'metro', lat: 28.633, lng: 77.219, city: 'New Delhi', state: 'Delhi', verified: true, lastVerified: '2025-06-01' },
 { id: 'metro-andheri', name: 'Andheri Metro Station', type: 'metro', lat: 19.119, lng: 72.846, city: 'Mumbai', state: 'Maharashtra', verified: true, lastVerified: '2025-06-01' },
 { id: 'metro-majestic', name: 'Majestic Metro Interchange (Purple/Green)', type: 'metro', lat: 12.975, lng: 77.570, city: 'Bengaluru', state: 'Karnataka', verified: true, lastVerified: '2025-06-01' },
 { id: 'metro-ameerpet', name: 'Ameerpet Metro Interchange (Red/Blue)', type: 'metro', lat: 17.435, lng: 78.448, city: 'Hyderabad', state: 'Telangana', verified: true, lastVerified: '2025-06-01' },
 { id: 'metro-chennai-central', name: 'Chennai Central Metro (Blue/Green)', type: 'metro', lat: 13.081, lng: 80.274, city: 'Chennai', state: 'Tamil Nadu', verified: true, lastVerified: '2025-06-01' },
 { id: 'metro-esplanade', name: 'Esplanade Metro Interchange', type: 'metro', lat: 22.564, lng: 88.351, city: 'Kolkata', state: 'West Bengal', verified: true, lastVerified: '2025-06-01' },
 { id: 'metro-lucknow', name: 'Hazratganj Metro Station', type: 'metro', lat: 26.849, lng: 80.944, city: 'Lucknow', state: 'Uttar Pradesh', verified: true, lastVerified: '2025-06-01' },
 { id: 'metro-jaipur', name: 'Chandpole Metro Station', type: 'metro', lat: 26.914, lng: 75.816, city: 'Jaipur', state: 'Rajasthan', verified: true, lastVerified: '2025-06-01' },
 { id: 'metro-nagpur', name: 'Sitabuldi Metro Interchange', type: 'metro', lat: 21.144, lng: 79.082, city: 'Nagpur', state: 'Maharashtra', verified: true, lastVerified: '2025-06-01' },
 { id: 'metro-kochi', name: 'Aluva Metro Station', type: 'metro', lat: 10.107, lng: 76.357, city: 'Kochi', state: 'Kerala', verified: true, lastVerified: '2025-06-01' },
];

// ─── BUS TERMINALS ───────────────────────────────────────────────────

const BUS_TERMINALS: TransitHub[] = [
 { id: 'bus-isbt-kashmere', name: 'ISBT Kashmere Gate', type: 'bus_terminal', lat: 28.668, lng: 77.228, city: 'New Delhi', state: 'Delhi', verified: true, lastVerified: '2025-06-01' },
 { id: 'bus-mumbai-central', name: 'Mumbai Central Bus Depot', type: 'bus_terminal', lat: 18.970, lng: 72.822, city: 'Mumbai', state: 'Maharashtra', verified: true, lastVerified: '2025-06-01' },
 { id: 'bus-majestic-blr', name: 'Kempegowda Bus Station (Majestic)', type: 'bus_terminal', lat: 12.977, lng: 77.572, city: 'Bengaluru', state: 'Karnataka', verified: true, lastVerified: '2025-06-01' },
 { id: 'bus-mgbs-hyd', name: 'MGBS Bus Station', type: 'bus_terminal', lat: 17.378, lng: 78.486, city: 'Hyderabad', state: 'Telangana', verified: true, lastVerified: '2025-06-01' },
 { id: 'bus-cmbt-chennai', name: 'CMBT Chennai', type: 'bus_terminal', lat: 13.069, lng: 80.205, city: 'Chennai', state: 'Tamil Nadu', verified: true, lastVerified: '2025-06-01' },
 { id: 'bus-swargate-pune', name: 'Swargate Bus Stand', type: 'bus_terminal', lat: 18.501, lng: 73.858, city: 'Pune', state: 'Maharashtra', verified: true, lastVerified: '2025-06-01' },
 { id: 'bus-esplanade-kol', name: 'Esplanade Bus Terminus', type: 'bus_terminal', lat: 22.565, lng: 88.351, city: 'Kolkata', state: 'West Bengal', verified: true, lastVerified: '2025-06-01' },
 { id: 'bus-geeta-mandir', name: 'Geeta Mandir Bus Station', type: 'bus_terminal', lat: 23.027, lng: 72.594, city: 'Ahmedabad', state: 'Gujarat', verified: true, lastVerified: '2025-06-01' },
 { id: 'bus-baramunda', name: 'Baramunda Bus Stand', type: 'bus_terminal', lat: 20.273, lng: 85.812, city: 'Bhubaneswar', state: 'Odisha', verified: true, lastVerified: '2025-06-01' },
 { id: 'bus-isbt-chandigarh', name: 'ISBT Sector 43 Chandigarh', type: 'bus_terminal', lat: 30.730, lng: 76.773, city: 'Chandigarh', state: 'Chandigarh', verified: true, lastVerified: '2025-06-01' },
 { id: 'bus-gandhipuram', name: 'Gandhipuram Bus Stand', type: 'bus_terminal', lat: 11.016, lng: 76.965, city: 'Coimbatore', state: 'Tamil Nadu', verified: true, lastVerified: '2025-06-01' },
 { id: 'bus-sarwate-indore', name: 'Sarwate Bus Stand', type: 'bus_terminal', lat: 22.714, lng: 75.857, city: 'Indore', state: 'Madhya Pradesh', verified: true, lastVerified: '2025-06-01' },
 { id: 'bus-vellore', name: 'Vellore New Bus Stand', type: 'bus_terminal', lat: 12.916, lng: 79.132, city: 'Vellore', state: 'Tamil Nadu', verified: true, lastVerified: '2025-06-01' },
 { id: 'bus-manipal', name: 'Manipal Bus Stand', type: 'bus_terminal', lat: 13.352, lng: 74.788, city: 'Manipal', state: 'Karnataka', verified: true, lastVerified: '2025-06-01' },
];

// ─── COMBINED DATABASE ───────────────────────────────────────────────

export const ALL_TRANSIT_HUBS: TransitHub[] = [
 ...AIRPORTS,
 ...RAILWAY_STATIONS,
 ...METRO_STATIONS,
 ...BUS_TERMINALS,
];

/**
 * Returns all hubs of a given type.
 */
export function getHubsByType(type: TransitHub['type']): TransitHub[] {
 return ALL_TRANSIT_HUBS.filter(h => h.type === type);
}
