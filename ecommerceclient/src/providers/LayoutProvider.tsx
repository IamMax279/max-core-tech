"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"

export default function LayoutProvider({ children }: {children: ReactNode}) {
    const pathname = usePathname()

    const except = [
        '/sign-up',
        '/sign-in',
        '/cart',
        '/cart/shipping/payment',
        '/payment-successful',
        '/verify-email'
    ]

    if(except.includes(pathname)) {
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <main className="flex-grow flex-col">
                {children}
            </main>
            <Footer/>
        </div>
    )
}