import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'outline'

const variants: Record<BadgeVariant, string> = {
  default: 'bg-brand-600 text-white',
  secondary: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-800',
  outline: 'border border-slate-200 bg-white text-slate-700',
}

export function Badge({ className, variant = 'secondary', ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', variants[variant], className)} {...props} />
}
