"use client";

import Image from "next/image";

const logos = [
    { src: "/logos/sony.png", alt: "Sony" },
    { src: "/logos/google.png", alt: "Google" },
    { src: "/logos/microsoft.png", alt: "Microsoft" },
    { src: "/logos/slack.png", alt: "Slack" },
    { src: "/logos/coca-cola.png", alt: "Coca-Cola" },
    { src: "/logos/volvo.png", alt: "Volvo" },
    { src: "/logos/t-mobile.png", alt: "T-Mobile" },
    { src: "/logos/nickelodeon.png", alt: "Nickelodeon" },
    { src: "/logos/disney.png", alt: "Disney" },
    { src: "/logos/sofi.png", alt: "SoFi" },
    { src: "/logos/netgear.png", alt: "Netgear" },
    { src: "/logos/zetta.png", alt: "Zetta" },
    { src: "/logos/metajive.png", alt: "Metajive" },
    { src: "/logos/apto.png", alt: "Apto Solutions" },
    { src: "/logos/rapnet.png", alt: "Rapnet" },
    { src: "/logos/tria.png", alt: "Tria Beauty" },
    { src: "/logos/sigfig.png", alt: "SigFig" },
    { src: "/logos/sequence.png", alt: "Sequence" },
    { src: "/logos/paige.png", alt: "Paige" },
    { src: "/logos/phil.png", alt: "Phil" },
];

export default function LogoCarousel() {
    return (
        <section className="py-16 sm:py-24 bg-bg-page relative overflow-hidden border-t border-white/5">
            <div className="container-width text-center">
                <p className="text-sm font-bold text-text-tertiary uppercase tracking-[0.2em] mb-12 sm:mb-16">
                    Trusted by SMBs & Enterprise alike
                </p>
            </div>

            <div className="relative overflow-hidden">
                {/* Gradient fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-40 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-40 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none" />

                <div className="animate-logo-scroll flex w-max">
                    {[...logos, ...logos].map((logo, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-center mx-6 sm:mx-12 shrink-0"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="h-6 sm:h-10 w-auto max-w-[120px] sm:max-w-none opacity-50 hover:opacity-100 transition-opacity duration-300"
                                style={{ filter: "brightness(0) invert(1)" }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
