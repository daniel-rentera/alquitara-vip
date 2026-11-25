# 👑 Alquitara VIP — Sitio web

Sitio web moderno y responsivo para **Alquitara VIP**, discoteca en Cerro de Pasco, Perú.
*El show que necesitas, la fiesta que mereces.*

Hecho con **React + Vite + TypeScript + Tailwind CSS + Framer Motion**, con backend en **Supabase**.

## ✨ Qué incluye
- **Landing animada**: hero, cronograma semanal interactivo, promociones, galería, cumpleaños, ubicación con mapa.
- **Login/registro de usuarios** (Supabase Auth).
- **Reservas**: promos, mesas y cumpleaños — guardadas en la cuenta del usuario, con respaldo por WhatsApp.
- **Panel de usuario** (`/mi-cuenta`): ver y cancelar sus reservas.
- **Panel de administrador** (`/admin`): gestionar reservas, cronograma y promociones.
- **Diseño responsivo** (móvil, tablet, escritorio).

## 🏃 Correr en local
```bash
npm install
npm run dev
```
Abre http://localhost:5173

> Sin Supabase funciona en **modo demo** (datos reales de ejemplo, sin login/guardado).
> Para activarlo todo, sigue **`GUIA-SUPABASE.md`**.

## 🔧 Configurar Supabase
Ver **`GUIA-SUPABASE.md`** (crear proyecto, pegar `supabase/schema.sql`, poner credenciales en `.env`, hacerte admin).

## 🚀 Desplegar en tu subdominio
Ver **`GUIA-DESPLIEGUE.md`** (Netlify / Vercel + DNS del subdominio).

## 📸 Fotos reales de la galería
Coloca tus fotos en `public/gallery/` con los nombres `g1.jpg … g8.jpg`
(recomendado ~1200px, horizontales). Aparecen solas; si falta alguna, se muestra
una caja con la estética de la marca.

## 📁 Estructura
```
src/
  components/        UI (navbar, footer, modal, íconos…)
    sections/        Secciones del inicio (Hero, Schedule, Promos, Gallery…)
    admin/           Paneles del administrador
  context/           AuthContext (sesión y rol)
  lib/               supabase, tipos, datos (hooks), datos semilla, constantes
  pages/             Home, Login, Register, Dashboard, Admin
supabase/schema.sql  Esquema de base de datos (pégalo en Supabase)
```

## 📞 Datos del negocio
Edita **`src/lib/site.ts`** para cambiar teléfono, dirección, redes, horarios, etc.

---
Cerro de Pasco · Perú · © Alquitara VIP
