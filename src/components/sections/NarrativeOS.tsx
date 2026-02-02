"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import ScrollFade from "@/components/ui/ScrollFade";
import { FileText, Mic, Layout, Award, BarChart3 } from "lucide-react";

import Button from "@/components/ui/Button";

export default function NarrativeOS() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

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
        <section ref={containerRef} className="relative bg-bg-page overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none fixed" />

            <ScrollFade className="container-width relative z-10 py-24 lg:py-32">
                {/* Header - Stacks on mobile, top of flow on desktop */}
                <div className="mb-20 lg:mb-32 max-w-2xl">
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

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left Column: Scrollable List - Compact Spacing */}
                    <div className="relative z-10 space-y-12 lg:space-y-24 pb-24">
                        {deliverables.map((item, i) => (
                            <NarrativeItem
                                key={i}
                                item={item}
                                index={i}
                                setActiveIndex={setActiveIndex}
                            />
                        ))}
                    </div>

                    {/* Right Column: Sticky Card Stack */}
                    <div className="hidden lg:block sticky top-32 h-[500px] perspective-[2000px]">
                        {/* Minimal Glow */}
                        <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full pointer-events-none opacity-20" />

                        <div className="relative w-full h-full flex items-center justify-center transform-style-3d rotate-x-[10deg] rotate-z-[-5deg] rotate-y-[15deg]">
                            {deliverables.map((item, i) => {
                                // Accordion Logic
                                // If index <= activeIndex, the card is "deployed" (fanned out)
                                // If index > activeIndex, the card remains stacked at the "base" (or behind the last active one)

                                // To make them collapse into a "single layer" when scrolling up:
                                // Base state (i > activeIndex): All collapse to origin (or closely stacked)
                                // Active state (i <= activeIndex): Spread out

                                const isDeployed = i <= activeIndex;
                                const isActive = i === activeIndex; // The specific card being talked about

                                // Fan Calculation
                                // "Horizontal" spread like the example (isometric)
                                // Spread heavily on X, slightly on Z to create depth, little to no Y.

                                const xOffset = isDeployed ? i * 80 : 0; // Much wider horizontal spread
                                const yOffset = isDeployed ? 0 : 0;      // Keep them level
                                const zOffset = isDeployed ? i * -50 : 0;  // Deepen the stack

                                return (
                                    <motion.div
                                        key={i}
                                        className={`absolute w-[360px] h-[220px] rounded-xl border backdrop-blur-[2px] flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                                            ${isActive
                                                ? "bg-white/10 border-white/60 shadow-[0_0_60px_rgba(255,255,255,0.15)] z-30"
                                                : "bg-[#0A0A0A]/60 border-white/20 shadow-xl"
                                            }
                                            ${isDeployed ? "z-20" : "z-0"}
                                        `}
                                        style={{
                                            transformOrigin: "center center",
                                        }}
                                        animate={{
                                            x: xOffset - (activeIndex * 40), // Shift left to keep active card somewhat centered
                                            y: yOffset,
                                            z: zOffset,
                                            scale: isActive ? 1.05 : 0.95, // Slight scaling
                                            rotateY: -20, // Constant isometric angle for all cards? Or rotate them?
                                            // The reference shows them all parallel facing the same way.
                                            rotateX: 10,
                                            opacity: isDeployed ? 1 : 0,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 20
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 rounded-xl pointer-events-none" />

                                        <div className="text-center transform relative z-10">
                                            <div className={`inline-flex p-3 rounded-full bg-white/5 mb-4 border transition-colors duration-500 ${isActive ? "border-white/40 bg-white/10" : "border-white/5"}`}>
                                                <item.icon className={`w-6 h-6 transition-colors duration-500 ${isActive ? "text-white" : "text-white/20"}`} />
                                            </div>
                                            <div className={`font-medium text-lg tracking-wide px-6 transition-colors duration-500 ${isActive ? "text-white" : "text-white/20"}`}>
                                                {item.title}
                                            </div>
                                            <div className={`text-[10px] font-mono mt-4 uppercase tracking-widest border-t border-white/5 pt-3 inline-block transition-colors duration-500 ${isActive ? "text-white/50" : "text-white/10"}`}>
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

function NarrativeItem({ item, index, setActiveIndex }: { item: any, index: number, setActiveIndex: (i: number) => void }) {
    const ref = useRef(null);
    // Tighter margin to trigger "active" state more precisely in a compact list
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveIndex(index);
        }
    }, [isInView, index, setActiveIndex]);

    return (
        <div ref={ref} className={`min-h-[150px] flex items-center transition-opacity duration-500 ${isInView ? "opacity-100" : "opacity-30"}`}>
            <div className="flex gap-6 lg:gap-8 items-start max-w-md">
                <div className={`mt-1 text-2xl font-mono text-white/20`}>
                    0{index + 1}
                </div>
                <div>
                    <h3 className={`text-2xl font-medium mb-3 ${isInView ? "text-white" : "text-white/60"}`}>
                        {item.title}
                    </h3>
                    <p className={`text-lg leading-relaxed ${isInView ? "text-text-secondary" : "text-text-secondary/60"}`}>
                        {item.desc}
                    </p>
                </div>
            </div>
        </div>
    );
}
