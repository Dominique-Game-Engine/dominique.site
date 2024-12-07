import {useEffect, useRef} from "react";

const smooth = (v: number, target: number, smoothness: number) => {
    return v + (target - v) / smoothness;
}

const noSmooth = (v: number) => v;

export function useScrollPosition(callback: (scrollPosition: number) => void, smoothFunction = noSmooth) {
    const value = useRef(0);
    useEffect(() => {
        const handleScroll = () => {
            const v =
                window.scrollY /
                (document.body.clientHeight - window.innerHeight);
            value.current = smoothFunction(v);
            callback(value.current);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return null;
}