export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  premium: boolean;
  onboardingCompleted: boolean;
}

export interface Emotion {
  id: string;
  name: string;
  category: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
}

export interface Remedy {
  id: string;
  name: string;
  type: 'tea' | 'tincture' | 'oil' | 'supplement';
  description: string;
  ingredients: string[];
  instructions: string;
  benefits: string[];
  image: string;
  emotions: string[];
  rating: number;
  duration: string;
  chakra?: string;
  crystal?: string;
  solfeggio?: string;
  foods?: string[];
}

export interface EmotionLog {
  id: string;
  emotionId: string;
  intensity: number;
  timestamp: Date;
  note?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: {
    text: string;
    emotions: string[];
  }[];
}



export interface Psychologist {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  rating: number;
  reviewCount: number;
  avatar: string;
  location: string;
  sessionTypes: SessionType[];
  availability: TimeSlot[];
  about: string;
  experience: number;
  languages: string[];
}

export interface SessionType {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  description: string;
}

export interface TimeSlot {
  date: string; // YYYY-MM-DD
  slots: {
    time: string; // HH:MM
    available: boolean;
  }[];
}

export interface Appointment {
  id: string;
  psychologistId: string;
  userId: string;
  date: string;
  time: string;
  sessionType: SessionType;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Message {
  id: string;
  appointmentId: string;
  senderId: string;
  senderType: 'client' | 'psychologist';
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface AppState {
  user: User | null;
  currentScreen: 'welcome-quiz' | 'login' | 'onboarding' | 'home' | 'emotions' | 'recommendations' | 'quiz' | 'quiz-results' | 'profile' | 'premium' | 'psychology' | 'my-energy-log' | 'daily-boost' | 'healing-sounds';
  isLoading: boolean;
  selectedEmotion: string | null;
  quizResults?: string[];
}