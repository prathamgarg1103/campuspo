'use client'

import 'leaflet/dist/leaflet.css'

import { useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Search } from 'lucide-react'
import {
  CAMPUS_BUILDINGS,
  CAMPUS_CENTER,
  CAMPUS_ZOOM,
  getCampusCategoryColor,
  type BuildingPin,
} from '@/lib/mapbox/campusGeoJSON'
import { BuildingPopup } from '@/components/map/BuildingPopup'
import { MapFilters, type MapFilter } from '@/components/map/MapFilters'
import { Input } from '@/components/ui/input'

const campusBounds: L.LatLngBoundsExpression = [
  [30.3538, 76.3576],
  [30.3602, 76.3662],
]

function pinIcon(building: BuildingPin, selected: boolean) {
  const color = getCampusCategoryColor(building.category)
  const label = building.short_name.replace(/&/g, '&amp;')

  return L.divIcon({
    className: '',
    html: `
      <span style="display:flex;align-items:center;gap:6px;white-space:nowrap;">
        <span style="
          display:grid;
          place-items:center;
          width:${selected ? 34 : 26}px;
          height:${selected ? 34 : 26}px;
          flex:0 0 auto;
          border-radius:999px;
          background:${color};
          border:3px solid white;
          box-shadow:0 10px 24px rgba(15,23,42,.22);
        ">
          <span style="width:7px;height:7px;border-radius:999px;background:white;display:block"></span>
        </span>
        ${
          selected
            ? `<span style="
                display:block;
                max-width:150px;
                overflow:hidden;
                text-overflow:ellipsis;
                border:1px solid rgba(15,23,42,.12);
                border-radius:999px;
                background:rgba(255,255,255,.96);
                color:#0f172a;
                box-shadow:0 8px 20px rgba(15,23,42,.12);
                padding:6px 9px;
                font-size:12px;
                font-weight:800;
                line-height:1;
              ">${label}</span>`
            : ''
        }
      </span>
    `,
    iconSize: selected ? [190, 40] : [26, 26],
    iconAnchor: selected ? [17, 34] : [13, 26],
    popupAnchor: [0, -30],
  })
}

function FlyToLocation({ building }: { building: BuildingPin | null }) {
  const map = useMap()

  useEffect(() => {
    if (building) {
      map.flyTo([building.coordinates[1], building.coordinates[0]], 18, { duration: 0.8 })
    }
  }, [building, map])

  return null
}

export function LeafletCampusMap() {
  const [filter, setFilter] = useState<MapFilter>('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<BuildingPin | null>(null)

  const visibleBuildings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return CAMPUS_BUILDINGS.filter((building) => {
      const matchesFilter = filter === 'All' || building.category === filter
      const matchesQuery =
        !normalizedQuery ||
        `${building.name} ${building.short_name} ${building.category} ${building.description ?? ''}`.toLowerCase().includes(normalizedQuery)

      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  return (
    <div className="grid min-h-screen bg-slate-950 lg:grid-cols-[340px_1fr]">
      <aside className="z-20 flex max-h-[46vh] flex-col border-b border-slate-200 bg-white lg:max-h-screen lg:border-b-0 lg:border-r">
        <div className="border-b border-slate-100 p-4">
          <h1 className="text-xl font-semibold text-slate-950">Thapar Campus Map</h1>
          <p className="mt-1 text-sm text-slate-500">{visibleBuildings.length} Loc8TIET locations</p>
          <label className="relative mt-4 block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search location" className="pl-9" />
          </label>
          <div className="mt-4">
            <MapFilters value={filter} onChange={setFilter} />
          </div>
        </div>
        <div className="flex-1 overflow-auto p-3">
          {visibleBuildings.map((building) => (
            <button
              key={building.id}
              onClick={() => setSelected(building)}
              className="mb-2 w-full rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition hover:border-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <span className="flex items-start gap-3">
                <span
                  className="mt-1 grid size-7 shrink-0 place-items-center rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: getCampusCategoryColor(building.category) }}
                >
                  <span className="size-1.5 rounded-full bg-white" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-950">{building.name}</span>
                  <span className="mt-1 block text-xs text-slate-500">{building.category}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </aside>
      <main className="relative min-h-[54vh] lg:min-h-screen">
        <MapContainer
          center={[CAMPUS_CENTER[1], CAMPUS_CENTER[0]]}
          zoom={CAMPUS_ZOOM}
          minZoom={16}
          maxZoom={19}
          maxBounds={campusBounds}
          maxBoundsViscosity={0.8}
          scrollWheelZoom
          className="h-[54vh] w-full lg:h-screen"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyToLocation building={selected} />
          {visibleBuildings.map((building) => (
            <Marker
              key={building.id}
              position={[building.coordinates[1], building.coordinates[0]]}
              icon={pinIcon(building, selected?.id === building.id)}
              draggable={true}
              eventHandlers={{
                click: () => setSelected(building),
                dragend: (e) => {
                  const marker = e.target
                  const position = marker.getLatLng()
                  console.log(`Updated ${building.name} (${building.id}) to: [${position.lng.toFixed(5)}, ${position.lat.toFixed(5)}]`)
                }
              }}
            >
              <Popup>
                <BuildingPopup building={building} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </main>
    </div>
  )
}
