import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../lib/motion'

interface Props {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

/** Envoltorio que revela su contenido al entrar en pantalla. */
export default function Reveal({ children, delay = 0, y = 28, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
