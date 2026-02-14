"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
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
    },
    {
        name: "Jeff Jones",
        title: "Founder/CEO",
        company: "Apto Solutions",
        quote: "With BrandMultiplier's help, we're poised to change and lead the industry with a unique, strong, and authentic brand narrative, sharp strategy, and fresh marketing tactics.",
        metric: "+41% revenue YOY",
        metricDetail: "Increased revenue 41% year-over-year",
        stars: 5,
    },
    {
        name: "Yair Levin",
        title: "VP of Product",
        company: "FinTech",
        quote: "Our high expectations were fully met, and exceeded, throughout the engagement, and the added value far outweighed the total cost.",
        metric: "+18% conversion rates",
        metricDetail: "Increased conversion rates by 18%",
        stars: 5,
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
    },
];

export default function Testimonials() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    const checkScroll = () => {
        const el = scrollContainerRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 10);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };

    // Auto-scroll functionality (Continuous Smooth Scroll)
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        let animationFrameId: number;
        const speed = 0.5; // Pixels per frame - adjust for speed

        const animate = () => {
            if (isPaused) {
                // Keep requesting frames even if paused, so we can resume instantly
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            // Check if we've scrolled past the first set of items (halfway)
            // We use scrollWidth / 2 because we duplicated the items
            if (el.scrollLeft >= (el.scrollWidth / 2)) {
                // Reset to start (seamlessly)
                el.scrollLeft = 0;
            } else {
                el.scrollLeft += speed;
            }
            
            animationFrameId = requestAnimationFrame(animate);
        };

        // Start the animation loop
        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]); // Re-run effect if pause state changes

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        checkScroll();
        el.addEventListener("scroll", checkScroll, { passive: true });
        window.addEventListener("resize", checkScroll);
        return () => {
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    const scroll = (direction: "left" | "right") => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const cardWidth = el.querySelector("div[data-card]")?.clientWidth ?? 340;
        const gap = 24;
        const amount = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
        el.scrollBy({ left: amount, behavior: "smooth" });
    };

    return (
        <section ref={sectionRef} id="testimonials" className="section-spacing bg-bg-page relative overflow-hidden">
            <ScrollFade className="container-width relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
                    <div>
                        <span className="text-white text-sm font-medium tracking-[0.2em] uppercase mb-6 block">
                            What Founders Say
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tighter leading-tight">
                            Real Results.<br />
                            <span className="text-white/40">Real <span className="text-[#F36901]">Leaders</span>.</span>
                        </h2>
                    </div>

                    {/* Desktop Navigation Arrows */}
                    <div className="hidden sm:flex items-center gap-3">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={`p-3 rounded-full border transition-all duration-200 ${
                                canScrollLeft
                                    ? "border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                                    : "border-white/5 text-white/20 cursor-not-allowed"
                            }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={`p-3 rounded-full border transition-all duration-200 ${
                                canScrollRight
                                    ? "border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                                    : "border-white/5 text-white/20 cursor-not-allowed"
                            }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Cards Slider */}
                <div className="relative">
                    {/* Fade edges */}
                    <div className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-bg-page to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0"}`} />
                    <div className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-bg-page to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0"}`} />

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    >
                        {[...testimonials, ...testimonials].map((t, i) => (
                            <motion.div
                                key={i}
                                data-card
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: (i % testimonials.length) * 0.1 }}
                                className="min-w-[300px] sm:min-w-[360px] max-w-[400px] flex-shrink-0 snap-start"
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

                {/* Mobile scroll indicator */}
                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-text-tertiary sm:hidden">
                    <span>Swipe for more</span>
                    <span>→</span>
                </div>
            </ScrollFade>
        </section>
    );
}
