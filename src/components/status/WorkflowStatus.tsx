import type { WorkflowStatus as WorkflowStatusType } from '../../data/careSyncData'
import styles from './WorkflowStatus.module.css'

const CONFIG: Record<WorkflowStatusType, { label: string; className: string }> = {
  'new':            { label: 'New', className: styles.new },
  'acknowledged':   { label: 'Acknowledged', className: styles.acknowledged },
  'under-review':   { label: 'Under Review', className: styles.underReview },
  'assigned':       { label: 'Assigned', className: styles.assigned },
  'waiting':        { label: 'Waiting', className: styles.waiting },
  'blocked':        { label: 'Blocked', className: styles.blocked },
  'completed':      { label: 'Completed', className: styles.completed },
  'resolved':       { label: 'Resolved', className: styles.resolved },
  'record-updated': { label: 'Record Updated', className: styles.recordUpdated },
  'pending-approval': { label: 'Pending Approval', className: styles.pending },
}

interface Props {
  status: WorkflowStatusType
  compact?: boolean
}

export default function WorkflowStatus({ status, compact = false }: Props) {
  const { label, className } = CONFIG[status]
  return (
    <span
      className={`${styles.badge} ${className} ${compact ? styles.compact : ''}`}
      aria-label={`Workflow status: ${label}`}
    >
      {label}
    </span>
  )
}
