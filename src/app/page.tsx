"use client";
import { useRef } from "react";
import { useScroll, useSpring, motion, useTransform } from "framer-motion";
import HeroCanvas from "@/components/HeroCanvas";
import SmokeOverlay from "@/components/SmokeOverlay";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import TheCoaches from "@/components/TheCoaches";
import Facilities from "@/components/Facilities";
import Location from "@/components/Location";
import Reviews from "@/components/Reviews";
import { Playfair_Display, Cormorant_Garamond, Anton, Cinzel } from "next/font/google";

const playfair = Playfair_Display({
  weight: ["700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({ weight: ["400", "700"], subsets: ["latin"], display: "swap" });

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Text 1: Vanguard
  const opacity1 = useTransform(smoothProgress, [0, 0.1, 0.25, 0.3], [1, 1, 1, 0]);
  const scale1 = useTransform(smoothProgress, [0, 0.3], [1, 1.2]);

  // Text 2: Precision
  const opacity2 = useTransform(smoothProgress, [0.3, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  const scale2 = useTransform(smoothProgress, [0.3, 0.6], [0.8, 1.2]);

  // Text 3: Mastery
  const opacity3 = useTransform(smoothProgress, [0.6, 0.7, 0.85, 0.95], [0, 1, 1, 0]);
  const scale3 = useTransform(smoothProgress, [0.6, 0.95], [0.8, 1.2]);

  return (
    <main className="bg-[#111010]">
      
      <Navbar />

      {/* Scroll Sequence Container — pt-16 offsets the fixed navbar */}
      <div id="home" ref={containerRef} className="relative h-[300vh] pt-16">
        
        {/* Sticky viewport — fills full viewport below navbar so Essentials is flush on contact */}
        <div className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#111010]">

          {/* Smoke — z-[1] */}
          <SmokeOverlay />

          {/* Canvas — z-[2], fills the full banner */}
          <HeroCanvas progress={smoothProgress} />

          {/* Overlays — z-10 */}
          <div className="absolute inset-0 z-10 pointer-events-none">

            {/* VANGUARD hero text — centred */}
            <motion.div
              style={{ opacity: opacity1, scale: scale1 }}
              className="absolute inset-0 flex items-center justify-center p-4"
            >
              <span
                className={`text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] tracking-widest text-[#F0EDE8] opacity-90 select-none text-center ${anton.className}`}
                style={{ textShadow: "0 20px 50px rgba(0,0,0,0.8)" }}
              >
                VANGUARD
              </span>
            </motion.div>

            {/* Vanguard Advanced SVK Shield Logo — fades in on scroll */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                style={{ opacity: opacity2, scale: scale2 }}
                className="absolute flex items-center justify-center"
              >
                <svg viewBox="0 0 200 200" className="w-[180px] sm:w-[250px] md:w-[350px] lg:w-[450px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-95" aria-label="Vanguard Chevron">
                  <defs>
                    <linearGradient id="redMetallic" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#C41A1A" />
                      <stop offset="50%" stopColor="#8A0303" />
                      <stop offset="100%" stopColor="#400000" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="8" stdDeviation="15" floodColor="#000" floodOpacity="0.8" />
                    </filter>
                  </defs>

                  <g filter="url(#glow)">
                    {/* The Triple Chevron Emblem */}
                    <g fill="none" stroke="url(#redMetallic)" strokeWidth="8" strokeLinecap="square" strokeLinejoin="miter" strokeMiterlimit="10">
                      <path d="M 40 110 L 100 150 L 160 110" />
                      <path d="M 40 130 L 100 170 L 160 130" />
                      <path d="M 40 150 L 100 190 L 160 150" />
                    </g>

                    {/* S V K */}
                    <text
                      y="100"
                      className={cinzel.className}
                      textAnchor="middle"
                      fill="#FFFFFF"
                    >
                      <tspan x="45" fontSize="65">S</tspan>
                      <tspan x="100" fontSize="110" dy="15">V</tspan>
                      <tspan x="155" fontSize="65" dy="-15">K</tspan>
                    </text>
                  </g>
                </svg>
              </motion.div>
            </div>

          </div>

          {/* Smooth gradient fade into the next section — z-20 so it's above canvas + text */}
          <div className="absolute bottom-0 left-0 right-0 h-40 z-20 pointer-events-none bg-gradient-to-t from-[#0e0d0d] via-[#0e0d0d]/60 to-transparent" />
        </div>
      </div>

      <Facilities />

      <Pricing />

      <TheCoaches />

      <Location />

      <Reviews />

      {/* Footer */}
      <Footer />
    </main>
  );
}
