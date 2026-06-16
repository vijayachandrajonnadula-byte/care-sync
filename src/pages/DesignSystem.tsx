import SeverityIndicator from '../components/status/SeverityIndicator'
import WorkflowStatus from '../components/status/WorkflowStatus'
import TimingStatus from '../components/status/TimingStatus'
import OwnershipStatus from '../components/status/OwnershipStatus'
import Badge from '../components/status/Badge'
import Button from '../components/buttons/Button'
import PatientSafetyStrip from '../components/clinical/PatientSafetyStrip'
import PatientIdentityBlock from '../components/clinical/PatientIdentityBlock'
import SectionCard from '../components/shared/SectionCard'
import { MEERA_IYER, ARJUN_NAIR, ROHAN_DAS, KAVYA_MENON, STABLE_PATIENT } from '../data/careSyncData'
import styles from './DesignSystem.module.css'

export default function DesignSystem() {
  return (
    <div className={styles.overlay}>
    <div className={styles.longPage}>
      <h1 className={styles.pageTitle}>Design Components</h1>
      <p className={styles.pageSub}>
        All components used across CareSync. Built entirely with custom React components and CSS Modules — no Material UI, no Tailwind, no component kit. Every component was written to spec so the system matches clinical context exactly.
      </p>

      {/* Color system */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Color system</h2>
        <p className={styles.sectionDesc}>
          Every color in CareSync carries a semantic meaning. The aubergine palette was chosen specifically to resist the generic blue healthcare aesthetic while maintaining clinical authority. Red is reserved exclusively for allergy and patient-safety contexts so it never loses its meaning.
        </p>

        <div className={styles.preview}>
          <div className={styles.colorGroup}>
            <div className={styles.colorGroupLabel}>Brand — Aubergine</div>
            <div className={styles.colorGrid}>
              {[
                { name: 'Brand 50',  val: '--color-brand-50' },
                { name: 'Brand 100', val: '--color-brand-100' },
                { name: 'Brand 300', val: '--color-brand-300' },
                { name: 'Brand 600', val: '--color-brand-600' },
                { name: 'Brand 700', val: '--color-brand-700' },
              ].map(c => (
                <div key={c.val} className={styles.colorSwatch}>
                  <div className={styles.colorBlock} style={{ background: `var(${c.val})` }} />
                  <div className={styles.colorName}>{c.name}</div>
                  <div className={styles.colorVar}>{c.val}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.colorGroup} style={{ marginBottom: 0 }}>
            <div className={styles.colorGroupLabel}>Semantic — Critical / Warning / Success</div>
            <div className={styles.colorGrid}>
              {[
                { name: 'Critical 600', val: '--color-critical-600' },
                { name: 'Warning 600',  val: '--color-warning-600' },
                { name: 'Success 600',  val: '--color-success-600' },
              ].map(c => (
                <div key={c.val} className={styles.colorSwatch}>
                  <div className={styles.colorBlock} style={{ background: `var(${c.val})` }} />
                  <div className={styles.colorName}>{c.name}</div>
                  <div className={styles.colorVar}>{c.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.preview} style={{ padding: 0, overflow: 'hidden' }}>
          <table className={styles.tokenTable}>
            <thead>
              <tr>
                <th className={styles.tokenTh}>Color role</th>
                <th className={styles.tokenTh}>Use for</th>
                <th className={styles.tokenTh}>Never use for</th>
              </tr>
            </thead>
            <tbody>
              {[
                { role: 'Aubergine (brand)',  use: 'Brand identity, primary actions, active selection, focus ring', never: 'Patient risk or severity' },
                { role: 'Red (critical)',     use: 'Allergy flags and patient safety events only', never: 'General attention or UI errors' },
                { role: 'Amber (warning)',    use: 'Values needing review, elevated risk, pressure readings', never: 'Error states unrelated to clinical review' },
                { role: 'Green (success)',    use: 'Completed tasks, stable patient status, resolved items', never: 'Binary good/bad judgements without text label' },
              ].map(row => (
                <tr key={row.role} className={styles.tokenTr}>
                  <td className={styles.tokenTd}><strong>{row.role}</strong></td>
                  <td className={styles.tokenTd}>{row.use}</td>
                  <td className={styles.tokenTd} style={{ color: 'var(--color-text-muted)' }}>{row.never}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Typography */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Typography</h2>
        <div className={styles.preview}>
          {[
            { token: '--font-size-page-title',    size: '28px', weight: '600', sample: 'Page title — Shift Briefing',         role: 'Page title' },
            { token: '--font-size-section-title',  size: '20px', weight: '600', sample: 'Section title — Patient tasks',       role: 'Section heading' },
            { token: '--font-size-subsection',     size: '17px', weight: '600', sample: 'Subsection — Lab results',            role: 'Subsection heading' },
            { token: '--font-size-card-title',     size: '15px', weight: '600', sample: 'Card title — Meera Iyer, 52F',        role: 'Card heading' },
            { token: '--font-size-body',           size: '14px', weight: '400', sample: 'Body — Fasting glucose 142 mg/dL, review before consultation.', role: 'Body copy' },
            { token: '--font-size-supporting',     size: '13px', weight: '400', sample: 'Supporting — Updated 10 min ago by Nurse Priya', role: 'Supporting text' },
            { token: '--font-size-label',          size: '12px', weight: '600', sample: 'LABEL — SEVERITY · OWNER · DUE',      role: 'Labels & caps' },
            { token: '--font-size-metadata',       size: '11px', weight: '400', sample: 'Metadata — CP-10482 · DOB 12 Mar 1972', role: 'Metadata' },
          ].map(row => (
            <div key={row.token} className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <div className={styles.typeName}>{row.token}</div>
                <div className={styles.typeSpec}>{row.size} · {row.weight}</div>
                <div className={styles.typeSpec} style={{ marginTop: 2 }}>{row.role}</div>
              </div>
              <div
                className={styles.typeSample}
                style={{ fontSize: `var(${row.token})`, fontWeight: row.weight }}
              >
                {row.sample}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Buttons</h2>

        <div className={styles.preview}>
          <div className={styles.previewLabel}>Variants</div>
          <div className={styles.previewRow}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </div>

        <div className={styles.preview}>
          <div className={styles.previewLabel}>Sizes</div>
          <div className={styles.previewRow}>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="sm">Small</Button>
          </div>
        </div>

        <div className={styles.preview}>
          <div className={styles.previewLabel}>Clinical actions</div>
          <div className={styles.previewRow}>
            <Button variant="primary">Complete task</Button>
            <Button variant="secondary">Assign to teammate</Button>
            <Button variant="ghost">View record</Button>
            <Button variant="danger">Escalate</Button>
          </div>
        </div>
      </section>

      {/* Badges & Status */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Badges &amp; Status</h2>

        <div className={styles.preview}>
          <div className={styles.statusGroup}>
            <div className={styles.statusGroupLabel}>Badge</div>
            <div className={styles.previewRow}>
              <Badge variant="default">Default</Badge>
              <Badge variant="brand">Brand</Badge>
              <Badge variant="critical" dot>Critical</Badge>
              <Badge variant="warning" dot>Warning</Badge>
              <Badge variant="success" dot>Success</Badge>
            </div>
          </div>

          <div className={styles.statusGroup}>
            <div className={styles.statusGroupLabel}>SeverityIndicator</div>
            <div className={styles.previewRow}>
              <SeverityIndicator severity="critical" />
              <SeverityIndicator severity="high" />
              <SeverityIndicator severity="moderate" />
              <SeverityIndicator severity="routine" />
              <SeverityIndicator severity="stable" />
            </div>
            <div className={styles.previewRow}>
              <SeverityIndicator severity="critical" compact />
              <SeverityIndicator severity="high" compact />
              <SeverityIndicator severity="moderate" compact />
              <SeverityIndicator severity="routine" compact />
              <SeverityIndicator severity="stable" compact />
            </div>
          </div>

          <div className={styles.statusGroup}>
            <div className={styles.statusGroupLabel}>WorkflowStatus</div>
            <div className={styles.previewRow}>
              <WorkflowStatus status="new" />
              <WorkflowStatus status="acknowledged" />
              <WorkflowStatus status="under-review" />
              <WorkflowStatus status="assigned" />
              <WorkflowStatus status="waiting" />
              <WorkflowStatus status="blocked" />
              <WorkflowStatus status="pending-approval" />
              <WorkflowStatus status="completed" />
              <WorkflowStatus status="resolved" />
              <WorkflowStatus status="record-updated" />
            </div>
          </div>

          <div className={styles.statusGroup}>
            <div className={styles.statusGroupLabel}>TimingStatus</div>
            <div className={styles.previewRow}>
              <TimingStatus timing="overdue" dueTime="09:15" />
              <TimingStatus timing="due-now" dueTime="Now" />
              <TimingStatus timing="due-soon" dueTime="10:00" />
              <TimingStatus timing="due-later" dueTime="14:30" />
              <TimingStatus timing="no-due" />
            </div>
          </div>

          <div className={styles.statusGroup} style={{ marginBottom: 0 }}>
            <div className={styles.statusGroupLabel}>OwnershipStatus</div>
            <div className={styles.previewRow}>
              <OwnershipStatus status="unassigned" />
              <OwnershipStatus status="assigned-to-me" owner="Dr. Ananya Rao" />
              <OwnershipStatus status="assigned-to-teammate" owner="Dr. Suresh" />
              <OwnershipStatus status="assigned-to-team" />
              <OwnershipStatus status="waiting-external" />
            </div>
          </div>
        </div>
      </section>

      {/* Patient Identity */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Patient Identity</h2>

        <div className={styles.preview}>
          <div className={styles.previewLabel}>PatientIdentityBlock</div>
          <div className={styles.previewStack}>
            <PatientIdentityBlock patient={MEERA_IYER} appointmentTime="09:00" />
            <PatientIdentityBlock patient={ROHAN_DAS} appointmentTime="09:30" />
            <PatientIdentityBlock patient={ARJUN_NAIR} />
          </div>
        </div>

        <div className={styles.preview}>
          <div className={styles.previewLabel}>PatientIdentityBlock — compact</div>
          <div className={styles.previewStack}>
            <PatientIdentityBlock patient={KAVYA_MENON} compact />
            <PatientIdentityBlock patient={STABLE_PATIENT} compact />
          </div>
        </div>

        <div className={styles.preview}>
          <div className={styles.previewLabel}>PatientSafetyStrip</div>
          <div className={styles.previewStack}>
            <PatientSafetyStrip allergies={['Penicillin']} />
            <PatientSafetyStrip allergies={['Penicillin', 'Sulfa drugs', 'Aspirin']} />
            <PatientSafetyStrip allergies={['Penicillin']} compact />
          </div>
        </div>
      </section>

      {/* Clinical Alerts */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Clinical Alerts</h2>

        <div className={styles.preview} style={{ padding: 0, overflow: 'hidden' }}>
          <table className={styles.tokenTable}>
            <thead>
              <tr>
                <th className={styles.tokenTh}>Severity</th>
                <th className={styles.tokenTh}>Badge</th>
                <th className={styles.tokenTh}>Clinical meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sev: 'critical' as const, meaning: 'Immediate intervention required' },
                { sev: 'high' as const,     meaning: 'Close monitoring required' },
                { sev: 'moderate' as const, meaning: 'Active management underway' },
                { sev: 'routine' as const,  meaning: 'Standard care, no elevated risk' },
                { sev: 'stable' as const,   meaning: 'No active issues' },
              ].map(row => (
                <tr key={row.sev} className={styles.tokenTr}>
                  <td className={styles.tokenTd}><SeverityIndicator severity={row.sev} /></td>
                  <td className={styles.tokenTd}><SeverityIndicator severity={row.sev} showDot={false} /></td>
                  <td className={styles.tokenTd}>{row.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Cards</h2>

        <div className={styles.previewStack}>
          <SectionCard title="Labs — Meera Iyer" action={<Button variant="ghost" size="sm">View all</Button>}>
            <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Fasting glucose 142 mg/dL (↑ from 118 last visit) · HbA1c 7.4% · eGFR 74 mL/min
            </p>
          </SectionCard>

          <SectionCard title="Preparation note" compact>
            <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Glucose review required. Patient reports increased thirst and fatigue since last week.
              Metformin dosage updated 5 days ago.
            </p>
          </SectionCard>

          <SectionCard>
            <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-muted)' }}>
              Card without a title — supplementary information block.
            </p>
          </SectionCard>
        </div>
      </section>

      {/* Tables */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tables</h2>

        <div className={styles.preview} style={{ padding: 0, overflow: 'hidden' }}>
          <table className={styles.demoTable}>
            <thead>
              <tr>
                {['Patient', 'Appt', 'Status', 'Severity', 'Wait', 'Workflow'].map(h => (
                  <th key={h} className={styles.demoTh}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className={`${styles.demoTr} ${styles.demoTrActive}`}>
                <td className={styles.demoTd}><strong>Meera Iyer</strong><br /><span style={{ fontSize: 'var(--font-size-metadata)', color: 'var(--color-text-muted)' }}>CP-10482</span></td>
                <td className={styles.demoTd}>09:00</td>
                <td className={styles.demoTd}><Badge variant="warning" dot>In consultation</Badge></td>
                <td className={styles.demoTd}><SeverityIndicator severity="high" compact /></td>
                <td className={styles.demoTd}>0m</td>
                <td className={styles.demoTd}><WorkflowStatus status="under-review" compact /></td>
              </tr>
              <tr className={styles.demoTr}>
                <td className={styles.demoTd}><strong>Arjun Nair</strong><br /><span style={{ fontSize: 'var(--font-size-metadata)', color: 'var(--color-text-muted)' }}>CP-10221</span></td>
                <td className={styles.demoTd}>09:30</td>
                <td className={styles.demoTd}><Badge variant="brand" dot>Checked in</Badge></td>
                <td className={styles.demoTd}><SeverityIndicator severity="routine" compact /></td>
                <td className={styles.demoTd}>22m</td>
                <td className={styles.demoTd}><WorkflowStatus status="waiting" compact /></td>
              </tr>
              <tr className={`${styles.demoTr} ${styles.demoTrMuted}`}>
                <td className={styles.demoTd}><strong>Sita Krishnan</strong><br /><span style={{ fontSize: 'var(--font-size-metadata)', color: 'var(--color-text-muted)' }}>CP-10099</span></td>
                <td className={styles.demoTd}>08:30</td>
                <td className={styles.demoTd}><Badge variant="success" dot>Completed</Badge></td>
                <td className={styles.demoTd}><SeverityIndicator severity="stable" compact /></td>
                <td className={styles.demoTd}>—</td>
                <td className={styles.demoTd}><WorkflowStatus status="completed" compact /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Drawers */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Drawers</h2>

        <div className={styles.drawerPreview}>
          <div className={styles.drawerMain}>← Main content area</div>
          <div className={styles.drawerPanel} aria-label="Task detail drawer">
            <div className={styles.drawerPanelHead}>
              <div>
                <SeverityIndicator severity="high" compact />
                <div className={styles.drawerPanelTitle} style={{ marginTop: 6 }}>Review glucose result</div>
              </div>
              <button className={styles.drawerPanelClose} aria-label="Close drawer">×</button>
            </div>
            <div className={styles.drawerPanelBody}>
              <div className={styles.drawerRow}>
                <span className={styles.drawerRowLabel}>Patient</span>
                <span className={styles.drawerRowValue}>Meera Iyer · CP-10482</span>
              </div>
              <div className={styles.drawerRow}>
                <span className={styles.drawerRowLabel}>Source</span>
                <span className={styles.drawerRowValue}>Lab · Fasting glucose 142 mg/dL</span>
              </div>
              <div className={styles.drawerRow}>
                <span className={styles.drawerRowLabel}>Due</span>
                <span className={styles.drawerRowValue}><TimingStatus timing="due-now" dueTime="09:15" /></span>
              </div>
              <div className={styles.drawerRow}>
                <span className={styles.drawerRowLabel}>Owner</span>
                <span className={styles.drawerRowValue}><OwnershipStatus status="assigned-to-me" owner="Dr. Ananya Rao" /></span>
              </div>
              <div className={styles.drawerRow}>
                <span className={styles.drawerRowLabel}>Status</span>
                <span className={styles.drawerRowValue}><WorkflowStatus status="under-review" /></span>
              </div>
            </div>
            <div className={styles.drawerPanelFoot}>
              <Button variant="primary" size="sm">Mark complete</Button>
              <Button variant="secondary" size="sm">Reassign</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Messages */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Messages</h2>

        <div className={styles.preview}>
          <div className={styles.messageThread}>
            <div className={styles.messageBubbleWrap}>
              <div className={`${styles.messageBubble} ${styles.messageBubbleIn}`}>
                Meera Iyer's glucose is 142 mg/dL. Can you review before the consultation?
              </div>
              <div className={styles.messageMeta}>Nurse Priya · 08:30</div>
            </div>

            <div className={`${styles.messageBubbleWrap} ${styles.messageBubbleWrapOut}`}>
              <div className={`${styles.messageBubble} ${styles.messageBubbleOut}`}>
                On it. Will adjust the consult plan. Please prep the glucometer.
              </div>
              <div className={styles.messageMeta}>Dr. Ananya Rao · 08:32</div>
            </div>

            <div>
              <div className={styles.messageAlertLabel}>Clinical alert</div>
              <div className={styles.messageAlert}>
                Patient Rohan Das (CP-10118) — BP reading 158/102 mmHg. Attending review requested by Nurse Priya.
              </div>
              <div className={styles.messageMeta}>System · 08:44</div>
            </div>
          </div>
        </div>
      </section>

      {/* Settings */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Settings</h2>

        <div className={styles.preview}>
          <div className={styles.settingDemoRow}>
            <div className={styles.settingDemoInfo}>
              <div className={styles.settingDemoLabel}>Clinical alerts</div>
              <div className={styles.settingDemoDesc}>Receive notifications for high-severity patient events</div>
            </div>
            <span className={styles.toggleTrack} aria-hidden="true" />
          </div>
          <div className={styles.settingDemoRow}>
            <div className={styles.settingDemoInfo}>
              <div className={styles.settingDemoLabel}>Shift reminders</div>
              <div className={styles.settingDemoDesc}>30-minute warning before shift handover</div>
            </div>
            <span className={`${styles.toggleTrack} ${styles.toggleOff}`} aria-hidden="true" />
          </div>
          <div className={styles.settingDemoRow}>
            <div className={styles.settingDemoInfo}>
              <div className={styles.settingDemoLabel}>Default time filter</div>
              <div className={styles.settingDemoDesc}>Starting view when opening Operational Insights</div>
            </div>
            <select className={styles.settingSelect} aria-label="Default time filter">
              <option>This shift</option>
              <option>Today</option>
              <option>Last 7 days</option>
            </select>
          </div>
          <div className={styles.settingDemoRow}>
            <div className={styles.settingDemoInfo}>
              <div className={styles.settingDemoLabel}>Language</div>
              <div className={styles.settingDemoDesc}>Interface display language</div>
            </div>
            <select className={styles.settingSelect} aria-label="Language">
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
            </select>
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Charts</h2>

        <div className={styles.preview}>
          <div className={styles.previewLabel}>Chart legend</div>
          <div className={styles.chartLegendRow}>
            <span className={styles.legendItem}>
              <span className={styles.legendSwatch} style={{ background: 'var(--color-brand-600)' }} />
              Actual arrivals
            </span>
            <span className={styles.legendItem}>
              <span className={styles.legendSwatch} style={{ background: '#DED9D5' }} />
              Expected baseline
            </span>
            <span className={styles.legendItem}>
              <span className={styles.legendDash} style={{ borderColor: 'var(--color-critical-600)' }} />
              Capacity threshold (15)
            </span>
          </div>
        </div>

        <div className={styles.preview}>
          <div className={styles.previewLabel}>Stat block</div>
          <div className={styles.chartStatRow}>
            <div className={styles.chartStat}>
              <span className={styles.chartStatNum}>100</span>
              <span className={styles.chartStatLabel}>actual arrivals</span>
            </div>
            <div className={styles.chartStat}>
              <span className={styles.chartStatNum}>82</span>
              <span className={styles.chartStatLabel}>expected</span>
            </div>
            <div className={`${styles.chartStat} ${styles.chartStatWarning}`}>
              <span className={styles.chartStatNum}>+22%</span>
              <span className={styles.chartStatLabel}>above expected</span>
            </div>
          </div>
        </div>

        <div className={styles.preview}>
          <div className={styles.previewLabel}>Capacity bars</div>
          <div className={styles.capacityDemo}>
            <div className={styles.capacityDemoRow}>
              <span className={styles.capacityDemoLabel}>General Medicine</span>
              <div className={styles.capacityBarWrap}>
                <div className={`${styles.capacityFill} ${styles.capHigh}`} style={{ width: '92%' }} />
              </div>
              <span className={styles.capacityText}>14 / 16</span>
              <Badge variant="warning">High</Badge>
            </div>
            <div className={styles.capacityDemoRow}>
              <span className={styles.capacityDemoLabel}>Cardiology</span>
              <div className={styles.capacityBarWrap}>
                <div className={`${styles.capacityFill} ${styles.capMod}`} style={{ width: '75%' }} />
              </div>
              <span className={styles.capacityText}>12 / 16</span>
              <Badge variant="brand">Moderate</Badge>
            </div>
            <div className={styles.capacityDemoRow}>
              <span className={styles.capacityDemoLabel}>Orthopaedics</span>
              <div className={styles.capacityBarWrap}>
                <div className={`${styles.capacityFill} ${styles.capStable}`} style={{ width: '50%' }} />
              </div>
              <span className={styles.capacityText}>8 / 16</span>
              <Badge variant="success">Stable</Badge>
            </div>
          </div>
        </div>

        <div className={styles.preview}>
          <div className={styles.previewLabel}>Time filter</div>
          <div className={styles.timeFilterRow} role="group" aria-label="Time period">
            <button className={`${styles.timeFilter} ${styles.timeFilterActive}`} aria-pressed="true">This shift</button>
            <button className={styles.timeFilter} aria-pressed="false">Today</button>
            <button className={styles.timeFilter} aria-pressed="false">Last 7 days</button>
          </div>
        </div>
      </section>

      {/* Inspirations */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Inspirations</h2>
        <p className={styles.sectionDesc}>
          Five reference categories shaped the visual language — chosen to move CareSync away from generic healthcare SaaS toward a workspace that feels operationally serious.
        </p>

        <div className={styles.principleGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            {
              num: '01',
              title: 'Enterprise command centres',
              desc: 'Bloomberg Terminal, aircraft cockpit HUDs, and ATC displays. Visual density in service of operational awareness — no decorative whitespace when the data matters.',
            },
            {
              num: '02',
              title: 'EHR density',
              desc: 'EPIC and Cerner clinical note layouts. Tight typography, tabular data, minimum chrome. Not beautiful, but deeply functional — a benchmark for what belongs on screen.',
            },
            {
              num: '03',
              title: 'Shift handover boards',
              desc: 'Physical ward whiteboards and nursing handover sheets. The original progressive disclosure model: critical items large and immediate, secondary context smaller and below.',
            },
            {
              num: '04',
              title: 'Operational queue management',
              desc: 'Airport gate displays, dispatch boards, ER triage screens. Sorted by urgency, not entry order. Status visible at a glance across the room.',
            },
            {
              num: '05',
              title: 'Warm editorial SaaS',
              desc: 'Linear, Notion, and Craft — warm neutrals and careful typographic rhythm as a counter to cold blue enterprise defaults. Legibility and focus over decoration.',
            },
          ].map(c => (
            <div key={c.num} className={styles.principleCard}>
              <div className={styles.principleNum}>{c.num}</div>
              <div className={styles.principleTitle}>{c.title}</div>
              <div className={styles.principleDesc}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </div>
  )
}
