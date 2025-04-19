"use client"

import PurchaseButton from "@/components/PurchaseButton"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { AuthService } from "@/services/AuthService"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { purchaseDataSchema } from "@/schemas/PurchaseSchema"
import { UserData } from "@/types/UserTypes"
import { useRouter } from "next/navigation"

export default function Shipping() {
    const [addressPresent, setAddressPresent] = useState<boolean>(false)
    const [userId, setUserId] = useState<string | undefined>(undefined)
    const [userData, setUserData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        userAddress: {
            userId: "",
            street: "",
            apt: "",
            unit: "",
            phone: "",
            zipCode: "",
            city: ""
        }
    })
    const [error, setError] = useState<boolean>(false)

    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            userId, 
            street: "",
            apt: "",
            unit: "",
            phone: "",
            zipCode: "",
            city: ""
        },
        validationSchema: purchaseDataSchema,
        onSubmit: async (values) => {
            const token = await AuthService.getJwt()
            if(!token) {
                return
            }

            const res = await axios.post(
                "/api/user/add-user-address",
                {data: values, isTemporary: true},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            router.push("/cart/shipping/payment")
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const token = await AuthService.getJwt()
            if(!token) {
                return
            }

            const result = await axios.get(
                "/api/user/get-user-data",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            return result
        },
        onSuccess: (data) => {
            setError(false)

            if(data?.data.userData) {
                setUserData(data.data.userData)
                if(data?.data.userData.userAddress && !data?.data.userData.userAddress.isTemporary) {
                    setAddressPresent(true)
                }
            }
        },
        onError: (error) => {
            //unlikely to happen
            setError(true)
        }
    })

    useEffect(() => {
        const getUserId = async () => {
          const id = await AuthService.retrievePayload("userId")
          setUserId(id)
  
          if(id) {
            formik.setFieldValue('userId', id)
          }
        }
  
        mutate()
        getUserId()
    }, [])

    return (
        <div className="flex flex-col">
            <main className="flex flex-col mt-24">
                <div className="w-1/4 min-w-[250px] mb-8 flex flex-col self-center">
                    {addressPresent &&
                    <>
                        <PurchaseButton
                        text="Use saved address"
                        className="bg-purchaseButton w-full"
                        onClick={() => router.push("/cart/shipping/payment")}
                        />
                        <div className="flex flex-row justify-between items-center w-full mt-2 min-w-[250px]">
                            <div className="border border-t-black w-full"></div>
                            <h1 className="text-lg mx-2">OR</h1>
                            <div className="border border-t-black w-full"></div>
                        </div>
                    </>
                    }
                    <h1 className="text-header text-2xl sml:text-4xl flex self-center text-center">
                        Use a new address
                    </h1>
                </div>
                <form className="bg-formBg p-4 brightness-95 flex flex-col flex-start w-1/4 min-w-[250px] -mt-4 space-y-6 mb-8 self-center"
                onSubmit={formik.handleSubmit}>
                    <div className="flex flex-row space-x-4">
                        <div className="flex flex-col w-full">
                            <label className="text-base -mb-[2px]">
                                First Name
                            </label>
                            <div className="py-1 px-2 rounded-lg border border-zinc-700">
                                {userData.firstName}
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-base -mb-[2px]">
                                Last Name
                            </label>
                            <div className="py-1 px-2 rounded-lg border border-zinc-700">
                                {userData.lastName}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-base -mb-[2px]">
                            Email
                        </label>
                        <div className="py-1 px-2 rounded-lg border border-zinc-700">
                            {userData.email}
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-lg">
                            Street
                        </label>
                        <input
                        {...formik.getFieldProps('street')}
                        className={`h-10 rounded-lg px-2 outline-none
                            ${formik.touched.street && formik.errors.street ? "border border-red-500" : undefined}
                        `}
                        placeholder="..."
                        />
                        {formik.touched.street && formik.errors.street && (
                            <span className="text-red-500 text-sm mt-1">
                                {formik.errors.street}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col xbig:flex-row w-full xbig:space-x-4">
                        <div className="flex flex-col w-full">
                            <label className="text-lg">
                                Apt.
                            </label>
                            <input
                            {...formik.getFieldProps('apt')}
                            className={`h-10 rounded-lg px-2 outline-none
                                ${formik.touched.apt && formik.errors.apt ? "border border-red-500" : undefined}
                            `}
                            placeholder="..."
                            />
                            {formik.touched.apt && formik.errors.apt && (
                                <span className="text-red-500 text-sm mt-1">
                                    {formik.errors.apt}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-lg">
                                Unit.
                            </label>
                            <input
                            {...formik.getFieldProps('unit')}
                            className={`h-10 rounded-lg px-2 outline-none
                                ${formik.touched.unit && formik.errors.unit ? "border border-red-500" : undefined}
                            `}
                            placeholder="..."
                            />
                            {formik.touched.unit && formik.errors.unit && (
                                <span className="text-red-500 text-sm mt-1">
                                    {formik.errors.unit}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-lg">
                            Phone Number
                        </label>
                        <input
                        {...formik.getFieldProps('phone')}
                        className={`h-10 rounded-lg px-2 outline-none
                            ${formik.touched.phone && formik.errors.phone ? "border border-red-500" : undefined}
                        `}
                        placeholder="..."
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <span className="text-red-500 text-sm mt-1">
                                {formik.errors.phone}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col xbig:flex-row w-full xbig:space-x-4">
                        <div className="flex flex-col w-full">
                            <label className="text-lg">
                                ZIP Code
                            </label>
                            <input
                            {...formik.getFieldProps('zipCode')}
                            className={`h-10 rounded-lg px-2 outline-none
                                ${formik.touched.zipCode && formik.errors.zipCode ? "border border-red-500" : undefined}
                            `}
                            placeholder="..."
                            />
                            {formik.touched.zipCode && formik.errors.zipCode && (
                                <span className="text-red-500 text-sm mt-1">
                                    {formik.errors.zipCode}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-lg">
                                City
                            </label>
                            <input
                            {...formik.getFieldProps('city')}
                            className={`h-10 rounded-lg px-2 outline-none
                                ${formik.touched.city && formik.errors.city ? "border border-red-500" : undefined}
                            `}
                            placeholder="..."
                            />
                            {formik.touched.city && formik.errors.city && (
                                <span className="text-red-500 text-sm mt-1">
                                    {formik.errors.city}
                                </span>
                            )}
                        </div>
                    </div>
                    {error &&
                        <p className="flex self-center my-[10px] text-red-500">
                            Something went wrong.
                        </p>
                    }
                    <PurchaseButton
                    text="Continue"
                    className="bg-purchaseButton flex self-center"
                    />
                </form>
            </main>
        </div>
    )
}