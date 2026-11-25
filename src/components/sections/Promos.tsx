import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import SectionTitle from '../SectionTitle'
import ReservationModal from '../ReservationModal'
import { usePromos } from '../../lib/data'
import type { Promo } from '../../lib/types'

export default function Promos() {
  const { promos, loading } = usePromos()
  const [selected, setSelected] = useState<Promo | null>(null)
  const [open, setOpen] = useState(false)

  const reserve = (p: Promo) => {
    setSelected(p)
    setOpen(true)
  }

  // Solo se muestra si el admin ha cargado promos activas.
  if (!loading && promos.length === 0) return null

  return (
    <section id="promos" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-night-fade" />
      <div className="container-x">
        <SectionTitle
          kicker="Por tiempo limitado"
          title="Promos de la semana"
          subtitle="Ofertas especiales que cambian cada semana. ¡Aprovéchalas!"
        />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promos.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-panel2 to-ink p-6 shadow-card transition hover:border-neon/50 hover:shadow-neon"
              >
                {p.badge && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-grape-gold px-3 py-1 text-xs font-bold uppercase text-white shadow-neon">
                    {p.badge === 'TOP' && <Star className="h-3 w-3" />}
                    {p.badge}
                  </span>
                )}

                <h3 className="mt-2 max-w-[80%] font-display text-2xl leading-tight text-white">
                  {p.title}
                </h3>
                {p.description && (
                  <p className="mt-2 text-sm text-white/55">{p.description}</p>
                )}

                <div className="mt-4 flex items-end gap-2">
                  {p.price != null ? (
                    <>
                      <span className="font-display text-4xl gold-text">S/ {p.price}</span>
                      {p.old_price != null && (
                        <span className="mb-1 text-sm text-white/40 line-through">S/ {p.old_price}</span>
                      )}
                    </>
                  ) : (
                    <span className="font-display text-2xl text-white">Consultar</span>
                  )}
                </div>

                {p.includes && p.includes.length > 0 && (
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-sm text-white/70">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                )}

                <button onClick={() => reserve(p)} className="btn-primary mt-6 w-full">
                  Reservar
                </button>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <ReservationModal open={open} onClose={() => setOpen(false)} mode="promo" promo={selected} />
    </section>
  )
}
