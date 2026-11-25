import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, UserRound, LayoutDashboard, LogOut } from 'lucide-react'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'

const SECTIONS = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'cronograma', label: 'Cronograma' },
  { id: 'galeria', label: 'Galería' },
  { id: 'cumple', label: 'Cumpleaños' },
  { id: 'contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { user, isAdmin, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goToSection = (id: string) => {
    setOpen(false)
    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(scroll, 120)
    } else {
      scroll()
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-ink/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between sm:h-20">
        <Link to="/" onClick={() => window.scrollTo({ top: 0 })}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => goToSection(s.id)}
              className="text-sm font-medium text-white/70 transition hover:text-white"
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition hover:text-goldsoft"
                >
                  <LayoutDashboard className="h-4 w-4" /> Admin
                </Link>
              )}
              <Link to="/mi-cuenta" className="btn-ghost px-5 py-2 text-sm">
                <UserRound className="h-4 w-4" /> Mi cuenta
              </Link>
              <button
                onClick={() => signOut()}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-magenta hover:text-white"
                aria-label="Salir"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-white/80 transition hover:text-white">
                Ingresar
              </Link>
              <button onClick={() => goToSection('servicios')} className="btn-primary px-6 py-2.5 text-sm">
                Reservar
              </button>
            </>
          )}
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-white/10 bg-ink/95 backdrop-blur-xl lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => goToSection(s.id)}
                  className="rounded-xl px-3 py-3 text-left font-medium text-white/80 transition hover:bg-white/5"
                >
                  {s.label}
                </button>
              ))}
              <div className="my-2 h-px bg-white/10" />
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-semibold text-gold">
                      Panel Admin
                    </Link>
                  )}
                  <Link to="/mi-cuenta" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-medium text-white/80">
                    Mi cuenta
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      setOpen(false)
                    }}
                    className="rounded-xl px-3 py-3 text-left font-medium text-magenta"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <div className="flex gap-3 px-1 pt-1">
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-ghost flex-1 py-2.5 text-sm">
                    Ingresar
                  </Link>
                  <Link to="/registro" onClick={() => setOpen(false)} className="btn-primary flex-1 py-2.5 text-sm">
                    Crear cuenta
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
