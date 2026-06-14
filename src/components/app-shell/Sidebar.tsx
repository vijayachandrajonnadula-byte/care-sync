import { NavLink, useNavigate } from 'react-router-dom'
import {
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  TrendingUp,
  Users,
} from 'lucide-react'
import { CURRENT_USER } from '../../data/careSyncData'
import styles from './Sidebar.module.css'

const CLINICAL_NAV = [
  { path: '/shift-briefing', label: 'Shift Briefing', icon: LayoutDashboard },
  { path: '/patients', label: 'Patients', icon: Users },
  { path: '/appointments', label: 'Appointments', icon: CalendarDays },
  { path: '/medical-records', label: 'Medical Records', icon: FileText },
  { path: '/messages', label: 'Messages', icon: MessageSquare, badge: 2 },
  { path: '/tasks', label: 'Tasks', icon: ClipboardList, badge: 3 },
  { path: '/operational-insights', label: 'Operational Insights', icon: TrendingUp },
]

const SUPPORT_NAV = [
  { path: '/settings', label: 'Settings', icon: Settings },
]

function NavItems({ items }: { items: typeof CLINICAL_NAV }) {
  return (
    <>
      {items.map(({ path, label, icon: Icon, badge }) => (
        <li key={path}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <Icon size={18} aria-hidden="true" />
            <span className={styles.navLabel}>{label}</span>
            {badge !== undefined && (
              <span className={styles.navBadge} aria-label={`${badge} items`}>{badge}</span>
            )}
          </NavLink>
        </li>
      ))}
    </>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className={styles.sidebar} aria-label="Main navigation">
      <div
        className={styles.logo}
        onClick={() => navigate('/shift-briefing')}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && navigate('/shift-briefing')}
      >
        <span className={styles.logoMark} aria-hidden="true">CS</span>
        <span className={styles.logoText}>CareSync</span>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navSection}>Clinical</div>
        <ul role="list" className={styles.navList}>
          <NavItems items={CLINICAL_NAV} />
        </ul>

        <div className={styles.navDivider} />

        <ul role="list" className={styles.navList}>
          <NavItems items={SUPPORT_NAV} />
        </ul>
      </nav>

      <div className={styles.identity}>
        <div className={styles.identityAvatar} aria-hidden="true">
          {CURRENT_USER.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className={styles.identityText}>
          <div className={styles.identityName}>{CURRENT_USER.name}</div>
          <div className={styles.identityMeta}>{CURRENT_USER.department} · {CURRENT_USER.shift}</div>
        </div>
        <div className={styles.shiftDot} title="Shift active" aria-hidden="true" />
      </div>
    </aside>
  )
}
