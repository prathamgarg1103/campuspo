'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, LayoutDashboard, Map, Store, Ticket, Users } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const navItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/timetable', label: 'Timetable', icon: CalendarDays },
  { href: '/events', label: 'Events', icon: Ticket },
  { href: '/societies', label: 'Societies', icon: Users },
  { href: '/shops', label: 'Shops', icon: Store },
]

export function StudentSidebar() {
  const pathname = usePathname()

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-4 md:block">
        <Link href="/" className="mb-6 flex items-center gap-3 px-3">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-600 text-sm font-bold text-white">CG</span>
          <span>
            <span className="block text-sm font-semibold text-slate-950 dark:text-slate-50">CampusGO</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Student app</span>
          </span>
        </Link>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50',
                  active && 'bg-brand-50 text-brand-600',
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-2 py-2 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} className={cn('flex flex-col items-center gap-1 rounded-lg py-1.5 text-[11px] text-slate-500', active && 'bg-brand-50 text-brand-600')}>
              <Icon className="size-4" />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
