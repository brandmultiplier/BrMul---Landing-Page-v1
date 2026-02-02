"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollFade from "@/components/ui/ScrollFade";
import { FileText, Mic, Layout, Award, BarChart3 } from "lucide-react";

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
            desc: "Documented patterns so any team member can write \"like you\"",
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
            title: "Quarterly Optimization Dashboard",
            desc: "CAC, velocity, LTV—tracked and improved over time",
            id: "dash"
        }
    ];

    return (
        <section ref={containerRef} className="relative min-h-screen w-full bg-bg-page flex items-center py-48 overflow-hidden">

            {/* Background Elements */}

            <ScrollFade className="container-width relative z-10 py-24 lg:py-32">
                {/* Header - Stacks on mobile, top of flow on desktop */}
                <div className="mb-16 lg:mb-24 max-w-2xl">
                    <div className="text-sm font-semibold tracking-[0.2em] text-white uppercase mb-8 ml-1">
                        System Installation
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-8 font-medium tracking-tighter">
                        What You <br />
                        <span className="text-white/50">Actually Get.</span>
                    </h2>
                    <p className="text-text-secondary text-lg leading-relaxed max-w-lg font-light">
                        Not a 100-page PDF that sits in a drawer. A living system your team uses every day.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Column: Static List (No longer controls animation directly) */}
                    <div className="relative z-10 space-y-8">
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
                                // Cards are now SMALLER (260px wide).
                                const xSpread = 140;
                                const ySpread = 25;

                                // Center alignment constant: shifting everything so the "Group" is visually centered
                                // Total width = 4 * 140 = 560. Half = 280.
                                // We offset everything by -280 so the CENTER of the fan is at (0,0).
                                const layoutCenterOffset = -280;
                                const layoutTopOffset = -50; // To center the vertical cascade roughly

                                const xOffset = i * xSpread;
                                const yOffset = i * ySpread;
                                const zOffset = isDeployed ? i * -50 : 0;

                                return (
                                    <motion.div
                                        key={i}
                                        // Reduced dimensions: w-[260px] h-[160px]
                                        className={`absolute w-[260px] h-[160px] rounded-lg border flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)]
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
                                            // Or strictly centered? User said "from left to right".
                                            // So stack should be at layoutCenterOffset (Leftmost point).
                                            x: isDeployed ? (xOffset + layoutCenterOffset) : layoutCenterOffset,
                                            y: isDeployed ? (yOffset + layoutTopOffset) : layoutTopOffset,
                                            z: isDeployed ? zOffset : 0, // Stacked at 0 depth
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

                <div className="text-center mt-20">
                    <a href="#cta">
                        <Button className="text-base px-8 py-4">
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
            className={`min-h-[100px] flex items-start transition-all duration-700 delay-[${index * 100}ms]
                ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
        >
            <div className="max-w-md">
                <h3 className="text-lg font-medium mb-2 text-white">
                    {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary/80">
                    {item.desc}
                </p>
            </div>
        </div>
    );
}
