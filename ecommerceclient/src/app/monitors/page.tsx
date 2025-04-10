"use client"

import { useState } from "react"
import styles from "../../styles/home.module.css"
import BigTitle from "@/components/BigTitle"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import EsthPicAndDesc from "@/components/EsthPicAndDesc"
import m1 from "../../../public/images/monitor-1.avif"
import m2 from "../../../public/images/monitor-3.avif"
import m3 from "../../../public/images/home-monitor.avif"
import { useRouter } from "next/navigation"

export default function Monitors() {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [m2vis, setM2vis] = useState<boolean>(false)
    const [m3vis, setM3vis] = useState<boolean>(false)

    const router = useRouter()

    const targetRef = useIntersectionObserver(() => setIsVisible(true))
    const m2ref = useIntersectionObserver(() => setM2vis(true))
    const m3ref = useIntersectionObserver(() => setM3vis(true))

    return (
        <div className="flex flex-col">
            <div className="w-full bg-black py-10 -mt-4">
                <div className="py-8"></div>
                <BigTitle
                    className={`flex self-start opacity-0 mx-10
                    ${isVisible ? styles['fade-in-up'] : ''}`}
                    ref={targetRef}
                    text="MONITORS"
                    color="text-background"
                    gap="lg:mr-5 mr-2"
                />
            </div>

            <EsthPicAndDesc
            image={m1}
            headline="TitanView XG"
            description="The TitanView XG is a 4K, 240Hz gaming monitor with HDR Pro
            and ultra-low latency for seamless performance. Its quantum dot display
            and customizable RGB accents deliver stunning visuals and a futuristic edge."
            className="my-20 bg-white"
            animation="opacity-100"
            onClick={() => router.push('/monitors/titanview-xg')}
            />

            <EsthPicAndDesc
            image={m2}
            headline="CyberView Pro"
            description="The CyberView Pro is a sleek 32 QHD monitor with a 165Hz refresh rate
            and ultra-fast response time for fluid, tear-free visuals. Its edge-to-edge design,
            HDR support, and adaptive sync make it perfect for both gaming and productivity."
            className={`my-20 bg-white`}
            animation={m2vis ? styles['fade-in-down'] : ''}
            reverse={true}
            ref={m2ref}
            onClick={() => router.push('/monitors/cyberview-pro')}
            />

            <EsthPicAndDesc
            image={m3}
            headline="VisionEdge 34"
            description="The VisionEdge 34 is an ultra-wide 34 QHD monitor with a 175Hz refresh
            rate and razor-sharp clarity. Its curved, bezel-less design and HDR10 support
            deliver an immersive experience for gaming and creative work."
            className={`my-20 bg-white`}
            animation={m3vis ? styles['fade-in-down'] : ''}
            ref={m3ref}
            onClick={() => router.push('/monitors/visionedge-34')}
            />
        </div>
    )
}