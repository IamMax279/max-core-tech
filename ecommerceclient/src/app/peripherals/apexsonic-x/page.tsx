"use client"

import PurchaseCard from "@/components/PurchaseCard"
import peripheral from "../../../../public/images/headphones-1.avif"
import ItemDetails from "@/components/ItemDetails"
import { useState } from "react"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import styles from "../../../styles/home.module.css"
import useCart from "@/hooks/useCart"
import { ToastContainer, toast } from "react-toastify"

export default function Peripheral2() {
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
            id: "apexsonic-x",
            name: "ApexSonic X",
            price: 199.99,
            quantity: 1
        }).then(() => notify())
    }

    return (
        <div className="flex flex-col items-center">
            <ToastContainer/>
            <PurchaseCard
            image={peripheral}
            price="199.99"
            name="ApexSonic X"
            description="The ApexSonic X is a premium gaming headset with immersive 3D audio,
            ultra-clear noise-canceling mic, and low-latency wireless connectivity.
            Designed for comfort and precision, it delivers crystal-clear sound and deep
            bass for the ultimate gaming experience."
            className="mt-24 xsmll:mt-28 mb-12"
            onClick={addToCart}
            />

            <ItemDetails
            description="The ApexSonic X Headset is designed for immersive audio and comfort,
            perfect for gamers and audio enthusiasts alike. Equipped with premium 50mm drivers,
            it delivers crystal-clear sound and powerful bass for a truly immersive gaming
            experience. The adjustable headband and plush ear cushions provide all-day comfort,
            while the noise-canceling microphone ensures clear communication during intense
            gameplay. With customizable RGB lighting and a sleek, modern design, the ApexSonic X
            adds style to your setup. Whether you're gaming, streaming, or enjoying your
            favorite music, this headset delivers exceptional sound quality and performance,
            keeping you fully immersed in your audio experience."
            className={detailsVisible ? styles['fade-in-up'] : ''}
            ref={titleRef}
            params={[
                { key: "Driver Size", value: "50mm Neodymium" },
                { key: "Frequency Response", value: "20Hz - 20kHz" },
                { key: "Impedance", value: "32 Ohm" },
                { key: "Connectivity", value: "2.4GHz / Bluetooth 5.0" },
                { key: "Battery Life", value: "30 Hours" },
                { key: "Microphone", value: "Detachable Boom Mic" },
                { key: "Noise Cancellation", value: "AI-Enhanced" },
                { key: "RGB Lighting", value: "2 RGB Zones" },
                { key: "Controls", value: "On-ear Controls" },
            ]}
            />
        </div>
    )
}