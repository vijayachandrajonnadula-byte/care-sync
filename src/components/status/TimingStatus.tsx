import type { TimingStatus as TimingStatusType } from '../../data/careSyncData'
import { Clock } from 'lucide-react'
import styles from './TimingStatus.module.css'

const CONFIG: Record<TimingStatusType, { label: string; className: string }> = {
  'overdue':   { label: 'Overdue', className: styles.overdue },
  'due-now':   { label: 'Due now', className: styles.dueNow },
  'due-soon':  { label: 'Due soon', className: styles.dueSoon },
  'due-later': { label: 'Due later', className: styles.dueLater },
  'no-due':    { label: 'No due time', className: styles.noDue },
}

interface Props {
  timing: TimingStatusType
  dueTime?: string
  compact?: boolean
}

export default function TimingStatus({ timing, dueTime, compact = false }: Props) {
  const { label, className } = CONFIG[timing]
  return (
    <span
      className={`${styles.badge} ${className} ${compact ? styles.compact : ''}`}
      aria-label={dueTime ? `${label}: ${dueTime}` : label}
    >
      <Clock size={11} aria-hidden="true" />
      <span>{dueTime ?? label}</span>
    </span>
  )
}
