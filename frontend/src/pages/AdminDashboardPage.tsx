import { useState, useEffect } from 'react';
import { 
  ShieldCheck, Building2, Users, BookOpen, Star, 
  Plus, ExternalLink, RefreshCw, Trash2, Search, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState<any>(null);
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const statsRes = await api.colleges.stats();
      setStats(statsRes);
      const collegeRes = await api.colleges.list();
      setColleges(collegeRes.results || collegeRes as any);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    loadData();
  }, [user]);

  const filteredColleges = colleges.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.city && c.city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F6F7FB] py-8 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E3E8EF] shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
              <ShieldCheck size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#0A2540]">Superuser Control Center</h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Admin Active
                </span>
              </div>
              <p className="text-sm text-[#697386] mt-0.5">
                Logged in as <strong className="text-[#0A2540]">{user?.email}</strong> — Full Database & System Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E3E8EF] text-sm font-semibold text-[#0A2540] hover:bg-slate-50 transition-all"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <a
              href="http://localhost:8000/admin/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-md"
            >
              <ExternalLink size={16} /> Django Admin Portal
            </a>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="sz-card p-6 bg-white border border-[#E3E8EF] rounded-2xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#9DA6B4]">Total Colleges</p>
                <h3 className="text-3xl font-black text-[#0A2540] mt-1">{stats?.total_colleges || colleges.length}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Building2 size={20} />
              </div>
            </div>
            <p className="text-xs text-[#697386] mt-3">Indexed across IITs, NITs, BITS & Deemed Universities</p>
          </div>

          <div className="sz-card p-6 bg-white border border-[#E3E8EF] rounded-2xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#9DA6B4]">Avg Package LPA</p>
                <h3 className="text-3xl font-black text-emerald-600 mt-1">₹{stats?.avg_package_lpa || '24.6'} LPA</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Star size={20} />
              </div>
            </div>
            <p className="text-xs text-[#697386] mt-3">National average calculated from active placements</p>
          </div>

          <div className="sz-card p-6 bg-white border border-[#E3E8EF] rounded-2xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#9DA6B4]">Active Exams</p>
                <h3 className="text-3xl font-black text-[#0A2540] mt-1">{stats?.total_exams || 8}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <BookOpen size={20} />
              </div>
            </div>
            <p className="text-xs text-[#697386] mt-3">JEE Main, JEE Adv, BITSAT, NEET UG & State Exams</p>
          </div>

          <div className="sz-card p-6 bg-white border border-[#E3E8EF] rounded-2xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#9DA6B4]">Platform Users</p>
                <h3 className="text-3xl font-black text-indigo-600 mt-1">Active</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users size={20} />
              </div>
            </div>
            <p className="text-xs text-[#697386] mt-3">SimpleJWT authenticated student & admin accounts</p>
          </div>
        </div>

        {/* Management Table */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#0A2540]">Institution Management</h2>
              <p className="text-sm text-[#697386]">Inspect and manage live database records</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Filter colleges..."
                className="w-full bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl pl-9 pr-4 py-2 text-sm text-[#0A2540] outline-none focus:border-blue-500"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E3E8EF] text-xs font-bold text-[#9DA6B4] uppercase tracking-wider">
                  <th className="pb-3">College Name</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Tier</th>
                  <th className="pb-3">NIRF Rank</th>
                  <th className="pb-3">Avg Package</th>
                  <th className="pb-3">Annual Fee</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E8EF] text-sm">
                {filteredColleges.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 font-bold text-[#0A2540]">
                      <Link to={`/college/${c.id}`} className="hover:underline flex items-center gap-2">
                        <Building2 size={16} className="text-gray-400" />
                        {c.name}
                      </Link>
                    </td>
                    <td className="py-4 text-[#697386]">{c.city}, {c.state}</td>
                    <td className="py-4">
                      <span className="bg-slate-100 text-[#0A2540] text-xs font-bold px-2.5 py-1 rounded-md">
                        {c.tier}
                      </span>
                    </td>
                    <td className="py-4 font-semibold text-[#0A2540]">#{c.nirf_rank || c.nirfRank || 'N/A'}</td>
                    <td className="py-4 font-semibold text-emerald-600">₹{c.avg_package_lpa || c.avgPackageLpa} LPA</td>
                    <td className="py-4 text-[#697386]">₹{c.annual_fee_lpa || c.annualFeeLpa}L/yr</td>
                    <td className="py-4 text-right">
                      <a
                        href={`http://localhost:8000/admin/api/college/${c.id}/change/`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-blue-600 hover:underline px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 inline-flex items-center gap-1"
                      >
                        Edit in Django Admin <ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
