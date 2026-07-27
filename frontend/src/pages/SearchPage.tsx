import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Building2, Wallet, Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { colleges } from '../api/mocks/colleges';
import { useSearch } from '../hooks/useSearch';
import { useBookmarks } from '../contexts/BookmarkContext';

type TabType = 'All' | 'Government' | 'Private';
type SortType = 'relevance' | 'lowest-fees' | 'highest-fees';


/**
 * SearchPage.tsx
 *
 * WHAT THIS FILE DOES:
 * Lets students search and filter colleges by name, state, stream,
 * fees, and type. Shows results as a grid of college cards.
 *
 * WHY IT EXISTS:
 * Finding the right college is the core use case of the app.
 * This page provides powerful filtering to narrow down options.
 *
 * KEY CONCEPTS:
 * - `useSearch`: Hook that manages search query and focus state
 * - `getFilteredColleges`: Applies all active filters to the college list
 * - Debounced search: Filters update smoothly as the user types
 * - Bookmark toggle: Students can save colleges for later comparison
 */
export default function SearchPage() {
 const { query, setQuery, results } = useSearch({
 data: colleges,
 searchKeys: ['name', 'city', 'state', 'entranceExams'],
 debounceMs: 200
 });

 const { isSaved, saveCollege, removeCollege } = useBookmarks();
 const [activeTab, setActiveTab] = useState<TabType>('All');
 const [sortBy, setSortBy] = useState<SortType>('relevance');

 const filteredResults = useMemo(() => {
 let finalResults = results;
 if (activeTab !== 'All') finalResults = finalResults.filter(c => c.ownership === activeTab);
 if (sortBy === 'lowest-fees') finalResults = [...finalResults].sort((a, b) => a.annualFeeLpa - b.annualFeeLpa);
 if (sortBy === 'highest-fees') finalResults = [...finalResults].sort((a, b) => b.annualFeeLpa - a.annualFeeLpa);
 return finalResults;
 }, [results, activeTab, sortBy]);

 return (
 <div className="bg-[#F6F7FB] min-h-screen pb-20">
 {/* Header */}
 <div className="bg-white border-b border-[#E3E8EF] pt-8 pb-12">
 <div className="max-w-7xl mx-auto px-4">
 <h1 className="text-4xl font-bold text-[#0A2540] mb-6 animate-slide-up">Explore Colleges</h1>
 <div className="relative max-w-2xl animate-slide-up delay-100">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9DA6B4]"size={20} />
 <input
 type="text"
 placeholder="Search by college name, city, exam (e.g. JEE Main)..."
 className="sz-input pl-12 text-base py-4 rounded-2xl"
 value={query}
 onChange={e => setQuery(e.target.value)}
 />
 </div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
 {/* Sidebar */}
 <aside className="w-full lg:w-56 shrink-0">
 <div>
 <h3 className="font-bold text-[#0A2540] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
 <Filter size={16} className="text-[#697386]"/> Filters
 </h3>
 <div className="space-y-2">
 <p className="text-xs font-semibold text-[#9DA6B4] uppercase tracking-wider mb-2">Institution Type</p>
 {(['All', 'Government', 'Private'] as TabType[]).map(type => (
 <button
 key={type}
 onClick={() => setActiveTab(type)}
 className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
 activeTab === type
 ? 'bg-slate-100 text-black'
 : 'text-[#697386] hover:bg-slate-50 hover:text-[#0A2540]'
 }`}
 >
 {type}
 </button>
 ))}
 </div>
 </div>
 </aside>

 {/* Main */}
 <main className="flex-1 min-w-0">
 <div className="flex justify-between items-center text-sm font-medium text-[#697386] mb-5">
 <span>Showing <strong className="text-[#0A2540]">{filteredResults.length}</strong> colleges</span>
 <div className="flex items-center gap-2">
 <span>Sort:</span>
 <select
 className="bg-transparent font-bold text-[#0A2540] outline-none cursor-pointer border-none"
 value={sortBy}
 onChange={e => setSortBy(e.target.value as SortType)}
 >
 <option value="relevance">Relevance</option>
 <option value="lowest-fees">Lowest Fees</option>
 <option value="highest-fees">Highest Fees</option>
 </select>
 </div>
 </div>

 <div className="space-y-4">
 {filteredResults.map((college, index) => {
 const saved = isSaved(college.id);
 return (
 <div
 key={college.id}
 className="sz-card p-5 animate-slide-up group"
 style={{ animationDelay: `${(index % 5) * 60}ms` }}
 >
 <div className="flex flex-col sm:flex-row gap-4">
 <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
 <Building2 className="text-black"size={26} />
 </div>
 <div className="flex-1 space-y-2 min-w-0">
 <div className="flex justify-between items-start gap-3">
 <div>
 <Link to={`/college/${college.id}`} className="hover:text-black transition-colors">
 <h3 className="text-lg font-bold text-[#0A2540] truncate">{college.name}</h3>
 </Link>
 <p className="text-[#697386] flex items-center gap-1 text-sm mt-0.5">
 <MapPin size={13} /> {college.city}, {college.state}
 </p>
 </div>
 <button
 onClick={() => saved ? removeCollege(college.id) : saveCollege(college.id)}
 className={`p-2 rounded-full transition-all shrink-0 ${
 saved
 ? 'bg-slate-100 text-black'
 : 'bg-slate-50 text-[#9DA6B4] hover:bg-slate-100 hover:text-black'
 }`}
 >
 {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
 </button>
 </div>

 <p className="text-[#697386] text-sm line-clamp-1">{college.vibe}</p>

 <div className="flex flex-wrap gap-2 items-center">
 <span className="flex items-center gap-1 text-sm font-semibold text-[#0A2540] bg-slate-50 px-2.5 py-1.5 rounded-lg border border-[#E3E8EF]">
 <Wallet size={13} className="text-black"/>
 ₹{college.annualFeeLpa}L / yr
 </span>
 {college.entranceExams.slice(0, 3).map(exam => (
 <span key={exam} className="sz-chip">{exam}</span>
 ))}
 {college.entranceExams.length > 3 && (
 <span className="text-xs text-[#9DA6B4] font-medium">
 +{college.entranceExams.length - 3} more
 </span>
 )}
 <div className="flex-1"/>
 <Link
 to={`/college/${college.id}`}
 className="flex items-center gap-1 text-sm font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
 >
 View <ArrowRight size={14} />
 </Link>
 </div>
 </div>
 </div>
 </div>
 );
 })}

 {filteredResults.length === 0 && (
 <div className="sz-card p-16 text-center border-2 border-dashed border-[#E3E8EF]">
 <Search size={36} className="mx-auto text-[#9DA6B4] mb-4"/>
 <h3 className="text-lg font-bold text-[#0A2540]">No colleges found</h3>
 <p className="text-[#697386] mt-2">Try different keywords or filters.</p>
 </div>
 )}
 </div>
 </main>
 </div>
 </div>
 );
}
