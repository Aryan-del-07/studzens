
/**
 * geo.ts
 *
 * WHAT THIS FILE DOES:
 * Provides geographic utility functions for the map feature.
 * Converts college locations into GeoJSON format for MapLibre GL.
 *
 * WHY IT EXISTS:
 * The map library (MapLibre) needs data in a specific format (GeoJSON).
 * This file transforms our college data into that format and provides
 * helper functions for distance calculations and coordinate lookups.
 *
 * KEY CONCEPTS:
 * - GeoJSON: Standard format for geographic data (points, lines, polygons)
 * - `getGeoJSONFromColleges`: Converts college array to GeoJSON FeatureCollection
 * - `getCollegeById`: Looks up a college by its ID
 * - Transit hub data: Nearby transport hubs for each college location
 */
/**
 * STUDZENS GEOSPATIAL ENGINE
 * 
 * Haversine-based distance calculations and accessibility scoring.
 * All distances are geodesic (straight-line). Road estimates use a 1.25× winding factor.
 * 
 * TRUST RULES:
 * - Never fabricate distances
 * - Show"Data unavailable"when transit data is missing
 * - All scores use transparent, documented formulas
 */

import { ALL_TRANSIT_HUBS, type TransitHub } from '../api/mocks/transit-nodes';

// ─── HAVERSINE DISTANCE ──────────────────────────────────────────────

/**
 * Calculates geodesic distance between two points using the Haversine formula.
 * @returns Distance in kilometers, rounded to 1 decimal place
 */
export function calculateGeodesicDistance(
 lat1: number, lon1: number,
 lat2: number, lon2: number
): number {
 const R = 6371; // Earth's radius in km
 const dLat = ((lat2 - lat1) * Math.PI) / 180;
 const dLon = ((lon2 - lon1) * Math.PI) / 180;
 const a =
 Math.sin(dLat / 2) * Math.sin(dLat / 2) +
 Math.cos((lat1 * Math.PI) / 180) *
 Math.cos((lat2 * Math.PI) / 180) *
 Math.sin(dLon / 2) *
 Math.sin(dLon / 2);
 const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 return Math.round(R * c * 10) / 10;
}

// ─── TRAVEL TIME ESTIMATION ──────────────────────────────────────────

/**
 * Estimates travel time based on geodesic distance and transport mode.
 * Uses a 1.25× road winding factor for motorized transport.
 * 
 * Average speeds (Indian conditions):
 * taxi: 45 km/h | bus: 25 km/h | metro: 35 km/h | walk: 5 km/h
 */
export function estimateTravelTime(
 distanceKm: number,
 mode: 'taxi' | 'metro' | 'walk' | 'bus'
): number {
 const roadMultiplier = 1.25;

 if (mode === 'walk') {
 return Math.max(3, Math.round((distanceKm / 5) * 60));
 }

 const roadDistance = distanceKm * roadMultiplier;
 const speeds: Record<string, number> = { taxi: 45, bus: 25, metro: 35 };
 const speed = speeds[mode] || 40;
 return Math.max(5, Math.round((roadDistance / speed) * 60));
}

/**
 * Formats minutes into a human-readable string.
 */
