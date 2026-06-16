import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { ALL_PATIENTS, CURRENT_USER, MEERA_IYER, MEERA_VITALS, type Patient } from '../data/careSyncData'
import PageHeader from '../components/shared/PageHeader'
import FilterBar from '../components/tables/FilterBar'
import DataTable, { type Column } from '../components/tables/DataTable'
import Drawer from '../components/drawers/Drawer'
import PatientIdentityBlock from '../components/clinical/PatientIdentityBlock'
import PatientSafetyStrip from '../components/clinical/PatientSafetyStrip'
import SeverityIndicator from '../components/status/SeverityIndicator'
import Button from '../components/buttons/Button'
import styles from './Patients.module.css'

const STATUS_LABEL: Record<Patient['status'], string> = {
  'active': 'Active',
  'stable': 'Stable',
  'needs-review': 'Needs review',
}

const APPOINTMENT_TIMES: Record<string, string> = {
  'CP-10482': 'Today 09:00',
  'CP-10221': 'Today 09:30',
  'CP-10301': 'Today 10:00',
  'CP-10118': 'Today — Prescription',
  'CP-10099': 'Next week',
}

const CURRENT_CONCERN: Record<string, string> = {
  'CP-10482': 'Fasting glucose elevated — review before 09:00',
  'CP-10221': 'Waiting 22m — room pending',
  'CP-10301': 'New diagnostic report available',
  'CP-10118': 'Lisinopril refill — approval needed before 09:15',
  'CP-10099': 'Routine follow-up',
}

const VISIT_REASONS: Record<string, string> = {
  'CP-10482': 'Diabetes & HTN follow-up',
  'CP-10221': 'General consultation',
  'CP-10301': 'Thyroid follow-up',
  'CP-10118': 'Lisinopril refill',
  'CP-10099': 'Routine follow-up',
}

const FILTERS = [
  { key: 'all', label: 'All patients', count: ALL_PATIENTS.length },
  { key: 'me', label: 'Assigned to me', count: ALL_PATIENTS.length },
  { key: 'review', label: 'Needs review', count: ALL_PATIENTS.filter(p => p.status === 'needs-review').length },
  { key: 'today', label: 'Upcoming today', count: 4 },
]

export default function Patients() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [drawerPatient, setDrawerPatient] = useState<Patient | null>(null)

  const filtered = ALL_PATIENTS.filter(p => {
    if (filter === 'review') return p.status === 'needs-review'
    if (filter === 'today') return ['CP-10482', 'CP-10221', 'CP-10301', 'CP-10118'].includes(p.patientId)
    return true
  })

  const columns: Column<Patient>[] = [
    {
      key: 'patient',
      header: 'Patient',
      width: '200px',
      render: p => (
        <div>
          <div className={styles.patientName}>{p.name}</div>
          <div className={styles.patientId}>{p.patientId}</div>
        </div>
      ),
    },
    {
      key: 'age',
      header: 'Age / Sex',
      width: '80px',
      render: p => <span className={styles.tabular}>{p.age}{p.sex === 'Female' ? 'F' : 'M'}</span>,
    },
    {
      key: 'conditions',
      header: 'Conditions',
      render: p => (
        <div className={styles.conditions}>
          {p.conditions.map(c => (
            <span key={c} className={styles.condition}>{c}</span>
          ))}
        </div>
      ),
    },
    {
      key: 'appointment',
      header: 'Next appointment',
      render: p => <span className={styles.tabular}>{APPOINTMENT_TIMES[p.patientId] ?? '—'}</span>,
    },
    {
      key: 'concern',
      header: 'Current concern',
      render: p => (
        <span className={p.status === 'needs-review' ? styles.concernHigh : styles.concern}>
          {CURRENT_CONCERN[p.patientId] ?? '—'}
        </span>
      ),
    },
    {
      key: 'clinician',
      header: 'Clinician',
      render: p => <span className={styles.clinician}>{p.assignedPhysician}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: p => <SeverityIndicator severity={p.severity} showDot />,
    },
    {
      key: 'action',
      header: 'Action',
      render: p => (
        <Button
          variant="secondary"
          size="sm"
          onClick={(e) => { e.stopPropagation(); navigate(p.id === 'meera-iyer' ? '/patients/meera-iyer' : '/patients') }}
          icon={<ExternalLink size={13} />}
          iconPosition="right"
        >
          Open profile
        </Button>
      ),
    },
  ]

  return (
    <div className={styles.page}>
      <PageHeader title="Patients" subtitle="Search, review and continue patient care" />

      <div className={styles.toolbar}>
        <FilterBar filters={FILTERS} active={filter} onChange={setFilter} label="Patient filters" />
      </div>
      <p className={styles.filterHelp}>Showing {CURRENT_USER.department} patients · Morning shift</p>

      <DataTable
        columns={columns}
        rows={filtered}
        getRowKey={p => p.patientId}
        onRowClick={p => setDrawerPatient(p)}
        activeRowKey={drawerPatient?.patientId}
        caption="Patient list"
      />


      <Drawer
        open={drawerPatient !== null}
        onClose={() => setDrawerPatient(null)}
        title="Patient quick view"
        closeLabel="Close patient quick view"
        width={420}
      >
        {drawerPatient && (
          <PatientDrawerContent
            patient={drawerPatient}
            onOpenProfile={() => {
              setDrawerPatient(null)
              navigate(drawerPatient.id === 'meera-iyer' ? '/patients/meera-iyer' : '/patients')
            }}
          />
        )}
      </Drawer>
    </div>
  )
}

