import type { Patient } from '../../data/careSyncData'
import SeverityIndicator from '../status/SeverityIndicator'
import styles from './PatientIdentityBlock.module.css'

interface Props {
  patient: Patient
  appointmentTime?: string
  compact?: boolean
}

export default function PatientIdentityBlock({ patient, appointmentTime, compact = false }: Props) {
  return (
    <div className={`${styles.block} ${compact ? styles.compact : ''}`}>
      <div className={styles.header}>
        <div>
          <div className={styles.name}>{patient.name}</div>
          <div className={styles.meta}>
            <span className={styles.id}>{patient.patientId}</span>
            <span className={styles.sep} aria-hidden="true">·</span>
            <span>{patient.age}{patient.sex === 'Female' ? 'F' : 'M'}</span>
            <span className={styles.sep} aria-hidden="true">·</span>
            <span>{patient.bloodGroup}</span>
            {appointmentTime && (
              <>
                <span className={styles.sep} aria-hidden="true">·</span>
                <span className={styles.appt} aria-label={`Appointment at ${appointmentTime}`}>Appt {appointmentTime}</span>
              </>
            )}
          </div>
        </div>
        <SeverityIndicator severity={patient.severity} compact={compact} />
      </div>
    </div>
  )
}
