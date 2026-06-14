import { type ReactNode } from 'react'
import styles from './SectionCard.module.css'

interface Props {
  title?: string
  children: ReactNode
  action?: ReactNode
  noPadding?: boolean
  compact?: boolean
}

export default function SectionCard({ title, children, action, noPadding = false, compact = false }: Props) {
  return (
    <div className={`${styles.card} ${compact ? styles.compact : ''}`}>
      {(title || action) && (
        <div className={styles.cardHeader}>
          {title && <h2 className={styles.cardTitle}>{title}</h2>}
          {action && <div className={styles.cardAction}>{action}</div>}
        </div>
      )}
      <div className={noPadding ? '' : styles.cardBody}>
        {children}
      </div>
    </div>
  )
}
