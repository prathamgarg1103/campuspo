'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, CalendarPlus, ClipboardList, LayoutDashboard, MapPinned, Store, TableProperties } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/events', label: 'Events', icon: CalendarPlus },
  { href: '/admin/timetables', label: 'Timetables', icon: TableProperties },
  { href: '/admin/shops', label: 'Shops', icon: Store },
  { href: '/admin/map', label: 'Map Data', icon: MapPinned },
  { href: '/admin/notifications', label: 'Notifications', icon: Bell },
  { href: '/admin/registrations/event-orientation', label: 'Registrations', icon: ClipboardList },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-100 bg-slate-950 px-3 py-4 text-white md:block">
      <Link href="/admin/dashboard" className="mb-6 flex items-center gap-3 px-3">
        <span className="grid size-9 place-items-center rounded-xl bg-white text-sm font-bold text-brand-700">CG</span>
        <span>
          <span className="block text-sm font-semibold">CampusGO</span>
          <span className="block text-xs text-slate-400">Admin console</span>
        </span>
      </Link>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10', active && 'bg-white text-slate-950')}>
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
