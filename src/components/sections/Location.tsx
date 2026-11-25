import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react'
import Reveal from '../Reveal'
import SectionTitle from '../SectionTitle'
import { SITE, waLink } from '../../lib/site'

export default function Location() {
  return (
    <section id="ubicacion" className="relative py-24">
      <div className="container-x">
        <SectionTitle kicker="Te esperamos" title="¿Dónde estamos?" />

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="glass flex h-full flex-col justify-center gap-6 rounded-3xl p-8">
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-neon/15 text-neon">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Dirección</h4>
                  <p className="text-sm text-white/60">{SITE.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-neon/15 text-neon">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Horario</h4>
                  <p className="text-sm text-white/60">{SITE.days} · {SITE.hours}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-neon/15 text-neon">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Reservas</h4>
                  <p className="text-sm text-white/60">{SITE.reservasPhone}</p>
                </div>
              </div>

              <a
                href={waLink('Hola Alquitara VIP 👑, quiero hacer una reserva.')}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-2 w-full"
              >
                <MessageCircle className="h-5 w-5" /> Escríbenos por WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="h-full min-h-[320px] overflow-hidden rounded-3xl border border-white/10">
              <iframe
                title="Ubicación Alquitara VIP"
                src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`}
                className="h-full min-h-[320px] w-full grayscale-[0.3]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
