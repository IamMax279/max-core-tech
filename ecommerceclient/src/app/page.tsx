"use client"

import accmoni from "../../public/images/acc-monitor-text.svg"
import accgpu from "../../public/images/acc-gpu-text.svg"
import accperiphs from "../../public/images/acc-periphs-text.svg"
import accmoni2 from "../../public/images/acc-monitor.jpg"
import accgpu2 from "../../public/images/acc-gpu.jpg"
import accperiphs2 from "../../public/images/acc-periphs.jpg"
import mac from "../../public/images/main-mac.avif"
import styles from "../styles/home.module.css";
import ProductShowcase from "@/components/ProductShowcase";
import AccordionImage from "@/components/ImageAccordion";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import BigTitle from "@/components/BigTitle";
import PicAndDescCont from "@/components/PicAndDescCont";
import keyboard from "../../public/images/home-keyboard.webp"
import hexagons from "../../public/polygon-scatter-haikei.svg"
import gpu from "../../public/images/home-gpu.webp"
import peaks from "../../public/stacked-peaks-haikei.svg"
import monitor from "../../public/images/home-monitor.avif"
import layers from "../../public/layered-peaks-haikei.svg"
import { useState } from "react";
import { useRouter } from "next/navigation"

const accordionImages = [
  { src: accmoni, alt: "monitors", className: "rounded-tl-lg rounded-bl-lg" },
  { src: accgpu, alt: "parts" },
  { src: accperiphs, alt: "peripherals", className: "rounded-tr-lg rounded-br-lg" }
];

const accordionImages2 = [
  { src: accmoni2, alt: "monitors", className: "rounded-tl-lg rounded-bl-lg" },
  { src: accgpu2, alt: "parts" },
  { src: accperiphs2, alt: "peripherals", className: "rounded-tr-lg rounded-br-lg" }
];

export default function Home() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [picdesc1Visible, setPicdesc1Visible] = useState<boolean>(false)
  const [picdesc2Visible, setPicdesc2Visible] = useState<boolean>(false)
  const [picdesc3Visible, setPicdesc3Visible] = useState<boolean>(false)

  const router = useRouter()

  const targetRef = useIntersectionObserver(() => setIsVisible(true))
  const picdesc1Ref = useIntersectionObserver(() => setPicdesc1Visible(true))
  const picdesc2Ref = useIntersectionObserver(() => setPicdesc2Visible(true))
  const picdesc3Ref = useIntersectionObserver(() => setPicdesc3Visible(true))

  return (
    <div className="flex flex-row bg-white">
      <main className="flex flex-col w-full items-center">
        <div className="py-8"></div>
        <div className="flex items-center justify-center text-center">
          <h1 className="text-header text-2xl sml:text-4xl">
            This is just a project, there is no affiliation with any brands mentioned.
          </h1>
        </div>

        <ProductShowcase
          className="bg-opacity-50 hidden xbig:flex bg-[#dbdad5] w-11/12 h-[800px] rounded-xl relative top-10
          border border-[#bababa] flex-row justify-between"
          imageWidth={820}
          imageHeight={550}
          imagePosition="top-[125px]"
          imageSource={mac}
          titleSize="text-4xl"
          subtitleSize="text-2xl"
        />
        
        <ProductShowcase
          className="bg-opacity-50 xbig:hidden mid:flex hidden bg-[#dbdad5] w-11/12 h-[500px] rounded-xl relative top-10
          border border-[#bababa] flex-row justify-between"
          imageWidth={414}
          imageHeight={275}
          imagePosition="top-[80px]"
          imageSource={mac}
          titleSize="text-3xl"
          subtitleSize="text-xl"
        />

        <ProductShowcase
          className="bg-opacity-50 mid:hidden flex bg-[#dbdad5] w-11/12 rounded-xl relative top-10
          border border-[#bababa] flex-col justify-center items-center"
          imageWidth={414}
          imageHeight={275}
          imagePosition="top-[40px]"
          imageSource={mac}
          titleSize="text-3xl"
          subtitleSize="text-xl"
          layout="vertical"
        />

        <div className={`${styles['accordion']} flex-row justify-center relative z-10 mt-36 hidden sml:flex`}>
          {accordionImages.map((image, index) => (
            <AccordionImage
              key={index}
              src={image.src}
              alt={image.alt}
              className={image.className}
              onClick={() => {
                switch(image.alt) {
                  case 'monitors':
                    router.push('/monitors')
                    break;
                  case 'parts':
                    router.push('/parts')
                    break;
                  case 'peripherals':
                    router.push('/peripherals')
                    break;
                }
              }}
            />
          ))}
        </div>

        <div className={`${styles['accordion']} flex-row justify-center relative z-10 mt-36 flex sml:hidden`}>
          {accordionImages2.map((image, index) => (
            <AccordionImage
              key={index}
              src={image.src}
              alt={image.alt}
              className={image.className}
              onClick={() => {
                switch(image.alt) {
                  case 'monitors':
                    router.push('/monitors')
                    break;
                  case 'parts':
                    router.push('/parts')
                    break;
                  case 'peripherals':
                    router.push('/peripherals')
                    break;
                }
              }}
            />
          ))}
        </div>

        <BigTitle
        className={`flex self-start opacity-0 mx-10 mt-36
        ${isVisible ? styles['fade-in-up'] : ''}`}
        ref={targetRef}
        text="TOP OF THE MONTH"
        />

        <PicAndDescCont
        image={keyboard}
        descImage={hexagons}
        className={`mt-16 opacity-0 ${picdesc1Visible ? styles['fade-in-right'] : ''}`}
        title="KeyTech 2000"
        description="Elevate your typing experience with the KeyTech 2000, a premium mechanical
        keyboard that combines precision, comfort, and reliability for gaming and professional 
        use alike."
        ref={picdesc1Ref}
        onClick={() => router.push('/peripherals/keytech-2000')}
        />

        <PicAndDescCont
        image={gpu}
        descImage={peaks}
        className={`mt-16 opacity-0 ${picdesc2Visible ? styles['fade-in-left'] : ''}`}
        title="NovaForce X80"
        description="Experience unmatched performance with the NovaForce X80, a cutting-edge
        GPU that delivers exceptional speed and visual fidelity for gaming and creative 
        workflows."
        reverse={true}
        ref={picdesc2Ref}
        onClick={() => router.push('/parts/novaforce-x80')}
        />

        <PicAndDescCont
        image={monitor}
        descImage={layers}
        className={`mb-10 mt-16 opacity-0 ${picdesc3Visible ? styles['fade-in-right'] : ''}`}
        title="VisionEdge 34"
        description="Experience immersive visuals with the VisionEdge Ultra 34,
        a premium 34-inch ultrawide QHD monitor delivering crystal-clear quality
        and ultra-smooth performance for both gaming and creative work."
        ref={picdesc3Ref}
        onClick={() => router.push('/monitors/visionedge-34')}
        />
      </main>
    </div>
  );
}