import { useDeferredValue, useEffect, useRef, useState, useCallback } from 'react';
import MapGL, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type {
  CSSProperties,
  Dispatch,
  PointerEvent as ReactPointerEvent,
  RefObject,
  SetStateAction,
  WheelEvent as ReactWheelEvent,
} from 'react';
import {
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  Compass,
  ExternalLink,
  Filter,
  GitCompareArrows,
  HeartHandshake,
  Map as MapIcon,
  Microscope,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  categoryColors,
  categoryOptions,
  colleges,
  defaultGoalsByStream,
  defaultSubjectsByStream,
  ownershipOptions,
  streamOptions,
  subjectOptions,
  tierOptions,
} from './data/colleges';
import type {
  College,
  CollegeCategory,
  Ownership,
  Stream,
  Subject,
  Tier,
} from './data/colleges';
import ComparePanel from './components/ComparePanel';
import './index.css';

type SortMode = 'match' | 'roi' | 'fees' | 'package';

interface StudentProfile {
  stream: Stream;
  marks10: number;
  marks11: number;
  marks12: number;
  goals: CollegeCategory[];
  favoriteSubjects: Subject[];
}



interface RankedCollege {
  college: College;
  point: { x: number; y: number };
  matchScore: number;
  roiScore: number;
  fitLabel: 'Confident' | 'Balanced' | 'Stretch';
  reasons: string[];
}



const clusterJumpTargets = [
  { label: 'Delhi NCR', longitude: 77.2090, latitude: 28.6139, zoom: 6 },
  { label: 'Mumbai-Pune', longitude: 73.5, latitude: 18.8, zoom: 6 },
  { label: 'Bengaluru', longitude: 77.5946, latitude: 12.9716, zoom: 6 },
  { label: 'Hyderabad', longitude: 78.4867, latitude: 17.3850, zoom: 6 },
  { label: 'Chennai', longitude: 80.2707, latitude: 13.0827, zoom: 6 },
  { label: 'Kolkata', longitude: 88.3639, latitude: 22.5726, zoom: 6 },
  { label: 'Ahmedabad', longitude: 72.5714, latitude: 23.0225, zoom: 6 },
];

const goalRules: Record<
  CollegeCategory,
  {
    mandatory: Array<{ name: string; note: string; streams: Stream[] }>;
    optional: Array<{ name: string; note: string; streams: Stream[] }>;
  }
> = {
  Engineering: {
    mandatory: [
      {
        name: 'JEE Main',
        note: 'Baseline route for NITs, IIITs, and broad engineering shortlists.',
        streams: ['MPC'],
      },
    ],
    optional: [
      {
        name: 'JEE Advanced',
        note: 'Add if IITs stay in the dream bucket.',
        streams: ['MPC'],
      },
      {
        name: 'BITSAT',
        note: 'Strong premium-private option for engineering.',
        streams: ['MPC'],
      },
      {
        name: 'State CETs like KCET, MHT-CET, WBJEE, TG EAPCET',
        note: 'Great backup layer when you want more state-level ROI plays.',
        streams: ['MPC'],
      },
    ],
  },
  Medical: {
    mandatory: [
      {
        name: 'NEET UG',
        note: 'Core national gateway for MBBS, BDS, and most medical counselling.',
        streams: ['BiPC'],
      },
    ],
    optional: [
      {
        name: 'CUET',
        note: 'Useful when biotech, life sciences, or allied health also sounds exciting.',
        streams: ['BiPC'],
      },
    ],
  },
  'Arts & Humanities': {
    mandatory: [
      {
        name: 'CUET',
        note: 'Fastest common route for many public humanities and social-science programs.',
        streams: ['Arts', 'Commerce', 'MPC', 'BiPC'],
      },
    ],
    optional: [
      {
        name: 'University-specific aptitude rounds',
        note: 'Helpful for liberal-arts or interview-heavy campuses.',
        streams: ['Arts', 'Commerce', 'MPC', 'BiPC'],
      },
    ],
  },
  'Commerce & Management': {
    mandatory: [
      {
        name: 'CUET',
        note: 'Strong default route for commerce programs at public universities.',
        streams: ['Commerce', 'Arts', 'MPC'],
      },
    ],
    optional: [
      {
        name: 'IPMAT',
        note: 'Worth it for integrated management tracks like IIM Indore.',
        streams: ['Commerce', 'Arts', 'MPC'],
      },
      {
        name: 'NPAT and private BBA tests',
        note: 'Useful when city campuses and management-heavy programs matter.',
        streams: ['Commerce', 'Arts', 'MPC'],
      },
      {
        name: 'CA Foundation',
        note: 'Add if accounting, audit, or structured finance still feels right.',
        streams: ['Commerce'],
      },
    ],
  },
  Law: {
    mandatory: [
      {
        name: 'CLAT',
        note: 'National anchor for serious NLU shortlists.',
        streams: ['Arts', 'Commerce', 'MPC'],
      },
    ],
    optional: [
      {
        name: 'AILET',
        note: 'Useful when Delhi-based law options matter.',
        streams: ['Arts', 'Commerce', 'MPC'],
      },
      {
        name: 'SLAT and MH CET Law',
        note: 'Good private or Maharashtra-heavy backup layer.',
        streams: ['Arts', 'Commerce', 'MPC'],
      },
    ],
  },
  Design: {
    mandatory: [
      {
        name: 'NID DAT or UCEED',
        note: 'Best default pair for product, visual, and industrial design routes.',
        streams: ['Arts', 'Commerce', 'MPC'],
      },
    ],
    optional: [
      {
        name: 'NIFT Entrance',
        note: 'Add if fashion, communication, or lifestyle design interests you.',
        streams: ['Arts', 'Commerce', 'MPC'],
      },
      {
        name: 'NATA',
        note: 'Helpful when architecture or spatial design is part of the mix.',
        streams: ['Arts', 'Commerce', 'MPC'],
      },
    ],
  },
};

