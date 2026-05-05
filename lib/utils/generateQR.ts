import QRCode from 'qrcode'

export async function generateQRCodeDataUrl(ticketCode: string) {
  return QRCode.toDataURL(ticketCode, {
    margin: 1,
    width: 220,
    color: {
      dark: '#042C53',
      light: '#FFFFFF',
    },
  })
}
