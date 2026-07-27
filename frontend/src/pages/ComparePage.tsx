import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, CheckCircle2, XCircle } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { colleges } from '../api/mocks/colleges';


/**
 * ComparePage.tsx
 *
 * WHAT THIS FILE DOES:
 * Lets students compare up to 3 colleges side-by-side on metrics like
 * fees, ranking, placement, campus, hostel, and facilities.
 *
 * WHY IT EXISTS:
 * Choosing between similar colleges is hard. Side-by-side comparison
 * makes it easy to see which one is better for the student's needs.
 *
 * KEY CONCEPTS:
 * - College dropdown selectors with autocomplete
 * - Comparison table with highlight colors for differences
 * - Metrics: fees, placement, ranking, campus, hostel, facilities
 * - Winner calculation: Highlights which college is best per metric
 * - Mobile responsive: Horizontal scroll on small screens
 */
export default function ComparePage() {
 const [searchParams] = useSearchParams();
 const [selectedColleges, setSelectedColleges] = useState<string[]>(() => {
 const ids = searchParams.get('ids');
 const add = searchParams.get('add');
 if (ids) {
 return ids.split(',').filter(id => colleges.some(c => c.id === id)).slice(0, 3);
 }
 if (add && colleges.some(c => c.id === add)) {
 return [add];
 }
 return [];
 });
 const { query, setQuery, results } = useSearch({ data: colleges, searchKeys: ['name'] });

 const handleSelect = (id: string) => {
 if (selectedColleges.includes(id)) {
 setSelectedColleges(prev => prev.filter(c => c !== id));
 } else if (selectedColleges.length < 3) {
 setSelectedColleges(prev => [...prev, id]);
 }
 };

 const selectedData = selectedColleges.map(id => colleges.find(c => c.id === id)!);

 return (
 <div className="bg-[#F6F7FB] min-h-screen pb-20 transition-colors duration-200">
 <div className="bg-white border-b border-[#E3E8EF] pt-10 pb-14 transition-colors duration-200">
 <div className="w-full max-w-[1400px] mx-auto px-6 text-center">
 <h1 className="text-4xl font-bold text-[#0A2540] mb-3">Compare Colleges</h1>
 <p className="text-[#697386] text-lg max-w-xl mx-auto">
 Select up to 3 colleges and compare them side-by-side.
 </p>
 </div>
 </div>

 <div className="w-full max-w-[1400px] mx-auto px-6 py-10">
 {/* Selection */}
 <div className="sz-card p-8 mb-10">
 <div className="relative w-full max-w-xl mx-auto mb-6">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9DA6B4]"size={20} />
 <input
 type="text"
 placeholder="Search colleges to add..."
 className="sz-input pl-12 py-4 rounded-2xl"
 value={query}
 onChange={e => setQuery(e.target.value)}
 />
 {query && (
 <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#E3E8EF] shadow-xl max-h-60 overflow-y-auto z-20">
 {results.slice(0, 5).map(college => (
 <button
 key={college.id}
 onClick={() => { handleSelect(college.id); setQuery(''); }}
 disabled={selectedColleges.includes(college.id) || (selectedColleges.length >= 3 && !selectedColleges.includes(college.id))}
 className="w-full text-left px-4 py-3.5 hover:bg-[#F6F7FB] :bg-slate-800/80 disabled:opacity-40 disabled:cursor-not-allowed flex justify-between items-center border-b border-[#E3E8EF] last:border-0 transition-colors cursor-pointer"
 >
 <span className="font-semibold text-[#0A2540] text-sm">{college.name}</span>
 {selectedColleges.includes(college.id)
 ? <CheckCircle2 size={18} className="text-black"/>
 : <span className="text-xs text-black font-bold">Add +</span>}
 </button>
 ))}
 </div>
 )}
 </div>

 <div className="flex flex-wrap justify-center gap-3">
 {selectedColleges.map((id, index) => {
 const college = colleges.find(c => c.id === id);
 return (
 <div key={id} className="flex items-center gap-2 bg-slate-100 text-black border border-slate-300 px-4 py-2 rounded-xl font-semibold text-sm animate-slide-up"style={{animationDelay:`${index*80}ms`}}>
 {college?.name}
 <button onClick={() => handleSelect(id)} className="text-black/60 hover:text-black :text-indigo-300 transition-colors cursor-pointer">
 <XCircle size={16} />
 </button>
 </div>
 );
 })}
 {selectedColleges.length === 0 && (
 <span className="text-[#9DA6B4] italic text-sm">No colleges selected. Add up to 3.</span>
 )}
 </div>
 </div>

 {/* Table */}
 {selectedColleges.length > 0 && (
 <div className="sz-card overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[700px]">
 <thead>
 <tr>
 <th className="p-6 border-b border-[#E3E8EF] bg-[#F6F7FB] w-1/4 text-xs font-bold text-[#9DA6B4] uppercase tracking-wider">Feature</th>
 {selectedData.map(c => (
 <th key={c.id} className="p-6 border-b border-l border-[#E3E8EF] bg-white w-1/4 align-top">
 <div className="text-lg font-bold text-[#0A2540]">{c.name}</div>
 <div className="text-sm text-[#697386] mt-1">{c.city}, {c.state}</div>
 </th>
 ))}
 {Array.from({ length: 3 - selectedData.length }).map((_, i) => (
 <th key={i} className="p-6 border-b border-l border-[#E3E8EF] bg-[#F6F7FB] w-1/4">
 <div className="h-20 border-2 border-dashed border-[#E3E8EF] rounded-xl flex items-center justify-center text-[#9DA6B4] text-sm">
 Add College
 </div>
 </th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-[#E3E8EF]">
 {[
 { label: 'NIRF Rank', render: (c: typeof colleges[0]) => c.nirfRank ? `#${c.nirfRank}` : 'N/A' },
 { label: 'Annual Fees', render: (c: typeof colleges[0]) => `₹${c.annualFeeLpa}L / year` },
 { label: 'Tier', render: (c: typeof colleges[0]) => c.tier },
 { label: 'Type', render: (c: typeof colleges[0]) => c.ownership },
 { label: 'Avg Package', render: (c: typeof colleges[0]) => `₹${c.avgPackageLpa}L` },
 { label: 'Entrance Exams', render: (c: typeof colleges[0]) => c.entranceExams.join(', ') },
 { label: 'Programs', render: (c: typeof colleges[0]) => c.programs.slice(0, 3).join(', ') },
 { label: 'Campus Vibe', render: (c: typeof colleges[0]) => c.vibe },
 ].map(({ label, render }) => (
 <tr key={label}>
 <td className="p-5 font-semibold text-[#425466] bg-[#F6F7FB] text-sm">{label}</td>
 {selectedData.map(c => (
 <td key={c.id} className="p-5 border-l border-[#E3E8EF] text-sm text-[#0A2540] bg-white">
 {render(c)}
 </td>
 ))}
 {Array.from({ length: 3 - selectedData.length }).map((_, i) => (
 <td key={i} className="p-5 border-l border-[#E3E8EF] bg-[#F6F7FB]"></td>
 ))}
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </div>
 </div>
 );
}
