"use client"

import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { useState } from "react"
import styles from "../../styles/home.module.css"
import BigTitle from "@/components/BigTitle"
import EsthPicAndDesc from "@/components/EsthPicAndDesc"
import mtbrd from "../../../public/images/motherboard-2.jpeg"
import ram from "../../../public/images/ram-1.avif"
import gpu from "../../../public/images/gpu-horiz.jpg"
import { useRouter } from "next/navigation"

export default function Parts() {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [p2vis, setP2vis] = useState<boolean>(false)
    const [p3vis, setP3vis] = useState<boolean>(false)

    const router = useRouter()
    
    const targetRef = useIntersectionObserver(() => setIsVisible(true))
    const p2ref = useIntersectionObserver(() => setP2vis(true))
    const p3ref = useIntersectionObserver(() => setP3vis(true))
    
    return (
        <div className="flex flex-col">
            <div className="w-full bg-black py-10 -mt-4">
                <div className="py-8"></div>
                <BigTitle
                    className={`flex self-start opacity-0 mx-10
                    ${isVisible ? styles['fade-in-up'] : ''}`}
                    ref={targetRef}
                    text="PARTS"
                    color="text-foreground"
                    gap="lg:mr-5 mr-2"
                />
            </div>

            <EsthPicAndDesc
            image={mtbrd}
            headline="TitanBoard X99"
            description="The TitanBoard X99 is a high-performance ATX motherboard built for
            gamers and power users, featuring PCIe 5.0, DDR5 support, and an advanced thermal
            design. With reinforced VRMs, AI-powered overclocking, and WiFi 6E, it delivers
            unstoppable speed and stability for next-gen computing."
            className="my-20 bg-white"
            animation="opacity-100"
            onClick={() => router.push('/parts/titanboard-x99')}
            />

            <EsthPicAndDesc
            image={ram}
            headline="ThunderVolt Elite"
            description="The ThunderVolt Elite DDR5 RAM delivers ultra-fast speeds and advanced
            heat dissipation. With customizable RGB lighting and a sleek design, it ensures
            peak performance and stability for gaming and productivity."
            className="my-20 bg-white"
            reverse={true}
            ref={p2ref}
            animation={p2vis ? styles['fade-in-down'] : ''}
            onClick={() => router.push('/parts/thundervolt-elite')}
            />

            <EsthPicAndDesc
            image={gpu}
            headline="NovaForce X80"
            description="The NovaForce X80 is a powerhouse GPU designed for ultimate
            gaming performance, featuring cutting-edge ray tracing and AI-enhanced graphics.
            With blazing-fast clock speeds, ultra-efficient cooling, and support for 4K
            gaming, it’s built to push the limits of next-gen visuals."
            className="my-20 bg-white"
            width={500}
            height={344}
            ref={p3ref}
            animation={p3vis ? styles['fade-in-down'] : ''}
            onClick={() => router.push('/parts/novaforce-x80')}
            />
        </div>
    )
}