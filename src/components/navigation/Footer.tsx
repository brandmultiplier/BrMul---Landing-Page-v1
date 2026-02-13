"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/5">
            <div className="pt-16 sm:pt-24 pb-16 sm:pb-20">
                <div className="container-width">
                    <div className="grid md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <Link href="/" className="flex items-center gap-3 mb-6">
                                <div className="relative h-10 w-auto">
                                    <img
                                        src="/brandmultiplier-logo.png"
                                        alt="BrandMultiplier"
                                        className="h-full w-auto object-contain rounded-lg"
                                    />
                                </div>
                                <span className="font-bold text-lg tracking-tight text-white">
                                    BrandMultiplier
                                </span>
                            </Link>
                            <p className="text-sm sm:text-base text-[rgba(255,255,255,0.4)] max-w-sm leading-relaxed">
                                Narrative infrastructure for founder-led B2B companies.
                                We install systems, not deliver decks.
                            </p>
                        </div>

                        {/* Links */}
                        <div className="md:col-span-2 md:pl-20">
                            <h4 className="text-white font-medium mb-4">Navigation</h4>
                            <ul className="space-y-3 text-sm sm:text-base">
                                <li>
                                    <Link href="#trap" className="text-[rgba(255,255,255,0.4)] hover:text-white transition-colors">Founder&apos;s Trap</Link>
                                </li>
                                <li>
                                    <Link href="#system" className="text-[rgba(255,255,255,0.4)] hover:text-white transition-colors">The System</Link>
                                </li>
                                <li>
                                    <Link href="#case-studies" className="text-[rgba(255,255,255,0.4)] hover:text-white transition-colors">Case Studies</Link>
                                </li>
                                <li>
                                    <Link href="#pricing" className="text-[rgba(255,255,255,0.4)] hover:text-white transition-colors">Pricing Plan</Link>
                                </li>
                                <li>
                                    <Link href="#cta" className="text-[rgba(255,255,255,0.4)] hover:text-white transition-colors">Schedule The Diagnostic</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs sm:text-sm text-[rgba(255,255,255,0.3)]">
                            © {new Date().getFullYear()} BrandMultiplier.ai
                        </p>
                        <div className="flex gap-6 text-xs sm:text-sm text-[rgba(255,255,255,0.3)]">
                            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
