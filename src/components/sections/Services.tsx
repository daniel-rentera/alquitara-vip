import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../SectionTitle'
import ReservationModal from '../ReservationModal'
import { SERVICES, type Service } from '../../lib/services'

export default function Services() {
  const [active, setActive] = useState<Service | null>(null)
  const [open, setOpen] = useState(false)

  const reserve = (s: Service) => {
    setActive(s)
    setOpen(true)
  }

  return (
    <section id="servicios" className="relative py-24">
      <div className="container-x">
        <SectionTitle
          kicker="Elige cómo vivir tu noche"
          title="Reserva tu experiencia"
          subtitle="Para el grupo que sale a bailar, para quien cumple años y para quien llega con su mesa separada."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 p-7 shadow-card"
            >
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
              <div className="absolute inset-0 bg-neon/0 transition duration-500 group-hover:bg-neon/10" />

              <div className="relative">
                <h3 className="font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-white/70">{s.description}</p>
                <button
                  onClick={() => reserve(s)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-grape-gold px-6 py-2.5 text-sm font-semibold text-white shadow-neon transition hover:gap-3"
                >
                  Reservar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ReservationModal
        open={open}
        onClose={() => setOpen(false)}
        mode={active?.mode ?? 'mesa'}
        serviceLabel={active?.label}
      />
    </section>
  )
}
