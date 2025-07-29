// Emotion types
export interface Emotion {
  id: string;
  name: string;
  icon: string;
  description: string;
}

// Remedy types
export interface Remedy {
  id: string;
  name: string;
  type: 'tea' | 'tincture' | 'oil' | 'supplement';
  description: string;
  benefits: string[];
  emotions: string[];
  image?: string;
  isPremium: boolean;
}

// User types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  joinDate: string;
  favoriteRemedies: string[];
  savedLogs: string[];
}

// Energy Log types
export interface EnergyLog {
  id: string;
  userId: string;
  date: string;
  emotions: string[];
  notes: string;
  remediesUsed: string[];
  rating: number;
}

// Quiz types
export interface QuizQuestion {
  id: number;
  question: string;
  answers: {
    text: string;
    emotion: string;
    icon: string;
  }[];
}

export interface QuizAnswer {
  questionId: number;
  selectedEmotion: string;
}

// Daily Boost types
export interface DailyBoost {
  id: string;
  title: string;
  description: string;
  type: 'meditation' | 'exercise' | 'affirmation' | 'breathing';
  duration: number; // in minutes
  isPremium: boolean;
}

// Healing Sound types
export interface HealingSound {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: 'nature' | 'meditation' | 'sleep' | 'focus';
  audioUrl: string;
  isPremium: boolean;
}

// Psychology types
export interface Therapist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Theme types
export interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
}

// App State types
export interface AppState {
  user: UserProfile | null;
  theme: Theme;
  energyLogs: EnergyLog[];
  favoriteRemedies: Remedy[];
  quizResults: QuizAnswer[];
}

// Welcome Quiz State
export interface WelcomeQuizState {
  currentQuestion: number;
  answers: string[];
  isCompleted: boolean;
}
