import { storage } from './firebase';

/**
 * Firebase Storage service for handling file uploads and downloads
 */
export const storageService = {
  /**
   * Upload a file to Firebase Storage
   * @param uri - Local file URI
   * @param path - Path in Firebase Storage
   * @param metadata - File metadata
   * @returns Download URL
   */
  uploadFile: async (
    uri: string,
    path: string,
    metadata?: any,
  ): Promise<string> => {
    try {
      // Create a reference to the file location
      const reference = storage().ref(path);

      // Upload the file
      await reference.putFile(uri);

      // Get download URL
      const downloadURL = await reference.getDownloadURL();

      return downloadURL;
    } catch (error: any) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
  },

  /**
   * Get download URL for a file in Firebase Storage
   * @param path - Path in Firebase Storage
   * @returns Download URL
   */
  getFileURL: async (path: string): Promise<string> => {
    try {
      const reference = storage().ref(path);
      return await reference.getDownloadURL();
    } catch (error: any) {
      throw new Error(`Error getting file URL: ${error.message}`);
    }
  },

  /**
   * Delete a file from Firebase Storage
   * @param path - Path in Firebase Storage
   */
  deleteFile: async (path: string): Promise<void> => {
    try {
      const reference = storage().ref(path);
      await reference.delete();
    } catch (error: any) {
      throw new Error(`Error deleting file: ${error.message}`);
    }
  },

  /**
   * Upload a profile image
   * @param uid - User ID
   * @param uri - Local file URI
   * @returns Download URL
   */
  uploadProfileImage: async (uid: string, uri: string): Promise<string> => {
    const path = `users/${uid}/profile.jpg`;
    return await storageService.uploadFile(uri, path, {
      contentType: 'image/jpeg',
    });
  },
};
