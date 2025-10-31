import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const RotasPrivadas = ['/musicas', '/perfil']
const RotasAdmin = ['/dashboard', '/dashboard/*']

interface TokenPayload {
  role?: string
  roles?: string[]
  exp?: number
  [key: string]: any
}

function pegarToken(token: string | undefined): string | null {
  if (!token) return null

  try {
    const base64Payload = token.split('.')[1]
    const jsonPayload = Buffer.from(base64Payload, 'base64').toString()
    const payload: TokenPayload = JSON.parse(jsonPayload)

    return Array.isArray(payload.roles)
      ? payload.roles[0]
      : payload.role || null
  } catch {
    return null
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const token = req.cookies.get('token')?.value
  const role = pegarToken(token)

  if (!role && RotasPrivadas.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (role && (pathname.startsWith('/login') || pathname.startsWith('/cadastro'))) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (role !== 'ROLE_ADMIN' && RotasAdmin.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo.svg|api|.*\\.css$|.*\\.js$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.woff2?$).*)',
  ],
}
