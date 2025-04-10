"use client"

import { useState } from "react"
import mac from "../../../public/images/main-mac.avif"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import PurchaseCard from "@/components/PurchaseCard"
import ItemDetails from "@/components/ItemDetails"
import styles from "../../styles/home.module.css"
import useCart from "@/hooks/useCart"
import { ToastContainer, toast } from "react-toastify"

export default function Imac() {
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
            id: "imac-24",
            name: "APPLE iMAC 24 4k",
            price: 1499.99,
            quantity: 1
        }).then(() => notify())
    }

    return (
        <div className="flex flex-col items-center">
            <ToastContainer/>
            <PurchaseCard
            image={mac}
            price="1499.99"
            name="APPLE iMAC 24 4k"
            description="Experience stunning 4K visuals and seamless performance with the Apple iMac 24,
            featuring 16GB RAM and a 512GB SSD for effortless multitasking.
            Its sleek design, vibrant Retina display, and powerful M1/M3 chip make it perfect
            for work, creativity, and entertainment."
            className="mt-24 xsmll:mt-28 mb-12"
            onClick={addToCart}
            />

            <ItemDetails
            description="The Apple iMac 24 4K is a sleek and powerful all-in-one desktop
            designed for creativity and productivity. Featuring a stunning 24-inch 4K Retina
            display, it delivers vibrant colors and sharp details for an immersive visual
            experience. Powered by Apple's cutting-edge M-series chip, 16GB of RAM, and a
            512GB SSD, it ensures seamless multitasking, fast performance, and ample storage
            for all your files and projects. The ultra-thin design, studio-quality speakers,
            and advanced camera and microphone setup make it perfect for work, entertainment,
            and video calls. Whether you're editing, designing, or streaming, the iMac 24
            4K offers a smooth, powerful, and stylish computing experience."
            className={detailsVisible ? styles['fade-in-up'] : ''}
            ref={titleRef}
            params={[
                { key: "Display", value: "24-inch 4.5K Retina" },
                { key: "Resolution", value: "4480 x 2520" },
                { key: "Processor", value: "Apple M1 8-core CPU" },
                { key: "GPU", value: "8-core Apple GPU" },
                { key: "Neural Engine", value: "16-core" },
                { key: "RAM", value: "16GB Unified Memory" },
                { key: "Storage", value: "512GB SSD" },
                { key: "Memory Bandwidth", value: "68.25 GB/s" },
                { key: "Base Clock", value: "3.2 GHz" },
                { key: "Display Brightness", value: "500 nits" },
                { key: "Color Display", value: "P3 Wide Color" }
            ]}
            />
        </div>
    )
}