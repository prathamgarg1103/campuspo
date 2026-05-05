import { MapPin, Phone } from 'lucide-react'
import type { Shop } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ShopCard({ shop }: { shop: Shop }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{shop.name}</CardTitle>
            <p className="mt-1 text-sm text-slate-500">{shop.description}</p>
          </div>
          <Badge variant={shop.is_open ? 'success' : 'secondary'}>{shop.is_open ? 'Open' : 'Closed'}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm text-slate-600">
        <Badge variant="outline" className="w-fit capitalize">{shop.category}</Badge>
        <span className="flex items-center gap-2"><MapPin className="size-4" /> {shop.location_note}</span>
        {shop.phone ? <span className="flex items-center gap-2"><Phone className="size-4" /> {shop.phone}</span> : null}
      </CardContent>
    </Card>
  )
}
