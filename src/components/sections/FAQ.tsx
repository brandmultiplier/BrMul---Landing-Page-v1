"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ScrollFade from "@/components/ui/ScrollFade";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "We already have a brand strategy.",
        answer: "Having a deck ≠ having an operating system. Quick test: Can your CEO, VP Sales, and CMO tell the exact same story right now, without looking at notes? If not, you have strategy that isn't installed."
    },
    {
        question: "This sounds expensive.",
        answer: "Compared to what? Most founders have spent $200K+ on agencies that delivered decks that decay, or marketing hires that didn't work out. We're 3-10x more efficient with a 30-day checkpoint guarantee."
    },
    {
        question: "We've been burned by agencies before.",
        answer: "Every founder we work with has been burned. Most agencies hand you a deck and disappear. We install systems, then stay for optimization. 75% of clients retain beyond the initial engagement because the system compounds."
    },
    {
        question: "AI tools can do this cheaper.",
        answer: "AI generates content—it can't run a Rumble session or extract the tacit knowledge in your head. We use AI to scale after architecture is installed, not to replace the thinking that creates differentiation."
    },
    {
        question: "Our founder doesn't have time.",
        answer: "The Rumble is 3 hours. Compare that to the 10+ hours per week you're currently spending in sales calls you can't delegate. Short-term investment for permanent liberation."
    }
];

export default function FAQ() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section ref={sectionRef} className="section-spacing bg-bg-page relative overflow-hidden text-center md:text-left">
            <ScrollFade className="container-width max-w-4xl mx-auto relative z-10">
                <div className="mb-16 md:mb-24 text-center">
                    <span className="text-white text-sm font-medium tracking-[0.2em] uppercase mb-8 block">
                        Questions We Get
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-tight">
                        You're Skeptical. <span className="text-white/40">Good.</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`border rounded-lg transition-all duration-300 overflow-hidden ${isOpen
                                    ? "bg-white/5 border-white/20"
                                    : "bg-transparent border-white/10 hover:bg-white/[0.02]"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                >
                                    <span className={`text-lg md:text-xl font-medium pr-8 transition-colors ${isOpen ? "text-white" : "text-white/70"}`}>
                                        {faq.question}
                                    </span>
                                    <span className={`shrink-0 p-1 rounded-full border transition-all ${isOpen
                                        ? "bg-white text-black border-white rotate-180"
                                        : "border-white/20 text-white/40"
                                        }`}>
                                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 text-text-secondary leading-relaxed border-t border-white/5 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </ScrollFade>
        </section>
    );
}
