import { type ReactNode, type ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

export default function Button({
  variant = 'secondary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button className={classes} {...props}>
      {icon && iconPosition === 'left' && (
        <span className={styles.icon} aria-hidden="true">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={styles.icon} aria-hidden="true">{icon}</span>
      )}
    </button>
  )
}
