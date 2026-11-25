# 🔌 Guía para conectar Supabase (paso a paso)

Supabase le da al sitio: **login de usuarios, reservas guardadas y el panel de administrador**.
Es gratis para empezar. Sigue estos pasos (±10 min).

---

## 1) Crear el proyecto

1. Entra a **https://supabase.com** → **Start your project** → inicia sesión con GitHub o correo.
2. **New project**.
   - **Name:** `alquitara-vip`
   - **Database Password:** crea una fuerte y **guárdala** (la necesitarás para la BD, no para el sitio).
   - **Region:** elige **South America (São Paulo)** (lo más cercano a Perú).
3. Click **Create new project** y espera ~2 minutos a que se aprovisione.

## 2) Crear las tablas (pegar el SQL)

1. En el menú izquierdo: **SQL Editor** → **New query**.
2. Abre el archivo **`supabase/schema.sql`** de este proyecto, **copia TODO** y pégalo.
3. Click **Run** (▶). Debe decir *Success*. Esto crea las tablas, la seguridad (RLS),
   el almacenamiento de fotos y carga el cronograma y promos iniciales.

## 3) Copiar tus credenciales

1. Menú izquierdo: **Project Settings** (engranaje) → **Data API**.
   - Copia la **Project URL** (ej. `https://abcd1234.supabase.co`).
2. En **Project Settings → API Keys**.
   - Copia la **`anon` `public`** key (es larga). ⚠️ Usa la *anon*, **no** la *service_role*.
   - La anon key es **pública y segura** para el frontend.

## 4) Pegar las credenciales en el sitio

Abre el archivo **`.env`** en la raíz del proyecto y pégalas:

```
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi... (tu anon key)
```

Guarda. Si el sitio está corriendo, **detén y vuelve a iniciar** `npm run dev`
(los `.env` se leen al arrancar).

## 5) Habilitar registro por correo

1. Supabase → **Authentication** → **Providers** → **Email**: debe estar **activado**.
2. (Recomendado para pruebas) **Authentication → Providers → Email** → desactiva
   *"Confirm email"* para poder entrar sin confirmar el correo. En producción, déjalo activado.

## 6) Hacerte administrador 👑

1. En el sitio, ve a **Crear cuenta** y regístrate con **tu** correo.
2. Vuelve a Supabase → **SQL Editor** → **New query**, pega esto con tu correo y **Run**:

```sql
-- Seguridad: nadie puede auto-ascenderse a admin desde el frontend
revoke update (role) on public.profiles from authenticated, anon;

-- Hazte admin (cambia el correo por el tuyo)
update public.profiles set role = 'admin'
where id = (select id from auth.users where email = 'TU-CORREO@ejemplo.com');
```

3. Cierra sesión y vuelve a entrar. Verás el botón **Admin** en el menú.

---

## ✅ Listo

- Los usuarios pueden registrarse, reservar promos y cumpleaños, y ver su historial.
- Tú (admin) gestionas **reservas, cronograma y promos** desde `/admin`.

### Subir fotos reales
En **Storage → media** puedes subir fotos. Para la galería del inicio, también puedes
colocar imágenes en `public/gallery/` como `g1.jpg … g8.jpg` (ver `README.md`).
