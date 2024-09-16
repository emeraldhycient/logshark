import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // Allow access to login and authentication-related routes without checking session
    if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) {
        return NextResponse.next()
    }

    // Fetch the session from the NextAuth session endpoint
    const sessionResponse = await fetch(`${req.nextUrl.origin}/api/auth/session`, {
        headers: {
            Cookie: req.headers.get('cookie') || ''
        }
    })

    const session = await sessionResponse.json()

    // If session is invalid or doesn't exist, redirect to login
    if (!session || session.error) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // Continue to the requested route if authenticated
    return NextResponse.next()
}

// Protect specific routes
export const config = {
    matcher: ['/dashboard/:path*', '/settings/:path*'], // Protect multiple routes
}
