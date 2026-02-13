"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ScrollFade from "@/components/ui/ScrollFade";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "We already have a brand strategy.",
        answer: "Brand strategy tells your team what to say. What we install teaches your team how to think. You don’t need another PDF of guidelines. You need a system that extracts what’s in your head and deploys it across every conversation your team has—without you in the room. That’s not brand strategy. That’s narrative infrastructure."
    },
    {
        question: "This sounds expensive.",
        answer: "You’ve likely already spent $100K–$500K on solutions that didn’t work: brand agencies, failed sales hires, fractional CMOs, sales enablement tools nobody uses. Our fixed monthly model means no surprise bills. And most founders find they’re losing more revenue per month to this problem than our engagement costs. The question isn’t whether you can afford this. It’s how much longer you can afford not to have it."
    },
    {
        question: "We've been burned by agencies before.",
        answer: "Every founder we work with has been burned before. You’ve watched consultants present your own ideas back in a different font. That’s not what this is. A brand agency gives you a PDF. We build a system. Brand guidelines sit in a drawer. What we install lives in how your team actually sells. The output isn’t a document—it’s your team closing deals without you in the room."
    },
    {
        question: "AI tools can do this cheaper.",
        answer: "AI is incredibly powerful for scaling content once you know what to say. But it cannot figure out what to say. Every competitor using the same AI tools is producing the same output. The companies that will differentiate are the ones with human-extracted, codified story that no AI can replicate. AI is the amplifier. Without a signal to amplify, you’re broadcasting noise at scale."
    },
    {
        question: "Our founder doesn't have time.",
        answer: "That’s the paradox: you don’t have time BECAUSE you haven’t done this. You’re spending 60–80 hours per month on sales calls your team should be handling. Our process requires roughly 10 hours of your time over 75 days. The return is 50+ hours per month back. The math is simple: invest 10 hours once, get 50+ hours back every month."
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
                        You're Skeptical. <span className="text-[#F36901]">Good</span>.
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
