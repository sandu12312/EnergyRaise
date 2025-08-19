import { auth } from './firebase';
import auth_module from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type User = FirebaseAuthTypes.User;

/**
 * Authentication service for handling user authentication
 */
export const authService = {
  /**
   * Register a new user with email and password
   * @param email - User email
   * @param password - User password
   * @returns User object if registration is successful
   */
  register: async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      // Send email verification
      if (userCredential.user) {
        await userCredential.user.sendEmailVerification();
      }

      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  /**
   * Sign in a user with email and password
   * @param email - User email
   * @param password - User password
   * @returns User object if login is successful
   */
  login: async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  /**
   * Sign out the current user
   */
  logout: async (): Promise<void> => {
    try {
      await auth().signOut();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  /**
   * Send password reset email
   * @param email - User email
   */
  resetPassword: async (email: string): Promise<void> => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  /**
   * Get current authenticated user
   * @returns Current user or null if not authenticated
   */
  getCurrentUser: (): User | null => {
    return auth().currentUser;
  },

  /**
   * Check if user's email is verified
   * @returns Boolean indicating if email is verified
   */
  isEmailVerified: (): boolean => {
    const user = auth().currentUser;
    return user ? user.emailVerified : false;
  },

  /**
   * Resend verification email to current user
   */
  resendVerificationEmail: async (): Promise<void> => {
    try {
      const user = auth().currentUser;
      if (user) {
        await user.sendEmailVerification();
      } else {
        throw new Error('No user is signed in');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
