import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Profile } from '../lib/types'

interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  configured: boolean
  isAdmin: boolean
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone: string,
  ) => Promise<{ error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  async function loadProfile(u: User | null) {
    if (!u || !supabase) {
      setProfile(null)
      return
    }
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', u.id)
      .single()
    setProfile((data as Profile) ?? null)
  }

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(async ({ data }: { data: { session: Session | null } }) => {
      setUser(data.session?.user ?? null)
      await loadProfile(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, session) => {
      setUser(session?.user ?? null)
      await loadProfile(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value: AuthState = {
    user,
    profile,
    loading,
    configured: isSupabaseConfigured,
    isAdmin: profile?.role === 'admin',
    async signUp(email, password, fullName, phone) {
      if (!supabase) return { error: 'Supabase no está configurado todavía.' }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, phone } },
      })
      return { error: error?.message ?? null }
    },
    async signIn(email, password) {
      if (!supabase) return { error: 'Supabase no está configurado todavía.' }
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return { error: error?.message ?? null }
    },
    async signOut() {
      if (!supabase) return
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
    },
    async refreshProfile() {
      await loadProfile(user)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
