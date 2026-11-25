import { motion } from 'framer-motion'
import { Clock, MapPin, CalendarDays, Sparkles, ChevronDown } from 'lucide-react'
import { SITE } from '../../lib/site'
import { EASE_OUT } from '../../lib/motion'
import Marquee from '../Marquee'

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24">
      {/* Foto real del local + orbes animados de fondo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-30">
          <img src="/img/fb-robot.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
        <div className="absolute -top-24 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-neon/20 blur-[120px]" />
        <motion.div
          className="absolute left-[8%] top-1/3 h-72 w-72 rounded-full bg-magenta/25 blur-[90px]"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[10%] top-1/2 h-64 w-64 rounded-full bg-gold/15 blur-[90px]"
          animate={{ y: [0, -26, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-x flex flex-col items-center text-center"
      >
        <motion.span variants={item} className="chip mb-6">
          <Sparkles className="h-3.5 w-3.5" /> {SITE.season}
        </motion.span>

        <motion.h1
          variants={item}
          className="font-brush text-[15vw] leading-[1.02] text-white sm:text-[8.5rem] md:text-[10rem]"
        >
          <span className="text-glow">{SITE.name}</span>
          <span className="block gold-text drop-shadow-[0_0_30px_rgba(245,197,66,0.35)]">
            {SITE.nameVip}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-3 max-w-xl font-serif text-xl italic text-white/75 sm:text-2xl"
        >
          “{SITE.tagline}”
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button onClick={() => scrollTo('servicios')} className="btn-primary text-base">
            Reservar ahora
          </button>
          <button onClick={() => scrollTo('cronograma')} className="btn-ghost text-base">
            Ver cronograma
          </button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/70"
        >
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-neon" /> {SITE.days}
          </span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-neon" /> {SITE.hours}
          </span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-neon" /> {SITE.city}
          </span>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollTo('cronograma')}
        className="mx-auto mt-12 mb-4 text-white/40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-label="Bajar"
      >
        <ChevronDown className="h-7 w-7" />
      </motion.button>

      <Marquee
        items={[
          'Alta Exclusividad',
          'Shows en vivo',
          'DJ · Música urbana',
          'Zona VIP',
          'Resuaca Fest',
          'Cumpleaños',
        ]}
      />
    </section>
  )
}
