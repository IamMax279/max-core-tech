"use client"

import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"
import { AuthService } from "@/services/AuthService"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { purchaseDataSchema } from "@/schemas/PurchaseSchema"
import { UserAddress, UserData } from "@/types/UserTypes"
import PurchaseButton from "@/components/PurchaseButton"
import { ToastContainer, toast } from "react-toastify"
import Link from "next/link"
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux"
import { clearCart } from "@/redux/Slices"
import {  
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter }
from "@heroui/modal";
import { Button } from "@nextui-org/button";

export default function Account() {
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
    const [userId, setUserId] = useState<string | undefined>(undefined)
    const [error, setError] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const router = useRouter()

    const dispatch = useDispatch()

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
        onSubmit: (values) => updateUserData(values)
    })

    const { mutate: getUserData, isPending } = useMutation({
        mutationFn: async () => {
            const token = await AuthService.getJwt()
            if(!token) {
                router.replace('/sign-in')
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
        onSuccess: (response) => {
            setError(false)
            setUserData(response?.data.userData)

            if(response?.data.userData.userAddress && !response?.data.userData.userAddress.isTemporary) {
                const address = response?.data.userData.userAddress
                formik.setValues({
                    ...formik.values,
                    userId: address.userId || "",
                    street: address.street || "",
                    apt: address.apt || "",
                    unit: address.unit || "",
                    phone: address.phone || "",
                    zipCode: address.zipCode || "",
                    city: address.city || ""
                })
            }
        },
        onError: (error) => {
            setError(true)
        }
    })

    const { mutate: updateUserData, isPending: isUpdating } = useMutation({
        mutationFn: async (data: UserAddress) => {
            const token = await AuthService.getJwt()
            if(!token) {
                router.replace('/sign-in')
                return
            }

            return await axios.post(
                "/api/user/add-user-address",
                {data, isTemporary: false},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
        },
        onSuccess: (data) => {
            notify()
        },
        onError: (error) => {
            setError(true)
        }
    })

    const notify = () => {
        toast.success("Successfully updated shipping info.", {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: 'colored',
            style: {backgroundColor: "#32a852"}
        });
    }

    useEffect(() => {
      const getUserId = async () => {
        const id = await AuthService.retrievePayload("userId")
        setUserId(id)

        if(id) {
          formik.setFieldValue('userId', id)
        }
      }

      getUserData()
      getUserId()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center">
            <ToastContainer
            limit={3}/>
            <Link href={'/'}>
                <p
                className="text-gray-700 hover:text-header 
                before:absolute before:-bottom-1 before:left-0 
                before:h-0.5 before:w-full before:bg-header 
                before:origin-left before:scale-x-0 before:transition-transform before:duration-300 
                hover:before:scale-x-100 cursor-pointer hidden xsmll:block absolute top-[115px] smll:right-20 right-10"
                onClick={() => {
                    AuthService.logout()
                    dispatch(clearCart())

                    window.location.reload()
                    router.replace('/sign-in')
                }}>
                    Log out
                </p>
            </Link>
            <IoIosLogOut
            className="xsmll:hidden block absolute top-[115px] right-6"
            size={28}
            onClick={() => router.push('/')}
            />
            <main className="flex flex-col mt-28 w-full justify-center items-center">
                <h1 className="text-header text-2xl sml:text-4xl">
                    Shipping Information
                </h1>
                <form className="bg-formBg p-4 brightness-95 flex flex-col flex-start w-1/4 min-w-[250px] mt-4 space-y-6 mb-4"
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
                    <p className="flex self-center text-center mt-3 text-red-500">
                        Something went wrong.
                    </p>
                    }
                    <PurchaseButton
                    text="Save"
                    className="bg-purchaseButton flex self-center"
                    />
                </form>
                <div className="w-1/4 min-w-[250px] mb-4">
                    <PurchaseButton
                    text="Change password"
                    className="bg-[#32a852] w-full"
                    onClick={() => router.push('/change-password')}
                    />
                </div>
                <div className="w-1/4 min-w-[250px] mb-8">
                    <PurchaseButton
                    text="Delete account"
                    className="bg-red-700 w-full"
                    onClick={() => setModalOpen(true)}
                    />
                </div>
            </main>
        <Modal
        isOpen={modalOpen}
        isDismissable={false}
        hideCloseButton={true}
        >
            <ModalContent className='bg-white pt-4 pb-2'>
            {(onClose) => (
                <>
                <ModalBody>
                    <p className='text-center'>
                       Do you want to delete your account?
                    </p>
                </ModalBody>
                <ModalFooter className='flex flex-row justify-center items-center gap-4'>
                    <Button className='bg-purchaseButton font-semibold text-white
                    hover:brightness-110 transition ease-in-out duration-200
                    px-8'
                    onPress={() => router.replace('/delete-account')}>
                    Yes
                    </Button>
                    <Button className='bg-purchaseButton font-semibold text-white
                    hover:brightness-110 transition ease-in-out duration-200
                    px-8'
                    onPress={() => setModalOpen(false)}>
                    No
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        </div>
    )
}