export type Role = 'user' | 'admin'

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  role: Role
  created_at: string
}

/** Un evento del cronograma semanal (una noche tematica). */
export interface EventItem {
  id: string
  title: string
  description: string | null
  day_of_week: number // 0=Dom ... 6=Sab
  start_time: string | null // "16:00"
  image_url: string | null
  tag: string | null // ej. "Show en vivo", "Dj"
  is_active: boolean
  created_at: string
}

/** Una promocion que el usuario puede adquirir/reservar. */
export interface Promo {
  id: string
  title: string
  description: string | null
  price: number | null
  old_price: number | null
  image_url: string | null
  includes: string[] | null
  badge: string | null // ej. "TOP", "2x1"
  is_active: boolean
  created_at: string
}

export type ReservationType = 'promo' | 'cumple' | 'mesa'
export type ReservationStatus = 'pendiente' | 'confirmada' | 'cancelada'

export interface Reservation {
  id: string
  user_id: string
  type: ReservationType
  promo_id: string | null
  event_id: string | null
  date: string // ISO date
  guests: number
  celebrant_name: string | null
  contact_phone: string | null
  notes: string | null
  status: ReservationStatus
  created_at: string
  // joins (opcionales)
  promo?: Pick<Promo, 'title'> | null
  profile?: Pick<Profile, 'full_name'> | null
}

export const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
export const DAYS_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
