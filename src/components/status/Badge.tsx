import { type ReactNode } from 'react'
import styles from './Badge.module.css'

type BadgeVariant = 'default' | 'brand' | 'critical' | 'warning' | 'success' | 'info'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  dot?: boolean
}

export default function Badge({ children, variant = 'default', dot = false }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  )
}
