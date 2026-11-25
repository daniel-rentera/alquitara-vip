import { Crown } from 'lucide-react'
import { SITE } from '../lib/site'

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2 select-none">
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-grape-gold shadow-neon">
        <Crown className="h-5 w-5 text-white" strokeWidth={2.4} />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-brush text-xl leading-none text-white">
            {SITE.name}
            <span className="gold-text"> {SITE.nameVip}</span>
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
            Discoteca
          </span>
        </span>
      )}
    </span>
  )
}
