"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function GlobalMouseHalo() {
    // Mouse position state
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Spring configuration for smooth "magnetic" feel
    const springConfig = { damping: 40, stiffness: 200, mass: 1 };

    // Motion values
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Update target position (centered on cursor)
            // Adjust offsets to center the 800px element
            x.set(e.clientX - 400);
            y.set(e.clientY - 400);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-[800px] h-[800px] pointer-events-none z-0 mix-blend-screen"
            style={{ x, y }}
        >
            <div
                className="w-full h-full rounded-full"
                style={{
                    background: "conic-gradient(from 0deg, #a855f7, #6366f1, #0ea5e9, #a855f7)",
                    filter: "blur(100px)",
                    opacity: 0.15, // Subtle enough to not interfere with text
                }}
            />
            {/* Inner Core for intensity */}
            <div
                className="absolute inset-[25%] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    opacity: 0.5,
                }}
            />
        </motion.div>
    );
}
