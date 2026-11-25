# 🚀 Guía de despliegue en tu subdominio

Objetivo: publicar el sitio en un subdominio tuyo, ej. **`reservas.tudominio.com`**
o **`discoteca.tudominio.com`**.

Recomendado: **Netlify** (gratis, fácil, ya lo usas). Abajo también Vercel.

---

## Opción A — Netlify (recomendada)

### 1. Sube el proyecto a GitHub (recomendado)
```bash
git init
git add .
git commit -m "Alquitara VIP"
```
Crea un repo en github.com y sigue sus instrucciones para `git push`.

> ¿Sin GitHub? Puedes arrastrar la carpeta `dist/` (luego de `npm run build`)
> a https://app.netlify.com/drop, pero con GitHub tienes despliegue automático.

### 2. Conecta en Netlify
1. https://app.netlify.com → **Add new site → Import an existing project** → GitHub → elige el repo.
2. Build settings (ya vienen en `netlify.toml`, confírmalos):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. **Environment variables** (importante): **Site settings → Environment variables → Add**:
   - `VITE_SUPABASE_URL` = tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY` = tu anon key
4. **Deploy site**.

### 3. Conecta tu subdominio
1. Netlify → **Domain management → Add a domain** → escribe `reservas.tudominio.com`.
2. Netlify te dará un destino **CNAME** (ej. `tu-sitio.netlify.app`).
3. Entra al panel de tu dominio (donde lo compraste: GoDaddy, Namecheap, etc.) →
   **DNS** → agrega un registro:
   - **Tipo:** `CNAME`
   - **Nombre/Host:** `reservas` (solo el subdominio)
   - **Valor/Destino:** `tu-sitio.netlify.app`
4. Espera a que propague (minutos a 1–2 h). Netlify emite el **HTTPS** automático.

---

## Opción B — Vercel
1. https://vercel.com → **Add New → Project** → importa el repo de GitHub.
2. Framework: **Vite**. (El `vercel.json` ya maneja las rutas SPA.)
3. **Environment Variables:** agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
4. **Deploy**. Luego **Settings → Domains** → agrega `reservas.tudominio.com` y crea el CNAME que te indique.

---

## ⚠️ Antes de publicar
- En **Supabase → Authentication → URL Configuration**, agrega tu dominio final
  (ej. `https://reservas.tudominio.com`) en **Site URL** y **Redirect URLs**.
- Verifica que las variables de entorno estén cargadas en el hosting (no en `.env`, que no se sube).

## 🔁 Actualizaciones
Cada `git push` a la rama principal vuelve a desplegar solo. El contenido (promos,
cronograma, reservas) se gestiona desde `/admin`, **sin** volver a desplegar.
