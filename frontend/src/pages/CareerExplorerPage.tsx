import { useState } from 'react';
import { useStudentProfile } from '../contexts/StudentProfileContext';
import { Target, BookOpen, Briefcase, Plus, Map, Sparkles, Building2, Trash2, GraduationCap } from 'lucide-react';
import { colleges } from '../api/mocks/colleges';
import { exams } from '../api/mocks/exams';
import { careers } from '../api/mocks/careers';

type StepType = 'schooling' | 'exam' | 'course' | 'college' | 'career';

interface RoadmapStep {

/**
 * CareerExplorerPage.tsx
 *
 * WHAT THIS FILE DOES:
 * Shows career options with details like salary, growth, and required
 * degrees. Helps students understand what career paths are available.
 *
 * WHY IT EXISTS:
 * Many students don't know what careers exist or what they pay.
 * This page educates them and helps them choose a direction.
 *
 * KEY CONCEPTS:
 * - Career cards with icon, title, salary, and growth rate
 * - Category grouping: Engineering, Medical, Law, Design, etc.
 * - Related courses section: Shows which degrees lead to this career
 * - Interactive hover effects for engagement
 * -"Explore More"pagination for large lists
 */
 id: string;
 type: StepType;
 title: string;
 description?: string;
}

export default function CareerExplorerPage() {
 const { saveRoadmap } = useStudentProfile();
 const [steps, setSteps] = useState<RoadmapStep[]>([
 { id: 'start-1', type: 'schooling', title: '10th Grade', description: 'Secondary Education' }
 ]);
 const [isAdding, setIsAdding] = useState(false);
 const [newStepType, setNewStepType] = useState<StepType>('course');
 const [newStepValue, setNewStepValue] = useState('');
 const [isSaved, setIsSaved] = useState(false);

 const handleSaveRoadmap = () => {
 saveRoadmap({
 id: `roadmap-${Date.now()}`,
 createdAt: new Date().toISOString(),
 steps
 });
 setIsSaved(true);
 setTimeout(() => setIsSaved(false), 3000);
 };

 // Dummy courses for the 'course' type
 const courses = [
 'B.Tech Computer Science',
 'B.Tech Mechanical',
 'MBBS',
 'B.Com (Hons)',
 'BBA',
 'BA Economics',
 'LLB',
 'B.Des'
 ];

 const handleAddStep = (e: React.FormEvent) => {
 e.preventDefault();
 if (!newStepValue) return;

 let title = newStepValue;
 let description = '';

 if (newStepType === 'exam') {
 const exam = exams.find(ex => ex.id === newStepValue);
 if (exam) {
 title = exam.name;
 description = exam.category.toUpperCase();
 }
 } else if (newStepType === 'college') {
 const college = colleges.find(c => c.id === newStepValue);
 if (college) {
 title = college.name;
 description = `${college.city}, ${college.state}`;
 }
 } else if (newStepType === 'career') {
 const career = careers.find(c => c.id === newStepValue);
 if (career) {
 title = career.title;
 description = 'Career Path';
 }
 }

 setSteps([...steps, {
 id: `step-${Date.now()}`,
 type: newStepType,
 title,
 description
 }]);

 setIsAdding(false);
 setNewStepValue('');
 };

 const removeStep = (id: string) => {
 setSteps(steps.filter(s => s.id !== id));
 };

 const getStepIcon = (type: StepType) => {
 switch (type) {
 case 'schooling': return <BookOpen size={20} className="text-emerald-500"/>;
 case 'exam': return <Target size={20} className="text-amber-500"/>;
 case 'course': return <GraduationCap size={20} className="text-black"/>;
 case 'college': return <Building2 size={20} className="text-teal-500"/>;
 case 'career': return <Briefcase size={20} className="text-blue-500"/>;
 default: return <Map size={20} className="text-slate-600"/>;
 }
 };

 const inputClasses ="w-full bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl px-4 py-3 text-[#0A2540] placeholder-[#9DA6B4] focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-[#635BFF] focus:bg-white transition-all font-sans";

 return (
 <div className="bg-[#F6F7FB] min-h-screen text-[#0A2540]">
 <div className="max-w-4xl mx-auto px-4 py-12 pb-24">
 <div className="text-center mb-12 animate-slide-up">
 <h1 className="text-4xl font-extrabold text-[#0A2540] mb-4 tracking-tight font-sans">Manual Roadmap Builder</h1>
 <p className="text-lg text-[#697386] font-sans">
 Design your own unique academic and career journey. Add steps one by one.
 </p>
 </div>

 <div className="studzens-card p-8 md:p-12 mb-8 relative overflow-hidden animate-slide-up delay-100">
 {/* The Timeline */}
 <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.35rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-[#E3E8EF]">
 
 {steps.map((step, index) => (
 <div key={step.id} className="relative flex items-start gap-6 group animate-fade-in">
 <div className="flex items-center justify-center w-11 h-11 rounded-full border-4 border-white bg-[#F6F7FB] shadow-sm shrink-0 z-10">
 {getStepIcon(step.type)}
 </div>
 <div className="bg-[#F6F7FB] hover:bg-slate-50 transition-all p-5 rounded-2xl border border-[#E3E8EF] w-full mt-0 group">
 <div className="flex justify-between items-start">
 <div>
 <div className="text-xs font-bold uppercase tracking-wider mb-1 text-[#697386] font-sans">{step.type}</div>
 <h4 className="text-lg font-bold text-[#0A2540] font-sans">{step.title}</h4>
 {step.description && <p className="text-[#425466] mt-1 text-sm font-sans">{step.description}</p>}
 </div>
 {index > 0 && (
 <button 
 onClick={() => removeStep(step.id)}
 className="p-2 text-[#9DA6B4] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
 title="Remove Step"
 >
 <Trash2 size={18} />
 </button>
 )}
 </div>
 </div>
 </div>
 ))}

 {/* Add New Step Form or Button */}
 <div className="relative flex items-start gap-6 pt-4">
 <div className="flex items-center justify-center w-11 h-11 rounded-full border-4 border-white bg-black text-white shadow-sm shrink-0 z-10">
 <Plus size={20} strokeWidth={3} />
 </div>
 
 {isAdding ? (
 <form onSubmit={handleAddStep} className="bg-white p-6 rounded-2xl border border-[#E3E8EF] w-full shadow-md">
 <h4 className="font-bold text-[#0A2540] mb-4 font-sans text-lg">Add the next step</h4>
 
 <div className="space-y-4">
 <div>
 <label className="block text-sm font-semibold text-[#425466] mb-2 font-sans">Step Type</label>
 <select 
 value={newStepType}
 onChange={(e) => {
 setNewStepType(e.target.value as StepType);
 setNewStepValue('');
 }}
 className={inputClasses}
 >
 <option value="schooling">Schooling Phase</option>
 <option value="exam">Entrance Exam</option>
 <option value="course">Degree / Course</option>
 <option value="college">Target College</option>
 <option value="career">Career Goal</option>
 </select>
 </div>

 <div>
 <label className="block text-sm font-semibold text-[#425466] mb-2 font-sans">Select {newStepType}</label>
 
 {newStepType === 'exam' && (
 <select required value={newStepValue} onChange={e => setNewStepValue(e.target.value)} className={inputClasses}>
 <option value="">-- Choose Exam --</option>
 {exams.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
 </select>
 )}
 
 {newStepType === 'college' && (
 <select required value={newStepValue} onChange={e => setNewStepValue(e.target.value)} className={inputClasses}>
 <option value="">-- Choose College --</option>
 {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
 </select>
 )}
 
 {newStepType === 'career' && (
 <select required value={newStepValue} onChange={e => setNewStepValue(e.target.value)} className={inputClasses}>
 <option value="">-- Choose Career --</option>
 {careers.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
 </select>
 )}

 {(newStepType === 'course' || newStepType === 'schooling') && (
 <input 
 type="text"
 required
 value={newStepValue} 
 onChange={e => setNewStepValue(e.target.value)} 
 placeholder={newStepType === 'course' ?"e.g. B.Tech Computer Science":"e.g. 12th Grade (PCM)"}
 className={inputClasses}
 list={newStepType === 'course' ?"course-suggestions": undefined}
 />
 )}
 <datalist id="course-suggestions font-sans">
 {courses.map(c => <option key={c} value={c} />)}
 </datalist>
 </div>
 
 <div className="flex gap-3 pt-4">
 <button type="button"onClick={() => setIsAdding(false)} className="px-5 py-2.5 text-[#697386] hover:text-[#0A2540] hover:bg-[#F6F7FB] rounded-xl font-medium transition-colors cursor-pointer font-sans">
 Cancel
 </button>
 <button type="submit"disabled={!newStepValue} className="btn-primary px-6 py-2.5 flex items-center gap-2 disabled:opacity-50 cursor-pointer font-sans">
 Add Step <Sparkles size={16} />
 </button>
 </div>
 </div>
 </form>
 ) : (
 <button 
 onClick={() => setIsAdding(true)}
 className="bg-white border border-dashed border-[#C7D0DE] hover:border-[#635BFF] hover:bg-slate-100/30 text-black font-bold p-4 rounded-2xl w-full text-left transition-all cursor-pointer font-sans"
 >
 + Add Next Step
 </button>
 )}
 </div>
 </div>
 </div>
 
 {steps.length > 1 && (
 <div className="text-center">
 <button 
 onClick={handleSaveRoadmap}
 disabled={isSaved}
 className={`px-8 py-4 font-bold rounded-xl shadow-lg transition-all cursor-pointer font-sans ${
 isSaved 
 ? 'bg-emerald-500 text-white cursor-default' 
 : 'btn-primary'
 }`}
 >
 {isSaved ? '✓ Saved to Profile!' : 'Save Roadmap'}
 </button>
 </div>
 )}
 </div>
 </div>
 );
}

