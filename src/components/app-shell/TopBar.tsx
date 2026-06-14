import { Bell, ChevronDown, HelpCircle, Search } from 'lucide-react'
import { CURRENT_USER } from '../../data/careSyncData'
import styles from './TopBar.module.css'

export default function TopBar() {
  return (
    <header className={styles.topBar} role="banner">
      <div className={styles.left}>
        <div className={styles.searchWrapper}>
          <Search size={15} className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search patients, records, labs, tasks..."
            className={styles.searchInput}
            aria-label="Global search"
          />
          <kbd className={styles.searchKbd} aria-hidden="true">⌘K</kbd>
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.deptSelector} aria-label="Change department" aria-haspopup="true">
          <span>{CURRENT_USER.department}</span>
          <ChevronDown size={14} aria-hidden="true" />
        </button>

        <div className={styles.shiftBadge} aria-label="Current shift">
          <span className={styles.shiftDot} aria-hidden="true" />
          <span>{CURRENT_USER.shift} · {CURRENT_USER.currentTime}</span>
        </div>

        <button className={styles.iconBtn} aria-label="Notifications (2 unread)">
          <Bell size={18} aria-hidden="true" />
          <span className={styles.notifDot} aria-hidden="true" />
        </button>

        <button className={styles.iconBtn} aria-label="Help">
          <HelpCircle size={18} aria-hidden="true" />
        </button>

        <button className={styles.userMenu} aria-label="User menu" aria-haspopup="true">
          <div className={styles.userAvatar} aria-hidden="true">AR</div>
          <span className={styles.userName}>{CURRENT_USER.name}</span>
          <ChevronDown size={14} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
