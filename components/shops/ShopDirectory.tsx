'use client'

import { useMemo, useState } from 'react'
import type { Shop } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { ShopCard } from '@/components/shops/ShopCard'

export function ShopDirectory({ shops }: { shops: Shop[] }) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => shops.filter((shop) => `${shop.name} ${shop.category} ${shop.location_note}`.toLowerCase().includes(query.toLowerCase())), [query, shops])

  return (
    <div className="flex flex-col gap-5">
      <Input placeholder="Search food, printing, ATM..." value={query} onChange={(event) => setQuery(event.target.value)} />
      <div className="grid gap-4 lg:grid-cols-3">
        {filtered.map((shop) => <ShopCard key={shop.id} shop={shop} />)}
      </div>
    </div>
  )
}
