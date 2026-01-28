"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

export default function NeuralNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let width = 0;
        let height = 0;

        const resize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(Math.floor((width * height) / 25000), 100); // Reduced density for mobile

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5, // Slow movement
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connections
            ctx.strokeStyle = "rgba(168, 85, 247, 0.15)"; // Accent purple low opacity
            ctx.lineWidth = 1;

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];

                // Move particles
                p1.x += p1.vx;
                p1.y += p1.vy;

                // Bounce off walls
                if (p1.x < 0 || p1.x > width) p1.vx *= -1;
                if (p1.y < 0 || p1.y > height) p1.vy *= -1;

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 - dist / 150 * 0.4})`;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Draw particle
                ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                ctx.beginPath();
                ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener("resize", resize);
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full pointer-events-none"
        />
    );
}
