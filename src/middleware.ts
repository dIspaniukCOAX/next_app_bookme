import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.AUTH_SECRET })

  const authRoutes = ['/auth/signin', '/auth/signup', '/auth/forgot-password']
  const isAuthRoute = authRoutes.some(route => request.nextUrl.pathname.startsWith(route))
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!session && !isAuthRoute && request.nextUrl.pathname !== '/auth/signup') {
    return NextResponse.redirect(new URL('/auth/signup', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}