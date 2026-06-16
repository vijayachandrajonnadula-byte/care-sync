import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ReferenceLine, ResponsiveContainer, ReferenceArea,
} from 'recharts'
import { ArrowRight } from 'lucide-react'
import { ARRIVALS_DATA, DEPT_WORKLOAD, CURRENT_USER } from '../data/careSyncData'
import PageHeader from '../components/shared/PageHeader'
import AccessibleChartSummary from '../components/clinical/AccessibleChartSummary'
import styles from './OperationalInsights.module.css'

const TIME_FILTERS = [
  { key: 'shift', label: 'This shift' },
  { key: 'today', label: 'Today' },
  { key: '7d', label: 'Last 7 days' },
]

const INSIGHT_CARDS = [
  {
    key: 'queue',
    title: 'Queue pressure',
    metric: '+22%',
    metricLabel: 'more arrivals than expected',
    owner: 'Charge Nurse M. Patel',
    action: 'Deploy float nurse',
    note: 'Pressure is concentrated between 09:00 and 11:00.',
    variant: 'warning' as const,
  },
  {
    key: 'wait',
    title: 'Wait time',
    metric: '42m',
    metricLabel: 'average wait',
    sub: '+8m above last week',
    owner: 'Dr. Ananya Rao',
    action: 'Review triage allocation',
    note: 'Longest delays are affecting checked-in patients.',
    variant: 'warning' as const,
  },
  {
    key: 'followup',
    title: 'Follow-up risk',
    metric: '+2pp',
    metricLabel: 'no-show increase',
    sub: 'Compared to last week',
    owner: 'Care Coordination',
    action: 'Review reminder workflow',
    note: 'Missed follow-ups are rising compared with last week.',
    variant: 'moderate' as const,
  },
]

export default function OperationalInsights() {
  const [timeFilter, setTimeFilter] = useState('shift')
  const [activeInsight, setActiveInsight] = useState<string | null>(null)

  return (
    <div className={styles.page}>
      <PageHeader
        title="Operational insights"
        meta={`This shift · ${CURRENT_USER.department} · Updated 08:45`}
        actions={
          <div className={styles.timeFilters} role="group" aria-label="Time period">
            {TIME_FILTERS.map(f => (
              <button
                key={f.key}
                className={`${styles.timeFilter} ${timeFilter === f.key ? styles.timeFilterActive : ''}`}
                onClick={() => setTimeFilter(f.key)}
                aria-pressed={timeFilter === f.key}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      />

      {/* Insight cards */}
      <div className={styles.insightGrid}>
        {INSIGHT_CARDS.map(card => (
          <button
            key={card.key}
            className={`${styles.insightCard} ${styles[`card_${card.variant}`]} ${activeInsight === card.key ? styles.insightCardActive : ''}`}
            onClick={() => setActiveInsight(activeInsight === card.key ? null : card.key)}
            aria-expanded={activeInsight === card.key}
          >
            <div className={styles.insightCardHeader}>
              <div className={styles.insightTitle}>{card.title}</div>
              <div className={styles.insightAction}>{card.action}</div>
            </div>
            <div className={styles.insightMetric}>
              <span className={styles.insightNum}>{card.metric}</span>
              <span className={styles.insightMetricLabel}>{card.metricLabel}</span>
            </div>
            {card.sub && <div className={styles.insightSub}>{card.sub}</div>}
            <div className={styles.insightOwner}>Owner: {card.owner}</div>
            {activeInsight === card.key && (
              <div className={styles.insightNote}>{card.note}</div>
            )}
          </button>
        ))}
      </div>

      {/* Arrivals chart */}
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <div>
            <div className={styles.chartTitle}>Patient arrivals vs expected</div>
            <div className={styles.chartMeta}>Source: Appointment system · Updated 08:45</div>
            <div className={styles.chartNarrative}>
              Pressure peaked between 09:00–11:00, with arrivals exceeding expected volume and nearing capacity.
            </div>
          </div>
          <div className={styles.chartStats}>
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

        <AccessibleChartSummary
          id="arrivals-chart-summary"
          text="Patient arrivals chart showing actual versus expected arrivals by hour. A pressure window between 09:00 and 11:00 shows actual arrivals 44–50% above expected. Expected total: 82. Actual total: 100, approximately 22% more. Capacity threshold is set at 15 patients per hour."
        />

        <div className={styles.chartLegend} aria-hidden="true">
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

        <ResponsiveContainer width="100%" height={256} aria-hidden="true" aria-describedby="arrivals-chart-summary">
          <BarChart data={ARRIVALS_DATA} margin={{ top: 8, right: 24, left: 0, bottom: 0 }} barCategoryGap="32%" barGap={3}>
            <CartesianGrid strokeDasharray="2 4" stroke="var(--color-border-default)" vertical={false} />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 18]}
              ticks={[0, 3, 6, 9, 12, 15, 18]}
              tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <ReferenceArea
              x1="09:00"
              x2="11:00"
              fill="var(--color-warning-200)"
              fillOpacity={0.25}
              stroke="none"
            />
            <ReferenceLine
              y={15}
              stroke="var(--color-critical-600)"
              strokeOpacity={0.5}
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{ value: 'Capacity 15', position: 'insideTopRight', fontSize: 11, fill: 'var(--color-text-muted)' }}
            />
            <Bar dataKey="actual" name="Actual arrivals" fill="var(--color-brand-600)" radius={[3, 3, 0, 0]} maxBarSize={18} />
            <Bar dataKey="expected" name="Expected baseline" fill="#DED9D5" radius={[2, 2, 0, 0]} maxBarSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Department workload */}
      <div className={styles.deptSection}>
        <h2 className={styles.deptTitle}>Department workload</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <caption className="sr-only">Department workload summary</caption>
            <thead>
              <tr>
                {['Department', 'Active appointments', 'Capacity', 'Average wait', 'Status', 'Recommended action'].map(h => (
                  <th key={h} scope="col" className={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEPT_WORKLOAD.map(row => (
                <tr key={row.dept} className={styles.tr}>
                  <td className={styles.td}><strong>{row.dept}</strong></td>
                  <td className={`${styles.td} ${styles.tabular}`}>{row.active}</td>
                  <td className={`${styles.td} ${styles.tabular}`}>
                    <div className={styles.capacityRow}>
                      <span className={styles.capacityText}>{row.active} / {row.capacity}</span>
                      <div className={styles.capacityBar}>
                        <div
                          className={`${styles.capacityFill} ${styles[`cap_${row.status}`]}`}
                          style={{ width: `${Math.min(100, (row.active / row.capacity) * 100)}%` }}
                          aria-label={`${Math.round((row.active / row.capacity) * 100)}% of capacity`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className={`${styles.td} ${styles.tabular}`}>{row.avgWait}</td>
                  <td className={styles.td}>
                    <span className={`${styles.statusBadge} ${styles[`status_${row.status}`]}`}>
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.recommendation}>{row.action}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.tableFooterRow}>
            <span className={styles.tableFooterCount}>{DEPT_WORKLOAD.length} departments shown</span>
            <button type="button" className={styles.viewAllAction}>
              Open operational report
              <ArrowRight size={13} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
