"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollFade from "@/components/ui/ScrollFade";

const shifts = [
    {
        from: "Strategy Decks",
        to: "Living Systems",
        desc: "Stop paying for PDFs that rot in Drive folders.",
    },
    {
        from: "Founder Intuition",
        to: "Codified Infrastructure",
        desc: "Extract your genius so others can execute it.",
    },
    {
        from: "Vanity Metrics",
        to: "Revenue Impact",
        desc: "Measure what matters: CAC, Velocity, LTV.",
    },
];

export default function Shift() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

    return (
        <section ref={sectionRef} className="section-spacing bg-transparent border-y border-border-subtle relative">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            <ScrollFade className="container-width relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-24"
                >
                    <span className="text-accent-indigo text-sm font-medium tracking-[0.2em] uppercase mb-8 block">
                        The Shift
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tighter">
                        From "Brand as Decoration" to <br />
                        <span className="text-gradient">Brand as Infrastructure</span>
                    </h2>
                </motion.div>

                <div className="max-w-5xl mx-auto space-y-4">
                    {shifts.map((item, index) => (
                        <motion.div
                            key={item.from}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            whileHover="hover"
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            className="group relative grid md:grid-cols-[1fr_auto_1fr] items-stretch gap-0 rounded-2xl overflow-hidden border border-border-subtle hover:border-accent-indigo/30 transition-colors duration-500 bg-[#0A0A0A]/40"
                        >
                            {/* Hover Gradient Background */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-indigo/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                layoutId={`hover-bg-${index}`}
                            />

                            {/* Old Way - Fades Out */}
                            <motion.div
                                variants={{
                                    hover: { opacity: 0.4, x: -5 }
                                }}
                                className="p-8 md:p-10 flex flex-col justify-center items-end text-right border-r border-border-subtle/50 relative z-10 transition-all duration-500"
                            >
                                <span className="text-sm uppercase tracking-wider text-text-tertiary mb-2">The Old Way</span>
                                <div className="text-xl md:text-2xl text-text-secondary line-through decoration-text-tertiary/50 decoration-2 font-light">
                                    {item.from}
                                </div>
                            </motion.div>

                            {/* Arrow Indicator - Dynamic Flow */}
                            <div className="relative flex items-center justify-center w-16 border-r border-border-subtle/50 overflow-hidden bg-[#0A0A0A]/50 z-10">
                                {/* Flowing Beam */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-indigo/20 to-transparent w-[1px] mx-auto"
                                    animate={{
                                        y: ["-100%", "100%"],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: index * 0.5
                                    }}
                                />

                                <motion.div
                                    variants={{
                                        hover: { x: 5, scale: 1.1, color: "#818cf8" } // indigo-400
                                    }}
                                    className="text-text-tertiary transition-colors duration-300"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </motion.div>
                            </div>

                            {/* New Way - Lights Up */}
                            <motion.div
                                variants={{
                                    hover: { x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }
                                }}
                                className="p-8 md:p-10 flex flex-col justify-center relative z-10 transition-all duration-500"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-accent-indigo/0 group-hover:bg-accent-indigo/50 transition-colors duration-500" />

                                <span className="text-sm uppercase tracking-wider text-accent-indigo mb-2 font-medium flex items-center gap-2">
                                    The New Way
                                    <motion.span
                                        variants={{ hover: { opacity: 1, x: 0 } }}
                                        initial={{ opacity: 0, x: -5 }}
                                        className="inline-block w-1.5 h-1.5 rounded-full bg-accent-indigo"
                                    />
                                </span>
                                <div className="text-2xl md:text-3xl text-white font-medium mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-200 transition-all duration-300">
                                    {item.to}
                                </div>
                                <div className="text-base text-text-secondary leading-relaxed max-w-sm group-hover:text-slate-300 transition-colors">
                                    {item.desc}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </ScrollFade>
        </section>
    );
}
