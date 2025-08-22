import { getApps, getApp, initializeApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';
import { getStorage } from '@react-native-firebase/storage';

// Your web app's Firebase configuration - Updated with correct project ID
const firebaseConfig = {
  apiKey: 'AIzaSyDBjy6BEKW0MIuv048v1zvUME-MthcApLw',
  authDomain: 'energyraise-1334f.firebaseapp.com',
  projectId: 'energyraise-1334f',
  storageBucket: 'energyraise-1334f.appspot.com',
  messagingSenderId: '967714555230',
  appId: '1:967714555230:web:36fa8bc9fa1393d24afbcf',
  measurementId: 'G-QSYBMYPZG5',
};

// Ensure default app exists, then fetch it synchronously
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const appInstance = getApp();

// Initialize service instances (modular API) using the resolved app
const authInstance = getAuth(appInstance);
const firestoreInstance = getFirestore(appInstance);
const storageInstance = getStorage(appInstance);

// Lightweight connectivity log (no deprecated calls)
try {
  // eslint-disable-next-line no-console
  console.log('Testing Firebase connection...');
  // eslint-disable-next-line no-console
  console.log('Firebase app connected:', appInstance.name);
  // eslint-disable-next-line no-console
  console.log('Firebase Auth accessible:', !!authInstance);
} catch (_) {
  // ignore
}

// Export Firebase modules (instances)
export {
  appInstance as app,
  authInstance as auth,
  firestoreInstance as firestore,
  storageInstance as storage,
};
