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

// Module Data Configuration - FLATTENED & COMPACTED
const modules = [
    // CENTRAL NODE (The Core / Narrative OS)
    { id: "core", icon: Target, label: "Narrative OS", x: 0, y: 0, isCenter: true },

    // PERIPHERAL NODES (Departments)
    // Further compacted to prevent text overlap
    { id: "sales", icon: Briefcase, label: "Sales", x: -240, y: -40, delay: 0.2 },
    { id: "marketing", icon: Megaphone, label: "Marketing", x: 240, y: -40, delay: 0.4 },
    { id: "product", icon: Layout, label: "Product", x: -160, y: 90, delay: 0.3 },
    { id: "recruitment", icon: Users, label: "Recruiting", x: 160, y: 90, delay: 0.5 },
    { id: "strategy", icon: LineChart, label: "Strategy", x: 0, y: -130, delay: 0.6 },
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

// Sub-component for Animated Line
function ConnectionLine({ startX, startY, endX, endY, color, delay }: any) {
    // Calculate simpler path or bezier? Straight line is easiest for "Beam" effect
    // But user wants "Stripe" style which is often bent. 
    // Let's do a simple generic elbow: Center -> Horizontal/Vertical -> Target?
    // Or just straight for now.
    // Actually, Stripe uses rounded elbows. Let's try an elbow path.
    // L-shape with radius.

    // Simple L-shape: Move X then Move Y.
    // Midpoint approach.

    const midX = startX; // First go vertical from center? Or horizontal?
    // Let's go straight for simplicity and elegance first, or simple curve.
    // A Quadratic Bezier curve is nice.

    // Control point:
    // If target is Top-Left, control point could be (startX, endY).
    const cx = startX;
    const cy = endY;

    const pathD = `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`;
    // Simple L turn: M startX startY L startX endY L endX endY (with radius)
    // Let's stick to straight line but with "beam" particle for now—it's cleaner to implement quickly.
    // Actually, standard straight line is boring.
    // Let's do the "elbow" style: Horizontal then Vertical.

    const pathD_Elbow = `M ${startX} ${startY} L ${endX} ${startY} L ${endX} ${endY}`; // Horizontal first
    // Or vertical first: `M ${startX} ${startY} L ${startX} ${endY} L ${endX} ${endY}` 

    // Let's use a nice curved path:
    const pathD_Curve = `M ${startX} ${startY} C ${startX} ${(startY + endY) / 2} ${endX} ${(startY + endY) / 2} ${endX} ${endY}`;


    return (
        <>
            {/* Background Line (Dim) */}
            <path
                d={pathD_Curve}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
                fill="none"
            />
            {/* Animated "Beam" */}
            <motion.path
                d={pathD_Curve}
                stroke={color}
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="10 100" // Dot/Beam length, Gap length
                strokeLinecap="round"
                initial={{ strokeDashoffset: 110 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    delay: delay
                }}
                style={{ opacity: 0.4 }}
            />
        </>
    );
}
