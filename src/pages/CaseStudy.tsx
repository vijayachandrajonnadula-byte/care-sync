import { useNavigate } from 'react-router-dom'
import SeverityIndicator from '../components/status/SeverityIndicator'
import WorkflowStatus from '../components/status/WorkflowStatus'
import TimingStatus from '../components/status/TimingStatus'
import OwnershipStatus from '../components/status/OwnershipStatus'
import Badge from '../components/status/Badge'
import Button from '../components/buttons/Button'
import PatientSafetyStrip from '../components/clinical/PatientSafetyStrip'
import styles from './CaseStudy.module.css'

export default function CaseStudy() {
  const navigate = useNavigate()

  return (
    <div className={styles.overlay}>
      {/* Fixed back nav */}
      <nav className={styles.backNav}>
        <button className={styles.backLink} onClick={() => navigate('/shift-briefing')}>
          ← CareSync Product
        </button>
        <span className={styles.backNavTitle}>Case Study</span>
      </nav>

      <div className={styles.page}>

        {/* ══════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════ */}
        <div className={styles.hero}>
          <div className={styles.inner}>
            <div className={styles.heroEyebrow}>
              <span className={styles.heroEyebrowTag}>UX / UI Case Study</span>
              <span className={styles.heroEyebrowDot}>·</span>
              <span className={styles.heroEyebrowRoute}>localhost:5173/case-study</span>
            </div>
            <h1 className={styles.heroTitle}>
              Care<span className={styles.heroTitleAccent}>Sync</span>
            </h1>
            <p className={styles.heroSub}>
              Reframing a healthcare SaaS dashboard into a shift-based clinical command centre for outpatient clinicians.
            </p>
            <p className={styles.heroHook}>
              "The problem was not that doctors needed more data. They needed to know what needed attention before the next patient walked in."
            </p>

            <div className={styles.heroMeta}>
              {[
                { label: 'Role', value: 'UX/UI & Visual Designer' },
                { label: 'Focus', value: 'Product strategy · UX · UI · Design system · Accessibility' },
                { label: 'Timeline', value: 'Assignment sprint' },
                { label: 'Tools', value: 'Claude · Claude Code · HTML/CSS · Figma-ready HTML' },
                { label: 'Platform', value: 'Enterprise SaaS · Web app' },
              ].map(m => (
                <div key={m.label} className={styles.heroMetaCard}>
                  <div className={styles.heroMetaLabel}>{m.label}</div>
                  <div className={styles.heroMetaValue}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Mini product preview */}
            <div className={styles.heroPreview}>
              <div className={styles.miniCard}>
                <div className={styles.miniCardHead}>
                  <span className={styles.miniCardTitle}>Shift Briefing — Morning</span>
                  <span className={styles.miniCardMeta}>Dr. Ananya Rao · 08:47 AM</span>
                </div>
                <div className={styles.miniCardBody}>
                  <div className={`${styles.miniPatientRow} ${styles.miniPatientRowCrit}`}>
                    <span className={`${styles.miniChip} ${styles.miniChipCrit}`}>High</span>
                    <span className={styles.miniPatientName}>Meera Iyer</span>
                    <span className={styles.miniPatientNote}>Glucose 142 mg/dL · Review before 09:00</span>
                    <span className={`${styles.miniChip} ${styles.miniChipWarn}`}>Due now</span>
                  </div>
                  <div className={styles.miniPatientRow}>
                    <span className={`${styles.miniChip} ${styles.miniChipWarn}`}>Due</span>
                    <span className={styles.miniPatientName}>Rohan Das</span>
                    <span className={styles.miniPatientNote}>Lisinopril refill — sign before 09:15</span>
                  </div>
                  <div className={styles.miniPatientRow}>
                    <span className={`${styles.miniChip} ${styles.miniChipBrand}`}>Waiting</span>
                    <span className={styles.miniPatientName}>Arjun Nair</span>
                    <span className={styles.miniPatientNote}>22m wait · Room pending</span>
                  </div>
                </div>
              </div>

              <div className={styles.miniModelRow}>
                <div className={styles.miniModelCard}>
                  <span className={`${styles.miniModelLabel} ${styles.miniModelLabelNow}`}>Now</span>
                  <span className={styles.miniModelText}>Immediate clinical attention — before the next patient</span>
                </div>
                <div className={styles.miniModelCard}>
                  <span className={`${styles.miniModelLabel} ${styles.miniModelLabelNext}`}>Next</span>
                  <span className={styles.miniModelText}>Upcoming appointments and clinical prep status</span>
                </div>
                <div className={styles.miniModelCard}>
                  <span className={`${styles.miniModelLabel} ${styles.miniModelLabelLater}`}>Later</span>
                  <span className={styles.miniModelText}>Handovers, pending reviews, shift follow-through</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            2. THE ASSIGNMENT CHALLENGE
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>01 — The challenge</div>
            <h2 className={styles.sectionTitle}>From dashboard assignment to design reframe</h2>
            <p className={styles.sectionDesc}>
              The brief said: design a modern healthcare provider dashboard for SaaS. Most solutions
              to this brief look predictable — blue, KPI-heavy, AI-generated, visually generic. The
              design challenge I set for myself was harder.
            </p>

            <div className={styles.challengeGrid}>
              <div className={`${styles.challengeCard} ${styles.challengeBefore}`}>
                <div className={styles.challengeCardLabel}>Generic dashboard asks</div>
                <p className={styles.challengeQ}>"How many appointments do we have today?"</p>
                <div className={styles.challengeCardLabel} style={{ marginTop: 16 }}>Generic dashboard shows</div>
                <ul className={styles.challengeList}>
                  <li>KPI tiles in a 4-up grid</li>
                  <li>Blue bar charts for volume metrics</li>
                  <li>Generic patient list tables</li>
                  <li>Decorative gauge charts</li>
                  <li>No clinical priority model</li>
                </ul>
              </div>

              <div className={styles.challengeArrow}>→</div>

              <div className={`${styles.challengeCard} ${styles.challengeAfter}`}>
                <div className={`${styles.challengeCardLabel} ${styles.challengeCardLabelAfter}`}>CareSync asks</div>
                <p className={styles.challengeQ}>"What needs attention before the next consultation?"</p>
                <div className={`${styles.challengeCardLabel} ${styles.challengeCardLabelAfter}`} style={{ marginTop: 16 }}>CareSync shows</div>
                <ul className={`${styles.challengeList} ${styles.challengeListAfter}`}>
                  <li>Patients with abnormal lab changes</li>
                  <li>Tasks handed over from night shift</li>
                  <li>Upcoming appointments and their prep status</li>
                  <li>Queue pressure and waiting delays</li>
                  <li>Clinical ownership — who owns what</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            3. PROBLEM FRAMING
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionWarm}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>02 — Problem framing</div>
            <h2 className={styles.sectionTitle}>A doctor starting a shift does not need a dashboard first</h2>
            <p className={styles.sectionDesc}>
              They need a safe operational briefing. The first minutes of a shift are the highest-risk
              window — the most context switches, the most incomplete information, the most
              handover gaps. An analytics dashboard at this moment is noise.
            </p>

            <div className={styles.problemQuestions}>
              {[
                'Which patient needs review before the 09:00 consultation?',
                'Which lab result changed since the last visit?',
                'Which prescription request is waiting for a signature?',
                'Which handover item came from night shift — and was it acknowledged?',
                'Which appointment is delayed and does the patient know?',
                'Which issue can safely wait until after the first consultation?',
              ].map(q => (
                <div key={q} className={styles.problemQuestion}>{q}</div>
              ))}
            </div>

            <div className={styles.tensionDiagram}>
              <div className={styles.tensionStep}>
                <div className={styles.tensionStepIcon}>⚡</div>
                <div className={styles.tensionStepTitle}>Noise</div>
                <div className={styles.tensionStepDesc}>Everything arriving at equal weight — lab results, admin, queue alerts, chat, reminders</div>
              </div>
              <div className={styles.tensionArrow}>→</div>
              <div className={styles.tensionStep}>
                <div className={styles.tensionStepIcon}>🎯</div>
                <div className={styles.tensionStepTitle}>Priority</div>
                <div className={styles.tensionStepDesc}>Severity, timing, and ownership applied — critical items rise, safe items recede</div>
              </div>
              <div className={styles.tensionArrow}>→</div>
              <div className={styles.tensionStep}>
                <div className={styles.tensionStepIcon}>✓</div>
                <div className={styles.tensionStepTitle}>Action</div>
                <div className={styles.tensionStepDesc}>The right action surface at the right moment — review, assign, acknowledge, defer</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            4. RESEARCH AND DISCOVERY
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>03 — Research &amp; discovery</div>
            <h2 className={styles.sectionTitle}>What the research showed</h2>
            <p className={styles.sectionDesc}>
              No live clinician interviews — this was a design assignment sprint. Instead: desk
              research, workflow assumption mapping, clinical SaaS heuristic review, and
              scenario-based task analysis. Here is what shaped the design.
            </p>

            <div className={styles.researchInsights}>
              {[
                {
                  num: 'Insight 01',
                  title: 'Healthcare dashboards over-index on metrics and under-support immediate clinical action',
                  desc: 'Most reviewed products surface KPIs for administrators, not the operational context clinicians need at the start of a shift.',
                },
                {
                  num: 'Insight 02',
                  title: 'Doctors need patient context, result source, time, and ownership visible together',
                  desc: 'When these four dimensions are split across tabs or screens, the cognitive load required to construct clinical context is too high.',
                },
                {
                  num: 'Insight 03',
                  title: 'Clinical safety states must be visually distinct from operational warning states',
                  desc: 'Red should mean "patient safety risk". Amber should mean "review required". Mixing these signals creates alert fatigue and desensitises response.',
                },
                {
                  num: 'Insight 04',
                  title: 'Shift work needs continuity — inherited tasks and upcoming events must coexist',
                  desc: 'A shift briefing view must simultaneously surface what was handed over (past), what is pending (now), and what is coming (future).',
                },
              ].map(r => (
                <div key={r.num} className={styles.researchInsight}>
                  <div className={styles.researchInsightNum}>{r.num}</div>
                  <div className={styles.researchInsightTitle}>{r.title}</div>
                  <div className={styles.researchInsightDesc}>{r.desc}</div>
                </div>
              ))}
            </div>

            <div className={styles.artifactCards}>
              {[
                {
                  type: 'Workflow mapping',
                  title: 'Shift start sequence',
                  note: 'Login → briefing → triage → first consultation: 4 distinct mental modes in under 15 minutes.',
                },
                {
                  type: 'Heuristic review',
                  title: 'Dashboard anti-patterns',
                  note: 'Big greeting banners, equal-weight KPI tiles, and chart-first layouts all delay clinical action.',
                },
                {
                  type: 'Pattern review',
                  title: 'Enterprise SaaS conventions',
                  note: 'Row-click drawers, sticky sidebar nav, and table-first layouts reduce training time for power users.',
                },
                {
                  type: 'Safety analysis',
                  title: 'Clinical colour semantics',
                  note: 'Red reserved for patient safety. Amber for review/urgency. Green for stable/complete only.',
                },
              ].map(a => (
                <div key={a.title} className={styles.artifactCard}>
                  <div className={styles.artifactType}>{a.type}</div>
                  <div className={styles.artifactTitle}>{a.title}</div>
                  <div className={styles.artifactNote}>{a.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            5. THE REFRAMING MOMENT
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.inner}>
            <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`}>04 — The design reframe</div>
            <p className={styles.reframingStatement}>
              "I stopped designing a <span className={styles.reframingAccent}>dashboard</span> and started designing a <span className={styles.reframingAccent}>shift</span>."
            </p>

            <div className={styles.modelGrid}>
              <div className={`${styles.modelCard} ${styles.modelCardNow}`}>
                <div className={`${styles.modelTag} ${styles.modelTagNow}`}>Now</div>
                <div className={styles.modelTitle}>Immediate attention</div>
                <div className={styles.modelDesc}>What requires clinical action before the next consultation. The highest-urgency surface in the product.</div>
                <ul className={styles.modelItems}>
                  <li>Meera Iyer — glucose 142 mg/dL, review due</li>
                  <li>Rohan Das — Lisinopril refill, sign before 09:15</li>
                  <li>Abnormal lab results flagged since last visit</li>
                  <li>Handover tasks from night shift</li>
                </ul>
              </div>
              <div className={`${styles.modelCard} ${styles.modelCardNext}`}>
                <div className={`${styles.modelTag} ${styles.modelTagNext}`}>Next</div>
                <div className={styles.modelTitle}>Upcoming appointments</div>
                <div className={styles.modelDesc}>The next 90 minutes of consultations with preparation status visible before the patient walks in.</div>
                <ul className={styles.modelItems}>
                  <li>09:30 — Arjun Nair, waiting 22m, room pending</li>
                  <li>10:00 — Kavya Menon, new thyroid diagnostic report</li>
                  <li>10:30 — Sita Krishnan, post-op follow-up</li>
                  <li>Preparation notes and delay status per slot</li>
                </ul>
              </div>
              <div className={`${styles.modelCard} ${styles.modelCardLater}`}>
                <div className={`${styles.modelTag} ${styles.modelTagLater}`}>Later</div>
                <div className={styles.modelTitle}>Shift follow-through</div>
                <div className={styles.modelDesc}>What can be deferred without risk. Structured as workstreams, not individual alerts competing for attention.</div>
                <ul className={styles.modelItems}>
                  <li>Pending prescription reviews</li>
                  <li>Missed follow-up flag for Kavya Menon</li>
                  <li>Operational Insights — queue pressure review</li>
                  <li>End-of-shift handover items</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            6. INFORMATION ARCHITECTURE
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>05 — Information architecture</div>
            <h2 className={styles.sectionTitle}>Eight screens. One mental model.</h2>
            <p className={styles.sectionDesc}>
              Every nav item maps to a mode of clinical or operational attention. The order is deliberate:
              shift start → patient → appointment → record → communication → action → analysis → admin.
            </p>

            <div className={styles.iaGrid}>
              {[
                { nav: 'Shift Briefing', title: 'Command centre', desc: 'Start-of-shift operational view. Now / Next / Later.', primary: true, highlight: false, note: '' },
                { nav: 'Patients', title: 'Patient list', desc: 'Search, scan, and review. Row click opens quick view drawer.', primary: true, highlight: false, note: '' },
                { nav: 'Appointments', title: 'Outpatient queue', desc: 'Live consultation readiness. Flow status, wait time, room, prep.', primary: true, highlight: false, note: '' },
                { nav: 'Medical Records', title: 'Shift records worklist', desc: 'Review lab results and records across all patients on shift.', primary: false, highlight: true, note: '↑ Redesigned from single-patient record to shift-level worklist' },
                { nav: 'Messages', title: 'Clinical inbox', desc: 'Severity-aware message triage. Not a generic chat interface.', primary: false, highlight: false, note: '' },
                { nav: 'Tasks', title: 'Handover workflow', desc: 'Inherited shift tasks, due actions, handover structure.', primary: false, highlight: false, note: '' },
                { nav: 'Operational Insights', title: 'Queue analytics', desc: 'Arrivals vs expected, workload table, capacity threshold.', primary: false, highlight: false, note: '' },
                { nav: 'Settings', title: 'Shift & safety prefs', desc: 'Shift, notifications, display, security, accessibility.', primary: false, highlight: false, note: '' },
              ].map(item => (
                <div key={item.nav} className={`${styles.iaCard} ${item.primary ? styles.iaCardPrimary : ''} ${item.highlight ? styles.iaCardHighlight : ''}`}>
                  <div className={`${styles.iaNav} ${item.highlight ? styles.iaNavHighlight : ''}`}>{item.nav}</div>
                  <div className={styles.iaTitle}>{item.title}</div>
                  <div className={styles.iaDesc}>{item.desc}</div>
                  {item.note && <div className={styles.iaNote}>{item.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            7. USER FLOW DIAGRAM
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionWarm}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>06 — User flows</div>
            <h2 className={styles.sectionTitle}>How the product moves</h2>
            <p className={styles.sectionDesc}>
              Six core task flows. Each designed to minimise context switching and keep the
              clinician anchored to the patient being reviewed.
            </p>

            <div className={styles.flowSection}>
              {[
                {
                  label: 'Flow 1 — Shift start',
                  nodes: [
                    { label: 'Login', type: 'start' },
                    { label: 'Shift Briefing', type: 'default' },
                    { label: 'Meera priority card', type: 'crit' },
                    { label: 'Patient profile', type: 'default' },
                    { label: 'Begin consultation', type: 'end' },
                  ],
                },
                {
                  label: 'Flow 2 — Patient quick review',
                  nodes: [
                    { label: 'Patients table', type: 'default' },
                    { label: 'Row click', type: 'default' },
                    { label: 'Quick view drawer', type: 'default' },
                    { label: 'Open full profile', type: 'end' },
                  ],
                },
                {
                  label: 'Flow 3 — Appointment prep',
                  nodes: [
                    { label: 'Appointments', type: 'default' },
                    { label: 'Row click', type: 'default' },
                    { label: 'Appointment detail', type: 'default' },
                    { label: 'Review prep note', type: 'warn' },
                    { label: 'Begin consultation', type: 'end' },
                  ],
                },
                {
                  label: 'Flow 4 — Message → action',
                  nodes: [
                    { label: 'Messages', type: 'default' },
                    { label: 'Abnormal glucose alert', type: 'crit' },
                    { label: 'Review lab result', type: 'default' },
                    { label: 'Create task', type: 'warn' },
                    { label: 'Acknowledged', type: 'end' },
                  ],
                },
                {
                  label: 'Flow 5 — Task completion',
                  nodes: [
                    { label: 'Tasks', type: 'default' },
                    { label: 'Rohan refill — due now', type: 'warn' },
                    { label: 'Task detail drawer', type: 'default' },
                    { label: 'Review record', type: 'default' },
                    { label: 'Mark complete', type: 'end' },
                  ],
                },
                {
                  label: 'Flow 6 — Medical records worklist',
                  nodes: [
                    { label: 'Medical Records', type: 'default' },
                    { label: 'Kavya — new thyroid report', type: 'warn' },
                    { label: 'Record detail drawer', type: 'default' },
                    { label: 'Review & annotate', type: 'default' },
                    { label: 'Record updated', type: 'end' },
                  ],
                },
              ].map(flow => (
                <div key={flow.label} className={styles.flowBlock}>
                  <div className={styles.flowBlockLabel}>{flow.label}</div>
                  <div className={styles.flowRow}>
                    {flow.nodes.map((node, i) => (
                      <span key={i} style={{ display: 'contents' }}>
                        <div className={`${styles.flowNode} ${node.type === 'start' ? styles.flowNodeStart : node.type === 'end' ? styles.flowNodeEnd : node.type === 'warn' ? styles.flowNodeWarn : node.type === 'crit' ? styles.flowNodeCrit : ''}`}>
                          {node.label}
                        </div>
                        {i < flow.nodes.length - 1 && <span className={styles.flowArrow}>→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            DESIGN SYSTEM CREATION — CHAPTER OPENER
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionDarkest}`}>
          <div className={styles.inner} style={{ textAlign: 'center' }}>
            <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`} style={{ textAlign: 'center', marginBottom: 28 }}>Design language — how and why</div>
            <p className={styles.dsChapterQuote}>
              "The design system did not start with colours.<br />It started with a question."
            </p>
            <p className={styles.dsChapterSub}>
              How should a doctor feel at the beginning of a busy shift? Not overwhelmed by data. Not performing data entry.{' '}
              <em style={{ color: 'var(--color-brand-300)' }}>Ready to act.</em>
            </p>
            <p className={styles.dsChapterSub}>
              The first direction felt too familiar — blue surfaces, generic KPI cards, rounded widgets, and decorative charts. It looked like healthcare, but it did not feel operational. CareSync had to move from a dashboard you browse to a clinical workspace you act from. That required a new visual language, built deliberately from the product's clinical purpose.
            </p>
          </div>
        </div>

        {/* 1. VISUAL DIRECTION */}
        <div className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>Design language — 01</div>
            <h2 className={styles.sectionTitle}>Visual direction: what to avoid and what to move toward</h2>
            <p className={styles.sectionDesc}>
              The design system started with a visual audit. Most healthcare SaaS tools share the same aesthetic vocabulary — blue trust signals, gradient headers, oversized KPI tiles, and generic patient cards. CareSync needed to look and feel different for a deliberate reason, not just aesthetic preference.
            </p>
            <div className={styles.directionGrid}>
              <div className={styles.directionPanel}>
                <div className={`${styles.directionPanelHead} ${styles.directionPanelAvoid}`}>What I avoided — and why</div>
                <ul className={styles.directionList}>
                  {[
                    'Generic blue healthcare palette — makes every EHR and clinical SaaS look identical',
                    'Large KPI tiles at equal visual weight — no triage priority, just data volume',
                    'Glassmorphism and gradient cards — consumer aesthetic, not clinical workspace',
                    'Pastel overload — too soft for information-dense clinical scanning',
                    'Decorative bar charts with no threshold, context, or narrative',
                    'AI-generated looking rounded UI — no editorial character or system confidence',
                    'Large hero welcome banners above the fold — clinicians need workflow, not a greeting',
                    'Consumer-scale oversized rounded corners — wrong density signal',
                    'Blue used as both brand colour and status indicator simultaneously',
                  ].map(item => (
                    <li key={item} className={`${styles.directionItem} ${styles.directionItemAvoid}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.directionPanel}>
                <div className={`${styles.directionPanelHead} ${styles.directionPanelChosen}`}>Chosen direction — and why</div>
                <ul className={styles.directionList}>
                  {[
                    'Warm neutral canvas — off-white and warm greys reduce visual fatigue across a shift',
                    'Strong but quiet aubergine identity — mature, enterprise, memorable, not generic',
                    'Compact data surfaces — density that respects clinical workflow pace',
                    'Clinical safety hierarchy — red protected exclusively for patient safety risk',
                    'Semantic colour model — amber for urgency, green for stable, grey for routine',
                    'Action-first components — every element makes the next step clear',
                    'Repeatable table + drawer workflows — enterprise-grade scan, triage, and review',
                    'Source, time, owner visible in the row — clinical context without extra navigation',
                    'Border-based structure, minimal shadows — calm enterprise workspace, not consumer SaaS',
                  ].map(item => (
                    <li key={item} className={`${styles.directionItem} ${styles.directionItemChosen}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <p style={{ fontSize: 'var(--font-size-label)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 14 }}>Mood reference sources</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {[
                  { cat: 'Enterprise SaaS', ref: 'Linear, Notion, Retool — warm neutrals, strong data hierarchy, confident type' },
                  { cat: 'Clinical operations', ref: 'EHR worklists, lab review panels, ICU dashboards, shift handover boards' },
                  { cat: 'Command centres', ref: 'Air traffic control, surgical scheduling — calm, high density, visual authority' },
                  { cat: 'Editorial warmth', ref: 'Stripe, Figma Docs — systematic consistency, confident scale, zero decoration' },
                ].map(m => (
                  <div key={m.cat} style={{ background: 'var(--color-surface-secondary)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-card)', padding: '14px 16px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-brand-600)', marginBottom: 6 }}>{m.cat}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{m.ref}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2 + 3: AUBERGINE + WARM NEUTRALS */}
        <div className={`${styles.section} ${styles.sectionWarm}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>Design language — 02</div>
            <h2 className={styles.sectionTitle}>Why aubergine became the anchor colour</h2>
            <p className={styles.sectionDesc}>
              Blue is common in healthcare UI because it suggests trust — but it also makes most healthcare dashboards look identical to each other. I chose aubergine because it still feels mature, serious, and trustworthy, but gives CareSync a more distinct enterprise identity. It works well with warm neutrals and supports a calm command-centre feel without becoming decorative.
            </p>

            <div className={styles.colorScaleGrid} style={{ marginBottom: 28 }}>
              {[
                { label: 'brand-50', value: '#F5EFF5', text: '#553052' },
                { label: 'brand-100', value: '#E5D5E4', text: '#553052' },
                { label: 'brand-200', value: '#C8A8C6', text: '#fff' },
                { label: 'brand-300', value: '#B79BB3', text: '#fff' },
                { label: 'brand-600', value: '#553052', text: '#fff' },
                { label: 'brand-700', value: '#40233F', text: '#fff' },
                { label: 'brand-900', value: '#251324', text: '#fff' },
              ].map(c => (
                <div key={c.label} className={styles.colorScaleItem}>
                  <div className={styles.colorScaleSwatch} style={{ background: c.value }} />
                  <div className={styles.colorScaleLabel}>{c.label}<br />{c.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ background: 'var(--color-surface-primary)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-card)', padding: '20px 24px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-brand-600)', marginBottom: 14 }}>Where aubergine appears in the product</div>
                {[
                  'Sidebar navigation background — the constant presence across every screen',
                  'Active navigation item — the only selected state colour in the nav',
                  'Primary action buttons — the main decision driver on each surface',
                  'Focus rings — 3px aubergine glow on all keyboard-navigable elements',
                  'Active row indicator — 3px left-inset on selected table rows',
                  'Section headers and anchor identifiers throughout the product',
                  'Brand wordmark and product identity moments',
                ].map(item => (
                  <div key={item} style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5, paddingLeft: 14, position: 'relative', marginBottom: 8 }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-brand-600)', fontWeight: 700 }}>·</span>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--color-surface-primary)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-card)', padding: '20px 24px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 14 }}>What aubergine is NOT used for</div>
                {[
                  'Clinical severity states — red, amber, and green own those signals entirely',
                  'Data visualisation bars — charts use aubergine only as a neutral data bar',
                  'Warning or error messages — colour semantics are reserved',
                  'Decorative backgrounds or gradient surfaces',
                  'Secondary badges or metadata labels — those stay neutral',
                ].map(item => (
                  <div key={item} style={{ fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.5, paddingLeft: 14, position: 'relative', marginBottom: 8 }}>
                    <span style={{ position: 'absolute', left: 0, color: '#9CA3AF' }}>—</span>
                    {item}
                  </div>
                ))}
                <div style={{ marginTop: 20, padding: '12px 16px', background: 'var(--color-brand-50)', borderRadius: 6, border: '1px solid var(--color-brand-100)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-brand-800)', lineHeight: 1.5 }}>
                    Aubergine anchors the <strong>product identity</strong>. Warning, critical, and success colours anchor <strong>clinical meaning</strong>. They never compete.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 48 }}>
              <div className={styles.sectionLabel}>Design language — 03</div>
              <h2 className={styles.sectionTitle} style={{ marginTop: 8 }}>A warmer base to reduce dashboard fatigue</h2>
              <p className={styles.sectionDesc}>
                Most healthcare SaaS uses pure white surfaces. CareSync uses warm off-white and neutral tones throughout the page background because this is an information-dense product used across long shifts. Warm neutrals reduce eye strain and create a calmer reading environment for dense clinical lists.
              </p>
              <div className={styles.tokenPillGrid}>
                {[
                  { name: 'App background', value: '#F7F6F4', use: 'Page canvas, behind all cards', bg: '#F7F6F4' },
                  { name: 'Surface', value: '#FFFFFF', use: 'Cards, drawers, modal panels', bg: '#FFFFFF' },
                  { name: 'Subtle surface', value: '#FCFBFA', use: 'Table headers, settings rows, drawers', bg: '#FCFBFA' },
                  { name: 'Border default', value: '#E2DEDA', use: 'Card borders, dividers, table lines', bg: '#E2DEDA' },
                  { name: 'Border strong', value: '#CBC5C1', use: 'Active outlines, form fields, focus', bg: '#CBC5C1' },
                ].map(t => (
                  <div key={t.name} className={styles.tokenPill}>
                    <div className={styles.tokenPillSwatch} style={{ background: t.bg, border: '1px solid rgba(0,0,0,0.06)' }} />
                    <div className={styles.tokenPillBody}>
                      <div className={styles.tokenPillName}>{t.name}</div>
                      <div className={styles.tokenPillValue}>{t.value}</div>
                      <div className={styles.tokenPillUse}>{t.use}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  { label: 'Why warm grey, not white', text: 'Pure white at scale creates harsh contrast in dense clinical lists. Warm grey lets the eyes relax while reading across rows.' },
                  { label: 'Why borders, not shadows', text: 'Heavy box shadows feel consumer and decorative. Borders create clinical structure — precise, flat, professional.' },
                  { label: 'Why minimal shadows', text: 'Enterprise clinical UI is not a consumer SaaS product. Elevation and depth should come from layout hierarchy, not decorative shadow layers.' },
                ].map(n => (
                  <div key={n.label} style={{ background: 'var(--color-surface-primary)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-card)', padding: '14px 16px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 6 }}>{n.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{n.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. CLINICAL COLOR SEMANTICS */}
        <div className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>Design language — 04</div>
            <h2 className={styles.sectionTitle}>Colour semantics: separating safety from operational urgency</h2>
            <p className={styles.sectionDesc}>
              I did not want every important thing to become red. In clinical interfaces, red should be protected for safety-critical moments — otherwise users become desensitised and stop responding to it. CareSync uses a strict semantic colour model with one principle at its centre.
            </p>

            <div className={styles.principleQuote}>
              "<span className={styles.principleQuoteAccent}>Red is not for attention.</span> Red is for safety."
            </div>

            <div className={styles.semanticGrid} style={{ marginTop: 32 }}>
              {/* Header */}
              <div className={`${styles.semanticRow} ${styles.semanticRowHead}`}>
                <div className={styles.semanticSwatch} />
                <div className={styles.semanticLabel} style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Semantic role</div>
                <div className={styles.semanticTokenCol}><span className={styles.semanticTokenFg} style={{ color: 'var(--color-text-muted)', fontFamily: 'inherit', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tokens</span></div>
                <div className={styles.semanticUse} style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Used for</div>
                <div className={styles.semanticExampleCol} style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Example</div>
              </div>
              {/* Critical */}
              <div className={styles.semanticRow}>
                <div className={styles.semanticSwatch} style={{ background: '#B42318' }} />
                <div className={styles.semanticLabel}>Critical red</div>
                <div className={styles.semanticTokenCol}>
                  <div className={styles.semanticTokenFg}>#B42318</div>
                  <div className={styles.semanticTokenBg}>#FDECEA (bg)</div>
                </div>
                <div className={styles.semanticUse}>Allergy alerts, patient safety risk, destructive actions, safety-critical severity only</div>
                <div className={styles.semanticExampleCol}>
                  <span className={styles.semanticExChip} style={{ background: '#FDECEA', color: '#B42318', border: '1px solid #F5C6C2' }}>⚠ Allergy: Penicillin</span>
                </div>
              </div>
              {/* Warning */}
              <div className={styles.semanticRow}>
                <div className={styles.semanticSwatch} style={{ background: '#8A5600' }} />
                <div className={styles.semanticLabel}>Warning ochre</div>
                <div className={styles.semanticTokenCol}>
                  <div className={styles.semanticTokenFg}>#8A5600</div>
                  <div className={styles.semanticTokenBg}>#FFF3DA (bg)</div>
                </div>
                <div className={styles.semanticUse}>Review required, due soon, rising values, operational pressure, abnormal but not critical</div>
                <div className={styles.semanticExampleCol}>
                  <span className={styles.semanticExChip} style={{ background: '#FFF3DA', color: '#8A5600', border: '1px solid #F0D9A0' }}>Glucose 142 mg/dL ↑</span>
                </div>
              </div>
              {/* Success */}
              <div className={styles.semanticRow}>
                <div className={styles.semanticSwatch} style={{ background: '#26734D' }} />
                <div className={styles.semanticLabel}>Success green</div>
                <div className={styles.semanticTokenCol}>
                  <div className={styles.semanticTokenFg}>#26734D</div>
                  <div className={styles.semanticTokenBg}>#E8F3EC (bg)</div>
                </div>
                <div className={styles.semanticUse}>Stable state, completed tasks, cleared results, resolved handover items, normal ranges</div>
                <div className={styles.semanticExampleCol}>
                  <span className={styles.semanticExChip} style={{ background: '#E8F3EC', color: '#26734D', border: '1px solid #C0DCC8' }}>● Stable</span>
                </div>
              </div>
              {/* Neutral */}
              <div className={styles.semanticRow}>
                <div className={styles.semanticSwatch} style={{ background: '#6B7280' }} />
                <div className={styles.semanticLabel}>Neutral grey</div>
                <div className={styles.semanticTokenCol}>
                  <div className={styles.semanticTokenFg}>#374151</div>
                  <div className={styles.semanticTokenBg}>#F9FAFB (bg)</div>
                </div>
                <div className={styles.semanticUse}>Routine states, metadata, timestamps, patient IDs, low-priority information</div>
                <div className={styles.semanticExampleCol}>
                  <span className={styles.semanticExChip} style={{ background: '#F9FAFB', color: '#6B7280', border: '1px solid #E5E7EB' }}>Routine</span>
                </div>
              </div>
              {/* Brand */}
              <div className={styles.semanticRow}>
                <div className={styles.semanticSwatch} style={{ background: '#553052' }} />
                <div className={styles.semanticLabel}>Brand aubergine</div>
                <div className={styles.semanticTokenCol}>
                  <div className={styles.semanticTokenFg}>#553052</div>
                  <div className={styles.semanticTokenBg}>#F5EFF5 (bg)</div>
                </div>
                <div className={styles.semanticUse}>Active nav, selected rows, primary buttons, focus rings, product identity</div>
                <div className={styles.semanticExampleCol}>
                  <span className={styles.semanticExChip} style={{ background: '#F5EFF5', color: '#553052', border: '1px solid #DDD0DC' }}>Open record</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20, background: 'var(--color-brand-50)', border: '1px solid var(--color-brand-100)', borderRadius: 'var(--radius-card)', padding: '16px 20px', fontSize: 13, color: 'var(--color-brand-800)', lineHeight: 1.6 }}>
              <strong>Design reasoning:</strong> In a heuristic review of clinical UI, I found that systems using red for both "patient safety alert" and "overdue task" quickly desensitise users to red. CareSync separates the two: red is reserved for genuine safety events (allergy, destructive action). Overdue tasks and urgency use amber. This is a structural decision, not a visual preference.
            </div>
          </div>
        </div>

        {/* 5 + 6: TYPOGRAPHY + LAYOUT */}
        <div className={`${styles.section} ${styles.sectionWarm}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>Design language — 05</div>
            <h2 className={styles.sectionTitle}>Readable density for clinical work</h2>
            <p className={styles.sectionDesc}>
              CareSync had to be data-dense without becoming cramped. I used a compact typography scale with clear role distinctions so clinicians can scan patient identity, status, source, and action in under two seconds per row.
            </p>

            <div className={styles.typoTable}>
              <div className={`${styles.typoRow} ${styles.typoRowHead}`}>
                <div className={styles.typoRole}>Role</div>
                <div className={styles.typoRole}>Example</div>
                <div className={styles.typoRole}>Purpose in CareSync</div>
              </div>
              {[
                { role: 'Shift context', ex: { size: 20, weight: 700, text: 'Shift Briefing — Morning' }, purpose: 'Top-level screen identifier' },
                { role: 'Section heading', ex: { size: 16, weight: 700, text: 'Priority patients — Now' }, purpose: 'Workflow grouping within screens' },
                { role: 'Card title', ex: { size: 14, weight: 600, text: 'Meera Iyer — Glucose review' }, purpose: 'The primary action statement' },
                { role: 'Body / table row', ex: { size: 13, weight: 400, text: 'Fasting glucose 142 mg/dL since Monday' }, purpose: 'Supporting clinical detail' },
                { role: 'Metadata', ex: { size: 12, weight: 400, text: 'CP-10482 · Lab · 08:12 AM' }, purpose: 'Source, ID, timestamp' },
                { role: 'Badge label', ex: { size: 11, weight: 700, text: 'REVIEW REQUIRED' }, purpose: 'Status state — always uppercase' },
                { role: 'Table header', ex: { size: 10, weight: 700, text: 'PATIENT / STATUS / TIMING' }, purpose: 'Column scanability label' },
              ].map(row => (
                <div key={row.role} className={styles.typoRow}>
                  <div className={styles.typoRole}>{row.role}</div>
                  <div style={{ fontSize: row.ex.size, fontWeight: row.ex.weight, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>{row.ex.text}</div>
                  <div className={styles.typoPurpose}>{row.purpose}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, background: 'var(--color-surface-primary)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-card)', padding: '14px 18px', fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              The typography avoids oversized marketing-style headings. This is not a landing page — it is a working interface. The largest element on any screen is a section heading, not a hero statement. Tabular numerals are used throughout for numeric data so columns scan cleanly in tables.
            </div>

            <div style={{ marginTop: 48 }}>
              <div className={styles.sectionLabel} style={{ marginBottom: 10 }}>Design language — 06</div>
              <h2 className={styles.sectionTitle} style={{ marginBottom: 12 }}>The grid came from the workflow</h2>
              <p className={styles.sectionDesc}>
                The layout system was not designed on a 12-column grid abstraction. It was designed around clinical work patterns — what information needs to be visible together and how the doctor moves through a shift.
              </p>
              <div className={styles.layoutDiagramGrid}>
                {/* 1: Briefing — work + rail */}
                <div className={styles.layoutDiagram}>
                  <div className={styles.layoutDiagramLabel}>Shift Briefing — work + operational rail</div>
                  <svg viewBox="0 0 240 130" className={styles.layoutDiagramSvg}>
                    <rect x="0" y="0" width="40" height="130" fill="#251324"/>
                    <text x="20" y="66" fontSize="6" fill="rgba(255,255,255,0.3)" textAnchor="middle" fontFamily="sans-serif">NAV</text>
                    <rect x="40" y="0" width="132" height="130" fill="#FFFFFF"/>
                    <text x="106" y="12" fontSize="6" fontWeight="700" fill="#9CA3AF" textAnchor="middle" fontFamily="sans-serif">MAIN WORK AREA</text>
                    <rect x="44" y="18" width="38" height="72" rx="2" fill="#F9F0F9" stroke="#E0D0E0" strokeWidth="0.5"/>
                    <text x="63" y="27" fontSize="5" fontWeight="700" fill="#B42318" textAnchor="middle" fontFamily="sans-serif">NOW</text>
                    <rect x="46" y="32" width="34" height="10" rx="1" fill="#FEE2E2"/>
                    <rect x="46" y="46" width="34" height="10" rx="1" fill="#FFFBEB"/>
                    <rect x="46" y="60" width="34" height="10" rx="1" fill="#F5F5F5"/>
                    <rect x="88" y="18" width="38" height="72" rx="2" fill="#FAFAFA" stroke="#E5E5E5" strokeWidth="0.5"/>
                    <text x="107" y="27" fontSize="5" fontWeight="700" fill="#8A5600" textAnchor="middle" fontFamily="sans-serif">NEXT</text>
                    {[0,1,2].map(i => <rect key={i} x="90" y={32+i*14} width="34" height="10" rx="1" fill="#F5F5F5"/>)}
                    <rect x="132" y="18" width="36" height="72" rx="2" fill="#FAFAFA" stroke="#E5E5E5" strokeWidth="0.5"/>
                    <text x="150" y="27" fontSize="5" fontWeight="700" fill="#7A4A76" textAnchor="middle" fontFamily="sans-serif">LATER</text>
                    {[0,1,2,3].map(i => <rect key={i} x="134" y={32+i*12} width="32" height="8" rx="1" fill="#F9F0F9"/>)}
                    <rect x="172" y="0" width="68" height="130" fill="#F9F4F9"/>
                    <line x1="172" y1="0" x2="172" y2="130" stroke="#E0D0E0" strokeWidth="0.5"/>
                    <text x="206" y="14" fontSize="5.5" fontWeight="700" fill="#9CA3AF" textAnchor="middle" fontFamily="sans-serif">UPCOMING</text>
                    {[0,1,2].map(i => <rect key={i} x="178" y={20+i*22} width="56" height="16" rx="2" fill="white" stroke="#E0D0E0" strokeWidth="0.5"/>)}
                    <text x="206" y="92" fontSize="5" fill="#C0B0C0" textAnchor="middle" fontFamily="sans-serif">RECOMMENDED</text>
                    <text x="206" y="100" fontSize="5" fill="#C0B0C0" textAnchor="middle" fontFamily="sans-serif">ACTIONS</text>
                    {[0,1].map(i => <rect key={i} x="178" y={106+i*11} width="56" height="8" rx="2" fill="white" stroke="#E0D0E0" strokeWidth="0.5"/>)}
                  </svg>
                </div>
                {/* 2: Table + drawer */}
                <div className={styles.layoutDiagram}>
                  <div className={styles.layoutDiagramLabel}>Table + detail drawer overlay</div>
                  <svg viewBox="0 0 240 130" className={styles.layoutDiagramSvg}>
                    <rect x="0" y="0" width="40" height="130" fill="#251324"/>
                    <rect x="40" y="0" width="200" height="130" fill="#FFFFFF"/>
                    <rect x="40" y="0" width="200" height="16" fill="#F5EFF5"/>
                    <rect x="44" y="5" width="60" height="6" rx="2" fill="#DDD0DC"/>
                    <rect x="40" y="16" width="200" height="10" fill="#F0ECF0"/>
                    {[0,1,2,3,4].map(i => (
                      <g key={i}>
                        <rect x="40" y={26+i*18} width="200" height="16" fill={i===1 ? "#F0E8F0" : "white"} stroke="#F0E8F0" strokeWidth="0.5"/>
                        {i===1 && <rect x="40" y={26+i*18} width="3" height="16" fill="#553052"/>}
                        <circle cx="52" cy={34+i*18} r="4" fill={i===0 ? "#B42318" : i===1 ? "#553052" : i===2 ? "#8A5600" : "#9CA3AF"}/>
                        <rect x="60" y={31+i*18} width="36" height="4" rx="1" fill="#9CA3AF"/>
                      </g>
                    ))}
                    {/* Drawer overlay */}
                    <rect x="152" y="0" width="88" height="130" fill="white" stroke="#E0D0E0" strokeWidth="1"/>
                    <rect x="152" y="0" width="88" height="22" fill="#F5EFF5"/>
                    <rect x="156" y="7" width="44" height="7" rx="2" fill="#DDD0DC"/>
                    <text x="230" y="13" fontSize="8" fill="#9CA3AF" textAnchor="end" fontFamily="sans-serif">✕</text>
                    {[0,1,2,3].map(i => <rect key={i} x="158" y={28+i*22} width="76" height="14" rx="2" fill="#F5F0F5"/>)}
                    <rect x="158" y="118" width="38" height="10" rx="2" fill="#553052"/>
                  </svg>
                </div>
                {/* 3: Messages 3-panel */}
                <div className={styles.layoutDiagram}>
                  <div className={styles.layoutDiagramLabel}>Messages — 3-panel layout</div>
                  <svg viewBox="0 0 240 130" className={styles.layoutDiagramSvg}>
                    <rect x="0" y="0" width="40" height="130" fill="#251324"/>
                    <rect x="40" y="0" width="70" height="130" fill="#FAFAFA"/>
                    <line x1="110" y1="0" x2="110" y2="130" stroke="#E0D0E0" strokeWidth="0.5"/>
                    <text x="75" y="12" fontSize="5.5" fontWeight="700" fill="#9CA3AF" textAnchor="middle" fontFamily="sans-serif">THREADS</text>
                    {[
                      { sev: "#B42318", active: true },
                      { sev: "#8A5600", active: false },
                      { sev: "#553052", active: false },
                      { sev: "#9CA3AF", active: false },
                    ].map((t, i) => (
                      <g key={i}>
                        <rect x="40" y={18+i*26} width="70" height="24" fill={t.active ? "#F0E8F0" : "transparent"}/>
                        {t.active && <rect x="40" y={18+i*26} width="3" height="24" fill="#553052"/>}
                        <circle cx="52" cy={30+i*26} r="4" fill={t.sev}/>
                        <rect x="60" y={26+i*26} width="38" height="4" rx="1" fill={t.active ? "#9CA3AF" : "#D1D5DB"}/>
                        <rect x="60" y={33+i*26} width="28" height="3" rx="1" fill="#E0D8E0"/>
                      </g>
                    ))}
                    <rect x="110" y="0" width="130" height="130" fill="#FFFFFF"/>
                    <text x="175" y="12" fontSize="5.5" fontWeight="700" fill="#9CA3AF" textAnchor="middle" fontFamily="sans-serif">CONVERSATION</text>
                    <rect x="116" y="18" width="70" height="16" rx="3" fill="#F0ECF0" stroke="#E0D0E0" strokeWidth="0.5"/>
                    <rect x="174" y="42" width="60" height="14" rx="3" fill="#EDE0F0"/>
                    <rect x="114" y="64" width="70" height="16" rx="3" fill="#FFF3CD" stroke="#F0E0B0" strokeWidth="0.5"/>
                    <rect x="116" y="118" width="108" height="10" rx="2" fill="white" stroke="#E0D0E0" strokeWidth="0.75"/>
                    <rect x="212" y="119" width="8" height="8" rx="1" fill="#553052"/>
                  </svg>
                </div>
              </div>
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  'Main work + operational rail — keeps NOW/NEXT/LATER always co-visible on the briefing screen',
                  'Table + drawer — scan across all patients, review one in context, without leaving the list',
                  '3-panel messages — severity-sorted thread list + conversation + patient context, all in one view',
                ].map((text, i) => (
                  <div key={i} style={{ fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.5, padding: '10px 12px', background: 'var(--color-surface-primary)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-card)' }}>{text}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 7. COMPONENT ORIGINS */}
        <div className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>Design language — 07</div>
            <h2 className={styles.sectionTitle}>Components were designed from recurring clinical decisions</h2>
            <p className={styles.sectionDesc}>
              Every component in CareSync exists because a specific clinical decision-making pattern kept recurring across screens. I did not start from a UI kit and add clinical content — I started from the clinical task and designed the smallest reusable piece that could serve it.
            </p>
            <div className={styles.originGrid}>
              {[
                {
                  name: 'Priority patient card',
                  why: 'To make the most time-sensitive patient impossible to miss at shift start. Severity, timing, patient identity, and due action are all visible in one glanceable block.',
                  screens: ['Shift Briefing'],
                },
                {
                  name: '4-dimension status system',
                  why: 'Clinical context requires four independent axes: how severe is the patient (severity), where is the work (workflow), when is it due (timing), and who owns it (ownership). No single badge could carry all four.',
                  screens: ['All screens'],
                },
                {
                  name: 'Data table + row click',
                  why: 'Clinical work is list-heavy and triage-heavy. Tables let doctors scan across many patients quickly. Row click opens a drawer for focused review without losing the list.',
                  screens: ['Patients', 'Appointments', 'Records', 'Tasks', 'Insights'],
                },
                {
                  name: 'Detail drawer',
                  why: 'To preview enough context for a decision without requiring full-page navigation. The drawer keeps the worklist visible so the doctor never loses their place.',
                  screens: ['Patients', 'Appointments', 'Records', 'Tasks'],
                },
                {
                  name: 'Clinical warning card',
                  why: 'To surface a changed result with all four clinical context dimensions together: source (Lab), value (142 mg/dL ↑), timestamp (08:12), and owner (Dr. Rao). Missing any one of these makes the result unusable.',
                  screens: ['Shift Briefing', 'Patient Profile', 'Messages', 'Tasks'],
                },
                {
                  name: 'Patient safety strip',
                  why: 'Allergy information must be visible on every patient-facing surface, announced by screen readers, and visually distinct from all other content. A persistent safety strip pattern guarantees this.',
                  screens: ['Patients', 'Appointments', 'Medical Records', 'Shift Briefing'],
                },
              ].map(c => (
                <div key={c.name} className={styles.originCard}>
                  <div className={styles.originName}>{c.name}</div>
                  <div className={styles.originWhyLabel}>Why it exists</div>
                  <div className={styles.originWhy}>{c.why}</div>
                  <div className={styles.originUsedLabel}>Used in</div>
                  <div className={styles.originScreens}>
                    {c.screens.map(s => <span key={s} className={styles.originScreen}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 8 + 9: BEFORE/AFTER + USAGE MATRIX */}
        <div className={`${styles.section} ${styles.sectionWarm}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>Design language — 08</div>
            <h2 className={styles.sectionTitle}>From dashboard styling to system language</h2>
            <p className={styles.sectionDesc}>
              The transformation was not cosmetic. Every "before" item represents a structural decision that prioritised appearance over clinical utility. Every "after" item is a purposeful reversal.
            </p>
            <div className={styles.evolutionGrid}>
              <div className={`${styles.evolutionCard} ${styles.evolutionCardBefore}`}>
                <div className={styles.evolutionCardHead}>
                  <div className={styles.evolutionCardLabel}>Before</div>
                  <div className={styles.evolutionCardTitle}>Dashboard styling</div>
                </div>
                <ul className={styles.evolutionList}>
                  <li>Blue healthcare palette — visually identical to competitors</li>
                  <li>Generic dashboard cards at equal visual weight</li>
                  <li>Decorative charts with no clinical threshold or context</li>
                  <li>Inconsistent badge colours — no semantic rules</li>
                  <li>No clear clinical colour hierarchy — red used for warnings too</li>
                  <li>Patient data scattered across disconnected views</li>
                  <li>Actions looked identical — no visual action hierarchy</li>
                  <li>Status chips were display-only, not action-oriented</li>
                </ul>
              </div>
              <div className={`${styles.evolutionCard} ${styles.evolutionCardAfter}`}>
                <div className={styles.evolutionCardHead}>
                  <div className={styles.evolutionCardLabel}>After</div>
                  <div className={styles.evolutionCardTitle}>System language</div>
                </div>
                <ul className={styles.evolutionList}>
                  <li>Aubergine brand system — distinct, memorable, enterprise-grade</li>
                  <li>Warm neutral surfaces — calm density that reads across a shift</li>
                  <li>Charts with thresholds, narrative text, and accessible summaries</li>
                  <li>4-dimension status architecture — severity, workflow, timing, ownership</li>
                  <li>Clinical colour semantics — red = safety only, amber = urgency, green = stable</li>
                  <li>Source, time, owner co-located with the result in every row</li>
                  <li>Action hierarchy — primary / secondary / ghost / danger clearly differentiated</li>
                  <li>Status chips paired with workflow next steps and ownership</li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: 48 }}>
              <div className={styles.sectionLabel} style={{ marginBottom: 10 }}>Design language — 09</div>
              <h2 className={styles.sectionTitle} style={{ marginBottom: 12 }}>Component consistency across the product</h2>
              <p className={styles.sectionDesc}>
                Every component appears in multiple screens. The table below shows which components are used where — demonstrating that the design system scales across the full product without variation or inconsistency.
              </p>
              <div className={styles.usageTableWrapper}>
                <table className={styles.usageMatrix}>
                  <thead>
                    <tr>
                      <th className={styles.usageMatrixFirstCol}>Component</th>
                      {['Shift Briefing', 'Patients', 'Appts', 'Records', 'Messages', 'Tasks', 'Insights', 'Settings'].map(col => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { c: 'Patient identity block', vals: [1,1,1,1,1,1,0,0] },
                      { c: 'Severity indicator',     vals: [1,1,1,1,1,1,0,0] },
                      { c: 'Badge / status chip',    vals: [1,1,1,1,1,1,1,1] },
                      { c: 'Table + row click',      vals: [1,1,1,1,1,1,1,0] },
                      { c: 'Detail drawer',          vals: [1,1,1,1,0,1,0,0] },
                      { c: 'Clinical warning card',  vals: [1,1,0,1,1,1,0,0] },
                      { c: 'Timing status',          vals: [1,0,1,0,0,1,0,0] },
                      { c: 'Workflow status',        vals: [1,1,1,1,1,1,0,0] },
                      { c: 'Ownership status',       vals: [1,1,0,0,1,1,0,0] },
                      { c: 'Patient safety strip',   vals: [1,1,1,1,0,0,0,0] },
                      { c: 'Recharts + threshold',   vals: [0,0,0,0,0,0,1,0] },
                      { c: 'Settings toggle / form', vals: [0,0,0,0,0,0,0,1] },
                    ].map(row => (
                      <tr key={row.c}>
                        <td className={`${styles.usageMatrixFirstCol}`}>{row.c}</td>
                        {row.vals.map((v, i) => (
                          <td key={i}>
                            {v ? <span className={styles.usageCheck}>✓</span> : <span className={styles.usageDash}>–</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 10 + 11: DESIGN NOTES + ACCESSIBILITY */}
        <div className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>Design language — 10</div>
            <h2 className={styles.sectionTitle}>Design decision notes</h2>
            <p className={styles.sectionDesc}>
              These are the specific, deliberate choices that shaped the visual system — not rules invented for documentation, but decisions made in response to real product and clinical constraints.
            </p>
            <div className={styles.dsNoteGrid}>
              {[
                'Used borders instead of heavy shadows — this maintains a clinical workspace feel rather than a consumer SaaS layer-cake aesthetic.',
                'Kept cards slightly rounded (var --radius-card is 8px) but not overly soft — distinguishable from pure utility but not playful.',
                'Avoided large hero greeting banners — clinicians need workflow clarity at shift start, not a personalised welcome screen.',
                'Used tables because enterprise clinical work is list-heavy and triage-heavy. Scanning across rows is the core clinical motion.',
                'Used drawers to reduce unnecessary full-page navigation — clinicians should never lose their worklist position mid-review.',
                'Protected red exclusively for allergy and clinical safety. Red for an overdue task trains users to ignore red.',
                'Made action buttons specific to the context — "Review result", "Open profile", "Mark complete" — not generic labels.',
                'Kept metadata always visible in rows: source, timestamp, owner, and due time are not hidden behind clicks.',
                'Used tabular-nums font variant throughout for numeric values — columns align cleanly when scanning multiple rows.',
                'Gave every chart a narrative sentence and an accessible summary — charts do not stand alone in CareSync.',
              ].map(note => (
                <div key={note} className={styles.dsNoteCard}>
                  <div className={styles.dsNoteDot} />
                  <div className={styles.dsNoteText}>{note}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 48 }}>
              <div className={styles.sectionLabel} style={{ marginBottom: 10 }}>Design language — 11</div>
              <h2 className={styles.sectionTitle} style={{ marginBottom: 12 }}>Accessibility built into the system</h2>
              <p className={styles.sectionDesc}>
                Accessibility was not a final checklist — it shaped the visual system from the beginning. Several design system decisions exist specifically because of accessibility requirements.
              </p>
              <div className={styles.a11ySystemGrid}>
                {[
                  { icon: '🔲', text: 'Focus rings use aubergine (box-shadow: 0 0 0 3px rgba(85,48,82,0.4)) — visible against both light and dark backgrounds, and unique from status colours.' },
                  { icon: '🏷', text: 'Every badge includes a visible text label. Severity indicators always show the text name alongside the coloured dot — never a colour dot alone.' },
                  { icon: '📏', text: 'Minimum touch targets: primary buttons 40–44px height, supporting actions 36px, icon buttons 36×36px. Never smaller.' },
                  { icon: '📊', text: 'Every chart has an sr-only AccessibleChartSummary — a full narrative description of the chart data for screen readers.' },
                  { icon: '🚨', text: 'PatientSafetyStrip uses role="alert" so allergy information is announced immediately when it appears on screen.' },
                  { icon: '⚡', text: 'Transitions collapse to opacity-only when prefers-reduced-motion is active. Drawer slide animations disappear entirely.' },
                  { icon: '⌨', text: 'Drawers trap focus while open and restore focus to the triggering row element on close — consistent keyboard flow.' },
                  { icon: '🎯', text: 'Red is never used as the only visual indicator of meaning. Every critical state also includes a text label, icon, and/or structural emphasis.' },
                ].map(item => (
                  <div key={item.icon} className={styles.a11ySystemItem}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                    <div className={styles.a11ySystemText}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 12. DS CHAPTER CLOSING */}
        <div className={`${styles.section} ${styles.sectionDarkest}`}>
          <div className={styles.inner} style={{ textAlign: 'center' }}>
            <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`} style={{ textAlign: 'center', marginBottom: 24 }}>Design language — closing</div>
            <p className={styles.dsClosingStatement}>
              "The system is intentionally <span className={styles.dsClosingAccent}>quiet</span>.<br />
              Its job is not to impress the doctor;<br />
              its job is to help the doctor act <span className={styles.dsClosingAccent}>safely</span>."
            </p>
            <p style={{ marginTop: 32, fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 580, margin: '32px auto 0', lineHeight: 1.7 }}>
              The design system helped CareSync move from a set of screens into a reusable clinical product language — one that can be extended to new screens, new roles, and new workflows without re-inventing visual decisions.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            7b. WIREFRAMES
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionWarm}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>07 — Wireframes</div>
            <h2 className={styles.sectionTitle}>Structural layout mapped before visual design</h2>
            <p className={styles.sectionDesc}>
              Eight lo-fi wireframes established the layout of each screen before colour, component
              detail, or content was applied. Each frame solved the information hierarchy problem first —
              what appears, in what order, at what scale.
            </p>
            <div className={styles.wfGrid}>

              {/* A: Shift Briefing */}
              <div className={styles.wfCard}>
                <div className={styles.wfCardHead}>
                  <div className={styles.wfCardLetter}>A</div>
                  <div className={styles.wfCardTitle}>Shift Briefing</div>
                </div>
                <svg viewBox="0 0 280 180" className={styles.wfSvg} aria-label="Shift Briefing wireframe">
                  <rect x="0" y="0" width="52" height="180" fill="#251324"/>
                  <rect x="8" y="7" width="36" height="7" rx="2" fill="#553052"/>
                  <rect x="10" y="24" width="32" height="5" rx="2" fill="#7A4A76"/>
                  {[28, 30, 34, 26, 22, 36, 24].map((w, i) => <rect key={i} x="10" y={33+i*17} width={w} height="4" rx="2" fill="#3A1D38"/>)}
                  <rect x="52" y="0" width="228" height="22" fill="#F5EFF5"/>
                  <line x1="52" y1="22" x2="280" y2="22" stroke="#DDD0DC" strokeWidth="0.5"/>
                  <rect x="60" y="7" width="72" height="7" rx="2" fill="#DDD0DC"/>
                  <circle cx="272" cy="11" r="7" fill="#DDD0DC"/>
                  {/* NOW card */}
                  <rect x="58" y="28" width="66" height="118" rx="3" fill="white" stroke="#E8E0E8" strokeWidth="0.75"/>
                  <rect x="58" y="28" width="66" height="3" fill="#B42318"/>
                  <text x="64" y="37" fontSize="5.5" fontWeight="700" fill="#9B4040">NOW</text>
                  <rect x="62" y="40" width="58" height="12" rx="2" fill="#FEE2E2"/>
                  <circle cx="66" cy="46" r="3" fill="#B42318"/>
                  <rect x="72" y="43" width="28" height="3" rx="1" fill="#C08080"/>
                  <rect x="72" y="49" width="20" height="2.5" rx="1" fill="#E0B0B0"/>
                  <rect x="62" y="56" width="58" height="12" rx="2" fill="#FFFBEB"/>
                  <circle cx="66" cy="62" r="3" fill="#8A5600"/>
                  <rect x="72" y="59" width="24" height="3" rx="1" fill="#B09060"/>
                  <rect x="62" y="72" width="58" height="12" rx="2" fill="#F5F0F5"/>
                  {/* NEXT card */}
                  <rect x="130" y="28" width="66" height="118" rx="3" fill="white" stroke="#E8E0E8" strokeWidth="0.75"/>
                  <rect x="130" y="28" width="66" height="3" fill="#8A5600"/>
                  <text x="136" y="37" fontSize="5.5" fontWeight="700" fill="#8A6030">NEXT</text>
                  {[0,1,2].map(i => <rect key={i} x="134" y={40+i*18} width="58" height="12" rx="2" fill="#F5F5F5"/>)}
                  {/* LATER card */}
                  <rect x="202" y="28" width="70" height="118" rx="3" fill="white" stroke="#E8E0E8" strokeWidth="0.75"/>
                  <rect x="202" y="28" width="70" height="3" fill="#7A4A76"/>
                  <text x="208" y="37" fontSize="5.5" fontWeight="700" fill="#7A4A76">LATER</text>
                  {[0,1,2,3].map(i => <rect key={i} x="206" y={40+i*16} width="62" height="10" rx="2" fill="#F9F0F9"/>)}
                </svg>
              </div>

              {/* B: Patients */}
              <div className={styles.wfCard}>
                <div className={styles.wfCardHead}>
                  <div className={styles.wfCardLetter}>B</div>
                  <div className={styles.wfCardTitle}>Patients</div>
                </div>
                <svg viewBox="0 0 280 180" className={styles.wfSvg} aria-label="Patients wireframe">
                  <rect x="0" y="0" width="52" height="180" fill="#251324"/>
                  <rect x="8" y="7" width="36" height="7" rx="2" fill="#553052"/>
                  {[32, 28, 30, 34, 26, 22, 36, 24].map((w, i) => <rect key={i} x="10" y={24+i*17} width={w} height="4" rx="2" fill={i===1 ? "#7A4A76" : "#3A1D38"}/>)}
                  <rect x="52" y="0" width="228" height="22" fill="#F5EFF5"/>
                  <line x1="52" y1="22" x2="280" y2="22" stroke="#DDD0DC" strokeWidth="0.5"/>
                  <rect x="60" y="7" width="52" height="7" rx="2" fill="#DDD0DC"/>
                  <circle cx="272" cy="11" r="7" fill="#DDD0DC"/>
                  {/* Search bar */}
                  <rect x="58" y="28" width="166" height="13" rx="3" fill="white" stroke="#E0D0E0" strokeWidth="0.75"/>
                  <rect x="64" y="33" width="50" height="3" rx="1" fill="#E0D8E0"/>
                  <rect x="230" y="28" width="42" height="13" rx="3" fill="#F0E8F0" stroke="#D0B8D0" strokeWidth="0.75"/>
                  {/* Filter chips */}
                  {[0,1,2].map(i => <rect key={i} x={58+i*52} y="46" width="46" height="10" rx="5" fill={i===0 ? "#F0E8F0" : "#FAFAFA"} stroke={i===0 ? "#C8A8C8" : "#E5E5E5"} strokeWidth="0.75"/>)}
                  {/* Table header */}
                  <rect x="58" y="60" width="214" height="11" fill="#F0ECF0" stroke="#E0D0E0" strokeWidth="0.5"/>
                  {/* 4 rows */}
                  {[
                    { sev: "#B42318", bg: "#FEF0F0" },
                    { sev: "#8A5600", bg: "#FFFBF0" },
                    { sev: "#553052", bg: "#FAFAFA" },
                    { sev: "#2D6A4F", bg: "#FAFAFA" },
                  ].map((r, i) => (
                    <g key={i}>
                      <rect x="58" y={71+i*18} width="214" height="16" fill={r.bg} stroke="#F0E8F0" strokeWidth="0.5"/>
                      <circle cx="68" cy={79+i*18} r="4" fill={r.sev}/>
                      <rect x="76" y={76+i*18} width="36" height="4" rx="1" fill="#9CA3AF"/>
                      <rect x="116" y={76+i*18} width="22" height="4" rx="1" fill="#D1D5DB"/>
                      <rect x="234" y={75+i*18} width="32" height="7" rx="3" fill="#E8E0E8"/>
                    </g>
                  ))}
                </svg>
              </div>

              {/* C: Appointments */}
              <div className={styles.wfCard}>
                <div className={styles.wfCardHead}>
                  <div className={styles.wfCardLetter}>C</div>
                  <div className={styles.wfCardTitle}>Appointments</div>
                </div>
                <svg viewBox="0 0 280 180" className={styles.wfSvg} aria-label="Appointments wireframe">
                  <rect x="0" y="0" width="52" height="180" fill="#251324"/>
                  <rect x="8" y="7" width="36" height="7" rx="2" fill="#553052"/>
                  {[32, 28, 30, 34, 26, 22, 36, 24].map((w, i) => <rect key={i} x="10" y={24+i*17} width={w} height="4" rx="2" fill={i===2 ? "#7A4A76" : "#3A1D38"}/>)}
                  <rect x="52" y="0" width="228" height="22" fill="#F5EFF5"/>
                  <line x1="52" y1="22" x2="280" y2="22" stroke="#DDD0DC" strokeWidth="0.5"/>
                  <rect x="60" y="7" width="62" height="7" rx="2" fill="#DDD0DC"/>
                  <circle cx="272" cy="11" r="7" fill="#DDD0DC"/>
                  {/* Time filter tabs */}
                  <rect x="58" y="28" width="52" height="13" rx="3" fill="#F0E8F0" stroke="#C8A8C8" strokeWidth="1"/>
                  <rect x="114" y="28" width="52" height="13" rx="3" fill="white" stroke="#E0D0E0" strokeWidth="0.75"/>
                  <rect x="170" y="28" width="44" height="13" rx="3" fill="white" stroke="#E0D0E0" strokeWidth="0.75"/>
                  {/* Table header */}
                  <rect x="58" y="45" width="214" height="12" fill="#F0ECF0" stroke="#E0D0E0" strokeWidth="0.5"/>
                  {/* 3 appointment rows */}
                  {[
                    { bg: "#FFFBEB", chipFill: "#FEF3C7", chipStroke: "#F59E0B" },
                    { bg: "#FAFAFA", chipFill: "#EDE5F0", chipStroke: "#B79BB3" },
                    { bg: "#FAFAFA", chipFill: "#EDE5F0", chipStroke: "#B79BB3" },
                  ].map((r, i) => (
                    <g key={i}>
                      <rect x="58" y={57+i*22} width="214" height="20" fill={r.bg} stroke="#F0E8F0" strokeWidth="0.5"/>
                      <rect x="62" y={62+i*22} width="18" height="5" rx="1" fill="#C0B0C0"/>
                      <rect x="84" y={62+i*22} width="36" height="5" rx="1" fill="#9CA3AF"/>
                      <rect x="164" y={61+i*22} width="48" height="8" rx="3" fill={r.chipFill} stroke={r.chipStroke} strokeWidth="0.75"/>
                      <rect x="220" y={62+i*22} width="30" height="5" rx="1" fill="#D1D5DB"/>
                    </g>
                  ))}
                </svg>
              </div>

              {/* D: Medical Records */}
              <div className={styles.wfCard}>
                <div className={styles.wfCardHead}>
                  <div className={styles.wfCardLetter}>D</div>
                  <div className={styles.wfCardTitle}>Medical Records</div>
                </div>
                <svg viewBox="0 0 280 180" className={styles.wfSvg} aria-label="Medical Records wireframe">
                  <rect x="0" y="0" width="52" height="180" fill="#251324"/>
                  <rect x="8" y="7" width="36" height="7" rx="2" fill="#553052"/>
                  {[32, 28, 30, 34, 26, 22, 36, 24].map((w, i) => <rect key={i} x="10" y={24+i*17} width={w} height="4" rx="2" fill={i===3 ? "#7A4A76" : "#3A1D38"}/>)}
                  <rect x="52" y="0" width="228" height="22" fill="#F5EFF5"/>
                  <line x1="52" y1="22" x2="280" y2="22" stroke="#DDD0DC" strokeWidth="0.5"/>
                  <rect x="60" y="7" width="70" height="7" rx="2" fill="#DDD0DC"/>
                  <circle cx="272" cy="11" r="7" fill="#DDD0DC"/>
                  {/* Tabs */}
                  <rect x="58" y="28" width="90" height="14" rx="2" fill="white" stroke="#E0D0E0" strokeWidth="0.75"/>
                  <rect x="58" y="41" width="90" height="2" fill="#553052"/>
                  <rect x="152" y="28" width="80" height="14" rx="2" fill="#FAFAFA" stroke="#E5E5E5" strokeWidth="0.5"/>
                  {/* Header label */}
                  <rect x="58" y="50" width="110" height="6" rx="2" fill="#DDD0DC"/>
                  <rect x="232" y="49" width="38" height="8" rx="3" fill="#EDE5F0" stroke="#B79BB3" strokeWidth="0.75"/>
                  {/* Table header */}
                  <rect x="58" y="62" width="214" height="11" fill="#F0ECF0" stroke="#E0D0E0" strokeWidth="0.5"/>
                  {/* 4 rows */}
                  {[0,1,2,3].map(i => (
                    <g key={i}>
                      <rect x="58" y={73+i*18} width="214" height="16" fill={i<2 ? "#FDF0FD" : "white"} stroke="#F0E8F0" strokeWidth="0.5"/>
                      {i < 2 && <rect x="58" y={73+i*18} width="3" height="16" fill="#553052"/>}
                      <rect x="65" y={78+i*18} width="44" height="4" rx="1" fill="#9CA3AF"/>
                      <rect x="115" y={78+i*18} width="36" height="4" rx="1" fill="#C0B0C0"/>
                      {i < 2
                        ? <rect x="228" y={77+i*18} width="36" height="7" rx="3" fill="#EDE5F0" stroke="#B79BB3" strokeWidth="0.5"/>
                        : <rect x="228" y={77+i*18} width="36" height="7" rx="3" fill="#F0F0F0" stroke="#E0E0E0" strokeWidth="0.5"/>
                      }
                    </g>
                  ))}
                </svg>
              </div>

              {/* E: Messages */}
              <div className={styles.wfCard}>
                <div className={styles.wfCardHead}>
                  <div className={styles.wfCardLetter}>E</div>
                  <div className={styles.wfCardTitle}>Messages</div>
                </div>
                <svg viewBox="0 0 280 180" className={styles.wfSvg} aria-label="Messages wireframe">
                  <rect x="0" y="0" width="52" height="180" fill="#251324"/>
                  <rect x="8" y="7" width="36" height="7" rx="2" fill="#553052"/>
                  {[32, 28, 30, 34, 26, 22, 36, 24].map((w, i) => <rect key={i} x="10" y={24+i*17} width={w} height="4" rx="2" fill={i===4 ? "#7A4A76" : "#3A1D38"}/>)}
                  <rect x="52" y="0" width="228" height="22" fill="#F5EFF5"/>
                  <line x1="52" y1="22" x2="280" y2="22" stroke="#DDD0DC" strokeWidth="0.5"/>
                  <circle cx="272" cy="11" r="7" fill="#DDD0DC"/>
                  {/* Thread list */}
                  <rect x="52" y="22" width="92" height="158" fill="#FAFAFA"/>
                  <line x1="144" y1="22" x2="144" y2="180" stroke="#E0D0E0" strokeWidth="0.75"/>
                  <rect x="56" y="26" width="52" height="6" rx="2" fill="#DDD0DC"/>
                  {[
                    { sev: "#B42318", active: true },
                    { sev: "#8A5600", active: false },
                    { sev: "#553052", active: false },
                    { sev: "#2D6A4F", active: false },
                  ].map((t, i) => (
                    <g key={i}>
                      <rect x="52" y={36+i*32} width="92" height="30" fill={t.active ? "#F0E8F0" : "transparent"}/>
                      {t.active && <rect x="52" y={36+i*32} width="3" height="30" fill="#553052"/>}
                      <circle cx="64" cy={51+i*32} r="5" fill={t.sev}/>
                      <rect x="73" y={45+i*32} width="52" height="4" rx="1" fill={t.active ? "#9CA3AF" : "#D1D5DB"}/>
                      <rect x="73" y={53+i*32} width="38" height="3" rx="1" fill="#E0D8E0"/>
                    </g>
                  ))}
                  {/* Conversation */}
                  <rect x="150" y="30" width="80" height="22" rx="3" fill="#F0ECF0" stroke="#E0D0E0" strokeWidth="0.5"/>
                  <rect x="154" y="35" width="52" height="3" rx="1" fill="#9CA3AF"/>
                  <rect x="154" y="41" width="38" height="3" rx="1" fill="#C0B0C0"/>
                  <rect x="198" y="60" width="72" height="18" rx="3" fill="#EDE0F0"/>
                  <rect x="202" y="65" width="50" height="3" rx="1" fill="#A078A8"/>
                  <rect x="148" y="86" width="80" height="22" rx="3" fill="#FFF3CD" stroke="#F0E0B0" strokeWidth="0.5"/>
                  <rect x="152" y="91" width="52" height="3" rx="1" fill="#B08040"/>
                  <rect x="152" y="97" width="36" height="3" rx="1" fill="#D0A060"/>
                  <rect x="148" y="162" width="122" height="14" rx="2" fill="white" stroke="#E0D0E0" strokeWidth="0.75"/>
                  <rect x="154" y="166" width="60" height="4" rx="1" fill="#E0D8E0"/>
                  <rect x="256" y="163" width="12" height="12" rx="2" fill="#553052"/>
                </svg>
              </div>

              {/* F: Tasks */}
              <div className={styles.wfCard}>
                <div className={styles.wfCardHead}>
                  <div className={styles.wfCardLetter}>F</div>
                  <div className={styles.wfCardTitle}>Tasks</div>
                </div>
                <svg viewBox="0 0 280 180" className={styles.wfSvg} aria-label="Tasks wireframe">
                  <rect x="0" y="0" width="52" height="180" fill="#251324"/>
                  <rect x="8" y="7" width="36" height="7" rx="2" fill="#553052"/>
                  {[32, 28, 30, 34, 26, 22, 36, 24].map((w, i) => <rect key={i} x="10" y={24+i*17} width={w} height="4" rx="2" fill={i===5 ? "#7A4A76" : "#3A1D38"}/>)}
                  <rect x="52" y="0" width="228" height="22" fill="#F5EFF5"/>
                  <line x1="52" y1="22" x2="280" y2="22" stroke="#DDD0DC" strokeWidth="0.5"/>
                  <rect x="60" y="7" width="36" height="7" rx="2" fill="#DDD0DC"/>
                  <circle cx="272" cy="11" r="7" fill="#DDD0DC"/>
                  {/* NOW group */}
                  <rect x="58" y="28" width="214" height="18" rx="2" fill="#FEF0F0"/>
                  <circle cx="66" cy="37" r="4" fill="#B42318"/>
                  <rect x="74" y="34" width="44" height="5" rx="1" fill="#C08080"/>
                  {/* 2 task rows */}
                  {[0,1].map(i => (
                    <g key={i}>
                      <rect x="58" y={50+i*22} width="214" height="19" fill="white" stroke="#F0E8F0" strokeWidth="0.5"/>
                      <rect x="62" y={54+i*22} width="30" height="10" rx="3" fill={i===0 ? "#FEE2E2" : "#FFFBEB"}/>
                      <rect x="96" y={57+i*22} width="90" height="4" rx="1" fill="#9CA3AF"/>
                      <rect x="234" y={55+i*22} width="32" height="8" rx="3" fill="#EDE5F0"/>
                    </g>
                  ))}
                  {/* Divider */}
                  <line x1="58" y1="96" x2="272" y2="96" stroke="#E8E0E8" strokeWidth="0.75"/>
                  {/* DUE THIS SHIFT group */}
                  <rect x="58" y="100" width="214" height="16" rx="2" fill="#FAFAFA"/>
                  <circle cx="66" cy="108" r="4" fill="#8A5600"/>
                  <rect x="74" y="105" width="64" height="5" rx="1" fill="#B09060"/>
                  {/* 3 lighter rows */}
                  {[0,1,2].map(i => (
                    <g key={i}>
                      <rect x="58" y={120+i*18} width="214" height="15" fill="white" stroke="#F0E8F0" strokeWidth="0.5"/>
                      <rect x="62" y={124+i*18} width="26" height="7" rx="3" fill="#F5F0F5"/>
                      <rect x="92" y={126+i*18} width="80" height="3" rx="1" fill="#C0B0C0"/>
                      <rect x="234" y={124+i*18} width="32" height="7" rx="3" fill="#F0F0F0"/>
                    </g>
                  ))}
                </svg>
              </div>

              {/* G: Operational Insights */}
              <div className={styles.wfCard}>
                <div className={styles.wfCardHead}>
                  <div className={styles.wfCardLetter}>G</div>
                  <div className={styles.wfCardTitle}>Operational Insights</div>
                </div>
                <svg viewBox="0 0 280 180" className={styles.wfSvg} aria-label="Operational Insights wireframe">
                  <rect x="0" y="0" width="52" height="180" fill="#251324"/>
                  <rect x="8" y="7" width="36" height="7" rx="2" fill="#553052"/>
                  {[32, 28, 30, 34, 26, 22, 36, 24].map((w, i) => <rect key={i} x="10" y={24+i*17} width={w} height="4" rx="2" fill={i===6 ? "#7A4A76" : "#3A1D38"}/>)}
                  <rect x="52" y="0" width="228" height="22" fill="#F5EFF5"/>
                  <line x1="52" y1="22" x2="280" y2="22" stroke="#DDD0DC" strokeWidth="0.5"/>
                  <rect x="60" y="7" width="80" height="7" rx="2" fill="#DDD0DC"/>
                  <circle cx="272" cy="11" r="7" fill="#DDD0DC"/>
                  {/* 3 insight cards */}
                  <rect x="58" y="28" width="68" height="44" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1"/>
                  <rect x="58" y="28" width="3" height="44" fill="#F59E0B"/>
                  <rect x="66" y="34" width="28" height="12" rx="2" fill="#F5E0B0"/>
                  <rect x="66" y="52" width="44" height="4" rx="1" fill="#C0A060"/>
                  <rect x="132" y="28" width="68" height="44" rx="3" fill="white" stroke="#E8E0E8" strokeWidth="0.75"/>
                  <rect x="140" y="34" width="28" height="12" rx="2" fill="#E5E5E5"/>
                  <rect x="140" y="52" width="44" height="4" rx="1" fill="#D1D5DB"/>
                  <rect x="206" y="28" width="66" height="44" rx="3" fill="white" stroke="#E8E0E8" strokeWidth="0.75"/>
                  <rect x="214" y="34" width="28" height="12" rx="2" fill="#E5E5E5"/>
                  <rect x="214" y="52" width="44" height="4" rx="1" fill="#D1D5DB"/>
                  {/* Bar chart */}
                  <rect x="58" y="78" width="214" height="66" rx="3" fill="white" stroke="#E8E0E8" strokeWidth="0.75"/>
                  {[28,38,32,50,58,46,62,68,54,40,32,26].map((h, i) => (
                    <rect key={i} x={62+i*16} y={138-h} width="11" height={h} rx="1" fill="#7A4A76" opacity="0.65"/>
                  ))}
                  <line x1="60" y1="118" x2="270" y2="118" stroke="#B42318" strokeWidth="1" strokeDasharray="4 2"/>
                  {/* Table */}
                  <rect x="58" y="150" width="214" height="10" fill="#F0ECF0" stroke="#E0D0E0" strokeWidth="0.5"/>
                  {[0,1].map(i => <rect key={i} x="58" y={160+i*12} width="214" height="11" fill="white" stroke="#F0E8F0" strokeWidth="0.5"/>)}
                </svg>
              </div>

              {/* H: Settings */}
              <div className={styles.wfCard}>
                <div className={styles.wfCardHead}>
                  <div className={styles.wfCardLetter}>H</div>
                  <div className={styles.wfCardTitle}>Settings</div>
                </div>
                <svg viewBox="0 0 280 180" className={styles.wfSvg} aria-label="Settings wireframe">
                  <rect x="0" y="0" width="52" height="180" fill="#251324"/>
                  <rect x="8" y="7" width="36" height="7" rx="2" fill="#553052"/>
                  {[32, 28, 30, 34, 26, 22, 36, 24].map((w, i) => <rect key={i} x="10" y={24+i*17} width={w} height="4" rx="2" fill={i===7 ? "#7A4A76" : "#3A1D38"}/>)}
                  <rect x="52" y="0" width="228" height="22" fill="#F5EFF5"/>
                  <line x1="52" y1="22" x2="280" y2="22" stroke="#DDD0DC" strokeWidth="0.5"/>
                  <rect x="60" y="7" width="44" height="7" rx="2" fill="#DDD0DC"/>
                  <circle cx="272" cy="11" r="7" fill="#DDD0DC"/>
                  {/* Secondary settings nav */}
                  <rect x="52" y="22" width="90" height="158" fill="#FAF8FA"/>
                  <line x1="142" y1="22" x2="142" y2="180" stroke="#E0D0E0" strokeWidth="0.75"/>
                  {[
                    { label: "Overview", active: true, w: 52 },
                    { label: "Shift",    active: false, w: 36 },
                    { label: "Notifs",   active: false, w: 44 },
                    { label: "Display",  active: false, w: 40 },
                    { label: "Security", active: false, w: 46 },
                  ].map((item, i) => (
                    <g key={i}>
                      <rect x="52" y={28+i*22} width="90" height="20" fill={item.active ? "#F0E8F0" : "transparent"}/>
                      {item.active && <rect x="52" y={28+i*22} width="3" height="20" fill="#553052"/>}
                      <rect x="60" y={35+i*22} width={item.w} height="5" rx="1" fill={item.active ? "#553052" : "#D1D5DB"}/>
                    </g>
                  ))}
                  {/* Right: summary cards */}
                  {[0,1].map(i => (
                    <g key={i}>
                      <rect x="150" y={28+i*46} width="122" height="40" rx="3" fill="white" stroke="#E8E0E8" strokeWidth="0.75"/>
                      <rect x="158" y={36+i*46} width="52" height="5" rx="1" fill="#C0A0C0"/>
                      <rect x="158" y={44+i*46} width="40" height="14" rx="2" fill="#DDD0DC"/>
                    </g>
                  ))}
                  {/* Form fields */}
                  <rect x="150" y="124" width="122" height="48" rx="3" fill="white" stroke="#E8E0E8" strokeWidth="0.75"/>
                  {[0,1,2].map(i => <rect key={i} x="158" y={132+i*12} width="80" height="8" rx="2" fill="#F5F0F5"/>)}
                </svg>
              </div>

            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            7c. PRODUCT UI SCREENSHOTS
        ══════════════════════════════════════════════════ */}
        <div className={styles.uiSection}>
          <div className={styles.inner}>
            <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`}>08 — Product screens (UI)</div>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>The final interface — live prototype</h2>
            <p className={`${styles.sectionDesc} ${styles.sectionDescLight}`}>
              High-fidelity product screens captured from the running prototype at 1440×900.
              Real patient data, real components, real design system tokens — not mock-ups.
            </p>
          </div>
          <div className={styles.innerWide} style={{ paddingTop: 20 }}>
            <div className={styles.uiGrid}>
              {[
                { letter: 'A', title: 'Shift Briefing', file: 'shift-briefing',       tag: 'Command centre' },
                { letter: 'B', title: 'Patients',       file: 'patients',             tag: 'Patient list' },
                { letter: 'C', title: 'Appointments',   file: 'appointments',         tag: 'Outpatient queue' },
                { letter: 'D', title: 'Medical Records',file: 'medical-records',      tag: 'Shift worklist' },
                { letter: 'E', title: 'Messages',        file: 'messages',            tag: 'Clinical inbox' },
                { letter: 'F', title: 'Tasks',           file: 'tasks',               tag: 'Handover workflow' },
                { letter: 'G', title: 'Operational Insights', file: 'operational-insights', tag: 'Queue analytics' },
                { letter: 'H', title: 'Settings',        file: 'settings',            tag: 'Shift preferences' },
              ].map(s => (
                <div key={s.letter} className={styles.uiCard}>
                  <div className={styles.uiCardHead}>
                    <span className={styles.uiCardLetter}>{s.letter}</span>
                    <span className={styles.uiCardTitle}>{s.title}</span>
                    <span className={styles.uiCardTag}>{s.tag}</span>
                  </div>
                  <div className={styles.uiFrame}>
                    <img src={`/ui/${s.file}.png`} alt={`${s.title} — CareSync product screen`} className={styles.uiImg} loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            8. CORE SCREEN STORY
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>09 — Screen stories</div>
            <h2 className={styles.sectionTitle}>Each screen solves a specific clinical moment</h2>
            <p className={styles.sectionDesc}>
              Eight screens. Each with a clear problem it solves, a design decision, the key
              components used, and why it matters for clinical workflow.
            </p>
          </div>

          <div className={styles.innerWide}>
            <div className={styles.screenGrid}>

              {/* A. Shift Briefing */}
              <div className={styles.screenCard}>
                <div className={styles.screenCardBand} />
                <div className={styles.screenCardHead}>
                  <div className={`${styles.screenCardLetter}`}>A</div>
                  <div className={styles.screenCardTitleGroup}>
                    <div className={styles.screenCardTitle}>Shift Briefing</div>
                    <div className={styles.screenCardPurpose}>Command centre for the morning shift</div>
                  </div>
                </div>
                <div className={styles.screenCardBody}>
                  <div className={styles.screenCardDecision}>
                    <div className={styles.screenCardDecisionLabel}>Design decision</div>
                    <div className={styles.screenCardDecisionText}>Replace the greeting hero with an operational priority rail. The first thing the doctor sees is what needs attention — not their name and today's date.</div>
                  </div>
                  <div className={styles.uiFragment}>
                    <div className={styles.uiFragHead}>
                      <span className={styles.uiFragTitle}>Shift briefing · 08:47 AM</span>
                      <SeverityIndicator severity="high" compact />
                    </div>
                    <div className={styles.uiFragBody}>
                      <div className={`${styles.uiFragRow} ${styles.uiFragRowActive}`}>
                        <SeverityIndicator severity="high" compact />
                        <span className={styles.uiFragName}>Meera Iyer</span>
                        <span className={styles.uiFragMeta}>Glucose 142 · Review</span>
                        <TimingStatus timing="due-now" dueTime="09:00" compact />
                      </div>
                      <div className={`${styles.uiFragRow} ${styles.uiFragRowWarn}`}>
                        <SeverityIndicator severity="moderate" compact />
                        <span className={styles.uiFragName}>Rohan Das</span>
                        <span className={styles.uiFragMeta}>Lisinopril refill</span>
                        <TimingStatus timing="due-soon" dueTime="09:15" compact />
                      </div>
                    </div>
                  </div>
                  <div className={styles.screenCardComponents}>
                    {['Priority card', 'Now/Next/Later model', 'Patient row', 'Drawer', 'Task rail'].map(c => (
                      <span key={c} className={styles.screenCardChip}>{c}</span>
                    ))}
                  </div>
                  <div className={styles.screenCardNote}>Answering "what needs attention now" before any navigation required.</div>
                </div>
              </div>

              {/* B. Patients */}
              <div className={styles.screenCard}>
                <div className={styles.screenCardBand} />
                <div className={styles.screenCardHead}>
                  <div className={styles.screenCardLetter}>B</div>
                  <div className={styles.screenCardTitleGroup}>
                    <div className={styles.screenCardTitle}>Patients</div>
                    <div className={styles.screenCardPurpose}>Patient list with fast review access</div>
                  </div>
                </div>
                <div className={styles.screenCardBody}>
                  <div className={styles.screenCardDecision}>
                    <div className={styles.screenCardDecisionLabel}>Design decision</div>
                    <div className={styles.screenCardDecisionText}>Row click opens a quick-view drawer. Opening the full profile is an explicit secondary action — not the default on every touch.</div>
                  </div>
                  <div className={styles.uiFragment}>
                    <div className={styles.uiFragHead}>
                      <span className={styles.uiFragTitle}>Patient list · 5 patients</span>
                    </div>
                    <div className={styles.uiFragBody}>
                      {[
                        { name: 'Meera Iyer', id: 'CP-10482', sev: 'high' as const, active: true },
                        { name: 'Rohan Das', id: 'CP-10118', sev: 'moderate' as const, active: false },
                        { name: 'Arjun Nair', id: 'CP-10221', sev: 'routine' as const, active: false },
                      ].map(p => (
                        <div key={p.id} className={`${styles.uiFragRow} ${p.active ? styles.uiFragRowActive : ''}`}>
                          <SeverityIndicator severity={p.sev} compact />
                          <span className={styles.uiFragName}>{p.name}</span>
                          <span className={styles.uiFragMeta}>{p.id}</span>
                          <WorkflowStatus status={p.active ? 'under-review' : 'waiting'} compact />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.screenCardComponents}>
                    {['DataTable', 'FilterBar', 'SeverityIndicator', 'WorkflowStatus', 'Drawer'].map(c => (
                      <span key={c} className={styles.screenCardChip}>{c}</span>
                    ))}
                  </div>
                  <div className={styles.screenCardNote}>Active row state uses inset 3px aubergine left-accent — consistent with Tasks and Messages.</div>
                </div>
              </div>

              {/* C. Appointments */}
              <div className={styles.screenCard}>
                <div className={styles.screenCardBand} />
                <div className={styles.screenCardHead}>
                  <div className={styles.screenCardLetter}>C</div>
                  <div className={styles.screenCardTitleGroup}>
                    <div className={styles.screenCardTitle}>Appointments</div>
                    <div className={styles.screenCardPurpose}>Live outpatient queue and prep status</div>
                  </div>
                </div>
                <div className={styles.screenCardBody}>
                  <div className={styles.screenCardDecision}>
                    <div className={styles.screenCardDecisionLabel}>Design decision</div>
                    <div className={styles.screenCardDecisionText}>Flow status replaces appointment "type" as the primary column — the question is not what the appointment is, but where it is in the clinical process.</div>
                  </div>
                  <div className={styles.uiFragment}>
                    <div className={styles.uiFragHead}>
                      <span className={styles.uiFragTitle}>Today's queue · 09:30 →</span>
                    </div>
                    <div className={styles.uiFragBody}>
                      <div className={`${styles.uiFragRow} ${styles.uiFragRowActive}`}>
                        <span className={styles.uiFragName}>Arjun Nair</span>
                        <span className={styles.uiFragMeta}>09:30</span>
                        <Badge variant="warning" dot>Waiting 22m</Badge>
                      </div>
                      <div className={styles.uiFragRow}>
                        <span className={styles.uiFragName}>Kavya Menon</span>
                        <span className={styles.uiFragMeta}>10:00</span>
                        <Badge variant="brand">Scheduled</Badge>
                      </div>
                    </div>
                  </div>
                  <div className={styles.screenCardComponents}>
                    {['Queue table', 'FlowStatus', 'WaitTime', 'PrepNote', 'Drawer'].map(c => (
                      <span key={c} className={styles.screenCardChip}>{c}</span>
                    ))}
                  </div>
                  <div className={styles.screenCardNote}>Preparation notes are visible before the patient enters — not after they're already in the room.</div>
                </div>
              </div>

              {/* D. Medical Records */}
              <div className={styles.screenCard}>
                <div className={styles.screenCardBand} style={{ background: 'var(--color-warning-600)' }} />
                <div className={styles.screenCardHead}>
                  <div className={styles.screenCardLetter} style={{ background: 'var(--color-warning-600)' }}>D</div>
                  <div className={styles.screenCardTitleGroup}>
                    <div className={styles.screenCardTitle}>Medical Records</div>
                    <div className={styles.screenCardPurpose}>Shift-level records worklist — redesigned</div>
                  </div>
                </div>
                <div className={styles.screenCardBody}>
                  <div className={styles.screenCardDecision}>
                    <div className={styles.screenCardDecisionLabel}>Key design decision</div>
                    <div className={styles.screenCardDecisionText}>Changed from a single-patient record viewer to a shift-level worklist across all patients. The question is "which records need review this shift" — not "show me one patient's records."</div>
                  </div>
                  <div className={styles.uiFragment}>
                    <div className={styles.uiFragHead}>
                      <span className={styles.uiFragTitle}>Records needing review</span>
                      <Badge variant="warning">3 new</Badge>
                    </div>
                    <div className={styles.uiFragBody}>
                      <div className={`${styles.uiFragRow} ${styles.uiFragRowWarn}`}>
                        <span className={styles.uiFragName}>Meera Iyer — Glucose</span>
                        <span className={styles.uiFragMeta}>142 mg/dL ↑</span>
                        <WorkflowStatus status="new" compact />
                      </div>
                      <div className={styles.uiFragRow}>
                        <span className={styles.uiFragName}>Kavya Menon — Thyroid</span>
                        <span className={styles.uiFragMeta}>New report</span>
                        <WorkflowStatus status="new" compact />
                      </div>
                    </div>
                  </div>
                  <div className={styles.screenCardComponents}>
                    {['Records table', 'ReviewStatus', 'PatientChip', 'Drawer', 'WorkflowStatus'].map(c => (
                      <span key={c} className={styles.screenCardChip}>{c}</span>
                    ))}
                  </div>
                  <div className={styles.screenCardNote}>This was the most consequential IA decision in the project — it reoriented an entire screen around shift workflow rather than patient hierarchy.</div>
                </div>
              </div>

              {/* E. Messages */}
              <div className={styles.screenCard}>
                <div className={styles.screenCardBand} />
                <div className={styles.screenCardHead}>
                  <div className={styles.screenCardLetter}>E</div>
                  <div className={styles.screenCardTitleGroup}>
                    <div className={styles.screenCardTitle}>Messages</div>
                    <div className={styles.screenCardPurpose}>Clinical communication workspace</div>
                  </div>
                </div>
                <div className={styles.screenCardBody}>
                  <div className={styles.screenCardDecision}>
                    <div className={styles.screenCardDecisionLabel}>Design decision</div>
                    <div className={styles.screenCardDecisionText}>Three-column layout: 220px severity nav + 320px thread list + flexible conversation panel. Severity-sorted, not time-sorted by default.</div>
                  </div>
                  <div className={styles.uiFragment}>
                    <div className={styles.uiFragHead}>
                      <span className={styles.uiFragTitle}>Messages · 3 unread</span>
                    </div>
                    <div className={styles.uiFragBody}>
                      <div className={`${styles.uiFragRow} ${styles.uiFragRowWarn}`}>
                        <SeverityIndicator severity="high" compact />
                        <span className={styles.uiFragName}>Nurse Priya — Meera glucose</span>
                        <span className={styles.uiFragMeta}>08:30</span>
                      </div>
                      <div className={styles.uiFragRow}>
                        <SeverityIndicator severity="moderate" compact />
                        <span className={styles.uiFragName}>Lab system — Kavya thyroid</span>
                        <span className={styles.uiFragMeta}>08:15</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.screenCardComponents}>
                    {['MessageList', 'ConversationPanel', 'SeverityIndicator', 'Attachment', 'Composer'].map(c => (
                      <span key={c} className={styles.screenCardChip}>{c}</span>
                    ))}
                  </div>
                  <div className={styles.screenCardNote}>Patient context, result source, and severity all visible in the message list — not just subject lines.</div>
                </div>
              </div>

              {/* F. Tasks */}
              <div className={styles.screenCard}>
                <div className={styles.screenCardBand} />
                <div className={styles.screenCardHead}>
                  <div className={styles.screenCardLetter}>F</div>
                  <div className={styles.screenCardTitleGroup}>
                    <div className={styles.screenCardTitle}>Tasks &amp; Handovers</div>
                    <div className={styles.screenCardPurpose}>Inherited shift work made visible</div>
                  </div>
                </div>
                <div className={styles.screenCardBody}>
                  <div className={styles.screenCardDecision}>
                    <div className={styles.screenCardDecisionLabel}>Design decision</div>
                    <div className={styles.screenCardDecisionText}>Tasks grouped by time horizon: Now / Due this shift / Handed over / Waiting on others. Acknowledgement is required before a handover task is actioned.</div>
                  </div>
                  <div className={styles.uiFragment}>
                    <div className={styles.uiFragHead}>
                      <span className={styles.uiFragTitle}>Now — 2 tasks</span>
                    </div>
                    <div className={styles.uiFragBody}>
                      <div className={`${styles.uiFragRow} ${styles.uiFragRowWarn}`}>
                        <TimingStatus timing="overdue" dueTime="09:00" compact />
                        <span className={styles.uiFragName}>Review Meera glucose result</span>
                        <OwnershipStatus status="assigned-to-me" compact />
                      </div>
                      <div className={styles.uiFragRow}>
                        <TimingStatus timing="due-now" dueTime="09:15" compact />
                        <span className={styles.uiFragName}>Sign Rohan Lisinopril refill</span>
                        <OwnershipStatus status="assigned-to-me" compact />
                      </div>
                    </div>
                  </div>
                  <div className={styles.screenCardComponents}>
                    {['TaskGroup', 'TimingStatus', 'OwnershipStatus', 'WorkflowStatus', 'Drawer'].map(c => (
                      <span key={c} className={styles.screenCardChip}>{c}</span>
                    ))}
                  </div>
                  <div className={styles.screenCardNote}>Task groups use visual weight to indicate urgency — the "Now" group is never buried below a full list.</div>
                </div>
              </div>

              {/* G. Operational Insights */}
              <div className={styles.screenCard}>
                <div className={styles.screenCardBand} />
                <div className={styles.screenCardHead}>
                  <div className={styles.screenCardLetter}>G</div>
                  <div className={styles.screenCardTitleGroup}>
                    <div className={styles.screenCardTitle}>Operational Insights</div>
                    <div className={styles.screenCardPurpose}>Analytics that support action</div>
                  </div>
                </div>
                <div className={styles.screenCardBody}>
                  <div className={styles.screenCardDecision}>
                    <div className={styles.screenCardDecisionLabel}>Design decision</div>
                    <div className={styles.screenCardDecisionText}>Each insight card shows a metric, an owner, and a recommended action. Charts don't stand alone — they're accompanied by a narrative sentence and a stat block.</div>
                  </div>
                  <div className={styles.uiFragment}>
                    <div className={styles.uiFragHead}>
                      <span className={styles.uiFragTitle}>Queue pressure — this shift</span>
                    </div>
                    <div className={styles.uiFragBody}>
                      <div className={`${styles.uiFragRow} ${styles.uiFragRowWarn}`}>
                        <span className={styles.uiFragName}>+22% above expected</span>
                        <Badge variant="warning">Deploy float nurse</Badge>
                      </div>
                      <div className={styles.uiFragRow}>
                        <span className={styles.uiFragName}>Avg wait 42m</span>
                        <Badge variant="warning">+8m above last week</Badge>
                      </div>
                    </div>
                  </div>
                  <div className={styles.screenCardComponents}>
                    {['BarChart', 'ReferenceArea', 'InsightCard', 'WorkloadTable', 'AccessibleChartSummary'].map(c => (
                      <span key={c} className={styles.screenCardChip}>{c}</span>
                    ))}
                  </div>
                  <div className={styles.screenCardNote}>Bars are uniform aubergine. Red is only for the capacity threshold line — not for data.</div>
                </div>
              </div>

              {/* H. Settings */}
              <div className={styles.screenCard}>
                <div className={styles.screenCardBand} />
                <div className={styles.screenCardHead}>
                  <div className={styles.screenCardLetter}>H</div>
                  <div className={styles.screenCardTitleGroup}>
                    <div className={styles.screenCardTitle}>Settings</div>
                    <div className={styles.screenCardPurpose}>Shift preferences and clinical safety config</div>
                  </div>
                </div>
                <div className={styles.screenCardBody}>
                  <div className={styles.screenCardDecision}>
                    <div className={styles.screenCardDecisionLabel}>Design decision</div>
                    <div className={styles.screenCardDecisionText}>Settings is a 2-column card: left nav with aubergine active accent, right content. Not a full-page form. It uses the same enterprise card pattern as the rest of the product.</div>
                  </div>
                  <div className={styles.uiFragment}>
                    <div className={styles.uiFragHead}>
                      <span className={styles.uiFragTitle}>Overview · Dr. Ananya Rao</span>
                    </div>
                    <div className={styles.uiFragBody}>
                      <div className={styles.uiFragRow} style={{ justifyContent: 'space-between' }}>
                        <span className={styles.uiFragName}>Clinical alerts</span>
                        <span className={`${styles.miniChip} ${styles.miniChipBrand}`} style={{ color: '#A8C5A0' }}>On</span>
                      </div>
                      <div className={styles.uiFragRow} style={{ justifyContent: 'space-between' }}>
                        <span className={styles.uiFragName}>Default time filter</span>
                        <span className={styles.uiFragMeta}>This shift</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.screenCardComponents}>
                    {['SettingsNav', 'Toggle', 'Select', 'SummaryCard', 'ProfileBlock'].map(c => (
                      <span key={c} className={styles.screenCardChip}>{c}</span>
                    ))}
                  </div>
                  <div className={styles.screenCardNote}>2-column summary cards below account details — consistent with the data-dense enterprise pattern elsewhere.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            9. DESIGN SYSTEM
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionWarm}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>10 — Design system</div>
            <h2 className={styles.sectionTitle}>Making the product feel consistent, safe, and scalable</h2>
            <p className={styles.sectionDesc}>
              One token layer drives the entire product. Every colour decision is a safety decision.
              Every spacing decision is a density decision.
            </p>

            {/* Color tokens */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 'var(--font-size-label)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Brand scale — Aubergine</p>
              <div className={styles.dsTokenGrid}>
                {[
                  { label: '50', val: 'var(--color-brand-50)' },
                  { label: '100', val: 'var(--color-brand-100)' },
                  { label: '300', val: 'var(--color-brand-300)' },
                  { label: '600', val: 'var(--color-brand-600)' },
                  { label: '700', val: 'var(--color-brand-700)' },
                  { label: '800', val: 'var(--color-brand-800)' },
                  { label: '900', val: 'var(--color-brand-900)' },
                ].map(t => (
                  <div key={t.label} className={styles.dsToken}>
                    <div className={styles.dsTokenBlock} style={{ background: t.val }} />
                    <div className={styles.dsTokenLabel}>brand-{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Component grid */}
            <div className={styles.dsComponentGrid}>
              <div className={styles.dsComponentCard}>
                <div className={styles.dsComponentLabel}>Buttons</div>
                <div className={styles.dsComponentPreview}>
                  <Button variant="primary" size="sm">Primary</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="ghost" size="sm">Ghost</Button>
                  <Button variant="danger" size="sm">Danger</Button>
                </div>
              </div>
              <div className={styles.dsComponentCard}>
                <div className={styles.dsComponentLabel}>Severity</div>
                <div className={styles.dsComponentPreview}>
                  <SeverityIndicator severity="critical" compact />
                  <SeverityIndicator severity="high" compact />
                  <SeverityIndicator severity="moderate" compact />
                  <SeverityIndicator severity="routine" compact />
                  <SeverityIndicator severity="stable" compact />
                </div>
              </div>
              <div className={styles.dsComponentCard}>
                <div className={styles.dsComponentLabel}>Status badges</div>
                <div className={styles.dsComponentPreview}>
                  <Badge variant="critical" dot>Critical</Badge>
                  <Badge variant="warning" dot>Warning</Badge>
                  <Badge variant="success" dot>Stable</Badge>
                  <Badge variant="brand">Brand</Badge>
                </div>
              </div>
              <div className={styles.dsComponentCard}>
                <div className={styles.dsComponentLabel}>Workflow status</div>
                <div className={styles.dsComponentPreview}>
                  <WorkflowStatus status="new" compact />
                  <WorkflowStatus status="under-review" compact />
                  <WorkflowStatus status="completed" compact />
                  <WorkflowStatus status="waiting" compact />
                </div>
              </div>
              <div className={styles.dsComponentCard}>
                <div className={styles.dsComponentLabel}>Timing status</div>
                <div className={styles.dsComponentPreview}>
                  <TimingStatus timing="overdue" dueTime="Overdue" compact />
                  <TimingStatus timing="due-now" dueTime="Due now" compact />
                  <TimingStatus timing="due-soon" dueTime="Due soon" compact />
                </div>
              </div>
              <div className={styles.dsComponentCard}>
                <div className={styles.dsComponentLabel}>Clinical safety</div>
                <div className={styles.dsComponentPreview}>
                  <PatientSafetyStrip allergies={['Penicillin']} compact />
                </div>
              </div>
            </div>

            {/* Color decisions */}
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 'var(--font-size-label)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Colour decisions</p>
              <div className={styles.dsDecisionList}>
                {[
                  { color: 'var(--color-brand-600)', text: 'Aubergine gives the product a distinct, clinical identity separate from the blue-dominated healthcare SaaS category.' },
                  { color: 'var(--color-critical-600)', text: 'Red is reserved exclusively for patient safety risk. Never used for warnings, errors, or low-priority states.' },
                  { color: 'var(--color-warning-600)', text: 'Amber signals review required, urgency, or a rising trend — distinct from safety-critical states.' },
                  { color: 'var(--color-success-600)', text: 'Green is only used for stable, completed, or cleared states — never aspirational or decorative.' },
                ].map((d, i) => (
                  <div key={i} className={styles.dsDecisionRow}>
                    <div className={styles.dsDecisionColor} style={{ background: d.color }} />
                    <div className={styles.dsDecisionText}>{d.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            10. VISUAL DESIGN EVOLUTION
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>11 — Visual evolution</div>
            <h2 className={styles.sectionTitle}>Dashboard-first vs Shift-first</h2>
            <p className={styles.sectionDesc}>
              The transformation was not just visual — it was structural. Every before item represents
              a decision that prioritised appearance over clinical utility.
            </p>

            <div className={styles.evolutionGrid}>
              <div className={`${styles.evolutionCard} ${styles.evolutionCardBefore}`}>
                <div className={styles.evolutionCardHead}>
                  <div className={styles.evolutionCardLabel}>Before</div>
                  <div className={styles.evolutionCardTitle}>Dashboard-first</div>
                </div>
                <ul className={styles.evolutionList}>
                  <li>Blue healthcare SaaS aesthetic — instantly forgettable</li>
                  <li>KPI tiles at equal weight — no clinical priority model</li>
                  <li>Decorative bar charts with no threshold or context</li>
                  <li>Greeting hero with date and username above the fold</li>
                  <li>AI-generated look — no typographic personality</li>
                  <li>Colour used decoratively — not semantically</li>
                  <li>Fragmented screens with no shared interaction pattern</li>
                  <li>Generic patient list — no shift-level filtering</li>
                  <li>No visible ownership or timing on tasks</li>
                  <li>Medical Records showed one patient at a time</li>
                </ul>
              </div>

              <div className={`${styles.evolutionCard} ${styles.evolutionCardAfter}`}>
                <div className={styles.evolutionCardHead}>
                  <div className={styles.evolutionCardLabel}>After</div>
                  <div className={styles.evolutionCardTitle}>Shift-first</div>
                </div>
                <ul className={styles.evolutionList}>
                  <li>Warm aubergine identity — distinctive and clinical</li>
                  <li>Shift briefing command centre — clinical priority on first view</li>
                  <li>Charts with thresholds, narrative text, and accessible summaries</li>
                  <li>Operational priority rail above the fold — no greeting</li>
                  <li>Strong typographic hierarchy — 8-step scale, tabular numerals</li>
                  <li>Semantic colour model — red = safety, amber = review, green = stable</li>
                  <li>Row-click drawer pattern consistent across all tables</li>
                  <li>Shift-level patient filtering and status sorting</li>
                  <li>4-dimension status model: severity, workflow, timing, ownership</li>
                  <li>Medical Records redesigned as shift-level worklist</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            11. ACCESSIBILITY
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionWarm}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>12 — Accessibility</div>
            <h2 className={styles.sectionTitle}>Accessibility shaped the interaction model</h2>
            <p className={styles.sectionDesc}>
              Accessibility was not treated as a final checklist. It shaped interaction patterns from
              the start — drawer focus behaviour, table keyboard navigation, button sizing, and
              status label requirements.
            </p>

            <div className={styles.a11yGrid}>
              {[
                { icon: '⌨', title: 'Keyboard navigation', desc: 'All interactive elements are keyboard operable. Drawers trap focus while open. Escape closes the drawer and returns focus to the triggering row.' },
                { icon: '👁', title: 'No colour-only status', desc: 'Every status badge includes a visible text label. SeverityIndicator always shows a text name alongside the coloured dot — never dot alone.' },
                { icon: '🔲', title: 'Focus rings', desc: 'All interactive elements show a 3px aubergine glow focus ring: box-shadow: 0 0 0 3px rgba(85, 48, 82, 0.4). No element relies on browser default outline.' },
                { icon: '📏', title: 'Touch target minimums', desc: 'Primary action buttons are 40–44px minimum height. Supporting actions are 36px minimum. Icon buttons are 36×36px.' },
                { icon: '📊', title: 'Accessible charts', desc: 'Every recharts instance is accompanied by an AccessibleChartSummary component rendered with .sr-only — providing a full text description for screen readers.' },
                { icon: '🚨', title: 'Live region alerts', desc: 'PatientSafetyStrip uses role="alert" to announce allergy information to screen readers when it appears on screen.' },
                { icon: '⚡', title: 'Reduced motion', desc: 'Transitions collapse when prefers-reduced-motion: reduce is set. Drawer slide animations are replaced with instant opacity transitions.' },
                { icon: '🎯', title: 'Table accessibility', desc: 'All tables include a visually-hidden <caption> for screen reader context. Column headers use scope="col" for correct reading order.' },
              ].map(a => (
                <div key={a.title} className={styles.a11yCard}>
                  <div className={styles.a11yIcon}>{a.icon}</div>
                  <div className={styles.a11yContent}>
                    <div className={styles.a11yTitle}>{a.title}</div>
                    <div className={styles.a11yDesc}>{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.a11yQuote}>
              "The hardest part of clinical UX is controlled suppression — making the right things unmissable without making the wrong things alarming. The Now / Next / Later model is that discipline made structural."
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            12. AI-ASSISTED WORKFLOW
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>13 — AI-assisted design</div>
            <h2 className={styles.sectionTitle}>AI as design critic and implementation partner</h2>
            <p className={styles.sectionDesc}>
              AI was used throughout this project — but as a thinking partner and implementation
              accelerator, not as a replacement for design judgement. Every decision was evaluated,
              questioned, and refined through multiple passes.
            </p>

            <div className={styles.aiFlow}>
              {[
                { num: '1', label: 'Prompt', desc: 'Write the design brief and decision to implement' },
                { num: '2', label: 'Generate', desc: 'Generate the first implementation pass' },
                { num: '3', label: 'Audit', desc: 'Review for visual, semantic, and clinical issues' },
                { num: '4', label: 'Refine', desc: 'Multiple targeted refinement passes per screen' },
                { num: '5', label: 'Freeze', desc: 'Mark screen complete — do not redesign' },
                { num: '6', label: 'Systematise', desc: 'Extract to design system and document' },
              ].map(s => (
                <div key={s.num} className={styles.aiStep}>
                  <div className={styles.aiStepNum}>{s.num}</div>
                  <div className={styles.aiStepLabel}>{s.label}</div>
                  <div className={styles.aiStepDesc}>{s.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20 }}>
              <div className={styles.aiQuote}>
                "I used AI as a{' '}
                <span className={styles.aiQuoteStrong}>design critic</span>{' '}
                and{' '}
                <span className={styles.aiQuoteStrong}>implementation partner</span>
                , not as a replacement for design judgment. Every screen was audited section
                by section against clinical credibility, token consistency, and accessibility
                compliance — and revised until it was right."
              </div>
            </div>

            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {[
                { label: 'AI helped with', items: ['Exploring alternative IA structures', 'Auditing each screen section-by-section', 'Generating implementation from design decisions', 'Refining visual consistency across sessions', 'Creating design system documentation', 'Accessibility compliance checking'] },
                { label: 'Designer judgment on', items: ['Clinical credibility and safety language', 'Colour semantic decisions (what gets red vs amber)', 'What to suppress vs what to surface', 'Which screens to freeze vs refine further', 'Information hierarchy within each screen', 'The NOW / NEXT / LATER model structure'] },
              ].map(col => (
                <div key={col.label} style={{ background: 'var(--color-surface-secondary)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-card)', padding: '16px 20px' }}>
                  <div style={{ fontSize: 'var(--font-size-label)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-brand-600)', marginBottom: 12 }}>{col.label}</div>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {col.items.map(item => (
                      <li key={item} style={{ fontSize: 13, color: 'var(--color-text-secondary)', paddingLeft: 16, position: 'relative', lineHeight: 1.5 }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--color-brand-300)' }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            13. FINAL PRODUCT NARRATIVE
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.inner}>
            <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`}>14 — Final product</div>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>CareSync became less about showing everything and more about showing the right thing at the right moment</h2>

            <div className={styles.narrativeGrid}>
              {[
                { title: 'Shift Briefing', desc: 'Gives the doctor a safe operational starting point. Patients, results, and tasks prioritised by clinical severity — not by arrival time.' },
                { title: 'Patients & Appointments', desc: 'Support fast review and controlled deeper investigation. Row-click drawers prevent premature full-page navigation.' },
                { title: 'Medical Records & Messages', desc: 'Connect the clinical work — records as a shift worklist, messages sorted by severity rather than recency.' },
                { title: 'Tasks & Handovers', desc: 'Make inherited shift work visible and structured. Acknowledgement creates explicit continuity between shifts.' },
                { title: 'Operational Insights', desc: 'Support staffing and queue decisions with action-oriented analytics — not decorative charts.' },
                { title: 'Design System', desc: 'One token layer, one status architecture, 25+ components. Every screen speaks the same visual language.' },
              ].map(n => (
                <div key={n.title} className={styles.narrativeCard}>
                  <div className={styles.narrativeCardTitle}>{n.title}</div>
                  <div className={styles.narrativeCardDesc}>{n.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            14. WHAT I'D IMPROVE
        ══════════════════════════════════════════════════ */}
        <div className={`${styles.section} ${styles.sectionWarm}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>15 — Reflection</div>
            <h2 className={styles.sectionTitle}>What I would do next</h2>
            <p className={styles.sectionDesc}>
              A mature product never stops evolving. These are the next most valuable improvements
              if this continued beyond the assignment sprint.
            </p>

            <div className={styles.improveGrid}>
              {[
                { num: '01', title: 'Clinician usability testing', desc: 'Run structured sessions with GPs in outpatient settings to validate the NOW / NEXT / LATER model against real shift behaviour.' },
                { num: '02', title: 'Validate clinical language', desc: 'Review every severity label, status chip, and alert copy with a clinical advisor — this is the highest-risk content in the product.' },
                { num: '03', title: 'Density preference testing', desc: 'Test compact vs default row height with power users. Clinical interfaces often benefit from higher information density than general software.' },
                { num: '04', title: 'Mobile / tablet flow', desc: 'Refine the interaction patterns for bedside tablet use — drawer widths, touch target sizes, and gesture support need specific attention.' },
                { num: '05', title: 'Role-based views', desc: 'Nurse, admin, and specialist views would surface different primary contexts — the same shift data with different priority models.' },
                { num: '06', title: 'AI-generated shift summaries', desc: 'The typed data layer and structured status model make CareSync ready for AI-generated briefing narratives at shift start.' },
              ].map(i => (
                <div key={i.num} className={styles.improveCard}>
                  <div className={styles.improveCardNum}>{i.num}</div>
                  <div className={styles.improveCardTitle}>{i.title}</div>
                  <div className={styles.improveCardDesc}>{i.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            15. IMPACT STATEMENT
        ══════════════════════════════════════════════════ */}
        <div className={styles.impactSection}>
          <div className={styles.inner}>
            <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`} style={{ textAlign: 'center', marginBottom: 32 }}>16 — Design impact</div>

            <div className={styles.impactGrid}>
              {[
                { strong: 'Clearer information hierarchy', text: ' across all eight product screens — no screen competes with another for the same type of attention.' },
                { strong: 'Eliminated the generic dashboard feel', text: ' — CareSync does not look like any other healthcare SaaS product in the category.' },
                { strong: 'Consistent visual system', text: ' — one token layer, one status model, 25+ reusable components. Any new screen inherits the language automatically.' },
                { strong: 'Safer status semantics', text: ' — red means patient safety risk, nowhere else. Alert fatigue is structurally reduced by separating clinical and operational warnings.' },
                { strong: 'Stronger product storytelling', text: ' — the NOW / NEXT / LATER model gives clinicians a mental framework that the interface reinforces at every touchpoint.' },
                { strong: 'Enterprise-grade accessibility', text: ' — keyboard navigation, focus management, screen reader support, and live regions built into the component model from the start.' },
              ].map((c, i) => (
                <div key={i} className={styles.impactCard}>
                  <div className={styles.impactCardText}>
                    <span className={styles.impactCardStrong}>{c.strong}</span>{c.text}
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.impactClosing}>
              "CareSync is not a dashboard clinicians <em>look at</em>.<br />
              It is a shift system they can{' '}
              <span className={styles.impactClosingAccent}>act from</span>."
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <span className={styles.footerBrand}>CareSync</span> · UX/UI Case Study · Assignment sprint 2026
          </div>
          <div className={styles.footerRight}>
            Built with React + TypeScript + CSS Modules · Figma-ready HTML
          </div>
        </div>

      </div>
    </div>
  )
}
