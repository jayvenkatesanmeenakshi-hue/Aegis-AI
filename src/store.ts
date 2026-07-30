import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Node, Edge } from '@xyflow/react';

// ... (interfaces stay same)
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
  view: 'landing' | 'onboarding' | 'dashboard' | 'app';
  currentPrompt: string;
  subject: string;
  depth: 'ELI5' | 'Student' | 'Deep Dive';
  isLoading: boolean;
  studyData: StudyData | null;
  selectedNodeId: string | null;
  history: any[];
  globalError: string | null;
  
  setUser: (user: UserProfile | null) => void;
  setView: (view: 'landing' | 'onboarding' | 'dashboard' | 'app') => void;
  setPrompt: (prompt: string) => void;
  setSubject: (subject: string) => void;
  addSubject: (subject: string) => void;
  setDepth: (depth: 'ELI5' | 'Student' | 'Deep Dive') => void;
  setStudyData: (data: StudyData | null) => void;
  setLoading: (loading: boolean) => void;
  setSelectedNodeId: (id: string | null) => void;
  setHistory: (history: any[]) => void;
  setGlobalError: (error: string | null) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: {
        uid: 'guest-' + (typeof window !== 'undefined' ? (localStorage.getItem('guest_id') || (() => {
          const id = Math.random().toString(36).substring(7);
          localStorage.setItem('guest_id', id);
          return id;
        })()) : 'server'),
        email: 'guest@aegis.ai',
        displayName: 'Guest Student',
        photoURL: null,
        onboarded: false
      },
      view: 'landing',
      currentPrompt: '',
      subject: '',
      depth: 'Student',
      isLoading: false,
      studyData: null,
      selectedNodeId: null,
      history: [],
      globalError: null,

      setUser: (user) => set({ user }),
      setView: (view) => set({ view }),
      setPrompt: (currentPrompt) => set({ currentPrompt }),
      setSubject: (subject) => set({ subject }),
      addSubject: (subject) => set((state) => ({
        user: state.user ? {
          ...state.user,
          subjects: [...(state.user.subjects || []), subject]
        } : null
      })),
      setDepth: (depth) => set({ depth }),
      setStudyData: (studyData) => set({ studyData }),
      setLoading: (isLoading) => set({ isLoading }),
      setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
      setHistory: (history) => set({ history }),
      setGlobalError: (globalError) => set({ globalError }),
    }),
    {
      name: 'aegis-ai-storage',
      partialize: (state) => ({ 
        user: state.user,
        view: state.view === 'landing' ? 'landing' : state.view,
        history: state.history,
        studyData: state.studyData
      }),
    }
  )
);
