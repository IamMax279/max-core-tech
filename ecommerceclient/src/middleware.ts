import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname

    const token = request.cookies.get('jwt')?.value || request.cookies.get('refresh')?.value

    const protectedRoutes = ['/account', '/cart', '/change-password']
    const isProtectedRoute = protectedRoutes.some(route => 
        request.nextUrl.pathname.startsWith(route)
    )

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (url.startsWith("/new-password")) {
        const token = request.nextUrl.searchParams.get('token')
        const authT = request.cookies.get('jwt')?.value || request.cookies.get('refresh')?.value
        || request.nextUrl.searchParams.get('authT')

        if(!token || !authT) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        try {
            const response = await fetch(
                `${request.nextUrl.origin}/api/auth/verify-token?token=${token}`,
                {
                    headers: {
                        "Authorization": `Bearer ${authT}`
                    }
                }
            )
            const res = await response.json()
    
            if(res.message !== "Token verified successfully") {
                throw new Error("Invalid token")
            }

            return NextResponse.next()
        } catch(error) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    } else {
        // if(url.startsWith("/verify-email")) {
        //     try {
        //         const token = request.nextUrl.searchParams.get("token")
        //         if(!token) {
        //             return NextResponse.redirect(new URL('/', request.url))
        //         }
    
        //         const res = await fetch(
        //             `${request.nextUrl.origin}/api/user/is-verified?token=${token}`
        //         )

        //         if (!res.ok) {
        //             throw new Error("Error verifying token")
        //         }
                
        //         const data = await res.json();
    
        //         if(data && data.success) {
        //             return NextResponse.redirect(new URL('/', request.url))
        //         } else {
        //             return NextResponse.next()
        //         }
        //     } catch(error) {
        //         return NextResponse.redirect(new URL('/', request.url))
        //     }
        // } else {
        //     return NextResponse.next()
        // }
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        '/account/:path*',
        '/cart/:path*',
        '/change-password/:path*',
        '/new-password/:path*',
        '/verify-email/:path*'
    ]
}