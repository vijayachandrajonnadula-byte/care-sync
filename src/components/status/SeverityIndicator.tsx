import type { ClinicalSeverity } from '../../data/careSyncData'
import styles from './SeverityIndicator.module.css'

const SEVERITY_CONFIG: Record<ClinicalSeverity, { label: string; className: string; dotColor: string }> = {
  critical: { label: 'Critical', className: styles.critical, dotColor: styles.dotCritical },
  high:     { label: 'High', className: styles.high, dotColor: styles.dotHigh },
  moderate: { label: 'Moderate', className: styles.moderate, dotColor: styles.dotModerate },
  routine:  { label: 'Routine', className: styles.routine, dotColor: styles.dotRoutine },
  stable:   { label: 'Stable', className: styles.stable, dotColor: styles.dotStable },
}

interface Props {
  severity: ClinicalSeverity
  showDot?: boolean
  compact?: boolean
}

export default function SeverityIndicator({ severity, showDot = true, compact = false }: Props) {
  const config = SEVERITY_CONFIG[severity]
  return (
    <span
      className={`${styles.badge} ${config.className} ${compact ? styles.compact : ''}`}
      role="status"
      aria-label={`Clinical severity: ${config.label}`}
    >
      {showDot && <span className={`${styles.dot} ${config.dotColor}`} aria-hidden="true" />}
      <span>{config.label}</span>
    </span>
  )
}
