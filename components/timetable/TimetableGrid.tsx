'use client'

import type { TimetableSlot } from '@/lib/types'
import { cn } from '@/lib/utils/cn'

const days = [
  { id: 1, label: 'Mon' },
  { id: 2, label: 'Tue' },
  { id: 3, label: 'Wed' },
  { id: 4, label: 'Thu' },
  { id: 5, label: 'Fri' },
  { id: 6, label: 'Sat' },
]

const times = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00']

export function TimetableGrid({ slots }: { slots: TimetableSlot[] }) {
  const today = new Date().getDay()

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="min-w-[760px]">
        <div className="grid grid-cols-[90px_repeat(6,1fr)] border-b border-slate-100">
          <div className="p-3 text-xs font-medium uppercase text-slate-400">Time</div>
          {days.map((day) => (
            <div key={day.id} className={cn('p-3 text-sm font-semibold text-slate-700', today === day.id && 'bg-brand-50 text-brand-700')}>{day.label}</div>
          ))}
        </div>
        {times.map((time) => (
          <div key={time} className="grid min-h-28 grid-cols-[90px_repeat(6,1fr)] border-b border-slate-100 last:border-b-0">
            <div className="p-3 text-sm text-slate-500">{time}</div>
            {days.map((day) => {
              const slot = slots.find((item) => item.day_of_week === day.id && item.start_time.startsWith(time.slice(0, 2)))
              return (
                <button key={day.id} className={cn('p-2 text-left transition hover:bg-slate-50', today === day.id && 'bg-brand-50/50')}>
                  {slot ? (
                    <span className="block rounded-lg border border-slate-100 bg-white p-3 shadow-sm">
                      <span className="block text-sm font-semibold text-slate-950">{slot.subject_name}</span>
                      <span className="mt-1 block text-xs text-slate-500">{slot.faculty_name}</span>
                      <span className="mt-2 block text-xs font-medium text-brand-700">{slot.room?.room_code}</span>
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
