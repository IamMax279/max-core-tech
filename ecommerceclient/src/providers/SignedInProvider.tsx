"use client"

import useAuth from "@/hooks/useAuth";
import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SignedInProvider({children}: {children: ReactNode}) {
    const { isAuthenticated, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if(!loading && isAuthenticated && (pathname === '/sign-in' || pathname === '/sign-up')) {
            router.replace('/')
        }
    }, [pathname, loading, isAuthenticated])

    if (loading || (isAuthenticated && (pathname === '/sign-in' || pathname === '/sign-up'))) {
        return null
    }

    return <>{children}</>
}