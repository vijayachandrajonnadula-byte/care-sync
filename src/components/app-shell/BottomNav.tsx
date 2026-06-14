import { NavLink } from 'react-router-dom'
import {
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  MessageSquare,
  Users,
} from 'lucide-react'
import styles from './BottomNav.module.css'

const TABS = [
  { path: '/shift-briefing', label: 'Shift', icon: LayoutDashboard },
  { path: '/patients', label: 'Patients', icon: Users },
  { path: '/appointments', label: 'Schedule', icon: CalendarDays },
  { path: '/messages', label: 'Messages', icon: MessageSquare, badge: 2 },
  { path: '/tasks', label: 'Tasks', icon: ClipboardList, badge: 3 },
]

export default function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Mobile navigation">
      {TABS.map(({ path, label, icon: Icon, badge }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.tabActive : ''}`
          }
        >
          <span className={styles.iconWrap}>
            <Icon size={22} aria-hidden="true" />
            {badge !== undefined && (
              <span className={styles.badge} aria-label={`${badge} items`}>{badge}</span>
            )}
          </span>
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
