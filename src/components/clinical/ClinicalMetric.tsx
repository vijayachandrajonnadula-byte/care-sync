import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import styles from './ClinicalMetric.module.css'

type Trend = 'up' | 'down' | 'stable'
type MetricStatus = 'normal' | 'elevated' | 'critical'

interface Props {
  label: string
  value: string
  unit: string
  previous?: string
  change?: string
  trend?: Trend
  status?: MetricStatus
}

const TREND_ICONS = { up: TrendingUp, down: TrendingDown, stable: Minus }

export default function ClinicalMetric({ label, value, unit, previous, change, trend, status = 'normal' }: Props) {
  const TrendIcon = trend ? TREND_ICONS[trend] : null

  return (
    <div className={`${styles.metric} ${styles[status]}`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        <span className={styles.unit}>{unit}</span>
        {TrendIcon && trend && (
          <span
            className={`${styles.trendIcon} ${styles[`trend_${trend}`]}`}
            aria-label={`Trend: ${trend}`}
          >
            <TrendIcon size={14} aria-hidden="true" />
          </span>
        )}
      </div>
      {previous && (
        <div className={styles.previous}>
          <span>Prev {previous} {unit}</span>
          {change && <span className={`${styles.change} ${trend === 'up' ? styles.changeUp : trend === 'down' ? styles.changeDown : ''}`}>{change}</span>}
        </div>
      )}
    </div>
  )
}
