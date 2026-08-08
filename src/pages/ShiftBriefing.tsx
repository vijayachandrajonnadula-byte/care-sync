import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, ArrowRight, CheckCircle, Clock, Pill, TrendingUp, User, Users } from 'lucide-react'
import {
  CURRENT_USER, MEERA_IYER, MEERA_VITALS,
  ARJUN_NAIR, ARJUN_APPOINTMENT, ROHAN_DAS,
  KAVYA_MENON, KAVYA_APPOINTMENT,
  SHIFT_SUMMARY, NEXT_90_MIN, ATTENTION_ITEMS,
  type AttentionItem,
} from '../data/careSyncData'
import PageHeader from '../components/shared/PageHeader'
import SeverityIndicator from '../components/status/SeverityIndicator'
import WorkflowStatus from '../components/status/WorkflowStatus'
import TimingStatus from '../components/status/TimingStatus'
import Button from '../components/buttons/Button'
import Drawer from '../components/drawers/Drawer'
import styles from './ShiftBriefing.module.css'

function ShiftChangeSummary() {
  return (
    <div className={styles.changeSummaryStrip} role="status" aria-label="Shift summary">
      <div className={styles.changeSummaryRow}>
        <span className={styles.changeSummaryLabel}>Since 07:00</span>
        <div className={styles.changeSummaryItems}>
          <span className={`${styles.changeSummaryItem} ${styles.changeSummaryItem_warning}`}>
            {SHIFT_SUMMARY.immediateActions} attention items
          </span>
          <span className={`${styles.changeSummaryItem} ${styles.changeSummaryItem_default}`}>
            {SHIFT_SUMMARY.dueThisShift} follow-through items
          </span>
          <span className={`${styles.changeSummaryItem} ${styles.changeSummaryItem_default}`}>
            {SHIFT_SUMMARY.handoverTasks} handover tasks
          </span>
        </div>
      </div>
      <p className={styles.changeSummaryDetail}>
        Includes 2 abnormal lab results, 3 patient messages, and 2 medication-related updates.
      </p>
    </div>
  )
}

const ATTENTION_DISPLAY_LIMIT = 4   // featured card + 3 queue rows
const FOLLOW_THROUGH_DISPLAY_LIMIT = 4

const TIMELINE_ACTIONS = ['Open', 'Open visit', 'Review report']

const RISK_CLASS: Record<string, string> = {
  High: styles.risk_high,
  Moderate: styles.risk_moderate,
  Low: styles.risk_low,
}

