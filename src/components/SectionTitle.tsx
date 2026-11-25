import Reveal from './Reveal'

export default function SectionTitle({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-10 text-center">
      {kicker && (
        <Reveal>
          <span className="chip mb-3">{kicker}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="title-display text-5xl text-white sm:text-6xl md:text-7xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mx-auto mt-3 max-w-2xl text-white/60">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
