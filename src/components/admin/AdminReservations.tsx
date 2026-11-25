import { useEffect, useState, useCallback } from 'react'
import { Loader2, Check, X, Trash2, CalendarDays, Users } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { Reservation, ReservationStatus } from '../../lib/types'

const TYPE_LABEL = { promo: 'Promo', cumple: 'Cumple', mesa: 'Mesa' }
const STATUS_STYLE: Record<string, string> = {
  pendiente: 'border-gold/40 bg-gold/10 text-gold',
  confirmada: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
  cancelada: 'border-white/15 bg-white/5 text-white/40',
}
const FILTERS: (ReservationStatus | 'todas')[] = ['todas', 'pendiente', 'confirmada', 'cancelada']

export default function AdminReservations() {
  const [items, setItems] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<ReservationStatus | 'todas'>('todas')

  const load = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    const { data } = await supabase
      .from('reservations')
      .select('*, promo:promos(title), profile:profiles(full_name)')
      .order('created_at', { ascending: false })
    setItems((data as Reservation[]) ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const setStatus = async (id: string, status: ReservationStatus) => {
    if (!supabase) return
    await supabase.from('reservations').update({ status }).eq('id', id)
    load()
  }
  const remove = async (id: string) => {
    if (!supabase) return
    if (!confirm('¿Eliminar esta reserva?')) return
    await supabase.from('reservations').delete().eq('id', id)
    load()
  }

  const shown = items.filter((r) => filter === 'todas' || r.status === filter)

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition ${
              filter === f ? 'bg-grape-gold text-white shadow-neon' : 'border border-white/10 text-white/55 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid min-h-[20vh] place-items-center">
          <Loader2 className="h-7 w-7 animate-spin text-neon" />
        </div>
      ) : shown.length === 0 ? (
        <p className="glass rounded-2xl p-8 text-center text-white/50">No hay reservas aquí.</p>
      ) : (
        <div className="space-y-3">
          {shown.map((r) => (
            <div key={r.id} className="glass flex flex-wrap items-center gap-4 rounded-2xl p-4">
              <div className="min-w-[140px] flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-bold uppercase text-white/70">
                    {TYPE_LABEL[r.type]}
                  </span>
                  <span className="font-semibold text-white">
                    {r.promo?.title ?? r.celebrant_name ?? 'Mesa'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/55">
                  {r.profile?.full_name ?? 'Cliente'} · {r.contact_phone ?? 's/n'}
                </p>
                {r.notes && <p className="mt-0.5 text-xs text-white/40">“{r.notes}”</p>}
              </div>

              <div className="flex items-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {r.date}</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {r.guests}</span>
              </div>

              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLE[r.status]}`}>
                {r.status}
              </span>

              <div className="flex gap-2">
                <button onClick={() => setStatus(r.id, 'confirmada')} title="Confirmar" className="grid h-9 w-9 place-items-center rounded-lg border border-emerald-400/30 text-emerald-300 transition hover:bg-emerald-400/10">
                  <Check className="h-4 w-4" />
                </button>
                <button onClick={() => setStatus(r.id, 'cancelada')} title="Cancelar" className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/60 transition hover:bg-white/10">
                  <X className="h-4 w-4" />
                </button>
                <button onClick={() => remove(r.id)} title="Eliminar" className="grid h-9 w-9 place-items-center rounded-lg border border-magenta/30 text-magenta transition hover:bg-magenta/10">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
