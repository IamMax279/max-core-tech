import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";

export default function SignedUpProvider({children}: {children: ReactNode}) {
    const router = useRouter()
    const pathname = usePathname()
    const isSigningUp = useSelector((state: RootState) => state.signupReducer.isSigningUp)

    useEffect(() => {
        if(pathname === '/signed-up' && !isSigningUp) {
            router.replace('/sign-up')
        }
    }, [router, pathname])

    return <>{children}</>
}