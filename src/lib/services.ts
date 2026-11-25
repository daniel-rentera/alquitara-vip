import type { ReservationType } from './types'

export interface Service {
  id: string
  title: string
  description: string
  image: string
  mode: ReservationType
  label: string
  tall?: boolean
}

// Servicios reales de Alquitara VIP (de su web oficial). Sin precios: se reserva.
export const SERVICES: Service[] = [
  {
    id: 'noches',
    title: 'Noches de Discoteca',
    description: 'Pista de baile, DJ en cabina, luces LED y una barra que no para. El punto de encuentro para salir de noche en Cerro de Pasco.',
    image: '/img/dj.jpg',
    mode: 'mesa',
    label: 'Noche de Discoteca',
    tall: true,
  },
  {
    id: 'cumple',
    title: 'Cumpleaños & Celebraciones',
    description: 'Celebra tu cumpleaños en la disco: espacio decorado, torta, fotos y toda tu gente en un solo lugar.',
    image: '/img/cumple.jpg',
    mode: 'cumple',
    label: 'Cumpleaños',
  },
  {
    id: 'mesas',
    title: 'Mesas & Boxes',
    description: 'Asegura tu sitio antes de llegar. Reserva una mesa o un box para tu grupo y entra directo a disfrutar.',
    image: '/img/bottles.jpg',
    mode: 'mesa',
    label: 'Mesa o Box',
  },
  {
    id: 'eventos',
    title: 'Eventos Privados & Activaciones',
    description: 'El local para tu evento: fiestas privadas, celebraciones de empresa y activaciones de marca con público real.',
    image: '/img/mascotas.jpg',
    mode: 'mesa',
    label: 'Evento Privado',
  },
]
