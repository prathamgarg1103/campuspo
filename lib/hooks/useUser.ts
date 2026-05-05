'use client'

import { sampleProfiles } from '@/lib/data/sample'

export function useUser() {
  return { user: sampleProfiles[0], isLoading: false }
}
