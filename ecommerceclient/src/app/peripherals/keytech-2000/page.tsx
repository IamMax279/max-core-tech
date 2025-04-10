"use client"

import PurchaseCard from "@/components/PurchaseCard"
import peripheral from "../../../../public/images/home-keyboard.webp"
import ItemDetails from "@/components/ItemDetails"
import { useState } from "react"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import styles from "../../../styles/home.module.css"
import useCart from "@/hooks/useCart"
import { ToastContainer, toast } from "react-toastify"

export default function Peripheral3() {
    const [detailsVisible, setDetailsVisible] = useState<boolean>(false)
    const { handleAddingItem } = useCart()

    const titleRef = useIntersectionObserver(() => setDetailsVisible(true))

    const notify = () => {
        toast.info("You've added an item to the cart.", {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: 'colored',
            style: { background: '#766852' },
        });
    }

    const addToCart = () => {
        handleAddingItem({
            id: "keytech-2000",
            name: "KeyTech 2000",
            price: 89.99,
            quantity: 1
        }).then(() => notify())
    }

    return (
        <div className="flex flex-col items-center">
            <ToastContainer/>
            <PurchaseCard
            image={peripheral}
            price="89.99"
            name="KeyTech 2000"
            description="The KeyTech 2000 is a high-performance mechanical keyboard featuring
            ultra-responsive switches, customizable RGB lighting, and a durable aluminum frame.
            With anti-ghosting technology and programmable macros, it’s built for precision,
            speed, and style."
            className="mt-24 xsmll:mt-28 mb-12"
            onClick={addToCart}
            />

            <ItemDetails
            description="The KeyTech 2000 Keyboard is built for precision, speed, and
            durability, making it the perfect choice for both gamers and professionals.
            Featuring responsive mechanical switches, it delivers a satisfying typing
            experience with fast, accurate keystrokes. The customizable RGB lighting allows
            you to personalize your setup, while the sleek, ergonomic design ensures comfort
            during long hours of use. With anti-ghosting and full N-Key rollover, every key
            press is registered without delay, giving you an edge in competitive gaming or
            productivity. Whether you're gaming, working, or creating, the KeyTech 2000 offers
            reliability and performance at your fingertips."
            className={detailsVisible ? styles['fade-in-up'] : ''}
            ref={titleRef}
            params={[
                { key: "Switch Type", value: "Cherry MX Red/Blue/Brown" },
                { key: "Layout", value: "Full-size (104 keys)" },
                { key: "Polling Rate", value: "1000Hz (1ms)" },
                { key: "Rollover", value: "Full N-Key (NKRO)" },
                { key: "Frame Material", value: "Aircraft-grade Aluminum" },
                { key: "RGB Lighting", value: "Per-key RGB (16.8M colors)" },
                { key: "Onboard Memory", value: "3 Profiles" },
                { key: "Cable", value: "USB-C Detachable, Braided" },
                { key: "Wrist Rest", value: "Magnetic, Premium PU Leather" },
            ]}
            />
        </div>
    )
}