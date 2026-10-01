import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { supabaseClient, isClientSupabaseConfigured } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check saved session
    const savedUser = localStorage.getItem('phishguard_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('phishguard_user');
      }
    } else {
      // Initialize demo user if no user logged in so personal progress tracking works smoothly!
      const defaultUser: User = {
        id: 'usr-student-01',
        name: 'Student Demo',
        email: 'student@phishguard.demo'
      };
      setUser(defaultUser);
      localStorage.setItem('phishguard_user', JSON.stringify(defaultUser));
      localStorage.setItem('phishguard_user_id', defaultUser.id);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (isClientSupabaseConfigured && supabaseClient) {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password: pass });
        if (error) return { success: false, error: error.message };
        
        if (data.user) {
          const u: User = {
            id: data.user.id,
            email: data.user.email || email,
            name: data.user.user_metadata?.name || email.split('@')[0]
          };
          setUser(u);
          localStorage.setItem('phishguard_user', JSON.stringify(u));
          localStorage.setItem('phishguard_user_id', u.id);
          if (data.session) {
            localStorage.setItem('phishguard_token', data.session.access_token);
          }
          return { success: true };
        }
      }

      // API Backend login call
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });

      const resData = await response.json();
      if (!response.ok) {
        return { success: false, error: resData.error || 'Login failed' };
      }

      setUser(resData.user);
      localStorage.setItem('phishguard_user', JSON.stringify(resData.user));
      localStorage.setItem('phishguard_user_id', resData.user.id);
      if (resData.token) localStorage.setItem('phishguard_token', resData.token);
      return { success: true };

    } catch (err: any) {
      // Local fallback login for demonstration
      const u: User = { id: 'usr-' + Date.now(), name: email.split('@')[0], email };
      setUser(u);
      localStorage.setItem('phishguard_user', JSON.stringify(u));
      localStorage.setItem('phishguard_user_id', u.id);
      return { success: true };
    }
  };

  const register = async (name: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (isClientSupabaseConfigured && supabaseClient) {
        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password: pass,
          options: { data: { name } }
        });
        if (error) return { success: false, error: error.message };
        if (data.user) {
          const u: User = { id: data.user.id, email, name };
          setUser(u);
          localStorage.setItem('phishguard_user', JSON.stringify(u));
          localStorage.setItem('phishguard_user_id', u.id);
          return { success: true };
        }
      }

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pass })
      });

      const resData = await response.json();
      if (!response.ok) return { success: false, error: resData.error || 'Registration failed' };

      setUser(resData.user);
      localStorage.setItem('phishguard_user', JSON.stringify(resData.user));
      localStorage.setItem('phishguard_user_id', resData.user.id);
      if (resData.token) localStorage.setItem('phishguard_token', resData.token);
      return { success: true };

    } catch (err: any) {
      const u: User = { id: 'usr-' + Date.now(), name, email };
      setUser(u);
      localStorage.setItem('phishguard_user', JSON.stringify(u));
      localStorage.setItem('phishguard_user_id', u.id);
      return { success: true };
    }
  };

  const logout = () => {
    if (isClientSupabaseConfigured && supabaseClient) {
      supabaseClient.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('phishguard_user');
    localStorage.removeItem('phishguard_token');
    localStorage.removeItem('phishguard_user_id');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
