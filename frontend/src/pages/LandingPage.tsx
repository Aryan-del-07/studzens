import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, MapPin, Search, Shield, Info, CheckCircle, HelpCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { colleges } from '../api/mocks/colleges';
import { exams } from '../api/mocks/exams';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCTA = () => navigate(isAuthenticated ? '/dashboard' : '/login');

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden font-sans">
      
      {/* ============================
          HERO SECTION
          ============================ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-50 border-b border-[#E3E8EF]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 py-28 flex flex-col items-center text-center">
          <div className="animate-slide-up flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E3E8EF] rounded-full text-[#425466] text-sm font-semibold mb-6 shadow-sm">
              <Info size={14} className="text-[#0A2540]" />
              Data-driven college recommendations
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-[#0A2540] leading-[1.1] tracking-tight mb-6">
              Make confident decisions about your college education.
            </h1>
            <p className="text-lg md:text-xl text-[#425466] leading-relaxed mb-10 max-w-2xl">
              Studzens helps you understand your admission options. By matching your Class 12 marks, entrance exam scores, and location preferences against our college database, we provide a realistic assessment of where you can apply—saving you time and reducing uncertainty.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <button onClick={handleCTA} className="bg-[#0A2540] text-white font-semibold text-base px-8 py-4 rounded-xl hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                Check My Admission Chances <ArrowRight size={18} />
              </button>
              <Link to="/search" className="bg-white text-[#0A2540] border border-[#E3E8EF] font-semibold text-base px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center w-full sm:w-auto">
                Explore Colleges
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          STATS BAR
          ============================ */}
      <div className="bg-white border-b border-[#E3E8EF] py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: CheckCircle, label: `Supports ${exams.length}+ Entrance Exams` },
            { icon: MapPin, label: 'Covers Colleges Across India' },
            { icon: Shield, label: 'Personalized Recommendations' },
            { icon: Search, label: 'Multiple Filters Available' },
          ].map(({ icon: Icon, label }, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <Icon size={24} className="text-[#697386]" />
              <div className="text-sm font-semibold text-[#0A2540]">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================
          HOW IT WORKS
          ============================ */}
      <section className="py-20 bg-[#F6F7FB] px-6 border-b border-[#E3E8EF]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-3">How Studzens Works</h2>
            <p className="text-[#425466] text-lg max-w-2xl">A transparent process to help you build your college list.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: 'Step 1', 
                title: 'Enter your academic profile', 
                desc: 'Input your entrance exam scores, Class 12 marks, preferred courses, and desired states. The more detail you provide, the more relevant your results will be.' 
              },
              { 
                step: 'Step 2', 
                title: 'Data comparison', 
                desc: 'Studzens compares your academic profile with available colleges, analyzing location preferences, budget constraints, and exam acceptances.' 
              },
              { 
                step: 'Step 3', 
                title: 'Review recommendations', 
                desc: 'Receive a personalized list of colleges categorized by your admission likelihood (Safe, Target, Reach). Use this list to prioritize your applications.' 
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white p-8 rounded-2xl border border-[#E3E8EF]">
                <div className="text-sm font-bold text-[#635BFF] mb-3 uppercase tracking-wider">{step}</div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-3">{title}</h3>
                <p className="text-[#697386] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          FEATURES (Why Studzens)
          ============================ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-[#0A2540] mb-4">
              Tools to support your academic planning
            </h2>
            <p className="text-[#425466] text-lg max-w-2xl mx-auto">
              We organize complex educational data so you can focus on making the right choice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-[#E3E8EF] flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-8">
                <div className="text-sm font-medium text-[#425466]">Match Categories</div>
                <Shield size={24} strokeWidth={1.5} className="text-[#635BFF]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] leading-tight mb-10 tracking-tight">
                Know exactly where you stand: <span className="text-[#635BFF] font-medium">We group colleges into Safe, Target, and Reach buckets.</span>
              </h3>
              <div className="mt-auto flex items-center gap-6 text-sm font-medium text-[#635BFF]">
                <Link to="/search" className="flex items-center gap-1 hover:text-[#4F47E5]">
                  See Example <ArrowRight size={16} className="-rotate-45" />
                </Link>
                <Link to="/search" className="flex items-center gap-1 hover:text-[#4F47E5]">
                  Know More <ArrowRight size={16} className="-rotate-45" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-[#E3E8EF] flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-8">
                <div className="text-sm font-medium text-[#425466]">Objective Filtering</div>
                <MapPin size={24} strokeWidth={1.5} className="text-[#635BFF]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] leading-tight mb-10 tracking-tight">
                Filter by what matters: <span className="text-[#635BFF] font-medium">Instantly sort colleges by budget limits and preferred states.</span>
              </h3>
              <div className="mt-auto flex items-center gap-6 text-sm font-medium text-[#635BFF]">
                <Link to="/search" className="flex items-center gap-1 hover:text-[#4F47E5]">
                  Try Filters <ArrowRight size={16} className="-rotate-45" />
                </Link>
                <Link to="/search" className="flex items-center gap-1 hover:text-[#4F47E5]">
                  Know More <ArrowRight size={16} className="-rotate-45" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-[#E3E8EF] flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-8">
                <div className="text-sm font-medium text-[#425466]">Data-driven Insights</div>
                <Search size={24} strokeWidth={1.5} className="text-[#635BFF]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] leading-tight mb-10 tracking-tight">
                Stop guessing your chances: <span className="text-[#635BFF] font-medium">We compare your profile against historical admission trends.</span>
              </h3>
              <div className="mt-auto flex items-center gap-6 text-sm font-medium text-[#635BFF]">
                <button onClick={handleCTA} className="flex items-center gap-1 hover:text-[#4F47E5] cursor-pointer">
                  Sign Up <ArrowRight size={16} className="-rotate-45" />
                </button>
                <button onClick={handleCTA} className="flex items-center gap-1 hover:text-[#4F47E5] cursor-pointer">
                  Know More <ArrowRight size={16} className="-rotate-45" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          TRUST SECTION
          ============================ */}
      <section className="py-20 bg-slate-50 px-6 border-y border-[#E3E8EF]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield size={28} className="text-[#0A2540]" />
            <h2 className="text-3xl font-bold text-[#0A2540]">Why Students Can Trust Studzens</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                <span className="text-[#425466] text-sm leading-relaxed"><strong>Data-driven recommendations.</strong> Results are strictly based on the academic information and preferences you provide.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                <span className="text-[#425466] text-sm leading-relaxed"><strong>Estimates, not guarantees.</strong> Admission chances are calculated estimates designed to guide your research. Final admission decisions are made solely by the institutions.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                <span className="text-[#425466] text-sm leading-relaxed"><strong>Privacy first.</strong> Your personal academic data is kept private and is only used to generate your personalized recommendations.</span>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                <span className="text-[#425466] text-sm leading-relaxed"><strong>Publicly available information.</strong> We aim to aggregate and use verified, publicly available educational data regarding fees, exams, and courses.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                <span className="text-[#425466] text-sm leading-relaxed"><strong>No paid rankings.</strong> We do not artificially boost or rank colleges based on paid promotions. Recommendations remain objective.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============================
          FAQ SECTION
          ============================ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <HelpCircle size={28} className="text-[#0A2540]" />
            <h2 className="text-3xl font-bold text-[#0A2540]">Frequently Asked Questions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-[#0A2540] mb-2">How are colleges recommended?</h4>
              <p className="text-[#697386] text-sm leading-relaxed">Colleges are recommended by matching your provided Class 12 marks, entrance exam scores, budget, and location preferences against our database of college admission trends.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0A2540] mb-2">Are admission chances guaranteed?</h4>
              <p className="text-[#697386] text-sm leading-relaxed">No. The Safe, Target, and Reach categories are historical estimates intended to help you prioritize applications. Final admission depends on the respective college's official process.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0A2540] mb-2">Which entrance exams are supported?</h4>
              <p className="text-[#697386] text-sm leading-relaxed">We currently support over 20 major Indian entrance exams, including JEE Main, NEET, BITSAT, CLAT, and state-level engineering and medical examinations.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0A2540] mb-2">Can I compare colleges side-by-side?</h4>
              <p className="text-[#697386] text-sm leading-relaxed">Yes. Once you build your list, you can use our comparison tool to evaluate colleges based on fees, rankings, and accepted exams.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0A2540] mb-2">Is Studzens free?</h4>
              <p className="text-[#697386] text-sm leading-relaxed">Yes, creating an account and accessing personalized college recommendations is completely free for students.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0A2540] mb-2">How often is the data updated?</h4>
              <p className="text-[#697386] text-sm leading-relaxed">We review and update our database periodically to reflect the latest available information regarding exam dates, fee structures, and course offerings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          CTA FOOTER
          ============================ */}
      <section className="py-20 px-6 border-t border-[#E3E8EF] bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0A2540] mb-6">
            Begin your college research
          </h2>
          <p className="text-[#425466] text-base mb-8">
            Create a free profile to see which colleges align with your academic background.
          </p>
          <button onClick={handleCTA} className="bg-[#0A2540] text-white font-semibold text-base px-8 py-3.5 rounded-xl hover:bg-slate-900 transition-colors inline-flex items-center gap-2">
            Build My College List <ArrowRight size={18} />
          </button>
        </div>
      </section>
      
    </div>
  );
}
