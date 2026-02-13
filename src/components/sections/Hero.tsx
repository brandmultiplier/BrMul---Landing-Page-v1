"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Button from "../ui/Button";
import HeroZoomTitle from "../ui/HeroZoomTitle";

export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
    const { scrollY } = useScroll();

    // Parallax & Fade for background elements
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Words for the zoom title effect
    const titlePhrases = ["You", "can", "close", "any", "room."];

    return (
        <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-32">
            {/* Ambient Background Elements (Subtle Glow) */}
            <motion.div
                style={{ y: y1, opacity }}
                className="absolute inset-0 pointer-events-none z-0"
            >
                {/* Fallback blob for depth/atmosphere */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent-purple/5 rounded-full blur-[100px]" />
            </motion.div>

            <div className="container-width relative z-10 flex flex-col items-center justify-center h-full py-8 sm:py-10 md:py-12">

                {/* 1. HERO TITLE */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-2 md:mb-6 w-full text-center flex justify-center z-20 relative"
                >
                    <div className="mb-0">
                        <HeroZoomTitle
                            titlePhrases={titlePhrases}
                            subtitle="Your team can’t."
                        />
                    </div>
                </motion.div>

                {/* 2. SUBHEADLINE & CTAS */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-2xl mx-auto space-y-6 sm:space-y-8 md:space-y-10 text-center relative z-20"
                >
                    <p className="text-base sm:text-lg md:text-xl text-text-secondary font-light leading-relaxed max-w-xl mx-auto">
                        We extract what’s in your head, and build the system that makes it travel without you—so your team closes with founder-level conviction, without founder dependency.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <a href="#cta">
                                <Button className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#A855F7] to-[#6366F1] border border-white/20 rounded-full shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:shadow-[0_0_60px_rgba(168,85,247,0.8)] hover:scale-105 transition-all duration-300">
                                    Schedule The Diagnostic
                                </Button>
                            </a>
                            <div className="flex flex-col items-center text-[10px] sm:text-xs text-text-tertiary uppercase tracking-wider gap-0.5">
                                <span>30 minutes or less.</span>
                                <span>Walk away knowing if your problem is structural, or not.</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 4. FOOTER STATS */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="w-full max-w-4xl border-t border-white/5 pt-6 md:pt-8 mt-8 md:mt-12"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10">
                        {[
                            { label: "founders freed", value: "120+" },
                            { label: "CAC reduction", value: "30%+" },
                            { label: "deal acceleration", value: "35%+" },
                            { label: "retention", value: "75%" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center group cursor-default">
                                <div className="text-2xl sm:text-2xl md:text-3xl font-light text-white mb-1 md:mb-2 group-hover:text-accent-purple transition-colors duration-300">
                                    {stat.value}
                                </div>
                                <div className="text-[9px] sm:text-[10px] md:text-xs font-medium text-text-tertiary uppercase tracking-wider group-hover:text-text-secondary transition-colors leading-relaxed">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
