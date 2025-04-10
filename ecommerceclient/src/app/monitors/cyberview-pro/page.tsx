"use client"

import PurchaseCard from "@/components/PurchaseCard"
import monitor from "../../../../public/images/monitor-3.avif"
import ItemDetails from "@/components/ItemDetails"
import styles from "../../../styles/home.module.css"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { useState } from "react"
import useCart from "@/hooks/useCart"
import { ToastContainer, toast } from "react-toastify"

export default function Monitor2() {
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
            id: "cyberview-pro",
            name: "CyberView Pro",
            price: 599.99,
            quantity: 1
        }).then(() => notify())
    }
    
    return (
        <div className="flex flex-col items-center">
            <ToastContainer/>
            <PurchaseCard
            image={monitor}
            price="599.99"
            name="CyberView Pro"
            description="The CyberView Pro is a sleek 32 QHD monitor with a 165Hz refresh rate
            and ultra-fast response time for fluid, tear-free visuals. Its edge-to-edge design,
            HDR support, and adaptive sync make it perfect for both gaming and productivity."
            className="mt-24 xsmll:mt-28 mb-12"
            onClick={addToCart}
            />

            <ItemDetails
            description="The CyberView Pro is a cutting-edge gaming monitor designed for peak
            performance. Featuring a razor-sharp 4K display with a 165Hz refresh rate and HDR
            Pro, it delivers stunning visuals with smooth, lifelike motion. Its ultra-low
            latency and adaptive sync technology ensure a tear-free gaming experience, while
            the sleek, bezel-less design enhances immersion. With customizable RGB lighting
            and advanced eye-care features, the CyberView Pro combines style, comfort, and
            top-tier performance for gamers and creators alike."
            className={detailsVisible ? styles['fade-in-up'] : ''}
            ref={titleRef}
            params={[
                { key: "Display Size", value: "32 inch" },
                { key: "Resolution", value: "2560 x 1440 (QHD)" },
                { key: "Panel Type", value: "Nano IPS" },
                { key: "Refresh Rate", value: "165Hz" },
                { key: "Response Time", value: "1ms GTG" },
                { key: "HDR", value: "HDR 400" },
                { key: "Color Gamut", value: "95% DCI-P3" },
                { key: "Brightness", value: "400 nits" },
                { key: "Contrast Ratio", value: "1000:1" },
            ]}
            />
        </div>
    )
}