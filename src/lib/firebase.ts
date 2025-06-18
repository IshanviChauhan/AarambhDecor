
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (typeof window !== 'undefined') {
  console.log("Firebase config being used by client-side SDK:", firebaseConfig);
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error("CRITICAL: Firebase API Key or Project ID is missing. Check your .env file and ensure it's loaded correctly for the client (NEXT_PUBLIC_ prefix).");
  }
  if (firebaseConfig.storageBucket && !firebaseConfig.storageBucket.endsWith('.appspot.com')) {
    console.warn(`POTENTIAL CONFIG ISSUE: Your NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET value is "${firebaseConfig.storageBucket}". It typically should end with ".appspot.com" (e.g., "${firebaseConfig.projectId || 'your-project-id'}.appspot.com"). Please verify this in your .env file and Firebase project settings.`);
  }
}

let app: FirebaseApp;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    if (typeof window !== 'undefined') {
      console.log("Firebase app initialized successfully.");
      console.log(`Initialized Firebase app name: ${app.name}`); // Default is "[DEFAULT]"
      console.log(`Initialized Firebase app Project ID from options: ${app.options.projectId}`);
    }
  } catch (e) {
    console.error("Error initializing Firebase app:", e);
    // It's often better not to throw here in client-side code if you want the app to attempt to run partially
    // throw e; 
  }
} else {
  app = getApps()[0]!;
  if (typeof window !== 'undefined') {
    console.log("Firebase app already initialized.");
    console.log(`Reusing Firebase app name: ${app.name}`);
    console.log(`Reusing Firebase app Project ID from options: ${app.options.projectId}`);
  }
}

const auth = getAuth(app!); // Add non-null assertion if app could be undefined due to caught error

if (typeof window !== 'undefined' && app!) { // ensure app is initialized
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("Firebase auth persistence explicitly set to 'local'.");
    })
    .catch((error) => {
      console.error("Error setting Firebase auth persistence:", error);
    });
}

const db = getFirestore(app!); // Add non-null assertion
const storage = getStorage(app!); // Initialize Firebase Storage

export { app, auth, db, storage };
