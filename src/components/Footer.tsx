import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock } from 'lucide-react'
import { InstagramIcon, FacebookIcon, TikTokIcon } from './BrandIcons'
import Logo from './Logo'
import { SITE } from '../lib/site'

export default function Footer() {
  return (
    <footer id="contacto" className="relative z-[2] border-t border-white/10 bg-ink/60">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-white/55">{SITE.tagline}.</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-gold">
            {SITE.season}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/80">
            Visítanos
          </h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-neon" /> {SITE.address}
            </li>
            <li className="flex gap-2">
              <Clock className="h-4 w-4 shrink-0 text-neon" /> {SITE.days} · {SITE.hours}
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 text-neon" /> {SITE.phone}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/80">
            Explora
          </h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li><a href="#cronograma" className="transition hover:text-white">Cronograma semanal</a></li>
            <li><a href="#promos" className="transition hover:text-white">Promociones</a></li>
            <li><a href="#cumple" className="transition hover:text-white">Reserva de cumpleaños</a></li>
            <li><Link to="/mi-cuenta" className="transition hover:text-white">Mi cuenta</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/80">
            Síguenos
          </h4>
          <div className="flex gap-3">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/80 transition hover:border-magenta hover:text-white hover:shadow-neon-pink"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/80 transition hover:border-neon hover:text-white hover:shadow-neon"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={SITE.tiktok}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/80 transition hover:border-pinky hover:text-white hover:shadow-neon-pink"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-4 text-sm text-white/50">{SITE.instagramHandle}</p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-x flex flex-col items-center gap-3 text-center text-xs text-white/40">
          <p className="chip border-gold/40 bg-gold/10 text-gold">{SITE.ageNote}</p>
          <div className="flex flex-col items-center justify-between gap-1 sm:flex-row sm:gap-2 w-full">
            <p>© {new Date().getFullYear()} {SITE.fullName} · {SITE.city}</p>
            <p>{SITE.legalName} · RUC {SITE.ruc}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
