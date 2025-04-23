import { ThreeDot } from "react-loading-indicators"

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center space-y-5">
                <h1 className="text-header text-3xl sml:text-4xl flex self-center text-center">
                    Loading
                </h1>
                <ThreeDot color="#000" size="small"/>
            </div>
        </div>
    )
}