import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import { MEERA_GLUCOSE_HISTORY } from '../../data/careSyncData'
import AccessibleChartSummary from './AccessibleChartSummary'
import styles from './ClinicalChart.module.css'

const TARGET_RANGE = { min: 70, max: 100 }
const CURRENT_VALUE = 142
const PREVIOUS_VALUE = 118

export default function GlucoseChart() {
  const data = MEERA_GLUCOSE_HISTORY

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <div>
          <div className={styles.chartTitle}>Fasting Glucose</div>
          <div className={styles.chartMeta}>
            <span>Source: Central Laboratory</span>
            <span className={styles.metaSep} aria-hidden="true">·</span>
            <span>Updated: Today 07:45</span>
          </div>
        </div>
        <div className={styles.chartCurrentValue}>
          <span className={styles.currentVal} style={{ color: 'var(--color-warning-700)' }}>
            {CURRENT_VALUE}
          </span>
          <span className={styles.currentUnit}>mg/dL</span>
          <span className={styles.currentBadge} style={{ background: 'var(--color-warning-50)', color: 'var(--color-warning-700)', border: '1px solid var(--color-warning-200)' }}>
            +{CURRENT_VALUE - PREVIOUS_VALUE} vs prev
          </span>
        </div>
      </div>

      <AccessibleChartSummary
        id="glucose-chart-summary"
        text={`Fasting glucose trend for Meera Iyer over 6 months. Values: Sep 115, Oct 118, Nov 122, Dec 119, Jan 125, Today 142 mg/dL. Current value of 142 mg/dL is above the target range of 70–100 mg/dL, representing an increase of 24 mg/dL compared to the previous reading of 118 mg/dL.`}
      />

      <div className={styles.chartLegend} aria-hidden="true">
        <span className={styles.legendItem}>
          <span className={styles.legendLine} style={{ background: 'var(--color-brand-600)' }} />
          Glucose (mg/dL)
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendArea} style={{ background: 'var(--color-success-200)', opacity: 0.4 }} />
          Target range (70–100)
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDash} style={{ borderColor: 'var(--color-critical-600)' }} />
          Above target
        </span>
      </div>

      <ResponsiveContainer width="100%" height={190} aria-hidden="true">
        <AreaChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="glucoseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-brand-600)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="var(--color-brand-600)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[80, 160]}
            tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `${v}`}
            width={36}
            label={{ value: 'mg/dL', angle: -90, position: 'insideLeft', offset: 10, style: { fontSize: 11, fill: 'var(--color-text-muted)' } }}
          />
          <Tooltip
            contentStyle={{ fontSize: 13, border: '1px solid var(--color-border-default)', borderRadius: 6, background: 'var(--color-surface-primary)' }}
            formatter={(val: number) => [`${val} mg/dL`, 'Glucose']}
          />
          {/* Target range band */}
          <ReferenceLine y={100} stroke="var(--color-success-600)" strokeDasharray="4 3" strokeWidth={1} label={{ value: 'Target max 100', position: 'insideTopRight', fontSize: 11, fill: 'var(--color-success-700)' }} />
          <ReferenceLine y={70} stroke="var(--color-success-600)" strokeDasharray="4 3" strokeWidth={1} />
          <Area type="monotone" dataKey="value" stroke="var(--color-brand-600)" strokeWidth={2} fill="url(#glucoseGrad)" dot={{ fill: 'var(--color-brand-600)', r: 3 }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
