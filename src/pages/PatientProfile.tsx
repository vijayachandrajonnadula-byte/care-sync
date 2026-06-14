import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, ChevronDown, Plus, MessageSquare, MoreHorizontal, TrendingUp } from 'lucide-react'
import {
  MEERA_IYER, MEERA_VITALS, MEERA_LAB_RESULTS, MEERA_MEDICATIONS, AUDIT_LOG
} from '../data/careSyncData'
import PatientSafetyStrip from '../components/clinical/PatientSafetyStrip'
import GlucoseChart from '../components/clinical/GlucoseChart'
import BloodPressureChart from '../components/clinical/BloodPressureChart'
import SeverityIndicator from '../components/status/SeverityIndicator'
import Button from '../components/buttons/Button'
import styles from './PatientProfile.module.css'

export default function PatientProfile() {
  const navigate = useNavigate()
  const location = useLocation()
  const navFrom = (location.state as { from?: string } | null)?.from
  const fromAppointments = navFrom === 'appointments'
  const fromMedicalRecords = navFrom === 'medical-records'
  const [activeSection, setActiveSection] = useState('summary')

  return (
    <div className={styles.page}>
      {/* Sticky patient header */}
      <div className={styles.stickyHeader}>
        <button
          className={styles.backBtn}
          onClick={() => navigate(fromAppointments ? '/appointments' : fromMedicalRecords ? '/medical-records' : '/patients')}
          aria-label={fromAppointments ? 'Back to appointments' : fromMedicalRecords ? 'Back to medical records' : 'Back to patients'}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>{fromAppointments ? 'Appointments' : fromMedicalRecords ? 'Medical Records' : 'Patients'}</span>
        </button>

        <div className={styles.headerMain}>
          <div className={styles.headerLeft}>
            <div className={styles.headerName}>
              {MEERA_IYER.name}
            </div>
            <div className={styles.headerMeta}>
              <span>{MEERA_IYER.patientId}</span>
              <span className={styles.metaSep} aria-hidden="true">·</span>
              <span>{MEERA_IYER.age}</span>
              <span className={styles.metaSep} aria-hidden="true">·</span>
              <span>Female</span>
              <span className={styles.metaSep} aria-hidden="true">·</span>
              <span>{MEERA_IYER.bloodGroup}</span>
              <span className={styles.metaSep} aria-hidden="true">·</span>
              <span className={styles.apptTag}>Appointment today 09:00</span>
            </div>
            <div className={styles.reviewNote}>Needs review before consultation</div>
            {fromAppointments && (
              <div className={styles.apptContextRow}>
                <span>OPD 3</span>
                <span className={styles.metaSep} aria-hidden="true">·</span>
                <span>Checked in</span>
                <span className={styles.metaSep} aria-hidden="true">·</span>
                <span className={styles.labPendingNote}>Lab review pending</span>
              </div>
            )}
          </div>
          <div className={styles.headerRight}>
            <Button variant="primary" size="md">Review and begin consultation</Button>
            <Button variant="secondary" size="md" icon={<Plus size={14} />}>Add note</Button>
            <Button variant="secondary" size="md" icon={<MessageSquare size={14} />}>Message</Button>
            <Button variant="ghost" size="md" icon={<MoreHorizontal size={14} />} aria-label="More options"><span className="sr-only">More options</span></Button>
          </div>
        </div>

        {/* Allergy strip directly under header */}
        <div className={styles.allergyRow}>
          <PatientSafetyStrip allergies={MEERA_IYER.allergies} />
        </div>
      </div>

      {/* Consultation priority */}
      <div className={styles.consultationPriority} role="status" aria-label="Consultation priority">
        <div className={styles.priorityHeader}>
          <span className={styles.priorityTitle}>Consultation priority</span>
          <span className={styles.priorityBadge}>Review before 09:00</span>
        </div>
        <div className={styles.prioritySummary}>
          Fasting glucose elevated — review before 09:00 appointment
        </div>
        <div className={styles.priorityFindings}>
          <div className={styles.priorityFinding}>
            <span className={styles.findingLabel}>Glucose</span>
            <span className={styles.findingValue}>
              <span className={styles.findingPrev}>{MEERA_VITALS.fastingGlucose.previous}</span>
              <span className={styles.findingArrow} aria-label="increased to">→</span>
              <span className={styles.findingCurrent}>{MEERA_VITALS.fastingGlucose.current} mg/dL</span>
              <span className={styles.findingDelta}>+{MEERA_VITALS.fastingGlucose.change}</span>
            </span>
          </div>
          <div className={styles.priorityFinding}>
            <span className={styles.findingLabel}>Blood pressure</span>
            <span className={styles.findingValue}>
              <span className={styles.findingPrev}>{MEERA_VITALS.bloodPressure.previous.systolic}/{MEERA_VITALS.bloodPressure.previous.diastolic}</span>
              <span className={styles.findingArrow} aria-label="changed to">→</span>
              <span className={styles.findingCurrent}>{MEERA_VITALS.bloodPressure.current.systolic}/{MEERA_VITALS.bloodPressure.current.diastolic} mmHg</span>
              <span className={styles.findingDelta}>Rising</span>
            </span>
          </div>
          <div className={styles.priorityFinding}>
            <span className={styles.findingLabel}>Medication</span>
            <span className={styles.findingMed}>{MEERA_VITALS.medicationUpdate}</span>
          </div>
        </div>
        <div className={styles.priorityInterpretation}>
          Above target range · Review before consultation · Source: Central Laboratory · Updated 07:45
        </div>
      </div>

      {/* Main layout */}
      <div className={styles.mainGrid}>
        {/* Left — charts and timeline */}
        <div className={styles.mainCol}>
          <GlucoseChart />
          <BloodPressureChart />

          {/* Consultation history */}
          <div className={styles.timelineCard}>
            <div className={styles.timelineTitle}>Recent consultations</div>
            <div className={styles.timelineList}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} aria-hidden="true" />
                <div>
                  <div className={styles.timelineLabel}>Today — Upcoming</div>
                  <div className={styles.timelineNote}>Diabetes & HTN follow-up · Dr. Ananya Rao</div>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={`${styles.timelineDot} ${styles.timelineDotDone}`} aria-hidden="true" />
                <div>
                  <div className={styles.timelineLabel}>5 weeks ago</div>
                  <div className={styles.timelineNote}>HTN review · Metformin dosage adjusted</div>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={`${styles.timelineDot} ${styles.timelineDotDone}`} aria-hidden="true" />
                <div>
                  <div className={styles.timelineLabel}>3 months ago</div>
                  <div className={styles.timelineNote}>Annual diabetes review · HbA1c 7.2%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className={styles.rightCol}>
          {/* Allergy */}
          <RightSection title="Allergy">
            <PatientSafetyStrip allergies={MEERA_IYER.allergies} />
          </RightSection>

          {/* Conditions */}
          <RightSection title="Active conditions">
            {MEERA_IYER.conditions.map(c => (
              <div key={c} className={styles.conditionRow}>
                <TrendingUp size={14} className={styles.conditionIcon} aria-hidden="true" />
                <span>{c}</span>
              </div>
            ))}
          </RightSection>

          {/* Medications */}
          <RightSection title="Current medications">
            {MEERA_MEDICATIONS.map(med => (
              <div key={med.name} className={styles.medRow}>
                <div className={styles.medName}>
                  {med.name} {med.dose}
                  {med.updatedFlag && (
                    <span className={styles.medUpdatedBadge}>Updated</span>
                  )}
                </div>
                <div className={styles.medFreq}>{med.frequency}</div>
                {med.updated && <div className={styles.medDate}>{med.updated}</div>}
              </div>
            ))}
          </RightSection>

          {/* Outstanding */}
          <RightSection title="Outstanding items">
            <div className={styles.outstandingItem}>
              <span className={styles.outstandingDot} aria-hidden="true" />
              <span>Review fasting glucose result</span>
            </div>
            <div className={styles.outstandingItem}>
              <span className={styles.outstandingDot} aria-hidden="true" />
              <span>Confirm medication efficacy post-dose increase</span>
            </div>
          </RightSection>

          {/* Care team */}
          <RightSection title="Care team">
            <div className={styles.careTeamRow}>
              <div className={styles.careAvatar} aria-hidden="true">AR</div>
              <div>
                <div className={styles.careTeamName}>{MEERA_IYER.assignedPhysician}</div>
                <div className={styles.careTeamRole}>General Physician</div>
              </div>
            </div>
            {MEERA_IYER.assignedNurse && (
              <div className={styles.careTeamRow}>
                <div className={styles.careAvatarNurse} aria-hidden="true">NP</div>
                <div>
                  <div className={styles.careTeamName}>{MEERA_IYER.assignedNurse}</div>
                  <div className={styles.careTeamRole}>Nurse</div>
                </div>
              </div>
            )}
          </RightSection>
        </div>
      </div>
    </div>
  )
}

function RightSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.rightSection}>
      <div className={styles.rightSectionTitle}>{title}</div>
      <div className={styles.rightSectionBody}>{children}</div>
    </div>
  )
}
