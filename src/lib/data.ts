import { useEffect, useState, useCallback } from 'react'
import { supabase } from './supabase'
import type { EventItem, Promo, Reservation } from './types'
import { SEED_EVENTS, SEED_PROMOS } from './seed'

/** Eventos activos del cronograma semanal (Supabase o datos demo). */
export function useEvents(onlyActive = true) {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    if (!supabase) {
      setEvents(onlyActive ? SEED_EVENTS.filter((e) => e.is_active) : SEED_EVENTS)
      setLoading(false)
      return
    }
    let q = supabase.from('events').select('*')
    if (onlyActive) q = q.eq('is_active', true)
    const { data } = await q.order('day_of_week')
    setEvents((data as EventItem[]) ?? [])
    setLoading(false)
  }, [onlyActive])

  useEffect(() => {
    load()
  }, [load])

  return { events, loading, reload: load }
}

/** Promociones activas (Supabase o datos demo). */
export function usePromos(onlyActive = true) {
  const [promos, setPromos] = useState<Promo[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    if (!supabase) {
      setPromos(onlyActive ? SEED_PROMOS.filter((p) => p.is_active) : SEED_PROMOS)
      setLoading(false)
      return
    }
    let q = supabase.from('promos').select('*')
    if (onlyActive) q = q.eq('is_active', true)
    const { data } = await q.order('created_at', { ascending: false })
    setPromos((data as Promo[]) ?? [])
    setLoading(false)
  }, [onlyActive])

  useEffect(() => {
    load()
  }, [load])

  return { promos, loading, reload: load }
}

export async function createReservation(
  input: Omit<Reservation, 'id' | 'created_at' | 'status'>,
) {
  if (!supabase) return { error: 'Supabase no está configurado todavía.' }
  const { error } = await supabase.from('reservations').insert(input)
  return { error: error?.message ?? null }
}
