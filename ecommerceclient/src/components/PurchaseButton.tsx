import { usePathname } from "next/navigation"
import styles from "../styles/purchasebutton.module.css"
import React from "react"
import { ThreeDot } from "react-loading-indicators"

interface PurchaseButtonProps {
    text: string
    color?: string
    className?: string
    onClick?: () => void
    type?: "submit" | "reset" | "button" | undefined
    loading?: boolean
}

export default function PurchaseButton({
    text,
    color,
    className='w-28 h-12',
    onClick=() => {},
    type="submit",
    loading=false
}: PurchaseButtonProps) {
    const pathname = usePathname()

    const adjustWidth = () => {
        if(pathname !== '/') {
            return "w-36"
        }
        return "w-28"
    }

    return (
        <button type={type} className={`${color} flex justify-center items-center ${adjustWidth()} h-12 ${className}
        cursor-pointer ${styles['on-hover']}`} onClick={onClick}>
            <p className="text-white">
                {!loading 
                ? text
                :
                <ThreeDot color="#fff" size="small" text="" textColor=""
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}/>
                }
            </p>
        </button>
    )
}