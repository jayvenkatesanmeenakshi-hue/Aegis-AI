/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState, 
  MarkerType,
  Edge as FlowEdge,
  Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  Search, 
  Brain, 
  Zap, 
  History, 
  CheckCircle, 
  XCircle,
  Menu,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Network,
  Sparkles,
  ShieldCheck,
  Copy,
  ExternalLink,
  ShieldAlert,
  UserCheck,
  X,
  Info,
  Folder,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { useStore } from './store';

// --- Types & Constants ---

const SPECIAL_SUBJECTS: Record<string, any> = {
  'Physics': { 
    color: 'bg-indigo-500', 
    text: 'text-indigo-600', 
    border: 'border-indigo-200', 
    light: 'bg-indigo-50', 
    icon: <Zap size={14}/>, 
    hex: '#6366F1', 
    lightHex: '#E0E7FF',
    accent: 'indigo'
  },
  'Chemistry': { 
    color: 'bg-rose-500', 
    text: 'text-rose-600', 
    border: 'border-rose-200', 
    light: 'bg-rose-50', 
    icon: <Sparkles size={14}/>, 
    hex: '#F43F5E', 
    lightHex: '#FFE4E6',
    accent: 'rose'
  },
  'Biology': { 
    color: 'bg-emerald-500', 
    text: 'text-emerald-600', 
    border: 'border-emerald-200', 
    light: 'bg-emerald-50', 
    icon: <BookOpen size={14}/>, 
    hex: '#10B981', 
    lightHex: '#D1FAE5',
    accent: 'emerald'
  },
  'English': { 
    color: 'bg-violet-500', 
    text: 'text-violet-600', 
    border: 'border-violet-200', 
    light: 'bg-violet-50', 
    icon: <GraduationCap size={14}/>, 
    hex: '#8B5CF6', 
    lightHex: '#EDE9FE',
    accent: 'violet'
  },
  'Math': { 
    color: 'bg-blue-500', 
    text: 'text-blue-600', 
    border: 'border-blue-200', 
    light: 'bg-blue-50', 
    icon: <Network size={14}/>, 
    hex: '#3B82F6', 
    lightHex: '#DBEAFE',
    accent: 'blue'
  },
  'Mathematics': { 
    color: 'bg-blue-500', 
    text: 'text-blue-600', 
    border: 'border-blue-200', 
    light: 'bg-blue-50', 
    icon: <Network size={14}/>, 
    hex: '#3B82F6', 
    lightHex: '#DBEAFE',
    accent: 'blue'
  },
};

