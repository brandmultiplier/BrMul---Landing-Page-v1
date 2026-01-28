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
                <div className="max-w-4xl mb-24">
                    <span className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-8 block pl-1">
                        The Proof
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl text-white font-medium tracking-tight leading-[1.1]">
                        We Measure What Matters. <br />
                        <span className="text-white/40">Not Impressions. Revenue.</span>
                    </h2>
                </div>

                {/* Featured Case Study - Full Width Feature Block */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="clean-card mb-24 p-0 overflow-hidden border-accent-indigo/20 bg-[#080808]"
                >
                    <div className="grid lg:grid-cols-2 min-h-[500px]">
                        <div className="p-12 md:p-16 flex flex-col justify-center bg-gradient-to-br from-[#0A0A0A] to-[#050505] relative">
                            {/* Corner Accent */}
                            <div className="absolute top-0 left-0 w-32 h-32 bg-accent-indigo/5 blur-[80px]" />

                            <div>
                                <div className="inline-flex items-center mb-10">
                                    <div className="relative h-12 w-auto">
                                        <img
                                            src="/accenture-logo.png"
                                            alt="Accenture Interactive"
                                            className="h-full w-auto object-contain brightness-0 invert"
                                        />
                                    </div>
                                    {/* <span className="text-white font-medium tracking-wide">Accenture Interactive</span> */}
                                </div>
                                <h3 className="text-3xl md:text-4xl text-white font-medium mb-8 leading-snug">
                                    Unified 5,000+ practitioners across 40 countries.
                                </h3>

                                <div className="space-y-6 mb-10">
                                    <div>
                                        <div className="text-text-tertiary text-xs uppercase tracking-wider mb-2">Starting Point</div>
                                        <p className="text-text-secondary text-lg">20+ pitch teams, 54% win rate, inconsistent narratives</p>
                                    </div>
                                    <div className="h-px w-full bg-white/5" />
                                    <div>
                                        <div className="text-accent-indigo text-xs uppercase tracking-wider mb-2">After Installing NOS</div>
                                        <ul className="space-y-2 text-white/90 text-lg">
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

                            <a href="#" className="inline-flex items-center text-white/60 hover:text-white transition-colors group text-sm font-medium uppercase tracking-wider">
                                Read the Full Case Study
                                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>

                        <div className="bg-[#050505] p-12 md:p-16 border-l border-white/5 flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid opacity-20" />
                            <div className="relative z-10 grid grid-cols-2 gap-x-12 gap-y-20">
                                <div>
                                    <div className="text-6xl md:text-8xl font-light text-white tracking-tighter mb-4">$1B</div>
                                    <div className="text-xs font-bold text-text-tertiary uppercase tracking-[0.2em]">Attributed Revenue</div>
                                </div>
                                <div>
                                    <div className="text-6xl md:text-8xl font-light text-white tracking-tighter mb-4">88%</div>
                                    <div className="text-xs font-bold text-text-tertiary uppercase tracking-[0.2em]">Win Rate</div>
                                </div>
                                <div>
                                    <div className="text-6xl md:text-8xl font-light text-white tracking-tighter mb-4">#1</div>
                                    <div className="text-xs font-bold text-text-tertiary uppercase tracking-[0.2em]">Global Ranking</div>
                                </div>
                                <div>
                                    <div className="text-6xl md:text-8xl font-light text-accent-indigo tracking-tighter mb-4">+34</div>
                                    <div className="text-xs font-bold text-text-tertiary uppercase tracking-[0.2em]">NPS Increase</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Additional Stats Grid */}
                <div className="mt-24">
                    <h3 className="text-2xl text-white/40 mb-12 font-light">What about companies your size?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                                className="bg-[#0A0A0A] border border-white/5 p-8 rounded hover:border-white/10 transition-colors group"
                            >
                                <div className="text-4xl md:text-5xl text-white font-light tracking-tight mb-4 group-hover:text-accent-indigo transition-colors">{stat.val}</div>
                                <div className="text-xs text-text-secondary uppercase tracking-wider font-medium leading-relaxed">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </ScrollFade>
        </section>
    );
}
