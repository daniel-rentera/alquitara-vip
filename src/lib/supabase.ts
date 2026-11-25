import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** True cuando hay credenciales reales de Supabase configuradas en .env */
export const isSupabaseConfigured = Boolean(url && anon && url.startsWith('http'))

/**
 * Cliente de Supabase. Es `null` si aun no configuras las credenciales,
 * para que el sitio pueda funcionar en modo DEMO sin romperse.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anon as string)
  : null
