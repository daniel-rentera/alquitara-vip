export interface GalleryPhoto {
  src: string
  label: string
  big?: boolean
}

// Fotos reales del Facebook de Alquitara VIP.
export const GALLERY: GalleryPhoto[] = [
  { src: '/img/fb-robot.jpg', label: 'Shows en vivo', big: true },
  { src: '/img/hit.jpg', label: 'Barra & tragos' },
  { src: '/img/dj.jpg', label: 'DJ en cabina' },
  { src: '/img/crowd.jpg', label: 'Pista llena' },
  { src: '/img/fb-dj.jpg', label: 'El show', big: true },
  { src: '/img/cocktail.jpg', label: 'Cócteles de autor' },
  { src: '/img/host.jpg', label: 'La barra' },
  { src: '/img/mascotas.jpg', label: 'Personajes' },
]
