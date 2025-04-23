"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearCart } from "@/redux/Slices"
import { useRouter } from "next/navigation"
import {  
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter}
from "@heroui/modal";
import { Button } from "@nextui-org/button";
import { useMutation } from "@tanstack/react-query"
import { AuthService } from "@/services/AuthService"
import axios from "axios"
import { RootState } from "@/redux/Store"
import Loading from "@/components/Loading"

export default function PaymentSuccessful() {
    const [addressId, setAddressId] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const dispatch = useDispatch()

    const cartItems = useSelector((state: RootState) => state.cartReducer.items)

    const router = useRouter()

    const { mutate: getAddress, isPending: fetchingData } = useMutation({
        mutationFn: async (token: string) => {
            if(!token) {
                throw new Error("token not provided")
            }

            const res = await axios.get(
                "/api/user/get-user-data",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            if(res && res.data) {
                setAddressId(res.data.userData.addressId)
                return res.data.addressId
            } else {
                return res.data
            }
        },
        onSuccess: (data) => {
            setError(false)
        },
        onError: (error) => {
            setError(true)
        }
    })

    const { mutate: placeOrder, isPending } = useMutation({
        mutationFn: async () => {
            const token = await AuthService.getJwt()
            if(!token) {
                throw new Error("No token provided.")
            }

            const userId = await AuthService.retrievePayload("userId")

            const res = await axios.post(
                "/api/orders/add-order",
                {
                    userId,
                    addressId,
                    items: cartItems,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            return res
        },
        onSuccess: (data) => {
            dispatch(clearCart())
        },
        onError: (error) => {
            setError(true)
        }
    })

    useEffect(() => {
        const init = async () => {
            const token = await AuthService.getJwt()
            if(token) {
                getAddress(token)
            }
        }

        init()
    }, [])

    useEffect(() => {
        if(addressId) {
            placeOrder()
        }
    }, [addressId])

    if(fetchingData || isPending) {
        return <Loading/>
    }

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
                    <p className='text-center'>
                       Thank you for choosing MaxCoreTech!
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
    )
}