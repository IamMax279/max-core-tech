"use client"

import SignedUpProvider from "@/providers/SignedUpProvider"
import { useDispatch, useSelector } from "react-redux"
import { setIsSigningUp } from "@/redux/Slices"
import { useEffect } from "react"
import { RootState } from "@/redux/Store"

export default function SignedUp() {
    const dispatch = useDispatch()
    const isSigningUp = useSelector((state: RootState) => state.signupReducer.isSigningUp)

    useEffect(() => {
        dispatch(setIsSigningUp(false))
    }, [dispatch])

    if (!isSigningUp) {
        <SignedUpProvider><></></SignedUpProvider>
    }

    return (
        <SignedUpProvider>
            <div className="flex flex-col h-screen justify-center items-center">
                <h1 className="text-2xl">
                    Signed up successfully!
                </h1>
                <p className="text-purchaseButton font-normal text-center">
                    Check your inbox for email verification link.
                </p>
            </div>
        </SignedUpProvider>
    )
}