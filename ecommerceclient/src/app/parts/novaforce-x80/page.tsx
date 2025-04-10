"use client"

import PurchaseCard from "@/components/PurchaseCard"
import part from "../../../../public/images/gpu-horiz.jpg"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { useState } from "react"
import ItemDetails from "@/components/ItemDetails"
import styles from "../../../styles/home.module.css"
import useCart from "@/hooks/useCart"
import { ToastContainer, toast } from "react-toastify"

export default function Part3() {
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
            id: "novaforce-x80",
            name: "NovaForce X80",
            price: 399.99,
            quantity: 1
        }).then(() => notify())
    }

    return (
        <div className="flex flex-col items-center">
            <ToastContainer/>
            <PurchaseCard
            image={part}
            price="399.99"
            name="NovaForce X80"
            description="The NovaForce X80 is a powerhouse GPU designed for ultimate
            gaming performance, featuring cutting-edge ray tracing and AI-enhanced graphics.
            With blazing-fast clock speeds, ultra-efficient cooling, and support for 4K
            gaming, it’s built to push the limits of next-gen visuals."
            className="mt-24 xsmll:mt-28 mb-12"
            onClick={addToCart}
            />

            <ItemDetails
            description="The NovaForce X80 GPU is a powerhouse designed to deliver exceptional
            performance for gamers and content creators. Featuring the latest architecture
            and powerful CUDA cores, the X80 delivers stunning 4K visuals and smooth frame
            rates even in the most demanding titles. With support for real-time ray tracing
            and AI-enhanced graphics, it brings lifelike detail and immersive environments
            to life. Its advanced cooling system ensures optimal temperatures even during
            extended gaming sessions, while the sleek, futuristic design with customizable
            RGB lighting adds style to your build. Whether you're gaming, streaming, or
            rendering, the NovaForce X80 GPU offers unparalleled performance and reliability."
            className={detailsVisible ? styles['fade-in-up'] : ''}
            ref={titleRef}
            params={[
                { key: "GPU Architecture", value: "Ada Lovelace" },
                { key: "CUDA Cores", value: "9728" },
                { key: "Base Clock", value: "2.31 GHz" },
                { key: "Boost Clock", value: "2.61 GHz" },
                { key: "Memory Size", value: "16GB GDDR6X" },
                { key: "Memory Speed", value: "21 Gbps" },
                { key: "Memory Interface", value: "256-bit" },
                { key: "Ray Tracing Cores", value: "3rd Generation" },
                { key: "Tensor Cores", value: "4th Generation" },
            ]}
            />
        </div>
    )
}