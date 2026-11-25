// Datos reales de Alquitara VIP (de su web oficial y Facebook).
export const SITE = {
  name: 'Alquitara',
  nameVip: 'VIP',
  fullName: 'Alquitara VIP',
  tagline: 'El show que necesitas, la fiesta que mereces',
  season: 'Temporada 2026 · Alta Exclusividad',
  city: 'Cerro de Pasco, Perú',
  address: 'Jr. Crespo Castillo 200, esq. Ramón Castilla, San Juan, Cerro de Pasco',
  mapsQuery: 'Alquitara VIP, Jr. Crespo Castillo 200, Cerro de Pasco, Perú',
  phone: '953 393 308',
  reservasPhone: '+51 960 722 324',
  whatsapp: '51960722324', // sin + ni espacios, para wa.me
  days: 'Martes a domingo',
  hours: '5:00 pm – 5:00 am',
  ageNote: 'Ingreso solo +18, con DNI',
  legalName: 'Inversiones Tayapampa S.A.C.',
  ruc: '20607662097',
  followers: '2.5 mil',
  instagram: 'https://instagram.com/alquitaravip',
  instagramHandle: '@alquitaravip',
  tiktok: 'https://tiktok.com/@alquitaravip',
  tiktokHandle: '@alquitaravip',
  facebook: 'https://web.facebook.com/profile.php?id=61588473637368',
}

export const waLink = (msg: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`