export default function ShiftBriefing() {
  const navigate = useNavigate()
  const [meeraWorkflow, setMeeraWorkflow] = useState<'new' | 'acknowledged'>('new')
  const [attentionDrawerOpen, setAttentionDrawerOpen] = useState(false)

  const prevGlucose = MEERA_VITALS.fastingGlucose.previous
  const currGlucose = MEERA_VITALS.fastingGlucose.current
  const glucoseChange = MEERA_VITALS.fastingGlucose.change
  const prevSys = MEERA_VITALS.bloodPressure.previous.systolic
  const prevDia = MEERA_VITALS.bloodPressure.previous.diastolic
  const currSys = MEERA_VITALS.bloodPressure.current.systolic
  const currDia = MEERA_VITALS.bloodPressure.current.diastolic

  return (
    <div className={styles.page}>
      <PageHeader
        title="Morning shift briefing"
        meta={`${CURRENT_USER.currentTime} · ${CURRENT_USER.department} · ${CURRENT_USER.name}`}
      />

      <ShiftChangeSummary />

      <div className={styles.grid}>
        {/* ── Left: immediate clinical attention ── */}
        <div className={styles.mainCol}>

          {/* ── Attention section: Meera + compact rows, grouped ── */}
          <section className={styles.attentionSection} aria-labelledby="attention-section-heading">
            <div className={styles.attentionSectionHeader}>
              <h2 id="attention-section-heading" className={styles.sectionHeading}>Needs action before first consultation</h2>
              <p className={styles.sectionSubheading}>Highest-priority items are shown first.</p>
            </div>

          {/* ── Meera Iyer — featured clinical case ── */}
          <article
            className={styles.featuredCard}
            role="region"
            aria-label="High priority: Meera Iyer, review required before 09:00"
          >
            {/* Alert strip — compact ochre */}
            <div className={styles.featuredAlertStrip}>
              <AlertTriangle size={12} aria-hidden="true" />
              <span>Review required before 09:00 consultation</span>
            </div>

            {/* Zone A — Identity (white) */}
            <div className={styles.featuredIdentityZone}>
              <p className={styles.featuredStatement}>
                {MEERA_IYER.name} needs review before 09:00 consultation
              </p>
              <div className={styles.featuredChipRow}>
                <span className={styles.highAttentionChip}>Review before consultation</span>
                <span className={styles.allergyChip} role="note" aria-label="Allergy: Penicillin">
                  <AlertTriangle size={11} aria-hidden="true" />
                  Allergy: Penicillin
                </span>
              </div>
              <div className={styles.featuredMetaRow}>
                <span className={styles.tabular}>{MEERA_IYER.patientId}</span>
                <span className={styles.metaSep} aria-hidden="true">·</span>
                <span>{MEERA_IYER.age}F</span>
                <span className={styles.metaSep} aria-hidden="true">·</span>
                <span>{MEERA_IYER.bloodGroup}</span>
                <span className={styles.metaSep} aria-hidden="true">·</span>
                <span>Diabetes &amp; HTN follow-up</span>
              </div>
            </div>

            {/* Body — two-column layout */}
            <div className={styles.featuredBody}>

              {/* Left column — clinical evidence */}
              <div className={styles.featuredBodyLeft}>
                <div className={styles.metricsZoneTitle}>Clinical changes since last visit</div>
                <p className={styles.metricsSummary}>
                  Fasting glucose increased from {prevGlucose} to {currGlucose} mg/dL.
                  Blood pressure increased from {prevSys}/{prevDia} to {currSys}/{currDia}.
                </p>
                <table className={styles.metricsTable} aria-label="Vital sign changes">
                  <thead>
                    <tr>
                      <th className={styles.metricsTh} scope="col">Parameter</th>
                      <th className={styles.metricsTh} scope="col">Previous</th>
                      <th className={styles.metricsTh} scope="col">Current</th>
                      <th className={styles.metricsTh} scope="col">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.metricsDataRow}>
                      <td className={styles.metricsTd}>Fasting glucose</td>
                      <td className={`${styles.metricsTd} ${styles.metricsPrev} ${styles.tabular}`}>
                        {prevGlucose} mg/dL
                      </td>
                      <td className={`${styles.metricsTdCurrent} ${styles.tabular}`}>
                        {currGlucose} mg/dL
                      </td>
                      <td className={`${styles.metricsTd} ${styles.tabular}`}>
                        <span className={`${styles.trendChip} ${styles.trendUp}`}>
                          <TrendingUp size={11} aria-hidden="true" />
                          +{glucoseChange} mg/dL
                        </span>
                      </td>
                    </tr>
                    <tr className={styles.metricsDataRow}>
                      <td className={styles.metricsTd}>Blood pressure</td>
                      <td className={`${styles.metricsTd} ${styles.metricsPrev} ${styles.tabular}`}>
                        {prevSys}/{prevDia} mmHg
                      </td>
                      <td className={`${styles.metricsTdCurrent} ${styles.tabular}`}>
                        {currSys}/{currDia} mmHg
                      </td>
                      <td className={`${styles.metricsTd} ${styles.tabular}`}>
                        <span className={`${styles.trendChip} ${styles.trendUp}`}>
                          <TrendingUp size={11} aria-hidden="true" />
                          Rising
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className={styles.metricsFooter}>
                  <div className={styles.metricsFooterRow}>
                    <span className={styles.metricsFooterLabel}>Interpretation:</span>
                    <span className={styles.metricsInterpretation}>Above target range · Review before consultation</span>
                  </div>
                  <div className={styles.metricsFooterRow}>
                    <span className={styles.metricsFooterLabel}>Source:</span>
                    <span className={styles.metricsSource}>Central Laboratory · Lab #492 · Updated 07:45</span>
                  </div>
                </div>
              </div>

              {/* Right column — review context */}
              <div className={styles.featuredBodyRight}>
                <div>
                  <div className={styles.reviewContextTitle}>Why this needs review</div>
                  <ol className={styles.reviewReasons}>
                    <li className={styles.reviewReasonItem}>
                      <span className={styles.reviewReasonNum} aria-hidden="true">1</span>
                      <span>Glucose increased by +{glucoseChange} mg/dL</span>
                    </li>
                    <li className={styles.reviewReasonItem}>
                      <span className={styles.reviewReasonNum} aria-hidden="true">2</span>
                      <span>BP increased to {currSys}/{currDia}</span>
                    </li>
                    <li className={styles.reviewReasonItem}>
                      <span className={styles.reviewReasonNum} aria-hidden="true">3</span>
                      <span>Appointment starts at 09:00</span>
                    </li>
                    <li className={styles.reviewReasonItem}>
                      <span className={styles.reviewReasonNum} aria-hidden="true">4</span>
                      <span>Medication changed five days ago</span>
                    </li>
                  </ol>
                </div>

                <div className={styles.reviewMedNote}>
                  <div className={styles.reviewMedTitle}>
                    <Pill size={12} aria-hidden="true" />
                    Recent medication change
                  </div>
                  <p className={styles.reviewMedText}>
                    Metformin dosage was updated five days ago. Review medication change alongside elevated glucose.
                  </p>
                </div>

                <div className={styles.reviewOwnership}>
                  <div className={`${styles.reviewOwnershipRow} ${styles.reviewOwnershipRowDue}`}>
                    <Clock size={11} aria-hidden="true" />
                    Due before 09:00
                  </div>
                  <div className={styles.reviewOwnershipRow}>
                    <User size={11} aria-hidden="true" />
                    Owner: {MEERA_IYER.assignedPhysician}
                  </div>
                  <div className={styles.reviewOwnershipRow}>
                    <Users size={11} aria-hidden="true" />
                    Nurse: {MEERA_IYER.assignedNurse}
                  </div>
                  {meeraWorkflow === 'acknowledged' && (
                    <div className={styles.reviewOwnershipRow}>
                      <CheckCircle size={11} aria-hidden="true" />
                      <span className={styles.acknowledgedTime}>Acknowledged at 08:49</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Zone E — Actions */}
            <div className={styles.featuredActionsZone}>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/patients/meera-iyer')}
                icon={<ArrowRight size={15} />}
                iconPosition="right"
              >
                Review patient record
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={<Users size={14} />}
              >
                Assign to Nurse Priya
              </Button>
              {meeraWorkflow === 'acknowledged' ? (
                <span className={styles.acknowledgedBadge} role="status" aria-label="Review acknowledged">
                  <CheckCircle size={13} aria-hidden="true" />
                  Acknowledged
                </span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<CheckCircle size={14} />}
                  onClick={() => setMeeraWorkflow('acknowledged')}
                >
                  Acknowledge
                </Button>
              )}
            </div>
          </article>

          {/* ── Other attention items ── */}
          <div className={styles.otherAttentionHeader}>
            <span className={styles.otherAttentionLabel}>Other attention items</span>
          </div>

          {/* ── Compact attention rows ── */}
          <div className={styles.attentionQueue}>

          {/* ── Arjun Nair — queue delay ── */}
          <div className={styles.queueRow} role="region" aria-label="Arjun Nair — queue delay">
            <div className={styles.queueRowLeft}>
              <div className={styles.queueRowHeader}>
                <SeverityIndicator severity={ARJUN_NAIR.severity} compact />
                <span className={styles.queueRowName}>{ARJUN_NAIR.name}</span>
                <span className={styles.queueRowId}>{ARJUN_NAIR.patientId}</span>
                <span className={styles.queueRowDot} aria-hidden="true">·</span>
                <span className={styles.queueRowMeta}>{ARJUN_NAIR.age}M</span>
              </div>
              <div className={styles.queueRowDetails}>
                <span>{ARJUN_APPOINTMENT.visitReason}</span>
                {ARJUN_APPOINTMENT.checkedInTime && (
                  <>
                    <span className={styles.queueRowDot} aria-hidden="true">·</span>
                    <span className={styles.pendingBadge}>Checked in {ARJUN_APPOINTMENT.checkedInTime}</span>
                  </>
                )}
                <span className={styles.queueRowDot} aria-hidden="true">·</span>
                <span className={styles.waitingBadge}>Waiting {ARJUN_APPOINTMENT.waitingMinutes}m</span>
                <span className={styles.delayBadge} aria-label={`Delay ${ARJUN_APPOINTMENT.delayMinutes} minutes`}>
                  Delay +{ARJUN_APPOINTMENT.delayMinutes}m
                </span>
                <span className={styles.pendingBadge}>Room pending</span>
              </div>
            </div>
            <div className={styles.queueRowActions}>
              <button type="button" className={styles.notifyAction}>Notify patient</button>
              <Button variant="secondary" size="sm">Open visit</Button>
            </div>
          </div>

          {/* ── Rohan Das — prescription approval ── */}
          <div className={styles.queueRow} role="region" aria-label="Rohan Das — prescription approval">
            <div className={styles.queueRowLeft}>
              <div className={styles.queueRowHeader}>
                <SeverityIndicator severity={ROHAN_DAS.severity} compact />
                <span className={styles.queueRowName}>{ROHAN_DAS.name}</span>
                <span className={styles.queueRowId}>{ROHAN_DAS.patientId}</span>
                <span className={styles.queueRowDot} aria-hidden="true">·</span>
                <span className={styles.queueRowMeta}>{ROHAN_DAS.age}M</span>
              </div>
              <div className={styles.queueRowDetails}>
                <span>Lisinopril 10 mg refill request</span>
                <span className={styles.queueRowDot} aria-hidden="true">·</span>
                <span>Requested by Nurse Priya</span>
                <span className={styles.queueRowDot} aria-hidden="true">·</span>
                <span className={styles.waitingBadge}>Waiting 18m</span>
                <TimingStatus timing="due-soon" dueTime="Due before 09:15" compact />
                <WorkflowStatus status="pending-approval" compact />
              </div>
            </div>
            <div className={styles.queueRowActions}>
              <Button variant="secondary" size="sm">Review prescription</Button>
            </div>
          </div>

          {/* ── Kavya Menon — diagnostic report ── */}
          <div className={styles.queueRow} role="region" aria-label="Kavya Menon — diagnostic report">
            <div className={styles.queueRowLeft}>
              <div className={styles.queueRowHeader}>
                <SeverityIndicator severity={KAVYA_MENON.severity} compact />
                <span className={styles.queueRowName}>{KAVYA_MENON.name}</span>
                <span className={styles.queueRowId}>{KAVYA_MENON.patientId}</span>
                <span className={styles.queueRowDot} aria-hidden="true">·</span>
                <span className={styles.queueRowMeta}>{KAVYA_MENON.age}F</span>
              </div>
              <div className={styles.queueRowDetails}>
                <span>{KAVYA_APPOINTMENT.visitReason}</span>
                <span className={styles.queueRowDot} aria-hidden="true">·</span>
                <span>New diagnostic report available</span>
                <span className={styles.queueRowDot} aria-hidden="true">·</span>
                <TimingStatus timing="due-soon" dueTime="Review before 10:00" compact />
                <WorkflowStatus status="new" compact />
              </div>
            </div>
            <div className={styles.queueRowActions}>
              <Button variant="secondary" size="sm">Review report</Button>
            </div>
          </div>

          {SHIFT_SUMMARY.immediateActions > ATTENTION_DISPLAY_LIMIT && (
            <div className={styles.viewAllRow}>
              <button
                type="button"
                className={styles.viewAllAction}
                onClick={() => setAttentionDrawerOpen(true)}
              >
                View full attention list
                <ArrowRight size={13} aria-hidden="true" />
              </button>
            </div>
          )}

          </div>{/* end attentionQueue */}

          </section>{/* end attentionSection */}

          {/* ── Shift follow-through ── */}
          <div className={styles.followSection}>
            <div className={styles.followSectionHeader}>
              <h3 className={styles.followSectionTitle}>Shift follow-through</h3>
              <span className={styles.followSectionSub}>Highest-risk workstreams are shown first.</span>
            </div>
            <div className={styles.followTableWrapper}>
              <table className={styles.followTable} aria-label="Shift follow-through workstreams">
                <thead>
                  <tr>
                    {['Workstream', 'Count', 'Age / source', 'Owner', 'Risk', 'Next action'].map(h => (
                      <th key={h} className={styles.followTh} scope="col">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SHIFT_SUMMARY.followThrough.slice(0, FOLLOW_THROUGH_DISPLAY_LIMIT).map(row => (
                    <tr key={row.workstream} className={styles.followTr}>
                      <td className={`${styles.followTd} ${styles.followTdWorkstream}`}>{row.workstream}</td>
                      <td className={`${styles.followTd} ${styles.tabular}`}>{row.items}</td>
                      <td className={`${styles.followTd} ${styles.followTdMuted} ${styles.tabular}`}>{row.oldest}</td>
                      <td className={`${styles.followTd} ${styles.followTdMuted}`}>{row.owner}</td>
                      <td className={styles.followTd}>
                        <span className={`${styles.riskBadge} ${RISK_CLASS[row.risk] ?? styles.risk_low}`}>
                          {row.risk}
                        </span>
                      </td>
                      <td className={styles.followTd}>
                        <button type="button" className={styles.followNextAction}>{row.nextAction}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {SHIFT_SUMMARY.followThrough.length > FOLLOW_THROUGH_DISPLAY_LIMIT && (
              <div className={styles.viewAllRow}>
                <button
                  type="button"
                  className={styles.viewAllAction}
                  onClick={() => navigate('/tasks')}
                >
                  View all follow-through items
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Right rail ── */}
        <div className={styles.sideCol}>
          {/* Next 90 minutes */}
          <div className={styles.timelinePanel}>
            <div className={styles.timelinePanelHeader}>
              <h3 className={styles.timelinePanelTitle}>Next 90 minutes</h3>
              <span className={styles.timelinePanelMeta}>From 09:00</span>
            </div>
            <div className={styles.timelineList}>
              {NEXT_90_MIN.map((item, i) => (
                <div
                  key={item.time}
                  className={`${styles.timelineItem} ${i === 0 ? styles.timelineItemFirst : ''}`}
                >
                  <div className={styles.timelineTimeCol}>
                    <span className={styles.timelineTime}>{item.time}</span>
                  </div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelinePatientRow}>
                      <span className={styles.timelinePatientName}>{item.patient}</span>
                      {item.severity === 'high' && (
                        <SeverityIndicator severity={item.severity} compact />
                      )}
                    </div>
                    <div className={styles.timelineVisit}>{item.visit}</div>
                    <div className={styles.timelineNote}>{item.note}</div>
                  </div>
                  <button
                    type="button"
                    className={styles.timelineAction}
                    aria-label={`${TIMELINE_ACTIONS[i]} for ${item.patient}`}
                  >
                    {TIMELINE_ACTIONS[i]}
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.timelinePanelFooter}>
              <button
                type="button"
                className={styles.viewAllAction}
                onClick={() => navigate('/appointments')}
              >
                View full shift overview
                <ArrowRight size={13} aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <Drawer
        open={attentionDrawerOpen}
        onClose={() => setAttentionDrawerOpen(false)}
        title="Attention items"
        closeLabel="Close attention items panel"
        width={480}
      >
        <p className={styles.attDrawerSubtitle}>
          {SHIFT_SUMMARY.immediateActions} items need attention before or during the first consultation window.
        </p>
        <div className={styles.attList}>
          {ATTENTION_ITEMS.map((item: AttentionItem, i: number) => (
            <div key={item.id} className={styles.attItem}>
              <div className={styles.attItemNum} aria-hidden="true">{i + 1}</div>
              <div className={styles.attItemContent}>
                <div className={styles.attItemHeader}>
                  <span className={styles.attItemName}>{item.patientName}</span>
                  <span className={styles.attItemId}>{item.patientId}</span>
                  <SeverityIndicator severity={item.severity} compact />
                </div>
                <p className={styles.attItemIssue}>{item.issue}</p>
                <div className={styles.attItemMeta}>
                  <Clock size={11} aria-hidden="true" />
                  <span>Due: {item.dueTime}</span>
                  <span className={styles.attItemMetaSep} aria-hidden="true">·</span>
                  <span>Source: {item.source}</span>
                </div>
                <div className={styles.attItemActions}>
                  <Button variant="secondary" size="sm">{item.action}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  )
}
