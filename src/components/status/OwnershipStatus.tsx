import type { OwnershipStatus as OwnershipStatusType } from '../../data/careSyncData'
import { User, Users, UserCheck, Clock } from 'lucide-react'
import styles from './OwnershipStatus.module.css'

const CONFIG: Record<OwnershipStatusType, { label: string; className: string; Icon: typeof User }> = {
  'unassigned':          { label: 'Unassigned', className: styles.unassigned, Icon: User },
  'assigned-to-me':      { label: 'Assigned to me', className: styles.assignedMe, Icon: UserCheck },
  'assigned-to-teammate':{ label: 'Assigned to teammate', className: styles.assignedTeammate, Icon: User },
  'assigned-to-team':    { label: 'Assigned to team', className: styles.assignedTeam, Icon: Users },
  'waiting-external':    { label: 'Waiting on external', className: styles.waitingExternal, Icon: Clock },
}

interface Props {
  status: OwnershipStatusType
  owner?: string
  compact?: boolean
}

export default function OwnershipStatus({ status, owner, compact = false }: Props) {
  const { label, className, Icon } = CONFIG[status]
  return (
    <span
      className={`${styles.badge} ${className} ${compact ? styles.compact : ''}`}
      aria-label={owner ? `Owner: ${owner}` : label}
    >
      <Icon size={11} aria-hidden="true" />
      <span>{owner ?? label}</span>
    </span>
  )
}
