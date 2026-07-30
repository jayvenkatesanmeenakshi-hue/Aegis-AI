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
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { useStore } from './store';
import { db } from './lib/firebase';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  Timestamp,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';

// --- Types & Constants ---

const SPECIAL_SUBJECTS: Record<string, any> = {
  'Physics': { color: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200', light: 'bg-blue-50', icon: <Zap size={14}/>, hex: '#3B82F6', lightHex: '#DBEAFE' },
  'Chemistry': { color: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-200', light: 'bg-pink-50', icon: <Sparkles size={14}/>, hex: '#EC4899', lightHex: '#FCE7F3' },
  'Biology': { color: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-200', light: 'bg-emerald-50', icon: <BookOpen size={14}/>, hex: '#10B981', lightHex: '#D1FAE5' },
  'English': { color: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200', light: 'bg-amber-50', icon: <GraduationCap size={14}/>, hex: '#F59E0B', lightHex: '#FEF3C7' },
  'Math': { color: 'bg-indigo-500', text: 'text-indigo-600', border: 'border-indigo-200', light: 'bg-indigo-50', icon: <Network size={14}/>, hex: '#6366F1', lightHex: '#E0E7FF' },
  'Mathematics': { color: 'bg-indigo-500', text: 'text-indigo-600', border: 'border-indigo-200', light: 'bg-indigo-50', icon: <Network size={14}/>, hex: '#6366F1', lightHex: '#E0E7FF' },
};

const LandingPage = () => {
  const { user, setView } = useStore();
  
  const handleStart = () => {
    if (user?.onboarded) {
      setView('app');
    } else {
      setView('onboarding');
    }
  };

  const features = [
    {
      icon: <Network className="text-teal-500" size={24} />,
      title: "Interactive Concept Maps",
      description: "Visualize complex STEM and Literature topics with dynamic, interactive node graphs that adapt to your curiosity."
    },
    {
      icon: <Brain className="text-teal-500" size={24} />,
      title: "Adaptive AI Explanations",
      description: "Choose your depth level: from ELI5 for beginners to Deep Dive for advanced learners. Powered by Gemini."
    },
    {
      icon: <GraduationCap className="text-teal-500" size={24} />,
      title: "Embedded Practice Quizzes",
      description: "Test your knowledge instantly with AI-generated quizzes and receive immediate, helpful feedback on every answer."
    },
    {
      icon: <History className="text-teal-500" size={24} />,
      title: "Study History & Persistence",
      description: "Your study sessions are saved automatically. Pick up exactly where you left off, anytime, anywhere."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-teal-100 relative">
      {/* Background Mist Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl text-teal-600 tracking-tight">
          <Zap size={24} className="fill-current" />
          <span>Aegis AI</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleStart}
            className="px-5 py-2.5 bg-white border border-teal-100 text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            {user?.onboarded ? 'Open App' : 'Get Started'}
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-12 pb-24">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 py-1.5 bg-teal-50 border border-teal-100 rounded-full text-teal-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
          >
            <Sparkles size={14} />
            The Future of Personalized Learning
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]"
          >
            Master complex topics <br />
            <span className="text-teal-500">Node by Node.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl"
          >
            Aegis AI transforms static study notes into interactive 3D concept maps. 
            Visualize relationships, dive deep with AI, and practice until perfect.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-3 pt-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStart}
                className="px-8 py-4 bg-teal-500 text-white font-bold rounded-2xl hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/20 flex items-center gap-2 group"
              >
                {user?.onboarded ? 'Go to Dashboard' : 'Start Studying Free'}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-2 px-6 py-4 text-slate-400 text-sm font-medium">
                <ShieldCheck size={18} className="text-teal-400" />
                No Login Required
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white border border-teal-50 rounded-3xl shadow-sm hover:shadow-xl hover:border-teal-100 transition-all group"
            >
              <div className="mb-6 p-4 bg-teal-50 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Preview Section Placeholder Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 relative rounded-[3rem] overflow-hidden border border-teal-100 shadow-2xl shadow-teal-100/50 bg-white p-4"
        >
          <div className="absolute inset-0 bg-teal-50/10"></div>
          <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 aspect-video flex items-center justify-center text-slate-400 group">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#0D9488_0%,transparent_70%)]"></div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 animate-pulse">
                <Sparkles size={32} />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.2em]">Interactive Dashboard Preview</p>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 border-t border-teal-50 py-12 px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-bold text-slate-400">
            <Zap size={20} />
            <span>Aegis AI Study System</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-teal-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const OnboardingFlow = () => {
  const { user, setUser, setView } = useStore();
  const [step, setStep] = useState(1);
  const [school, setSchool] = useState(user?.school || '');
  const [otherSchool, setOtherSchool] = useState('');
  const [syllabus, setSyllabus] = useState(user?.syllabus || '');
  const [otherSyllabus, setOtherSyllabus] = useState('');
  const [grade, setGrade] = useState(user?.grade || 1);
  const [subjects, setSubjects] = useState<string[]>(user?.subjects || []);
  const [subjectInput, setSubjectInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Initialize step based on what data is already present
  useEffect(() => {
    if (user) {
      if (user.onboarded) setView('app');
      else if (user.subjects && user.subjects.length > 0) setStep(4);
      else if (user.grade) setStep(4);
      else if (user.syllabus) setStep(3);
      else if (user.school) setStep(2);
    }
  }, []);

  // Keep local states in sync with user profile
  useEffect(() => {
    if (user) {
      if (user.school) setSchool(user.school);
      if (user.syllabus) setSyllabus(user.syllabus);
      if (user.grade) setGrade(user.grade);
      if (user.subjects) setSubjects(user.subjects);
    }
  }, [user]);

  const saveProgress = async (data: any, next: boolean = true) => {
    if (!user) return;
    
    // Optimistic local update
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    
    if (data.school) setSchool(data.school);
    if (data.syllabus) setSyllabus(data.syllabus);
    if (data.grade) setGrade(data.grade);
    if (data.subjects) setSubjects(data.subjects);
    
    if (next) setStep((prev) => prev + 1);

    setIsSaving(true);
    try {
      await setDoc(doc(db, 'users', user.uid), data, { merge: true });
    } catch (err) {
      console.warn("Failed to sync progress to cloud, saving locally:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleComplete = async () => {
    if (!user) return;
    const profileData = {
      subjects,
      onboarded: true
    };
    await saveProgress(profileData, false);
    setView('app');
  };

  const addSubject = () => {
    if (subjectInput.trim() && subjects.length < 10) {
      setSubjects([...subjects, subjectInput.trim()]);
      setSubjectInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDFA] flex items-center justify-center p-6 relative">
      <button 
        onClick={() => setView('landing')}
        className="absolute top-6 left-6 text-slate-400 hover:text-teal-600 font-medium text-sm flex items-center gap-2"
      >
        <BookOpen size={16} /> Back to Info
      </button>

      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-teal-100"
      >
        <div className="mb-8">
          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-teal-500"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
          <p className="text-right text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-widest">Step {step} of 4</p>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Which school do you attend?</h2>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => saveProgress({ school: '21kschool' })}
                className={`p-4 border rounded-xl text-left font-medium transition-all ${school === '21kschool' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-teal-100 text-slate-700 hover:bg-teal-50'}`}
              >
                21kschool
              </button>
              <button 
                onClick={() => setSchool('Other')}
                className={`p-4 border rounded-xl text-left font-medium transition-all ${school === 'Other' || (school && school !== '21kschool') ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-teal-100 text-slate-700 hover:bg-teal-50'}`}
              >
                Other
              </button>
            </div>
            {school === 'Other' && (
              <div className="space-y-4">
                <input 
                  autoFocus
                  placeholder="Enter school name"
                  value={otherSchool}
                  onChange={(e) => setOtherSchool(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                />
                <button 
                  disabled={!otherSchool.trim() || isSaving}
                  onClick={() => saveProgress({ school: otherSchool })}
                  className="w-full bg-teal-500 text-white py-3 rounded-xl font-bold disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Continue"}
                </button>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">What's your syllabus?</h2>
            {school === '21kschool' ? (
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => saveProgress({ syllabus: 'British' })}
                  className="p-4 border border-teal-100 rounded-xl hover:bg-teal-50 text-left font-medium text-slate-700 transition-all"
                >
                  British
                </button>
                <button 
                  onClick={() => saveProgress({ syllabus: 'Indian' })}
                  className="p-4 border border-teal-100 rounded-xl hover:bg-teal-50 text-left font-medium text-slate-700 transition-all"
                >
                  Indian
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input 
                  autoFocus
                  placeholder="Enter syllabus (e.g. CBSE, IB)"
                  value={otherSyllabus}
                  onChange={(e) => setOtherSyllabus(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                />
                <button 
                  disabled={!otherSyllabus.trim() || isSaving}
                  onClick={() => saveProgress({ syllabus: otherSyllabus })}
                  className="w-full bg-teal-500 text-white py-3 rounded-xl font-bold disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Continue"}
                </button>
              </div>
            )}
            <button onClick={() => setStep(1)} className="w-full text-slate-400 text-sm font-medium py-2">Go Back</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Select your Grade</h2>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                <button 
                  key={g}
                  onClick={() => saveProgress({ grade: g })}
                  className={`p-3 border rounded-xl font-bold transition-all ${grade === g ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-teal-100 text-slate-700 hover:bg-teal-50'}`}
                >
                  {g}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="w-full text-slate-400 text-sm font-medium py-2">Go Back</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Which subjects do you study?</h2>
            <p className="text-slate-400 text-sm">Add up to 10 subjects</p>
            <div className="flex gap-2">
              <input 
                autoFocus
                placeholder="Physics, History, etc."
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSubject()}
                className="flex-1 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
              />
              <button onClick={addSubject} className="p-3 bg-teal-500 text-white rounded-xl"><CheckCircle size={20}/></button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {subjects.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-teal-50 border border-teal-100 rounded-full text-xs font-medium text-teal-700 flex items-center gap-2">
                  {s}
                  <button onClick={() => setSubjects(subjects.filter((_, idx) => idx !== i))}><XCircle size={12}/></button>
                </span>
              ))}
            </div>
            <button 
              disabled={subjects.length === 0 || isSaving}
              onClick={handleComplete}
              className="w-full bg-teal-500 text-white py-3 rounded-xl font-bold disabled:opacity-50 mt-4 shadow-sm"
            >
              {isSaving ? "Completing..." : "Finish Onboarding"}
            </button>
            <button onClick={() => setStep(3)} className="w-full text-slate-400 text-sm font-medium py-2">Go Back</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const Sidebar = () => {
  const { history, setHistory, setStudyData, setPrompt, setSubject, user, setView } = useStore();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'sessions'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHistory(sessions);
      });
      return () => unsubscribeSnapshot();
    }
  }, [user]);

  const loadSession = (session: any) => {
    setStudyData({
      summary: session.summary,
      explanation: session.explanation,
      nodes: session.nodes,
      edges: session.edges,
      quiz: session.quiz
    });
    setPrompt(session.lastPrompt);
    setSubject(session.subject);
  };

  return (
    <motion.div 
      initial={false}
      animate={{ width: isOpen ? 260 : 64 }}
      className="h-screen bg-[#F8FAFC] border-r border-teal-100 flex flex-col relative overflow-hidden"
    >
      <div className="p-4 flex items-center justify-between border-b border-teal-100">
        {isOpen && <span className="font-bold text-teal-600 flex items-center gap-2"><Zap size={20}/> Aegis AI</span>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-teal-50 rounded-md text-slate-400">
          <Menu size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {isOpen && (
          <>
            <button 
              onClick={() => setView('landing')}
              className="w-full text-left p-2 rounded-lg hover:bg-teal-50 text-slate-600 text-sm flex items-center gap-2 transition-colors group mb-2"
            >
              <BookOpen size={14} className="text-teal-400" />
              <span>App Info & Lander</span>
            </button>

            <div className="px-2 pt-2">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Recent Sessions</h3>
              <div className="space-y-1">
                {history.map((session) => (
                  <button 
                    key={session.id} 
                    onClick={() => loadSession(session)}
                    className="w-full text-left p-2 rounded-lg hover:bg-teal-50 text-slate-600 text-sm flex items-center gap-2 transition-colors group"
                  >
                    <History size={14} className="text-teal-300 group-hover:text-teal-500" />
                    <span className="truncate">{session.title}</span>
                  </button>
                ))}
                {history.length === 0 && <p className="text-xs text-slate-400 px-2">No history yet</p>}
              </div>
            </div>
          </>
        )}
        {!isOpen && (
           <div className="flex flex-col items-center gap-4 py-4">
             <button onClick={() => setView('landing')}><BookOpen size={20} className="text-teal-300" /></button>
             <History size={20} className="text-teal-200" />
           </div>
        )}
      </div>

      {isOpen && (
        <div className="p-4 border-t border-teal-100">
          <div className="text-center">
            <p className="text-[10px] text-slate-400 font-medium tracking-tight">Aegis AI v1.0</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};


const TopBar = () => {
  const { subject, setSubject, depth, setDepth, user } = useStore();
  const userSubjects = user?.subjects || ['General'];
  const depths = ['ELI5', 'Student', 'Deep Dive'];

  return (
    <header className="h-16 border-b border-teal-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar max-w-[70%]">
        <div className="flex items-center gap-2">
          {userSubjects.map((s) => {
            const special = SPECIAL_SUBJECTS[s];
            const isActive = subject === s;
            
            return (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border whitespace-nowrap ${
                  isActive 
                    ? (special ? `${special.color} text-white border-transparent shadow-lg shadow-teal-500/10` : 'bg-teal-500 text-white border-transparent shadow-lg shadow-teal-500/10')
                    : (special ? `bg-white text-slate-500 border-slate-100 hover:${special.light} hover:${special.text}` : 'bg-white text-slate-500 border-slate-100 hover:bg-teal-50 hover:text-teal-600')
                }`}
              >
                {special?.icon}
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-slate-50 rounded-lg p-1 border border-slate-200">
          {depths.map((d) => (
            <button
              key={d}
              onClick={() => setDepth(d as any)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                depth === d 
                  ? 'bg-white text-teal-600 shadow-sm border border-teal-100' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

const QuizCard = ({ quiz, index, special }: { quiz: any, index: number, special?: any }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const isCorrect = selected === quiz.correctAnswer;

  return (
    <div className={`bg-white border rounded-xl p-4 space-y-3 shadow-sm ${special ? special.border : 'border-teal-100'}`}>
      <p className="text-sm font-medium text-slate-800">Q{index + 1}: {quiz.question}</p>
      <div className="space-y-2">
        {quiz.options.map((option: string, i: number) => (
          <button
            key={i}
            disabled={selected !== null}
            onClick={() => setSelected(i)}
            className={`w-full text-left p-2.5 rounded-lg text-sm transition-all border ${
              selected === null 
                ? 'bg-slate-50 border-slate-100 hover:border-slate-300 text-slate-600' 
                : i === quiz.correctAnswer
                  ? (special ? `${special.light} border-${special.color.split('-')[1]}-500/50 ${special.text}` : 'bg-teal-50 border-teal-500/50 text-teal-700')
                  : selected === i
                    ? 'bg-red-50 border-red-500/50 text-red-700'
                    : 'bg-slate-50 border-slate-100 text-slate-400 opacity-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {selected !== null && i === quiz.correctAnswer && <CheckCircle size={14} className={special ? special.text : "text-teal-500"} />}
              {selected === i && i !== quiz.correctAnswer && <XCircle size={14} className="text-red-500" />}
            </div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selected !== null && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`text-xs p-3 rounded-lg ${isCorrect ? (special ? special.light + ' ' + special.text : 'bg-teal-50 text-teal-700') : 'bg-red-50 text-red-700'}`}
          >
            <span className="font-bold mr-1">{isCorrect ? 'Correct!' : 'Incorrect.'}</span>
            {quiz.feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LeftPanel = () => {
  const { currentPrompt, setPrompt, isLoading, setLoading, studyData, setStudyData, subject, depth, user } = useStore();
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
        body: JSON.stringify({ prompt: input, subject, depth })
      });
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setStudyData(data);

      if (user && data && data.nodes) {
        await addDoc(collection(db, 'sessions'), {
          userId: user.uid,
          title: input,
          subject,
          createdAt: Timestamp.now(),
          lastPrompt: input,
          nodes: data.nodes || [],
          edges: data.edges || [],
          explanation: data.explanation || '',
          summary: data.summary || '',
          quiz: data.quiz || []
        });
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
    <div className="w-[40%] flex flex-col h-full bg-white border-r border-teal-100 overflow-hidden relative">
      <div className={`p-6 border-b border-teal-100 ${special ? special.light : 'bg-teal-50/20'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <div className={`p-1.5 rounded-lg ${special ? special.color : 'bg-teal-500'} text-white`}>
               {special?.icon || <Zap size={14}/>}
             </div>
             <span className={`text-[10px] font-bold uppercase tracking-widest ${special ? special.text : 'text-teal-600'}`}>
               {subject} Mode
             </span>
          </div>
          {special && <Sparkles size={14} className={special.text + " animate-pulse"} />}
        </div>
        <form onSubmit={handleStudy} className="relative group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`What concept in ${subject} should we explore?`}
            className={`w-full bg-white border rounded-xl py-3 pl-4 pr-12 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm ${special ? special.border + ' focus:border-' + special.color.split('-')[1] + '-500/50' : 'border-teal-100 focus:border-teal-500/50'}`}
          />
          <button 
            type="submit"
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white transition-colors disabled:opacity-50 shadow-sm ${special ? special.color + ' hover:bg-opacity-90' : 'bg-teal-500 hover:bg-teal-600'}`}
            disabled={isLoading}
          >
            {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Zap size={18} /></motion.div> : <Search size={18} />}
          </button>
        </form>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-xs font-medium"
          >
            <XCircle size={14} />
            <p>{error}</p>
          </motion.div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
        {!studyData && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-8 opacity-60">
            <div className={`p-4 rounded-2xl border ${special ? special.light + ' ' + special.border : 'bg-teal-50 border-teal-100'}`}>
              {special?.icon ? React.cloneElement(special.icon, { size: 48, className: special.text }) : <Brain size={48} className="text-teal-400" />}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-700">Explore {subject}</h2>
              <p className="text-sm text-slate-500 mt-1">Start a session to see interactive maps and tailored summaries.</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="space-y-4">
             <div className={`h-4 rounded animate-pulse w-3/4 ${special ? special.light : 'bg-teal-50'}`}></div>
             <div className={`h-4 rounded animate-pulse w-1/2 ${special ? special.light : 'bg-teal-50'}`}></div>
             <div className={`h-32 rounded animate-pulse w-full ${special ? special.light : 'bg-teal-50'}`}></div>
          </div>
        )}

        {studyData && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-900">{currentPrompt}</h1>
              <p className={`text-slate-600 leading-relaxed text-sm italic border-l-2 pl-4 py-1 rounded-r ${special ? special.border + ' ' + special.light : 'border-teal-400 bg-teal-50/30'}`}>
                {studyData.summary}
              </p>
            </div>

            <div className={`prose prose-sm max-w-none text-slate-700 ${special ? 'prose-' + special.color.split('-')[1] : 'prose-teal'}`}>
              <ReactMarkdown>
                {studyData.explanation}
              </ReactMarkdown>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className={`flex items-center gap-2 ${special ? special.text : 'text-teal-600'}`}>
                <GraduationCap size={18} />
                <h3 className="font-bold text-sm uppercase tracking-wider">Practice Quiz</h3>
              </div>
              <div className="space-y-4">
                {studyData.quiz?.map((q, i) => (
                  <QuizCard key={i} quiz={q} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
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
          background: '#FFFFFF', 
          color: accentColor, 
          border: `2px solid ${lightAccent}`,
          borderRadius: '16px',
          padding: '16px',
          fontSize: '12px',
          fontWeight: '600',
          width: 160,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
          textAlign: 'center'
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
  const { user, setUser, view, setView } = useStore();

  useEffect(() => {
    // Initialization: Just move beyond loading immediately
    // If the user has already onboarded, we can default to 'app' view
    // but typically we start at landing as per store default.
  }, []);

  if (view === 'landing') {
    return <LandingPage />;
  }

  if (view === 'onboarding') {
    return <OnboardingFlow />;
  }

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans relative">
      {/* Mist Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_-20%,#CCFBF1,transparent_50%),radial-gradient(circle_at_0%_100%,#F0FDFA,transparent_50%)]"></div>
      
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <TopBar />
        <main className="flex flex-1 overflow-hidden">
          <LeftPanel />
          <RightPanel />
        </main>
      </div>
    </div>
  );
}
