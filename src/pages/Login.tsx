import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import AuthShell from '../components/AuthShell'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signIn, configured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from ?? '/mi-cuenta'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) setError(error)
    else navigate(from, { replace: true })
  }

  return (
    <AuthShell
      title="Ingresar"
      subtitle="Accede para ver tus reservas y promos"
      footer={
        <>
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="font-semibold text-pinky hover:text-white">
            Crear cuenta
          </Link>
        </>
      }
    >
      {!configured && (
        <p className="mb-4 rounded-lg border border-gold/30 bg-gold/10 p-3 text-xs text-gold">
          Supabase aún no está conectado. Configúralo para habilitar el login (ver GUIA-SUPABASE.md).
        </p>
      )}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="label">Correo</label>
          <input
            type="email"
            required
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
          />
        </div>
        <div>
          <label className="label">Contraseña</label>
          <input
            type="password"
            required
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-sm text-magenta">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Entrar'}
        </button>
      </form>
    </AuthShell>
  )
}
