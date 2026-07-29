import { Timestamp } from 'firebase/firestore';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  feedback: string;
}

export interface NodeData {
  id: string;
  title: string;
  description: string;
}

export interface EdgeData {
  source: string;
  target: string;
  label: string;
}

export interface StudySession {
  id?: string;
  userId: string;
  title: string;
  subject: string;
  createdAt: Timestamp;
  lastPrompt: string;
  nodes: NodeData[];
  edges: EdgeData[];
  explanation: string;
  summary: string;
  quiz: QuizQuestion[];
}
