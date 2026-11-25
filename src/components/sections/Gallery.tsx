import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../SectionTitle'
import Modal from '../Modal'
import { InstagramIcon } from '../BrandIcons'
import { GALLERY } from '../../lib/gallery'
import { SITE } from '../../lib/site'

export default function Gallery() {
  const [zoom, setZoom] = useState<number | null>(null)

  return (
    <section id="galeria" className="relative py-24">
      <div className="container-x">
        <SectionTitle
          kicker="Así se vive la noche"
          title="Galería"
          subtitle="Noches de show, cumpleaños y la mejor energía de Cerro de Pasco."
        />

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {GALLERY.map((g, i) => (
            <motion.button
              key={i}
              onClick={() => setZoom(i)}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-panel ${
                g.big ? 'row-span-2' : ''
              }`}
            >
              <img
                src={g.src}
                alt={g.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition group-hover:from-black/50" />
              <span className="absolute bottom-3 left-3 right-3 text-left font-display text-lg uppercase leading-tight tracking-wide text-white drop-shadow">
                {g.label}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href={SITE.instagram} target="_blank" rel="noreferrer" className="btn-ghost">
            <InstagramIcon className="h-4 w-4" /> Ver más en Instagram
          </a>
        </div>
      </div>

      <Modal open={zoom !== null} onClose={() => setZoom(null)} title={zoom !== null ? GALLERY[zoom].label : ''}>
        {zoom !== null && (
          <div className="overflow-hidden rounded-2xl">
            <img src={GALLERY[zoom].src} alt={GALLERY[zoom].label} className="max-h-[70vh] w-full object-contain" />
          </div>
        )}
      </Modal>
    </section>
  )
}
