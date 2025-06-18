
'use client';

import type { User } from 'firebase/auth';
import { createContext, useContext, type ReactNode, useState, useEffect } from 'react';

// Minimal AuthContext to avoid breaking imports everywhere immediately.
// This will not provide any actual user data.
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Simulate a non-loading, no-user state
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real app, this would involve onAuthStateChanged, but we're removing auth.
    // For now, just set loading to false after a tick.
    const timer = setTimeout(() => setLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);


  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This might still be called if not all usages are removed,
    // return a default "no user" state.
    return { user: null, loading: false };
  }
  return context;
}
