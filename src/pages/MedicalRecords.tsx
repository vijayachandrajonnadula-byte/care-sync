import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ALL_PATIENTS, CURRENT_USER } from '../data/careSyncData'
import PageHeader from '../components/shared/PageHeader'
import FilterBar from '../components/tables/FilterBar'
import Drawer from '../components/drawers/Drawer'
import PatientIdentityBlock from '../components/clinical/PatientIdentityBlock'
import PatientSafetyStrip from '../components/clinical/PatientSafetyStrip'
import Button from '../components/buttons/Button'
import styles from './MedicalRecords.module.css'

type RecordType = 'lab-result' | 'diagnostic-report' | 'medication-request' | 'consultation-note'
type ReviewStatus = 'needs-review' | 'new' | 'pending-approval' | 'completed'

interface ShiftRecord {
  id: string
  patientId: string
  patientName: string
  patientMeta: string
  appointmentTime?: string
  allergies: string[]
  recordType: RecordType
  item: string
  currentValue: string
  context: string
  updatedAt: string
  reviewStatus: ReviewStatus
  owner: string
  action: string
  detail: {
    previous?: string
    change?: string
    interpretation?: string
    source?: string
    requestedBy?: string
    dueBy?: string
  }
}

const RECORD_TYPE_LABEL: Record<RecordType, string> = {
  'lab-result': 'Lab result',
  'diagnostic-report': 'Diagnostic report',
  'medication-request': 'Medication request',
  'consultation-note': 'Consultation note',
}

const REVIEW_STATUS_LABEL: Record<ReviewStatus, string> = {
  'needs-review': 'Needs review',
  'new': 'New',
  'pending-approval': 'Pending approval',
  'completed': 'Completed',
}

const SHIFT_RECORDS: ShiftRecord[] = [
  {
    id: 'rec-1',
    patientId: 'CP-10482',
    patientName: 'Meera Iyer',
    patientMeta: 'CP-10482 · 42F · B+',
    appointmentTime: '09:00',
    allergies: ['Penicillin'],
    recordType: 'lab-result',
    item: 'Fasting glucose',
    currentValue: '142 mg/dL',
    context: 'Previous 118 · +24 · Above target',
    updatedAt: 'Today 07:45',
    reviewStatus: 'needs-review',
    owner: 'Dr. Ananya Rao',
    action: 'Review result',
    detail: {
      previous: '118 mg/dL',
      change: '+24 mg/dL',
      interpretation: 'Above target range · Review before consultation',
      source: 'Central Laboratory · Updated 07:45',
    },
  },
  {
    id: 'rec-2',
    patientId: 'CP-10482',
    patientName: 'Meera Iyer',
    patientMeta: 'CP-10482 · 42F · B+',
    appointmentTime: '09:00',
    allergies: ['Penicillin'],
    recordType: 'lab-result',
    item: 'HbA1c',
    currentValue: '7.4%',
    context: 'Above target (<7.0%)',
    updatedAt: 'Today 07:45',
    reviewStatus: 'needs-review',
    owner: 'Dr. Ananya Rao',
    action: 'Review result',
    detail: {
      interpretation: 'Above target · Long-term glucose control indicator',
      source: 'Central Laboratory · Updated 07:45',
    },
  },
  {
    id: 'rec-3',
    patientId: 'CP-10301',
    patientName: 'Kavya Menon',
    patientMeta: 'CP-10301 · 29F · AB+',
    appointmentTime: '10:00',
    allergies: [],
    recordType: 'diagnostic-report',
    item: 'Thyroid report',
    currentValue: 'New report',
    context: 'Appointment today 10:00',
    updatedAt: 'Today 08:15',
    reviewStatus: 'new',
    owner: 'Dr. Ananya Rao',
    action: 'Review report',
    detail: {
      source: 'Lab System · Today 08:15',
    },
  },
  {
    id: 'rec-4',
    patientId: 'CP-10118',
    patientName: 'Rohan Das',
    patientMeta: 'CP-10118 · 52M · A+',
    allergies: [],
    recordType: 'medication-request',
    item: 'Lisinopril 10 mg refill',
    currentValue: 'Pending approval',
    context: 'Requested by Nurse Priya · Due before 09:15',
    updatedAt: 'Today 08:30',
    reviewStatus: 'pending-approval',
    owner: 'Dr. Ananya Rao',
    action: 'Review request',
    detail: {
      requestedBy: 'Nurse Priya',
      dueBy: 'Before 09:15',
      source: 'Nurse request · Today 08:30',
    },
  },
  {
    id: 'rec-5',
    patientId: 'CP-10099',
    patientName: 'Sita Krishnan',
    patientMeta: 'CP-10099 · 65F · O-',
    allergies: [],
    recordType: 'consultation-note',
    item: 'Post-operative follow-up',
    currentValue: 'Routine note',
    context: 'Stable',
    updatedAt: 'This week',
    reviewStatus: 'completed',
    owner: 'Dr. Ananya Rao',
    action: 'View',
    detail: {
      interpretation: 'Stable · No immediate action required',
      source: 'Clinical record',
    },
  },
]

