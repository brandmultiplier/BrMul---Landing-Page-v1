"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollFade from "@/components/ui/ScrollFade";

export default function Stakes() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

    return (
        <section ref={sectionRef} className="section-spacing bg-bg-page relative overflow-hidden">
            <ScrollFade className="container-width">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-24 max-w-3xl mx-auto"
                >
                    <span className="text-accent-purple text-sm font-medium tracking-[0.2em] uppercase mb-8 block">
                        The Stakes
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tighter mb-8">
                        The Fork In <br />
                        <span className="text-white/40">The Road.</span>
                    </h2>
                    <p className="text-xl text-text-secondary leading-relaxed">
                        The market is splitting. Companies with narrative infrastructure scale. Companies without it stall.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Winners - System Led */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="clean-card bg-[#0A0A0A] relative overflow-hidden border-[#22C55E]/20"
                    >
                        {/* Ambient Green Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#22C55E]/10 blur-[80px] rounded-full pointer-events-none -mt-20 -mr-20" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-10">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                                </span>
                                <span className="text-[#22C55E] font-medium uppercase tracking-[0.1em] text-sm">System-Led Company</span>
                            </div>
                            <ul className="space-y-6">
                                {[
                                    "Revenue decoupled from founder's time",
                                    "Team tells the story better than you",
                                    "Predictable growth velocity",
                                    "Premium valuation on exit"
                                ].map((item) => (
                                    <li key={item} className="flex gap-4 text-white text-lg">
                                        <span className="text-[#22C55E] font-medium">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Losers - Founder Dependent */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="clean-card bg-[#0A0A0A] relative overflow-hidden border-white/5"
                    >
                        {/* Ambient Red Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full pointer-events-none -mt-20 -mr-20" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-10">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10">
                                    <div className="w-2.5 h-2.5 rounded-full bg-text-tertiary" />
                                </span>
                                <span className="text-text-secondary font-medium uppercase tracking-[0.1em] text-sm">Founder-Dependent Company</span>
                            </div>
                            <ul className="space-y-6">
                                {[
                                    "Revenue ceiling at calendar capacity",
                                    "Sales team improvising & confused",
                                    "Unpredictable revenue lumps",
                                    "Discounted valuation (Key Person Risk)"
                                ].map((item) => (
                                    <li key={item} className="flex gap-4 text-text-secondary text-lg">
                                        <span className="text-text-tertiary font-medium">×</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </ScrollFade>
        </section>
    );
}
