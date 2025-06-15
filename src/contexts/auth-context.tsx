
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
    console.log("AuthProvider: useEffect triggered. Setting up onAuthStateChanged listener.");
    // It's often more insightful to see auth.currentUser *inside* the listener's first call,
    // or just rely on what the listener itself provides.
    // console.log("AuthProvider: Initial auth.currentUser before listener setup:", auth.currentUser ? auth.currentUser.uid : 'null');

    const unsubscribe = onAuthStateChanged(auth, (currentUserFromListener) => {
      console.log("AuthProvider: --- onAuthStateChanged LISTENER FIRED ---");
      if (currentUserFromListener) {
        console.log(`AuthProvider: Listener reported - USER DETECTED. UID: ${currentUserFromListener.uid}, Email: ${currentUserFromListener.email}`);
        setUser(currentUserFromListener);
      } else {
        console.log("AuthProvider: Listener reported - USER IS NULL.");
        setUser(null);
      }
      setLoading(false);
      console.log(`AuthProvider: Listener finished. State updated: loading=${false}, user=${currentUserFromListener ? currentUserFromListener.uid : 'null'}`);
    }, (error) => {
      console.error("AuthProvider: ERROR in onAuthStateChanged listener:", error);
      setUser(null);
      setLoading(false);
      console.log(`AuthProvider: Listener finished due to ERROR. State updated: loading=${false}, user=null`);
    });

    return () => {
      console.log("AuthProvider: useEffect cleanup. Unsubscribing from onAuthStateChanged.");
      unsubscribe();
    };
  }, []); // Empty dependency array: runs once on mount, cleans up on unmount

  if (loading) {
    // This log is fine for when the component is initially mounting and waiting for the first auth state.
    console.log("AuthProvider: Component rendering - IN LOADING STATE.");
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

  // This log will show the state with which the children are being rendered.
  console.log(`AuthProvider: Component rendering - NOT loading. Current User state from AuthProvider: ${user ? user.uid : 'null'}`);
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
