'use client'

import { useQuery } from '@tanstack/react-query'
import { sampleTimetable } from '@/lib/data/sample'

export function useTimetable(branch = 'CSE', semester = 5, section = 'A') {
  return useQuery({
    queryKey: ['timetable', branch, semester, section],
    queryFn: async () => {
      const response = await fetch(`/api/timetable?branch=${branch}&semester=${semester}&section=${section}`)
      if (!response.ok) return sampleTimetable
      return response.json()
    },
    initialData: sampleTimetable,
  })
}
