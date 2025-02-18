import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/']
const PROTECTED_ROUTES = ['/dashboard', '/quests', '/profile', '/marketplace']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const isPublicRoute = PUBLIC_ROUTES.includes(req.nextUrl.pathname)
  const isProtectedRoute = PROTECTED_ROUTES.some(route => req.nextUrl.pathname.startsWith(route))

  // Sadece korumalı rotalar için kontrol yapıyoruz
  if (isProtectedRoute) {
    // Burada web3 cüzdan kontrolü yapılabilir
    // Şimdilik basit bir kontrol yapıyoruz
    const hasWallet = req.cookies.has('wallet_connected')
    
    if (!hasWallet) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 