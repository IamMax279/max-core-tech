"use client"
import { loadStripe } from "@stripe/stripe-js"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/Store"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { AuthService } from "@/services/AuthService"
import {  
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    useDisclosure}
from "@heroui/modal";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { STRIPE_PUBLIC_KEY } from "@/constants/constants"

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

export default function Payment() {
    const [error, setError] = useState<boolean>(false)

    const router = useRouter()

    const items = useSelector((state: RootState) => state.cartReducer.items)

    const { mutate: handleCheckout, isPending } = useMutation({
        mutationFn: async () => {
            const token = await AuthService.getJwt()
            if(!token) {
                throw new Error("No token provided.")
            }

            const stripe = await stripePromise

            const res = await axios.post(
                "/api/payments/purchase",
                {items: items},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            if(res && res.data.sessionId) {
                setError(false)
                stripe?.redirectToCheckout({ sessionId: res.data.sessionId })
            } else {
                throw new Error("No session id:", res.data)
            }
        },
        onError: (error) => {
            setError(true)
        }
    })

    return (
            <Modal
            isOpen={true}
            isDismissable={false}
            hideCloseButton={true}
            >
                <ModalContent className='bg-white pt-4 pb-2'>
                {(onClose) => (
                    <>
                    <ModalBody>
                        <p className='text-center '>
                           Proceed to payment?
                        </p>
                    </ModalBody>
                    <ModalFooter className='flex flex-row justify-center items-center gap-4'>
                        <Button className='bg-purchaseButton font-semibold text-white
                        hover:brightness-110 transition ease-in-out duration-200
                        px-8'
                        onPress={() => handleCheckout()}>
                        Yes
                        </Button>
                        <Button className='bg-purchaseButton font-semibold text-white
                        hover:brightness-110 transition ease-in-out duration-200
                        px-8'
                        onPress={() => router.replace('/')}>
                        No
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
    )
}