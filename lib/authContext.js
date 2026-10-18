"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "./supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    } else {
      // Check for local mock user session
      try {
        const localUser = localStorage.getItem("vayira_mock_user");
        if (localUser) {
          setUser(JSON.parse(localUser));
        }
      } catch (e) {
        // ignore
      }
      setLoading(false);
    }
  }, []);

  const signIn = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return data;
    } else {
      // Local demo sign in
      const mockUser = {
        id: "usr-" + Math.random().toString(36).substring(2, 9),
        email,
        user_metadata: { full_name: email.split("@")[0] },
        role: email.includes("admin") ? "administrator" : "customer"
      };
      localStorage.setItem("vayira_mock_user", JSON.stringify(mockUser));
      setUser(mockUser);
      return { user: mockUser };
    }
  };

  const signUp = async (email, password, fullName) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });
      if (error) throw error;
      return data;
    } else {
      const mockUser = {
        id: "usr-" + Math.random().toString(36).substring(2, 9),
        email,
        user_metadata: { full_name: fullName || email.split("@")[0] },
        role: email.includes("admin") ? "administrator" : "customer"
      };
      localStorage.setItem("vayira_mock_user", JSON.stringify(mockUser));
      setUser(mockUser);
      return { user: mockUser };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem("vayira_mock_user");
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured: isSupabaseConfigured,
        authModalOpen,
        setAuthModalOpen,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
