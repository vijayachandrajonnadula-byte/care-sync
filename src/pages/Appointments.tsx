import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, CheckCircle, Clock } from 'lucide-react'
import {
  ALL_PATIENTS, MEERA_VITALS,
  type Appointment,
} from '../data/careSyncData'
import PageHeader from '../components/shared/PageHeader'
import Drawer from '../components/drawers/Drawer'
import PatientIdentityBlock from '../components/clinical/PatientIdentityBlock'
import PatientSafetyStrip from '../components/clinical/PatientSafetyStrip'
import Button from '../components/buttons/Button'
import styles from './Appointments.module.css'

const PATIENT_MAP = Object.fromEntries(ALL_PATIENTS.map(p => [p.patientId, p]))

const FLOW_LABEL: Record<Appointment['flowStatus'], string> = {
  'scheduled': 'Scheduled',
  'checked-in': 'Checked in',
  'in-consultation': 'In consultation',
  'completed': 'Completed',
  'no-show': 'No-show',
}

const ROWS: Array<{
  appt: { id: string; patientId: string; time: string; visitReason: string; flowStatus: Appointment['flowStatus']; room: string | undefined; clinician: string }
  waitLabel: string
  prep: string
}> = [
  {
    appt: { id: 'appt-meera-1', patientId: 'CP-10482', time: '09:00', visitReason: 'Diabetes & HTN follow-up', flowStatus: 'checked-in', room: 'OPD 3', clinician: 'Dr. Ananya Rao' },
    waitLabel: 'Ready — review required',
    prep: 'Glucose review required',
  },
  {
    appt: { id: 'appt-arjun-1', patientId: 'CP-10221', time: '09:30', visitReason: 'General consultation', flowStatus: 'checked-in', room: undefined, clinician: 'Dr. Ananya Rao' },
    waitLabel: 'Waiting 22m (+12m delay)',
    prep: 'Room not yet assigned',
  },
  {
    appt: { id: 'appt-rohan-1', patientId: 'CP-10118', time: '—', visitReason: 'Lisinopril refill', flowStatus: 'scheduled', room: undefined, clinician: 'Dr. Ananya Rao' },
    waitLabel: 'Waiting on prescription approval',
    prep: 'Nurse Priya requested',
  },
  {
    appt: { id: 'appt-kavya-1', patientId: 'CP-10301', time: '10:00', visitReason: 'Thyroid follow-up', flowStatus: 'scheduled', room: undefined, clinician: 'Dr. Ananya Rao' },
    waitLabel: '—',
    prep: 'Report review required',
  },
]

