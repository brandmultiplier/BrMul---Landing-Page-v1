"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import ScrollFade from "@/components/ui/ScrollFade";

const testimonials = [
    {
        name: "Jesse Levin",
        title: "CEO",
        company: "BetterCloud",
        quote: "Absolutely recommend! The team is strong, the process is smooth, and the deliverables are insightful and actionable.",
        metric: "Regained 25% market share",
        metricDetail: "Moved from Gartner 'Visionary' to 'Leader' status",
        stars: 5,
        image: "/jesse-levin.png",
    },
    {
        name: "Jeff Jones",
        title: "Founder/CEO",
        company: "Apto Solutions",
        quote: "With BrandMultiplier's help, we're poised to change and lead the industry with a unique, strong, and authentic brand narrative, sharp strategy, and fresh marketing tactics.",
        metric: "+41% revenue YOY",
        metricDetail: "Increased revenue 41% year-over-year",
        stars: 5,
        image: "/jeff-jones.png",
    },
    {
        name: "Yair Levin",
        title: "VP of Product",
        company: "FinTech",
        quote: "Our high expectations were fully met, and exceeded, throughout the engagement, and the added value far outweighed the total cost.",
        metric: "+18% conversion rates",
        metricDetail: "Increased conversion rates by 18%",
        stars: 5,
        image: "/yair-levin.png",
    },
    {
        name: "James Tian",
        title: "CEO",
        company: "B2B Tech",
        quote: "I've truly never worked with another marketing agency like BrandMultiplier, who takes such a genuine interest in their client. You have absolutely gone above and beyond for us.",
        metric: "Enhanced pipeline & visibility",
        metricDetail: "Enhanced pipeline and visibility",
        stars: 5,
        image: "/james-tian.png",
    },
    {
        name: "MinJung Song",
        title: "COO",
        company: "Tria Beauty",
        quote: "Website sales jumped significantly after the brand refresh—we couldn't be happier. The overall value delivered far exceeded our total investment.",
        metric: "+63% web revenue, +606% referral",
        metricDetail: "Website revenue +63% YOY, referral revenue +606%",
        stars: 5,
        image: "/minjung-song.png",
    },
];

export default function Testimonials() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
    const [isPaused, setIsPaused] = useState(false);

    return (
        <section ref={sectionRef} id="testimonials" className="section-spacing bg-bg-page relative overflow-hidden">
            <ScrollFade className="container-width relative z-10">
                {/* Header */}
                <div className="mb-12 sm:mb-16">
                    <span className="text-white text-sm font-medium tracking-[0.2em] uppercase mb-6 block">
                        What Founders Say
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tighter leading-tight">
                        Real Results.<br />
                        <span className="text-white/40">Real <span className="text-[#F36901]">Leaders</span>.</span>
                    </h2>
                </div>

                {/* Cards Slider - CSS continuous scroll */}
                <div
                    className="relative overflow-hidden -mx-6"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-bg-page to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-bg-page to-transparent z-10 pointer-events-none" />

                    <div
                        className={`flex gap-6 w-max will-change-transform py-4 ${isPaused ? "animate-testimonials-scroll paused" : "animate-testimonials-scroll"}`}
                    >
                        {[...testimonials, ...testimonials].map((t, i) => (
                            <motion.div
                                key={i}
                                data-card
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: (i % testimonials.length) * 0.1 }}
                                className="min-w-[300px] sm:min-w-[360px] max-w-[400px] flex-shrink-0"
                            >
                                <div className="h-full rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-white/20 p-6 sm:p-8 flex flex-col transition-all duration-300 group">
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-5">
                                        {Array.from({ length: t.stars }).map((_, s) => (
                                            <Star key={s} className="w-4 h-4 fill-[#F36901] text-[#F36901]" />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6 flex-1">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>

                                    {/* Metric Highlight */}
                                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-accent-purple/10 to-accent-indigo/10 border border-accent-purple/20">
                                        <div className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                                            {t.metric}
                                        </div>
                                        <div className="text-xs text-text-tertiary mt-1">
                                            {t.metricDetail}
                                        </div>
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                        {t.image ? (
                                            <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden relative shrink-0">
                                                <img 
                                                    src={t.image} 
                                                    alt={t.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple/30 to-accent-indigo/30 border border-white/10 flex items-center justify-center text-white text-sm font-medium shrink-0">
                                                {t.name.split(" ").map(n => n[0]).join("")}
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-sm font-medium text-white">
                                                {t.name}
                                            </div>
                                            <div className="text-xs text-text-tertiary">
                                                {t.title}, {t.company}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-text-tertiary">
                    <span>Hover or tap to pause</span>
                </div>
            </ScrollFade>
        </section>
    );
}
