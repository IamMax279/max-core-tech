import { forwardRef } from "react";

interface BigTitleProps {
    text: string;
    className: string;
    color?: string;
    gap?: string
}

const BigTitle = forwardRef<HTMLDivElement, BigTitleProps>(({ text, className, color, gap }, ref) => {
    return (
        <div ref={ref} className={`${className}`}>
            <h1 className={`
                font-orbitron text-3xl
                sm:text-6xl
                lg:text-7xl
                ${color}
            `}>
                <span className={`
                    font-orbitron text-5xl relative left-[8px]
                    sm:text-8xl sm:left-[12px]
                    lg:text-9xl lg:left-6
                    ${gap || ''}
                `}>
                    {text[0]}
                </span>
                {text.substring(1)}
            </h1>
        </div>
    );
});

BigTitle.displayName = 'BigTitle'
export default BigTitle;