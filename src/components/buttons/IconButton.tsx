import { type ReactNode, type ButtonHTMLAttributes } from 'react'
import styles from './IconButton.module.css'

type IconButtonVariant = 'default' | 'ghost' | 'danger'
type IconButtonSize = 'sm' | 'md'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  label: string
  variant?: IconButtonVariant
  size?: IconButtonSize
}

export default function IconButton({
  children,
  label,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}: IconButtonProps) {
  const classes = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ')
  return (
    <button className={classes} aria-label={label} {...props}>
      {children}
    </button>
  )
}
