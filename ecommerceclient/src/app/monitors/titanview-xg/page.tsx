"use client"

import PurchaseCard from "@/components/PurchaseCard"
import monitor from "../../../../public/images/monitor-1.avif"
import ItemDetails from "@/components/ItemDetails"
import styles from "../../../styles/home.module.css"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { useState } from "react"
import useCart from "@/hooks/useCart"
import { ToastContainer, toast } from "react-toastify"

export default function Monitor1() {
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
            id: "titanview-xg",
            name: "TitanView XG",
            price: 499.99,
            quantity: 1
        }).then(() => notify())
    }

    return (
        <div className="flex flex-col items-center">
            <ToastContainer/>
            <PurchaseCard
            image={monitor}
            price="499.99"
            name="TitanView XG"
            description="The TitanView XG is a 4K, 240Hz gaming monitor with HDR Pro
            and ultra-low latency for seamless performance. Its quantum dot display
            and customizable RGB accents deliver stunning visuals and a futuristic edge."
            className="mt-24 xsmll:mt-28 mb-12"
            onClick={addToCart}
            />

            <ItemDetails
            description="The TitanView XG is a high-performance 4K gaming monitor built for
            serious gamers. With a 240Hz refresh rate and HDR Pro, it delivers ultra-smooth
            visuals and vibrant colors. The quantum dot technology ensures stunning
            contrast and clarity, while ultra-low latency provides seamless
            responsiveness for competitive gaming. Its customizable RGB accents offer
            a futuristic touch, making it a stylish and powerful addition to any setup."
            className={detailsVisible ? styles['fade-in-up'] : ''}
            ref={titleRef}
            params={[
                { key: "Display Size", value: "27 inch" },
                { key: "Resolution", value: "3840 x 2160 (4K UHD)" },
                { key: "Panel Type", value: "Quantum Dot IPS" },
                { key: "Refresh Rate", value: "240Hz" },
                { key: "Response Time", value: "1ms GTG" },
                { key: "HDR", value: "HDR Pro (VESA DisplayHDR 600)" },
                { key: "Color Gamut", value: "98% DCI-P3" },
            ]}
            />
        </div>
    )
}