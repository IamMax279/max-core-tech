import { forwardRef } from "react"
import BigTitle from "./BigTitle"

interface ItemDetailsProps {
    description: string;
    className?: string;
    params?: Array<{key: string, value: string}>;
}

const ItemDetails = forwardRef<HTMLDivElement, ItemDetailsProps>(({
    description,
    className="",
    params=new Array<{key: string, value: string}>()
}, ref) => {
    return (
        <div className={`flex flex-col w-full`}>
            <div className={`p-10 -mt-4 flex flex-col self-start opacity-0 ${className}`} ref={ref}>
                <BigTitle
                text="Details"
                gap="lg:mr-4 mr-2"
                className="xsmll:mx-[50px] lg:mx-10 flex flex-row justify-start"
                />
                <div className="w-4/5 xsmll:w-2/3 flex self-start mx-3 xsmll:mx-16">
                    <p className="mt-6 text-textLight flex self-start font-normal leading-relaxed text-start
                    text-lg">
                        {description}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center my-10">
                <div className="flex flex-col w-3/4">
                    {params.map((param, index) => (
                        <div
                        key={index}
                        className={`${index%2 == 0 ? 'bg-secondaryHeader brightness-125' : 'bg-white'}
                        py-2 flex flex-row space-x-4 items-center w-full`}
                        >
                            <p className="font-medium w-1/2 flex justify-end">
                                {param.key}:
                            </p>
                            <p className="font-normal w-1/2">
                                {param.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})

ItemDetails.displayName = 'ItemDetails'
export default ItemDetails