import { type ReactNode } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import BottomNav from './BottomNav'
import styles from './AppShell.module.css'

interface AppShellProps {
  children: ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <TopBar />
        <main className={styles.content} id="main-content">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
