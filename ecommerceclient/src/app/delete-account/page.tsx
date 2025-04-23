"use client"

import PurchaseButton from "@/components/PurchaseButton";
import { AuthService } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {  
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter }
from "@heroui/modal";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/Slices";

export default function DeleteAccount() {
    const [password, setPassword] = useState<string>("")
    const [securePassword, setSecurePassword] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const router = useRouter()

    const dispatch = useDispatch()

    const { mutate: deleteAccount, isPending } = useMutation({
        mutationFn: async () => {
            const token = await AuthService.getJwt()
            if(!token) {
                return
            }

            const response = await axios.post(
                "/api/user/delete-account",
                {password},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            return response
        },
        onSuccess: (data) => {
            setError(false)
            setIncorrectPassword(false)

            if(data?.data.result.success && data.data.result.message === "User deleted successfully") {
                AuthService.logout()
                dispatch(clearCart())
                setSuccess(true)
            }
        },
        onError: (error) => {
            if(error instanceof AxiosError) {
                if(!error.response?.data.result.success && error.response?.data.result.message === 'Incorrect password.') {
                    setIncorrectPassword(true)
                } else {
                    setError(true)
                }
            }
        }
    })
    
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="mt-28 text-header text-2xl sml:text-4xl">
                Delete account
            </h1>
            <main className="w-1/4 min-w-[250px] bg-formBg p-4 brightness-95 sml:mt-8 mt-4 mb-14">
                <div className="flex flex-col space-y-4">
                    <label className="text-lg mb-1">
                        Password
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
                    <div className="-mb-3 -mt-[16px] flex flex-col justify-center items-center">
                        {incorrectPassword &&
                        <p className="flex self-center mt-3 text-red-500">
                            Incorrect password.
                        </p>
                        }
                        {error &&
                        <p className="flex self-center mt-3 text-red-500">
                            Something went wrong.
                        </p>
                        }
                    </div>
                    <PurchaseButton
                    loading={isPending}
                    text="Continue"
                    className={`bg-purchaseButton flex self-center`}
                    onClick={() => deleteAccount()}
                    />
                </div>
            </main>
            <Modal
            isOpen={success}
            isDismissable={false}
            hideCloseButton={true}
            >
                <ModalContent className='bg-white pt-4 pb-2'>
                {(onClose) => (
                    <>
                    <ModalBody>
                        <p className='text-center'>
                        Your account has been deleted.
                        </p>
                    </ModalBody>
                    <ModalFooter className='flex flex-row justify-center items-center gap-4'>
                        <Button className='bg-purchaseButton font-semibold text-white
                        hover:brightness-110 transition ease-in-out duration-200
                        px-8'
                        onPress={() => {
                            router.replace('/sign-in')
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