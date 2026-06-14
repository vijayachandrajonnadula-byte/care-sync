import { type ReactNode } from 'react'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  title: string
  subtitle?: string
  meta?: string
  actions?: ReactNode
  strip?: string
}

export default function PageHeader({ title, subtitle, meta, actions, strip }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <div className={styles.left}>
          <h1 className={styles.title}>{title}</h1>
          {meta && <div className={styles.meta}>{meta}</div>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {strip && (
        <div className={styles.strip} role="status">
          <span className={styles.stripIcon} aria-hidden="true">↑</span>
          <span>Since {strip}</span>
        </div>
      )}
    </div>
  )
}
