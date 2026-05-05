'use client'

import { useState, useMemo } from 'react'
import { Search, Clock, MapPin, Phone, Store } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  CAMPUS_SHOPS,
  SEGMENT_INFO,
  SEGMENT_COLORS,
  SHOP_CATEGORY_COLORS,
  type ShopSegment,
  type CampusShop,
} from '@/lib/data/shops'

const segments: ShopSegment[] = ['cos', 'gblock', 'hblock']

function ShopCard({ shop }: { shop: CampusShop }) {
  return (
    <Card className="transition hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-sm">{shop.name}</CardTitle>
          <Badge variant={shop.is_open ? 'success' : 'secondary'}>
            {shop.is_open ? 'Open' : 'Closed'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">
        <p className="text-sm text-slate-500">{shop.description}</p>
        <Badge className={`w-fit capitalize ${SHOP_CATEGORY_COLORS[shop.category]}`}>
          {shop.category}
        </Badge>
        {shop.opening_time && (
          <span className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="size-3" /> {shop.opening_time} – {shop.closing_time}
          </span>
        )}
        {shop.phone && (
          <a href={`tel:${shop.phone}`} className="flex items-center gap-2 text-xs text-slate-400 hover:text-brand-600">
            <Phone className="size-3" /> {shop.phone}
          </a>
        )}
      </CardContent>
    </Card>
  )
}

function SegmentSection({ segment, shops }: { segment: ShopSegment; shops: CampusShop[] }) {
  const info = SEGMENT_INFO[segment]
  const gradient = SEGMENT_COLORS[segment]

  return (
    <section>
      {/* Segment header */}
      <div className={`mb-4 rounded-xl bg-gradient-to-r ${gradient} p-4 text-white shadow-sm`}>
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-white/20">
            <Store className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-semibold">{info.label}</h3>
            <p className="text-xs text-white/70">{info.description}</p>
          </div>
          <span className="ml-auto rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
            {shops.length} shops
          </span>
        </div>
      </div>

      {/* Shop cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </section>
  )
}

export default function ShopsPage() {
  const [search, setSearch] = useState('')
  const [activeSegment, setActiveSegment] = useState<ShopSegment | 'all'>('all')

  const filtered = useMemo(() => {
    let list = CAMPUS_SHOPS
    if (activeSegment !== 'all') list = list.filter((s) => s.segment === activeSegment)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      )
    }
    return list
  }, [activeSegment, search])

  // Group by segment for display
  const grouped = useMemo(() => {
    const map: Record<ShopSegment, CampusShop[]> = { cos: [], gblock: [], hblock: [] }
    filtered.forEach((s) => map[s.segment].push(s))
    return map
  }, [filtered])

  const segmentCounts = useMemo(() => {
    const counts: Record<string, number> = { all: CAMPUS_SHOPS.length }
    segments.forEach((seg) => (counts[seg] = CAMPUS_SHOPS.filter((s) => s.segment === seg).length))
    return counts
  }, [])

  return (
    <div className="space-y-6 p-4 pb-24 md:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-950">Campus Shops</h2>
        <p className="mt-1 text-sm text-slate-500">
          {CAMPUS_SHOPS.length} shops across 3 areas — COS, G-Block & H-Block
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          className="pl-9"
          placeholder="Search food, printing, ATM, salon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Segment tabs */}
      <div className="flex flex-wrap gap-2">
        {(['all', ...segments] as const).map((seg) => {
          const isActive = activeSegment === seg
          const label = seg === 'all' ? 'All Areas' : SEGMENT_INFO[seg].label.split(' ')[0]
          const count = segmentCounts[seg]
          return (
            <button
              key={seg}
              onClick={() => setActiveSegment(seg)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
              }`}
            >
              {label}
              <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                ({count})
              </span>
            </button>
          )
        })}
      </div>

      {/* Segment sections */}
      <div className="space-y-8">
        {segments.map((seg) => {
          const shops = grouped[seg]
          if (shops.length === 0) return null
          return <SegmentSection key={seg} segment={seg} shops={shops} />
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 py-16 text-center">
          <p className="text-sm text-slate-400">No shops match your search.</p>
        </div>
      )}
    </div>
  )
}
