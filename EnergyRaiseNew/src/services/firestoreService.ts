import { firestore } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from '@react-native-firebase/firestore';

/**
 * User data interface
 */
export interface UserData {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  receiveNewsletter?: boolean;
  profileImageUrl?: string;
  quizCompleted?: boolean;
  lastLoginAt?: Date;
}

/**
 * Firestore service for handling user data
 */
export const firestoreService = {
  /**
   * Create or update user data in Firestore
   * @param userData - User data object
   */
  setUserData: async (userData: UserData): Promise<void> => {
    try {
      const usersRef = collection(firestore, 'users');
      const userDocRef = doc(usersRef, userData.uid);

      await setDoc(
        userDocRef,
        {
          ...userData,
          createdAt: userData.createdAt || new Date(),
          updatedAt: new Date(),
        },
        { merge: true },
      );
    } catch (error: any) {
      throw new Error(`Error setting user data: ${error.message}`);
    }
  },

  /**
   * Get user data from Firestore
   * @param uid - User ID
   * @returns User data object
   */
  getUserData: async (uid: string): Promise<UserData | null> => {
    try {
      const usersRef = collection(firestore, 'users');
      const userDocRef = doc(usersRef, uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return userDoc.data() as UserData;
      }
      return null;
    } catch (error: any) {
      throw new Error(`Error getting user data: ${error.message}`);
    }
  },

  /**
   * Update user data in Firestore
   * @param uid - User ID
   * @param data - Data to update
   */
  updateUserData: async (
    uid: string,
    data: Partial<UserData>,
  ): Promise<void> => {
    try {
      const usersRef = collection(firestore, 'users');
      const userDocRef = doc(usersRef, uid);
      // Use setDoc with merge to avoid not-found when doc doesn't exist
      await setDoc(
        userDocRef,
        {
          ...data,
          updatedAt: new Date(),
        },
        { merge: true },
      );
    } catch (error: any) {
      throw new Error(`Error updating user data: ${error.message}`);
    }
  },

  /**
   * Delete user data from Firestore
   * @param uid - User ID
   */
  deleteUserData: async (uid: string): Promise<void> => {
    try {
      const usersRef = collection(firestore, 'users');
      const userDocRef = doc(usersRef, uid);

      await deleteDoc(userDocRef);
    } catch (error: any) {
      throw new Error(`Error deleting user data: ${error.message}`);
    }
  },
};
