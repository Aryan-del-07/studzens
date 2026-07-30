/**
 * ForYouPage.tsx
 *
 * WHAT THIS FILE DOES:
 * Displays personalized college recommendations ranked by a scoring algorithm
 * that uses the student's onboarding profile: stream, budget, preferred states,
 * academic category, exam scores, and career goals.
 *
 * ALGORITHM:
 * Each college gets a score (0–100) based on:
 *  - Stream match        (+30)
 *  - Budget fit          (+25) — fee ≤ user's budget limit
 *  - State preference    (+20) — college is in a preferred state
 *  - Category/goal match (+15) — college matches career goals
 *  - Tier bonus          (+10) — Tier 1 > Tier 2 > Tier 3
 */

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, IndianRupee, Star, BadgeCheck, ChevronRight, Info, GraduationCap, SlidersHorizontal, BookOpen } from 'lucide-react';
import { useStudentProfile } from '../contexts/StudentProfileContext';
import { useAuth } from '../contexts/AuthContext';
import { colleges } from '../api/mocks/colleges';
import type { College } from '../api/mocks/colleges';

// ---------------------------------------------------------------------------
// SCORING ALGORITHM
// ---------------------------------------------------------------------------

interface ScoredCollege {
  college: College;
  score: number;
  reasons: string[];
  bucket: 'reach' | 'match' | 'safe';
}

function scoreCollege(college: College, profile: ReturnType<typeof useStudentProfile>['profile']): ScoredCollege {
  let score = 0;
  const reasons: string[] = [];

  const { academicProfile, preferences } = profile;
  const stream = academicProfile?.stream;
  const budget = preferences?.budgetLimitLpa;
  const preferredStates = preferences?.preferredStates ?? [];
  const goals = preferences?.goals ?? [];

  // 1. Stream match (+30)
  if (stream && college.streams?.includes(stream)) {
    score += 30;
    reasons.push('Matches your stream');
  }

  // 2. Budget fit (+25)
  if (budget && budget > 0) {
    if (college.annualFeeLpa <= budget) {
      score += 25;
      reasons.push(`Within ₹${budget}L budget`);
    } else if (college.annualFeeLpa <= budget * 1.3) {
      score += 12; // slightly over budget — partial credit
      reasons.push('Slightly over budget');
    }
  } else {
    // No budget set — give partial credit so results still appear
    score += 12;
  }

  // 3. State preference (+20)
  if (preferredStates.length > 0 && preferredStates.includes(college.state)) {
    score += 20;
    reasons.push(`In your preferred state (${college.state})`);
  } else if (preferredStates.length === 0) {
    score += 10; // No preference set — neutral
  }

  // 4. Career/goal match (+15)
  if (goals.length > 0 && goals.some(g => college.categories?.includes(g))) {
    score += 15;
    reasons.push('Matches your career goals');
  } else if (goals.length === 0) {
    score += 8;
  }

  // 5. Tier bonus (+10)
  if (college.tier === 'Tier 1') { score += 10; }
  else if (college.tier === 'Tier 2') { score += 6; }
  else { score += 3; }

  // Classify into reach / match / safe based on score
  let bucket: 'reach' | 'match' | 'safe';
  if (score >= 70) bucket = 'safe';
  else if (score >= 45) bucket = 'match';
  else bucket = 'reach';

  return { college, score, reasons, bucket };
}

// ---------------------------------------------------------------------------
// BUCKET CONFIG
// ---------------------------------------------------------------------------

