"use client";

import { motion } from "framer-motion";
import {
    Target,
    Megaphone,
    Briefcase,
    Layout,
    Users,
    LineChart,
    BarChart3,
    PieChart,
    Layers,
    Globe
} from "lucide-react";

// Module Data Configuration - TIGHTER SYMMETRIC ELLIPSE
// Compacted to ensure "connected" feel and prevent disconnects
const modules = [
    // CENTRAL NODE (The Core / Narrative OS)
    { id: "core", icon: Target, label: "Narrative OS", x: 0, y: 0, isCenter: true },

    // PERIPHERAL NODES
    // 1. Top Center
    { id: "strategy", icon: LineChart, label: "Strategy", x: 0, y: -130, delay: 0.2 },

    // 2. Top Right (Tighter)
    { id: "marketing", icon: Megaphone, label: "Marketing", x: 220, y: -50, delay: 0.3 },

    // 3. Bottom Right (Tighter)
    { id: "recruitment", icon: Users, label: "Recruiting", x: 150, y: 100, delay: 0.4 },

    // 4. Bottom Left (Reflected)
    { id: "product", icon: Layout, label: "Product", x: -150, y: 100, delay: 0.5 },

    // 5. Top Left (Reflected)
    { id: "sales", icon: Briefcase, label: "Sales", x: -220, y: -50, delay: 0.6 },
];

export default function ConnectedModules() {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
            {/* Main Container for the visualization - COMPACTED SCALE */}
            <div className="relative w-[800px] h-[600px] scale-[0.55] sm:scale-70 md:scale-85 lg:scale-95 opacity-100">

                {/* Connection Lines Layer (Behind nodes) */}
                <svg className="absolute inset-0 w-full h-full visible">
                    {modules.filter(m => !m.isCenter).map((mod, i) => (
                        <ConnectionLine
                            key={`line-${mod.id}`}
                            startX={400} // Center of 800px
                            startY={300} // Center of 600px
                            endX={400 + mod.x}
                            endY={300 + mod.y}
                            color="#A855F7" // Purple accent
                            delay={mod.delay}
                        />
                    ))}
                </svg>

                {/* Nodes Layer */}
                {modules.map((mod) => (
                    <ModuleNode key={mod.id} module={mod} />
                ))}

            </div>
        </div>
    );
}

// Sub-component for a single Node
function ModuleNode({ module }: { module: any }) {
    const isCenter = module.isCenter;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: isCenter ? 0 : module.delay
            }}
            className={`absolute flex flex-col items-center justify-center`}
            style={{
                left: `calc(50% + ${module.x}px)`,
                top: `calc(50% + ${module.y}px)`,
                transform: "translate(-50%, -50%)" // Centering fix
            }}
        >
            {/* Icon Card */}
            <div className={`
                relative flex items-center justify-center rounded-xl backdrop-blur-md border transition-colors duration-500
                ${isCenter
                    ? "w-24 h-24 bg-accent-purple/30 border-accent-purple/60 shadow-[0_0_50px_rgba(168,85,247,0.5)] z-20"
                    : "w-20 h-20 bg-white/10 border-white/20 shadow-xl hover:bg-white/15 z-10"
                }
            `}>
                <module.icon className={`
                    ${isCenter ? "w-10 h-10 text-white" : "w-8 h-8 text-white/90"}
                `} />

                {/* Active Pulse (Center only) */}
                {isCenter && (
                    <span className="absolute inset-0 rounded-xl border-2 border-accent-purple/40 animate-ping opacity-60" />
                )}
            </div>

            {/* Label */}
            <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (module.delay || 0) + 0.3 }}
                className={`mt-4 text-[10px] md:text-xs items-center justify-center flex font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full backdrop-blur-md border shadow-lg
                    ${isCenter
                        ? "text-white bg-accent-purple/20 border-accent-purple/40"
                        : "text-white/70 bg-black/40 border-white/10"
                    }
                `}
            >
                {module.label}
            </motion.span>
        </motion.div>
    );
}

// Helper: Calculate intersection point on a separate box for precise clipping
function getBoxIntersection(x1: number, y1: number, x2: number, y2: number, w: number, h: number) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    if (dx === 0 && dy === 0) return { x: x1, y: y1 };

    // Calculate half widths
    const hw = w / 2;
    const hh = h / 2;

    // Slopes
    const slope = dy / dx;

    // Check intersection with vertical edges (left/right)
    if (Math.abs(dx) > 0) {
        const xEdge = dx > 0 ? hw : -hw;
        const yInt = slope * xEdge;
        if (Math.abs(yInt) <= hh) {
            return { x: x1 + xEdge, y: y1 + yInt };
        }
    }

    // Check intersection with horizontal edges (top/bottom)
    if (Math.abs(dy) > 0) {
        const yEdge = dy > 0 ? hh : -hh;
        const xInt = yEdge / slope;
        if (Math.abs(xInt) <= hw) {
            return { x: x1 + xInt, y: y1 + yEdge };
        }
    }

    // Fallback (shouldn't happen for center-origin rays)
    return { x: x1, y: y1 };
}

// Sub-component for Animated Line with "Box Clipping"
function ConnectionLine({ startX, startY, endX, endY, color, delay }: any) {
    // Defines node dimensions for clipping (Center approx 96px, Outer 80px)
    // Add small buffer (-4px) so line tucks slightly under the border glow
    const centerSize = 92;
    const outerSize = 76;

    // Project vector from Center to Outer
    const dx = endX - startX;
    const dy = endY - startY;

    // 1. Find start point (Intersection with Center Box)
    const relativeStart = getBoxIntersection(0, 0, dx, dy, centerSize, centerSize);
    const actualStartX = startX + relativeStart.x;
    const actualStartY = startY + relativeStart.y;

    // 2. Find end point (Intersection with Peripheral Box)
    // Vector from Target back to Center is (-dx, -dy)
    const relativeEnd = getBoxIntersection(0, 0, -dx, -dy, outerSize, outerSize);
    const actualEndX = endX + relativeEnd.x;
    const actualEndY = endY + relativeEnd.y;

    // Curvature Logic
    // Uses a gentle curve pulling towards the horizontal axis for "network" feel
    // Midpoint average
    const midY = (actualStartY + actualEndY) / 2;
    const pathD = `M ${actualStartX} ${actualStartY} C ${actualStartX} ${midY} ${actualEndX} ${midY} ${actualEndX} ${actualEndY}`;

    return (
        <>
            {/* Connection Terminals (Dots at exact overlap) */}
            <circle cx={actualStartX} cy={actualStartY} r="4" fill="#A855F7" opacity="0.6" />
            <circle cx={actualEndX} cy={actualEndY} r="3" fill="white" opacity="0.4" />

            {/* Background Line */}
            <path
                d={pathD}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                fill="none"
            />

            {/* Animated "Beam" Packet */}
            <motion.path
                d={pathD}
                stroke={color}
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 80" // Short sharp pulses
                strokeLinecap="round"
                initial={{ strokeDashoffset: 84 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    delay: delay
                }}
                style={{ opacity: 1 }} // Maximum brightness
            />
        </>
    );
}
