"use client"

import PurchaseCard from "@/components/PurchaseCard";
import part from "../../../../public/images/ram-1.avif"
import ItemDetails from "@/components/ItemDetails";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useState } from "react";
import styles from "../../../styles/home.module.css"
import useCart from "@/hooks/useCart"
import { ToastContainer, toast } from "react-toastify"

export default function Part2() {
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
            id: "thundervolt-elite",
            name: "ThunderVolt Elite",
            price: 149.99,
            quantity: 1
        }).then(() => notify())
    }

    return (
        <div className="flex flex-col items-center">
            <ToastContainer/>
            <PurchaseCard
            image={part}
            price="149.99"
            name="ThunderVolt Elite"
            description="The ThunderVolt Elite DDR5 RAM delivers ultra-fast speeds and advanced
            heat dissipation. With customizable RGB lighting and a sleek design, it ensures
            peak performance and stability for gaming and productivity."
            className="mt-24 xsmll:mt-28 mb-12"
            onClick={addToCart}
            />

            <ItemDetails
            description="The ThunderVolt Elite RAM unit is engineered for speed, stability,
            and performance, offering up to 32GB of DDR4 memory with speeds up to 3600MHz.
            Perfect for gamers and professionals, it ensures smooth multitasking, fast data
            processing, and lag-free gaming. The sleek, high-performance design features
            customizable RGB lighting, adding a dynamic flair to any build. Built with
            advanced heat dissipation technology, the ThunderVolt Elite keeps temperatures
            low even during intense workloads, ensuring reliable performance and longevity.
            Whether you're rendering, gaming, or streaming, the ThunderVolt Elite RAM is
            designed to power through any task with ease."
            className={detailsVisible ? styles['fade-in-up'] : ''}
            ref={titleRef}
            params={[
                { key: "Memory Type", value: "DDR5" },
                { key: "Capacity", value: "32GB (4x8GB)" },
                { key: "Speed", value: "6000MHz" },
                { key: "Timing", value: "CL36-36-36-96" },
                { key: "Voltage", value: "1.35V" },
                { key: "XMP Support", value: "Intel XMP 3.0" },
                { key: "RGB Lighting", value: "Addressable RGB" },
                { key: "Heat Spreader", value: "Aluminum, Low Profile" },
                { key: "On-die ECC", value: "Yes" },
            ]}
            />
        </div>
    )
}