const TABS: Array<{ key: string; label: string }> = [
  { key: 'all', label: 'All records' },
  { key: 'lab-result', label: 'Lab results' },
  { key: 'consultation-note', label: 'Consultations' },
  { key: 'diagnostic-report', label: 'Diagnoses & reports' },
  { key: 'medication-request', label: 'Medications' },
  { key: 'imaging', label: 'Imaging' },
  { key: 'documents', label: 'Documents' },
  { key: 'audit', label: 'Audit history' },
]

const SUMMARY_CHIPS: Array<{ label: string; variant: 'warning' | 'brand' | 'muted' }> = [
  { label: '2 lab results need review', variant: 'warning' },
  { label: '1 medication request pending', variant: 'warning' },
  { label: '1 diagnostic report available', variant: 'brand' },
  { label: '2 completed today', variant: 'muted' },
]

const PLACEHOLDER_TABS = new Set(['imaging', 'documents', 'audit'])

export default function MedicalRecords() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [selectedRecord, setSelectedRecord] = useState<ShiftRecord | null>(null)

  const filteredRecords = SHIFT_RECORDS.filter(r => {
    if (activeTab === 'all') return true
    return r.recordType === activeTab
  })

  const isWorklist = !PLACEHOLDER_TABS.has(activeTab)

  return (
    <div className={styles.page}>
      <PageHeader
        title="Medical Records"
        subtitle="Review new labs, reports, medication updates, and documents assigned to today's outpatient shift."
      />

      {/* Operational summary chips */}
      <div className={styles.summaryRow} role="status" aria-label="Shift records summary">
        {SUMMARY_CHIPS.map(chip => (
          <div key={chip.label} className={`${styles.chip} ${styles[`chip_${chip.variant}`]}`}>
            {chip.label}
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className={styles.controlRow}>
        <FilterBar filters={TABS} active={activeTab} onChange={setActiveTab} label="Filter records by type" />
      </div>

      {/* Records worklist table */}
      {isWorklist ? (
        filteredRecords.length > 0 ? (
          <>
            <div className={styles.tableWrapper}>
              <table className={styles.table} aria-label="Records worklist for today's shift">
                <thead>
                  <tr>
                    {['Patient', 'Record type', 'Result / item', 'Current value', 'Context', 'Updated', 'Review status', 'Owner', 'Action'].map(h => (
                      <th key={h} scope="col" className={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map(rec => {
                    const isNeedsReview = rec.reviewStatus === 'needs-review'
                    const isPending = rec.reviewStatus === 'pending-approval'
                    const isUrgent = isNeedsReview || isPending
                    const isSelected = selectedRecord?.id === rec.id
                    const actionVariant = isUrgent ? 'primary' : 'secondary'

                    return (
                      <tr
                        key={rec.id}
                        className={[
                          styles.tr,
                          isNeedsReview ? styles.trNeedsReview : '',
                          isPending ? styles.trPending : '',
                          isSelected ? styles.trSelected : '',
                        ].filter(Boolean).join(' ')}
                        onClick={() => setSelectedRecord(rec)}
                        tabIndex={0}
                        aria-selected={isSelected}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setSelectedRecord(rec)
                          }
                        }}
                      >
                        <td className={styles.td}>
                          <div className={styles.patientCell}>
                            <span className={styles.patientName}>{rec.patientName}</span>
                            <span className={styles.patientMeta}>{rec.patientMeta}</span>
                          </div>
                        </td>
                        <td className={styles.td}>
                          <span className={styles.recordTypeBadge}>
                            {RECORD_TYPE_LABEL[rec.recordType]}
                          </span>
                        </td>
                        <td className={styles.td}>
                          <strong className={styles.itemText}>{rec.item}</strong>
                        </td>
                        <td className={`${styles.td} ${styles.tdValue} ${isNeedsReview ? styles.valueNeedsReview : ''}`}>
                          {rec.currentValue}
                        </td>
                        <td className={`${styles.td} ${styles.contextText}`}>{rec.context}</td>
                        <td className={`${styles.td} ${styles.tabular} ${styles.updatedText}`}>{rec.updatedAt}</td>
                        <td className={styles.td}>
                          <span className={`${styles.statusBadge} ${styles[`status_${rec.reviewStatus.replace(/-/g, '_')}`]}`}>
                            {REVIEW_STATUS_LABEL[rec.reviewStatus]}
                          </span>
                        </td>
                        <td className={`${styles.td} ${styles.ownerText}`}>{rec.owner}</td>
                        <td className={styles.td}>
                          <Button
                            variant={actionVariant}
                            size="sm"
                            onClick={e => { e.stopPropagation(); setSelectedRecord(rec) }}
                          >
                            {rec.action}
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className={styles.tableFooter} aria-live="polite">
              {filteredRecords.length} record{filteredRecords.length !== 1 ? 's' : ''} shown
              <span className={styles.tableFooterSep} aria-hidden="true">·</span>
              Last updated {CURRENT_USER.currentTime}
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyTitle}>No records for this filter</div>
            <div className={styles.emptySub}>No records match the selected type for today's shift.</div>
          </div>
        )
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.placeholderTitle}>{TABS.find(t => t.key === activeTab)?.label}</div>
          <div className={styles.placeholderSub}>Open a patient record to view {TABS.find(t => t.key === activeTab)?.label.toLowerCase()}.</div>
        </div>
      )}

      {/* Record detail drawer */}
      <Drawer
        open={selectedRecord !== null}
        onClose={() => setSelectedRecord(null)}
        title="Record detail"
        closeLabel="Close record detail"
        width={420}
      >
        {selectedRecord && (() => {
          const patient = ALL_PATIENTS.find(p => p.patientId === selectedRecord.patientId)
          const isMeera = selectedRecord.patientId === 'CP-10482'
          const isNeedsReview = selectedRecord.reviewStatus === 'needs-review'

          return (
            <div className={styles.drawerContent}>
              {patient && (
                <PatientIdentityBlock patient={patient} appointmentTime={selectedRecord.appointmentTime} />
              )}
              {selectedRecord.allergies.length > 0 && (
                <PatientSafetyStrip allergies={selectedRecord.allergies} />
              )}

              {/* Record detail card */}
              <div className={styles.recordCard}>
                <div className={styles.recordCardHeader}>
                  <span className={styles.recordTypeBadge}>{RECORD_TYPE_LABEL[selectedRecord.recordType]}</span>
                </div>

                <div className={styles.recordField}>
                  <span className={styles.recordFieldLabel}>Record</span>
                  <span className={styles.recordFieldValue}>{selectedRecord.item}</span>
                </div>

                <div className={styles.recordField}>
                  <span className={styles.recordFieldLabel}>Value</span>
                  <span className={`${styles.recordFieldValue} ${styles.recordFieldBold} ${isNeedsReview ? styles.valueNeedsReview : ''}`}>
                    {selectedRecord.currentValue}
                  </span>
                </div>

                {selectedRecord.detail.previous && (
                  <div className={styles.recordField}>
                    <span className={styles.recordFieldLabel}>Previous</span>
                    <span className={styles.recordFieldValue}>{selectedRecord.detail.previous}</span>
                  </div>
                )}

                {selectedRecord.detail.change && (
                  <div className={styles.recordField}>
                    <span className={styles.recordFieldLabel}>Change</span>
                    <span className={`${styles.recordFieldValue} ${styles.recordFieldBold} ${styles.valueNeedsReview}`}>
                      {selectedRecord.detail.change}
                    </span>
                  </div>
                )}

                {selectedRecord.detail.requestedBy && (
                  <div className={styles.recordField}>
                    <span className={styles.recordFieldLabel}>Requested by</span>
                    <span className={styles.recordFieldValue}>{selectedRecord.detail.requestedBy}</span>
                  </div>
                )}

                {selectedRecord.detail.dueBy && (
                  <div className={styles.recordField}>
                    <span className={styles.recordFieldLabel}>Due by</span>
                    <span className={`${styles.recordFieldValue} ${styles.valueNeedsReview}`}>{selectedRecord.detail.dueBy}</span>
                  </div>
                )}

                {selectedRecord.detail.interpretation && (
                  <div className={styles.recordInterpretation}>
                    {selectedRecord.detail.interpretation}
                  </div>
                )}

                {selectedRecord.detail.source && (
                  <div className={styles.recordSource}>
                    {selectedRecord.detail.source}
                  </div>
                )}
              </div>

              <div className={styles.drawerSection}>
                <div className={styles.drawerLabel}>Review status</div>
                <span className={`${styles.statusBadge} ${styles[`status_${selectedRecord.reviewStatus.replace(/-/g, '_')}`]}`}>
                  {REVIEW_STATUS_LABEL[selectedRecord.reviewStatus]}
                </span>
              </div>

              <div className={styles.drawerSection}>
                <div className={styles.drawerLabel}>Owner</div>
                <div className={styles.drawerValue}>{selectedRecord.owner}</div>
              </div>

              <div className={styles.drawerActions}>
                <Button variant="primary" size="md" fullWidth>
                  {selectedRecord.action}
                </Button>
                {isMeera && (
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={() => {
                      setSelectedRecord(null)
                      navigate('/patients/meera-iyer', { state: { from: 'medical-records' } })
                    }}
                  >
                    Open patient profile
                  </Button>
                )}
                <Button variant="ghost" size="md" fullWidth>
                  Add note
                </Button>
              </div>
            </div>
          )
        })()}
      </Drawer>
    </div>
  )
}
