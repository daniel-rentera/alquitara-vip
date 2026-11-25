import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, MailCheck } from 'lucide-react'
import AuthShell from '../components/AuthShell'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { signUp, configured } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    setLoading(true)
    const { error } = await signUp(email, password, fullName, phone)
    setLoading(false)
    if (error) setError(error)
    else setDone(true)
  }

  if (done) {
    return (
      <AuthShell title="¡Casi listo!" subtitle="Tu cuenta fue creada">
        <div className="text-center">
          <MailCheck className="mx-auto mb-3 h-14 w-14 text-emerald-400" />
          <p className="text-white/70">
            Si tu proyecto pide confirmación por correo, revisa tu bandeja. Luego
            inicia sesión para empezar a reservar.
          </p>
          <button onClick={() => navigate('/login')} className="btn-primary mt-5 w-full">
            Ir a iniciar sesión
          </button>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="Crear cuenta"
      subtitle="Regístrate para reservar tus promos y cumpleaños"
      footer={
        <>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-semibold text-pinky hover:text-white">
            Ingresar
          </Link>
        </>
      }
    >
      {!configured && (
        <p className="mb-4 rounded-lg border border-gold/30 bg-gold/10 p-3 text-xs text-gold">
          Supabase aún no está conectado. Configúralo para habilitar el registro (ver GUIA-SUPABASE.md).
        </p>
      )}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="label">Nombre completo</label>
          <input required className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Tu nombre" />
        </div>
        <div>
          <label className="label">Teléfono</label>
          <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9XX XXX XXX" />
        </div>
        <div>
          <label className="label">Correo</label>
          <input type="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" />
        </div>
        <div>
          <label className="label">Contraseña</label>
          <input type="password" required className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
        </div>
        {error && <p className="text-sm text-magenta">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Crear mi cuenta'}
        </button>
      </form>
    </AuthShell>
  )
}
