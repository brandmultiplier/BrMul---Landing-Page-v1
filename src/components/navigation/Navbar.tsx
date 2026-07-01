"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
    { name: "Founder's Trap", href: "/#trap" },
    { name: "Narrative OS", href: "/#system" },
    { name: "Case Studies", href: "/#case-studies" },
    { name: "Pricing Plan", href: "/#pricing" },
    { name: "Testimonials", href: "/#testimonials" },
];

const EMBED_ROUTES = [
    '/mtg-interview',
    '/mtg-deal-win',
    '/mtg-go-live',
    '/storylock-tax',
];

const MINIMAL_HEADER_ROUTES = [
    '/storylock-tax',
];

const LOGO_ONLY_HEADER_ROUTES = [
    '/NOS-architecture',
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Hide navbar on embed pages
    const isEmbedPage = EMBED_ROUTES.includes(pathname);
    const isMinimalHeaderRoute = MINIMAL_HEADER_ROUTES.includes(pathname);
    const isLogoOnlyHeaderRoute = LOGO_ONLY_HEADER_ROUTES.includes(pathname);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Logo-only header for standalone content pages
    if (isLogoOnlyHeaderRoute) {
        return (
            <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-white/95 backdrop-blur-md border-b border-black/5">
                <div className="container-width">
                    <Link href="/" className="group inline-flex items-center gap-3">
                        <div className="relative h-10 w-auto">
                            <img
                                src="/brandmultiplier-logo.png"
                                alt="BrandMultiplier"
                                className="h-full w-auto object-contain rounded-lg"
                            />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-[#111114] group-hover:text-[#4940C6] transition-colors">
                            BrandMultiplier
                        </span>
                    </Link>
                </div>
            </header>
        );
    }

    // Render minimal header for selected embed pages
    if (isMinimalHeaderRoute) {
        return (
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-50 py-4 bg-black/50 backdrop-blur-2xl"
            >
                <div className="container-width">
                    <div className="flex items-center justify-between gap-4 w-full">
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

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href="/#cta"
                                className="relative px-5 py-2.5 text-sm font-medium text-white rounded-full overflow-hidden group whitespace-nowrap inline-flex"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                                <span className="absolute inset-0 border border-white/20 rounded-full group-hover:border-transparent transition-colors" />
                                <span className="relative whitespace-nowrap">Get Started</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.header>
        );
    }

    // Don't render navbar on other embed pages
    if (isEmbedPage) {
        return null;
    }

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
                    <div className="flex items-center justify-between gap-4 w-full">
                        {/* Logo */}
                        <div className="flex-1 flex justify-start">
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
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-0 flex-nowrap flex-shrink-0 justify-center">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="relative px-4 py-2 text-sm text-[rgba(255,255,255,0.6)] hover:text-white transition-colors group whitespace-nowrap"
                                >
                                    {item.name}
                                    <motion.span
                                        className="absolute bottom-1 left-4 right-4 h-[1px] bg-gradient-to-r from-[#a855f7] to-[#6366f1] origin-left"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTA & Mobile Menu Button */}
                        <div className="flex-1 flex justify-end items-center gap-6">
                            <div className="hidden lg:block">
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        href="/#cta"
                                        className="relative px-5 py-2.5 text-sm font-medium text-white rounded-full overflow-hidden group whitespace-nowrap flex-shrink-0 inline-flex"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                                        <span className="absolute inset-0 border border-white/20 rounded-full group-hover:border-transparent transition-colors" />
                                        <span className="relative whitespace-nowrap">Get Started</span>
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden relative w-10 h-10 flex items-center justify-center"
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
                        </div>{/* end: flex-1 justify-end */}
                    </div>{/* end: flex justify-between */}
                </div>{/* end: container-width */}
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24 lg:hidden"
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
                                    href="/#cta"
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