function PatientDrawerContent({ patient, onOpenProfile }: { patient: Patient; onOpenProfile: () => void }) {
  const isMeera = patient.patientId === MEERA_IYER.patientId
  const concern = CURRENT_CONCERN[patient.patientId]
  const visitReason = VISIT_REASONS[patient.patientId]

  return (
    <div className={styles.drawerContent}>
      {/* Identity: name, ID, meta, severity badge */}
      <PatientIdentityBlock patient={patient} appointmentTime={APPOINTMENT_TIMES[patient.patientId]} />

      {/* Safety */}
      <PatientSafetyStrip allergies={patient.allergies} />

      {/* Current concern — why this row was opened */}
      {concern && (
        <div className={styles.drawerConcern}>
          <div className={styles.drawerConcernLabel}>Current concern</div>
          <div className={styles.drawerConcernText}>{concern}</div>
        </div>
      )}

      {/* Clinical findings — Meera only */}
      {isMeera && (
        <div className={styles.drawerWarning}>
          <div className={styles.drawerWarningTitle}>Clinical findings</div>
          <div className={styles.drawerWarningRow}>
            <span>Fasting glucose</span>
            <div className={styles.drawerWarningValue}>
              <span className={styles.valueHigh}>{MEERA_VITALS.fastingGlucose.current} mg/dL</span>
              <span className={styles.valueDelta}>+{MEERA_VITALS.fastingGlucose.change} from {MEERA_VITALS.fastingGlucose.previous}</span>
            </div>
          </div>
          <div className={styles.drawerWarningRow}>
            <span>Blood pressure</span>
            <div className={styles.drawerWarningValue}>
              <span className={styles.valueHigh}>
                {MEERA_VITALS.bloodPressure.current.systolic}/{MEERA_VITALS.bloodPressure.current.diastolic} mmHg
              </span>
              <span className={styles.valueDelta}>
                Rising (prev: {MEERA_VITALS.bloodPressure.previous.systolic}/{MEERA_VITALS.bloodPressure.previous.diastolic})
              </span>
            </div>
          </div>
          <div className={styles.drawerWarningFooter}>
            <span className={styles.drawerWarningInterp}>Above target range · Review before consultation</span>
            <span className={styles.drawerWarningSource}>Central Laboratory · Updated 07:45</span>
          </div>
        </div>
      )}

      <div className={styles.drawerSection}>
        <div className={styles.drawerSectionTitle}>Conditions</div>
        {patient.conditions.map(c => (
          <div key={c} className={styles.drawerItem}>{c}</div>
        ))}
      </div>

      <div className={styles.drawerSection}>
        <div className={styles.drawerSectionTitle}>Appointment</div>
        <div className={styles.drawerItemStrong}>{APPOINTMENT_TIMES[patient.patientId] ?? 'Not scheduled'}</div>
        {visitReason && <div className={styles.drawerItemMuted}>{visitReason}</div>}
      </div>

      <div className={styles.drawerSection}>
        <div className={styles.drawerSectionTitle}>Care team</div>
        <div className={styles.drawerOwnershipRow}>
          <span className={styles.drawerOwnerLabel}>Physician</span>
          <span className={styles.drawerOwnerValue}>{patient.assignedPhysician}</span>
        </div>
        {patient.assignedNurse && (
          <div className={styles.drawerOwnershipRow}>
            <span className={styles.drawerOwnerLabel}>Nurse</span>
            <span className={styles.drawerOwnerValue}>{patient.assignedNurse}</span>
          </div>
        )}
        {patient.patientId === 'CP-10482' && (
          <div className={styles.drawerActivity}>Lab result received today 07:45</div>
        )}
      </div>

      <div className={styles.drawerActions}>
        <Button variant="primary" size="md" fullWidth onClick={onOpenProfile}>
          Open patient profile
        </Button>
        {isMeera && (
          <Button variant="secondary" size="md" fullWidth>
            Review lab result
          </Button>
        )}
        <Button variant="secondary" size="md" fullWidth>
          {patient.assignedNurse ? `Message ${patient.assignedNurse}` : 'Message care team'}
        </Button>
      </div>
    </div>
  )
}
