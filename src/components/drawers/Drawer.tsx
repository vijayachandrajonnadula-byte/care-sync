import { type ReactNode, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import styles from './Drawer.module.css'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  width?: number
  closeLabel?: string
}

export default function Drawer({
  open,
  onClose,
  title,
  children,
  width = 420,
  closeLabel = 'Close',
}: DrawerProps) {
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Escape key closes drawer
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  // Scroll lock
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Save trigger element on open; focus close button; restore focus on close
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement
      requestAnimationFrame(() => closeBtnRef.current?.focus())
    } else if (previousFocusRef.current) {
      const el = previousFocusRef.current
      previousFocusRef.current = null
      requestAnimationFrame(() => el.focus())
    }
  }, [open])

  if (!open) return null

  return (
    <>
      <div
        className={styles.overlay}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={styles.drawer}
        style={{ width }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            ref={closeBtnRef}
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={closeLabel}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </>
  )
}
