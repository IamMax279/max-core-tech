"use client"

import Image, { StaticImageData } from "next/image"
import PurchaseButton from "./PurchaseButton";

interface PurchaseCardProps {
    image: StaticImageData;
    price: string;
    name: string;
    description: string;
    content?: Map<string, string>;
    className?: string;
    onClick?: () => void;
}

export default function PurchaseCard({
    image,
    price,
    name,
    description,
    content=new Map<string, string>(),
    className="",
    onClick=() => {}
}: PurchaseCardProps) {
    return (
        <div className={`flex flex-col sml:flex-row items-center space-x-10 ${className}`}>
            <Image
            src={image}
            alt="item"
            width={500}
            height={500}
            className="rounded-xl"
            />
            <div className="flex flex-col self-center">
                <div className="flex mt-10 xsmll:mt-4 self-start">
                    <h1 className="text-header text-4xl">
                        {name}
                    </h1>
                </div>
                <div className="mb-4 w-72">
                    <p className="mt-6 text-textLight font-normal leading-relaxed text-start">
                        {description}
                    </p>
                </div>
                <div className="mt-4 flex flex-row space-x-6 items-center">
                    <h3 className="text-base">
                        $ {price}
                    </h3>
                    <PurchaseButton
                    text="Add To Cart"
                    color="bg-purchaseButton"
                    onClick={onClick}
                    />
                </div>
            </div>
        </div>
    )
}