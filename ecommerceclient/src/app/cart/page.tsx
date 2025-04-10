"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../../../public/logo-no-bg.svg"
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/Store";
import { renderProductImage } from "@/utils/CartUtils";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import PurchaseButton from "@/components/PurchaseButton";
import {  
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure}
from "@heroui/modal";
import { Button } from "@nextui-org/button";
import { clearCart, removeItem, updateQuantity } from "@/redux/Slices";
import { FaRegTrashCan, FaPlus, FaMinus } from "react-icons/fa6";

export default function Cart() {
    const router = useRouter()
    const { isAuthenticated, loading } = useAuth()

    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    const dispatch = useDispatch()

    const cartContent = useSelector((state: RootState) => state.cartReducer.items)
    const total = useSelector((state: RootState) => state.cartReducer.total)

    useEffect(() => {
        if(!isAuthenticated && !loading) {
            router.replace('/')
        }
    }, [isAuthenticated, loading, router])

    if (loading || !isAuthenticated) {
        return null
    }
    
    return (
        <div className="flex-1 flex flex-col items-center mt-16 min-h-screen">
            <NavBar/>
            <Image
            src={Logo}
            alt="logo"
            width={250}
            height={59}
            className="mb-14 cursor-pointer xsmll:w-[250px] w-[175px] relative top-4 xsmll:top-2"
            onClick={() => router.push('/')}
            />
            {cartContent.length <= 0 ?
            <div>
                <h2>Your cart is empty.</h2>
            </div>
            :
            <main className="flex flex-col smllr:flex-row smllr:space-x-10">
                <div className="flex flex-col">
                    <section className="flex flex-col rounded-2xl bg-[#dbdad5] bg-opacity-50
                    border border-[#bababa] px-3 pt-6 pb-1 mid:w-[500px] sml:w-[350px] sml:px-6 mb-8">
                        {cartContent.map((item, index) => (
                            <div className="w-full flex flex-row justify-between items-center space-x-4"
                            key={index}>
                                <div
                                className={`flex flex-row mb-5 space-x-4 items-center`}>
                                    <Image
                                    src={renderProductImage(item.id)}
                                    width={90}
                                    height={60}
                                    alt="product"
                                    className="rounded-md"
                                    />
                                    <div className="flex flex-col space-y-1">
                                        <h2>
                                            {item.name}
                                        </h2>
                                        <p className="text-textLight">
                                            $ {item.price}
                                        </p>
                                        <p>
                                            ({item.quantity > 1 ? item.quantity + " units" : item.quantity + " unit"})
                                        </p>
                                    </div>
                                </div>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="flex flex-col gap-[2px]">
                                    <div className="bg-secondaryHeader p-[4px] hover:brightness-90 transition duration-200
                                cursor-pointer rounded-sm">
                                        <FaPlus className="text-textLight"
                                        onClick={() => dispatch(updateQuantity({id: item.id.toString(), quantity: 1}))}/>   
                                    </div>
                                    <div className="bg-secondaryHeader p-[4px] hover:brightness-90 transition duration-200
                                    cursor-pointer rounded-sm">
                                        <FaMinus className="text-textLight"
                                        onClick={() => dispatch(updateQuantity({id: item.id.toString(), quantity: -1}))}/>   
                                    </div>
                                </div>
                                <div className="p-4 bg-red-700 flex flex-row items-center justify-center cursor-pointer
                                    hover:brightness-90 transition duration-200 rounded-sm">
                                        <FaRegTrashCan className="text-white" size={18}
                                        onClick={() => dispatch(removeItem({id: item.id.toString()}))}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    <PurchaseButton
                    text="Clear cart"
                    className="bg-purchaseButton mb-4 flex self-center smllr:self-start"
                    onClick={() => onOpen()}
                    />
                    </section>
                </div>
                {cartContent.length > 0 &&
                <section className="flex flex-col bg-[#dbdad5] bg-opacity-50
                px-6 pt-6 pb-4 mid:w-[500px] sml:w-[350px] mt-8 smllr:mt-0 max-h-[272px] smllr:mb-0 mb-8">
                    <div className="flex flex-row justify-between space-x-16">
                        <p>Products</p>
                        <p>$ {total}</p>
                    </div>
                    <div className="flex flex-row justify-between space-x-16">
                        <p>Shipping</p>
                        <p>$ 0.00</p>
                    </div>
                    <div className="border border-t-textLight mt-4"></div>
                    <div className="text-lg flex flex-row justify-between space-x-16 mt-4 mb-16">
                        <p>Total</p>
                        <p>$ {total}</p>
                    </div>
                    <PurchaseButton
                    text="Continue to payment"
                    className="w-full bg-purchaseButton"
                    onClick={() => router.push('/cart/shipping')}
                    />
                </section>
                }
            </main>
            }
            <Footer/>
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
                            Are you sure you want to clear your cart?
                        </p>
                    </ModalBody>
                    <ModalFooter className='flex flex-row justify-center items-center gap-4'>
                        <Button className='bg-purchaseButton font-semibold text-white
                        hover:brightness-110 transition ease-in-out duration-200
                        px-8'
                        onPress={() => {
                            dispatch(clearCart())
                            onClose()
                        }}>
                        Yes
                        </Button>
                        <Button className='bg-purchaseButton font-semibold text-white
                        hover:brightness-110 transition ease-in-out duration-200
                        px-8'
                        onPress={() => onClose()}>
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