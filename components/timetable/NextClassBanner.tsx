import { Clock, MapPin } from 'lucide-react'
import type { TimetableSlot } from '@/lib/types'
import { Button } from '@/components/ui/button'

export function NextClassBanner({ slot }: { slot?: TimetableSlot }) {
  if (!slot) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-slate-950">No more classes today</p>
        <p className="mt-1 text-sm text-slate-500">Use the map to find study spaces or check upcoming campus events.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-brand-100 bg-brand-50 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-brand-900">Next class</p>
        <h2 className="mt-1 text-xl font-semibold text-slate-950">{slot.subject_name}</h2>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-2"><Clock className="size-4" /> {slot.start_time} - {slot.end_time}</span>
          <span className="flex items-center gap-2"><MapPin className="size-4" /> {slot.room?.room_code}, {slot.room?.building?.short_name}</span>
        </div>
      </div>
      <Button>Locate room</Button>
    </div>
  )
}
