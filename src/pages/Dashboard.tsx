import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Users, Cake, Ticket, Loader2, PartyPopper, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import type { Reservation } from '../lib/types'

const STATUS_STYLE: Record<string, string> = {
  pendiente: 'border-gold/40 bg-gold/10 text-gold',
  confirmada: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
  cancelada: 'border-white/15 bg-white/5 text-white/40',
}
const TYPE_ICON = { promo: Ticket, cumple: Cake, mesa: Users }
const TYPE_LABEL = { promo: 'Promoción', cumple: 'Cumpleaños', mesa: 'Mesa' }

export default function Dashboard() {
  const { profile, user, configured } = useAuth()
  const [items, setItems] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!supabase || !user) {
      setLoading(false)
      return
    }
    setLoading(true)
    const { data } = await supabase
      .from('reservations')
      .select('*, promo:promos(title)')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
    setItems((data as Reservation[]) ?? [])
    setLoading(false)
  }, [user])

  useEffect(() => {
    load()
  }, [load])

  const cancel = async (id: string) => {
    if (!supabase) return
    await supabase.from('reservations').update({ status: 'cancelada' }).eq('id', id)
    load()
  }

  return (
    <div className="container-x py-28">
      <div className="mb-10">
        <span className="chip mb-3">Mi cuenta</span>
        <h1 className="title-display text-5xl text-white sm:text-6xl">
          Hola, <span className="grad-text">{profile?.full_name ?? 'crack'}</span> 👋
        </h1>
        <p className="mt-2 text-white/55">Aquí ves y gestionas todas tus reservas.</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <Link to="/#servicios" className="btn-primary">
          <Ticket className="h-4 w-4" /> Reservar
        </Link>
        <Link to="/#cumple" className="btn-ghost">
          <Cake className="h-4 w-4" /> Reservar cumpleaños
        </Link>
      </div>

      {!configured ? (
        <div className="glass rounded-3xl p-10 text-center text-white/60">
          Conecta Supabase para ver tus reservas guardadas.
        </div>
      ) : loading ? (
        <div className="grid min-h-[30vh] place-items-center">
          <Loader2 className="h-8 w-8 animate-spin text-neon" />
        </div>
      ) : items.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <PartyPopper className="mx-auto mb-4 h-12 w-12 text-gold" />
          <h3 className="title-display text-2xl text-white">Aún no tienes reservas</h3>
          <p className="mt-2 text-white/55">¡Reserva tu primera promo y empieza la fiesta!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((r) => {
            const Icon = TYPE_ICON[r.type]
            return (
              <div key={r.id} className="glass flex items-start gap-4 rounded-2xl p-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-grape-gold shadow-neon">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-white">
                      {r.promo?.title ?? TYPE_LABEL[r.type]}
                    </h4>
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLE[r.status]}`}>
                      {r.status}
                    </span>
                  </div>
                  {r.celebrant_name && (
                    <p className="text-sm text-pinky">🎂 {r.celebrant_name}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/55">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" /> {r.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> {r.guests} pers.
                    </span>
                  </div>
                  {r.notes && <p className="mt-2 text-xs text-white/40">“{r.notes}”</p>}
                  {r.status !== 'cancelada' && (
                    <button
                      onClick={() => cancel(r.id)}
                      className="mt-3 inline-flex items-center gap-1 text-xs text-white/40 transition hover:text-magenta"
                    >
                      <X className="h-3.5 w-3.5" /> Cancelar reserva
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
