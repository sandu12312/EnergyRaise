import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDBjy6BEKW0MIuv048v1zvUME-MthcApLw',
  authDomain: 'energyraise-de348.firebaseapp.com',
  projectId: 'energyraise-de348',
  storageBucket: 'energyraise-de348.firebasestorage.app',
  messagingSenderId: '967714555230',
  appId: '1:967714555230:web:36fa8bc9fa1393d24afbcf',
  measurementId: 'G-QSYBMYPZG5',
};

// Initialize Firebase if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase, auth, firestore, storage };
