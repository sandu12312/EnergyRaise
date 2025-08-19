import { firestore } from './firebase';

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
      await firestore()
        .collection('users')
        .doc(userData.uid)
        .set(
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
      const userDoc = await firestore().collection('users').doc(uid).get();

      if (userDoc.exists) {
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
      await firestore()
        .collection('users')
        .doc(uid)
        .update({
          ...data,
          updatedAt: new Date(),
        });
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
      await firestore().collection('users').doc(uid).delete();
    } catch (error: any) {
      throw new Error(`Error deleting user data: ${error.message}`);
    }
  },
};
