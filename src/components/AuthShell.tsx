import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 py-28">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-neon/15 blur-[120px]" />
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="glass rounded-3xl p-8 shadow-card">
          <h1 className="title-display text-center text-4xl text-white">{title}</h1>
          {subtitle && <p className="mt-2 text-center text-sm text-white/55">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
        {footer && <div className="mt-5 text-center text-sm text-white/55">{footer}</div>}
      </div>
    </div>
  )
}
