"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

interface HeroZoomTitleProps {
    titlePhrases?: string[];
    subtitle?: string;
}

export default function HeroZoomTitle({ titlePhrases = [], subtitle = "" }: HeroZoomTitleProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // Smooth spring animation for the mask movement
    const maskX = useSpring(0, { stiffness: 150, damping: 25 });
    const maskY = useSpring(0, { stiffness: 150, damping: 25 });

    // Smooth transition for mask size
    const maskSize = useSpring(0, { stiffness: 100, damping: 25 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setMousePosition({ x, y });
            maskX.set(x);
            maskY.set(y);
        };

        const currentRef = containerRef.current;
        if (currentRef) {
            currentRef.addEventListener("mousemove", handleMouseMove);
            currentRef.addEventListener("mouseenter", () => {
                setIsHovered(true);
                maskSize.set(300); // 300px Spotlight size
            });
            currentRef.addEventListener("mouseleave", () => {
                setIsHovered(false);
                maskSize.set(0);
            });
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, [maskX, maskY, maskSize]);

    const maskImage = useMotionTemplate`radial-gradient(${maskSize}px circle at ${maskX}px ${maskY}px, black 100%, transparent)`
    const webkitMaskImage = maskImage;

    // Shared content structure to guarantee 100% alignment
    const Content = ({ variant }: { variant: 'base' | 'spotlight' }) => (
        <div className="flex flex-col gap-0 sm:gap-1 md:gap-2 w-full">
            <h1 className="text-[clamp(3.1rem,9vw,9.5rem)] leading-[0.9] font-medium tracking-tighter">
                {titlePhrases.map((word, i) => (
                    <React.Fragment key={i}>
                        <span
                            className={`inline-block mr-2 md:mr-8 transition-colors duration-200 ${variant === 'spotlight'
                                ? "text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]"  // Spotlight: Pure White + Glow
                                : (i > 0 && i < 3 ? "text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#6366f1]" : "text-white") // Base: Visible Gradient & White
                                }`}
                        >
                            {word}
                        </span>
                        {i === 2 && <br className="md:hidden" />}
                    </React.Fragment>
                ))}
            </h1>
            <h2 className={`mt-2 sm:mt-3 text-[clamp(1.4rem,4.8vw,7rem)] leading-[0.9] tracking-tighter font-light transition-colors duration-200 ${variant === 'spotlight' ? "text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]" : "text-white/40"
                }`}>
                Your team <span className={variant === 'base' ? "text-[#F36901]" : ""}>can’t</span>.
            </h2>
        </div>
    );

    return (
        <div
            ref={containerRef}
            className="relative cursor-default group py-3 sm:py-4 select-none"
        >
            {/* Layer 1: Base Text (Background) */}
            <div className="relative z-10 p-3 sm:p-4">
                <Content variant="base" />
            </div>

            {/* Layer 2: Spotlight (Revealed by Mask) */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{ WebkitMaskImage: webkitMaskImage, maskImage }}
            >
                {/* 2A: The Colored Circle Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple to-accent-indigo opacity-90 mix-blend-multiply" />

                {/* 2B: The White Text on top of the circle */}
                <div className="absolute inset-0 flex items-center justify-start p-3 sm:p-4">
                    <Content variant="spotlight" />
                </div>
            </motion.div>
        </div>
    );
}