const subjectDetours = [
  {
    id: 'quant-finance',
    title: 'Quant finance / actuarial paths',
    copy: 'Math with economics or accountancy is a strong signal for analytics-heavy finance paths.',
    subjects: ['Math', 'Economics', 'Accountancy'] as Subject[],
    streams: ['MPC', 'Commerce'] as Stream[],
    examples: ['SRCC', 'IIM Indore', 'NMIMS Mumbai'],
  },
  {
    id: 'ux-product',
    title: 'UX, product, and human-computer design',
    copy: 'Computer science with design or psychology often points to product thinking, not just coding.',
    subjects: ['Computer Science', 'Design', 'Psychology'] as Subject[],
    streams: ['MPC', 'Arts', 'Commerce'] as Stream[],
    examples: ['IIT Delhi', 'NID Ahmedabad', 'CEPT University'],
  },
  {
    id: 'public-policy',
    title: 'Public policy and legal strategy',
    copy: 'Political science, literature, and economics together can lead to law, policy, and governance tracks.',
    subjects: ['Political Science', 'Literature', 'Economics'] as Subject[],
    streams: ['Arts', 'Commerce'] as Stream[],
    examples: ['NLSIU Bengaluru', 'NALSAR', 'Ashoka University'],
  },
  {
    id: 'cognitive-science',
    title: 'Cognitive science / behavioural pathways',
    copy: 'Biology with psychology opens richer routes than only medicine.',
    subjects: ['Biology', 'Psychology', 'Chemistry'] as Subject[],
    streams: ['BiPC', 'Arts'] as Stream[],
    examples: ['AIIMS Delhi', 'University of Hyderabad', 'Lady Shri Ram College'],
  },
  {
    id: 'spatial-design',
    title: 'Architecture and spatial systems',
    copy: 'Math with design or fine arts is a good signal for architecture, urbanism, and spatial strategy.',
    subjects: ['Math', 'Design', 'Fine Arts'] as Subject[],
    streams: ['MPC', 'Arts'] as Stream[],
    examples: ['CEPT University', 'NID Ahmedabad', 'IIT Roorkee'],
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function toggleValue<T>(values: T[], nextValue: T) {
  return values.includes(nextValue)
    ? values.filter((value) => value !== nextValue)
    : [...values, nextValue];
}

function formatLakhs(value: number) {
  if (!Number.isFinite(value)) {
    return '0.0 L';
  }

  return `${value.toFixed(value >= 10 ? 1 : 2)} L`;
}





function getAverageMarks(profile: StudentProfile) {
  return (profile.marks10 + profile.marks11 + profile.marks12) / 3;
}

function getRankedCollege(college: College, profile: StudentProfile): RankedCollege {
  const averageMarks = getAverageMarks(profile);
  const point = { x: college.lng, y: college.lat };
  const roiScore = Number((college.avgPackageLpa / Math.max(college.annualFeeLpa, 0.2)).toFixed(1));
  const goalMatches = profile.goals.filter((goal) => college.categories.includes(goal));
  const subjectMatches = profile.favoriteSubjects.filter((subject) => college.subjects.includes(subject));
  const streamMatch = college.streams.includes(profile.stream);
  const academicDelta = averageMarks - college.boardComfort;

  let matchScore = 34;
  matchScore += streamMatch ? 20 : -12;
  matchScore += goalMatches.length * 13;
  matchScore += subjectMatches.length * 5;
  matchScore += clamp(Math.round(academicDelta * 1.4), -18, 18);
  matchScore += clamp(Math.round(roiScore), 0, 12);

  if (college.tier === 'Tier 1') {
    matchScore += 5;
  }

  if (college.ownership === 'Government') {
    matchScore += 2;
  }

  const reasons = [
    streamMatch
      ? `${profile.stream} stream aligns cleanly here`
      : `This is a more unconventional path from ${profile.stream}`,
    goalMatches.length > 0
      ? `Matches ${goalMatches.join(' + ')} goals`
      : 'More exploratory than goal-perfect right now',
    subjectMatches.length > 0
      ? `Likes ${subjectMatches.slice(0, 3).join(', ')}`
      : 'Subject overlap is lighter, so treat as a curiosity tile',
  ];

  let fitLabel: RankedCollege['fitLabel'] = 'Balanced';
  if (academicDelta >= 4) {
    fitLabel = 'Confident';
  } else if (academicDelta <= -4) {
    fitLabel = 'Stretch';
  }

  return {
    college,
    point,
    roiScore,
    matchScore: clamp(Math.round(matchScore), 18, 98),
    fitLabel,
    reasons,
  };
}

function buildExamPlan(profile: StudentProfile) {
  const mandatory = new Map<string, string>();
  const optional = new Map<string, string>();

  profile.goals.forEach((goal) => {
    goalRules[goal].mandatory.forEach((exam) => {
      if (exam.streams.includes(profile.stream)) {
        mandatory.set(exam.name, exam.note);
      }
    });

    goalRules[goal].optional.forEach((exam) => {
      if (exam.streams.includes(profile.stream) && !mandatory.has(exam.name)) {
        optional.set(exam.name, exam.note);
      }
    });
  });

  return {
    mandatory: [...mandatory.entries()].map(([name, note]) => ({ name, note })),
    optional: [...optional.entries()].map(([name, note]) => ({ name, note })),
  };
}

function MarksInput({
  profile,
  setProfile,
}: {
  profile: StudentProfile;
  setProfile: Dispatch<SetStateAction<StudentProfile>>;
}) {
  const [draft10, setDraft10] = useState(String(profile.marks10));
  const [draft11, setDraft11] = useState(String(profile.marks11));
  const [draft12, setDraft12] = useState(String(profile.marks12));

  // Sync drafts when profile changes externally (e.g. stream switch)
  useEffect(() => { setDraft10(String(profile.marks10)); }, [profile.marks10]);
  useEffect(() => { setDraft11(String(profile.marks11)); }, [profile.marks11]);
  useEffect(() => { setDraft12(String(profile.marks12)); }, [profile.marks12]);

  function commitValue(field: 'marks10' | 'marks11' | 'marks12', raw: string) {
    const num = Number(raw);
    const clamped = Number.isFinite(num) ? clamp(Math.round(num), 0, 100) : 0;
    setProfile((cur) => ({ ...cur, [field]: clamped }));
    if (field === 'marks10') setDraft10(String(clamped));
    if (field === 'marks11') setDraft11(String(clamped));
    if (field === 'marks12') setDraft12(String(clamped));
  }

  const fields: Array<{ label: string; field: 'marks10' | 'marks11' | 'marks12'; value: string; set: (v: string) => void }> = [
    { label: '10th %', field: 'marks10', value: draft10, set: setDraft10 },
    { label: '11th %', field: 'marks11', value: draft11, set: setDraft11 },
    { label: '12th %', field: 'marks12', value: draft12, set: setDraft12 },
  ];

  return (
    <div className="marks-grid">
      {fields.map(({ label, field, value, set }) => (
        <label key={field}>
          {label}
          <input
            type="text"
            inputMode="numeric"
            placeholder="0–100"
            value={value}
            onChange={(e) => set(e.target.value.replace(/[^0-9.]/g, ''))}
            onBlur={() => commitValue(field, value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitValue(field, value);
            }}
          />
        </label>
      ))}
    </div>
  );
}

function App() {
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [search, setSearch] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('match');
  const [viewState, setViewState] = useState({ longitude: 78.9629, latitude: 20.5937, zoom: 3.5 });
  const [mapBounds, setMapBounds] = useState<{left: number, right: number, top: number, bottom: number} | null>(null);
  const [profile, setProfile] = useState<StudentProfile>({
    stream: 'MPC',
    marks10: 90,
    marks11: 88,
    marks12: 91,
    goals: defaultGoalsByStream.MPC,
    favoriteSubjects: defaultSubjectsByStream.MPC,
  });
  const [activeCategories, setActiveCategories] = useState<CollegeCategory[]>(categoryOptions);
  const [activeTiers, setActiveTiers] = useState<Tier[]>(tierOptions);
  const [activeOwnerships, setActiveOwnerships] = useState<Ownership[]>(ownershipOptions);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const mapRef = useRef<any>(null);
  const deferredSearch = useDeferredValue(search);

  function toggleCompare(id: string) {
    setCompareIds((cur) => cur.includes(id) ? cur.filter((c) => c !== id) : cur.length < 6 ? [...cur, id] : cur);
  }
  function removeCompare(id: string) {
    setCompareIds((cur) => cur.filter((c) => c !== id));
  }

  const handleMapMove = useCallback((evt: any) => {
    setViewState(evt.viewState);
    const map = mapRef.current?.getMap();
    if (map) {
      const bounds = map.getBounds();
      setMapBounds({
        left: bounds.getWest(),
        right: bounds.getEast(),
        top: bounds.getNorth(),
        bottom: bounds.getSouth()
      });
    }
  }, []);

  const handleMapLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (map) {
      map.setProjection({ type: 'globe' });
      const bounds = map.getBounds();
      setMapBounds({
        left: bounds.getWest(),
        right: bounds.getEast(),
        top: bounds.getNorth(),
        bottom: bounds.getSouth()
      });
    }
  }, []);


  

  const rankedColleges = colleges
    .filter((college) => activeCategories.some((category) => college.categories.includes(category)))
    .filter((college) => activeTiers.includes(college.tier))
    .filter((college) => activeOwnerships.includes(college.ownership))
    .filter((college) => {
      const query = deferredSearch.trim().toLowerCase();
      if (!query) {
        return true;
      }

      return [college.name, college.city, college.state, ...college.programs]
        .join(' ')
        .toLowerCase()
        .includes(query);
    })
    .map((college) => getRankedCollege(college, profile))
    .sort((left, right) => {
      if (sortMode === 'roi') {
        return right.roiScore - left.roiScore;
      }

      if (sortMode === 'fees') {
        return left.college.annualFeeLpa - right.college.annualFeeLpa;
      }

      if (sortMode === 'package') {
        return right.college.avgPackageLpa - left.college.avgPackageLpa;
      }

      return right.matchScore - left.matchScore;
    });

  const visibleColleges = rankedColleges.filter((item) => {
    if (!mapBounds) return true;
    return item.college.lng >= mapBounds.left && item.college.lng <= mapBounds.right &&
           item.college.lat >= mapBounds.bottom && item.college.lat <= mapBounds.top;
  });
  const deferredVisibleColleges = useDeferredValue(visibleColleges);
  const topMatches = rankedColleges.slice(0, 5);
  const examPlan = buildExamPlan(profile);
  const averageVisibleFee =
    deferredVisibleColleges.reduce((sum, item) => sum + item.college.annualFeeLpa, 0) /
    Math.max(deferredVisibleColleges.length, 1);
  const averageVisiblePackage =
    deferredVisibleColleges.reduce((sum, item) => sum + item.college.avgPackageLpa, 0) /
    Math.max(deferredVisibleColleges.length, 1);
  const activeDetours = subjectDetours
    .filter((detour) => detour.streams.includes(profile.stream))
    .map((detour) => ({
      ...detour,
      score: detour.subjects.filter((subject) => profile.favoriteSubjects.includes(subject)).length,
    }))
    .filter((detour) => detour.score >= 2)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);

  function focusViewport(longitude: number, latitude: number, zoom: number) {
    setViewState({ longitude, latitude, zoom });
  }

  function focusCollege(college: College) {
    setSelectedCollege(college);
    focusViewport(college.lng, college.lat, Math.max(viewState.zoom, 5));
  }

  

  const selectedRankedCollege =
    (selectedCollege && rankedColleges.find((item) => item.college.id === selectedCollege.id)) || null;

  const clusterBadges = rankedColleges
    .reduce<Array<{ cluster: string; x: number; y: number; count: number }>>((groups, item) => {
      const existing = groups.find((group) => group.cluster === item.college.cluster);
      if (existing) {
        existing.count += 1;
        existing.x += item.point.x;
        existing.y += item.point.y;
        return groups;
      }

      groups.push({
        cluster: item.college.cluster,
        x: item.point.x,
        y: item.point.y,
        count: 1,
      });
      return groups;
    }, [])
    .filter((group) => group.count > 1 && viewState.zoom < 4.5);

  return (
    <main className="shell">
      <HeroSection
        visibleCount={deferredVisibleColleges.length}
        averageVisibleFee={averageVisibleFee}
        averageVisiblePackage={averageVisiblePackage}
      />
      <div className="workspace-grid">
        <DiscoverySection
          search={search}
          onSearchChange={setSearch}
          sortMode={sortMode}
          onSortModeChange={setSortMode}
          activeCategories={activeCategories}
          onToggleCategory={setActiveCategories}
          clusterJumpTargets={clusterJumpTargets}
          focusViewport={focusViewport}
          viewState={viewState}
          handleMapMove={handleMapMove}
          handleMapLoad={handleMapLoad}
          mapRef={mapRef}
          clusterBadges={clusterBadges}
          rankedColleges={rankedColleges}
          selectedCollege={selectedRankedCollege?.college ?? null}
          focusCollege={focusCollege}
          selectedRankedCollege={selectedRankedCollege}
          visibleColleges={deferredVisibleColleges}
          compareIds={compareIds}
          toggleCompare={toggleCompare}
        />
        <LogicSection
          profile={profile}
          setProfile={setProfile}
          activeTiers={activeTiers}
          setActiveTiers={setActiveTiers}
          activeOwnerships={activeOwnerships}
          setActiveOwnerships={setActiveOwnerships}
          averageVisibleFee={averageVisibleFee}
          averageVisiblePackage={averageVisiblePackage}
          rankedColleges={rankedColleges}
          examPlan={examPlan}
          topMatches={topMatches}
          focusCollege={focusCollege}
          activeDetours={activeDetours}
        />
      </div>

      {/* Floating compare bar */}
      {compareIds.length > 0 && !showCompare && (
        <div className="compare-bar">
          <div className="compare-bar-chips">
            <GitCompareArrows size={18} />
            {compareIds.map((id) => {
              const rc = rankedColleges.find((r) => r.college.id === id);
              return rc ? (
                <span key={id} className="compare-bar-chip">
                  {rc.college.name}
                  <button type="button" onClick={() => removeCompare(id)}><X size={12} /></button>
                </span>
              ) : null;
            })}
          </div>
          <button
            type="button"
            className="compare-bar-btn"
            disabled={compareIds.length < 2}
            onClick={() => setShowCompare(true)}
          >
            Compare {compareIds.length} colleges
          </button>
        </div>
      )}

      {/* Compare modal */}
      {showCompare && (
        <ComparePanel
          items={compareIds
            .map((id) => rankedColleges.find((r) => r.college.id === id)!)
            .filter(Boolean)}
          onRemove={(id) => {
            removeCompare(id);
            if (compareIds.length <= 2) setShowCompare(false);
          }}
          onClose={() => setShowCompare(false)}
        />
      )}
    </main>
  );
}

