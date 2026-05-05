'use client'

import dynamic from 'next/dynamic'

const LeafletCampusMap = dynamic(
  () => import('@/components/map/LeafletCampusMap').then((mod) => mod.LeafletCampusMap),
  {
    ssr: false,
    loading: () => <div className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-500">Loading Thapar map...</div>,
  },
)

export function CampusMap() {
  return <LeafletCampusMap />
}
