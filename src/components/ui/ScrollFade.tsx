"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollFadeProps {
    children: React.ReactNode;
    className?: string;
}

export default function ScrollFade({ children, className = "" }: ScrollFadeProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Mimic Hero effect: Fade out/scale down as it leaves text viewport
    const y = useTransform(scrollYProgress, [0, 1], [0, 50]); // Reduced parallax movement
    const opacity = useTransform(scrollYProgress, [0, 0.95], [1, 0.4]); // Much lighter fade (min 0.4 opacity)
    const scale = useTransform(scrollYProgress, [0, 0.95], [1, 0.99]); // Almost imperceptible scale down

    return (
        <motion.div
            ref={containerRef}
            style={{ y, opacity, scale }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