const LandingPage = () => {
  const { user, setView } = useStore();
  
  const handleStart = () => {
    if (user?.onboarded) {
      setView('dashboard');
    } else {
      setView('onboarding');
    }
  };

  const features = [
    {
      icon: <Network className="text-indigo-500" size={24} />,
      title: "Interactive Concept Maps",
      description: "Visualize complex STEM and Literature topics with dynamic, interactive node graphs that adapt to your curiosity."
    },
    {
      icon: <Brain className="text-violet-500" size={24} />,
      title: "Adaptive AI Explanations",
      description: "Choose your depth level: from ELI5 for beginners to Deep Dive for advanced learners. Powered by Gemini."
    },
    {
      icon: <GraduationCap className="text-blue-500" size={24} />,
      title: "Embedded Practice Quizzes",
      description: "Test your knowledge instantly with AI-generated quizzes and receive immediate, helpful feedback on every answer."
    },
    {
      icon: <History className="text-emerald-500" size={24} />,
      title: "Study History & Persistence",
      description: "Your study sessions are saved automatically. Pick up exactly where you left off, anytime, anywhere."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 relative overflow-hidden">
      {/* Background Mist & Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-50 rounded-full blur-[120px] opacity-60"></div>
        
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[15%] w-32 h-32 bg-indigo-100/30 border border-indigo-200/50 rounded-3xl blur-[1px] rotate-12 hidden lg:block"
        ></motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] left-[10%] w-48 h-48 bg-violet-100/20 border border-violet-200/50 rounded-[3rem] blur-[2px] -rotate-6 hidden lg:block"
        ></motion.div>
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 font-bold text-2xl text-indigo-600 tracking-tight">
          <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/20">
            <Zap size={24} className="fill-current" />
          </div>
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Aegis AI</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors hidden md:block">Features</a>
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-white border border-indigo-100 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-sm hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
          >
            {user?.onboarded ? 'Open App' : 'Get Started'}
            <ArrowRight size={18} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-16 pb-32">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-10 max-w-4xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm"
          >
            <Sparkles size={14} />
            The Future of Personalized Learning
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 leading-[0.95]"
          >
            Master complex topics <br />
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 bg-clip-text text-transparent italic">Node by Node.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-2xl font-medium"
          >
            Aegis AI transforms static study notes into interactive concept maps. 
            Visualize relationships, dive deep with AI, and master any subject.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-6 pt-4"
          >
            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={handleStart}
                className="px-10 py-5 bg-indigo-600 text-white font-black text-lg rounded-3xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 flex items-center gap-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {user?.onboarded ? 'Go to Dashboard' : 'Start Studying Free'}
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-3 px-8 py-5 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-3xl text-slate-400 text-sm font-bold shadow-sm">
                <ShieldCheck size={20} className="text-indigo-400" />
                No Login Required
              </div>
            </div>
            
            <div className="flex items-center -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
              <div className="pl-6 text-sm font-bold text-slate-400 uppercase tracking-widest">Joined by 10,000+ students</div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-10 bg-white/70 backdrop-blur-md border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
              <div className="mb-8 p-5 bg-white shadow-inner rounded-3xl w-fit group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-4">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-100 py-12 px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-bold text-slate-400">
            <Zap size={20} />
            <span>Aegis AI Study System</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const OnboardingFlow = () => {
  const { setUser, setView } = useStore();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: '',
    school: '',
    subjects: [] as string[]
  });

  const subjects = ['Physics', 'Chemistry', 'Biology', 'English', 'Math', 'General'];

  const next = () => setStep(step + 1);
  const toggleSubject = (s: string) => {
    setData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(s) 
        ? prev.subjects.filter(x => x !== s) 
        : [...prev.subjects, s]
    }));
  };

  const finish = () => {
    setUser({
      uid: 'guest-' + Math.random().toString(36).substring(7),
      email: 'explorer@example.com',
      displayName: data.name,
      photoURL: null,
      onboarded: true,
      school: data.school,
      subjects: data.subjects
    });
    setView('dashboard');
  };

  const stepContent = [
    {
      title: "What's your name?",
      subtitle: "Let's personalize your Aegis AI experience.",
      input: (
        <input 
          autoFocus
          className="w-full bg-white/50 backdrop-blur-md border-2 border-slate-100 rounded-[2rem] p-6 text-2xl font-black text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 transition-all text-center shadow-sm"
          placeholder="Type your name..."
          value={data.name}
          onChange={e => setData({...data, name: e.target.value})}
          onKeyDown={e => e.key === 'Enter' && data.name && next()}
        />
      ),
      disabled: !data.name
    },
    {
      title: "Where do you study?",
      subtitle: "We'll tailor content to your academic level.",
      input: (
        <input 
          autoFocus
          className="w-full bg-white/50 backdrop-blur-md border-2 border-slate-100 rounded-[2rem] p-6 text-2xl font-black text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 transition-all text-center shadow-sm"
          placeholder="School or University..."
          value={data.school}
          onChange={e => setData({...data, school: e.target.value})}
          onKeyDown={e => e.key === 'Enter' && data.school && next()}
        />
      ),
      disabled: !data.school
    },
    {
      title: "Select your subjects",
      subtitle: "Quick-access for your current curriculum.",
      input: (
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto">
          {subjects.map(s => {
            const special = SPECIAL_SUBJECTS[s];
            const isSelected = data.subjects.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSubject(s)}
                className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 group relative overflow-hidden ${
                  isSelected 
                    ? (special ? `${special.color} text-white border-transparent shadow-xl shadow-${special.accent}-500/30` : 'bg-indigo-600 text-white border-transparent shadow-xl')
                    : 'bg-white/50 backdrop-blur-sm border-slate-100 text-slate-600 hover:border-indigo-200'
                }`}
              >
                {special?.icon ? React.cloneElement(special.icon, { size: 24, className: isSelected ? 'text-white' : special.text }) : <BookOpen size={24} />}
                <span className="text-xs font-black uppercase tracking-widest">{s}</span>
                {isSelected && (
                  <motion.div 
                    layoutId="check"
                    className="absolute top-3 right-3 text-white/50"
                  >
                    <ShieldCheck size={16} />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      ),
      disabled: data.subjects.length === 0
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-8 relative overflow-hidden font-sans selection:bg-indigo-100">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-50 rounded-full blur-[120px] opacity-60"
        ></motion.div>
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -5, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-violet-50 rounded-full blur-[120px] opacity-60"
        ></motion.div>
      </div>

      <motion.div 
        key={step}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        className="w-full max-w-xl text-center space-y-12 relative z-10"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            {[0, 1, 2].map(i => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'w-10 bg-indigo-600' : 'w-4 bg-slate-200'}`}
              />
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {stepContent[step].title}
          </h1>
          <p className="text-lg text-slate-500 font-medium">{stepContent[step].subtitle}</p>
        </div>

        <div className="py-4">
          {stepContent[step].input}
        </div>

        <div className="pt-8">
          <button
            onClick={step === stepContent.length - 1 ? finish : next}
            disabled={stepContent[step].disabled}
            className="px-12 py-5 bg-indigo-600 text-white font-black text-lg rounded-[2rem] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 disabled:opacity-30 disabled:grayscale group flex items-center gap-3 mx-auto"
          >
            {step === stepContent.length - 1 ? 'Finish Setup' : 'Continue'}
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};




const TopBar = () => {
  const { subject, setSubject, depth, setDepth, user, setView, view, history, setStudyData, setPrompt } = useStore();
  const userSubjects = user?.subjects || ['General'];
  const depths = ['ELI5', 'Student', 'Deep Dive'];

  return (
    <header className="h-20 border-b border-slate-100 bg-white/40 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <button 
          onClick={() => setView('dashboard')}
          className="flex items-center gap-3 font-black text-indigo-600 text-lg tracking-tight hover:scale-105 transition-transform"
        >
          <div className="p-1.5 bg-indigo-600 text-white rounded-lg shadow-md">
            <Zap size={18} className="fill-current"/>
          </div>
          <span className="hidden sm:block">Aegis AI</span>
        </button>

        <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

        <nav className="hidden lg:flex items-center gap-2">
          <button 
            onClick={() => setView('dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Dashboard
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden xl:flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          {userSubjects.slice(0, 3).map((s) => {
            const special = SPECIAL_SUBJECTS[s];
            const isActive = subject === s;
            
            return (
              <button
                key={s}
                onClick={() => {
                  if (subject !== s) {
                    setStudyData(null);
                    setPrompt('');
                  }
                  setSubject(s);
                  if (view !== 'app') setView('app');
                }}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  isActive 
                    ? (special ? `${special.color} text-white shadow-lg` : 'bg-indigo-600 text-white shadow-lg')
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
          {depths.map((d) => (
            <button
              key={d}
              onClick={() => setDepth(d as any)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                depth === d 
                  ? 'bg-white text-indigo-600 shadow-md border border-slate-100' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setView('dashboard')}
          className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-100 transition-colors group relative"
        >
          <UserCheck size={20} />
          <div className="absolute top-full right-0 mt-3 w-48 p-3 bg-white border border-slate-100 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">{user?.displayName || 'Student'}</p>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tight">{user?.school || 'University'}</p>
          </div>
        </button>
      </div>
    </header>
  );
};

const QuizCard = ({ quiz, index, special }: { quiz: any, index: number, special?: any }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-6 rounded-[2rem] border-2 bg-white/60 backdrop-blur-md transition-all shadow-sm ${selected !== null ? 'border-slate-200' : 'border-slate-100 hover:border-indigo-100 hover:shadow-md'}`}
    >
      <p className="text-sm font-black text-slate-800 mb-6 leading-relaxed">
        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg ${special ? special.color : 'bg-indigo-600'} text-white text-[10px] mr-3 shadow-md`}>
          {index + 1}
        </span>
        {quiz.question}
      </p>
      <div className="space-y-3">
        {quiz.options.map((opt: string, idx: number) => {
          const isCorrect = idx === quiz.answer;
          const isSelected = selected === idx;
          
          let stateStyles = "border-slate-100 hover:bg-slate-50 text-slate-600";
          if (selected !== null) {
            if (isCorrect) stateStyles = "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm";
            else if (isSelected) stateStyles = "bg-rose-50 border-rose-200 text-rose-700 shadow-sm";
            else stateStyles = "opacity-40 border-slate-50 text-slate-400";
          }

          return (
            <button
              key={idx}
              onClick={() => {
                if (selected === null) {
                  setSelected(idx);
                  setShowExplanation(true);
                }
              }}
              disabled={selected !== null}
              className={`w-full text-left p-4 rounded-2xl text-xs font-bold transition-all border-2 flex items-center justify-between group ${stateStyles}`}
            >
              <span>{opt}</span>
              {selected !== null && isCorrect && <CheckCircle size={16} className="text-emerald-500" />}
              {selected !== null && isSelected && !isCorrect && <XCircle size={16} className="text-rose-500" />}
            </button>
          );
        })}
      </div>
      
      <AnimatePresence>
        {showExplanation && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-6 pt-6 border-t border-slate-100 overflow-hidden"
          >
            <div className={`p-4 rounded-2xl ${selected === quiz.answer ? 'bg-emerald-50/50' : 'bg-rose-50/50'} flex gap-3`}>
              <Info size={16} className={selected === quiz.answer ? 'text-emerald-500' : 'text-rose-500'} />
              <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                <span className="font-black uppercase tracking-widest text-[9px] block mb-1">Feedback</span>
                {quiz.feedback}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const LeftPanel = () => {
  const { currentPrompt, setPrompt, isLoading, setLoading, studyData, setStudyData, subject, depth, user, history, setHistory } = useStore();
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const special = SPECIAL_SUBJECTS[subject];

  const handleStudy = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    setLoading(true);
    setError(null);
    setPrompt(input);
    
    try {
      const res = await fetch('/api/study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, subject: subject || 'General', depth })
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`API Error (${res.status}):`, {
          status: res.status,
          statusText: res.statusText,
          headers: Object.fromEntries(res.headers.entries()),
          body: errorText.substring(0, 500)
        });
        let errorMsg = `Server error: ${res.status}`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMsg = errorJson.error || errorMsg;
        } catch (e) {
          // Not JSON - could be HTML error page
          if (errorText.includes("<title>")) {
            const titleMatch = errorText.match(/<title>(.*?)<\/title>/);
            if (titleMatch) errorMsg = `Server Error: ${titleMatch[1]}`;
          } else if (errorText.length > 0) {
            errorMsg = `Server returned non-JSON: ${errorText.substring(0, 50).trim()}...`;
          }
        }
        throw new Error(errorMsg);
      }

      const data = await res.json();

      setStudyData(data);

      if (user && data && data.nodes) {
        const newSession = {
          id: Math.random().toString(36).substring(7),
          userId: user.uid,
          title: input,
          subject: subject || 'General',
          createdAt: new Date().toISOString(),
          lastPrompt: input,
          nodes: data.nodes || [],
          edges: data.edges || [],
          explanation: data.explanation || '',
          summary: data.summary || '',
          quiz: data.quiz || []
        };
        setHistory([newSession, ...history]);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="w-full flex flex-col h-full bg-white/40 backdrop-blur-md overflow-hidden relative shadow-inner">
      <div className={`p-8 border-b border-slate-100 ${special ? special.light + '/30' : 'bg-slate-50/30'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-xl ${special ? special.color : 'bg-indigo-600'} text-white shadow-lg shadow-indigo-600/10`}>
               {special?.icon || <Zap size={16}/>}
             </div>
             <div className="flex flex-col">
               <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${special ? special.text : 'text-indigo-600'}`}>
                 Current Focus
               </span>
               <span className="text-sm font-black text-slate-900">{subject}</span>
             </div>
          </div>
          {special && (
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={16} className={special.text} />
            </motion.div>
          )}
        </div>
        
        <form onSubmit={handleStudy} className="relative group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Explain...`}
            className={`w-full bg-white/80 border-2 rounded-2xl py-4 pl-5 pr-14 text-slate-800 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-8 focus:ring-indigo-600/5 transition-all shadow-sm ${special ? special.border + ' focus:border-' + special.accent + '-500' : 'border-slate-100 focus:border-indigo-600'}`}
          />
          <button 
            type="submit"
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl text-white transition-all disabled:opacity-50 shadow-lg active:scale-95 ${special ? special.color + ' shadow-' + special.accent + '-500/20' : 'bg-indigo-600 shadow-indigo-600/20'}`}
            disabled={isLoading}
          >
            {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Zap size={20} /></motion.div> : <Search size={20} />}
          </button>
        </form>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-xs font-bold shadow-sm"
          >
            <ShieldAlert size={16} />
            <p>{error}</p>
          </motion.div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
        {!studyData && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-4">
            <div className={`p-6 rounded-[2rem] border-2 border-dashed ${special ? special.border + ' ' + special.light : 'border-slate-100 bg-slate-50/50'}`}>
              <div className="relative">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className={`absolute inset-0 blur-2xl rounded-full ${special ? special.color : 'bg-indigo-400'} opacity-20`}
                ></motion.div>
                {special?.icon ? React.cloneElement(special.icon, { size: 56, className: special.text + " relative" }) : <Brain size={56} className="text-indigo-400 relative" />}
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-800">Launch Your Lab</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                Enter a concept above to generate <br /> 
                <span className="text-indigo-500 italic">interactive knowledge maps.</span>
              </p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="space-y-6">
             <div className="space-y-3">
               <div className={`h-8 rounded-xl animate-pulse w-3/4 ${special ? special.light : 'bg-slate-100'}`}></div>
               <div className={`h-4 rounded-lg animate-pulse w-full ${special ? special.light : 'bg-slate-50'}`}></div>
               <div className={`h-4 rounded-lg animate-pulse w-5/6 ${special ? special.light : 'bg-slate-50'}`}></div>
             </div>
             <div className={`h-64 rounded-3xl animate-pulse w-full ${special ? special.light : 'bg-slate-50'}`}></div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {studyData && !isLoading && (
            <motion.div 
              key={currentPrompt}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">{currentPrompt}</h1>
                <div className={`p-6 rounded-[2rem] border-2 ${special ? special.border + ' ' + special.light : 'border-indigo-100 bg-indigo-50/30'} relative group overflow-hidden`}>
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
                    <Sparkles size={24} className={special?.text || 'text-indigo-500'} />
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm font-medium relative z-10 italic">
                    "{studyData.summary}"
                  </p>
                </div>
              </div>

              <div className={`prose prose-slate prose-sm max-w-none prose-headings:font-black prose-p:font-medium prose-p:leading-relaxed prose-strong:text-indigo-600 ${special ? 'prose-accent-' + special.accent : ''}`}>
                <ReactMarkdown>
                  {studyData.explanation}
                </ReactMarkdown>
              </div>

              <div className="pt-10 border-t border-slate-100 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${special ? special.color : 'bg-indigo-600'} text-white shadow-lg shadow-indigo-600/10`}>
                      <GraduationCap size={18} />
                    </div>
                    <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-900">Knowledge Check</h3>
                  </div>
                  <div className="px-3 py-1 bg-indigo-50 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                    3 Questions
                  </div>
                </div>
                <div className="space-y-4">
                  {studyData.quiz?.map((q, i) => (
                    <QuizCard key={i} quiz={q} index={i} special={special} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const RightPanel = () => {
  const { studyData, setSelectedNodeId, subject } = useStore();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const special = SPECIAL_SUBJECTS[subject];

  useEffect(() => {
    if (studyData) {
      const accentColor = special?.hex || '#0D9488';
      const lightAccent = special?.lightHex || '#99F6E4';

      const newNodes: Node[] = (studyData.nodes || []).map((n, i) => ({
        id: n.id,
        position: { x: 250 + (i % 3) * 200, y: 100 + Math.floor(i / 3) * 150 },
        data: { label: n.title },
        style: { 
          background: 'rgba(255, 255, 255, 0.8)', 
          backdropFilter: 'blur(20px)',
          color: accentColor, 
          border: `2px solid ${lightAccent}`,
          borderRadius: '24px',
          padding: '16px 24px',
          fontSize: '11px',
          fontWeight: '900',
          width: 'auto',
          minWidth: '160px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }
      }));

      const newEdges: FlowEdge[] = (studyData.edges || []).map((e) => ({
        id: `e-${e.source}-${e.target}`,
        source: e.source,
        target: e.target,
        label: e.label,
        type: 'smoothstep',
        animated: true,
        style: { stroke: lightAccent, strokeWidth: 2 },
        labelStyle: { fill: accentColor, fontSize: 10, fontWeight: 500 },
        markerEnd: { type: MarkerType.ArrowClosed, color: lightAccent },
      }));

      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [studyData, subject]);

  const onNodeClick = (_: any, node: Node) => {
    setSelectedNodeId(node.id);
  };

  return (
    <div className={`flex-1 relative ${special ? special.light : 'bg-[#F0FDFA]'}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background color={special ? special.hex + '20' : '#CCFBF1'} gap={20} />
        <Controls />
        <MiniMap 
          style={{ background: '#FFFFFF' }} 
          nodeColor={special ? special.hex + '40' : "#CCFBF1"} 
          maskColor="rgba(240, 253, 250, 0.6)"
        />
      </ReactFlow>
      <div className={`absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md border rounded-xl text-[10px] uppercase tracking-widest pointer-events-none shadow-sm ${special ? special.border + ' ' + special.text : 'border-teal-100 text-teal-600'}`}>
        {subject} Concept Map
      </div>
    </div>
  );
};

export default function App() {
  const { user, view, setView } = useStore();

  useEffect(() => {
    if (view === 'app' || (user?.onboarded && view === 'landing')) {
      setView('dashboard');
    }
  }, []);

  if (view === 'landing') {
    return <LandingPage />;
  }

  if (view === 'onboarding') {
    return <OnboardingFlow />;
  }

  if (view === 'dashboard') {
    return <Dashboard />;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans relative selection:bg-indigo-100">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-50 rounded-full blur-[120px]"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-violet-50 rounded-full blur-[120px]"
        ></motion.div>
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <TopBar />
        <main className="flex flex-1 overflow-hidden">
          <div className="w-[60%] h-full relative">
            <RightPanel />
          </div>
          <div className="w-[40%] h-full overflow-hidden border-l border-slate-200 shadow-2xl">
            <LeftPanel />
          </div>
        </main>
      </div>
    </div>
  );
}

const Dashboard = () => {
  const { user, setView, setSubject, addSubject, history, setStudyData, setPrompt } = useStore();
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');

  const subjects = user?.subjects || [];
  
  const getTopicsForSubject = (s: string) => {
    return history.filter(h => h.subject === s);
  };

  const handleOpenTopic = (topic: any) => {
    setStudyData({
      summary: topic.summary,
      explanation: topic.explanation,
      nodes: topic.nodes,
      edges: topic.edges,
      quiz: topic.quiz
    });
    setPrompt(topic.lastPrompt);
    setSubject(topic.subject);
    setView('app');
  };

  const handleAddSubject = () => {
    if (newSubjectName.trim()) {
      addSubject(newSubjectName.trim());
      setNewSubjectName('');
      setIsAddingSubject(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans relative selection:bg-indigo-100">
      <TopBar />
      <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <header className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Study Lab</h1>
              <p className="text-slate-500 font-medium">Welcome back, {user?.displayName || 'Explorer'}. Choose a subject to continue.</p>
            </div>
            <button 
              onClick={() => setIsAddingSubject(true)}
              className="px-6 py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2"
            >
              <BookOpen size={18} />
              Add Subject
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subjects.map(s => {
              const special = SPECIAL_SUBJECTS[s];
              const topics = getTopicsForSubject(s);
              const isOpen = activeFolder === s;

              return (
                <div key={s} className="contents">
                  <motion.div 
                    layout
                    onClick={() => setActiveFolder(isOpen ? null : s)}
                    className={`p-6 rounded-[2.5rem] border-2 cursor-pointer transition-all group relative overflow-hidden h-fit ${
                      isOpen 
                        ? (special ? `${special.color} border-transparent text-white shadow-2xl shadow-${special.accent}-500/30` : 'bg-indigo-600 border-transparent text-white shadow-2xl')
                        : 'bg-white border-slate-100 hover:border-indigo-100 hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-2xl shadow-inner ${isOpen ? 'bg-white/20' : (special ? special.light : 'bg-slate-50')}`}>
                        {special?.icon ? React.cloneElement(special.icon, { size: 24, className: isOpen ? 'text-white' : special.text }) : <BookOpen size={24} className="text-slate-400" />}
                      </div>
                      <div>
                        <h3 className="font-black text-sm uppercase tracking-widest">{s}</h3>
                        <p className={`text-[10px] font-bold uppercase tracking-tight opacity-60`}>
                          {topics.length} {topics.length === 1 ? 'Topic' : 'Topics'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-80 mt-8">
                      <span>Folder</span>
                      <ArrowRight size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-8 bg-slate-100/50 rounded-[3rem] border-2 border-white mb-8"
                      >
                        {topics.map(topic => (
                          <button
                            key={topic.id}
                            onClick={() => handleOpenTopic(topic)}
                            className="p-5 bg-white border border-slate-100 rounded-[2rem] text-left hover:shadow-xl hover:border-indigo-200 transition-all group flex flex-col gap-4"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-xl ${special ? special.light : 'bg-slate-50'} text-indigo-400`}>
                                <Brain size={16} />
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Topic</span>
                            </div>
                            <h4 className="font-black text-slate-800 text-sm leading-tight line-clamp-2">{topic.title}</h4>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-[10px] font-bold text-slate-400">{new Date(topic.createdAt).toLocaleDateString()}</span>
                              <div className="p-1.5 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 text-slate-300 transition-colors">
                                <ArrowRight size={14} />
                              </div>
                            </div>
                          </button>
                        ))}
                        <button 
                          onClick={() => {
                            setSubject(s);
                            setStudyData(null);
                            setPrompt('');
                            setView('app');
                          }}
                          className="p-5 bg-white border-2 border-dashed border-slate-200 rounded-[2rem] text-left hover:border-indigo-300 hover:bg-indigo-50/30 transition-all flex flex-col items-center justify-center gap-3 group"
                        >
                          <div className="p-2 rounded-full bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-indigo-500 transition-all">
                            <Sparkles size={20} />
                          </div>
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-600">New Topic</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isAddingSubject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl space-y-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <BookOpen size={120} />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Add New Subject</h2>
                <p className="text-slate-500 font-medium text-sm">Create a new folder to organize your topics.</p>
              </div>
              <input 
                autoFocus
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-inner"
                placeholder="Subject Name (e.g. World History)"
                value={newSubjectName}
                onChange={e => setNewSubjectName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddSubject()}
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsAddingSubject(false)}
                  className="flex-1 py-4 px-6 border-2 border-slate-100 rounded-2xl text-sm font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddSubject}
                  disabled={!newSubjectName.trim()}
                  className="flex-1 py-4 px-6 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 uppercase tracking-widest disabled:opacity-50"
                >
                  Create
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