export function formatTravelTime(minutes: number): string {
 if (minutes < 60) return `${minutes} min`;
 const h = Math.floor(minutes / 60);
 const m = minutes % 60;
 return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

// ─── TAXI COST ESTIMATION ────────────────────────────────────────────

/**
 * Estimates taxi cost in INR.
 * Base fare: ₹60 (first 2 km), then ₹18/km (app cab rates).
 */
export function estimateTaxiCost(distanceKm: number): number {
 const roadDistance = distanceKm * 1.25;
 if (roadDistance <= 2) return 60;
 return Math.round(60 + (roadDistance - 2) * 18);
}

// ─── NEAREST TRANSIT HUB FINDER ──────────────────────────────────────

export interface NearestHubResult {
 hub: TransitHub;
 distanceKm: number;
 travelTimeMinutes: number;
 estimatedCostInr: number;
}

/**
 * Finds the nearest transit hub of a given type to a college location.
 * Searches ALL hubs globally — not limited to a city cluster.
 */
export function findNearestHub(
 collegeLat: number,
 collegeLng: number,
 type: TransitHub['type']
): NearestHubResult | null {
 const hubs = ALL_TRANSIT_HUBS.filter(h => h.type === type);
 if (hubs.length === 0) return null;

 let nearest: TransitHub | null = null;
 let minDist = Infinity;

 for (const hub of hubs) {
 const dist = calculateGeodesicDistance(collegeLat, collegeLng, hub.lat, hub.lng);
 if (dist < minDist) {
 minDist = dist;
 nearest = hub;
 }
 }

 if (!nearest) return null;

 const mode = type === 'metro' ? 'walk' as const : 'taxi' as const;
 return {
 hub: nearest,
 distanceKm: minDist,
 travelTimeMinutes: estimateTravelTime(minDist, mode),
 estimatedCostInr: estimateTaxiCost(minDist),
 };
}

// ─── ACCESSIBILITY SCORE ─────────────────────────────────────────────

/**
 * Calculates a transparent accessibility score (0-10) for a college.
 * 
 * FORMULA:
 * Score = Σ(factor × weight) / Σ(active weights)
 * 
 * FACTORS & WEIGHTS:
 * Airport proximity (25%) — how close is the nearest airport
 * Railway proximity (30%) — how close is the nearest railway station
 * Metro availability (15%) — is metro available nearby
 * Bus connectivity (15%) — how close is the nearest bus terminal
 * City center (15%) — how close to the city center
 * 
 * If a factor has no data, it is EXCLUDED from calculation (not penalized).
 */
export interface AccessibilityBreakdown {
 score: number;
 airportFactor: number;
 railwayFactor: number;
 metroFactor: number;
 busFactor: number;
 cityFactor: number;
}

function distanceToFactor(distKm: number, thresholds: number[]): number {
 // thresholds: [excellent, good, fair, poor] in km
 if (distKm <= thresholds[0]) return 10;
 if (distKm <= thresholds[1]) return 8;
 if (distKm <= thresholds[2]) return 6;
 if (distKm <= thresholds[3]) return 4;
 return 2;
}

export function calculateAccessibilityScore(
 airportDist: number | null,
 railwayDist: number | null,
 metroDist: number | null,
 busDist: number | null,
 cityCenterDist: number | null
): AccessibilityBreakdown {
 const factors: Array<{ value: number; weight: number }> = [];

 const airportFactor = airportDist != null
 ? distanceToFactor(airportDist, [20, 50, 100, 200]) : 0;
 const railwayFactor = railwayDist != null
 ? distanceToFactor(railwayDist, [3, 8, 15, 30]) : 0;
 const metroFactor = metroDist != null
 ? distanceToFactor(metroDist, [2, 5, 10, 15]) : 0;
 const busFactor = busDist != null
 ? distanceToFactor(busDist, [3, 8, 15, 25]) : 0;
 const cityFactor = cityCenterDist != null
 ? distanceToFactor(cityCenterDist, [5, 15, 30, 50]) : 0;

 if (airportDist != null) factors.push({ value: airportFactor, weight: 0.25 });
 if (railwayDist != null) factors.push({ value: railwayFactor, weight: 0.30 });
 if (metroDist != null) factors.push({ value: metroFactor, weight: 0.15 });
 if (busDist != null) factors.push({ value: busFactor, weight: 0.15 });
 if (cityCenterDist != null) factors.push({ value: cityFactor, weight: 0.15 });

 const totalWeight = factors.reduce((sum, f) => sum + f.weight, 0);
 const weightedSum = factors.reduce((sum, f) => sum + f.value * f.weight, 0);
 const score = totalWeight > 0
 ? Math.round((weightedSum / totalWeight) * 10) / 10
 : 0;

 return {
 score: Math.min(10, Math.max(0, score)),
 airportFactor,
 railwayFactor,
 metroFactor,
 busFactor,
 cityFactor,
 };
}

// ─── CITY CENTER COORDINATES ─────────────────────────────────────────

/** Known city center coordinates for distance-from-center calculations */
const CITY_CENTERS: Record<string, { lat: number; lng: number }> = {
 'new delhi': { lat: 28.630, lng: 77.218 },
 'delhi': { lat: 28.630, lng: 77.218 },
 'mumbai': { lat: 18.926, lng: 72.824 },
 'bengaluru': { lat: 12.974, lng: 77.611 },
 'bangalore': { lat: 12.974, lng: 77.611 },
 'hyderabad': { lat: 17.361, lng: 78.474 },
 'chennai': { lat: 13.041, lng: 80.233 },
 'pune': { lat: 18.517, lng: 73.840 },
 'kolkata': { lat: 22.553, lng: 88.352 },
 'ahmedabad': { lat: 23.023, lng: 72.571 },
 'jaipur': { lat: 26.912, lng: 75.787 },
 'lucknow': { lat: 26.847, lng: 80.946 },
 'chandigarh': { lat: 30.733, lng: 76.779 },
 'bhubaneswar': { lat: 20.296, lng: 85.824 },
 'guwahati': { lat: 26.148, lng: 91.736 },
 'coimbatore': { lat: 11.004, lng: 76.961 },
 'indore': { lat: 22.719, lng: 75.857 },
 'nagpur': { lat: 21.146, lng: 79.088 },
 'patna': { lat: 25.612, lng: 85.144 },
 'kanpur': { lat: 26.449, lng: 80.331 },
 'varanasi': { lat: 25.317, lng: 83.010 },
 'vellore': { lat: 12.916, lng: 79.132 },
 'manipal': { lat: 13.352, lng: 74.786 },
 'roorkee': { lat: 29.863, lng: 77.893 },
 'pilani': { lat: 28.362, lng: 75.600 },
 'sonipat': { lat: 28.993, lng: 77.019 },
 'kharagpur': { lat: 22.346, lng: 87.323 },
 'dhanbad': { lat: 23.795, lng: 86.435 },
 'jodhpur': { lat: 26.290, lng: 73.017 },
 'tirupati': { lat: 13.628, lng: 79.419 },
 'visakhapatnam': { lat: 17.686, lng: 83.218 },
 'thiruvananthapuram': { lat: 8.488, lng: 76.949 },
 'kochi': { lat: 9.931, lng: 76.267 },
 'raipur': { lat: 21.251, lng: 81.629 },
 'ranchi': { lat: 23.344, lng: 85.309 },
 'cuttack': { lat: 20.462, lng: 85.883 },
 'noida': { lat: 28.535, lng: 77.391 },
 'gurugram': { lat: 28.457, lng: 77.026 },
};

/**
 * Gets the city center distance for a college.
 * Returns null if the city is not in our database.
 */
export function getCityCenterDistance(
 collegeLat: number, collegeLng: number, city: string
): number | null {
 const center = CITY_CENTERS[city.toLowerCase()];
 if (!center) return null;
 return calculateGeodesicDistance(collegeLat, collegeLng, center.lat, center.lng);
}
