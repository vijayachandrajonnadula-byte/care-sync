import { useState } from 'react'
import {
  AlertCircle, CheckCircle, ChevronRight, FileText, Paperclip, Send,
} from 'lucide-react'
import {
  MESSAGES, MEERA_IYER, MEERA_VITALS, ALL_PATIENTS, type Message,
} from '../data/careSyncData'
import PatientIdentityBlock from '../components/clinical/PatientIdentityBlock'
import PatientSafetyStrip from '../components/clinical/PatientSafetyStrip'
import SeverityIndicator from '../components/status/SeverityIndicator'
import WorkflowStatus from '../components/status/WorkflowStatus'
import Button from '../components/buttons/Button'
import styles from './Messages.module.css'

const INBOX_SECTIONS = [
  { key: 'action', label: 'Needs action', count: 2 },
  { key: 'me', label: 'Assigned to me', count: 4 },
  { key: 'unread', label: 'Unread', count: 2 },
  { key: 'patients', label: 'Patients', count: 3 },
  { key: 'care-team', label: 'Care team', count: 1 },
  { key: 'labs', label: 'Labs', count: 1 },
  { key: 'resolved', label: 'Resolved', count: 0 },
]

const APPT_TIMES: Record<string, string> = {
  'CP-10482': 'Today 09:00',
  'CP-10118': 'Today — Prescription',
  'CP-10301': 'Today 10:00',
}

type ComposerMode = 'reply' | 'note' | 'patient'
type WorkflowState = Record<string, Message['workflow']>

const COMPOSER_HINT: Record<ComposerMode, string> = {
  reply: 'Reply to this care team thread',
  note: 'Visible to care team only',
  patient: 'Sends to patient communication channel',
}

