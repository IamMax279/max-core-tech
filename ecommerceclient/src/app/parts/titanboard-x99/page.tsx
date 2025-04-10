"use client"

import PurchaseCard from "@/components/PurchaseCard";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useState } from "react";
import part from "../../../../public/images/motherboard-2.jpeg"
import ItemDetails from "@/components/ItemDetails";
import styles from "../../../styles/home.module.css"
import useCart from "@/hooks/useCart"
import { ToastContainer, toast } from "react-toastify"

export default function Part1() {
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
            id: "titanboard-x99",
            name: "TitanBoard X99",
            price: 299.99,
            quantity: 1
        }).then(() => notify())
    }

    return (
        <div className="flex flex-col items-center">
            <ToastContainer/>
            <PurchaseCard
            image={part}
            price="299.99"
            name="TitanBoard X99"
            description="The TitanBoard X99 is a high-performance ATX motherboard built for
            gamers and power users, featuring PCIe 5.0, DDR5 support, and an advanced thermal
            design. With reinforced VRMs, AI-powered overclocking, and WiFi 6E, it delivers
            unstoppable speed and stability for next-gen computing."
            className="mt-24 xsmll:mt-28 mb-12"
            onClick={addToCart}
            />

            <ItemDetails
            description="The TitanBoard X99 motherboard is a powerhouse built for
            high-performance gaming and content creation. Equipped with the latest Intel X99
            chipset, it supports extreme processors, offering unbeatable speed and efficiency.
            With multiple PCIe slots for powerful GPU configurations, enhanced memory support
            for DDR4 RAM, and robust overclocking capabilities, the TitanBoard X99 ensures
            smooth and responsive performance under even the most demanding workloads. Its
            advanced cooling system, reinforced design, and high-speed connectivity options,
            including USB 3.1 and M.2 slots, provide reliability and expansion potential for
            a truly custom build. Whether you’re building a gaming rig or a workstation, the
            TitanBoard X99 offers the stability and performance you need."
            className={detailsVisible ? styles['fade-in-up'] : ''}
            ref={titleRef}
            params={[
                { key: "Form Factor", value: "ATX" },
                { key: "CPU Support", value: "Intel LGA 1700" },
                { key: "Chipset", value: "Intel X99" },
                { key: "Memory Support", value: "DDR5, up to 7800MHz OC" },
                { key: "Memory Slots", value: "4x DIMM (128GB max)" },
                { key: "PCIe Slots", value: "2x PCIe 5.0 x16, 1x PCIe 4.0 x16" },
                { key: "Storage", value: "4x M.2 PCIe 5.0, 6x SATA III" },
                { key: "Network", value: "2.5G LAN, WiFi 6E" },
                { key: "USB Ports", value: "2x USB 3.2 Gen2x2, 8x USB 3.2 Gen2" },
                { key: "Power Design", value: "20+1+2 Power Stages" },
            ]}
            />
        </div>
    )
}