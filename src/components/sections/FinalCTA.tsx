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
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16 md:mb-24" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl text-white font-medium tracking-tighter leading-tight mb-8">
                        Stop being <br />
                        the bottleneck.
                    </h2>
                    <p className="text-xl text-text-secondary mb-10">
                        We extract the story. You deploy the system.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-md mx-auto clean-card bg-[#0A0A0A]"
                >
                    <form className="space-y-4">
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
                        <button className="btn-primary w-full justify-center h-12">
                            Schedule Your Rumble
                        </button>
                        <p className="text-xs text-text-tertiary text-center mt-4 uppercase tracking-wider">
                            3 Hours. One Session. Fixed Price.
                        </p>
                    </form>
                </motion.div>
            </ScrollFade>
        </section>
    );
}
