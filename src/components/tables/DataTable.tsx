import { type ReactNode } from 'react'
import styles from './DataTable.module.css'

export interface Column<T> {
  key: string
  header: string
  width?: string
  render: (row: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  getRowKey: (row: T) => string
  onRowClick?: (row: T) => void
  activeRowKey?: string
  emptyMessage?: string
  caption?: string
}

export default function DataTable<T>({
  columns,
  rows,
  getRowKey,
  onRowClick,
  activeRowKey,
  emptyMessage = 'No items to display.',
  caption,
}: DataTableProps<T>) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table} role="grid">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                scope="col"
                className={styles.th}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map(row => {
              const key = getRowKey(row)
              const isActive = key === activeRowKey
              return (
                <tr
                  key={key}
                  className={`${styles.tr} ${onRowClick ? styles.clickable : ''} ${isActive ? styles.active : ''}`}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  onKeyDown={onRowClick ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onRowClick(row)
                    }
                  } : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  aria-selected={isActive}
                  role={onRowClick ? 'row' : undefined}
                >
                  {columns.map(col => (
                    <td key={col.key} className={`${styles.td} ${col.className ?? ''}`}>
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
