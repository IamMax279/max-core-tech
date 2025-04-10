"use client"

import PurchaseCard from "@/components/PurchaseCard";
import peripheral from "../../../../public/images/mouse-1.avif"
import ItemDetails from "@/components/ItemDetails";
import { useState } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import styles from "../../../styles/home.module.css"
import useCart from "@/hooks/useCart"
import { ToastContainer, toast } from "react-toastify"

export default function Peripheral1() {
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
            id: "thunderstrike-pro",
            name: "ThunderStrike Pro",
            price: 59.99,
            quantity: 1
        }).then(() => notify())
    }

    return (
        <div className="flex flex-col items-center">
            <ToastContainer/>
            <PurchaseCard
            image={peripheral}
            price="59.99"
            name="ThunderStrike Pro"
            description="The ThunderStrike Pro is a high-performance gaming mouse designed
            for precision and speed. Featuring customizable RGB lighting, ultra-responsive
            buttons, and an ergonomic design, it ensures peak performance and comfort for
            intense gaming sessions."
            className="mt-24 xsmll:mt-28 mb-12"
            onClick={addToCart}
            />

            <ItemDetails
            description="The ThunderStrike Pro Mouse is built for precision and speed,
            designed to give you the edge in any game or task. Featuring a high-precision
            optical sensor with up to 16,000 DPI, it delivers ultra-responsive tracking for
            pixel-perfect accuracy. The ergonomic design ensures comfort during long gaming
            sessions, while customizable RGB lighting lets you personalize your setup. With
            programmable buttons and a durable build, the ThunderStrike Pro is engineered to
            withstand the demands of competitive gaming. Its lightweight frame and ultra-fast
            response time ensure you’re always ready to strike at a moment’s notice, making it
            the perfect choice for gamers who demand top-tier performance."
            className={detailsVisible ? styles['fade-in-up'] : ''}
            ref={titleRef}
            params={[
                { key: "Sensor", value: "16K DPI Optical" },
                { key: "Polling Rate", value: "1000Hz (1ms)" },
                { key: "Buttons", value: "8 Programmable" },
                { key: "Switch Type", value: "Omron 50M" },
                { key: "RGB Zones", value: "3 Customizable Zones" },
                { key: "Weight", value: "89g" },
                { key: "Cable", value: "1.8m Braided" },
                { key: "Onboard Memory", value: "4 Profiles" },
                { key: "Acceleration", value: "40G" },
            ]}
            />
        </div>
    )
}