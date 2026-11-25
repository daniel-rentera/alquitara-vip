import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Loader2, Phone, PartyPopper } from 'lucide-react'
import Modal from './Modal'
import { useAuth } from '../context/AuthContext'
import { createReservation } from '../lib/data'
import { waLink } from '../lib/site'
import type { Promo, ReservationType } from '../lib/types'

interface Props {
  open: boolean
  onClose: () => void
  mode: ReservationType
  promo?: Promo | null
  serviceLabel?: string
}

const TITLES: Record<ReservationType, string> = {
  promo: 'Reservar promoción',
  cumple: 'Reservar cumpleaños',
  mesa: 'Reservar mesa',
}

export default function ReservationModal({ open, onClose, mode, promo, serviceLabel }: Props) {
  const { user, profile, configured } = useAuth()
  const today = new Date().toISOString().slice(0, 10)

  const [date, setDate] = useState(today)
  const [guests, setGuests] = useState(mode === 'cumple' ? 8 : 2)
  const [phone, setPhone] = useState(profile?.phone ?? '')
  const [celebrant, setCelebrant] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const waMessage = () => {
    const what = serviceLabel
      ? `reservar: ${serviceLabel}`
      : mode === 'cumple'
        ? 'reservar un cumpleaños'
        : mode === 'mesa'
          ? 'reservar una mesa'
          : `la promo "${promo?.title}"`
    const base = `Hola Alquitara VIP 👑, quiero ${what}.`
    return waLink(
      `${base}\n📅 Fecha: ${date}\n👥 Personas: ${guests}${
        mode === 'cumple' && celebrant ? `\n🎂 Cumpleañero/a: ${celebrant}` : ''
      }${notes ? `\n📝 ${notes}` : ''}`,
    )
  }

  const submit = async () => {
    setError(null)
    setLoading(true)
    const { error } = await createReservation({
      user_id: user!.id,
      type: mode,
      promo_id: promo?.id ?? null,
      event_id: null,
      date,
      guests,
      celebrant_name: mode === 'cumple' ? celebrant : null,
      contact_phone: phone,
      notes: notes || null,
    })
    setLoading(false)
    if (error) setError(error)
    else setDone(true)
  }

  const reset = () => {
    setDone(false)
    setError(null)
    onClose()
  }

  return (
    <Modal open={open} onClose={reset} title={serviceLabel ? `Reservar · ${serviceLabel}` : TITLES[mode]}>
      {done ? (
        <div className="py-4 text-center">
          <CheckCircle2 className="mx-auto mb-3 h-14 w-14 text-emerald-400" />
          <h4 className="title-display text-2xl text-white">¡Reserva registrada!</h4>
          <p className="mt-2 text-white/60">
            La guardamos como <b>pendiente</b>. Te contactaremos para confirmarla, o
            escríbenos ya por WhatsApp para asegurarla.
          </p>
          <a href={waMessage()} target="_blank" rel="noreferrer" className="btn-primary mt-5 w-full">
            <Phone className="h-4 w-4" /> Confirmar por WhatsApp
          </a>
          <button onClick={reset} className="mt-3 text-sm text-white/50 hover:text-white">
            Cerrar
          </button>
        </div>
      ) : !user ? (
        <div className="py-2 text-center">
          <PartyPopper className="mx-auto mb-3 h-12 w-12 text-gold" />
          <p className="text-white/70">
            Inicia sesión para guardar tu reserva y ver tu historial. ¿Prefieres ir directo?
            También puedes reservar por WhatsApp.
          </p>
          <div className="mt-5 grid gap-3">
            <Link to="/login" onClick={onClose} className="btn-primary w-full">
              Iniciar sesión
            </Link>
            <Link to="/registro" onClick={onClose} className="btn-ghost w-full">
              Crear cuenta
            </Link>
            <a href={waMessage()} target="_blank" rel="noreferrer" className="text-sm text-white/50 hover:text-white">
              o reservar por WhatsApp →
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {promo && (
            <div className="rounded-xl border border-neon/30 bg-neon/10 p-3 text-sm">
              <span className="font-semibold text-white">{promo.title}</span>
              {promo.price != null && (
                <span className="float-right font-bold gold-text">S/ {promo.price}</span>
              )}
            </div>
          )}

          {mode === 'cumple' && (
            <div>
              <label className="label">Nombre del cumpleañero/a</label>
              <input
                className="input"
                value={celebrant}
                onChange={(e) => setCelebrant(e.target.value)}
                placeholder="Ej. Yarumy"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Fecha</label>
              <input type="date" min={today} className="input" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label className="label">Personas</label>
              <input
                type="number"
                min={1}
                max={40}
                className="input"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="label">Teléfono de contacto</label>
            <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9XX XXX XXX" />
          </div>

          <div>
            <label className="label">Notas (opcional)</label>
            <textarea
              className="input min-h-[72px] resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej. llegamos 10pm, mesa cerca a la pista…"
            />
          </div>

          {!configured && (
            <p className="rounded-lg border border-gold/30 bg-gold/10 p-2.5 text-xs text-gold">
              Modo demo: conecta Supabase para guardar reservas. Mientras tanto usa WhatsApp.
            </p>
          )}
          {error && <p className="text-sm text-magenta">{error}</p>}

          <div className="grid gap-3 pt-1 sm:grid-cols-2">
            <button onClick={submit} disabled={loading || !configured} className="btn-primary w-full disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Guardar reserva'}
            </button>
            <a href={waMessage()} target="_blank" rel="noreferrer" className="btn-ghost w-full">
              <Phone className="h-4 w-4" /> Por WhatsApp
            </a>
          </div>
        </div>
      )}
    </Modal>
  )
}
