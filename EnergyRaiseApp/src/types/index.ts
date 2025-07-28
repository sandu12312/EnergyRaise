export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  premium: boolean;
  onboardingCompleted: boolean;
}

export interface QuizAnswer {
  text: string;
  emotion: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  answers: QuizAnswer[];
}

export interface WelcomeQuizState {
  currentQuestion: number;
  answers: string[];
  isCompleted: boolean;
}

export interface Theme {
  background: string;
  cardBackground: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
}

export type ScreenType =
  | 'welcome-quiz'
  | 'login'
  | 'onboarding'
  | 'home'
  | 'emotions'
  | 'recommendations'
  | 'quiz'
  | 'quiz-results'
  | 'profile'
  | 'premium'
  | 'psychology'
  | 'my-energy-log'
  | 'daily-boost'
  | 'healing-sounds';

export interface AppState {
  user: User | null;
  currentScreen: ScreenType;
  isLoading: boolean;
  selectedEmotion: string | null;
  quizResults?: string[];
}
