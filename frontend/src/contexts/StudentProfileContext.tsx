/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { UserProfile } from '../types/user';

export type StudentProfile = Omit<UserProfile, 'id' | 'name' | 'email'> & {
  targetCareers: string[];
  trackedExams: string[];
  jeeMainTarget: number | null;
  neetTarget: number | null;
};

const defaultProfile: StudentProfile = {
  academicProfile: {},
  examScores: {},
  preferences: {
    preferredStates: [],
    preferredCities: [],
    goals: [],
    favoriteSubjects: [],
    careerInterests: []
  },
  savedColleges: [],
  pinnedExams: [],
  targetCareers: [],
  trackedExams: [],
  jeeMainTarget: null,
  neetTarget: null,
  customRoadmaps: [],
};

interface StudentProfileContextType {
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  trackExam: (examId: string) => void;
  untrackExam: (examId: string) => void;
  targetCareer: (careerId: string) => void;
  untargetCareer: (careerId: string) => void;
  saveRoadmap: (roadmap: NonNullable<StudentProfile['customRoadmaps']>[0]) => void;
  deleteRoadmap: (roadmapId: string) => void;
}

const StudentProfileContext = createContext<StudentProfileContextType | undefined>(undefined);

export function StudentProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useLocalStorage<StudentProfile>('stuzen_student_profile', defaultProfile);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const trackExam = (examId: string) => {
    setProfile(prev => ({
      ...prev,
      trackedExams: prev.trackedExams.includes(examId) ? prev.trackedExams : [...prev.trackedExams, examId]
    }));
  };

  const untrackExam = (examId: string) => {
    setProfile(prev => ({ ...prev, trackedExams: prev.trackedExams.filter(id => id !== examId) }));
  };

  const targetCareer = (careerId: string) => {
    setProfile(prev => ({
      ...prev,
      targetCareers: prev.targetCareers.includes(careerId) ? prev.targetCareers : [...prev.targetCareers, careerId]
    }));
  };

  const untargetCareer = (careerId: string) => {
    setProfile(prev => ({ ...prev, targetCareers: prev.targetCareers.filter(id => id !== careerId) }));
  };

  const saveRoadmap = (roadmap: NonNullable<StudentProfile['customRoadmaps']>[0]) => {
    setProfile(prev => ({ ...prev, customRoadmaps: [...(prev.customRoadmaps || []), roadmap] }));
  };

  const deleteRoadmap = (roadmapId: string) => {
    setProfile(prev => ({ ...prev, customRoadmaps: (prev.customRoadmaps || []).filter(r => r.id !== roadmapId) }));
  };

  return (
    <StudentProfileContext.Provider value={{ profile, updateProfile, trackExam, untrackExam, targetCareer, untargetCareer, saveRoadmap, deleteRoadmap }}>
      {children}
    </StudentProfileContext.Provider>
  );
}

export function useStudentProfile() {
  const context = useContext(StudentProfileContext);
  if (context === undefined) {
    throw new Error('useStudentProfile must be used within a StudentProfileProvider');
  }
  return context;
}
