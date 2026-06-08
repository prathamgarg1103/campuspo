import type { BuildingPin } from '@/lib/mapbox/campusGeoJSON'

export function BuildingPopup({ building }: { building: BuildingPin }) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${building.coordinates[1]},${building.coordinates[0]}`

  return (
    <div className="w-64 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{building.category}</p>
      <h3 className="mt-1 text-base font-semibold text-slate-950">{building.name}</h3>
      {building.description ? <p className="mt-2 text-sm leading-5 text-slate-600">{building.description}</p> : null}
      <p className="mt-3 text-xs text-slate-500">
        {building.coordinates[1].toFixed(4)}, {building.coordinates[0].toFixed(4)}
      </p>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        Get directions
      </a>
    </div>
  )
}
