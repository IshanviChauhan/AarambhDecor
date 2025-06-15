
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
    console.log("AuthProvider: Mounting. Setting up onAuthStateChanged listener.");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(`AuthProvider: onAuthStateChanged - User detected. UID: ${currentUser.uid}, Email: ${currentUser.email}`);
      } else {
        console.log("AuthProvider: onAuthStateChanged - No user detected (currentUser is null).");
      }
      setUser(currentUser);
      setLoading(false);
      console.log(`AuthProvider: State updated. Loading: false, User: ${currentUser ? currentUser.uid : 'null'}`);
    }, (error) => {
      console.error("AuthProvider: Error in onAuthStateChanged listener:", error);
      setLoading(false); // Ensure loading is set to false on error too
    });
    
    if (auth.currentUser) {
        console.log(`AuthProvider: Initial check on mount - auth.currentUser found. UID: ${auth.currentUser.uid}`);
    } else {
        console.log("AuthProvider: Initial check on mount - auth.currentUser is null.");
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
  console.log(`AuthProvider: Rendering children. Final loading state: ${loading}, User state: ${user ? user.uid : 'null'}`);
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
