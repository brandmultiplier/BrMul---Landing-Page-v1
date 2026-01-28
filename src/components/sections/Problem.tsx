"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollFade from "@/components/ui/ScrollFade";

export default function Problem() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

    const problems = [
        {
            title: "127 Days",
            desc: "Average sales cycle when you're not in the room"
        },
        {
            title: "+40%",
            desc: "Your CAC is rising while you're stuck in sales calls"
        },
        {
            title: "60%",
            desc: "Of your deals require YOU in the room to close"
        }
    ];

    return (
        <section ref={sectionRef} id="trap" className="section-spacing bg-bg-page relative">
            <ScrollFade className="container-width relative z-10">
                <div className="max-w-3xl mb-24">
                    <span className="text-accent-purple text-sm font-medium tracking-[0.2em] uppercase mb-8 block">
                        The Trap
                    </span>
                    <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tighter mb-8 max-w-2xl">
                        You&apos;re In Every Deal. <br />
                        <span className="text-white/40">That&apos;s The Problem.</span>
                    </h2>
                    <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
                        60-70% of founder-led companies stall at $7M-$12M ARR. Not because the product fails—because the founder&apos;s story doesn&apos;t scale. You close deals. Your team doesn&apos;t.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
                    {problems.map((prob, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                            className="group"
                        >
                            <h3 className="text-4xl md:text-5xl text-white font-medium mb-4 group-hover:text-accent-purple transition-colors duration-300">
                                {prob.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                {prob.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    className="mt-20 border-l-2 border-accent-purple/30 pl-8 max-w-2xl"
                >
                    <p className="text-xl text-white font-light italic">
                        "Your calendar is full of meetings only you can take. Your sales team tells a different story than you. This isn't a marketing problem. It's a systems problem."
                    </p>
                </motion.div>
            </ScrollFade>
        </section>
    );
}
