import Image, { StaticImageData } from "next/image";
import { forwardRef } from "react";
import PurchaseButton from "./PurchaseButton";

interface PicAndDescContProps {
    image: StaticImageData;
    className: string;
    descImage?: StaticImageData;
    title: string;
    description: string;
    reverse?: boolean;
    onClick?: () => void
}

const PicAndDescCont = forwardRef<HTMLDivElement, PicAndDescContProps>(({
    image,
    className,
    descImage,
    title,
    description,
    reverse=false,
    onClick=()=>{}
}, ref) => {
    if(!reverse) {
        return (
            <div ref={ref} className={className + " flex flex-row"}>
                <Image
                src={image}
                alt="keyboard"
                width={300}
                height={450}
                className="w-[112px] h-[168px]
                xsmll:w-[150px] xsmll:h-[225px]
                smllr:w-[200px] smllr:h-[300px]
                lg:w-[300px] lg:h-[450px]
                md:w-[200px] md:h-[300px]
                rounded-tl-3xl rounded-bl-3xl"
                />
                {descImage &&
                <div className="flex flex-row relative">
                    <Image
                    src={descImage}
                    alt="keyboardBg"
                    width={675}
                    height={450}
                    className="w-[253px] h-[169px]
                    xsmll:w-[337px] xsmll:h-[225px]
                    smllr:w-[450px] smllr:h-[300px]
                    lg:w-[675px] lg:h-[450px]
                    md:w-[450px] md:h-[300px]
                    rounded-tr-3xl rounded-br-3xl brightness-50"
                    />
                    <div className="flex flex-col absolute
                    p-2
                    xsmll:p-4
                    smllr:p-6
                    md:p-8">
                        <div className="flex flex-row">
                            <h2 className="
                            text-base
                            xsmll:text-lg
                            smllr:text-xl
                            md:text-2xl
                            lg:text-3xl
                            font-azeretmono text-white">
                                {title}
                            </h2>
                            <div className="smllr:hidden flex ml-4">
                                <PurchaseButton
                                text="Buy Now"
                                color="bg-buttonInCont"
                                className="w-20 h-8 text-sm"
                                onClick={onClick}
                                />
                            </div>
                        </div>
                        <p className="
                        text-xs
                        xsmll:text-sm
                        smllr:text-sm
                        md:text-base
                        lg:text-lg
                        font-azeretmono text-white mt-4">
                            {description}
                        </p>
                        <div className="mt-4 smllr:flex hidden">
                            <PurchaseButton
                            text="Buy Now"
                            color="bg-buttonInCont"
                            onClick={onClick}
                            />
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }

    return (
        <div ref={ref} className={className + " flex flex-row"}>
            {descImage &&
            <div className="flex flex-row relative">
                <Image
                src={descImage}
                alt="keyboardBg"
                width={675}
                height={450}
                className="w-[253px] h-[169px]
                xsmll:w-[337px] xsmll:h-[225px]
                smllr:w-[450px] smllr:h-[300px]
                lg:w-[675px] lg:h-[450px]
                md:w-[450px] md:h-[300px]
                rounded-tl-3xl rounded-bl-3xl brightness-50"
                />
                <div className="flex flex-col absolute
                p-2
                xsmll:p-4
                smllr:p-6
                md:p-8">
                    <div className="flex flex-row">
                            <h2 className="
                            text-base
                            xsmll:text-lg
                            smllr:text-xl
                            md:text-2xl
                            lg:text-3xl
                            font-azeretmono text-white">
                                {title}
                            </h2>
                            <div className="smllr:hidden flex ml-4">
                                <PurchaseButton
                                text="Buy Now"
                                color="bg-buttonInCont"
                                className="w-20 h-8 text-sm"
                                onClick={onClick}
                                />
                            </div>
                        </div>
                    <p className="
                    text-xs
                    xsmll:text-sm
                    smllr:text-sm
                    md:text-base
                    lg:text-lg
                    font-azeretmono text-white mt-4">
                        {description}
                    </p>
                    <div className="mt-4 smllr:flex hidden">
                        <PurchaseButton
                        text="Buy Now"
                        color="bg-buttonInCont"
                        onClick={onClick}
                        />
                    </div>
                </div>
            </div>
            }
            <Image
            src={image}
            alt="keyboard"
            width={300}
            height={450}
            className="w-[112px] h-[169px]
            xsmll:w-[150px] xsmll:h-[225px]
            smllr:w-[200px] smllr:h-[300px]
            lg:w-[300px] lg:h-[450px]
            md:w-[200px] md:h-[300px]
            rounded-tr-3xl rounded-br-3xl"
            />
        </div>
    )
})

PicAndDescCont.displayName = 'PicAndDescCont';
export default PicAndDescCont;