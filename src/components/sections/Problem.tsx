"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import ScrollFade from "@/components/ui/ScrollFade";

export default function Problem() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

    return (
        <section ref={sectionRef} id="trap" className="section-spacing bg-bg-page relative">
            <ScrollFade className="container-width relative z-10">
                <div className="max-w-5xl">
                    <span className="text-accent-purple text-sm font-medium tracking-[0.2em] uppercase mb-8 block">
                        The Trap
                    </span>

                    <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tighter mb-8 max-w-3xl">
                        You&apos;re In Every Deal. <br />
                        <span className="text-white/40">That&apos;s The <span className="text-[#F36901]">Problem</span>.</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-white leading-relaxed max-w-4xl mb-16 font-light">
                        Answer one question: <span className="font-bold">Can your sales team consistently articulate your value proposition—in a way that resonates with buyers—without you in the room?</span>
                    </p>

                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 mt-16">
                        <div className="space-y-4 border-l-2 border-white/10 pl-8 py-2">
                            <p className="text-sm text-text-tertiary uppercase tracking-wider font-semibold">What you say</p>
                            <p className="text-3xl md:text-4xl text-white font-light tracking-tight">
                                &ldquo;We just need to find the right person.&rdquo;
                            </p>
                        </div>

                        <div className="space-y-4 border-l-2 border-accent-purple pl-8 py-2">
                            <p className="text-sm text-accent-purple uppercase tracking-wider font-semibold">What it means</p>
                            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light">
                                You&apos;re framing a systems failure as a talent search because talent searches feel solvable and systems overhauls feel threatening.
                            </p>
                        </div>
                    </div>

                    {/* Non-Founder Callout */}
                    <div className="mt-16 pt-12 border-t border-white/5">
                        <div className="max-w-3xl mx-auto text-center">
                            <p className="text-lg text-text-secondary font-light leading-relaxed">
                                <span className="text-white font-medium block mb-2">Not the founder?</span>
                                Are you the one who sees this problem but can’t get the founder to act? <br />
                                We’ve built <span className="text-accent-purple">The Diagnostic</span> specifically to give you the evidence you need.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 border-t border-white/10 pt-12 mt-16">
                        {[
                            {
                                title: "70%",
                                desc: "of first sales hires fail within their first year"
                            },
                            {
                                title: "50%",
                                desc: "structural close-rate advantage you have over your best hire"
                            },
                            {
                                title: "9-12mo",
                                desc: "average ramp time before a new hire carries full quota"
                            }
                        ].map((prob, i) => (
                            <div key={i} className="group">
                                <h3 className="text-4xl md:text-5xl text-white font-medium mb-4 group-hover:text-accent-purple transition-colors duration-300">
                                    {prob.title}
                                </h3>
                                <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                                    {prob.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollFade>
        </section>
    );
}
