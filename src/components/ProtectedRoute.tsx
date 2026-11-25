import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader2, ShieldAlert } from 'lucide-react'

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: {
  children: ReactNode
  requireAdmin?: boolean
}) {
  const { user, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-neon" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="container-x grid min-h-[60vh] place-items-center text-center">
        <div className="glass max-w-md rounded-3xl p-10">
          <ShieldAlert className="mx-auto mb-4 h-12 w-12 text-gold" />
          <h2 className="title-display text-3xl text-white">Zona solo para admins</h2>
          <p className="mt-2 text-white/60">
            Esta sección es exclusiva del administrador de Alquitara VIP.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
