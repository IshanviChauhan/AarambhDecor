
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]!;
}

const auth = getAuth(app);

// To use the Firebase Auth Emulator, uncomment the lines below and ensure the emulator is running.
// Note: connectAuthEmulator should ideally be called only once.
// if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
//   // Check if emulator is already connected to prevent re-connecting on HMR
//   if (!auth.emulatorConfig) { 
//     try {
//       connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
//       console.log("Firebase Auth Emulator connected.");
//     } catch (error) {
//       console.error("Error connecting to Firebase Auth Emulator:", error);
//     }
//   }
// }

export { app, auth };
