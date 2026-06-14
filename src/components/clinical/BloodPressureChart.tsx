import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { MEERA_BP_HISTORY } from '../../data/careSyncData'
import AccessibleChartSummary from './AccessibleChartSummary'
import styles from './ClinicalChart.module.css'

export default function BloodPressureChart() {
  const data = MEERA_BP_HISTORY

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <div>
          <div className={styles.chartTitle}>Blood Pressure Trend</div>
          <div className={styles.chartMeta}>
            <span>Source: Clinical Record</span>
            <span className={styles.metaSep} aria-hidden="true">·</span>
            <span>Updated: Today 07:45</span>
          </div>
        </div>
        <div className={styles.chartCurrentValue}>
          <span className={styles.currentVal} style={{ color: 'var(--color-warning-700)' }}>145/90</span>
          <span className={styles.currentUnit}>mmHg</span>
          <span className={styles.currentBadge} style={{ background: 'var(--color-warning-50)', color: 'var(--color-warning-700)', border: '1px solid var(--color-warning-200)' }}>
            ↑ vs prev 140/88
          </span>
        </div>
      </div>

      <AccessibleChartSummary
        id="bp-chart-summary"
        text={`Blood pressure trend for Meera Iyer over 6 months. Systolic values: Sep 132, Oct 136, Nov 138, Dec 135, Jan 140, Today 145 mmHg. Diastolic values: Sep 84, Oct 86, Nov 87, Dec 85, Jan 88, Today 90 mmHg. Both systolic and diastolic readings are above normal thresholds of 120/80 mmHg and have been increasing over the past two months.`}
      />

      <div className={styles.chartLegend} aria-hidden="true">
        <span className={styles.legendItem}>
          <span className={styles.legendLine} style={{ background: 'var(--color-brand-600)' }} />
          Systolic (mmHg)
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendLine} style={{ background: 'var(--color-warning-600)' }} />
          Diastolic (mmHg)
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDash} style={{ borderColor: 'var(--color-border-strong)' }} />
          Thresholds (120 / 80)
        </span>
      </div>

      <ResponsiveContainer width="100%" height={190} aria-hidden="true">
        <LineChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[70, 160]}
            tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
            axisLine={false}
            tickLine={false}
            width={36}
            label={{ value: 'mmHg', angle: -90, position: 'insideLeft', offset: 10, style: { fontSize: 11, fill: 'var(--color-text-muted)' } }}
          />
          <Tooltip
            contentStyle={{ fontSize: 13, border: '1px solid var(--color-border-default)', borderRadius: 6, background: 'var(--color-surface-primary)' }}
            formatter={(val: number, name: string) => [`${val} mmHg`, name === 'systolic' ? 'Systolic' : 'Diastolic']}
          />
          <ReferenceLine y={120} stroke="var(--color-border-strong)" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: 'Sys 120', position: 'insideTopRight', fontSize: 11, fill: 'var(--color-text-muted)' }} />
          <ReferenceLine y={80} stroke="var(--color-border-strong)" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: 'Dia 80', position: 'insideBottomRight', fontSize: 11, fill: 'var(--color-text-muted)' }} />
          <Line type="monotone" dataKey="systolic" stroke="var(--color-brand-600)" strokeWidth={2} dot={{ fill: 'var(--color-brand-600)', r: 3 }} activeDot={{ r: 5 }} name="Systolic" />
          <Line type="monotone" dataKey="diastolic" stroke="var(--color-warning-600)" strokeWidth={2} dot={{ fill: 'var(--color-warning-600)', r: 3 }} activeDot={{ r: 5 }} name="Diastolic" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
