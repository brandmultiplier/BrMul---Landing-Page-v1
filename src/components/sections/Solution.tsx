"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollFade from "@/components/ui/ScrollFade";
import Button from "../ui/Button";

export default function Solution() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

    const steps = [
        {
            num: "01",
            title: "Rumble",
            desc: "3 hours. One session. We excavate what makes you close deals when you're in the room—including the parts you've never articulated. The same methodology that generated $1B+ for Accenture."
        },
        {
            num: "02",
            title: "Architect",
            desc: "We codify your story using our 5-Phase Storyline methodology, backed by 38 peer-reviewed neuroscience studies. Not a deck—a living system your team can execute from."
        },
        {
            num: "03",
            title: "Install",
            desc: "We wire the narrative across sales, marketing, and product. Voice Fidelity Gates ensure every piece 'sounds like you.' Your team passes a fluency test before we're done."
        },
        {
            num: "04",
            title: "Tune",
            desc: "Quarterly optimization on CAC, deal velocity, and LTV. Not vanity metrics—the numbers your board cares about. The system learns and improves."
        }
    ];

    return (
        <section ref={sectionRef} id="system" className="section-spacing bg-bg-page relative overflow-hidden">
            {/* Background Gradient Line */}
            <div className="absolute left-[30px] md:left-1/2 top-40 bottom-40 w-[1px] bg-gradient-to-b from-transparent via-accent-purple/50 to-transparent -z-10" />

            <ScrollFade className="container-width relative z-10">
                <div className="text-center mb-20 max-w-4xl mx-auto">
                    <span className="text-accent-purple text-sm font-bold tracking-[0.2em] uppercase mb-8 block">
                        The System
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tighter mb-8">
                        We Don&apos;t Deliver Decks.<br />
                        <span className="text-white/40">We Install Systems.</span>
                    </h2>
                    <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
                        A Narrative Operating System extracts what&apos;s in your head, codifies it into architecture, and deploys it across your team. The system stays. We don&apos;t have to.
                    </p>
                </div>

                <div className="space-y-16 md:space-y-24 relative">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className={`flex flex-col md:flex-row gap-8 md:gap-20 items-start md:items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Number & Icon Area */}
                            <div className="md:w-1/2 flex justify-start md:justify-end relative">
                                <div className={`text-[8rem] md:text-[10rem] font-bold leading-none text-white/5 absolute -top-10 ${i % 2 === 1 ? 'md:-right-10 left-0' : 'md:-left-10 right-0'}`}>
                                    {step.num}
                                </div>
                                <div className={`relative z-10 p-8 rounded-2xl bg-[#121217] border border-white/5 w-full max-w-md ${i % 2 === 1 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                    <div className="text-accent-purple text-lg font-bold tracking-widest uppercase mb-2">
                                        Phase {step.num}
                                    </div>
                                    <h3 className="text-3xl text-white font-medium mb-4">{step.title}</h3>
                                    <p className="text-text-secondary leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Empty space for zig-zag balance */}
                            <div className="hidden md:block md:w-1/2" />
                        </motion.div>
                    ))}
                </div>

            </ScrollFade>
        </section>
    );
}
