# Firebase Security Rules

To fix the permission errors, you need to update your Firebase security rules for Firestore. Here are the rules you should set in the Firebase Console:

## Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read and write their own user data
    match /users/{userId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
    }

    // Allow authenticated users to read and write their own quiz data
    match /quizzes/{quizId} {
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }

    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## How to Set Up Firebase Security Rules

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`energyraise-1334f`)
3. In the left sidebar, click on "Firestore Database"
4. Click on the "Rules" tab
5. Replace the existing rules with the rules above
6. Click "Publish"

These rules will:

- Allow authenticated users to create their user profile
- Allow users to read, update, and delete only their own user data
- Allow users to create, read, update, and delete only their own quiz data
- Deny all other access by default

## Testing Authentication

To ensure your authentication is working properly:

1. Make sure you've enabled Email/Password authentication in the Firebase Console:

   - Go to Authentication > Sign-in method
   - Enable Email/Password provider

2. Test user registration and login with valid credentials

## Common Issues

If you're still experiencing permission errors:

- Ensure you're properly authenticated before accessing Firestore
- Check that you're using the correct user ID when accessing documents
- Verify that the security rules have been published successfully
- Check the Firebase console logs for any authentication errors

Remember that security rules are applied server-side, so even if your client-side code attempts to access data, the server will reject requests that don't comply with the rules.
