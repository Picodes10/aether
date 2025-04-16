
export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  totalScore: number;
  quizzesTaken: number;
  isAdmin: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  quizCount: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // in minutes
  questionCount: number;
  imageUrl?: string;
  createdAt: string;
  authorId: string;
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation?: string;
  points: number;
}

export interface QuizResult {
  id: string;
  userId: string;
  username: string;
  quizId: string;
  quizTitle: string;
  score: number;
  maxScore: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number; // in seconds
  completedAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  totalScore: number;
  quizzesTaken: number;
  rank: number;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

export interface QuizAttempt {
  quizId: string;
  userId: string;
  answers: UserAnswer[];
  startedAt: number;
  endedAt?: number;
  currentQuestionIndex: number;
}
