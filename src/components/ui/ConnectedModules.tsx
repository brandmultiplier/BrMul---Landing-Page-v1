"use client";

import { motion } from "framer-motion";
import {
    Target,
    Megaphone,
    Briefcase,
    Layout,
    Users,
    LineChart,
} from "lucide-react";

// =============================================================================
// COMPLETELY REWRITTEN - Simple & Reliable Approach
// =============================================================================
// Strategy: Lines go center-to-center but render BEHIND opaque nodes.
// This creates the visual effect of "connected" because lines disappear
// under the solid card backgrounds. No complex clipping math needed.
// =============================================================================

// Node positions relative to a 600x400 virtual grid (center at 300, 200)
const CENTER_X = 300;
const CENTER_Y = 200;

const modules = [
    // Central Node
    { id: "core", icon: Target, label: "Narrative OS", x: CENTER_X, y: CENTER_Y, isCenter: true },

    // Ring of 5 around center - Pentagon layout for symmetry
    { id: "strategy", icon: LineChart, label: "Strategy", x: CENTER_X, y: CENTER_Y - 120, delay: 0.1 },      // Top
    { id: "marketing", icon: Megaphone, label: "Marketing", x: CENTER_X + 140, y: CENTER_Y - 40, delay: 0.2 },  // Top-Right
    { id: "recruitment", icon: Users, label: "Recruiting", x: CENTER_X + 90, y: CENTER_Y + 100, delay: 0.3 },   // Bottom-Right
    { id: "product", icon: Layout, label: "Product", x: CENTER_X - 90, y: CENTER_Y + 100, delay: 0.4 },         // Bottom-Left
    { id: "sales", icon: Briefcase, label: "Sales", x: CENTER_X - 140, y: CENTER_Y - 40, delay: 0.5 },          // Top-Left
];

export default function ConnectedModules() {
    const peripheralNodes = modules.filter(m => !m.isCenter);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Fixed size container for consistent scaling */}
            <div
                className="relative"
                style={{ width: 600, height: 400, transform: 'scale(0.85)', transformOrigin: 'center center' }}
            >
                {/* === LAYER 1: Connection Lines (SVG) === */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 1 }}
                    viewBox="0 0 600 400"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {peripheralNodes.map((node) => (
                        <g key={`line-${node.id}`}>
                            {/* Static Line */}
                            <line
                                x1={CENTER_X}
                                y1={CENTER_Y}
                                x2={node.x}
                                y2={node.y}
                                stroke="rgba(168, 85, 247, 0.3)"
                                strokeWidth="2"
                            />
                            {/* Animated Pulse Dot traveling along line */}
                            <motion.circle
                                r="4"
                                fill="#A855F7"
                                initial={{
                                    cx: CENTER_X,
                                    cy: CENTER_Y,
                                    opacity: 0.8
                                }}
                                animate={{
                                    cx: [CENTER_X, node.x, CENTER_X],
                                    cy: [CENTER_Y, node.y, CENTER_Y],
                                    opacity: [0.8, 0.4, 0.8]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: node.delay || 0
                                }}
                            />
                        </g>
                    ))}
                </svg>

                {/* === LAYER 2: Nodes (Higher z-index, covers lines) === */}
                {modules.map((mod) => (
                    <ModuleNode key={mod.id} module={mod} />
                ))}
            </div>
        </div>
    );
}

function ModuleNode({ module }: { module: typeof modules[0] }) {
    const isCenter = module.isCenter;
    const size = isCenter ? 80 : 64; // px

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: module.delay || 0
            }}
            className="absolute flex flex-col items-center"
            style={{
                left: module.x,
                top: module.y,
                transform: 'translate(-50%, -50%)',
                zIndex: isCenter ? 20 : 10
            }}
        >
            {/* Card */}
            <div
                className={`
                    flex items-center justify-center rounded-xl border backdrop-blur-sm
                    ${isCenter
                        ? "bg-[#0D0D0D] border-accent-purple/60 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                        : "bg-[#0D0D0D] border-white/20 shadow-lg"
                    }
                `}
                style={{ width: size, height: size }}
            >
                <module.icon
                    className={isCenter ? "w-8 h-8 text-white" : "w-6 h-6 text-white/80"}
                />

                {/* Center Pulse Ring */}
                {isCenter && (
                    <motion.span
                        className="absolute inset-0 rounded-xl border-2 border-accent-purple/50"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                )}
            </div>

            {/* Label Pill */}
            <span
                className={`
                    mt-2 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded-full border
                    ${isCenter
                        ? "bg-accent-purple/20 border-accent-purple/40 text-white"
                        : "bg-black/60 border-white/10 text-white/70"
                    }
                `}
            >
                {module.label}
            </span>
        </motion.div>
    );
}
