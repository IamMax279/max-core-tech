"use client"

import BigTitle from "@/components/BigTitle"
import styles from "../../styles/home.module.css"
import { useState } from "react"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import mouse from "../../../public/images/mouse-1.avif"
import headset from "../../../public/images/headphones-1.avif"
import keyboard from "../../../public/images/home-keyboard.webp"
import EsthPicAndDesc from "@/components/EsthPicAndDesc"
import { useRouter } from "next/navigation"

export default function Peripherals() {
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
                    text="PERIPHERALS"
                    color="white"
                    gap="lg:mr-5 mr-2"
                />
            </div>

            <EsthPicAndDesc
            image={mouse}
            headline="ThunderStrike Pro"
            description="The ThunderStrike Pro is a high-performance gaming mouse designed
            for precision and speed. Featuring customizable RGB lighting, ultra-responsive
            buttons, and an ergonomic design, it ensures peak performance and comfort for
            intense gaming sessions."
            className="my-20 bg-white"
            animation="opacity-100"
            onClick={() => router.push('/peripherals/thunderstrike-pro')}
            />

            <EsthPicAndDesc
            image={headset}
            headline="ApexSonic X"
            description="The ApexSonic X is a premium gaming headset with immersive 3D audio,
            ultra-clear noise-canceling mic, and low-latency wireless connectivity.
            Designed for comfort and precision, it delivers crystal-clear sound and deep
            bass for the ultimate gaming experience."
            className={`my-20 bg-white`}
            animation={p2vis ? styles['fade-in-down'] : ''}
            reverse={true}
            ref={p2ref}
            onClick={() => router.push('/peripherals/apexsonic-x')}
            />

            <EsthPicAndDesc
            image={keyboard}
            headline="KeyTech 2000"
            description="The KeyTech 2000 is a high-performance mechanical keyboard featuring
            ultra-responsive switches, customizable RGB lighting, and a durable aluminum frame.
            With anti-ghosting technology and programmable macros, it’s built for precision,
            speed, and style."
            className={`my-20 bg-white`}
            animation={p3vis ? styles['fade-in-down'] : ''}
            ref={p3ref}
            onClick={() => router.push('/peripherals/keytech-2000')}
            />
        </div>
    )
}