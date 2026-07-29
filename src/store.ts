import { create } from 'zustand';
import { Node, Edge } from '@xyflow/react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  feedback: string;
}

interface StudyData {
  summary: string;
  explanation: string;
  nodes: { id: string; title: string; description: string }[];
  edges: { source: string; target: string; label: string }[];
  quiz: QuizQuestion[];
}

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  school?: string;
  syllabus?: string;
  grade?: number;
  subjects?: string[];
  onboarded?: boolean;
}

interface AppState {
  user: UserProfile | null;
  view: 'landing' | 'onboarding' | 'app';
  currentPrompt: string;
  subject: string;
  depth: 'ELI5' | 'Student' | 'Deep Dive';
  isLoading: boolean;
  studyData: StudyData | null;
  selectedNodeId: string | null;
  history: any[];
  
  setUser: (user: UserProfile | null) => void;
  setView: (view: 'landing' | 'onboarding' | 'app') => void;
  setPrompt: (prompt: string) => void;
  setSubject: (subject: string) => void;
  setDepth: (depth: 'ELI5' | 'Student' | 'Deep Dive') => void;
  setStudyData: (data: StudyData | null) => void;
  setLoading: (loading: boolean) => void;
  setSelectedNodeId: (id: string | null) => void;
  setHistory: (history: any[]) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  view: 'landing',
  currentPrompt: '',
  subject: 'Physics',
  depth: 'Student',
  isLoading: false,
  studyData: null,
  selectedNodeId: null,
  history: [],

  setUser: (user) => set({ user }),
  setView: (view) => set({ view }),
  setPrompt: (currentPrompt) => set({ currentPrompt }),
  setSubject: (subject) => set({ subject }),
  setDepth: (depth) => set({ depth }),
  setStudyData: (studyData) => set({ studyData }),
  setLoading: (isLoading) => set({ isLoading }),
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
  setHistory: (history) => set({ history }),
}));