const BUCKET_META = {
  reach:  { label: 'Aspirational',   sub: 'Strong effort needed',         color: '#f59e0b', bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   icon: '🏆' },
  match:  { label: 'Reliable Picks',  sub: 'Good match within your range', color: '#22c55e', bg: 'bg-green-50',   border: 'border-green-200',   text: 'text-green-700',   icon: '✅' },
  safe:   { label: 'Safest Options',  sub: 'High chance of admission',     color: '#3b82f6', bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700',    icon: '🛡️' },
};

// ---------------------------------------------------------------------------
// COMPONENTS
// ---------------------------------------------------------------------------

function ProfileCompletionBanner({ profile }: { profile: ReturnType<typeof useStudentProfile>['profile'] }) {
  const missing: string[] = [];
  if (!profile.academicProfile?.stream) missing.push('Stream');
  if (!profile.preferences?.budgetLimitLpa) missing.push('Budget');
  if (!profile.preferences?.goals?.length) missing.push('Career Goals');
  if (!profile.preferences?.preferredStates?.length) missing.push('Preferred States');

  if (missing.length === 0) return null;

  return (
    <div className="mx-4 sm:mx-0 mb-6 flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4">
      <Info size={18} className="text-slate-500 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-700">
          Complete your profile for better matches
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          Missing: {missing.join(', ')}
        </p>
      </div>
      <Link
        to="/profile"
        className="shrink-0 text-xs font-bold text-[#0A2540] border border-[#0A2540]/20 rounded-lg px-3 py-1.5 hover:bg-slate-100 transition-colors"
      >
        Update →
      </Link>
    </div>
  );
}

function CollegeCard({ sc, rank }: { sc: ScoredCollege; rank: number }) {
  const { college, score, reasons, bucket } = sc;
  const meta = BUCKET_META[bucket];

  return (
    <Link
      to={`/college/${college.id}`}
      className="group flex items-start gap-4 bg-white border border-[#E3E8EF] rounded-2xl px-5 py-4 hover:border-slate-300 hover:shadow-md transition-all duration-200"
    >
      {/* Rank badge */}
      <div className="shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
        <span className="text-xs font-bold text-slate-500">#{rank}</span>
      </div>

      {/* College icon */}
      <div className="shrink-0 w-11 h-11 rounded-xl bg-slate-50 border border-[#E3E8EF] flex items-center justify-center">
        <GraduationCap size={22} className="text-[#425466]" />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-[#0A2540] text-[15px] leading-tight group-hover:text-black transition-colors">
              {college.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={12} className="text-slate-400 shrink-0" />
              <span className="text-xs text-slate-500">{college.city}, {college.state}</span>
            </div>
          </div>

          {/* Match score pill */}
          <div className="shrink-0 flex items-center gap-1">
            <div
              className="text-white text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: meta.color }}
            >
              {score}% match
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5">
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <IndianRupee size={11} className="text-slate-400" />
            <span>₹{college.annualFeeLpa}L/yr</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <BadgeCheck size={11} className="text-slate-400" />
            <span>{college.tier}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span>{college.studentRating}</span>
          </div>
          {college.nirfRank && (
            <div className="text-xs text-slate-500">NIRF #{college.nirfRank}</div>
          )}
        </div>

        {/* Reasons / Why tags */}
        {reasons.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {reasons.slice(0, 3).map(r => (
              <span
                key={r}
                className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100 text-slate-600 rounded-lg px-2 py-0.5"
              >
                <BadgeCheck size={10} className="text-green-500" />
                {r}
              </span>
            ))}
          </div>
        )}
      </div>

      <ChevronRight size={16} className="shrink-0 text-slate-300 mt-1 group-hover:text-slate-500 transition-colors" />
    </Link>
  );
}

function BucketSection({ bucket, items }: { bucket: 'reach' | 'match' | 'safe'; items: ScoredCollege[] }) {
  const meta = BUCKET_META[bucket];
  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <div className={`inline-flex items-center gap-2.5 ${meta.bg} border ${meta.border} rounded-2xl px-4 py-2.5 mb-4`}>
        <span className="text-lg">{meta.icon}</span>
        <div>
          <p className={`text-sm font-bold ${meta.text}`}>{meta.label}</p>
          <p className="text-xs text-slate-500">{meta.sub}</p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((sc, i) => (
          <CollegeCard key={sc.college.id} sc={sc} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------

type FilterMode = 'all' | 'reach' | 'match' | 'safe';

export default function ForYouPage() {
  const { profile } = useStudentProfile();
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterMode>('all');
  const [showCount, setShowCount] = useState(30);

  // Score and sort every college
  const scored = useMemo<ScoredCollege[]>(() => {
    return colleges
      .map(c => scoreCollege(c, profile))
      .sort((a, b) => b.score - a.score);
  }, [profile]);

  const filtered = useMemo(() => {
    const list = filter === 'all' ? scored : scored.filter(s => s.bucket === filter);
    return list.slice(0, showCount);
  }, [scored, filter, showCount]);

  const reach = filtered.filter(s => s.bucket === 'reach');
  const match = filtered.filter(s => s.bucket === 'match');
  const safe  = filtered.filter(s => s.bucket === 'safe');

  const totalReach = scored.filter(s => s.bucket === 'reach').length;
  const totalMatch = scored.filter(s => s.bucket === 'match').length;
  const totalSafe  = scored.filter(s => s.bucket === 'safe').length;

  const profileComplete =
    !!profile.academicProfile?.stream &&
    !!profile.preferences?.budgetLimitLpa &&
    !!profile.preferences?.goals?.length;

  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      {/* ── Hero Header ─────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E3E8EF]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-[#0A2540] flex items-center justify-center shadow-sm">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0A2540] tracking-tight">
                For You
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                {user?.name ? `Personalised for ${user.name.split(' ')[0]}` : 'Personalised picks'}
                {' · '}
                {scored.length} colleges ranked
              </p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="flex items-center gap-4 mt-5 flex-wrap">
            {[
              { label: 'Reach', count: totalReach,  color: 'bg-amber-100 text-amber-700',  dot: 'bg-amber-400' },
              { label: 'Match', count: totalMatch,  color: 'bg-green-100 text-green-700',  dot: 'bg-green-500' },
              { label: 'Safe',  count: totalSafe,   color: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-500'  },
            ].map(({ label, count, color, dot }) => (
              <div key={label} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold ${color}`}>
                <span className={`w-2 h-2 rounded-full ${dot}`} />
                {count} {label}
              </div>
            ))}

            {!profileComplete && (
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Info size={12} /> Incomplete profile — results may vary
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">

        {/* Profile completion nudge */}
        <ProfileCompletionBanner profile={profile} />

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          <SlidersHorizontal size={15} className="text-slate-400 shrink-0" />
          {(['all', 'reach', 'match', 'safe'] as FilterMode[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                filter === f
                  ? 'bg-[#0A2540] text-white shadow-sm'
                  : 'bg-white text-[#697386] border border-[#E3E8EF] hover:border-slate-300'
              }`}
            >
              {f === 'all' ? 'All Colleges' : BUCKET_META[f].label}
            </button>
          ))}
        </div>

        {/* No profile state */}
        {scored.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={40} className="mx-auto text-slate-300 mb-4" />
            <h3 className="font-bold text-slate-700 mb-2">No colleges yet</h3>
            <p className="text-sm text-slate-500">Complete your profile to get personalised matches.</p>
            <Link to="/profile" className="mt-4 inline-flex items-center gap-2 bg-[#0A2540] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-900 transition-colors">
              Complete Profile →
            </Link>
          </div>
        ) : (
          <>
            {filter === 'all' ? (
              <>
                <BucketSection bucket="safe"  items={safe} />
                <BucketSection bucket="match" items={match} />
                <BucketSection bucket="reach" items={reach} />
              </>
            ) : (
              <div className="space-y-3">
                {filtered.map((sc, i) => (
                  <CollegeCard key={sc.college.id} sc={sc} rank={i + 1} />
                ))}
              </div>
            )}

            {/* Load more */}
            {showCount < scored.length && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowCount(c => c + 20)}
                  className="bg-white border border-[#E3E8EF] text-[#0A2540] text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  Load more colleges
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
