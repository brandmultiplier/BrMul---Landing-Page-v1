"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";

export default function GlobalMouseHalo() {
    const springConfig = { damping: 40, stiffness: 200, mass: 1 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);
    const isMobile = useRef(false);
    const rafId = useRef<number>(0);

    // Scroll-linked vertical position for mobile
    const { scrollY } = useScroll();

    useEffect(() => {
        isMobile.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;

        if (!isMobile.current) {
            // Desktop: follow mouse
            const handleMouseMove = (e: MouseEvent) => {
                x.set(e.clientX - 400);
                y.set(e.clientY - 400);
            };
            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        } else {
            // Mobile: gentle autonomous drift + scroll-linked Y
            const vw = window.innerWidth;
            let t = 0;

            const drift = () => {
                t += 0.008;
                // Slow figure-8 drift horizontally
                const driftX = Math.sin(t) * (vw * 0.3) + (vw / 2 - 400);
                x.set(driftX);
                rafId.current = requestAnimationFrame(drift);
            };

            // Follow scroll for Y position
            const unsubScroll = scrollY.on("change", (latest) => {
                y.set(latest + window.innerHeight * 0.3 - 400);
            });

            rafId.current = requestAnimationFrame(drift);
            // Initialize Y
            y.set(window.innerHeight * 0.3 - 400);

            return () => {
                cancelAnimationFrame(rafId.current);
                unsubScroll();
            };
        }
    }, [x, y, scrollY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-[800px] h-[800px] pointer-events-none z-[9999]"
            style={{ x, y }}
        >
            <div
                className="w-full h-full rounded-full"
                style={{
                    background: "conic-gradient(from 0deg, #a855f7, #6366f1, #0ea5e9, #a855f7)",
                    filter: "blur(120px)",
                    opacity: 0.25,
                }}
            />
            <div
                className="absolute inset-[25%] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    opacity: 0.6,
                }}
            />
        </motion.div>
    );
}
