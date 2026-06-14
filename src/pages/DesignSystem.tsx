import { useState } from 'react'
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

const NAV_SECTIONS = [
  { id: 'principles',      label: 'Design Principles' },
  { id: 'colors',          label: 'Color System' },
  { id: 'typography',      label: 'Typography' },
  { id: 'spacing',         label: 'Spacing & Radius' },
  { id: 'buttons',         label: 'Buttons' },
  { id: 'badges',          label: 'Badges & Status' },
  { id: 'patient-identity',label: 'Patient Identity' },
  { id: 'clinical-alerts', label: 'Clinical Alerts' },
  { id: 'cards',           label: 'Cards & Rails' },
  { id: 'tables',          label: 'Tables' },
  { id: 'drawers',         label: 'Drawers' },
  { id: 'messages',        label: 'Messages' },
  { id: 'settings',        label: 'Settings' },
  { id: 'charts',          label: 'Charts' },
  { id: 'accessibility',   label: 'Accessibility' },
  { id: 'usage-map',       label: 'Usage Map' },
]

export default function DesignSystem() {
  const [activeNav, setActiveNav] = useState('principles')

  const scrollTo = (id: string) => {
    setActiveNav(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={styles.page}>
      {/* ── Left sticky nav ── */}
      <nav className={styles.dsNav} aria-label="Design system navigation">
        <div className={styles.dsNavLabel}>CareSync DS</div>
        <ul className={styles.dsNavList}>
          {NAV_SECTIONS.map((s, i) => (
            <li key={s.id}>
              <button
                className={`${styles.dsNavItem} ${activeNav === s.id ? styles.dsNavItemActive : ''}`}
                onClick={() => scrollTo(s.id)}
              >
                {i + 1}. {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Main content ── */}
      <div className={styles.dsMain}>
        <h1 className={styles.pageTitle}>CareSync Design System</h1>
        <p className={styles.pageSub}>
          Component library, design tokens, and usage guidelines for the CareSync clinical
          command centre. All components are production-ready and WCAG 2.1 AA compliant.
        </p>

        {/* ──────────── 1. Design Principles ──────────── */}
        <section id="principles" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>1</span>
            Design Principles
          </h2>
          <p className={styles.sectionDesc}>
            Four principles guide every design decision in CareSync.
          </p>
          <div className={styles.principleGrid}>
            <div className={styles.principleCard}>
              <div className={styles.principleNum}>Principle 01</div>
              <div className={styles.principleTitle}>Clinical clarity</div>
              <div className={styles.principleDesc}>
                Every element must communicate clinical information with precision. Status,
                severity, and timing are never ambiguous. When information is missing, say so
                explicitly rather than leaving a blank.
              </div>
            </div>
            <div className={styles.principleCard}>
              <div className={styles.principleNum}>Principle 02</div>
              <div className={styles.principleTitle}>Calm under pressure</div>
              <div className={styles.principleDesc}>
                Reduce cognitive load during high-stakes moments. The interface stays
                quiet and structured — it amplifies the signal and suppresses the noise so
                clinicians can act, not interpret.
              </div>
            </div>
            <div className={styles.principleCard}>
              <div className={styles.principleNum}>Principle 03</div>
              <div className={styles.principleTitle}>Accessible by default</div>
              <div className={styles.principleDesc}>
                WCAG 2.1 AA compliance is a floor, not a goal. Focus rings, screen-reader
                summaries, and sufficient colour contrast are built in from the start — not
                retrofitted.
              </div>
            </div>
            <div className={styles.principleCard}>
              <div className={styles.principleNum}>Principle 04</div>
              <div className={styles.principleTitle}>Consistent patterns</div>
              <div className={styles.principleDesc}>
                Reuse established interactions rather than introducing new ones. A new
                component is a last resort. Prefer composing existing tokens and patterns
                — familiarity reduces errors.
              </div>
            </div>
          </div>
        </section>

        {/* ──────────── 2. Color System ──────────── */}
        <section id="colors" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>2</span>
            Color System
          </h2>
          <p className={styles.sectionDesc}>
            All colours are expressed as CSS custom properties in <code style={{ fontFamily: 'monospace', fontSize: 12 }}>src/styles/tokens.css</code>.
            Never hard-code hex values in component CSS — always reference a token.
          </p>

          <ColorGroup label="Brand (Aubergine)" swatches={[
            { name: 'Brand 50',  var: '--color-brand-50' },
            { name: 'Brand 100', var: '--color-brand-100' },
            { name: 'Brand 300', var: '--color-brand-300' },
            { name: 'Brand 600', var: '--color-brand-600' },
            { name: 'Brand 700', var: '--color-brand-700' },
            { name: 'Brand 800', var: '--color-brand-800' },
            { name: 'Brand 900', var: '--color-brand-900' },
          ]} />

          <ColorGroup label="Critical (Red)" swatches={[
            { name: 'Critical 50',  var: '--color-critical-50' },
            { name: 'Critical 200', var: '--color-critical-200' },
            { name: 'Critical 600', var: '--color-critical-600' },
            { name: 'Critical 700', var: '--color-critical-700' },
          ]} />

          <ColorGroup label="Warning (Amber)" swatches={[
            { name: 'Warning 50',  var: '--color-warning-50' },
            { name: 'Warning 200', var: '--color-warning-200' },
            { name: 'Warning 600', var: '--color-warning-600' },
            { name: 'Warning 700', var: '--color-warning-700' },
          ]} />

          <ColorGroup label="Success (Green)" swatches={[
            { name: 'Success 50',  var: '--color-success-50' },
            { name: 'Success 200', var: '--color-success-200' },
            { name: 'Success 600', var: '--color-success-600' },
            { name: 'Success 700', var: '--color-success-700' },
          ]} />

          <ColorGroup label="Neutral — Backgrounds" swatches={[
            { name: 'BG App',          var: '--color-bg-app' },
            { name: 'Surface Primary', var: '--color-surface-primary' },
            { name: 'Surface Secondary',var: '--color-surface-secondary' },
            { name: 'Surface Subtle',  var: '--color-surface-subtle' },
          ]} />

          <ColorGroup label="Neutral — Borders & Text" swatches={[
            { name: 'Border Default', var: '--color-border-default' },
            { name: 'Border Strong',  var: '--color-border-strong' },
            { name: 'Text Primary',   var: '--color-text-primary' },
            { name: 'Text Secondary', var: '--color-text-secondary' },
            { name: 'Text Muted',     var: '--color-text-muted' },
            { name: 'Text Disabled',  var: '--color-text-disabled' },
          ]} />
        </section>

        {/* ──────────── 3. Typography ──────────── */}
        <section id="typography" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>3</span>
            Typography
          </h2>
          <p className={styles.sectionDesc}>
            Eight type steps cover the full range from page headings to data labels. Use the
            CSS custom property, not the pixel value.
          </p>
          <div className={styles.preview}>
            {[
              { name: '--font-size-page-title',    spec: '28px / 600',  sample: 'Operational Insights' },
              { name: '--font-size-section-title', spec: '20px / 600',  sample: 'Department workload' },
              { name: '--font-size-subsection',    spec: '17px / 600',  sample: 'Arrivals vs expected' },
              { name: '--font-size-card-title',    spec: '15px / 600',  sample: 'Queue pressure' },
              { name: '--font-size-body',          spec: '14px / 400',  sample: 'Review triage allocation for this shift.' },
              { name: '--font-size-supporting',    spec: '13px / 400',  sample: 'Owner: Charge Nurse M. Patel' },
              { name: '--font-size-label',         spec: '12px / 600 uppercase', sample: 'PATIENT · STATUS · TIMING' },
              { name: '--font-size-metadata',      spec: '11px / 400',  sample: 'Updated 08:45 · Source: Appointment system' },
            ].map(row => (
              <div key={row.name} className={styles.typeRow}>
                <div className={styles.typeMeta}>
                  <div className={styles.typeName}>{row.name}</div>
                  <div className={styles.typeSpec}>{row.spec}</div>
                </div>
                <div className={styles.typeSample} style={{ fontSize: `var(${row.name})` }}>
                  {row.sample}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────── 4. Spacing & Radius ──────────── */}
        <section id="spacing" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>4</span>
            Spacing & Radius
          </h2>
          <p className={styles.sectionDesc}>
            12 spacing steps (4px base), 4 radius values, and 5 shadow levels.
          </p>

          <div className={styles.preview}>
            <div className={styles.previewLabel}>Spacing scale</div>
            <div className={styles.spaceGrid}>
              {[
                { token: '--space-1',  px: 4 },
                { token: '--space-2',  px: 8 },
                { token: '--space-3',  px: 12 },
                { token: '--space-4',  px: 16 },
                { token: '--space-5',  px: 20 },
                { token: '--space-6',  px: 24 },
                { token: '--space-8',  px: 32 },
                { token: '--space-10', px: 40 },
                { token: '--space-12', px: 48 },
              ].map(s => (
                <div key={s.token} className={styles.spaceRow}>
                  <div className={styles.spaceBar} style={{ width: s.px }} />
                  <span className={styles.spaceMeta}>{s.token} · {s.px}px</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.preview}>
            <div className={styles.previewLabel}>Border radius</div>
            <div className={styles.radiusGrid}>
              {[
                { token: '--radius-card',   px: 10,  label: 'Card\n10px' },
                { token: '--radius-button', px: 8,   label: 'Button\n8px' },
                { token: '--radius-input',  px: 8,   label: 'Input\n8px' },
                { token: '--radius-pill',   px: 999, label: 'Pill\n999px' },
              ].map(r => (
                <div key={r.token} className={styles.radiusBox}>
                  <div className={styles.radiusSample} style={{ borderRadius: r.px }} />
                  <div className={styles.radiusLabel}>{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.preview}>
            <div className={styles.previewLabel}>Shadow levels</div>
            <div className={styles.shadowGrid}>
              {[
                { token: '--shadow-card',        label: 'Card' },
                { token: '--shadow-card-raised',  label: 'Card raised' },
                { token: '--shadow-drawer',       label: 'Drawer' },
                { token: '--shadow-modal',        label: 'Modal' },
                { token: '--shadow-menu',         label: 'Menu' },
              ].slice(0, 3).map(s => (
                <div key={s.token} className={styles.shadowBox} style={{ boxShadow: `var(${s.token})` }}>
                  <div className={styles.shadowName}>{s.label}</div>
                  <div className={styles.shadowVar}>{s.token}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────── 5. Buttons ──────────── */}
        <section id="buttons" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>5</span>
            Buttons
          </h2>
          <p className={styles.sectionDesc}>
            Four variants × three sizes. Use <code style={{ fontFamily: 'monospace', fontSize: 12 }}>primary</code> for the main action,{' '}
            <code style={{ fontFamily: 'monospace', fontSize: 12 }}>secondary</code> for supporting actions,{' '}
            <code style={{ fontFamily: 'monospace', fontSize: 12 }}>ghost</code> for low-emphasis, and{' '}
            <code style={{ fontFamily: 'monospace', fontSize: 12 }}>danger</code> for destructive actions.
          </p>

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
              <Button variant="primary" size="lg">Large — 44px</Button>
              <Button variant="primary" size="md">Medium — 40px</Button>
              <Button variant="primary" size="sm">Small — 32px</Button>
            </div>
          </div>

          <div className={styles.preview}>
            <div className={styles.previewLabel}>Common clinical actions</div>
            <div className={styles.previewRow}>
              <Button variant="primary">Complete task</Button>
              <Button variant="secondary">Assign to teammate</Button>
              <Button variant="ghost">View record</Button>
              <Button variant="danger">Escalate</Button>
            </div>
          </div>
        </section>

        {/* ──────────── 6. Badges & Status ──────────── */}
        <section id="badges" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>6</span>
            Badges &amp; Status
          </h2>
          <p className={styles.sectionDesc}>
            Five status component families. Every chip includes visible text — never convey
            status via colour alone.
          </p>

          <div className={styles.preview}>
            <div className={styles.statusGroup}>
              <div className={styles.statusGroupLabel}>Badge — general purpose labels</div>
              <div className={styles.previewRow}>
                <Badge variant="default">Default</Badge>
                <Badge variant="brand">Brand</Badge>
                <Badge variant="critical" dot>Critical</Badge>
                <Badge variant="warning" dot>Warning</Badge>
                <Badge variant="success" dot>Success</Badge>
              </div>
            </div>

            <div className={styles.statusGroup}>
              <div className={styles.statusGroupLabel}>SeverityIndicator — clinical severity</div>
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
              <div className={styles.statusGroupLabel}>WorkflowStatus — task lifecycle</div>
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
              <div className={styles.statusGroupLabel}>TimingStatus — due-time awareness</div>
              <div className={styles.previewRow}>
                <TimingStatus timing="overdue" dueTime="09:15" />
                <TimingStatus timing="due-now" dueTime="Now" />
                <TimingStatus timing="due-soon" dueTime="10:00" />
                <TimingStatus timing="due-later" dueTime="14:30" />
                <TimingStatus timing="no-due" />
              </div>
            </div>

            <div className={styles.statusGroup} style={{ marginBottom: 0 }}>
              <div className={styles.statusGroupLabel}>OwnershipStatus — assignment state</div>
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

        {/* ──────────── 7. Patient Identity ──────────── */}
        <section id="patient-identity" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>7</span>
            Patient Identity Components
          </h2>
          <p className={styles.sectionDesc}>
            <code style={{ fontFamily: 'monospace', fontSize: 12 }}>PatientIdentityBlock</code> and{' '}
            <code style={{ fontFamily: 'monospace', fontSize: 12 }}>PatientSafetyStrip</code> always appear together
            when a patient's identity must be confirmed before a clinical action.
          </p>

          <div className={styles.preview}>
            <div className={styles.previewLabel}>PatientIdentityBlock — full</div>
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

        {/* ──────────── 8. Clinical Alerts ──────────── */}
        <section id="clinical-alerts" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>8</span>
            Clinical Alert Components
          </h2>
          <p className={styles.sectionDesc}>
            The five severity levels map to escalating visual weight. Critical and High use
            warm reds; Moderate uses brand aubergine; Routine and Stable use cool neutrals.
          </p>

          <div className={styles.preview}>
            <table className={styles.tokenTable}>
              <thead>
                <tr>
                  <th className={styles.tokenTh}>Severity</th>
                  <th className={styles.tokenTh}>Badge</th>
                  <th className={styles.tokenTh}>Clinical meaning</th>
                  <th className={styles.tokenTh}>Border token</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sev: 'critical' as const, meaning: 'Immediate intervention required — life-threatening', border: '--color-critical-600' },
                  { sev: 'high' as const,     meaning: 'Close monitoring required — deteriorating or at risk', border: '--color-critical-200' },
                  { sev: 'moderate' as const, meaning: 'Active management underway — stable but elevated', border: '--color-brand-300' },
                  { sev: 'routine' as const,  meaning: 'Standard care — no elevated risk identified', border: '--color-border-default' },
                  { sev: 'stable' as const,   meaning: 'No active issues — discharge or observation only', border: '--color-success-200' },
                ].map(row => (
                  <tr key={row.sev} className={styles.tokenTr}>
                    <td className={styles.tokenTd}><SeverityIndicator severity={row.sev} /></td>
                    <td className={styles.tokenTd}><SeverityIndicator severity={row.sev} showDot={false} /></td>
                    <td className={styles.tokenTd}>{row.meaning}</td>
                    <td className={`${styles.tokenTd} ${styles.tokenMono}`}>{row.border}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ──────────── 9. Cards & Rails ──────────── */}
        <section id="cards" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>9</span>
            Cards &amp; Rails
          </h2>
          <p className={styles.sectionDesc}>
            <code style={{ fontFamily: 'monospace', fontSize: 12 }}>SectionCard</code> is the primary content container.
            Use <code style={{ fontFamily: 'monospace', fontSize: 12 }}>noPadding</code> when the child manages its own spacing
            (e.g. tables), and <code style={{ fontFamily: 'monospace', fontSize: 12 }}>compact</code> in dense list views.
          </p>

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
                Card without a title — content only. Used for supplementary information blocks.
              </p>
            </SectionCard>
          </div>
        </section>

        {/* ──────────── 10. Tables ──────────── */}
        <section id="tables" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>10</span>
            Tables
          </h2>
          <p className={styles.sectionDesc}>
            All tables use uppercase label headers, 1px row dividers, and the CareSync row
            selection pattern: <code style={{ fontFamily: 'monospace', fontSize: 12 }}>inset 3px 0 0 var(--color-brand-600)</code> left-accent on the active row.
          </p>

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

        {/* ──────────── 11. Drawers ──────────── */}
        <section id="drawers" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>11</span>
            Drawers / Side Panels
          </h2>
          <p className={styles.sectionDesc}>
            Drawers slide in from the right at 380px width. They are used for task detail,
            message detail, and patient quick-views without leaving the current screen.
          </p>

          <div className={styles.drawerPreview}>
            <div className={styles.drawerMain}>
              ← Main content area
            </div>
            <div className={styles.drawerPanel} aria-label="Task detail drawer">
              <div className={styles.drawerPanelHead}>
                <div>
                  <SeverityIndicator severity="high" compact />
                  <div className={styles.drawerPanelTitle} style={{ marginTop: 6 }}>
                    Review glucose result
                  </div>
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
                  <span className={styles.drawerRowValue}>Lab result — Fasting glucose 142 mg/dL</span>
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

        {/* ──────────── 12. Messages ──────────── */}
        <section id="messages" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>12</span>
            Messages
          </h2>
          <p className={styles.sectionDesc}>
            Three message patterns: inbound (from colleagues or systems), outbound (sent by
            the current user), and clinical alerts (escalation notifications with warning
            band styling).
          </p>

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
                  On it — will adjust the consult plan. Please prep the glucometer.
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

        {/* ──────────── 13. Settings ──────────── */}
        <section id="settings" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>13</span>
            Settings Components
          </h2>
          <p className={styles.sectionDesc}>
            Setting rows, toggles, and select controls used on the Settings screen. The
            toggle uses a visually hidden checkbox with a custom track — fully keyboard accessible.
          </p>

          <div className={styles.preview}>
            <div className={styles.previewLabel}>Setting rows with toggle controls</div>
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

        {/* ──────────── 14. Charts ──────────── */}
        <section id="charts" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>14</span>
            Charts &amp; Operational Insights
          </h2>
          <p className={styles.sectionDesc}>
            Chart patterns from the Operational Insights screen. All recharts instances include
            an <code style={{ fontFamily: 'monospace', fontSize: 12 }}>AccessibleChartSummary</code> for screen readers.
          </p>

          <div className={styles.preview}>
            <div className={styles.previewLabel}>Chart legend — 3-item pattern</div>
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
            <div className={styles.previewLabel}>Chart stat block</div>
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
            <div className={styles.previewLabel}>Capacity bars — three states</div>
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
            <div className={styles.previewLabel}>Time filter — segmented control</div>
            <div className={styles.timeFilterRow} role="group" aria-label="Time period">
              <button className={`${styles.timeFilter} ${styles.timeFilterActive}`} aria-pressed="true">This shift</button>
              <button className={styles.timeFilter} aria-pressed="false">Today</button>
              <button className={styles.timeFilter} aria-pressed="false">Last 7 days</button>
            </div>
          </div>
        </section>

        {/* ──────────── 15. Accessibility ──────────── */}
        <section id="accessibility" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>15</span>
            Accessibility Guidelines
          </h2>
          <p className={styles.sectionDesc}>
            CareSync targets WCAG 2.1 AA. The following rules are enforced across every
            component.
          </p>

          <div className={styles.preview}>
            <div className={styles.previewLabel}>Focus ring — 3px brand glow</div>
            <div className={styles.focusRow}>
              <button className={styles.focusItem}>Default button</button>
              <button className={`${styles.focusItem} ${styles.focusItemActive}`}>
                Focused (simulated)
              </button>
              <Button variant="primary" size="sm">Brand button</Button>
            </div>
            <p style={{ fontSize: 'var(--font-size-supporting)', color: 'var(--color-text-muted)', marginTop: 12 }}>
              Token: <code style={{ fontFamily: 'monospace' }}>--focus-ring: 0 0 0 3px rgba(85, 48, 82, 0.4)</code>
            </p>
          </div>

          <div className={styles.preview}>
            <ul className={styles.a11yList}>
              <li>All interactive elements have visible focus rings using <code>--focus-ring</code></li>
              <li>Minimum touch target: 36px for icon buttons, 40px for primary actions (44px large)</li>
              <li>All status indicators show visible text — never colour alone (e.g. <code>SeverityIndicator</code>)</li>
              <li>Charts provide a screen-reader summary via <code>AccessibleChartSummary</code> + <code>.sr-only</code></li>
              <li>Reduced-motion is respected — transition durations collapse when <code>prefers-reduced-motion: reduce</code></li>
              <li>Drawers and dialogs use <code>role="dialog"</code> and <code>aria-modal="true"</code> with focus trapping</li>
              <li>Tables include <code>&lt;caption className="sr-only"&gt;</code> for screen reader context</li>
              <li>Tabular numerals on all clinical data: <code>font-variant-numeric: tabular-nums</code></li>
              <li>Alert messages use <code>role="alert"</code> for live-region announcement (PatientSafetyStrip)</li>
              <li>Colour contrast: text on white ≥ 4.5:1; large text ≥ 3:1; non-text UI ≥ 3:1</li>
            </ul>
          </div>
        </section>

        {/* ──────────── 16. Usage Map ──────────── */}
        <section id="usage-map" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>16</span>
            Component Usage Map
          </h2>
          <p className={styles.sectionDesc}>
            Which components appear on which screens. Use this to understand the blast radius
            of any change.
          </p>

          <table className={styles.usageTable}>
            <thead>
              <tr>
                <th className={styles.usageTh}>Component</th>
                <th className={styles.usageTh}>Used on screens</th>
                <th className={styles.usageTh}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  component: 'SeverityIndicator',
                  screens: ['Patient record', 'Queue', 'Tasks', 'Messages'],
                  notes: 'Always paired with a text label. Never standalone colour.',
                },
                {
                  component: 'WorkflowStatus',
                  screens: ['Tasks', 'Messages'],
                  notes: 'Tracks task lifecycle from New → Resolved.',
                },
                {
                  component: 'TimingStatus',
                  screens: ['Tasks'],
                  notes: 'Shows relative urgency using clock icon.',
                },
                {
                  component: 'OwnershipStatus',
                  screens: ['Tasks'],
                  notes: 'Identifies who is responsible for a task.',
                },
                {
                  component: 'Badge',
                  screens: ['Queue', 'Tasks', 'Messages', 'Design System'],
                  notes: 'General-purpose label — 5 semantic variants.',
                },
                {
                  component: 'PatientIdentityBlock',
                  screens: ['Patient record', 'Queue'],
                  notes: 'Always confirm identity before clinical action.',
                },
                {
                  component: 'PatientSafetyStrip',
                  screens: ['Patient record', 'Queue'],
                  notes: 'role="alert" — auto-announced to screen readers.',
                },
                {
                  component: 'Button',
                  screens: ['All screens'],
                  notes: '4 variants × 3 sizes. Primary for one action per view.',
                },
                {
                  component: 'SectionCard',
                  screens: ['Patient record', 'Settings'],
                  notes: 'noPadding when child owns spacing (e.g. tables).',
                },
                {
                  component: 'PageHeader',
                  screens: ['All main screens'],
                  notes: 'Accepts optional actions slot for segmented controls.',
                },
                {
                  component: 'Drawer',
                  screens: ['Tasks', 'Messages'],
                  notes: '380px width, slide-in from right, focus-trapped.',
                },
                {
                  component: 'DataTable / FilterBar',
                  screens: ['Queue', 'Tasks', 'Messages'],
                  notes: 'Shared table and filter primitives.',
                },
                {
                  component: 'AccessibleChartSummary',
                  screens: ['Patient record', 'Operational Insights'],
                  notes: 'sr-only companion to all recharts instances.',
                },
                {
                  component: 'ClinicalMetric',
                  screens: ['Patient record'],
                  notes: 'Structured vital sign display with trend indicator.',
                },
                {
                  component: 'GlucoseChart / BloodPressureChart',
                  screens: ['Patient record'],
                  notes: 'Sparkline trend charts using recharts AreaChart.',
                },
              ].map(row => (
                <tr key={row.component} className={styles.usageTr}>
                  <td className={`${styles.usageTd} ${styles.usageTdComponent}`}>{row.component}</td>
                  <td className={styles.usageTd}>
                    <div className={styles.usageChipWrap}>
                      {row.screens.map(s => (
                        <span key={s} className={styles.usageChip}>{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className={styles.usageTd}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}

function ColorGroup({ label, swatches }: { label: string; swatches: { name: string; var: string }[] }) {
  return (
    <div className={styles.colorGroup}>
      <div className={styles.colorGroupLabel}>{label}</div>
      <div className={styles.colorGrid}>
        {swatches.map(s => (
          <div key={s.var} className={styles.colorSwatch}>
            <div className={styles.colorBlock} style={{ background: `var(${s.var})` }} />
            <div className={styles.colorName}>{s.name}</div>
            <div className={styles.colorVar}>{s.var}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
