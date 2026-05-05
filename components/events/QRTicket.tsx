'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { generateQRCodeDataUrl } from '@/lib/utils/generateQR'

export function QRTicket({ ticketCode }: { ticketCode: string }) {
  const [src, setSrc] = useState<string>()

  useEffect(() => {
    generateQRCodeDataUrl(ticketCode).then(setSrc)
  }, [ticketCode])

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm">
      {src ? <Image src={src} alt={`QR ticket ${ticketCode}`} width={160} height={160} unoptimized className="mx-auto size-40" /> : <div className="mx-auto size-40 rounded-lg bg-slate-100" />}
      <p className="mt-3 text-sm font-semibold text-slate-950">{ticketCode}</p>
    </div>
  )
}
