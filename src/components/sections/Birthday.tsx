import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cake, Gift, Mic2, GlassWater } from 'lucide-react'
import ReservationModal from '../ReservationModal'

const perks = [
  { icon: Gift, text: 'Ingreso gratis del cumpleañero/a' },
  { icon: Cake, text: 'Torta y brindis de cortesía' },
  { icon: Mic2, text: 'Mención especial del DJ' },
  { icon: GlassWater, text: 'Zona reservada para tu grupo' },
]

export default function Birthday() {
  const [open, setOpen] = useState(false)

  return (
    <section id="cumple" className="relative py-24">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-panel2 via-ink to-ink p-8 shadow-card sm:p-14"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-magenta/25 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-neon/20 blur-[100px]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="chip mb-4">
                <Cake className="h-3.5 w-3.5" /> Tu día, a lo grande
              </span>
              <h2 className="title-display text-5xl text-white sm:text-6xl">
                Celebra tu <span className="grad-text">cumpleaños</span> en Alquitara VIP
              </h2>
              <p className="mt-4 max-w-md text-white/60">
                Reserva en segundos y nosotros nos encargamos del resto. La noche
                perfecta para ti y tu gente, con todo listo para celebrar.
              </p>
              <button onClick={() => setOpen(true)} className="btn-primary mt-7 text-base">
                <Cake className="h-5 w-5" /> Reservar mi cumpleaños
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {perks.map((p, i) => (
                <motion.div
                  key={p.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5"
                >
                  <p.icon className="mb-3 h-7 w-7 text-gold" />
                  <p className="text-sm font-medium text-white/85">{p.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <ReservationModal open={open} onClose={() => setOpen(false)} mode="cumple" />
    </section>
  )
}
