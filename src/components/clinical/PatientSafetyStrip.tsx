import { AlertTriangle } from 'lucide-react'
import styles from './PatientSafetyStrip.module.css'

interface Props {
  allergies: string[]
  compact?: boolean
}

export default function PatientSafetyStrip({ allergies, compact = false }: Props) {
  if (!allergies.length) return null

  return (
    <div
      className={`${styles.strip} ${compact ? styles.compact : ''}`}
      role="alert"
      aria-label={`Allergy alert: ${allergies.join(', ')}`}
    >
      <AlertTriangle size={compact ? 13 : 14} className={styles.icon} aria-hidden="true" />
      <span className={styles.label}>Allergy:</span>
      <span className={styles.values}>{allergies.join(', ')}</span>
    </div>
  )
}
