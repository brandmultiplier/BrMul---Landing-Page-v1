"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ScrollFade from "@/components/ui/ScrollFade";
import { FileText, Mic, Layout, Book, CheckCircle2, Award, BarChart3 } from "lucide-react";

import Button from "@/components/ui/Button";

export default function NarrativeOS() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20%" });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const deliverables = [
        {
            icon: FileText,
            title: "Narrative Snapshot",
            desc: "Your story distilled to its essential truth—in your voice",
            color: "border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        },
        {
            icon: Layout,
            title: "Strategic Sales Narrative Deck",
            desc: "The exact slides and talk tracks that close enterprise deals",
            color: "border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        },
        {
            icon: Mic,
            title: "Voice Profile",
            desc: "Documented patterns so any team member can write \"like you\"",
            color: "border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        },
        {
            icon: Award,
            title: "Team Fluency Certification",
            desc: "Your team passes an articulation test before we're done",
            color: "border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        },
        {
            icon: BarChart3,
            title: "Quarterly Optimization Dashboard",
            desc: "CAC, velocity, LTV—tracked and improved over time",
            color: "border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        }
    ];

    return (
        <section id="narrative-os" ref={sectionRef} className="section-spacing bg-bg-page relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            <ScrollFade className="container-width relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-sm font-semibold tracking-[0.2em] text-white uppercase mb-8 ml-1">
                            System Installation
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-8 font-medium tracking-tighter">
                            What You <br />
                            <span className="text-white/50">Actually Get.</span>
                        </h2>
                        <p className="text-text-secondary text-lg leading-relaxed mb-12 max-w-lg font-light">
                            Not a 100-page PDF that sits in a drawer. A living system your team uses every day.
                        </p>

                        <div className="space-y-4">
                            {deliverables.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 cursor-default border-l-2 ${hoveredIndex === i
                                        ? "bg-white/5 border-white translate-x-2"
                                        : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/20"
                                        }`}
                                >
                                    <div className={`mt-1 p-2 rounded-md ${hoveredIndex === i ? "text-accent-purple" : "text-white/40"} transition-colors bg-white/5`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`text-lg font-medium transition-colors mb-1 ${hoveredIndex === i ? "text-white" : "text-white/80"}`}>
                                            {item.title}
                                        </h3>
                                        <p className={`text-sm leading-relaxed transition-colors ${hoveredIndex === i ? "text-white/70" : "text-white/40"}`}>
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className={`mt-2 transition-opacity duration-300 ${hoveredIndex === i ? "opacity-100" : "opacity-0"}`}>
                                        <CheckCircle2 className="w-5 h-5 text-accent-purple" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Interface Mockup - Holographic Stack */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[600px] flex items-center justify-center perspective-[2000px] mt-12 lg:mt-0"
                    >
                        {/* Minimal Glow */}
                        <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full pointer-events-none opacity-20" />

                        <div className="relative transform-style-3d rotate-x-[20deg] rotate-z-[-10deg] rotate-y-[20deg]">
                            {deliverables.map((item, i) => {
                                const isHovered = hoveredIndex === i;
                                const isAnyHovered = hoveredIndex !== null;
                                // Center point for 5 items is index 2.
                                const offset_y = (i - 2) * -50;
                                const offset_z = (i - 2) * 30;

                                return (
                                    <motion.div
                                        key={i}
                                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[200px] rounded-xl border backdrop-blur-md transition-all duration-500 ease-out flex items-center justify-center
                                            ${isHovered
                                                ? "bg-white/10 border-white/40 shadow-[0_0_40px_rgba(255,255,255,0.15)] z-50 mix-blend-screen"
                                                : "bg-[#050505]/80 border-white/10 shadow-xl z-0"
                                            }
                                            ${isAnyHovered && !isHovered ? "opacity-20 blur-[1px]" : "opacity-100"}
                                        `}
                                        style={{
                                            y: offset_y, // Tighter stack
                                            z: offset_z,
                                        }}
                                        animate={{
                                            y: isHovered ? offset_y - 20 : offset_y,
                                            scale: isHovered ? 1.05 : 1,
                                            rotateX: isHovered ? 2 : 0,
                                        }}
                                    >
                                        <div className="text-center transform -rotate-2">
                                            <div className="inline-flex p-3 rounded-full bg-white/5 mb-3 border border-white/10">
                                                <item.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="text-white font-medium text-base tracking-wide px-4">
                                                {item.title}
                                            </div>
                                            <div className="text-[9px] text-white/40 font-mono mt-2 uppercase tracking-widest border-t border-white/5 pt-2 inline-block">
                                                Module 0{i + 1}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
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
