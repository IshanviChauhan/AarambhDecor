
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

// Log raw environment variables as seen by this module
console.log("--- Reading Firebase Environment Variables (src/lib/firebase.ts) ---");
console.log("Raw NEXT_PUBLIC_FIREBASE_API_KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "MISSING/undefined");
console.log("Raw NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "MISSING/undefined");
console.log("Raw NEXT_PUBLIC_FIREBASE_PROJECT_ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "MISSING/undefined");
console.log("Raw NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "MISSING/undefined");
console.log("Raw NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:", process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "MISSING/undefined");
console.log("Raw NEXT_PUBLIC_FIREBASE_APP_ID:", process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "MISSING/undefined");
console.log("Raw NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:", process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "Not defined (Optional)");
console.log("------------------------------------------------------------------");


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Universal logging for the constructed Firebase configuration
console.log("--- Firebase Configuration Object (src/lib/firebase.ts) ---");
console.log("Environment Type:", typeof window !== 'undefined' ? "Client" : "Server");
console.log("Using API Key:", firebaseConfig.apiKey ? "Present" : "MISSING or undefined in config");
console.log("Using Auth Domain:", firebaseConfig.authDomain ? "Present" : "MISSING or undefined in config");
console.log("Using Project ID:", firebaseConfig.projectId ? "Present" : "MISSING or undefined in config");
console.log("---------------------------------------------------------");

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error(
    "CRITICAL FIREBASE CONFIG ERROR (src/lib/firebase.ts): API Key or Project ID is missing or undefined in the firebaseConfig object. Firebase services will likely be unavailable." +
    " Please ensure NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID are correctly set in your .env file at the project root " +
    "and that the Next.js server has been restarted after changes to .env."
  );
  // app, db, and storage remain null as per their initial declaration.
} else {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
      console.log("Firebase app initialized (src/lib/firebase.ts).");
    } else {
      app = getApps()[0]!;
      console.log("Firebase app already initialized (src/lib/firebase.ts).");
    }
    // If app is successfully initialized, then initialize db and storage
    db = getFirestore(app);
    storage = getStorage(app);

  } catch (e: any) {
    console.error("FATAL ERROR initializing Firebase App (src/lib/firebase.ts):", e.message);
    if (e.code === 'auth/invalid-api-key' || (e.message && e.message.toLowerCase().includes('invalid-api-key'))) {
       console.error(
          "Firebase Error (invalid-api-key possibly, or other init error) from src/lib/firebase.ts: This strongly suggests that your NEXT_PUBLIC_FIREBASE_API_KEY " +
          "is incorrect, missing, or not accessible by the current environment. " +
          "1. Verify the key in your project's root .env file against your Firebase project settings. " +
          "2. Ensure the Next.js development server was restarted after any .env changes."
      );
    }
    // app, db, and storage will remain null if initialization failed here.
    if (typeof window !== 'undefined') {
      console.error("Firebase initialization failed on the client. Some Firebase features may not work.");
    }
  }
}

export { app, db, storage };
