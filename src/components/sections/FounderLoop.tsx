"use client";

import { motion } from "framer-motion";

const phrases = [
    "7:14 AM \u2014 You\u2019re reviewing the prospect\u2019s LinkedIn before the 8 AM demo. Your VP of Sales should be doing this.",
    "Deal recap lands in your inbox. Every technical nuance is wrong. You rewrite it in 20 minutes. Again.",
    "You\u2019re paying $180K for a sales leader. You\u2019re still the one closing.",
];

export default function FounderLoop() {
    return (
        <div className="relative py-12 overflow-hidden bg-bg-page">
            {/* Top/bottom subtle dividers */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-bg-page to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-bg-page to-transparent z-10 pointer-events-none" />

            <div className="relative h-[28px] overflow-hidden">
                <motion.div
                    className="flex flex-col absolute w-full will-change-transform"
                    animate={{ y: ["0%", "-75%"] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {/* Repeat 4x so when -75% is reached, it loops seamlessly back to start */}
                    {[...Array(4)].map((_, setIndex) => (
                        phrases.map((phrase, i) => (
                            <div
                                key={`${setIndex}-${i}`}
                                className="h-[28px] flex items-center justify-center shrink-0"
                            >
                                <p className="text-text-secondary text-sm md:text-base font-light tracking-wide whitespace-nowrap">
                                    {phrase}
                                </p>
                            </div>
                        ))
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
