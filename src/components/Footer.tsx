"use client";

import { Anton, Cinzel } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });
const cinzel = Cinzel({ weight: ["400", "700"], subsets: ["latin"], display: "swap" });


function CompactShieldLogo() {
  const gradId = `chromeGrad-footer`;
  return (
    <svg viewBox="0 0 110 70" className="w-24 h-auto md:w-32 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SVK Vanguard">
      <defs>
        <linearGradient id={`${gradId}-red`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C41A1A" />
          <stop offset="50%" stopColor="#8A0303" />
          <stop offset="100%" stopColor="#400000" />
        </linearGradient>
      </defs>
      <text y="55" className={cinzel.className} textAnchor="middle" fill="#FFFFFF">
        <tspan x="20" fontSize="45">S</tspan>
        <tspan x="55" fontSize="70" dy="5" fill={`url(#${gradId}-red)`}>V</tspan>
        <tspan x="90" fontSize="45" dy="-5">K</tspan>
      </text>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] w-full flex flex-col z-20 overflow-hidden">
      
      {/* Brand Header Banner */}
      <div className="relative w-full h-[350px] md:h-[400px] flex flex-col items-center justify-center border-t-2 border-[#C41A1A] bg-[#0A0A0A] overflow-hidden">
        
        {/* Cinematic Scrolling Text Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center opacity-[0.02]">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            className="flex whitespace-nowrap min-w-max"
          >
            <span className={`${anton.className} text-[200px] md:text-[300px] leading-none text-white px-4`}>
              VANGUARD VANGUARD VANGUARD VANGUARD VANGUARD VANGUARD
            </span>
          </motion.div>
        </div>
        
        {/* Subtle fade from bottom so text pops */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent pointer-events-none" />
        
        {/* Content over skyline */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full mt-auto mb-16 md:mb-20">
          <h2 className={`${anton.className} text-[15vw] md:text-8xl lg:text-[140px] text-white/90 tracking-widest leading-none drop-shadow-2xl shadow-black uppercase mb-6 md:mb-8`}>
            MANCHESTER
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-32 w-full max-w-5xl drop-shadow-md bg-black/40 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none px-6 py-4 md:p-0 rounded-2xl">
            <div className="text-white text-center flex flex-col items-center">
              <p className="font-bold tracking-widest text-[#C41A1A] text-xs md:text-sm mb-1.5 uppercase">Unit 4, The Ancoats Foundry</p>
              <p className="font-light text-[#F0EDE8]/90 text-xs md:text-sm tracking-widest uppercase">Manchester, M4 6LN</p>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-[#C41A1A]/80 shadow-[0_0_10px_rgba(196,26,26,1)]" />
            
            <div className="text-white text-center flex flex-col items-center">
              <p className="font-bold tracking-widest text-[#C41A1A] text-xs md:text-sm mb-1.5 uppercase">Operating Hours</p>
              <p className="font-light text-[#F0EDE8]/90 text-xs md:text-sm tracking-widest uppercase leading-snug">
                Mon–Fri: 5AM to 11PM<br />
                Sat–Sun: 6AM to 9PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Thick Red Divider Line */}
      <div className="w-full h-3 md:h-4 bg-[#C41A1A] shadow-[0_0_30px_rgba(196,26,26,0.6)] z-30 relative" />

      {/* Main Footer Links Segment */}
      <div className="w-full max-w-[1600px] mx-auto px-6 py-20 md:py-32 relative z-30">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-10">
          
          {/* Logo Column */}
          <div className="flex justify-center border-b border-white/5 pb-12 lg:border-none lg:pb-0 lg:justify-start w-full lg:w-1/4">
            <CompactShieldLogo />
          </div>
          
          {/* Links Columns */}
          <div className="w-full lg:flex-1 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-16 justify-items-center lg:justify-items-start text-center lg:text-left">
            
            {/* Find Out More */}
            <div className="flex flex-col space-y-5">
              <h4 className="text-white font-bold tracking-[0.2em] uppercase text-sm mb-2 border-b-2 border-white/20 pb-2 inline-block w-fit">
                FIND OUT MORE
              </h4>
              <Link href="#info" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">About</Link>
              <Link href="#info" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Memberships</Link>
              <Link href="#info" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Passes</Link>
              <Link href="#shop" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Shop</Link>
              <Link href="#coaching" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Personal Training</Link>
              <Link href="#gym" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Posing Room</Link>
              <Link href="#location" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Contact</Link>
            </div>
            
            {/* Information */}
            <div className="flex flex-col space-y-5">
              <h4 className="text-white font-bold tracking-[0.2em] uppercase text-sm mb-2 border-b-2 border-white/20 pb-2 inline-block w-fit">
                INFORMATION
              </h4>
              <Link href="/" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Gym Waiver</Link>
              <Link href="/" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Cancellations</Link>
              <Link href="/" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Returns & Exchanges</Link>
              <Link href="/" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Shipping Policy</Link>
              <Link href="/" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Privacy Policy</Link>
              <Link href="/" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Terms & Conditions</Link>
              <Link href="/" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Careers</Link>
            </div>
            
            {/* Brands */}
            <div className="flex flex-col space-y-5 col-span-2 md:col-span-1 border-t border-white/10 pt-8 md:border-t-0 md:pt-0 items-center lg:items-start w-full">
              <h4 className="text-white font-bold tracking-[0.2em] uppercase text-sm mb-2 border-b-2 border-white/20 pb-2 inline-block w-fit">
                COLLECTIVE
              </h4>
              <Link href="#coaching" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Gunter Voss Training</Link>
              <Link href="#info" className="text-[#F0EDE8]/70 hover:text-[#C41A1A] transition-colors text-[11px] md:text-xs tracking-widest uppercase font-bold">Vanguard Fight Club</Link>
            </div>

          </div>
          
          {/* Social Icons Right side */}
          <div className="flex flex-row lg:flex-col gap-8 lg:w-[60px] items-center justify-center w-full lg:w-auto mt-8 lg:mt-0">
             <a href="/" className="text-[#C41A1A] hover:text-white transition-colors">
               <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
             </a>
             <a href="/" className="text-[#C41A1A] hover:text-white transition-colors">
               <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
             </a>
             <a href="/" className="text-[#C41A1A] hover:text-white transition-colors">
               <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
             </a>
          </div>

        </div>

        {/* Footer Bottom / Copyright */}
        <div className="border-t-[0.5px] border-[#C41A1A]/30 mt-16 pt-10 text-center flex flex-col items-center">
           <p className="text-[#F0EDE8]/80 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-4 drop-shadow-sm">
             UNIT 4, THE ANCOATS FOUNDRY&nbsp;&nbsp;|&nbsp;&nbsp;MANCHESTER, M4 6LN&nbsp;&nbsp;|&nbsp;&nbsp;+44 161 829 3040
           </p>
           <p className="text-white/30 text-[10px] tracking-widest uppercase mb-1 font-medium">
             © 2014-2026 Vanguard Iron Forge. All Rights Reserved.
           </p>
        </div>
      </div>
    </footer>
  );
}
