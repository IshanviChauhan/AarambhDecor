
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
    const unsubscribe = onAuthStateChanged(auth, (currentUserFromListener) => {
      if (currentUserFromListener) {
        setUser(currentUserFromListener);
      } else {
        setUser(null);
      }
      setLoading(false);
    }, (error) => {
      console.error("AuthProvider: ERROR in onAuthStateChanged listener:", error);
      setUser(null);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Removed the loading UI block as per request.
  // The WelcomeLoader will handle the initial visual experience.
  // Components consuming useAuth will still correctly see the 'loading' state
  // and 'user' state as they update.

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
