import { Mosaic } from "react-loading-indicators"

export default function Loading() {
    return (
        <div className="fixed inset-0 w-full h-full bg-white flex justify-center items-center">
            <Mosaic color="#080808" size="medium" text="" textColor="" />
        </div>
    )
}