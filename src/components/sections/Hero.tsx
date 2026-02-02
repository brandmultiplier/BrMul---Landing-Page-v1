"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Button from "../ui/Button";
import HeroZoomTitle from "../ui/HeroZoomTitle";
import ConnectedModules from "../ui/ConnectedModules";

export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
    const { scrollY } = useScroll();

    // Parallax & Fade for background elements
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Words for the zoom title effect - "Your" is prepended by component
    const words = ["Sales", "Team", "Is"];

    return (
        <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 lg:pt-0">
            {/* Ambient Background Elements (Subtle Glow) */}
            <motion.div
                style={{ y: y1, opacity }}
                className="absolute inset-0 pointer-events-none z-0"
            >
                {/* Fallback blob for depth/atmosphere - Shifted right slightly */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent-purple/5 rounded-full blur-[100px]" />
            </motion.div>

            <div className="container-width relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full py-12">

                {/* LEFT COLUMN: Text Content */}
                <div className="flex flex-col justify-center items-start text-left order-2 lg:order-1">

                    {/* SUPER HEADLINE - ZOOM EFFECT */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-6 w-full"
                    >
                        <div className="mb-3 origin-left transform">
                            <HeroZoomTitle
                                titlePhrases={["Your", ...words]}
                                subtitle="40% Less Effective."
                            />
                        </div>
                    </motion.div>

                    {/* Subheadline & CTAs layout */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-xl space-y-8"
                    >
                        <p className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed">
                            We extract the story in your head and turn it into a system your team can execute—so you stop being the bottleneck.
                        </p>

                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            <div className="flex flex-col items-start gap-2">
                                <a href="#cta">
                                    <Button className="w-full sm:w-auto px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-[#A855F7] to-[#6366F1] border border-white/20 rounded-full shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:shadow-[0_0_60px_rgba(168,85,247,0.8)] hover:scale-105 transition-all duration-300">
                                        Schedule Your Rumble
                                    </Button>
                                </a>
                                <span className="text-xs text-text-tertiary uppercase tracking-wider pl-1">3 hours. One session. No fluff.</span>
                            </div>

                            <a href="#case-studies" className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors pt-4 sm:pt-0">
                                <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white/80">
                                    See How We Generated $1B
                                </span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Social Proof (Moved here or keep at bottom? Let's keep it compacted below stats or spanning. 
                        Let's put stats below text in the same column for now to balance visual weight.) 
                    */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/5 pt-8 mt-12 w-full max-w-lg"
                    >
                        {[
                            { label: "Rev Generated", value: "$1B+" },
                            { label: "Founders Freed", value: "120+" },
                        ].map((stat, i) => (
                            <div key={i} className="text-left group cursor-default">
                                <div className="text-3xl font-light text-white mb-1 group-hover:text-accent-purple transition-colors duration-300">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: Connected Modules Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center order-1 lg:order-2"
                >
                    {/* The Module Visualization Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ConnectedModules />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
