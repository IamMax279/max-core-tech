"use client"

import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useFormik } from "formik"
import { passwordChangeSchema } from "@/schemas/ChangePasswordSchema"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { AuthService } from "@/services/AuthService"
import PurchaseButton from "@/components/PurchaseButton"
import { useRouter } from "next/navigation"
import {  
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure}
from "@heroui/modal";
import { Button } from "@nextui-org/button"

export default function NewPassword() {
    const [securePassword, setSecurePassword] = useState<boolean>(false)
    const [secureConfirm, setSecureConfirm] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validationSchema: passwordChangeSchema,
        onSubmit: (values) => {
            const {password, confirmPassword} = values
            mutate(password)
        }
    })

    const {mutate, isPending} = useMutation({
        mutationFn: async (password: string) => {
            const token = await AuthService.getJwt()
            if(!token) {
                return
            }

            return await axios.patch(
                process.env.NEXT_PUBLIC_API_URL + "/user/change-password",
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
                setError(false)
                onOpen()
            }
        },
        onError: (error) => {
            console.log("error changing password:", error)
            setError(true)
        }
    })

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mt-28 text-header text-2xl sml:text-4xl">
                Set up a new password
            </h1>
            <form className="flex flex-col w-1/4 min-w-[250px] bg-formBg p-4 brightness-95 sml:mt-8 mt-4 mb-14"
            onSubmit={formik.handleSubmit}>
                <div className="flex flex-col relative">
                    <label className="text-lg mb-1">
                        New password
                    </label>
                    <input
                    {...formik.getFieldProps('password')}
                    className={`h-10 rounded-lg px-2 outline-none
                    ${formik.touched.password && formik.errors.password ? "border border-red-500" : undefined}
                    `}
                    placeholder="..."
                    type={securePassword ? "password" : "text"}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <span className="text-red-500 text-sm mt-1">
                            {formik.errors.password}
                        </span>
                    )}
                    {securePassword ?
                    <FaRegEye
                    size={20}
                    className="absolute right-[6px] top-[42px] cursor-pointer"
                    onClick={() => setSecurePassword(false)}/>
                    :
                    <FaRegEyeSlash
                    size={20}
                    className="absolute right-[6px] top-[42px] cursor-pointer"
                    onClick={() => setSecurePassword(true)}/>
                    }
                </div>
                <div className="flex flex-col mt-6 relative">
                    <label className="text-lg mb-1">
                        Confirm password
                    </label>
                    <input
                    {...formik.getFieldProps('confirmPassword')}
                    className={`h-10 rounded-lg px-2 outline-none
                    ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border border-red-500" : undefined}
                    `}
                    placeholder="..."
                    type={secureConfirm ? "password" : "text"}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <span className="text-red-500 text-sm mt-1">
                            {formik.errors.confirmPassword}
                        </span>
                    )}
                    {secureConfirm ?
                    <FaRegEye
                    size={20}
                    className="absolute right-[6px] top-[42px] cursor-pointer"
                    onClick={() => setSecureConfirm(false)}/>
                    :
                    <FaRegEyeSlash
                    size={20}
                    className="absolute right-[6px] top-[42px] cursor-pointer"
                    onClick={() => setSecureConfirm(true)}/>
                    }
                </div>
                {error &&
                    <p className="flex self-center mt-3 text-red-500">
                        Something went wrong. Refresh the website or try again later.
                    </p>
                }
                <PurchaseButton
                text="Save"
                className="bg-purchaseButton mt-4 flex self-center"
                />
            </form>
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
                            Password changed successfully.
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