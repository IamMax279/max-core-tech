"use client"

import PurchaseCard from "@/components/PurchaseCard"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { useState } from "react"
import monitor from "../../../../public/images/home-monitor.avif"
import ItemDetails from "@/components/ItemDetails"
import styles from "../../../styles/home.module.css"
import useCart from "@/hooks/useCart"
import { ToastContainer, toast } from "react-toastify"

export default function Monitor3() {
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
            id: "visionedge-34",
            name: "VisionEdge 34",
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
            name="VisionEdge 34"
            description="The VisionEdge 34 is an ultra-wide 34 QHD monitor with a 175Hz refresh
            rate and razor-sharp clarity. Its curved, bezel-less design and HDR10 support
            deliver an immersive experience for gaming and creative work."
            className="mt-24 xsmll:mt-28 mb-12"
            onClick={addToCart}
            />

            <ItemDetails
            description="The VisionEdge 34 is a premium ultra-wide monitor designed to enhance
            productivity and immersive entertainment. With a 34-inch curved screen and stunning
            1440p resolution, it provides expansive views and incredible detail. The 144Hz
            refresh rate and adaptive sync technology offer smooth, fluid motion for both
            gaming and media consumption. Its sleek, modern design with thin bezels ensures
            an uninterrupted viewing experience, while its wide color gamut and HDR support
            deliver vibrant, lifelike visuals. Whether you're working, gaming, or streaming,
            the VisionEdge 34 is built to elevate your experience."
            className={detailsVisible ? styles['fade-in-up'] : ''}
            ref={titleRef}
            params={[
                { key: "Display Size", value: "34 inch Ultrawide" },
                { key: "Panel Curvature", value: "1000R" },
                { key: "Resolution", value: "3440 x 1440 (UWQHD)" },
                { key: "Panel Type", value: "VA" },
                { key: "Refresh Rate", value: "175Hz" },
                { key: "Response Time", value: "1ms MPRT" },
                { key: "HDR", value: "HDR10" },
                { key: "Color Gamut", value: "90% DCI-P3" },
                { key: "Brightness", value: "350 nits" },
            ]}
            />
        </div>
    )
}