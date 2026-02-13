"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollFade from "@/components/ui/ScrollFade";
import { FileText, Mic, Layout, Award, BarChart3, CheckCircle } from "lucide-react";

import Button from "@/components/ui/Button";

export default function NarrativeOS() {
    const containerRef = useRef<HTMLDivElement>(null);
    // Trigger animation when the section is 30% in view
    const isInView = useInView(containerRef, { once: false, margin: "-30% 0px -30% 0px" });

    const deliverables = [
        {
            icon: FileText,
            title: "Narrative Snapshot",
            desc: "Your story distilled to its essential truth—in your voice",
            id: "snapshot"
        },
        {
            icon: Layout,
            title: "Strategic Sales Narrative Deck",
            desc: "The exact slides and talk tracks that close enterprise deals",
            id: "deck"
        },
        {
            icon: Mic,
            title: "Voice Profile",
            desc: "Documented patterns so any team member can sound \"like you\"",
            id: "voice"
        },
        {
            icon: Award,
            title: "Team Fluency Certification",
            desc: "Your team passes an articulation test before we're done",
            id: "cert"
        },
        {
            icon: BarChart3,
            title: "Daily Optimization Dashboard",
            desc: "CAC, velocity, LTV—tracked and improved over time",
            id: "dash"
        }
    ];

    return (
        <section ref={containerRef} className="relative min-h-screen w-full bg-bg-page flex items-center py-24 lg:py-32 overflow-hidden">

            {/* Background Elements */}

            <ScrollFade className="container-width relative z-10">
                {/* Header - Stacks on mobile, top of flow on desktop */}
                <div className="mb-14 lg:mb-24 max-w-2xl">
                    <div className="text-sm font-semibold tracking-[0.2em] text-white uppercase mb-8 ml-1">
                        System Installation
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-6 sm:mb-8 font-medium tracking-tighter">
                        What You <br />
                        <span className="text-white/50">Actually <span className="text-[#F36901]">Get</span>.</span>
                    </h2>
                    <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-lg font-light">
                        Not a 100-page PDF that sits in a drawer. A living system your team uses every day.
                    </p>
                    <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-lg font-medium mt-5 sm:mt-6 border-l-2 border-accent-purple pl-4 italic">
                        "We don’t leave until your team passes. If they can’t articulate your value proposition without notes, we’re not done."
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Column: Static List (No longer controls animation directly) */}
                    <div className="relative z-10 space-y-5 sm:space-y-7">
                        {deliverables.map((item, i) => (
                            <NarrativeItem
                                key={i}
                                item={item}
                                index={i}
                                // We pass the global "isInView" to highlight all items or cascade them if needed
                                // helping the user see the connection, but the main "BAM" is the cards.
                                show={isInView}
                            />
                        ))}
                    </div>

                    {/* Mobile-only animated module strip */}
                    <div className="md:hidden relative">
                        <div className="relative overflow-hidden">
                            <motion.div
                                className="flex gap-4"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                            >
                                {[...Array(2)].map((_, setIndex) => (
                                    deliverables.map((item, i) => (
                                        <div
                                            key={`mobile-${setIndex}-${i}`}
                                            className="min-w-[220px] rounded-xl border border-white/10 bg-[#0A0A0A] px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 rounded-full bg-white/5 border border-white/10 text-white">
                                                    <item.icon className="w-4 h-4" />
                                                </div>
                                                <div className="text-xs uppercase tracking-widest text-white/40">
                                                    Module 0{i + 1}
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium text-white leading-snug mb-1">
                                                {item.title}
                                            </div>
                                            <div className="text-xs text-text-secondary leading-relaxed">
                                                {item.desc}
                                            </div>
                                        </div>
                                    ))
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column: Card Fan (Triggers on Section View) */}
                    <div className="hidden lg:block h-[500px] perspective-[2000px] relative">
                        <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
                            {deliverables.map((item, i) => {
                                // Accordion Logic - "BAM" Effect
                                // When section is in view, ALL cards deploy to their fanned positions.
                                // When not in view, ALL cards collapse to 0,0,0.

                                const isDeployed = isInView;

                                // Fan Calculation
                                // COMPACT / SMALLER CARDS for better responsive fit
                                // Cards are now SMALLER (220px wide) as requested to avoid text overlap.
                                const xSpread = 110;
                                const ySpread = 30;  // Standard isometric drop

                                // Center alignment constant: shifting everything so the "Group" is visually centered
                                // Width approx 500-600. Center ~-220
                                const layoutCenterOffset = -220;
                                const layoutTopOffset = -40;

                                const xOffset = i * xSpread;
                                const yOffset = i * ySpread;
                                const zOffset = isDeployed ? i * -50 : 0;

                                return (
                                    <motion.div
                                        key={i}
                                        // Reduced dimensions to prevent overlap: w-[220px] h-[135px]
                                        className={`absolute w-[220px] h-[135px] rounded-lg border flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                                            ${isDeployed
                                                ? "bg-[#0A0A0A] border-white/20 shadow-xl"
                                                : "bg-[#0A0A0A] border-white/10 shadow-lg"
                                            }
                                        `}
                                        style={{
                                            transformOrigin: "center center",
                                            zIndex: isDeployed ? 10 + i : 0
                                        }}
                                        animate={{
                                            // When CLOSED: All stack at the "start" position (Module 0's position),
                                            // creating a "Left to Right" expansion effect.
                                            x: isDeployed ? (xOffset + layoutCenterOffset) : layoutCenterOffset,
                                            y: isDeployed ? (yOffset + layoutTopOffset) : layoutTopOffset,
                                            z: isDeployed ? zOffset : 0,
                                            scale: isDeployed ? 1 : 0.95,
                                            // Isometric "Standing" Angles when deployed, flat/neat when closed
                                            rotateY: isDeployed ? -25 : 0,
                                            rotateX: isDeployed ? 10 : 0,
                                            rotateZ: isDeployed ? 5 : 0,
                                            opacity: 1,
                                        }}
                                        transition={{
                                            // Slower, more elegant expansion
                                            // INVERTED DELAY: Last card (Module 05) moves FIRST. First card (Module 01) moves LAST.
                                            // total items = 5. max index = 4.
                                            delay: isDeployed ? (4 - i) * 0.15 : 0,
                                            duration: 1.2, // Explicit duration for slower movement
                                            type: "spring",
                                            stiffness: 30, // Much softer spring
                                            damping: 15    // Smooth landing
                                        }}
                                    >
                                        {/* Clean gradient for depth */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 rounded-lg pointer-events-none" />

                                        <div className="text-center transform relative z-10 px-4">
                                            <div className="mb-3 flex justify-center">
                                                <div className={`p-2 rounded-full bg-white/5 border border-white/10 ${isDeployed ? "text-white" : "text-white/40"}`}>
                                                    {/* Smaller Icon */}
                                                    <item.icon className="w-4 h-4" />
                                                </div>
                                            </div>
                                            {/* Smaller Text */}
                                            <div className="font-medium text-sm leading-tight tracking-wide text-white mb-2">
                                                {item.title}
                                            </div>
                                            <div className="text-[9px] font-mono uppercase tracking-widest text-white/30">
                                                Module 0{i + 1}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12 sm:mt-20">
                    <a href="#cta">
                        <Button className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#A855F7] to-[#6366F1] border border-white/20 shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:shadow-[0_0_60px_rgba(168,85,247,0.8)] text-white">
                            Plug In Your System <span className="ml-2">→</span>
                        </Button>
                    </a>
                </div>
            </ScrollFade>
        </section>
    );
}

function NarrativeItem({ item, index, show }: { item: any, index: number, show: boolean }) {
    // We can still use useInView for local highlighting if we want, 
    // or just rely on the global "show" to trigger entrance animations.
    // Let's use "show" to slide them in or fade them up when the section hits.

    return (
        <div
            className={`group relative p-4 sm:p-5 rounded-xl transition-all duration-500 ease-out cursor-default border border-transparent
                ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                hover:bg-white/10 hover:backdrop-blur-md hover:border-white/10 hover:shadow-2xl
            `}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="flex items-center">

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-medium mb-1 text-white group-hover:text-white transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                        {item.desc}
                    </p>
                </div>

            </div>
        </div>
    );
}
