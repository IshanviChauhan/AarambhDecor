
'use client';

import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider: Mounting. Initial auth.currentUser:", auth.currentUser ? auth.currentUser.uid : 'null');
    const unsubscribe = onAuthStateChanged(auth, (currentUserFromListener) => {
      console.log("AuthProvider: onAuthStateChanged listener fired.");
      console.log("AuthProvider: currentUserFromListener:", currentUserFromListener ? currentUserFromListener.uid : 'null');
      // Check auth.currentUser directly as well, it should match currentUserFromListener
      console.log("AuthProvider: auth.currentUser at time of listener firing:", auth.currentUser ? auth.currentUser.uid : 'null');

      setUser(currentUserFromListener);
      setLoading(false);
      console.log(`AuthProvider: State updated. Loading: false, User set to: ${currentUserFromListener ? currentUserFromListener.uid : 'null'}`);
    }, (error) => {
      console.error("AuthProvider: Error in onAuthStateChanged listener:", error);
      setUser(null); // Ensure user is null on error
      setLoading(false); // Ensure loading is false on error
      console.log(`AuthProvider: State updated due to error. Loading: false, User set to: null`);
    });
    
    // This initial check is good for seeing the very first state.
    if (auth.currentUser) {
        console.log(`AuthProvider: Initial check on mount (after listener setup) - auth.currentUser found. UID: ${auth.currentUser.uid}`);
    } else {
        console.log("AuthProvider: Initial check on mount (after listener setup) - auth.currentUser is null.");
    }

    return () => {
      console.log("AuthProvider: Unmounting. Unsubscribing from onAuthStateChanged.");
      unsubscribe();
    };
  }, []);

  if (loading) {
    console.log("AuthProvider: In loading state, rendering loader.");
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-background">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:0.15s]"></div>
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:0.3s]"></div>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">Initializing Authentication...</p>
      </div>
    );
  }
  console.log(`AuthProvider: Rendering children. Current loading state: ${loading}, User state: ${user ? user.uid : 'null'}`);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
