"use client"

import Image from "next/image"
import Logo from "../../../public/logo-no-bg.svg"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import PurchaseButton from "@/components/PurchaseButton";
import { useFormik } from "formik";
import { signupSchema } from "@/schemas/SignupSchema";
import { useMutation } from "@tanstack/react-query";
import { SignupValues } from "@/types/AuthTypes";
import axios, { AxiosError } from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsSigningUp } from "@/redux/Slices";
import useAuth from "@/hooks/useAuth";
import SignedInProvider from "@/providers/SignedInProvider";
import { GoArrowLeft } from "react-icons/go";

export default function SignUp() {
    const [securePassword, setSecurePassword] = useState<boolean>(false)
    const [secureConfirmation, setSecureConfirmation] = useState<boolean>(false)
    const [uniqueError, setUniqueError] = useState<boolean>(false)

    const { isAuthenticated, loading } = useAuth()

    const dispatch = useDispatch()

    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: SignupValues) => {
            dispatch(setIsSigningUp(true))
            return await axios.post(
                process.env.NEXT_PUBLIC_API_URL + "/user/register",
                values
            )
        },
        onSuccess: (data) => {
            console.log(data)
            router.push('/signed-up')
        },
        onError: (error) => {
            setUniqueError(false)
            dispatch(setIsSigningUp(false))

            console.log("Error signing up:", error)
            if(error instanceof AxiosError) {
                if(error.response?.data.message.includes("Unique constraint")) {
                    setUniqueError(true)
                }
            }
        }
    })

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: signupSchema,
        onSubmit: (values) => {
            const {confirmPassword, ...data} = values
            mutate(data)
        }
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
                    Go Back
                </p>
            </Link>
            <GoArrowLeft
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
                    Sign Up
                </h2>
                <div className="flex flex-col flex-start w-full mt-4 space-y-6">
                    <div className="flex flex-col w-full">
                        <label className="text-lg">
                            First Name
                        </label>
                        <input
                        {...formik.getFieldProps('firstName')}
                        className={`h-10 rounded-lg px-2 outline-none
                            ${formik.touched.firstName && formik.errors.firstName ? "border border-red-500" : undefined}
                        `}
                        placeholder="..."
                        />
                        {formik.touched.firstName && formik.errors.firstName && (
                            <span className="text-red-500 text-sm mt-1">
                                {formik.errors.firstName}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-lg">
                            Last Name
                        </label>
                        <input
                        {...formik.getFieldProps('lastName')}
                        className={`h-10 rounded-lg px-2 outline-none
                            ${formik.touched.lastName && formik.errors.lastName ? "border border-red-500" : undefined}
                        `}
                        placeholder="..."
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                            <span className="text-red-500 text-sm mt-1">
                                {formik.errors.lastName}
                            </span>
                        )}
                    </div>
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
                    <div className="flex flex-col w-full relative">
                    <label className="text-lg">
                            Confirm Password
                        </label>
                        <input
                        {...formik.getFieldProps('confirmPassword')}
                        className={`h-10 rounded-lg px-2 outline-none
                            ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border border-red-500" : undefined}
                        `}
                        placeholder="..."
                        type={secureConfirmation ? "password" : undefined}
                        />
                        {secureConfirmation ?
                        <FaRegEye
                        size={20}
                        className="absolute right-2 top-[38px] cursor-pointer"
                        onClick={() => setSecureConfirmation(false)}/>
                        :
                        <FaRegEyeSlash
                        size={20}
                        className="absolute right-2 top-[38px] cursor-pointer"
                        onClick={() => setSecureConfirmation(true)}/>
                        }
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <span className="text-red-500 text-sm mt-1">
                                {formik.errors.confirmPassword}
                            </span>
                        )}
                    </div>
                </div>
                {uniqueError &&
                <p className="flex self-center text-center mt-3 text-red-500">
                    A user with this email already exists.
                </p>
                }
                <div className={`text-lg ${uniqueError ? "mt-3" : "mt-4"}`}>
                    <p className="lg:text-start text-center">
                        Already have an account?
                        <span className="text-purchaseButton cursor-pointer text-lg hover:brightness-90">
                        {' '} <Link href={'/sign-in'}>
                            Sign in
                            </Link>
                        </span>
                    </p>
                </div>
                <PurchaseButton
                loading={isPending}
                text="Register"
                color="bg-purchaseButton"
                className="mt-4"
                />
            </form>
        </div>
    )
}