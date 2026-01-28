"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const roles = [
    {
        id: "ceo",
        label: "CEO / Founder",
        pain: "Trapped as the bottleneck. Every deal needs your presence.",
        promise: "Scale beyond your calendar. Your team closes without you.",
        metric: "40-60% Premium",
        gradient: "from-blue-500/20 to-indigo-500/20",
        border: "group-hover:border-blue-500/50"
    },
    {
        id: "sales",
        label: "VP Sales",
        pain: "Reps tell different stories. 60% of deals lost to 'no decision'.",
        promise: "One resonant narrative. Deals close 35% faster.",
        metric: "35% Faster Cycles",
        gradient: "from-purple-500/20 to-pink-500/20",
        border: "group-hover:border-purple-500/50"
    },
    {
        id: "cmo",
        label: "CMO",
        pain: "Can't prove ROI. Content doesn't sound like the founder.",
        promise: "Authentic voice at scale. Metrics your CFO respects.",
        metric: "30% Lower CAC",
        gradient: "from-emerald-500/20 to-teal-500/20",
        border: "group-hover:border-emerald-500/50"
    },
    {
        id: "cfo",
        label: "CFO",
        pain: "Brand feels like a money pit with no measurable return.",
        promise: "ROI calculator built in. 60-day payback period.",
        metric: "4:1 LTV/CAC",
        gradient: "from-orange-500/20 to-amber-500/20",
        border: "group-hover:border-orange-500/50"
    },
];

import ScrollFade from "@/components/ui/ScrollFade";

function PersonaCard({ role, index }: { role: typeof roles[0], index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative h-[320px] w-full perspective-1000 group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                initial={false}
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="w-full h-full relative preserve-3d transition-all duration-300"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* FRONT */}
                <div className={cn(
                    "absolute inset-0 backface-hidden",
                    "flex flex-col p-8 rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden",
                    "transition-colors duration-500",
                    role.border
                )}>
                    {/* Background Gradient Blob */}
                    <div className={cn(
                        "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-20 transition-opacity duration-500",
                        role.gradient.replace("/20", "/30"),
                        isHovered ? "opacity-40" : "opacity-20"
                    )} />

                    <div className="flex flex-col h-full z-10">
                        <div className="mb-auto">
                            <h3 className="text-xl font-medium text-white mb-2">{role.label}</h3>
                            <div className="h-0.5 w-8 bg-white/20" />
                        </div>

                        <div className="mt-8">
                            <div className="text-xs text-red-400/80 uppercase tracking-widest mb-3 font-semibold">The Pain</div>
                            <p className="text-lg text-white/70 leading-relaxed font-light">
                                &quot;{role.pain}&quot;
                            </p>
                        </div>

                        <div className="mt-auto pt-8 flex items-center gap-2 text-white/30 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                            <span>Hover to reveal</span>
                        </div>
                    </div>
                </div>

                {/* BACK */}
                <div
                    className={cn(
                        "absolute inset-0 backface-hidden rotate-y-180",
                        "flex flex-col p-8 rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl"
                    )}
                    style={{ transform: "rotateY(180deg)" }}
                >
                    {/* Full Gradient Background */}
                    <div className={cn(
                        "absolute inset-0 opacity-10",
                        "bg-gradient-to-br",
                        role.gradient
                    )} />

                    <div className="flex flex-col h-full z-10 relative">
                        <div className="mb-auto flex items-center justify-between">
                            <h3 className="text-lg font-medium text-white/90">{role.label}</h3>
                            <div className={cn("px-2 py-0.5 rounded text-xs bg-white/10 text-white/80 border border-white/10")}>
                                Solved
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="text-xs text-emerald-400 uppercase tracking-widest mb-3 font-semibold">The Promise</div>
                            <p className="text-lg text-white leading-relaxed font-medium">
                                {role.promise}
                            </p>
                        </div>

                        <div className="mt-auto pt-6 border-t border-white/5">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Impact</span>
                                <span className={cn(
                                    "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r",
                                    role.gradient.replace("/20", "").replace("from-", "from-white to-")
                                )}>
                                    {role.metric}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function Protagonists() {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={sectionRef} className="section-spacing bg-transparent relative overflow-hidden">
            <ScrollFade className="container-width">
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <div className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-8">The Stakeholders</div>
                    <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-8 leading-[1.1]">
                        Built for the Leadership Team.
                        <span className="block text-white/40 mt-2">Every stakeholder wins.</span>
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                        We align the entire c-suite around a single, revenue-generating narrative.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
                    {roles.map((role, index) => (
                        <PersonaCard key={role.id} role={role} index={index} />
                    ))}
                </div>
            </ScrollFade>
        </section>
    );
}
