"use client"

import { useEffect, useState } from "react"
import { AuthService } from "@/services/AuthService"

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await AuthService.getJwt()
                setIsAuthenticated(!!token)
            } catch(error) {
                setIsAuthenticated(false)
            } finally {
                setLoading(false)
            }
        }
        checkAuth()

        window.addEventListener('cookieChange', checkAuth)

        return () => window.removeEventListener('cookieChange', checkAuth)
    }, [])

    return {isAuthenticated, loading}
}

export default useAuth