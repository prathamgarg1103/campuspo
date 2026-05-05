'use client'

import { StudentSidebar } from '@/components/layout/StudentSidebar'
import { TopBar } from '@/components/layout/TopBar'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/map': 'Campus Map',
  '/timetable': 'Timetable',
  '/events': 'Events',
  '/societies': 'Societies',
  '/shops': 'Shops',
  '/registrations': 'Registrations',
}

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? 'CampusGO'

  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <div className="flex flex-1 flex-col md:pl-60">
        <TopBar title={title} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
