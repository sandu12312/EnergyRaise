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

- `src/context/AuthContext.tsx`: React context for managing authentication state

## Troubleshooting Firebase Authentication Issues

### Common Issues and Solutions

#### 1. Internal Error (auth/internal-error)

This error typically occurs when:

**Problem**: Firebase project doesn't have email/password authentication enabled
**Solution**:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `energyraise-de348`
3. Navigate to Authentication > Sign-in method
4. Enable "Email/Password" provider
5. Save changes

**Problem**: Firebase project has restrictions or is in a different region
**Solution**:

1. Check if your Firebase project is in the correct region
2. Verify there are no billing or quota restrictions
3. Ensure the project is not in a restricted organization

**Problem**: Network connectivity issues
**Solution**:

1. Check your internet connection
2. Verify firewall settings
3. Test with a different network if possible

#### 2. Configuration File Issues

**Problem**: GoogleService-Info.plist not found
**Solution**:

1. Ensure GoogleService-Info.plist is in the correct location
2. Add the file to your Xcode project
3. Verify the bundle ID matches your Firebase project

#### 3. Build Configuration Issues

**Problem**: Firebase modules not linking properly
**Solution**:

1. Run `cd ios && pod install` to update CocoaPods
2. Clean and rebuild the project
3. Verify all Firebase dependencies are properly installed

## Testing Firebase Authentication

To test if Firebase is working:

1. **Check Console Logs**: Look for Firebase initialization messages
2. **Test Connection**: The app now includes connection testing
3. **Verify Project Settings**: Ensure email/password auth is enabled

## Next Steps

If you're still experiencing issues:

1. Check the Firebase Console for any error messages
2. Verify your Firebase project configuration
3. Test with a simple email/password combination
4. Check network connectivity and firewall settings

## Support

For additional help:

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Firebase](https://rnfirebase.io/)
- [Firebase Console](https://console.firebase.google.com/)
