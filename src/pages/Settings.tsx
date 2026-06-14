import { useState, Fragment, type ReactNode } from 'react'
import { CURRENT_USER } from '../data/careSyncData'
import PageHeader from '../components/shared/PageHeader'
import styles from './Settings.module.css'

type NavSection =
  | 'overview'
  | 'shift'
  | 'notifications'
  | 'clinical-safety'
  | 'care-team'
  | 'accessibility'
  | 'security'

const NAV: { key: NavSection; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'shift', label: 'Shift preferences' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'clinical-safety', label: 'Clinical safety' },
  { key: 'care-team', label: 'Care team routing' },
  { key: 'accessibility', label: 'Accessibility' },
  { key: 'security', label: 'Security' },
]

const INITIAL_TOGGLES: Record<string, boolean> = {
  showNowNextLater: true,
  includeNightHandover: true,
  notifAbnormalLab: true,
  notifMedApproval: true,
  notifApptDelay: true,
  notifHandoverEscalation: true,
  notifCareTeam: true,
  safetyAllergyAlert: true,
  safetyHighlightDue: true,
  safetyRequireAck: true,
  safetyShowMedChanges: true,
  a11yReduceMotion: false,
  a11yHighContrast: true,
  a11yKeyboardShortcuts: true,
}

const INITIAL_SELECTS: Record<string, string> = {
  landingPage: 'Shift Briefing',
  shiftView: 'Morning Shift',
  clinicWorkspace: 'Outpatient Clinic',
  density: 'Comfortable',
}

function Toggle({
  id,
  label,
  checked,
  onChange,
}: {
  id: string
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className={styles.toggleWrap}>
      <input
        type="checkbox"
        id={id}
        className={styles.toggleInput}
        checked={checked}
        onChange={onChange}
        aria-label={label}
      />
      <span className={styles.toggleTrack} aria-hidden="true" />
      <span className={styles.toggleText} aria-hidden="true">{checked ? 'On' : 'Off'}</span>
    </label>
  )
}

function SettingRow({
  label,
  labelFor,
  desc,
  control,
}: {
  label: string
  labelFor?: string
  desc?: string
  control: ReactNode
}) {
  return (
    <div className={styles.settingRow}>
      <div className={styles.settingInfo}>
        {labelFor
          ? <label htmlFor={labelFor} className={styles.settingRowLabel}>{label}</label>
          : <div className={styles.settingRowLabel}>{label}</div>
        }
        {desc && <div className={styles.settingRowDesc}>{desc}</div>}
      </div>
      <div className={styles.settingControl}>{control}</div>
    </div>
  )
}

function GroupTitle({ children }: { children: ReactNode }) {
  return <div className={styles.groupTitle}>{children}</div>
}

