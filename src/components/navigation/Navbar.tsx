"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
    { name: "Founder's Trap", href: "#trap" },
    { name: "Narrative OS", href: "#system" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Pricing Plan", href: "#pricing" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
                    ? "py-4 bg-black/50 backdrop-blur-2xl"
                    : "py-6 bg-transparent"
                    }`}
            >
                <div className="container-width">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="group flex items-center gap-3">
                            <div className="relative h-10 w-auto">
                                <img
                                    src="/brandmultiplier-logo.png"
                                    alt="BrandMultiplier"
                                    className="h-full w-auto object-contain rounded-lg"
                                />
                            </div>
                            <span className="font-bold text-lg tracking-tight text-white group-hover:text-white/90 transition-colors">
                                BrandMultiplier
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="relative px-5 py-2 text-sm text-[rgba(255,255,255,0.6)] hover:text-white transition-colors group"
                                >
                                    {item.name}
                                    <motion.span
                                        className="absolute bottom-1 left-5 right-5 h-[1px] bg-gradient-to-r from-[#a855f7] to-[#6366f1] origin-left"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center gap-6">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    href="#cta"
                                    className="relative px-5 py-2.5 text-sm font-medium text-white rounded-full overflow-hidden group"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                                    <span className="absolute inset-0 border border-white/20 rounded-full group-hover:border-transparent transition-colors" />
                                    <span className="relative">Get Started</span>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden relative w-10 h-10 flex items-center justify-center"
                            aria-label="Toggle menu"
                        >
                            <div className="flex flex-col gap-1">
                                <motion.span
                                    animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                                    className="w-5 h-[1px] bg-white block origin-center"
                                />
                                <motion.span
                                    animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                                    className="w-5 h-[1px] bg-white block"
                                />
                                <motion.span
                                    animate={mobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                                    className="w-5 h-[1px] bg-white block origin-center"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24 md:hidden"
                    >
                        <nav className="container flex flex-col py-12">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-2xl font-light text-white hover:text-gradient transition-colors block py-3 border-b border-white/5"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navItems.length * 0.1 }}
                                className="pt-12"
                            >
                                <Link
                                    href="#cta"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="btn btn-primary w-full text-center justify-center text-lg"
                                >
                                    <span>Get Started</span>
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
