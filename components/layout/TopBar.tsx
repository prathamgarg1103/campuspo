import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { NotificationBell } from '@/components/layout/NotificationBell'

export function TopBar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-slate-100 bg-white/90 px-4 backdrop-blur md:px-6">
      <div>
        <p className="text-xs text-slate-500">{process.env.NEXT_PUBLIC_CAMPUS_NAME ?? 'Thapar Institute of Engineering & Technology'}</p>
        <h1 className="text-sm font-semibold text-slate-950">{title}</h1>
      </div>
      <div className="hidden max-w-sm flex-1 items-center md:flex">
        <label className="relative w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input className="pl-9" placeholder="Search events, rooms, shops" />
        </label>
      </div>
      <NotificationBell />
    </header>
  )
}
