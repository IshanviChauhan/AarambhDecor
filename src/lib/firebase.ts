
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

// Client-side logging for Firebase config
if (typeof window !== 'undefined') {
  console.log("--- Firebase Client-Side Configuration ---");
  console.log("API Key:", firebaseConfig.apiKey ? "Loaded" : "MISSING or undefined");
  console.log("Auth Domain:", firebaseConfig.authDomain ? "Loaded" : "MISSING or undefined");
  console.log("Project ID:", firebaseConfig.projectId ? "Loaded" : "MISSING or undefined");
  console.log("Storage Bucket:", firebaseConfig.storageBucket ? "Loaded" : "MISSING or undefined");
  console.log("Messaging Sender ID:", firebaseConfig.messagingSenderId ? "Loaded" : "MISSING or undefined");
  console.log("App ID:", firebaseConfig.appId ? "Loaded" : "MISSING or undefined");
  console.log("Measurement ID:", firebaseConfig.measurementId ? `Loaded (${firebaseConfig.measurementId}) (Optional)` : "Not defined (Optional)");
  console.log("-----------------------------------------");

  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error("CRITICAL: Firebase API Key or Project ID is missing. Ensure NEXT_PUBLIC_ prefixes are used in your .env.local file and it's correctly loaded.");
  }
  // Updated warning for storage bucket
  if (firebaseConfig.storageBucket && firebaseConfig.projectId && firebaseConfig.storageBucket !== `${firebaseConfig.projectId}.appspot.com`) {
     console.warn(`POTENTIAL CONFIG ISSUE: Your NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET value is "${firebaseConfig.storageBucket}". It's typically recommended to be "${firebaseConfig.projectId}.appspot.com". Please verify this in your .env file and Firebase project settings if you encounter storage issues.`);
  } else if (firebaseConfig.storageBucket && !firebaseConfig.projectId) {
     console.warn(`POTENTIAL CONFIG ISSUE: Your NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ("${firebaseConfig.storageBucket}") is defined, but NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing. The typical storage bucket name format is "<project-id>.appspot.com".`);
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
      // console.log("Firebase auth persistence explicitly set to 'local'."); // Can be noisy, uncomment if needed
    })
    .catch((error) => {
      console.error("Error setting Firebase auth persistence:", error);
    });
}

const db = getFirestore(app!); // Add non-null assertion
const storage = getStorage(app!); // Initialize Firebase Storage

export { app, auth, db, storage };

