import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)
  const pathname = request.nextUrl.pathname

  if (pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Auth enforcement becomes active after Supabase env vars are configured.
  // /admin/* routes are protected in the connected middleware/session path.
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
