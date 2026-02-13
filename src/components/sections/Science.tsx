"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import NeuralNetwork from "@/components/ui/NeuralNetwork";
import ScrollFade from "@/components/ui/ScrollFade";

export default function Science() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

    return (
        <section ref={sectionRef} className="section-spacing bg-bg-page relative overflow-hidden">
            {/* Neural Network Background */}
            <NeuralNetwork />

            {/* Ambient Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050505]/50 to-[#050505] pointer-events-none" />

            <ScrollFade className="container-width text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto mb-20"
                >
                    <span className="text-white text-sm font-medium tracking-[0.2em] uppercase mb-8 block">
                        The Science
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-8 font-medium tracking-tighter leading-tight">
                        This Isn&apos;t Design. <br />
                        <span className="text-gradient">It&apos;s Biology.</span>
                    </h2>
                    <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-12">
                        We don&apos;t guess. We engineer narrative to trigger specific neurochemical responses that <span className="text-[#F36901]">drive complex B2B decision making</span>.
                    </p>

                    <div className="relative py-12 px-6">
                        {/* Subtle glowing backdrop for the quote */}
                        <div className="absolute inset-0 bg-accent-purple/10 blur-[60px] rounded-full pointer-events-none" />

                        <p className="relative text-2xl md:text-3xl lg:text-4xl text-white leading-tight font-light max-w-5xl mx-auto tracking-tight">
                            &ldquo;Oxytocin release during narrative increases trust and cooperation. Neural coupling synchronizes the listener’s brain with the speaker’s. Cortisol-to-dopamine sequence during tension-resolution creates memory encoding <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#6366f1] font-normal">22x stronger</span> than facts alone.&rdquo;
                        </p>
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <div className="h-[1px] w-12 bg-white/20" />
                            <div className="text-sm md:text-base text-text-secondary uppercase tracking-[0.2em] font-medium">Peer-reviewed research</div>
                            <div className="h-[1px] w-12 bg-white/20" />
                        </div>
                    </div>
                </motion.div>
            </ScrollFade>
        </section>
    );
}
