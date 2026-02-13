"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollFade from "@/components/ui/ScrollFade";
import { Check, X } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Alternatives() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

    const comparisonData = [
        {
            feature: "The Output",
            agency: "Delivers a deck that sits in a drawer",
            fractional: "Rents expertise that leaves when they do",
            brandMultiplier: "Installs a system that stays forever"
        },
        {
            feature: "The Cost",
            agency: "$15K-$30K for a PDF nobody opened",
            fractional: "$4K-$30K/month ongoing dependency",
            brandMultiplier: "$7.5K-$25K/month for 75 days. Then the system is yours."
        },
        {
            feature: "The Metric",
            agency: "Measures impressions",
            fractional: "Measures activity",
            brandMultiplier: "Measures CAC, velocity, LTV"
        },
        {
            feature: "The Timeline",
            agency: "6 months, then gone",
            fractional: "Person-dependent",
            brandMultiplier: "System-independent"
        }
    ];

    return (
        <section ref={sectionRef} className="section-spacing bg-bg-page relative">
            <ScrollFade className="container-width relative z-10">
                <div className="text-center mb-20">
                    <span className="text-accent-purple text-sm font-bold tracking-[0.2em] uppercase mb-8 block">
                        The Broken Alternatives
                    </span>
                    <h2 className="text-4xl md:text-5xl text-white font-medium tracking-tighter mb-8">
                        You&apos;ve Tried This Before.<br />
                        <span className="text-white/40">It <span className="text-[#F36901]">Didn&apos;t Work</span>.</span>
                    </h2>
                </div>

                {/* Comparison Table */}
                <div className="max-w-6xl mx-auto overflow-x-auto">
                    <div className="min-w-[800px] grid grid-cols-4 gap-6 mb-8 text-sm uppercase tracking-wider font-medium text-text-tertiary border-b border-white/10 pb-6">
                        <div className="pl-6">Comparison</div>
                        <div>Brand Agency</div>
                        <div>Fractional CMO</div>
                        <div className="text-accent-purple">BrandMultiplier</div>
                    </div>

                    <div className="space-y-4">
                        {comparisonData.map((row, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="min-w-[800px] grid grid-cols-4 gap-6 p-6 rounded-xl hover:bg-white/5 transition-colors items-center group relative overflow-hidden"
                            >
                                {/* Highlight specifically the BrandMultiplier column */}
                                <div className="absolute top-0 bottom-0 right-0 w-[25%] bg-accent-purple/5 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="font-medium text-white/60">{row.feature}</div>
                                <div className="text-text-secondary flex items-start gap-2">
                                    <X className="w-4 h-4 text-red-500/50 mt-1 shrink-0" />
                                    <span>{row.agency}</span>
                                </div>
                                <div className="text-text-secondary flex items-start gap-2">
                                    <X className="w-4 h-4 text-red-500/50 mt-1 shrink-0" />
                                    <span>{row.fractional}</span>
                                </div>
                                <div className="text-white font-medium flex items-start gap-2">
                                    <Check className="w-4 h-4 text-accent-purple mt-1 shrink-0" />
                                    <span>{row.brandMultiplier}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* First Sales Hire Callout */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 }}
                        className="mt-8 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-center md:text-left relative overflow-hidden group"
                    >
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                            <div className="text-red-400 font-bold uppercase tracking-wider text-sm shrink-0 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                                The Hidden Cost
                            </div>
                            <div className="text-text-secondary leading-relaxed text-lg">
                                <span className="text-white font-medium">First Sales Hire:</span> $150K-$250K per failed attempt. 70% fail within a year. Average company spends <span className="text-white font-medium">$300K-$750K</span> and 18-36 months before realizing the problem was never people.
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="max-w-3xl mx-auto text-center mt-20">
                    <p className="text-xl text-text-secondary leading-relaxed">
                        Every founder we work with has been burned before. Agencies that didn&apos;t "get" them. Marketing hires that didn&apos;t work out. Fractional CMOs who brought expertise in but couldn&apos;t pull the founder&apos;s expertise out.
                    </p>
                    <p className="text-white mt-6 text-lg font-medium">
                        We solve a different problem: extraction and systematization.
                    </p>
                    <div className="mt-12">
                        <a href="#cta">
                            <Button className="px-8 py-4 text-base">
                                Stop the Cycle <span className="ml-2">→</span>
                            </Button>
                        </a>
                    </div>
                </div>
            </ScrollFade>
        </section>
    );
}