function HeroSection({
  visibleCount,
  averageVisibleFee,
  averageVisiblePackage,
}: {
  visibleCount: number;
  averageVisibleFee: number;
  averageVisiblePackage: number;
}) {
  return (
    <section className="hero-card surface-card">
      <div>
        <p className="eyebrow">India-first college explorer</p>
        <h1>Interactive discovery map with filters that feel less overwhelming</h1>
        <p className="hero-copy">
          This phase stays strictly inside India. You can pan across the country, jump into city clusters,
          sync the shortlist to whatever is on screen, and layer stream, marks, exams, ROI, and
          subject-love logic on top.
        </p>
      </div>

      <div className="hero-metrics">
        <div className="metric-chip">
          <MapIcon size={18} />
          <span>{visibleCount} colleges in frame</span>
        </div>
        <div className="metric-chip">
          <TrendingUp size={18} />
          <span>{formatLakhs(averageVisiblePackage)} avg package</span>
        </div>
        <div className="metric-chip">
          <BriefcaseBusiness size={18} />
          <span>{formatLakhs(averageVisibleFee)} avg fee</span>
        </div>
      </div>
    </section>
  );
}

interface DiscoverySectionProps {
  search: string;
  onSearchChange: Dispatch<SetStateAction<string>>;
  sortMode: SortMode;
  onSortModeChange: Dispatch<SetStateAction<SortMode>>;
  activeCategories: CollegeCategory[];
  onToggleCategory: Dispatch<SetStateAction<CollegeCategory[]>>;
  clusterJumpTargets: Array<{ label: string; longitude: number; latitude: number; zoom: number }>;
  focusViewport: (longitude: number, latitude: number, zoom: number) => void;
  viewState: any;
  handleMapMove: (evt: any) => void;
  handleMapLoad: () => void;
  mapRef: any;
  clusterBadges: Array<{ cluster: string; x: number; y: number; count: number }>;
  rankedColleges: RankedCollege[];
  selectedCollege: College | null;
  focusCollege: (college: College) => void;
  selectedRankedCollege: RankedCollege | null;
  visibleColleges: RankedCollege[];
  compareIds: string[];
  toggleCompare: (id: string) => void;
}

