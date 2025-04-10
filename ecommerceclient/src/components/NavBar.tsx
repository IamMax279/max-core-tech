"use client"

import Logo from "../../public/logo.svg"
import Image from "next/image"
import { useState } from "react"
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx"
import styles from "../styles/navbar.module.css"
import Link from "next/link"
import useAuth from "@/hooks/useAuth"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/Store"
import { useRouter } from "next/navigation"

export default function NavBar() {
    const [open, setOpen] = useState<boolean>(false)
    const [closing, setClosing] = useState<boolean>(false)
    const { isAuthenticated, loading } = useAuth()

    const router = useRouter()

    const items = useSelector((state: RootState) => state.cartReducer.items)
    const length = items.reduce((sum, item) => sum + item.quantity, 0)

    const handleMenuToggle = () => {
        if (open) {
            setClosing(true)
            setTimeout(() => {
                setOpen(false)
                setClosing(false)
            }, 500)
        } else {
            setOpen(true)
        }
    }

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 pt-4`}>
            <div className="w-2/3 mx-auto h-12 rounded-lg border text-center px-4 hidden md:flex"
                style={{backgroundColor: "#dbdad5", borderColor: "#bababa"}}>
                <div className="w-full flex flex-row items-center justify-between">
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={32}
                        height={32}
                        className="cursor-pointer mb-1"
                        onClick={() => router.replace('/')}
                    />
                    <ul className="flex flex-row">
                        <li className="cursor-pointer
                            relative text-gray-700 hover:text-header 
                            before:absolute before:-bottom-1 before:left-0 
                            before:h-0.5 before:w-full before:bg-header 
                            before:origin-left before:scale-x-0 before:transition-transform before:duration-300 
                            hover:before:scale-x-100
                            font-azeretmono">
                            <Link href={'/'}>
                                Home
                            </Link>
                        </li>
                        <p className="mx-1">•</p>
                        <li className="cursor-pointer
                            relative text-gray-700 hover:text-header 
                            before:absolute before:-bottom-1 before:left-0 
                            before:h-0.5 before:w-full before:bg-header 
                            before:origin-left before:scale-x-0 before:transition-transform before:duration-300 
                            hover:before:scale-x-100
                            font-azeretmono">
                            <Link href={'/monitors'}>
                                Monitors
                            </Link>
                        </li>
                        <p className="mx-1">•</p>
                        <li className="cursor-pointer
                            relative text-gray-700 hover:text-header 
                            before:absolute before:-bottom-1 before:left-0 
                            before:h-0.5 before:w-full before:bg-header  
                            before:origin-left before:scale-x-0 before:transition-transform before:duration-300 
                            hover:before:scale-x-100
                            font-azeretmono">
                            <Link href={'/parts'}>
                                Parts
                            </Link>
                        </li>
                        <p className="mx-1">•</p>
                        <li className="cursor-pointer
                            relative text-gray-700 hover:text-header 
                            before:absolute before:-bottom-1 before:left-0 
                            before:h-0.5 before:w-full before:bg-header 
                            before:origin-left before:scale-x-0 before:transition-transform before:duration-300 
                            hover:before:scale-x-100
                            font-azeretmono">
                            <Link href={'/peripherals'}>
                                Peripherals
                            </Link>
                        </li>
                    </ul>
                    <div className="cursor-pointer hover:text-header transition-colors duration-300">
                        {!isAuthenticated ?
                        <Link href={'/sign-in'}>
                            Sign in
                        </Link>
                        :
                        <>
                            <div className="flex flex-row space-x-2 items-center">
                                <Link href={'/account'}>
                                    <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    </div>
                                </Link>
                                <Link href={'/cart'}>
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                        {length > 0 &&
                                        <div className="h-5 w-5 rounded-[10px] bg-purchaseButton flex items-center justify-center
                                        absolute -top-[5px] -right-[5px]">
                                            <p className={`font-light ${length > 9 ? "text-[14px]" : "text-base"}`}>
                                                {length}
                                            </p>
                                        </div>
                                        }
                                    </div>
                                </Link>
                            </div>
                        </>
                        }
                    </div>
                </div>
            </div>

            <div className="flex md:hidden w-3/4 mx-auto px-4 py-2 h-12 rounded-lg flex-row
                items-center justify-between border relative"
                style={{backgroundColor: "#dbdad5", borderColor: "#bababa"}}>
                <Image
                    src={Logo}
                    alt="Logo"
                    width={32}
                    height={32}
                    className="cursor-pointer mb-1"
                />
                {!open &&
                    <RxHamburgerMenu 
                        size={32} 
                        style={{color: "#171717"}} 
                        className="cursor-pointer"
                        onClick={handleMenuToggle}
                    />
                }
                {open &&
                    <RxCross1 
                        size={32} 
                        style={{color: "#171717"}} 
                        className="cursor-pointer flex absolute right-4"
                        onClick={handleMenuToggle}
                    />
                }
                {open &&
                    <div className={`flex items-center justify-left w-full z-50 
                        absolute top-16 right-0 bg-[#bababa] border border-[#c7b6aa] py-2 px-4 rounded-lg
                        ${closing ? styles['wrap-up'] : styles['slide-down']}`}>
                        <ul className="flex flex-col space-y-4">
                            <li className="cursor-pointer
                                relative text-gray-700 hover:text-header 
                                before:absolute before:-bottom-1 before:left-0 
                                before:h-0.5 before:w-full before:bg-header 
                                before:origin-left before:scale-x-0 before:transition-transform before:duration-300 
                                hover:before:scale-x-100
                                font-azeretmono">
                                <Link href={'/'}>
                                    Home
                                </Link>
                            </li>
                            <li className="cursor-pointer
                                relative text-gray-700 hover:text-header  
                                before:absolute before:-bottom-1 before:left-0 
                                before:h-0.5 before:w-full before:bg-header 
                                before:origin-left before:scale-x-0 before:transition-transform before:duration-300 
                                hover:before:scale-x-100
                                font-azeretmono">
                                <Link href={'/monitors'}>
                                    Monitors
                                </Link>
                            </li>
                            <li className="cursor-pointer
                                relative text-gray-700 hover:text-header 
                                before:absolute before:-bottom-1 before:left-0 
                                before:h-0.5 before:w-full before:bg-header 
                                before:origin-left before:scale-x-0 before:transition-transform before:duration-300 
                                hover:before:scale-x-100
                                font-azeretmono">
                                <Link href={'/parts'}>
                                    Parts
                                </Link>
                            </li>
                            <li className="cursor-pointer
                                relative text-gray-700 hover:text-header 
                                before:absolute before:-bottom-1 before:left-0 
                                before:h-0.5 before:w-full before:bg-header 
                                before:origin-left before:scale-x-0 before:transition-transform before:duration-300 
                                hover:before:scale-x-100
                                font-azeretmono">
                                <Link href={'/peripherals'}>
                                    Peripherals
                                </Link>
                            </li>
                            <li className="cursor-pointer
                                relative text-gray-700 hover:text-header 
                                before:absolute before:-bottom-1 before:left-0 
                                before:h-0.5 before:w-full before:bg-header 
                                before:origin-left before:scale-x-0 before:transition-transform before:duration-300 
                                hover:before:scale-x-100
                                font-azeretmono">
                                {!isAuthenticated ?
                                <Link href={'/sign-in'}>
                                    Sign in
                                </Link>
                                :
                                <Link href={'/account'} className="flex flex-row items-center space-x-1 relative -left-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 relative bottom-[1px]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    <p>
                                        Account
                                    </p>
                                </Link>
                                }
                            </li>
                            {isAuthenticated &&
                            <li className="cursor-pointer
                            relative text-gray-700 hover:text-header 
                            before:absolute before:-bottom-1 before:left-0 
                            before:h-0.5 before:w-full before:bg-header 
                            before:origin-left before:scale-x-0 before:transition-transform before:duration-300 
                            hover:before:scale-x-100
                            font-azeretmono">
                                <Link href={'/cart'} className="flex flex-row items-center space-x-1 relative -left-1">
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                        {length > 0 &&
                                        <div className="h-5 w-5 rounded-[10px] bg-purchaseButton flex items-center justify-center
                                        absolute -top-[5px] -right-[5px]">
                                            <p className={`font-light ${length > 9 ? "text-[14px]" : "text-base"}`}>
                                                {length}
                                            </p>
                                        </div>
                                        }
                                    </div>
                                    <p className={`pl-[8px] ${length > 0 ? "pl-1" : ""}`}>
                                        Cart
                                    </p>
                                </Link>
                            </li>
                            }
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}