import { motion } from 'framer-motion'
import { Sparkles, Music4, Wine, ShieldCheck } from 'lucide-react'
import Reveal from '../Reveal'
import { SITE } from '../../lib/site'

const features = [
  { icon: Music4, title: 'Shows & DJ en vivo', text: 'La mejor música urbana y shows centrales cada fin de semana.' },
  { icon: Sparkles, title: 'Zona VIP', text: 'Boxes y mesas con atención preferente y la mejor vista a la pista.' },
  { icon: Wine, title: 'Cócteles de autor', text: 'Carta de tragos y cócteles especiales para cada noche.' },
  { icon: ShieldCheck, title: 'Ambiente seguro', text: 'Personal y seguridad para que solo pienses en disfrutar.' },
]

const stats = [
  { value: '6', label: 'Noches/semana' },
  { value: '4', label: 'Ambientes' },
  { value: '+18', label: 'Ingreso con DNI' },
]

export default function Experience() {
  return (
    <section id="experiencia" className="relative border-y border-white/10 bg-ink/40 py-24">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="chip mb-4">Bienvenido a la noche</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="title-display text-5xl text-white sm:text-6xl">
                Más que una disco, <span className="grad-text">una experiencia</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-white/60">
                {SITE.fullName} es el punto de encuentro de la mejor fiesta en {SITE.city}.
                Luces, música y energía para que cada noche sea inolvidable.
              </p>
            </Reveal>

            <div className="mt-8 flex gap-8">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.15 + i * 0.08}>
                  <div>
                    <div className="font-display text-4xl gold-text">{s.value}</div>
                    <div className="text-xs uppercase tracking-widest text-white/45">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 transition hover:border-neon/40"
              >
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-grape-gold shadow-neon">
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-xl text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm text-white/55">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
