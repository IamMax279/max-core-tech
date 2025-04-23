"use client"

import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ThreeDot } from "react-loading-indicators"
import {  
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter}
from "@heroui/modal";
import { Button } from "@nextui-org/button";

export default function VerifyEmail() {
    const [verifying, setVerifying] = useState<boolean>(true)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const router = useRouter()

    const verifyUser = async () => {
        try {
            setError(false)
            const res = await axios.get(
                `/api/user/verify-email?token=${token}`
            )
            console.log("RES:", res)
            if(res.data.success) {
                setSuccess(true)
            }
        } catch(error) {
            console.log("BLAD:", error)
            setError(true)
        } finally {
            setVerifying(false)
        }
    }

    useEffect(() => {
        verifyUser()
    }, [token])

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            {verifying ? 
            <div className="flex flex-col items-center justify-center space-y-5">
                <h1 className="text-header text-3xl sml:text-4xl flex self-center text-center">
                    Verifying
                </h1>
                <ThreeDot color="#000" size="small"/>
            </div>
            :
            success ? 
            <Modal
            isOpen={true}
            isDismissable={false}
            hideCloseButton={true}
            >
                <ModalContent className='bg-white pt-4 pb-2'>
                {(onClose) => (
                    <>
                    <ModalBody>
                        <p className='text-center'>
                        Email verified successfully!
                        </p>
                    </ModalBody>
                    <ModalFooter className='flex flex-row justify-center items-center gap-4'>
                        <Button className='bg-purchaseButton font-semibold text-white
                        hover:brightness-110 transition ease-in-out duration-200
                        px-8'
                        onPress={() => router.replace('/sign-in')}>
                        OK
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
            :
            <Modal
            isOpen={true}
            isDismissable={false}
            hideCloseButton={true}
            >
                <ModalContent className='bg-white pt-4 pb-2'>
                {(onClose) => (
                    <>
                    <ModalBody>
                        <p className='text-center'>
                           Something went wrong. Try again later.
                        </p>
                    </ModalBody>
                    <ModalFooter className='flex flex-row justify-center items-center gap-4'>
                        <Button className='bg-purchaseButton font-semibold text-white
                        hover:brightness-110 transition ease-in-out duration-200
                        px-8'
                        onPress={() => router.replace('/')}>
                        OK
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
            }
        </div>
    )
}