export default function Messages() {
  const [activeInbox, setActiveInbox] = useState('action')
  const [activeMessage, setActiveMessage] = useState<Message>(MESSAGES[0])
  const [composerMode, setComposerMode] = useState<ComposerMode>('reply')
  const [workflows, setWorkflows] = useState<WorkflowState>({})
  const [draftText, setDraftText] = useState('')
  const [confirmResolve, setConfirmResolve] = useState(false)

  const getWorkflow = (msg: Message) => workflows[msg.id] ?? msg.workflow
  const isMeera = activeMessage.patientId === 'CP-10482'
  const contextPatient = activeMessage.patientId
    ? (ALL_PATIENTS.find(p => p.patientId === activeMessage.patientId) ?? null)
    : null

  return (
    <div className={styles.layout}>

      {/* ── Column 1: Inbox navigation ── */}
      <div className={styles.col1} role="navigation" aria-label="Message inbox sections">
        <div className={styles.col1Header}>Messages</div>
        <ul className={styles.inboxList} role="list">
          {INBOX_SECTIONS.map(sec => {
            const isActive = activeInbox === sec.key
            return (
              <li key={sec.key}>
                <button
                  className={`${styles.inboxItem} ${isActive ? styles.inboxItemActive : ''}`}
                  onClick={() => setActiveInbox(sec.key)}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className={styles.inboxLabel}>{sec.label}</span>
                  {sec.count > 0 && (
                    <span
                      className={`${styles.inboxCount} ${isActive ? styles.inboxCountActive : ''}`}
                      aria-label={`${sec.count} items`}
                    >
                      {sec.count}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* ── Column 2: Conversation list ── */}
      <div className={styles.col2} role="list" aria-label="Conversations">
        {MESSAGES.map(msg => {
          const isActive = activeMessage.id === msg.id
          return (
            <div
              key={msg.id}
              className={[
                styles.convRow,
                isActive ? styles.convRowActive : '',
                !msg.read ? styles.convRowUnread : '',
              ].filter(Boolean).join(' ')}
              onClick={() => setActiveMessage(msg)}
              role="listitem"
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setActiveMessage(msg)}
              aria-current={isActive}
            >
              <div className={styles.convHeader}>
                <span className={styles.convFrom}>{msg.from}</span>
                <span className={styles.convTime}>{msg.time}</span>
              </div>
              {msg.patientName && (
                <div className={styles.convPatient}>{msg.patientName}</div>
              )}
              <div className={styles.convSubject}>{msg.subject}</div>
              <div className={styles.convTags}>
                {msg.severity && (
                  <SeverityIndicator severity={msg.severity} compact showDot={false} />
                )}
                <WorkflowStatus status={getWorkflow(msg)} compact />
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Column 3: Active conversation ── */}
      <div className={styles.col3}>
        <div className={styles.convPanel}>

          {/* Thread header */}
          <div className={styles.convPanelHeader}>
            <div className={styles.convPanelLeft}>
              <h1 className={styles.convPanelTitle}>
                {activeMessage.patientName
                  ? `${activeMessage.patientName} · ${activeMessage.subject}`
                  : activeMessage.subject}
              </h1>
              {isMeera && (
                <div className={styles.convPanelDue}>
                  Due before 09:00 consultation
                </div>
              )}
              <div className={styles.convPanelMeta}>
                {activeMessage.severity && (
                  <SeverityIndicator severity={activeMessage.severity} compact />
                )}
                <WorkflowStatus status={getWorkflow(activeMessage)} compact />
                <span className={styles.convPanelOwner}>
                  Assigned to {activeMessage.owner}
                </span>
              </div>
            </div>
            <div className={styles.convPanelActions}>
              {isMeera && (
                <Button variant="primary" size="sm">
                  Review lab result
                </Button>
              )}
              <Button
                variant="secondary"
                size="sm"
                icon={<CheckCircle size={13} />}
                onClick={() =>
                  setWorkflows(w => ({ ...w, [activeMessage.id]: 'acknowledged' }))
                }
                disabled={
                  getWorkflow(activeMessage) === 'acknowledged' ||
                  getWorkflow(activeMessage) === 'resolved'
                }
              >
                Acknowledge
              </Button>
              <Button variant="secondary" size="sm" icon={<ChevronRight size={13} />}>
                Assign
              </Button>
              <Button variant="secondary" size="sm">Create task</Button>
              <span className={styles.actionSep} aria-hidden="true" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmResolve(true)}
                disabled={getWorkflow(activeMessage) === 'resolved'}
              >
                Resolve
              </Button>
            </div>
          </div>

          {/* Message thread */}
          <div className={styles.thread}>
            <div
              className={[
                styles.message,
                activeMessage.severity === 'high' ? styles.messageHigh : '',
              ].filter(Boolean).join(' ')}
            >
              <div className={styles.messageHeader}>
                <div className={styles.messageSenderRow}>
                  <span className={styles.messageSender}>{activeMessage.from}</span>
                  {activeMessage.patientName && (
                    <>
                      <span className={styles.messageSep} aria-hidden="true">·</span>
                      <span className={styles.messagePatientRef}>
                        {activeMessage.patientName}
                      </span>
                    </>
                  )}
                </div>
                <span className={styles.messageTime}>{activeMessage.time}</span>
              </div>

              <div className={styles.messageBody}>{activeMessage.body}</div>

              {activeMessage.attachment && (
                <div className={styles.attachment}>
                  <div className={styles.attachIconWrap} aria-hidden="true">
                    <FileText size={15} className={styles.attachIcon} />
                  </div>
                  <div className={styles.attachBody}>
                    <div className={styles.attachName}>
                      {activeMessage.attachment.name}
                    </div>
                    <div className={styles.attachMeta}>
                      {activeMessage.attachment.type} · {activeMessage.attachment.time} · PDF
                    </div>
                    {isMeera && (
                      <div className={styles.attachKeyResult}>
                        Key result:{' '}
                        <strong className={styles.attachKeyResultValue}>
                          {MEERA_VITALS.fastingGlucose.current} mg/dL
                        </strong>
                        {' '}· Central Laboratory
                      </div>
                    )}
                  </div>
                  <div className={styles.attachActions}>
                    <Button variant="secondary" size="sm">View PDF</Button>
                    {isMeera && (
                      <Button variant="primary" size="sm">Review result</Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Composer */}
          <div className={styles.composer}>
            <div className={styles.composerTabs} role="tablist" aria-label="Message composer mode">
              {(['reply', 'note', 'patient'] as ComposerMode[]).map(mode => (
                <button
                  key={mode}
                  className={`${styles.composerTab} ${composerMode === mode ? styles.composerTabActive : ''}`}
                  onClick={() => setComposerMode(mode)}
                  role="tab"
                  aria-selected={composerMode === mode}
                >
                  {mode === 'reply' ? 'Reply' : mode === 'note' ? 'Internal note' : 'Patient message'}
                </button>
              ))}
              <span className={styles.composerHint}>{COMPOSER_HINT[composerMode]}</span>
            </div>

            {composerMode === 'patient' && (
              <div className={styles.patientWarning} role="alert">
                <AlertCircle size={14} className={styles.patientWarnIcon} aria-hidden="true" />
                <span>
                  <strong>This message will be sent to the patient.</strong>{' '}
                  Do not include internal-only clinical notes.
                </span>
              </div>
            )}

            {composerMode === 'note' && (
              <div className={styles.noteInfo} role="status">
                Internal notes are visible only to the care team and will not be sent to the patient.
              </div>
            )}

            <textarea
              className={styles.composerArea}
              placeholder={
                composerMode === 'reply'
                  ? 'Reply to this message…'
                  : composerMode === 'note'
                  ? 'Add an internal note visible only to the care team…'
                  : 'Write a message to the patient…'
              }
              rows={3}
              value={draftText}
              onChange={e => setDraftText(e.target.value)}
              aria-label="Message composer"
            />

            <div className={styles.composerFooter}>
              <Button variant="ghost" size="sm" icon={<Paperclip size={13} />}>
                Attach
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<Send size={13} />}
                disabled={!draftText.trim()}
                onClick={() => setDraftText('')}
              >
                {composerMode === 'patient'
                  ? 'Send to patient'
                  : composerMode === 'note'
                  ? 'Add note'
                  : 'Send reply'}
              </Button>
            </div>
          </div>
        </div>

        {/* Resolve confirmation overlay */}
        {confirmResolve && (
          <div className={styles.confirmOverlay}>
            <div
              className={styles.confirmDialog}
              role="alertdialog"
              aria-modal="true"
              aria-label="Confirm resolve"
            >
              <div className={styles.confirmTitle}>Resolve this message?</div>
              <div className={styles.confirmBody}>
                The message will be moved to resolved. This action can be undone.
              </div>
              <div className={styles.confirmActions}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setWorkflows(w => ({ ...w, [activeMessage.id]: 'resolved' }))
                    setConfirmResolve(false)
                  }}
                >
                  Resolve
                </Button>
                <Button variant="ghost" size="md" onClick={() => setConfirmResolve(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Column 4: Patient context panel (always visible for patient messages) ── */}
      {contextPatient && (
        <div className={styles.contextPanel}>
          <div className={styles.contextHeader}>Patient context</div>

          <PatientIdentityBlock
            patient={contextPatient}
            appointmentTime={APPT_TIMES[contextPatient.patientId]}
            compact
          />

          {contextPatient.allergies.length > 0 && (
            <PatientSafetyStrip allergies={contextPatient.allergies} compact />
          )}

          {isMeera && (
            <>
              <div className={styles.contextSection}>
                <div className={styles.contextSectionTitle}>Today's results</div>
                <div className={styles.contextClinicalRow}>
                  <span className={styles.contextLabel}>Glucose</span>
                  <div className={styles.contextClinicalValue}>
                    <span className={styles.contextValueWarning}>
                      {MEERA_VITALS.fastingGlucose.current} mg/dL
                    </span>
                    <span className={styles.contextValueMeta}>
                      prev {MEERA_VITALS.fastingGlucose.previous} · +{MEERA_VITALS.fastingGlucose.change}
                    </span>
                  </div>
                </div>
                <div className={styles.contextClinicalRow}>
                  <span className={styles.contextLabel}>Blood pressure</span>
                  <span className={styles.contextValueSecondary}>
                    {MEERA_VITALS.bloodPressure.current.systolic}/
                    {MEERA_VITALS.bloodPressure.current.diastolic} mmHg
                  </span>
                </div>
                <div className={styles.contextDue}>Due before 09:00 consultation</div>
                <div className={styles.contextSource}>
                  Central Laboratory · Today 07:45
                </div>
              </div>

              <div className={styles.contextSection}>
                <div className={styles.contextSectionTitle}>Care team</div>
                <div className={styles.contextClinicalRow}>
                  <span className={styles.contextLabel}>Physician</span>
                  <span className={styles.contextValueSecondary}>
                    {MEERA_IYER.assignedPhysician}
                  </span>
                </div>
                {MEERA_IYER.assignedNurse && (
                  <div className={styles.contextClinicalRow}>
                    <span className={styles.contextLabel}>Nurse</span>
                    <span className={styles.contextValueSecondary}>
                      {MEERA_IYER.assignedNurse}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          <div className={styles.contextFooter}>
            <Button variant="secondary" size="sm" fullWidth>
              Open patient profile
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
