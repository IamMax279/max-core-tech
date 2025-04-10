import { useEffect, useRef } from "react";

export default function useIntersectionObserver(callback: () => void, options = {}) {
    const targetRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting) {
                callback()
                observer.unobserve(entry.target)
            }
        }, options)

        if(targetRef.current) {
            observer.observe(targetRef.current)
        }

        return () => {
            if(targetRef.current) {
                observer.unobserve(targetRef.current)
            }
        }
    }, [callback, options])

    return targetRef
}