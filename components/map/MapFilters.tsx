'use client'

import { cn } from '@/lib/utils/cn'
import { CAMPUS_CATEGORIES } from '@/lib/mapbox/campusGeoJSON'

export const filters = ['All', ...CAMPUS_CATEGORIES] as const

export type MapFilter = (typeof filters)[number]

export function MapFilters({ value, onChange }: { value: MapFilter; onChange: (value: MapFilter) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={cn(
            'rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-50',
            value === filter && 'border-brand-600 bg-brand-600 text-white hover:bg-brand-700',
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
