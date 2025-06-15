
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Log the config being used by the client-side SDK
if (typeof window !== 'undefined') { // Ensure this only runs on the client
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
    }
  } catch (e) {
    console.error("Error initializing Firebase app:", e);
    // Fallback or rethrow, depending on desired error handling
    throw e;
  }
} else {
  app = getApps()[0]!;
  if (typeof window !== 'undefined') {
    console.log("Firebase app already initialized.");
  }
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
