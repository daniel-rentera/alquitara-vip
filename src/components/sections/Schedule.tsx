import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Music2, CalendarCheck } from 'lucide-react'
import SectionTitle from '../SectionTitle'
import { useEvents } from '../../lib/data'
import { DAYS, DAYS_SHORT } from '../../lib/types'

export default function Schedule() {
  const { events, loading } = useEvents()
  const todayDow = new Date().getDay()

  // dias que tienen al menos un evento, ordenados
  const days = useMemo(() => {
    const set = Array.from(new Set(events.map((e) => e.day_of_week)))
    return set.sort((a, b) => a - b)
  }, [events])

  const [active, setActive] = useState<number | null>(null)
  const current = active ?? (days.includes(todayDow) ? todayDow : days[0]) ?? null
  const dayEvents = events.filter((e) => e.day_of_week === current)

  return (
    <section id="cronograma" className="relative py-24">
      <div className="container-x">
        <SectionTitle
          kicker="Cada noche, un plan"
          title="Cronograma semanal"
          subtitle="Martes a Domingo. Elige tu noche y asegura tu lugar."
        />

        {loading ? (
          <div className="h-48 animate-pulse rounded-3xl bg-white/5" />
        ) : (
          <>
            {/* Selector de dias */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {days.map((d) => {
                const isActive = d === current
                return (
                  <button
                    key={d}
                    onClick={() => setActive(d)}
                    className={`relative rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition ${
                      isActive ? 'text-white' : 'text-white/55 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="day-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-grape-gold shadow-neon"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    {DAYS_SHORT[d]}
                    {d === todayDow && (
                      <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Evento(s) del dia */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid gap-5 md:grid-cols-2"
              >
                {dayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-panel to-ink p-7 shadow-card"
                  >
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon/20 blur-3xl transition group-hover:bg-magenta/30" />
                    <div className="relative">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-gold">
                          {DAYS[ev.day_of_week]}
                        </span>
                        {ev.tag && (
                          <span className="chip">
                            <Music2 className="h-3 w-3" /> {ev.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="title-display text-3xl text-white">{ev.title}</h3>
                      {ev.description && (
                        <p className="mt-2 text-white/60">{ev.description}</p>
                      )}
                      <div className="mt-5 flex items-center gap-2 text-sm text-white/70">
                        <Clock className="h-4 w-4 text-neon" />
                        Open Door {ev.start_time ?? '16:00'}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/45">
              <CalendarCheck className="h-4 w-4 text-neon" />
              El administrador actualiza este cronograma cada semana.
            </div>
          </>
        )}
      </div>
    </section>
  )
}
