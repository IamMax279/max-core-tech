"use client"

import Image, { StaticImageData } from "next/image";
import PurchaseButton from "./PurchaseButton";
import { useRouter } from "next/navigation";

interface ProductShowcaseProps {
  className: string;
  imageWidth: number;
  imageHeight: number;
  imagePosition: string;
  imageSource: StaticImageData;
  titleSize: string;
  subtitleSize: string;
  layout?: 'horizontal' | 'vertical';
}

export default function ProductShowcase({
  className,
  imageWidth,
  imageHeight,
  imagePosition,
  imageSource,
  titleSize,
  subtitleSize,
  layout = 'horizontal'
}: ProductShowcaseProps) {
  const router = useRouter()

    const content = (
        <>
          <h2 className={`${subtitleSize} text-secondaryHeader`}>
            NEW
          </h2>
          <h1 className={`${titleSize} text-header mt-2`}>
            APPLE iMAC 24 4k 16GB RAM 512GB
          </h1>
          <p className="mt-6 text-paragraph">
            Experience stunning 4K visuals and seamless performance with the Apple iMac 24", <br/>
            featuring 16GB RAM and a 512GB SSD for effortless multitasking. <br/>
            Its sleek design, vibrant Retina display, and powerful M1/M3 chip make it perfect <br/>
            for work, creativity, and entertainment. <br/>
          </p>
          {layout === 'horizontal' &&
          <div className="mt-4 mb-8">
            <PurchaseButton text="Buy Now" color="bg-purchaseButton"
            onClick={() => router.push('/imac')}/>
          </div>
          }
        </>
      );
    
      if (layout === 'vertical') {
        return (
          <div className={className}>
            <Image
              src={imageSource}
              alt="mac"
              width={imageWidth}
              height={imageHeight}
              className="object-contain rounded-xl mt-8"
            />
            <div className="mx-4 mt-8">
              {content}
            </div>
            <div className="mt-4 mb-8">
                <PurchaseButton text="Buy Now" color="bg-purchaseButton" 
                onClick={() => router.push('/imac')}
                />
            </div>
          </div>
        );
      }
    
      return (
        <div className={className}>
          <div className={`absolute left-20 ${imagePosition}`}>
            {content}
          </div>
          <Image
            src={imageSource}
            alt="mac"
            width={imageWidth}
            height={imageHeight}
            className={`object-contain absolute right-20 ${imagePosition} rounded-xl`}
          />
        </div>
      );
}