export default function Appointments() {
  const navigate = useNavigate()
  const [selectedAppt, setSelectedAppt] = useState<typeof ROWS[0] | null>(null)
  const [flowOverride, setFlowOverride] = useState<Record<string, string>>({})

  return (
    <div className={styles.page}>
      <PageHeader
        title="Appointments and patient flow"
        subtitle="Live outpatient queue and consultation readiness"
      />

      {/* Queue health strip */}
      <div className={styles.queueStrip} role="status" aria-label="OPD queue status">
        <div className={styles.queueContext}>
          <div className={styles.queueContextLabel}>OPD queue</div>
          <div className={styles.queueContextTime}>08:47 AM</div>
        </div>
        <div className={styles.queueDivider} aria-hidden="true" />
        <div className={styles.queueItem}>
          <span className={styles.queueNum}>8</span>
          <span className={styles.queueLabel}>waiting</span>
        </div>
        <div className={styles.queueDivider} aria-hidden="true" />
        <div className={styles.queueItem}>
          <span className={styles.queueNumWarning}>2</span>
          <span className={styles.queueLabel}>delayed</span>
        </div>
        <div className={styles.queueDivider} aria-hidden="true" />
        <div className={styles.queueItem}>
          <span className={styles.queueNum}>22m</span>
          <span className={styles.queueLabel}>longest wait</span>
        </div>
        <div className={styles.queueDivider} aria-hidden="true" />
        <div className={styles.queueItem}>
          <span className={styles.queueNum}>90%</span>
          <span className={styles.queueLabel}>OPD capacity</span>
        </div>
        <div className={styles.queueDivider} aria-hidden="true" />
        <div className={styles.queueItem}>
          <span className={styles.queueNumMuted}>2</span>
          <span className={styles.queueLabel}>no-shows</span>
        </div>
      </div>

      {/* Appointment table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table} aria-label="Today's appointments">
          <thead>
            <tr>
              {['Time', 'Patient', 'Visit', 'Flow status', 'Waiting / notes', 'Room', 'Preparation', 'Clinician', 'Action'].map(h => (
                <th key={h} scope="col" className={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(row => {
              const patient = PATIENT_MAP[row.appt.patientId]
              if (!patient) return null
              const status = flowOverride[row.appt.id] ?? row.appt.flowStatus
              const isMeera = row.appt.patientId === 'CP-10482'
              const isSelected = selectedAppt?.appt.id === row.appt.id
              const rowClass = [
                styles.tr,
                isMeera ? styles.trHighlighted : '',
                isSelected ? styles.trSelected : '',
              ].filter(Boolean).join(' ')

              return (
                <tr
                  key={row.appt.id}
                  className={rowClass}
                  onClick={() => setSelectedAppt(row)}
                  tabIndex={0}
                  aria-selected={isSelected}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedAppt(row)
                    }
                  }}
                >
                  <td className={`${styles.td} ${styles.tdTime}`}>{row.appt.time}</td>
                  <td className={styles.td}>
                    <div className={styles.patientCell}>
                      <div className={styles.patientName}>{patient.name}</div>
                      <div className={styles.patientId}>{patient.patientId} · {patient.age}{patient.sex === 'Female' ? 'F' : 'M'}</div>
                    </div>
                  </td>
                  <td className={styles.td}>{row.appt.visitReason}</td>
                  <td className={styles.td}>
                    <span className={`${styles.flowBadge} ${styles[`flow_${(status).replace('-', '_')}`]}`}>
                      {FLOW_LABEL[status as Appointment['flowStatus']]}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span className={isMeera && status === 'checked-in' ? styles.waitWarning : styles.waitNormal}>
                      {row.waitLabel}
                    </span>
                  </td>
                  <td className={`${styles.td} ${!row.appt.room ? styles.tdMuted : ''}`}>
                    {row.appt.room ?? '—'}
                  </td>
                  <td className={styles.td}>
                    <span className={row.prep.includes('required') || row.prep.includes('pending') || row.prep.includes('Nurse') ? styles.prepWarning : styles.prepNormal}>
                      {row.prep}
                    </span>
                  </td>
                  <td className={styles.td}>{row.appt.clinician}</td>
                  <td className={styles.td}>
                    <Button
                      variant={isMeera ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (isMeera) navigate('/patients/meera-iyer', { state: { from: 'appointments' } })
                      }}
                    >
                      {isMeera ? 'Open prep' : 'Open visit'}
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Appointment drawer */}
      <Drawer
        open={selectedAppt !== null}
        onClose={() => setSelectedAppt(null)}
        title="Appointment detail"
        closeLabel="Close appointment detail"
        width={420}
      >
        {selectedAppt && (() => {
          const patient = PATIENT_MAP[selectedAppt.appt.patientId]
          if (!patient) return null
          const isMeera = patient.patientId === 'CP-10482'
          const currentStatus = (flowOverride[selectedAppt.appt.id] ?? selectedAppt.appt.flowStatus) as Appointment['flowStatus']
          const hasRoom = !!selectedAppt.appt.room

          return (
            <div className={styles.drawerContent}>
              <PatientIdentityBlock patient={patient} appointmentTime={selectedAppt.appt.time} />
              <PatientSafetyStrip allergies={patient.allergies} />

              {/* Consultation readiness — Meera only */}
              {isMeera && (
                <div className={styles.readinessBlock}>
                  <div className={styles.readinessHeader}>
                    <span className={styles.readinessLabel}>Consultation readiness</span>
                    <span className={styles.readinessStatus}>Preparation required</span>
                  </div>
                  <div className={styles.readinessPending}>
                    Pending: Review fasting glucose result before beginning
                  </div>
                </div>
              )}

              <div className={styles.drawerSection}>
                <div className={styles.drawerLabel}>Visit reason</div>
                <div className={styles.drawerValue}>{selectedAppt.appt.visitReason}</div>
              </div>

              {/* Clinical preparation card — Meera only */}
              {isMeera && (
                <div className={styles.drawerWarning}>
                  <div className={styles.drawerWarningTitle}>Clinical preparation required</div>
                  <div className={styles.drawerWarningFindings}>
                    <div className={styles.drawerWarningFinding}>
                      <span className={styles.findingLabel}>Glucose</span>
                      <span className={styles.findingVal}>{MEERA_VITALS.fastingGlucose.current} mg/dL</span>
                      <span className={styles.findingPrev}>prev {MEERA_VITALS.fastingGlucose.previous}</span>
                    </div>
                    <div className={styles.drawerWarningFinding}>
                      <span className={styles.findingLabel}>BP</span>
                      <span className={styles.findingVal}>{MEERA_VITALS.bloodPressure.current.systolic}/{MEERA_VITALS.bloodPressure.current.diastolic} mmHg</span>
                      <span className={styles.findingPrev}>prev {MEERA_VITALS.bloodPressure.previous.systolic}/{MEERA_VITALS.bloodPressure.previous.diastolic}</span>
                    </div>
                  </div>
                  <div className={styles.drawerWarningAction}>
                    Required action: Review lab result before beginning
                  </div>
                  <div className={styles.drawerWarningSource}>
                    Source: Central Laboratory · Updated 07:45
                  </div>
                </div>
              )}

              <div className={styles.drawerSection}>
                <div className={styles.drawerLabel}>Flow status</div>
                <span className={`${styles.flowBadge} ${styles[`flow_${currentStatus.replace('-', '_')}`]}`}>
                  {FLOW_LABEL[currentStatus]}
                </span>
              </div>

              {selectedAppt.appt.room && (
                <div className={styles.drawerSection}>
                  <div className={styles.drawerLabel}>Room</div>
                  <div className={styles.drawerValue}>{selectedAppt.appt.room}</div>
                </div>
              )}

              <div className={styles.drawerSection}>
                <div className={styles.drawerLabel}>Preparation checklist</div>
                <div className={styles.checklistItem} aria-label={`Lab results reviewed: ${isMeera ? 'pending' : 'complete'}`}>
                  {isMeera
                    ? <AlertCircle size={15} className={styles.checkIconPending} aria-hidden="true" />
                    : <CheckCircle size={15} className={styles.checkIconDone} aria-hidden="true" />
                  }
                  <span className={isMeera ? styles.checkTextPending : ''}>Lab results reviewed</span>
                  {isMeera && <span className={styles.checkBadgePending}>Pending</span>}
                </div>
                <div className={styles.checklistItem} aria-label="Patient checked in: complete">
                  <CheckCircle size={15} className={styles.checkIconDone} aria-hidden="true" />
                  <span>Patient checked in</span>
                </div>
                <div className={styles.checklistItem} aria-label={`Room assigned: ${hasRoom ? 'complete' : 'pending'}`}>
                  {hasRoom
                    ? <CheckCircle size={15} className={styles.checkIconDone} aria-hidden="true" />
                    : <Clock size={15} className={styles.checkIconMuted} aria-hidden="true" />
                  }
                  <span>Room assigned</span>
                  {hasRoom && <span className={styles.checkRoomTag}>{selectedAppt.appt.room}</span>}
                </div>
              </div>

              <div className={styles.drawerActions}>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setSelectedAppt(null)
                    if (isMeera) navigate('/patients/meera-iyer', { state: { from: 'appointments' } })
                  }}
                >
                  Open consultation prep
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  onClick={() => setFlowOverride(prev => ({ ...prev, [selectedAppt.appt.id]: 'in-consultation' }))}
                >
                  Mark as in consultation
                </Button>
                <Button variant="ghost" size="md" fullWidth>
                  Notify patient
                </Button>
              </div>
            </div>
          )
        })()}
      </Drawer>
    </div>
  )
}
