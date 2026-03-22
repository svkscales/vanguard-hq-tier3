"use client";

import Image from "next/image";
import { Anton } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

export default function Facilities() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const facilities = [
    {
      title: "VIP ARENA",
      desc: "An expansive, brutalist main floor loaded with elite calibrated plates, competition racks, and heavy iron.",
      img: "/images/facilities_main_floor_1774126942955.png",
    },
    {
      title: "THE ARMORY",
      desc: "Hand-selected, biomechanically superior strength machines engineered strictly for maximum performance.",
      img: "/images/facilities_equipment_1774126958569.png",
    },
    {
      title: "THE STAGE",
      desc: "Perfectly calibrated harsh-contrast lighting and edge-to-edge mirrors designed to highlight every detail of your physique.",
      img: "/images/facilities_posing_1774126972203.png",
    },
    {
      title: "RECOVERY",
      desc: "State-of-the-art cold plunge contrast therapy and deep tissue sports restoration to ensure you never miss a heavy session.",
      img: "/images/facilities_recovery_1774126987437.png",
    },
  ];

  if (!mounted) return null;

  return (
    <section id="gym" className="w-full bg-[#0e0d0d] font-sans py-16 md:py-24 px-4 sm:px-8">
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {facilities.map((fac, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full h-[300px] md:h-[350px] lg:h-[400px] group overflow-hidden cursor-pointer rounded-2xl md:rounded-3xl shadow-2xl ring-1 ring-white/10"
          >
            {/* Background Image */}
            <Image
              src={fac.img}
              alt={fac.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Multi-layered cinematic gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0d] via-[#0e0d0d]/50 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
            
            {/* Content pushed toward the bottom for Bento aesthetics */}
            <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-6 md:p-8 z-10 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-4">
              <h2 
                className={`${anton.className} text-3xl sm:text-4xl md:text-5xl text-[#C41A1A] mb-2 md:mb-3 tracking-wider uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,1)] transition-colors duration-500`}
                style={{ letterSpacing: '0.05em' }}
              >
                {fac.title}
              </h2>
              <p className="text-[#F0EDE8]/90 max-w-sm text-xs sm:text-sm mb-4 md:mb-6 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-light leading-relaxed">
                {fac.desc}
              </p>
              
              <Link
                href={`/facility/${fac.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="relative overflow-hidden px-6 py-2 md:px-8 md:py-3 border border-white/40 text-white transition-all duration-300 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium rounded-full backdrop-blur-md bg-black/30 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group/btn"
              >
                <span className="relative z-10 transition-colors duration-300 text-white">View Details</span>
                <div className="absolute inset-x-0 bottom-0 h-0 bg-[#8A0303] transition-all duration-300 ease-out group-hover/btn:h-full z-0" style={{ backgroundImage: 'linear-gradient(to top, #400000, #8A0303, #C41A1A)' }} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
