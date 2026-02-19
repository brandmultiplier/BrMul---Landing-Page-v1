"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import ScrollFade from "@/components/ui/ScrollFade";

const WEBHOOK_URL =
    "https://brandmultiplier.app.n8n.cloud/webhook/f108ff75-70c3-4845-be05-5fb993711337";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = {
    first_name: "",
    last_name: "",
    work_email: "",
    company_name: "",
    approximate_arr: "",
};

export default function FinalCTA() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear the error for this field as the user types
        if (errors[name]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const validate = (): boolean => {
        const next: Record<string, string> = {};

        if (!formData.first_name.trim()) next.first_name = "First name is required.";
        if (!formData.last_name.trim()) next.last_name = "Last name is required.";
        if (!formData.work_email.trim()) {
            next.work_email = "Work email is required.";
        } else if (!EMAIL_REGEX.test(formData.work_email.trim())) {
            next.work_email = "Please enter a valid email address.";
        }
        if (!formData.company_name.trim()) next.company_name = "Company name is required.";
        if (!formData.approximate_arr) next.approximate_arr = "Please select your approximate ARR.";

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        setSubmitError("");

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData(EMPTY_FORM);
            } else {
                setSubmitError("Something went wrong. Please try again.");
            }
        } catch {
            setSubmitError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section ref={sectionRef} id="cta" className="section-spacing bg-bg-page">
            <ScrollFade className="container-width relative z-10">
                {/* Soft Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 sm:mb-16 md:mb-24" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-medium tracking-tighter leading-tight mb-6 sm:mb-8">
                        <span className="text-[#F36901]">Stop</span> being <br />
                        the bottleneck.
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 sm:mb-10 leading-relaxed">
                        We extract the story. We deploy the system. <br />
                        <span className="text-white">Your team sells like you do.</span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-md mx-auto clean-card bg-[#0A0A0A]"
                >
                    {submitted ? (
                        <div className="text-center py-8 space-y-3">
                            <p className="text-white text-lg font-medium">Thank you!</p>
                            <p className="text-text-secondary text-sm">
                                We&apos;ll be in touch shortly.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                            {/* First Name + Last Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <input
                                        type="text"
                                        name="first_name"
                                        placeholder="First Name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        className="w-full h-12 px-4 rounded-lg bg-white/5 border border-border-subtle text-white focus:border-accent-purple focus:outline-none transition-colors"
                                    />
                                    {errors.first_name && (
                                        <p className="text-red-400 text-xs">{errors.first_name}</p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <input
                                        type="text"
                                        name="last_name"
                                        placeholder="Last Name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        className="w-full h-12 px-4 rounded-lg bg-white/5 border border-border-subtle text-white focus:border-accent-purple focus:outline-none transition-colors"
                                    />
                                    {errors.last_name && (
                                        <p className="text-red-400 text-xs">{errors.last_name}</p>
                                    )}
                                </div>
                            </div>

                            {/* Work Email */}
                            <div className="flex flex-col gap-1">
                                <input
                                    type="email"
                                    name="work_email"
                                    placeholder="Work Email"
                                    value={formData.work_email}
                                    onChange={handleChange}
                                    className="w-full h-12 px-4 rounded-lg bg-white/5 border border-border-subtle text-white focus:border-accent-purple focus:outline-none transition-colors"
                                />
                                {errors.work_email && (
                                    <p className="text-red-400 text-xs">{errors.work_email}</p>
                                )}
                            </div>

                            {/* Company Name */}
                            <div className="flex flex-col gap-1">
                                <input
                                    type="text"
                                    name="company_name"
                                    placeholder="Company Name"
                                    value={formData.company_name}
                                    onChange={handleChange}
                                    className="w-full h-12 px-4 rounded-lg bg-white/5 border border-border-subtle text-white focus:border-accent-purple focus:outline-none transition-colors"
                                />
                                {errors.company_name && (
                                    <p className="text-red-400 text-xs">{errors.company_name}</p>
                                )}
                            </div>

                            {/* Approximate ARR */}
                            <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <select
                                        name="approximate_arr"
                                        value={formData.approximate_arr}
                                        onChange={handleChange}
                                        className="w-full h-12 px-4 rounded-lg bg-white/5 border border-border-subtle text-white focus:border-accent-purple focus:outline-none transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled className="bg-[#0A0A0A] text-text-tertiary">Approximate ARR</option>
                                        <option value="Under $3M" className="bg-[#0A0A0A]">Under $3M</option>
                                        <option value="$3M - $10M" className="bg-[#0A0A0A]">$3M - $10M</option>
                                        <option value="$10M - $50M" className="bg-[#0A0A0A]">$10M - $50M</option>
                                        <option value="$50M+" className="bg-[#0A0A0A]">$50M+</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-tertiary">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                {errors.approximate_arr && (
                                    <p className="text-red-400 text-xs">{errors.approximate_arr}</p>
                                )}
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary w-full justify-center h-12 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Submitting..." : "Schedule The Diagnostic"}
                            </button>

                            {/* Network / server error */}
                            {submitError && (
                                <p className="text-red-400 text-xs text-center">{submitError}</p>
                            )}

                            <p className="text-[10px] sm:text-xs text-text-tertiary text-center mt-4 uppercase tracking-wider flex flex-col gap-1">
                                <span>30 minutes or less.</span>
                                <span>Walk away knowing if your problem is structural, or not.</span>
                            </p>
                        </form>
                    )}
                </motion.div>
            </ScrollFade>
        </section>
    );
}