function SummaryCard({
  title,
  onEdit,
  rows,
}: {
  title: string
  onEdit: () => void
  rows: { label: string; value: string }[]
}) {
  return (
    <div className={styles.summaryCard}>
      <div className={styles.summaryCardHead}>
        <span className={styles.summaryCardTitle}>{title}</span>
        <button
          className={styles.summaryEditBtn}
          onClick={onEdit}
          aria-label={`Edit ${title}`}
        >
          Edit
        </button>
      </div>
      {rows.map(row => (
        <div key={row.label} className={styles.summaryRow}>
          <span className={styles.summaryLabel}>{row.label}</span>
          <span className={styles.summaryValue}>{row.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState<NavSection>('overview')
  const [toggles, setToggles] = useState(INITIAL_TOGGLES)
  const [selects, setSelects] = useState(INITIAL_SELECTS)

  const flip = (id: string) => setToggles(prev => ({ ...prev, [id]: !prev[id] }))
  const pick = (id: string, value: string) => setSelects(prev => ({ ...prev, [id]: value }))

  return (
    <div className={styles.page}>
      <PageHeader
        title="Settings"
        subtitle="Account, shift preferences, notifications, and clinical safety settings."
      />

      <div className={styles.settingsCard}>

        {/* ── Left: settings sub-nav ── */}
        <nav className={styles.settingsNav} aria-label="Settings sections">
          <div className={styles.navHeading} aria-hidden="true">Settings</div>
          <ul className={styles.navList}>
            {NAV.map(item => (
              <li key={item.key}>
                <button
                  className={`${styles.navItem} ${activeSection === item.key ? styles.navItemActive : ''}`}
                  onClick={() => setActiveSection(item.key)}
                  aria-current={activeSection === item.key ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Right: settings content ── */}
        <div className={styles.settingsContent}>

          {/* Overview */}
          {activeSection === 'overview' && (
            <div className={styles.section}>
              <div className={styles.profileBlock}>
                <div className={styles.profileAvatar} aria-hidden="true">AR</div>
                <div className={styles.profileInfo}>
                  <div className={styles.profileName}>{CURRENT_USER.name}</div>
                  <div className={styles.profileRole}>{CURRENT_USER.role}</div>
                  <div className={styles.profileMeta}>{CURRENT_USER.department} · {CURRENT_USER.setting}</div>
                  <div className={styles.profileMeta}>{CURRENT_USER.shift}</div>
                  <div className={styles.profileStatusRow}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    <span className={styles.profileStatusText}>Active shift</span>
                    <span className={styles.profileSync}>· Last synced {CURRENT_USER.currentTime}</span>
                  </div>
                </div>
              </div>

              <div className={styles.divider} />
              <GroupTitle>Account details</GroupTitle>
              <dl className={styles.detailGrid}>
                {[
                  ['Email address', 'ananya.rao@caresync.clinic'],
                  ['Employee ID', 'EMP-10044'],
                  ['Registration', 'MCI-20491-A'],
                  ['Specialty', 'General Medicine'],
                ].map(([term, def]) => (
                  <Fragment key={term}>
                    <dt className={styles.detailTerm}>{term}</dt>
                    <dd className={styles.detailDef}>{def}</dd>
                  </Fragment>
                ))}
              </dl>

              <div className={styles.divider} />

              <div className={styles.summaryGrid}>
                <SummaryCard
                  title="Shift preferences"
                  onEdit={() => setActiveSection('shift')}
                  rows={[
                    { label: 'Default landing page', value: selects.landingPage },
                    { label: 'Default shift view', value: selects.shiftView },
                    { label: 'Clinic workspace', value: selects.clinicWorkspace },
                    { label: 'Night-shift handover items', value: toggles.includeNightHandover ? 'Enabled' : 'Disabled' },
                  ]}
                />
                <SummaryCard
                  title="Notifications"
                  onEdit={() => setActiveSection('notifications')}
                  rows={[
                    { label: 'Abnormal lab results', value: toggles.notifAbnormalLab ? 'Enabled' : 'Disabled' },
                    { label: 'Medication approval requests', value: toggles.notifMedApproval ? 'Enabled' : 'Disabled' },
                    { label: 'Appointment delays', value: toggles.notifApptDelay ? 'Enabled' : 'Disabled' },
                    { label: 'Handover escalations', value: toggles.notifHandoverEscalation ? 'Enabled' : 'Disabled' },
                  ]}
                />
                <SummaryCard
                  title="Clinical safety"
                  onEdit={() => setActiveSection('clinical-safety')}
                  rows={[
                    { label: 'Always show allergy alerts', value: toggles.safetyAllergyAlert ? 'Enabled' : 'Disabled' },
                    { label: 'Highlight results due before consultation', value: toggles.safetyHighlightDue ? 'Enabled' : 'Disabled' },
                    { label: 'Require acknowledgement for abnormal labs', value: toggles.safetyRequireAck ? 'Enabled' : 'Disabled' },
                    { label: 'Show medication changes in patient context', value: toggles.safetyShowMedChanges ? 'Enabled' : 'Disabled' },
                  ]}
                />
                <SummaryCard
                  title="Accessibility"
                  onEdit={() => setActiveSection('accessibility')}
                  rows={[
                    { label: 'Interface density', value: selects.density },
                    { label: 'Reduce motion', value: toggles.a11yReduceMotion ? 'On' : 'Off' },
                    { label: 'High contrast focus indicators', value: toggles.a11yHighContrast ? 'On' : 'Off' },
                    { label: 'Keyboard shortcuts', value: toggles.a11yKeyboardShortcuts ? 'Enabled' : 'Disabled' },
                  ]}
                />
              </div>
            </div>
          )}

          {/* Shift preferences */}
          {activeSection === 'shift' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Shift preferences</h2>
                <p className={styles.sectionDesc}>Configure your default workspace and shift display options.</p>
              </div>

              <GroupTitle>Navigation</GroupTitle>
              <SettingRow
                label="Default landing page"
                labelFor="landing-page"
                control={
                  <select
                    id="landing-page"
                    className={styles.settingSelect}
                    value={selects.landingPage}
                    onChange={e => pick('landingPage', e.target.value)}
                  >
                    <option>Shift Briefing</option>
                    <option>Patients</option>
                    <option>Appointments</option>
                    <option>Tasks</option>
                  </select>
                }
              />
              <SettingRow
                label="Default shift view"
                labelFor="shift-view"
                control={
                  <select
                    id="shift-view"
                    className={styles.settingSelect}
                    value={selects.shiftView}
                    onChange={e => pick('shiftView', e.target.value)}
                  >
                    <option>Morning Shift</option>
                    <option>Afternoon Shift</option>
                    <option>Night Shift</option>
                  </select>
                }
              />
              <SettingRow
                label="Clinic workspace"
                labelFor="clinic-workspace"
                control={
                  <select
                    id="clinic-workspace"
                    className={styles.settingSelect}
                    value={selects.clinicWorkspace}
                    onChange={e => pick('clinicWorkspace', e.target.value)}
                  >
                    <option>Outpatient Clinic</option>
                    <option>Inpatient Ward</option>
                    <option>Emergency</option>
                  </select>
                }
              />

              <div className={styles.divider} />
              <GroupTitle>Shift display</GroupTitle>

              <SettingRow
                label="Show Now / Next / Later sections"
                desc="Group tasks by urgency on the shift briefing view."
                control={
                  <Toggle
                    id="show-now-next-later"
                    label="Show Now / Next / Later sections"
                    checked={toggles.showNowNextLater}
                    onChange={() => flip('showNowNextLater')}
                  />
                }
              />
              <SettingRow
                label="Include night-shift handover items"
                desc="Show tasks handed over from the previous shift in your task list."
                control={
                  <Toggle
                    id="include-night-handover"
                    label="Include night-shift handover items"
                    checked={toggles.includeNightHandover}
                    onChange={() => flip('includeNightHandover')}
                  />
                }
              />
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Notifications</h2>
                <p className={styles.sectionDesc}>Control which clinical events generate notifications during your shift.</p>
              </div>

              <SettingRow
                label="Abnormal lab results"
                desc="Notify when a result falls outside the normal reference range."
                control={
                  <Toggle
                    id="notif-abnormal-lab"
                    label="Abnormal lab results notifications"
                    checked={toggles.notifAbnormalLab}
                    onChange={() => flip('notifAbnormalLab')}
                  />
                }
              />
              <SettingRow
                label="Medication approval requests"
                desc="Notify when a nurse submits a prescription for approval."
                control={
                  <Toggle
                    id="notif-med-approval"
                    label="Medication approval request notifications"
                    checked={toggles.notifMedApproval}
                    onChange={() => flip('notifMedApproval')}
                  />
                }
              />
              <SettingRow
                label="Appointment delays"
                desc="Notify when a patient's appointment is delayed or rescheduled."
                control={
                  <Toggle
                    id="notif-appt-delay"
                    label="Appointment delay notifications"
                    checked={toggles.notifApptDelay}
                    onChange={() => flip('notifApptDelay')}
                  />
                }
              />
              <SettingRow
                label="Handover escalations"
                desc="Notify when a night-shift task is escalated to your shift."
                control={
                  <Toggle
                    id="notif-handover-escalation"
                    label="Handover escalation notifications"
                    checked={toggles.notifHandoverEscalation}
                    onChange={() => flip('notifHandoverEscalation')}
                  />
                }
              />
              <SettingRow
                label="Care team messages"
                desc="Notify when you receive a care team message that needs action."
                control={
                  <Toggle
                    id="notif-care-team"
                    label="Care team message notifications"
                    checked={toggles.notifCareTeam}
                    onChange={() => flip('notifCareTeam')}
                  />
                }
              />
            </div>
          )}

          {/* Clinical safety */}
          {activeSection === 'clinical-safety' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Clinical safety</h2>
                <p className={styles.sectionDesc}>Safety prompts and clinical safeguards applied during your shift.</p>
              </div>

              <SettingRow
                label="Always show allergy alerts in patient quick view"
                desc="Display allergy warnings whenever a patient record is opened."
                control={
                  <Toggle
                    id="safety-allergy-alert"
                    label="Always show allergy alerts in patient quick view"
                    checked={toggles.safetyAllergyAlert}
                    onChange={() => flip('safetyAllergyAlert')}
                  />
                }
              />
              <SettingRow
                label="Highlight results due before consultation"
                desc="Flag pending lab results for patients with upcoming appointments."
                control={
                  <Toggle
                    id="safety-highlight-due"
                    label="Highlight results due before consultation"
                    checked={toggles.safetyHighlightDue}
                    onChange={() => flip('safetyHighlightDue')}
                  />
                }
              />
              <SettingRow
                label="Require acknowledgement before resolving abnormal lab messages"
                desc="Prevent dismissal of flagged messages without an explicit confirmation step."
                control={
                  <Toggle
                    id="safety-require-ack"
                    label="Require acknowledgement before resolving abnormal lab messages"
                    checked={toggles.safetyRequireAck}
                    onChange={() => flip('safetyRequireAck')}
                  />
                }
              />
              <SettingRow
                label="Show medication changes in patient context"
                desc="Surface recent dosage updates when reviewing a patient's record."
                control={
                  <Toggle
                    id="safety-show-med-changes"
                    label="Show medication changes in patient context"
                    checked={toggles.safetyShowMedChanges}
                    onChange={() => flip('safetyShowMedChanges')}
                  />
                }
              />
            </div>
          )}

          {/* Care team routing */}
          {activeSection === 'care-team' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Care team routing</h2>
                <p className={styles.sectionDesc}>Default assignments and routing for your outpatient clinic workflow.</p>
              </div>

              <SettingRow
                label="Default nurse contact"
                control={<span className={styles.readOnly}>Nurse Priya</span>}
              />
              <SettingRow
                label="Lab result owner"
                control={<span className={styles.readOnly}>{CURRENT_USER.name}</span>}
              />
              <SettingRow
                label="Medication request owner"
                control={<span className={styles.readOnly}>{CURRENT_USER.name}</span>}
              />
              <SettingRow
                label="Handover source"
                control={<span className={styles.readOnly}>Night shift team</span>}
              />
              <SettingRow
                label="Care coordination channel"
                control={<span className={styles.readOnly}>CareSync Messages</span>}
              />
            </div>
          )}

          {/* Accessibility */}
          {activeSection === 'accessibility' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Accessibility</h2>
                <p className={styles.sectionDesc}>Interface preferences to improve usability and reduce visual strain.</p>
              </div>

              <SettingRow
                label="Interface density"
                labelFor="density"
                desc="Adjusts spacing and row height across all screens."
                control={
                  <select
                    id="density"
                    className={styles.settingSelect}
                    value={selects.density}
                    onChange={e => pick('density', e.target.value)}
                  >
                    <option>Comfortable</option>
                    <option>Compact</option>
                    <option>Spacious</option>
                  </select>
                }
              />
              <SettingRow
                label="Reduce motion"
                desc="Disable transitions and animated elements."
                control={
                  <Toggle
                    id="a11y-reduce-motion"
                    label="Reduce motion"
                    checked={toggles.a11yReduceMotion}
                    onChange={() => flip('a11yReduceMotion')}
                  />
                }
              />
              <SettingRow
                label="High contrast focus indicators"
                desc="Use stronger visible outlines when navigating by keyboard."
                control={
                  <Toggle
                    id="a11y-high-contrast"
                    label="High contrast focus indicators"
                    checked={toggles.a11yHighContrast}
                    onChange={() => flip('a11yHighContrast')}
                  />
                }
              />
              <SettingRow
                label="Keyboard shortcuts"
                desc="Enable keyboard navigation shortcuts across the workspace."
                control={
                  <Toggle
                    id="a11y-keyboard-shortcuts"
                    label="Keyboard shortcuts"
                    checked={toggles.a11yKeyboardShortcuts}
                    onChange={() => flip('a11yKeyboardShortcuts')}
                  />
                }
              />
            </div>
          )}

          {/* Security */}
          {activeSection === 'security' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Security</h2>
                <p className={styles.sectionDesc}>Account access and session information. Contact your administrator to change role or department access.</p>
              </div>

              <SettingRow
                label="Account role"
                control={<span className={styles.readOnly}>{CURRENT_USER.role}</span>}
              />
              <SettingRow
                label="Department access"
                control={<span className={styles.readOnly}>{CURRENT_USER.department}</span>}
              />
              <SettingRow
                label="Session status"
                control={
                  <span className={styles.sessionActive}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    Active
                  </span>
                }
              />
              <SettingRow
                label="Last login"
                control={<span className={styles.readOnly}>Today 08:12 AM</span>}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
