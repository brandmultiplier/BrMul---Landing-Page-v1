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
            agency: "$200K-$500K for output that decays",
            fractional: "$4K-$30K/month ongoing dependency",
            brandMultiplier: "$30K-$60K one-time infrastructure"
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
                        <span className="text-white/40">It Didn&apos;t Work.</span>
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
