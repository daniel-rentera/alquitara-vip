import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarCog, Ticket, ClipboardList } from 'lucide-react'
import AdminReservations from '../components/admin/AdminReservations'
import AdminEvents from '../components/admin/AdminEvents'
import AdminPromos from '../components/admin/AdminPromos'
import { useAuth } from '../context/AuthContext'

const TABS = [
  { id: 'reservas', label: 'Reservas', icon: ClipboardList },
  { id: 'cronograma', label: 'Cronograma', icon: CalendarCog },
  { id: 'promos', label: 'Promociones', icon: Ticket },
] as const

export default function Admin() {
  const { profile } = useAuth()
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('reservas')

  return (
    <div className="container-x py-28">
      <div className="mb-8">
        <span className="chip mb-3">Panel de administración</span>
        <h1 className="title-display text-5xl text-white sm:text-6xl">
          Hola, <span className="grad-text">{profile?.full_name ?? 'Admin'}</span>
        </h1>
        <p className="mt-2 text-white/55">Gestiona reservas, cronograma y promociones de Alquitara VIP.</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                active ? 'text-white' : 'text-white/55 hover:text-white'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="admin-tab"
                  className="absolute inset-0 -z-10 rounded-full bg-grape-gold shadow-neon"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          )
        })}
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {tab === 'reservas' && <AdminReservations />}
        {tab === 'cronograma' && <AdminEvents />}
        {tab === 'promos' && <AdminPromos />}
      </motion.div>
    </div>
  )
}
