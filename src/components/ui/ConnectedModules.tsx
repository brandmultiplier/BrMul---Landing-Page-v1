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

// Module Data Configuration - SYMMETRIC ELLIPTICAL DISTRIBUTION
// 5 Nodes distributed symmetrically: 1 Top, 2 Middle-Right/Left, 2 Bottom-Right/Left
// Ellipse Radii: Rx = 280, Ry = 130
const modules = [
    // CENTRAL NODE (The Core / Narrative OS)
    { id: "core", icon: Target, label: "Narrative OS", x: 0, y: 0, isCenter: true },

    // PERIPHERAL NODES
    // 1. Top Center (-90deg)
    { id: "strategy", icon: LineChart, label: "Strategy", x: 0, y: -130, delay: 0.2 },

    // 2. Top Right (-18deg) -> x: ~266, y: ~-40
    { id: "marketing", icon: Megaphone, label: "Marketing", x: 260, y: -45, delay: 0.3 },

    // 3. Bottom Right (54deg) -> x: ~164, y: ~105
    { id: "recruitment", icon: Users, label: "Recruiting", x: 170, y: 110, delay: 0.4 },

    // 4. Bottom Left (126deg) -> x: ~-164, y: ~105 (Reflected)
    { id: "product", icon: Layout, label: "Product", x: -170, y: 110, delay: 0.5 },

    // 5. Top Left (198deg/162deg Reflected) -> x: ~-266, y: ~-40
    { id: "sales", icon: Briefcase, label: "Sales", x: -260, y: -45, delay: 0.6 },
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

// Sub-component for Animated Line with "Smart Clipping"
function ConnectionLine({ startX, startY, endX, endY, color, delay }: any) {
    // 1. Calculate geometry to clip lines at node edges
    // Center Node Radius approx 45px (w-24 = 96px => 48px, leave cushion)
    // Peripheral Node Radius approx 35px (w-20 = 80px => 40px)
    const startRadius = 45;
    const endRadius = 35;

    const dx = endX - startX;
    const dy = endY - startY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Calculate actual start/end points on the circumference/box edge
    // Simply moving along the vector for circular clipping
    const actualStartX = startX + Math.cos(angle) * startRadius;
    const actualStartY = startY + Math.sin(angle) * startRadius;

    const actualEndX = endX - Math.cos(angle) * endRadius;
    const actualEndY = endY - Math.sin(angle) * endRadius;

    // Control point for the curve (Midpoint gravity)
    // Using a simpler Quadratic curve for smoother "cable" look 
    // or the "S" curve. Let's stick to the sigmoid-like C curve but adjusted coords.
    const midX = (actualStartX + actualEndX) / 2;
    const midY = (actualStartY + actualEndY) / 2;

    // Tweak control points to make it look like a tense cable
    // C x1 y1 x2 y2 x y
    // Use the S-shape: horizontal start, horizontal end? 
    // Or just a direct line if they are radial?
    // Let's try a direct line for "tight" connection, or slight curve.
    // The previous C curve was: C startX midY endX midY endX endY
    // Let's use a simple straight line for the "beam" feel if closely connected?
    // No, curved is more "Stripe".

    const pathD = `M ${actualStartX} ${actualStartY} C ${actualStartX} ${(actualStartY + actualEndY) / 2} ${actualEndX} ${(actualStartY + actualEndY) / 2} ${actualEndX} ${actualEndY}`;

    return (
        <>
            {/* Connection Terminals (Dots) */}
            <circle cx={actualStartX} cy={actualStartY} r="3" fill="#A855F7" opacity="0.5" />
            <circle cx={actualEndX} cy={actualEndY} r="3" fill="white" opacity="0.3" />

            {/* Background Line (Visible dim cable) */}
            <path
                d={pathD}
                stroke="rgba(255,255,255,0.15)" // Brighter static line
                strokeWidth="1"
                fill="none"
            />

            {/* Animated "Beam" Packet */}
            <motion.path
                d={pathD}
                stroke={color}
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 60" // Sharper, shorter pulses
                strokeLinecap="round"
                initial={{ strokeDashoffset: 64 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                    duration: 2, // Faster data flow
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    delay: delay
                }}
                style={{ opacity: 0.8 }} // Brighter active state
            />
        </>
    );
}