interface LogicSectionProps {
  profile: StudentProfile;
  setProfile: Dispatch<SetStateAction<StudentProfile>>;
  activeTiers: Tier[];
  setActiveTiers: Dispatch<SetStateAction<Tier[]>>;
  activeOwnerships: Ownership[];
  setActiveOwnerships: Dispatch<SetStateAction<Ownership[]>>;
  averageVisibleFee: number;
  averageVisiblePackage: number;
  rankedColleges: RankedCollege[];
  examPlan: {
    mandatory: Array<{ name: string; note: string }>;
    optional: Array<{ name: string; note: string }>;
  };
  topMatches: RankedCollege[];
  focusCollege: (college: College) => void;
  activeDetours: Array<{
    id: string;
    title: string;
    copy: string;
    examples: string[];
    score: number;
  }>;
}

function DiscoverySection({
  search,
  onSearchChange,
  sortMode,
  onSortModeChange,
  activeCategories,
  onToggleCategory,
  clusterJumpTargets,
  focusViewport,
  viewState,
  handleMapMove,
  handleMapLoad,
  mapRef,
  clusterBadges,
  rankedColleges,
  selectedCollege,
  focusCollege,
  selectedRankedCollege,
  visibleColleges,
  compareIds,
  toggleCompare,
}: DiscoverySectionProps) {
  return (
    <section className="discovery-column">
      <div className="surface-card panel-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Stage 1</p>
            <h2>India discovery surface</h2>
          </div>
          <div className="section-note">
            <Compass size={16} />
            <span>Drag to pan, scroll to zoom, and the list below updates automatically.</span>
          </div>
        </div>

        <div className="toolbar-row">
          <label className="search-field">
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by college, city, state, or program"
            />
          </label>

          <label className="sort-select">
            <Filter size={16} />
            <select value={sortMode} onChange={(event) => onSortModeChange(event.target.value as SortMode)}>
              <option value="match">Sort by match</option>
              <option value="roi">Sort by ROI</option>
              <option value="fees">Sort by lower fee</option>
              <option value="package">Sort by package</option>
            </select>
          </label>
        </div>

        <div className="chip-row">
          {categoryOptions.map((category) => {
            const active = activeCategories.includes(category);
            return (
              <button
                key={category}
                type="button"
                className={`filter-chip ${active ? 'active' : ''}`}
                style={{ '--chip-accent': categoryColors[category] } as CSSProperties}
                onClick={() =>
                  onToggleCategory((current) => {
                    const next = toggleValue(current, category);
                    return next.length > 0 ? next : current;
                  })
                }
              >
                <span className="chip-dot" />
                {category}
              </button>
            );
          })}
        </div>

        <div className="chip-row cluster-row">
          {clusterJumpTargets.map((cluster) => (
            <button
              key={cluster.label}
              type="button"
              className="cluster-chip"
              onClick={() => focusViewport(cluster.longitude, cluster.latitude, cluster.zoom)}
            >
              {cluster.label}
            </button>
          ))}
        </div>

        <div className="map-viewport">
          <MapGL
            ref={mapRef}
            {...viewState}
            onMove={handleMapMove}
            onLoad={handleMapLoad}
            mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            attributionControl={false}
          >
            {rankedColleges.map((item) => {
              const selected = item.college.id === selectedCollege?.id;
              return (
                <Marker
                  key={item.college.id}
                  longitude={item.college.lng}
                  latitude={item.college.lat}
                  anchor="center"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    focusCollege(item.college);
                  }}
                >
                  <button
                    type="button"
                    className={`map-pin ${selected ? 'selected' : ''}`}
                  >
                    <span className="pin-core">📍</span>
                    {viewState.zoom > 5 || selected ? (
                      <span className="pin-label">
                        {item.college.name}
                        <small>{item.college.city}</small>
                      </span>
                    ) : null}
                  </button>
                </Marker>
              );
            })}
          </MapGL>

          <div className="map-controls">
            <button
              type="button"
              onClick={() => focusViewport(viewState.longitude, viewState.latitude, viewState.zoom + 0.5)}
            >
              <ZoomIn size={16} />
            </button>
            <button
              type="button"
              onClick={() => focusViewport(viewState.longitude, viewState.latitude, viewState.zoom - 0.5)}
            >
              <ZoomOut size={16} />
            </button>
            <button type="button" onClick={() => focusViewport(78.9629, 20.5937, 3.5)}>
              Reset
            </button>
          </div>

          <div className="legend-card">
            {categoryOptions.map((category) => (
              <div key={category} className="legend-item">
                <span className="legend-swatch" style={{ background: categoryColors[category] }} />
                {category}
              </div>
            ))}
          </div>

          {selectedRankedCollege ? (
            <div className="selected-card">
              <p className="eyebrow">{selectedRankedCollege.college.primaryCategory}</p>
              <h3>{selectedRankedCollege.college.name}</h3>
              <p className="selected-copy">{selectedRankedCollege.college.vibe}</p>

              <div className="selected-metrics">
                <span>{selectedRankedCollege.matchScore}% match</span>
                <span>{selectedRankedCollege.fitLabel}</span>
                <span>{selectedRankedCollege.roiScore.toFixed(1)}x ROI</span>
              </div>

              <div className="selected-programs">
                {selectedRankedCollege.college.programs.slice(0, 3).map((program) => (
                  <span key={program}>{program}</span>
                ))}
              </div>

              {selectedRankedCollege.college.website && (
                <a
                  href={selectedRankedCollege.college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="college-website-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} />
                  Visit official website
                </a>
              )}
            </div>
          ) : (
            <div className="selected-card muted">
              <p className="eyebrow">Prototype note</p>
              <h3>India-only discovery for phase one</h3>
              <p className="selected-copy">
                The UX is ready for a future global mode, but the current data and filters are locked to
                Indian colleges only. Fee and placement values are demo guidance numbers for the concept
                build.
              </p>
            </div>
          )}
        </div>

        <div className="list-block">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Dual view</p>
              <h3>Colleges inside the current frame</h3>
            </div>
            <span className="section-note">
              <ArrowUpRight size={14} />
              {visibleColleges.length} visible
            </span>
          </div>

          <div className="college-list">
            {visibleColleges.length > 0 ? (
              visibleColleges.map((item) => (
                <div
                  key={item.college.id}
                  className={`college-row ${selectedCollege?.id === item.college.id ? 'active' : ''}`}
                  onClick={() => focusCollege(item.college)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="row-main">
                    <div>
                      <div className="row-title">
                        <span
                          className="legend-swatch"
                          style={{ background: categoryColors[item.college.primaryCategory] }}
                        />
                        <strong>{item.college.name}</strong>
                      </div>
                      <p>
                        {item.college.city}, {item.college.state}
                      </p>
                    </div>

                    <div className="row-badges">
                      <span>{item.college.tier}</span>
                      <span>{item.college.ownership}</span>
                    </div>
                  </div>

                  <div className="row-meta">
                    <span>{item.matchScore}% match</span>
                    <span>{formatLakhs(item.college.annualFeeLpa)} fee</span>
                    <span>{formatLakhs(item.college.avgPackageLpa)} package</span>
                  </div>

                  <div className="row-actions">
                    {item.college.website && (
                      <a
                        href={item.college.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="college-website-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} />
                        Visit website
                      </a>
                    )}
                    <button
                      type="button"
                      className={`compare-toggle-btn ${compareIds.includes(item.college.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompare(item.college.id);
                      }}
                    >
                      <GitCompareArrows size={14} />
                      {compareIds.includes(item.college.id) ? 'Added' : 'Compare'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No colleges are visible in this frame.</p>
                <span>Pan back out a little or loosen one of the category, tier, or ownership filters.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogicSection({
  profile,
  setProfile,
  activeTiers,
  setActiveTiers,
  activeOwnerships,
  setActiveOwnerships,
  averageVisibleFee,
  averageVisiblePackage,
  rankedColleges,
  examPlan,
  topMatches,
  focusCollege,
  activeDetours,
}: LogicSectionProps) {
  return (
    <aside className="logic-column">
      <div className="surface-card panel-card">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Stage 2</p>
            <h2>Profile builder</h2>
          </div>
          <div className="section-note">
            <Target size={16} />
            <span>Stream, marks, goals, and subject love</span>
          </div>
        </div>

        <div className="toggle-grid">
          {streamOptions.map((stream) => (
            <button
              key={stream}
              type="button"
              className={`toggle-tile ${profile.stream === stream ? 'active' : ''}`}
              onClick={() =>
                setProfile({
                  stream,
                  marks10: profile.marks10,
                  marks11: profile.marks11,
                  marks12: profile.marks12,
                  goals: defaultGoalsByStream[stream],
                  favoriteSubjects: defaultSubjectsByStream[stream],
                })
              }
            >
              {stream}
            </button>
          ))}
        </div>

        <MarksInput profile={profile} setProfile={setProfile} />

        <div className="subsection">
          <div className="subsection-title">
            <Sparkles size={16} />
            Goal tracks
          </div>
          <div className="chip-row dense">
            {categoryOptions.map((goal) => (
              <button
                key={goal}
                type="button"
                className={`filter-chip ${profile.goals.includes(goal) ? 'active' : ''}`}
                style={{ '--chip-accent': categoryColors[goal] } as CSSProperties}
                onClick={() =>
                  setProfile((current) => {
                    const next = toggleValue(current.goals, goal);
                    return { ...current, goals: next.length > 0 ? next : current.goals };
                  })
                }
              >
                <span className="chip-dot" />
                {goal}
              </button>
            ))}
          </div>
        </div>

        <div className="subsection">
          <div className="subsection-title">
            <HeartHandshake size={16} />
            Subject love toggles
          </div>
          <div className="chip-row dense">
            {subjectOptions.map((subject) => (
              <button
                key={subject}
                type="button"
                className={`pill-chip ${profile.favoriteSubjects.includes(subject) ? 'active' : ''}`}
                onClick={() =>
                  setProfile((current) => {
                    const next = toggleValue(current.favoriteSubjects, subject);
                    return { ...current, favoriteSubjects: next.length > 0 ? next : current.favoriteSubjects };
                  })
                }
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="surface-card panel-card">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">ROI filter</p>
            <h2>Ownership, tier, and financial calm</h2>
          </div>
          <div className="section-note">
            <BriefcaseBusiness size={16} />
            <span>Hard filters to reduce choice paralysis</span>
          </div>
        </div>

        <div className="subsection">
          <div className="subsection-title">Tier focus</div>
          <div className="chip-row dense">
            {tierOptions.map((tier) => (
              <button
                key={tier}
                type="button"
                className={`pill-chip ${activeTiers.includes(tier) ? 'active' : ''}`}
                onClick={() =>
                  setActiveTiers((current) => {
                    const next = toggleValue(current, tier);
                    return next.length > 0 ? next : current;
                  })
                }
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        <div className="subsection">
          <div className="subsection-title">Ownership</div>
          <div className="chip-row dense">
            {ownershipOptions.map((ownership) => (
              <button
                key={ownership}
                type="button"
                className={`pill-chip ${activeOwnerships.includes(ownership) ? 'active' : ''}`}
                onClick={() =>
                  setActiveOwnerships((current) => {
                    const next = toggleValue(current, ownership);
                    return next.length > 0 ? next : current;
                  })
                }
              >
                {ownership}
              </button>
            ))}
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-panel">
            <span>Visible fee</span>
            <strong>{formatLakhs(averageVisibleFee)}</strong>
          </div>
          <div className="stat-panel">
            <span>Visible package</span>
            <strong>{formatLakhs(averageVisiblePackage)}</strong>
          </div>
          <div className="stat-panel">
            <span>Best ROI</span>
            <strong>{rankedColleges[0] ? `${rankedColleges[0].roiScore.toFixed(1)}x` : '0.0x'}</strong>
          </div>
          <div className="stat-panel">
            <span>Marks average</span>
            <strong>{getAverageMarks(profile).toFixed(1)}%</strong>
          </div>
        </div>
      </div>

      <div className="surface-card panel-card">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Exam mapping</p>
            <h2>Entrance exam radar</h2>
          </div>
          <div className="section-note">
            <BookOpenText size={16} />
            <span>Generated from stream and goal tracks</span>
          </div>
        </div>

        <div className="exam-columns">
          <div>
            <h3>Mandatory</h3>
            <div className="exam-list">
              {examPlan.mandatory.map((exam) => (
                <div key={exam.name} className="exam-card">
                  <strong>{exam.name}</strong>
                  <p>{exam.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3>Optional</h3>
            <div className="exam-list">
              {examPlan.optional.map((exam) => (
                <div key={exam.name} className="exam-card optional">
                  <strong>{exam.name}</strong>
                  <p>{exam.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="surface-card panel-card">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Recommendation engine</p>
            <h2>Best-fit snapshot</h2>
          </div>
          <div className="section-note">
            <Sparkles size={16} />
            <span>Blends fit, goals, subjects, and ROI</span>
          </div>
        </div>

        <div className="match-stack">
          {topMatches.map((item) => (
            <button key={item.college.id} type="button" className="match-card" onClick={() => focusCollege(item.college)}>
              <div className="match-header">
                <div>
                  <p className="eyebrow tiny">{item.college.primaryCategory}</p>
                  <strong>{item.college.name}</strong>
                </div>
                <span>{item.matchScore}%</span>
              </div>
              <p>{item.reasons[0]}</p>
              <div className="row-meta">
                <span>{item.fitLabel}</span>
                <span>{item.roiScore.toFixed(1)}x ROI</span>
                <span>{item.college.city}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="surface-card panel-card">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Passion-based matching</p>
            <h2>Unconventional paths you might like</h2>
          </div>
          <div className="section-note">
            <Microscope size={16} />
            <span>Powered by subject-love toggles</span>
          </div>
        </div>

        {activeDetours.length > 0 ? (
          <div className="detour-stack">
            {activeDetours.map((detour) => (
              <div key={detour.id} className="detour-card">
                <div className="detour-title">
                  {detour.title}
                  <span>{detour.score}/3 signals</span>
                </div>
                <p>{detour.copy}</p>
                <div className="example-row">
                  {detour.examples.map((example) => (
                    <span key={example}>{example}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state compact">
            <p>Pick at least two favorite subjects to unlock detours.</p>
            <span>Combinations like Math + Economics or Biology + Psychology work especially well.</span>
          </div>
        )}
      </div>
    </aside>
  );
}

export default App;
