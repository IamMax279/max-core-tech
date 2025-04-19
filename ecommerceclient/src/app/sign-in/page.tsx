"use client"

import PurchaseButton from "@/components/PurchaseButton";
import Image from "next/image";
import Logo from "../../../public/logo-no-bg.svg"
import { useFormik } from "formik";
import { signinSchema } from "@/schemas/SigninSchema";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { SigninValues } from "@/types/AuthTypes";
import axios, { AxiosError } from "axios"
import {  
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    useDisclosure}
from "@heroui/modal";
import { Button } from "@nextui-org/button"
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/AuthService";
import SignedInProvider from "@/providers/SignedInProvider";
import useAuth from "@/hooks/useAuth";
import { IoHomeOutline } from "react-icons/io5";

export default function SignIn() {
    const [securePassword, setSecurePassword] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<boolean>(false)
    const [unverified, setUnverified] = useState<boolean>(false)

    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const { isAuthenticated, loading } = useAuth()

    const router = useRouter()

    const { mutate } = useMutation({
        mutationFn: async (values: SigninValues) => {
            return await axios.post(
                "/api/user/sign-in",
                values
            )
        },
        onSuccess: (data) => {
            setError(false)
            setEmailError(false)
            setUnverified(false)

            onOpen()

            AuthService.setJwt(data.data.jwt)
            AuthService.setRefresh(data.data.refresh)

            document.dispatchEvent(new CustomEvent('cookieChange'))
        },
        onError: (error) => {
            setError(false)
            setEmailError(false)
            setUnverified(false)
            if(error instanceof AxiosError) {
                switch(error.response?.data.message) {
                    case "This user does not exist.":
                        setEmailError(true)
                        break
                    case "user not verified":
                        setUnverified(true)
                        break
                    default:
                        setError(true)
                        break
                }
            } else {
                setEmailError(true)
            }
        }
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: signinSchema,
        onSubmit: (values) => mutate(values)
    })

    if(isAuthenticated) {
        return <SignedInProvider><></></SignedInProvider>
    }

    return (
        <div className="flex flex-col my-10 items-center h-max relative">
                <Link href={'/'}>
                    <p
                    className="text-gray-700 hover:text-header 
                    before:absolute before:-bottom-1 before:left-0 
                    before:h-0.5 before:w-full before:bg-header 
                    before:origin-left before:scale-x-0 before:transition-transform before:duration-300 
                    hover:before:scale-x-100 cursor-pointer hidden xsmll:block absolute top-8 left-10">
                        Home
                    </p>
                </Link>
                <IoHomeOutline
                className="xsmll:hidden block absolute top-5 left-6"
                size={28}
                onClick={() => router.push('/')}
                />
            <Image
            src={Logo}
            alt="logo"
            width={250}
            height={59}
            className="mb-14 cursor-pointer xsmll:w-[250px] w-[175px] relative top-4 xsmll:top-2"
            onClick={() => router.push('/')}
            />
            <form className="w-1/3 min-w-[300px] bg-formBg pb-8 rounded-2xl flex flex-col items-center px-5 md:px-8"
            onSubmit={formik.handleSubmit}>
                <h2 className="mt-6 text-3xl font-semibold">
                    Sign In
                </h2>
                <div className="flex flex-col flex-start w-full mt-4 space-y-6">
                    <div className="flex flex-col w-full">
                        <label className="text-lg">
                            Email
                        </label>
                        <input
                        {...formik.getFieldProps('email')}
                        className={`h-10 rounded-lg px-2 outline-none
                            ${formik.touched.email && formik.errors.email ? "border border-red-500" : undefined}
                        `}
                        placeholder="..."
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className="text-red-500 text-sm mt-1">
                                {formik.errors.email}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col w-full relative">
                        <label className="text-lg">
                            Password
                        </label>
                        <input
                        {...formik.getFieldProps('password')}
                        className={`h-10 rounded-lg px-2 outline-none
                            ${formik.touched.password && formik.errors.password ? "border border-red-500" : undefined}
                        `}
                        placeholder="..."
                        type={securePassword ? "password" : undefined}
                        />
                        {securePassword ?
                        <FaRegEye
                        size={20}
                        className="absolute right-2 top-[38px] cursor-pointer"
                        onClick={() => setSecurePassword(false)}/>
                        :
                        <FaRegEyeSlash
                        size={20}
                        className="absolute right-2 top-[38px] cursor-pointer"
                        onClick={() => setSecurePassword(true)}/>
                        }
                        {formik.touched.password && formik.errors.password && (
                            <span className="text-red-500 text-sm mt-1">
                                {formik.errors.password}
                            </span>
                        )}
                    </div>
                </div>
                {error &&
                    <p className="flex self-center mt-3 text-red-500">
                        Incorrect password.
                    </p>
                }
                {emailError &&
                    <p className="flex self-center mt-3 text-red-500">
                        Wrong credentials.
                    </p>
                }
                {unverified &&
                <p className="flex self-center mt-3 text-red-500">
                    Email unverified.
                </p>
                }
                <div className={`${error || emailError ? "mt-2" : "mt-4"} text-lg`}>
                    <p className="lg:text-start text-center">
                        Don't have an account?
                        <span className="text-purchaseButton cursor-pointer text-lg hover:brightness-90">
                        {' '} <Link href={'/sign-up'}>
                            Sign up
                            </Link>
                        </span>
                    </p>
                </div>
                <PurchaseButton
                text="Sign in"
                color="bg-purchaseButton"
                className="mt-4"
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
                    {/* <ModalHeader className="flex flex-col gap-1 text-center text-gray-100">Deleting a Kanban</ModalHeader> */}
                    <ModalBody>
                        <p className='text-center '>
                            You've been successfully signed in.
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