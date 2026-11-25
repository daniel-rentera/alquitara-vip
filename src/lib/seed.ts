import type { EventItem, Promo } from './types'

// Contenido REAL de ejemplo (de la pagina de Facebook). Se usa en modo DEMO
// y como datos iniciales que puedes cargar en Supabase desde el panel admin.

export const SEED_EVENTS: EventItem[] = [
  {
    id: 'e-mar',
    title: 'Martes de Reapertura',
    description: 'Arranca la semana con los mejores tragos y la mejor música urbana.',
    day_of_week: 2,
    start_time: '16:00',
    tag: 'Open Door 4PM',
    image_url: null,
    is_active: true,
    created_at: '',
  },
  {
    id: 'e-mie',
    title: 'Miércoles de Damas',
    description: 'Noche especial para ellas. Cortesías y shows sorpresa.',
    day_of_week: 3,
    start_time: '16:00',
    tag: 'Ladies Night',
    image_url: null,
    is_active: true,
    created_at: '',
  },
  {
    id: 'e-jue',
    title: 'Jueves de Karaoke & Tragos',
    description: 'Canta tus temas favoritos y gana cócteles.',
    day_of_week: 4,
    start_time: '16:00',
    tag: 'Karaoke',
    image_url: null,
    is_active: true,
    created_at: '',
  },
  {
    id: 'e-vie',
    title: 'Viernes de Reventón',
    description: 'DJ en vivo, luces y la mejor vibra para cerrar la semana.',
    day_of_week: 5,
    start_time: '16:00',
    tag: 'DJ en vivo',
    image_url: null,
    is_active: true,
    created_at: '',
  },
  {
    id: 'e-sab',
    title: 'Sábado "Del Frío" · Show Central',
    description: 'El evento más esperado: show central, invitados y sorpresas.',
    day_of_week: 6,
    start_time: '16:00',
    tag: 'Show en vivo',
    image_url: null,
    is_active: true,
    created_at: '',
  },
  {
    id: 'e-dom',
    title: 'Resuaca Fest',
    description:
      'Donde el oso pone la actitud y tú pones el descontrol. Carta dominguera, cócteles especiales y premios al look más destruido.',
    day_of_week: 0,
    start_time: '16:00',
    tag: 'Domingos',
    image_url: null,
    is_active: true,
    created_at: '',
  },
]

// Las promos de la semana se cargan desde el panel admin (vacío por defecto).
export const SEED_PROMOS: Promo[] = []

// Etiquetas para la galeria en modo DEMO (se reemplazan con fotos reales).
export const SEED_GALLERY: { label: string; accent: string }[] = [
  { label: 'Noche de Shows', accent: 'from-neon to-magenta' },
  { label: 'Zona VIP', accent: 'from-magenta to-gold' },
  { label: 'Cumpleaños', accent: 'from-grape to-neon' },
  { label: 'DJ en vivo', accent: 'from-magenta to-grape' },
  { label: 'Resuaca Fest', accent: 'from-neon to-gold' },
  { label: 'La Barra', accent: 'from-grape to-magenta' },
  { label: 'Pista llena', accent: 'from-neon to-pinky' },
  { label: 'Ambiente', accent: 'from-magenta to-neon' },
]
