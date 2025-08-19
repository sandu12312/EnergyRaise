# Firebase Setup for EnergyRaise

This document outlines the Firebase setup and integration with the EnergyRaise React Native application.

## Firebase Services Used

- **Firebase Authentication**: For user login, registration, email verification, and password reset functionality
- **Firestore**: For storing user data and app content
- **Firebase Storage**: For storing user profile images and other app assets

## Project Structure

The Firebase integration is structured as follows:

### Services

- `src/services/firebase.ts`: Main Firebase initialization and configuration
- `src/services/authService.ts`: Authentication service for login, registration, etc.
- `src/services/firestoreService.ts`: Firestore service for user data management
- `src/services/storageService.ts`: Storage service for file uploads and downloads

### Context

- `src/context/AuthContext.tsx`: React Context for managing authentication state throughout the app

## Setup Instructions

### 1. Firebase Console Setup

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/)
2. Add an iOS app and Android app with the respective bundle ID/package name
3. Download the configuration files:
   - iOS: `GoogleService-Info.plist`
   - Android: `google-services.json`
4. Place the configuration files in the correct locations:
   - iOS: `/ios/GoogleService-Info.plist`
   - Android: `/android/app/google-services.json`

### 2. Enable Authentication Methods

1. In the Firebase Console, go to Authentication → Sign-in method
2. Enable Email/Password authentication
3. Enable Email verification

### 3. Create Firestore Database

1. In the Firebase Console, go to Firestore Database
2. Create a database with appropriate security rules
3. Add initial collections if needed (e.g., users)

### 4. Configure Storage Rules

1. In the Firebase Console, go to Storage
2. Set up appropriate security rules for file access

## Usage Instructions

### Authentication

- Use `authService` for login, registration, password reset, and logout functionality
- Access current user information through `useAuth()` hook

```typescript
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

// In your component
const { user, loading } = useAuth();

// Login
await authService.login(email, password);

// Register
await authService.register(email, password);

// Password Reset
await authService.resetPassword(email);

// Logout
await authService.logout();
```

### Firestore

- Use `firestoreService` for managing user data

```typescript
import { firestoreService, UserData } from '../services/firestoreService';

// Store user data
const userData: UserData = {
  uid: user.uid,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  createdAt: new Date(),
};
await firestoreService.setUserData(userData);

// Get user data
const userData = await firestoreService.getUserData(user.uid);

// Update user data
await firestoreService.updateUserData(user.uid, { firstName: 'Jane' });
```

### Storage

- Use `storageService` for uploading and managing files

```typescript
import { storageService } from '../services/storageService';

// Upload profile image
const downloadURL = await storageService.uploadProfileImage(user.uid, imageUri);

// Get file URL
const url = await storageService.getFileURL(path);

// Delete file
await storageService.deleteFile(path);
```

## Security Considerations

- Never expose Firebase API keys or secrets in client-side code
- Implement proper security rules in Firestore and Storage
- Always verify user permissions on the server side before allowing data access
- Set up Firebase Authentication triggers for user creation and deletion
- Consider implementing additional security measures like rate limiting and IP blocking for sensitive operations

## Troubleshooting

- Check that configuration files are properly set up in both iOS and Android projects
- Ensure Firebase services are enabled in the Firebase Console
- Verify that all required dependencies are installed
- Check logs for error messages and authentication failures
