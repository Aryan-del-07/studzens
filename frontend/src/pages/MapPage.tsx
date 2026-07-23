import { useState, useMemo } from 'react';
import Map, { Popup, NavigationControl, Source, Layer } from 'react-map-gl/maplibre';
import type { MapLayerMouseEvent } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin, Navigation, ShieldCheck, Filter } from 'lucide-react';
import { colleges } from '../api/mocks/colleges';
import type { College } from '../types/college';
import { Link } from 'react-router-dom';


/**
 * MapPage.tsx
 *
 * WHAT THIS FILE DOES:
 * Displays an interactive map showing the location of colleges.
 * Students can pan, zoom, and click markers to see college details.
 *
 * WHY IT EXISTS:
 * Location is a major factor in college selection. Seeing colleges
 * on a map helps students understand proximity to home, transport, etc.
 *
 * KEY CONCEPTS:
 * - MapLibre GL: Open-source map library (alternative to Google Maps)
 * - Markers: Each college has a pin with a number ranking
 * - Popups: Click a marker to see college name, fees, and ranking
 * - GeoJSON: Colleges are converted to a geographic data format for the map
 * - Responsive: Map container adapts to screen height
 */
const mapStyle = {
 version: 8,
 sources: {
 osm: {
 type: 'raster',
 tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
 tileSize: 256,
 attribution: '&copy; OpenStreetMap Contributors',
 }
 },
 layers: [
 {
 id: 'osm',
 type: 'raster',
 source: 'osm',
 }
 ]
};

// MapLibre Layer styling for clusters
const clusterLayer = {
 id: 'clusters',
 type: 'circle',
 source: 'colleges',
 filter: ['has', 'point_count'],
 paint: {
 'circle-color': ['step', ['get', 'point_count'], '#6366f1', 5, '#4f46e5', 10, '#4338ca'],
 'circle-radius': ['step', ['get', 'point_count'], 20, 5, 30, 10, 40]
 }
};

const clusterCountLayer = {
 id: 'cluster-count',
 type: 'symbol',
 source: 'colleges',
 filter: ['has', 'point_count'],
 layout: {
 'text-field': '{point_count_abbreviated}',
 'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
 'text-size': 14
 },
 paint: {
 'text-color': '#ffffff'
 }
};

const unclusteredPointLayer = {
 id: 'unclustered-point',
 type: 'circle',
 source: 'colleges',
 filter: ['!', ['has', 'point_count']],
 paint: {
 'circle-color': '#4f46e5',
 'circle-radius': 10,
 'circle-stroke-width': 2,
 'circle-stroke-color': '#fff'
 }
};

export default function MapPage() {
 const [popupInfo, setPopupInfo] = useState<College | null>(null);
 const [tierFilter, setTierFilter] = useState('All');

 // Convert colleges to GeoJSON for native clustering
 const geojson = useMemo(() => {
 const features = colleges
 .filter(c => typeof c.lat === 'number' && typeof c.lng === 'number')
 .filter(c => tierFilter === 'All' || c.tier === tierFilter)
 .map(c => ({
 type: 'Feature',
 geometry: { type: 'Point', coordinates: [c.lng, c.lat] },
 properties: { ...c }
 }));
 return { type: 'FeatureCollection', features };
 }, [tierFilter]);

 const handleMapClick = (event: MapLayerMouseEvent) => {
 const feature = event.features && event.features[0];
 if (feature && !feature.properties?.cluster) {
 // Cast properties back to College
 setPopupInfo(feature.properties as unknown as College);
 }
 };

 return (
 <div className="flex flex-col h-[calc(100vh-73px)] text-[#0A2540]">
 <div className="bg-white border-b border-[#E3E8EF] p-4 shrink-0 z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-[#0A2540] flex items-center gap-2 font-sans">
 <MapPin className="text-[#635BFF]"/> Advanced Discovery Map
 </h1>
 <p className="text-[#697386] text-sm mt-1 font-sans">Visualize clustering to find educational hubs and view transit data.</p>
 </div>
 
 <div className="flex items-center gap-2 font-sans">
 <Filter size={18} className="text-[#9DA6B4]"/>
 <select 
 value={tierFilter} 
 onChange={(e) => setTierFilter(e.target.value)}
 className="bg-white border border-[#E3E8EF] text-sm rounded-lg py-2 px-3 focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] font-semibold text-[#0A2540] outline-none cursor-pointer"
 >
 <option value="All">All Institutions</option>
 <option value="Tier 1">Tier 1 Only</option>
 <option value="Tier 2">Tier 2 Only</option>
 <option value="Tier 3">Tier 3 Only</option>
 </select>
 </div>
 </div>
 
 <div className="flex-1 relative">
 <Map
 mapLib={maplibregl}
 initialViewState={{ longitude: 78.9629, latitude: 20.5937, zoom: 4 }}
 mapStyle={mapStyle as any}
 style={{ width: '100%', height: '100%' }}
 interactiveLayerIds={['clusters', 'unclustered-point']}
 onClick={handleMapClick}
 >
 <NavigationControl position="top-right"/>

 {/* MapLibre Native Clustering via Source/Layer */}
 <Source
 id="colleges"
 type="geojson"
 data={geojson as any}
 cluster={true}
 clusterMaxZoom={14}
 clusterRadius={50}
 >
 <Layer {...(clusterLayer as any)} />
 <Layer {...(clusterCountLayer as any)} />
 <Layer {...(unclusteredPointLayer as any)} />
 </Source>

 {popupInfo && (
 <Popup
 anchor="top"
 longitude={Number(popupInfo.lng)}
 latitude={Number(popupInfo.lat)}
 onClose={() => setPopupInfo(null)}
 className="z-50 !text-slate-900"
 maxWidth="300px"
 closeOnClick={false}
 >
 <div className="p-1 font-sans">
 <div className="flex items-center gap-1.5 mb-1">
 <h3 className="font-bold text-slate-900 text-sm">{popupInfo.name}</h3>
 {popupInfo.verificationMetadata?.general?.status === 'Verified' && (
 <span title="Data Verified"><ShieldCheck size={14} className="text-emerald-500 shrink-0"/></span>
 )}
 </div>
 <p className="text-xs text-slate-500 mb-3">{popupInfo.city}, {popupInfo.state}</p>
 
 {popupInfo.transit && typeof popupInfo.transit !== 'string' && (
 <div className="space-y-2 border-t border-slate-100 pt-3">
 <div className="text-xs font-semibold text-slate-700">Transit Access</div>
 {popupInfo.transit.airport && typeof popupInfo.transit.airport !== 'string' && (
 <div className="flex justify-between text-xs">
 <span className="text-slate-500 flex items-center gap-1"><Navigation size={12}/> Airport</span>
 <span className="font-medium">{popupInfo.transit.airport.distanceKm} km</span>
 </div>
 )}
 {popupInfo.transit.railway && typeof popupInfo.transit.railway !== 'string' && (
 <div className="flex justify-between text-xs">
 <span className="text-slate-500 flex items-center gap-1"><Navigation size={12}/> Railway</span>
 <span className="font-medium">{popupInfo.transit.railway.distanceKm} km</span>
 </div>
 )}
 </div>
 )}
 
 <Link 
 to={`/college/${popupInfo.id}`}
 className="mt-3 block w-full text-center bg-[#635BFF] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#4F47E5] transition-colors"
 >
 View Profile
 </Link>
 </div>
 </Popup>
 )}
 </Map>
 </div>
 </div>
 );
}
