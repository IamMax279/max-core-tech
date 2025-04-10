"use client"

import PurchaseButton from "@/components/PurchaseButton"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { AuthService } from "@/services/AuthService"
import { useRouter } from "next/navigation"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import Loading from "@/components/Loading"
import {  
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure}
from "@heroui/modal";
import { Button } from "@nextui-org/button"

export default function ChangePassword() {
    const [password, setPassword] = useState<string>("")
    const [securePassword, setSecurePassword] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [forgotError, setForgotError] = useState<boolean>(false)

    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    const router = useRouter()

    const {mutate, isPending} = useMutation({
        mutationFn: async () => {
            const token = await AuthService.getJwt()
            if(!token) {
                return
            }

            return await axios.post(
                process.env.NEXT_PUBLIC_API_URL + "/user/verify-password",
                {password: password},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
        },
        onSuccess: (data) => {
            if(data?.data.result.success) {
                console.log("This is your party:", data.data)
                setError(false)
                router.push(`/new-password?token=${data.data.result.token}`)
            } else {
                setError(true)
                console.log("Wrong password.")
            }
        },
        onError: (error) => {
            if(error instanceof AxiosError) {
                console.log("error making a request:", error)
                if(error.response?.data.result.message === 'Incorrect password') {
                    setError(true)
                }
            }
        }
    })

    const {mutate: sendPasswordLink, isPending: isAwaiting} = useMutation({
        mutationFn: async () => {
            const token = await AuthService.getJwt()
            if(!token) {
                return
            }

            return await axios.get(
                'http://localhost:3001/auth/send-password-link',
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
        },
        onSuccess: (data) => {
            console.log(data)
            if(data?.data.success) {
                setForgotError(false)
                onOpen()
            } else {
                setForgotError(true)
            }
        },
        onError: (error) => {
            console.log("Error sending link:", error)
            setForgotError(true)
        }
    })

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mt-28 text-header text-2xl sml:text-4xl">
                Change password
            </h1>
            <main className="w-1/4 min-w-[250px] bg-formBg p-4 brightness-95 sml:mt-8 mt-4 mb-14">
                <div className="flex flex-col">
                    <label className="text-lg mb-1">
                        Current password
                    </label>
                    <input
                    className={`h-10 rounded-lg px-2 outline-none
                    `}
                    placeholder="..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={securePassword ? "password" : "text"}
                    />
                    {securePassword ?
                    <FaRegEye
                    size={20}
                    className="absolute right-5 top-[58px] cursor-pointer"
                    onClick={() => setSecurePassword(false)}/>
                    :
                    <FaRegEyeSlash
                    size={20}
                    className="absolute right-5 top-[58px] cursor-pointer"
                    onClick={() => setSecurePassword(true)}/>
                    }
                    {error &&
                    <p className="flex self-center mt-3 text-red-500">
                        Incorrect password.
                    </p>
                    }
                    {forgotError &&
                    <p className="flex self-center mt-3 text-red-500">
                        Something went wrong.
                    </p>
                    }
                    <PurchaseButton
                    text="Continue"
                    className={`bg-purchaseButton flex self-center ${error || forgotError ? "mt-3" : "mt-6"}`}
                    onClick={() => mutate()}
                    />
                    <p className="lg:text-start text-center flex self-center mt-4 flex-row items-center text-lg">
                        <span className="text-purchaseButton font-normal cursor-pointer text-lg hover:brightness-90 mr-[2px]"
                         onClick={() => sendPasswordLink()}>
                            Forgot password?
                        </span>
                    </p>
                </div>
            </main>
            <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            hideCloseButton={true}
            >
                <ModalContent className='bg-white pt-4 pb-2'>
                {(onClose) => (
                    <>
                    <ModalBody>
                        <p className='text-center '>
                            Password change link has been sent.
                        </p>
                    </ModalBody>
                    <ModalFooter className='flex flex-row justify-center items-center gap-2'>
                        <Button className='bg-purchaseButton font-semibold text-white
                        hover:brightness-110 transition ease-in-out duration-200
                        px-8'
                        onPress={() => {
                            router.push('/')
                        }}>
                        OK
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    )
}