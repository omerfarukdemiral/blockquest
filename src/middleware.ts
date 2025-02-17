import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isPublicRoute = PUBLIC_ROUTES.includes(req.nextUrl.pathname)

  // If not logged in and trying to access protected route, redirect to home
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // If logged in and trying to access public route, redirect to dashboard
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 