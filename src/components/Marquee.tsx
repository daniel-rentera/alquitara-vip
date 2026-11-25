export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items]
  return (
    <div className="relative flex overflow-hidden border-y border-white/10 bg-black/30 py-3">
      <div className="flex min-w-full shrink-0 animate-marquee items-center gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 text-sm font-bold uppercase tracking-[0.25em] text-white/70">
            {t} <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
