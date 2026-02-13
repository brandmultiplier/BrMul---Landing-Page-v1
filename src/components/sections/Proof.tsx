"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import ScrollFade from "@/components/ui/ScrollFade";

export default function Proof() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

    return (
        <section ref={sectionRef} id="case-studies" className="section-spacing bg-bg-page relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-accent-indigo/5 to-transparent pointer-events-none" />

            <ScrollFade className="container-width relative z-10">
                <div className="max-w-4xl mb-16 sm:mb-24">
                    <span className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-8 block pl-1">
                        The Proof
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-[1.1]">
                        We Measure What Matters. <br />
                        <span className="text-white/40">Not Impressions. <span className="text-[#F36901]">Revenue</span>.</span>
                    </h2>
                </div>

                {/* Featured Case Study - Full Width Feature Block */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="clean-card mb-8 p-0 overflow-hidden border-accent-indigo/20 bg-[#080808]"
                >
                    <div className="grid lg:grid-cols-2 lg:min-h-[500px]">
                        <div className="p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-[#0A0A0A] to-[#050505] relative">
                            {/* Corner Accent */}
                            <div className="absolute top-0 left-0 w-32 h-32 bg-accent-indigo/5 blur-[80px]" />

                            <div>
                                <div className="inline-flex items-center mb-8">
                                    <div className="relative h-8 w-auto">
                                        <img
                                            src="/accenture-logo.png"
                                            alt="Accenture Interactive"
                                            className="h-full w-auto object-contain brightness-0 invert"
                                        />
                                    </div>
                                    {/* <span className="text-white font-medium tracking-wide">Accenture Interactive</span> */}
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-medium mb-6 sm:mb-8 leading-snug">
                                    Unified 5,000+ practitioners across 40 countries.
                                </h3>

                                <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-10">
                                    <div>
                                        <div className="text-text-tertiary text-xs uppercase tracking-wider mb-2">Starting Point</div>
                                        <p className="text-text-secondary text-sm sm:text-base md:text-lg">20+ pitch teams, 54% win rate, inconsistent narratives</p>
                                    </div>
                                    <div className="h-px w-full bg-white/5" />
                                    <div>
                                        <div className="text-accent-indigo text-xs uppercase tracking-wider mb-2">After Installing NOS</div>
                                        <ul className="space-y-2 sm:space-y-3 text-white/90 text-sm sm:text-base md:text-lg">
                                            <li className="flex items-center gap-3">
                                                <span className="w-1.5 h-1.5 bg-accent-indigo rounded-full" />
                                                $1B+ new revenue in 12 months
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="w-1.5 h-1.5 bg-accent-indigo rounded-full" />
                                                Win rate jumped to 88% (+34 points)
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="w-1.5 h-1.5 bg-accent-indigo rounded-full" />
                                                Became #1 ranked digital agency globally
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="bg-[#050505] p-6 sm:p-8 md:p-12 lg:p-16 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid opacity-20" />
                            <div className="relative z-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 md:gap-x-12 md:gap-y-16">
                                <div>
                                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tighter mb-2 sm:mb-4">$1B</div>
                                    <div className="text-[10px] sm:text-xs font-bold text-text-tertiary uppercase tracking-[0.2em]">Attributed Revenue</div>
                                </div>
                                <div>
                                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tighter mb-2 sm:mb-4">88%</div>
                                    <div className="text-[10px] sm:text-xs font-bold text-text-tertiary uppercase tracking-[0.2em]">Win Rate</div>
                                </div>
                                <div>
                                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tighter mb-2 sm:mb-4">#1</div>
                                    <div className="text-[10px] sm:text-xs font-bold text-text-tertiary uppercase tracking-[0.2em]">Global Ranking</div>
                                </div>
                                <div>
                                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-accent-indigo tracking-tighter mb-2 sm:mb-4">+34</div>
                                    <div className="text-[10px] sm:text-xs font-bold text-text-tertiary uppercase tracking-[0.2em]">NPS Increase</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Additional Stats Grid */}
                <div className="mt-24 sm:mt-32">
                    <div className="max-w-4xl mb-16 sm:mb-24 space-y-6 sm:space-y-8">
                        <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-light leading-tight">
                            This methodology was proven at Accenture’s scale.
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl text-text-secondary font-light leading-relaxed max-w-3xl">
                            We’ve since refined it for the specific challenge founder-led B2B companies face between $3M-$50M: <span className="text-white font-medium">getting the story out of one person’s head and into a system.</span>
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            { val: "120+", label: "founder-led B2B companies transformed" },
                            { val: "30%+", label: "average CAC reduction within 6 months" },
                            { val: "35%+", label: "deal cycle acceleration" },
                            { val: "75%", label: "retention beyond initial engagement" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                className="bg-[#0A0A0A] border border-white/5 p-6 sm:p-8 rounded hover:border-white/10 transition-colors group"
                            >
                                <div className="text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mb-3 sm:mb-4 group-hover:text-accent-indigo transition-colors">{stat.val}</div>
                                <div className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider font-medium leading-relaxed">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </ScrollFade>
        </section>
    );
}
