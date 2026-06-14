import styles from './FilterBar.module.css'

interface Filter {
  key: string
  label: string
  count?: number
}

interface FilterBarProps {
  filters: Filter[]
  active: string
  onChange: (key: string) => void
  label?: string
}

export default function FilterBar({ filters, active, onChange, label = 'Filter' }: FilterBarProps) {
  return (
    <div className={styles.bar} role="tablist" aria-label={label}>
      {filters.map(filter => (
        <button
          key={filter.key}
          role="tab"
          className={`${styles.filter} ${active === filter.key ? styles.active : ''}`}
          onClick={() => onChange(filter.key)}
          aria-selected={active === filter.key}
        >
          <span>{filter.label}</span>
          {filter.count !== undefined && (
            <span className={styles.count} aria-label={`${filter.count} items`}>
              {filter.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
