"use client"

import Image from "next/image"
import Logo from "../../public/logo-no-bg.svg"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-secondaryHeader brightness-125 px-16 py-12 flex justify-center mt-auto w-full">
            <div className="flex flex-col sml:flex-row sml:justify-between items-center w-3/4 sml:space-x-10">
                <div className="flex flex-col">
                    <Image
                    src={Logo}
                    alt="logo"
                    width={200}
                    height={45}
                    className="flex self-center sml:self-auto"
                    />
                    <p className="mt-6 text-textLight font-light text-base text-center sml:text-left">
                        MaxCoreTech delivers top tech gadgets, high-performance hardware,<br/>
                        and accessories. Get leading brands, great deals, and fast shipping. <br/>
                        Perfect for gamers, creators, and tech lovers alike.
                    </p>
                    <p className="mt-6 text-textLight font-light text-base text-center sml:text-left">
                        Copyright 2025. All Rights Reserved
                    </p>
                </div>
                <div className="flex flex-col sml:space-y-28 space-y-4">
                    <ul className="flex flex-row space-x-4 sml:mt-0 mt-6">
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
                    </ul>
                    <div className="flex flex-row space-x-4 self-center sml:self-start">
                        <FaFacebook
                            size={40}
                            className="cursor-pointer hover:text-buttonInCont
                            transition-colors duration-300 ease-in-out"
                            onClick={() => window.location.reload()}
                        />
                        <FaInstagram
                            size={40}
                            className="cursor-pointer hover:text-buttonInCont
                            transition-colors duration-300 ease-in-out"
                            onClick={() => window.location.reload()}
                        />
                        <FaTwitter
                            size={40}
                            className="cursor-pointer hover:text-buttonInCont
                            transition-colors duration-300 ease-in-out"
                            onClick={() => window.location.reload()}
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}