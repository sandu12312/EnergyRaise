import { firestore } from './firebase';
import { firestoreService } from './firestoreService';
import { storage, STORAGE_KEYS } from '../utils/storage';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from '@react-native-firebase/firestore';

/**
 * Quiz answer interface
 */
export interface QuizAnswer {
  questionId: number;
  emotion: string;
  text?: string;
  timestamp: Date;
}

/**
 * Quiz data interface
 */
export interface QuizData {
  userId: string;
  answers: QuizAnswer[];
  completedAt: Date;
  quizType: string;
}

/**
 * Quiz service for handling quiz data
 */
export const quizService = {
  /**
   * Save quiz answers to Firestore
   * @param userId - User ID
   * @param answers - Quiz answers
   * @param quizType - Quiz type (e.g., 'welcome', 'energy', etc.)
   */
  saveQuizAnswers: async (
    userId: string,
    answers: Record<number, string>,
    quizType: string = 'welcome',
  ): Promise<void> => {
    try {
      // Format answers for Firestore
      const formattedAnswers: QuizAnswer[] = Object.entries(answers).map(
        ([questionId, emotion]) => ({
          questionId: parseInt(questionId),
          emotion,
          timestamp: new Date(),
        }),
      );

      // Create quiz data object
      const quizData: QuizData = {
        userId,
        answers: formattedAnswers,
        completedAt: new Date(),
        quizType,
      };

      // Save to Firestore (modular API instance)
      const quizzesRef = collection(firestore, 'quizzes');
      await addDoc(quizzesRef, quizData);

      // Update user data to mark quiz as completed
      await firestoreService.updateUserData(userId, {
        quizCompleted: true,
      });

      // Also save to AsyncStorage for offline access
      await storage.setItem(STORAGE_KEYS.USER_QUIZ_COMPLETED, true);
      await storage.setItem(STORAGE_KEYS.USER_QUIZ_ANSWERS, formattedAnswers);

      console.log('Quiz answers saved successfully');
    } catch (error: any) {
      console.error('Error saving quiz answers:', error);
      throw new Error(`Error saving quiz answers: ${error.message}`);
    }
  },

  /**
   * Check if user has completed the welcome quiz
   * @param userId - User ID
   * @returns Boolean indicating if quiz is completed
   */
  hasCompletedQuiz: async (userId: string): Promise<boolean> => {
    try {
      // First check AsyncStorage for offline access
      const localQuizCompleted = await storage.getItem<boolean>(
        STORAGE_KEYS.USER_QUIZ_COMPLETED,
      );

      if (localQuizCompleted) {
        return true;
      }

      // If not in AsyncStorage, check Firestore
      const userData = await firestoreService.getUserData(userId);

      if (userData?.quizCompleted) {
        // Update AsyncStorage for future offline access
        await storage.setItem(STORAGE_KEYS.USER_QUIZ_COMPLETED, true);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error checking quiz completion:', error);
      return false;
    }
  },

  /**
   * Get user's quiz answers
   * @param userId - User ID
   * @param quizType - Quiz type (e.g., 'welcome', 'energy', etc.)
   * @returns Quiz data or null if not found
   */
  getQuizAnswers: async (
    userId: string,
    quizType: string = 'welcome',
  ): Promise<QuizData | null> => {
    try {
      // Check Firestore for quiz data (modular API instance)
      const quizzesRef = collection(firestore, 'quizzes');
      const quizQuery = query(
        quizzesRef,
        where('userId', '==', userId),
        where('quizType', '==', quizType),
        orderBy('completedAt', 'desc'),
        limit(1),
      );
      const quizSnapshot = await getDocs(quizQuery);

      if (!quizSnapshot.empty) {
        const quizDoc = quizSnapshot.docs[0];
        return quizDoc.data() as QuizData;
      }

      return null;
    } catch (error) {
      console.error('Error getting quiz answers:', error);
      return null;
    }
  },
};
