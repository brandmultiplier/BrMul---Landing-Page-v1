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
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]); // Less parallax than Hero (300) to avoid overlaps
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

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
