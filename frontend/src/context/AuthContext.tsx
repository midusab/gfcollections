import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  location: string | null;
  delivery_address: string | null;
  email: string | null;
  avatar_url: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (currentUser: User) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No profile row exists (RLS or missing trigger). Fallback to user metadata.
          setProfile({
            id: currentUser.id,
            full_name: currentUser.user_metadata?.full_name || null,
            phone: currentUser.user_metadata?.phone || null,
            location: currentUser.user_metadata?.location || null,
            delivery_address: null,
            email: currentUser.email || null,
            avatar_url: null,
          });
          return;
        }
        throw error;
      }
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Ensure we still have some profile data from the user object
      setProfile({
        id: currentUser.id,
        full_name: currentUser.user_metadata?.full_name || null,
        phone: currentUser.user_metadata?.phone || null,
        location: currentUser.user_metadata?.location || null,
        delivery_address: null,
        email: currentUser.email || null,
        avatar_url: null,
      });
    }
  };

  useEffect(() => {
    let mounted = true;

    // 1. Initial Session Check
    const initializeAuth = async () => {
      try {
        // Use getUser() instead of getSession() to actively verify the user exists on the server,
        // preventing "ghost sessions" if a user was deleted from the database but still has a local cookie.
        const { data: { user }, error } = await supabase.auth.getUser();
        
        // We still need the session for the context
        const { data: { session } } = await supabase.auth.getSession();
        
        if (error && error.status !== 400) throw error; // 400 means no session found, which is normal
        
        if (mounted) {
          setSession(session);
          setUser(user ?? null);
          if (user) {
            await fetchProfile(user);
          }
        }
      } catch (err) {
        console.error('Session initialization error:', err);
        // If getUser() threw an error (like a missing user), we must purge local storage
        // otherwise the onAuthStateChange listener will resurrect the ghost session!
        await supabase.auth.signOut();
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    // 2. Real-time Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      // Clear all potential state storage
      localStorage.removeItem('gf_cart');
      sessionStorage.clear();
      
      await supabase.auth.signOut();
      
      // Force a hard redirect to the home page to guarantee the session clears visually
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out failed:', error);
      window.location.href = '/'; // Fallback redirect even on failure
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
