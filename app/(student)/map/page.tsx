import dynamic from 'next/dynamic'

const CampusMap = dynamic(() => import('@/components/map/CampusMap').then((mod) => mod.CampusMap), { ssr: false })

export default function MapPage() {
  return <CampusMap />
}
