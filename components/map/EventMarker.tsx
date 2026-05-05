export function EventMarker() {
  return (
    <span className="relative flex size-4">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-400 opacity-75" />
      <span className="relative inline-flex size-4 rounded-full border-2 border-white bg-rose-600 shadow" />
    </span>
  )
}
