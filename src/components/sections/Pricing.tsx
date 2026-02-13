"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollFade from "@/components/ui/ScrollFade";
import { Check, Star } from "lucide-react";
import Button from "@/components/ui/Button";

const tiers = [
    {
        name: "TRANSFORMATION",
        price: "$20-25K",
        period: "/month",
        duration: "75 days",
        features: [
            "Full leadership team involvement",
            "Category/movement framing",
            "Deep internal enablement",
            "Fastest path to independence"
        ],
        bestFor: "If budget weren’t a constraint, this is what we’d do.",
        highlight: false,
        color: "border-white/10"
    },
    {
        name: "SIGNATURE",
        price: "$12.5-15K",
        period: "/month",
        duration: "75 days",
        features: [
            "Founder-led extraction",
            "Canonical Storyline + Sales Narrative",
            "30-day milestone review",
            "Team fluency certification"
        ],
        bestFor: "This is what we recommend for most companies at your stage. The balance point: enough depth to work, enough focus to move fast.",
        highlight: true,
        recommended: true,
        color: "border-accent-purple"
    },
    {
        name: "FOUNDATION",
        price: "$7.5K",
        period: "/month",
        duration: "75 days",
        features: [
            "Core narrative clarity",
            "Limited internal rollout",
            "Slower adoption timeline"
        ],
        bestFor: "This is the minimum we’d be comfortable with and still stand behind the work.",
        highlight: false,
        color: "border-white/10"
    }
];

export default function Pricing() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

    return (
        <section ref={sectionRef} id="pricing" className="section-spacing bg-bg-page relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />

            <ScrollFade className="container-width relative z-10">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <span className="text-white text-sm font-medium tracking-[0.2em] uppercase mb-8 block">
                        Transparent Pricing
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tighter leading-tight mb-6">
                        Three Tiers. Clear Scope. <br />
                        <span className="text-white/40">No Surprises.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start max-w-6xl mx-auto">
                    {tiers.map((tier, index) => {
                        const isHighlighted = tier.highlight;

                        const CardWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative h-full ${isHighlighted ? "z-10 md:-mt-4 md:mb-4" : ""}`}
                            >
                                {children}
                            </motion.div>
                        );

                        if (isHighlighted) {
                            return (
                                <CardWrapper key={tier.name}>
                                    <fieldset className="h-full w-full border-2 border-accent-purple rounded-2xl bg-[#0A0A0A] p-0 m-0 shadow-[0_0_40px_rgba(168,85,247,0.15)] flex flex-col">
                                        <legend className="mx-auto px-4 text-[10px] font-bold uppercase tracking-widest text-accent-purple text-center">
                                            Recommended
                                        </legend>
                                        <div className="flex flex-col flex-1 px-8 pb-10 pt-2">
                                            <h3 className="text-lg font-medium tracking-wide mb-6 text-white text-center">
                                                {tier.name}
                                            </h3>

                                            <div className="mb-2 flex items-baseline justify-center gap-1">
                                                <span className="text-3xl lg:text-4xl font-light text-white tracking-tight">{tier.price}</span>
                                                <span className="text-text-tertiary text-sm">{tier.period}</span>
                                            </div>
                                            <div className="text-sm text-text-tertiary mb-8 font-mono text-center">{tier.duration}</div>

                                            <div className="w-full h-px bg-white/5 mb-8" />

                                            <div className="space-y-4 mb-8 flex-1">
                                                {tier.features.map((feature, i) => (
                                                    <div key={i} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary transition-colors">
                                                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-accent-purple" />
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="p-4 rounded-lg text-center bg-accent-purple/10 border border-accent-purple/20">
                                                <div className="text-[10px] uppercase tracking-wider text-text-tertiary mb-1">Best For</div>
                                                <div className="text-sm font-medium text-accent-purple">
                                                    {tier.bestFor}
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </CardWrapper>
                            );
                        }

                        // Standard Card
                        return (
                            <CardWrapper key={tier.name}>
                                <div className="h-full rounded-2xl backdrop-blur-md bg-[#050505] border border-white/10 hover:border-white/20 py-8 px-8 flex flex-col transition-all duration-300">
                                    <h3 className="text-lg font-medium tracking-wide mb-6 text-white/60">
                                        {tier.name}
                                    </h3>

                                    <div className="mb-2 flex items-baseline gap-1">
                                        <span className="text-3xl lg:text-4xl font-light text-white tracking-tight">{tier.price}</span>
                                        <span className="text-text-tertiary text-sm">{tier.period}</span>
                                    </div>
                                    <div className="text-sm text-text-tertiary mb-8 font-mono">{tier.duration}</div>

                                    <div className="w-full h-px bg-white/5 mb-8" />

                                    <div className="space-y-4 mb-8 flex-1">
                                        {tier.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary group-hover:text-white/80 transition-colors">
                                                <Check className="w-4 h-4 mt-0.5 shrink-0 text-white/20" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto">
                                        <div className="p-4 rounded-lg text-center bg-white/5 border border-white/5">
                                            <div className="text-[10px] uppercase tracking-wider text-text-tertiary mb-1">Best For</div>
                                            <div className="text-sm font-medium text-white/60">
                                                {tier.bestFor}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardWrapper>
                        );
                    })}
                </div>

                {/* Bridge Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    className="mt-20 mb-12 text-center max-w-3xl mx-auto"
                >
                    <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
                        “The average founder-led company has already spent <span className="text-red-400 font-normal">$100K-$500K</span> on solutions that didn’t work.”
                    </p>
                </motion.div>

                {/* Guarantee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-16 sm:mt-24 max-w-3xl mx-auto text-center"
                >
                    <div className="inline-block p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="space-y-4">
                            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                                <span className="text-white font-semibold">Risk-Free Pilot:</span> At the 30-day checkpoint, if you don’t believe this is creating real value, you can exit and only pay for work completed to date.
                            </p>
                            <div className="w-full h-px bg-white/5" />
                            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                                <span className="text-white font-semibold">Outcome Guarantee:</span> If we don&apos;t achieve the agreed outcomes within the pilot—and you&apos;ve met the participation requirements—we continue at no additional cost until we do.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <a href="#cta">
                            <Button className="px-10 py-5 text-lg">
                                Schedule The Diagnostic <span className="ml-2">→</span>
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </ScrollFade>
        </section>
    );
}
