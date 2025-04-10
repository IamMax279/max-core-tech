import Image, { StaticImageData } from "next/image"
import PurchaseButton from "./PurchaseButton";
import { forwardRef } from "react";

interface EsthPicAndDescProps {
    image: StaticImageData;
    headline: string;
    description: string;
    className?: string;
    reverse?: boolean;
    width?: number;
    height?: number;
    animation?: string;
    onClick?: () => void
}

const EsthPicAndDesc = forwardRef<HTMLDivElement, EsthPicAndDescProps>(({
    image,
    headline,
    description,
    className="",
    reverse=false,
    width=500,
    height=500,
    animation="",
    onClick=() => {}
}, ref) => {
    if(reverse) {
        return (
            <div className={`${className} flex flex-col-reverse items-center self-center md:flex-row justify-center md:space-x-12`}>
                <div className="flex flex-col w-80">
                    <div className="flex mt-4 self-center md:mt-0 md:self-start">
                        <h1 className="text-header text-4xl">
                            {headline}
                        </h1>
                    </div>
                    <div className="mb-4">
                        <p className="mt-6 text-textLight font-normal leading-relaxed md:text-start text-center">
                            {description}
                        </p>
                    </div>
                    <PurchaseButton
                    text="Buy Now"
                    color="bg-purchaseButton"
                    className="flex md:self-start self-center"
                    onClick={onClick}
                    />
                </div>
                <div ref={ref} className={`opacity-0 ${animation}`}>
                    <Image
                    src={image}
                    alt="monitor"
                    className="rounded-3xl md:rounded-md"
                    width={width}
                    height={height}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={`${className} flex flex-col items-center self-center md:flex-row justify-center md:space-x-12`}>
            <div ref={ref} className={`opacity-0 ${animation}`}>
                <Image
                src={image}
                alt="monitor"
                className="rounded-3xl md:rounded-md"
                width={width}
                height={height}
                />
            </div>
            <div className="flex flex-col w-80">
                <div className="flex mt-4 self-center md:mt-0 md:self-start">
                    <h1 className="text-header text-4xl">
                        {headline}
                    </h1>
                </div>
                <div className="mb-4">
                    <p className="mt-6 text-textLight font-normal leading-relaxed md:text-start text-center">
                        {description}
                    </p>
                </div>
                <PurchaseButton
                text="Buy Now"
                color="bg-purchaseButton"
                className="flex md:self-start self-center"
                onClick={onClick}
                />
            </div>
        </div>
    )
})

EsthPicAndDesc.displayName = 'EsthPicAndDesc'
export default EsthPicAndDesc