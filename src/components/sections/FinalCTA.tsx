"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import ScrollFade from "@/components/ui/ScrollFade";

export default function FinalCTA() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

    return (
        <section ref={sectionRef} id="cta" className="section-spacing bg-bg-page">
            <ScrollFade className="container-width relative z-10">
                {/* Soft Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 sm:mb-16 md:mb-24" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-medium tracking-tighter leading-tight mb-6 sm:mb-8">
                        <span className="text-[#F36901]">Stop</span> being <br />
                        the bottleneck.
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 sm:mb-10 leading-relaxed">
                        We extract the story. We deploy the system. <br />
                        <span className="text-white">Your team sells like you do.</span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-md mx-auto clean-card bg-[#0A0A0A]"
                >
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full h-12 px-4 rounded-lg bg-white/5 border border-border-subtle text-white focus:border-accent-purple focus:outline-none transition-colors"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full h-12 px-4 rounded-lg bg-white/5 border border-border-subtle text-white focus:border-accent-purple focus:outline-none transition-colors"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Work Email"
                            className="w-full h-12 px-4 rounded-lg bg-white/5 border border-border-subtle text-white focus:border-accent-purple focus:outline-none transition-colors"
                        />
                        <input
                            type="text"
                            placeholder="Company Name"
                            className="w-full h-12 px-4 rounded-lg bg-white/5 border border-border-subtle text-white focus:border-accent-purple focus:outline-none transition-colors"
                        />
                        <div className="relative">
                            <select
                                className="w-full h-12 px-4 rounded-lg bg-white/5 border border-border-subtle text-white focus:border-accent-purple focus:outline-none transition-colors appearance-none cursor-pointer"
                                defaultValue=""
                            >
                                <option value="" disabled className="bg-[#0A0A0A] text-text-tertiary">Approximate ARR</option>
                                <option value="under-3m" className="bg-[#0A0A0A]">Under $3M</option>
                                <option value="3m-10m" className="bg-[#0A0A0A]">$3M - $10M</option>
                                <option value="10m-50m" className="bg-[#0A0A0A]">$10M - $50M</option>
                                <option value="50m+" className="bg-[#0A0A0A]">$50M+</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-tertiary">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <button className="btn-primary w-full justify-center h-12">
                            Schedule The Diagnostic
                        </button>
                        <p className="text-[10px] sm:text-xs text-text-tertiary text-center mt-4 uppercase tracking-wider flex flex-col gap-1">
                            <span>30 minutes or less.</span>
                            <span>Walk away knowing if your problem is structural, or not.</span>
                        </p>
                    </form>
                </motion.div>
            </ScrollFade>
        </section>
    );
}
