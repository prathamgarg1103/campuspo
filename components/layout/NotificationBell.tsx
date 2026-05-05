'use client'

import { Bell } from 'lucide-react'
import { sampleNotifications } from '@/lib/data/sample'

export function NotificationBell() {
  const unread = sampleNotifications.filter((notification) => !notification.is_read).length

  return (
    <button className="relative grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50" aria-label="Notifications">
      <Bell className="size-4" />
      {unread > 0 ? <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" /> : null}
    </button>
  )
}
