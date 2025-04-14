import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { AuthService } from './services/AuthService'

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname

    console.log("Middleware executing. path:", request.nextUrl.pathname)
    const token = request.cookies.get('jwt')?.value || request.cookies.get('refresh')?.value

    const protectedRoutes = ['/account', '/cart', '/change-password']
    const isProtectedRoute = protectedRoutes.some(route => 
        request.nextUrl.pathname.startsWith(route)
    )

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (url.startsWith("/new-password")) {
        console.log("MIDDLEWARE EXECUTING")
        const token = request.nextUrl.searchParams.get('token')
        const authT = request.cookies.get('jwt')?.value || request.cookies.get('refresh')?.value
        || request.nextUrl.searchParams.get('authT')

        if(!token || !authT) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_MIDDLEWARE_URL + `/auth/verify-token?token=${token}`,
                {
                    headers: {
                        "Authorization": `Bearer ${authT}`
                    }
                }
            )
            const res = await response.json()

            // const isValid = await axios.get(
            //     process.env.NEXT_PUBLIC_API_URL + `/auth/verify-token?token=${token}`,
            //     {
            //         headers: {
            //             "Authorization": `Bearer ${authT}`
            //         }
            //     }
            // )
    
            if(res.message !== "Token verified successfully") {
                throw new Error("Invalid token")
            }

            return NextResponse.next()
        } catch(error) {
            console.error("Error validating token:", error)
            return NextResponse.redirect(new URL('/', request.url))
        }
    } 
    else {
        if(url.startsWith("/verify-email")) {
            try {
                const token = request.nextUrl.searchParams.get("token")
                if(!token) {
                    return NextResponse.redirect(new URL('/', request.url))
                }
    
                const res = await fetch(
                    process.env.NEXT_PUBLIC_MIDDLEWARE_URL + `/user/is-verified?token=${token}`
                )

                if (!res.ok) {
                    console.log("Error making a request in the middleware:", res)
                    throw new Error("Error verifying token")
                }
                
                const data = await res.json();
    
                if(data && data.success) {
                    return NextResponse.redirect(new URL('/', request.url))
                } else {
                    return NextResponse.next()
                }
            } catch(error) {
                console.error("Error in verify-email middleware:", error);
                return NextResponse.redirect(new URL('/', request.url))
            }
        } else {
            return NextResponse.next()
        }
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