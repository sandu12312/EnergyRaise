import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export const STORAGE_KEYS = {
  THEME: '@energyraise:theme',
  USER_QUIZ_COMPLETED: '@energyraise:user_quiz_completed',
  USER_QUIZ_ANSWERS: '@energyraise:user_quiz_answers',
};

/**
 * Storage utility for handling local storage operations
 */
export const storage = {
  /**
   * Set a value in storage
   * @param key - Storage key
   * @param value - Value to store
   */
  setItem: async <T>(key: string, value: T): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error storing ${key}:`, error);
    }
  },

  /**
   * Get a value from storage
   * @param key - Storage key
   * @returns Stored value or null if not found
   */
  getItem: async <T>(key: string): Promise<T | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
      return null;
    }
  },

  /**
   * Remove a value from storage
   * @param key - Storage key
   */
  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  },

  /**
   * Clear all storage
   */
  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
