"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmokeOverlay from "@/components/SmokeOverlay";
import { Anton, Playfair_Display } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ weight: ["700", "900"], subsets: ["latin"], display: "swap" });

export default function ContactUs() {

  return (
    <main className="bg-[#111010] min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      <div className="relative flex-grow flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden z-10 w-full">
        {/* Background elements to match the Hero / Main sections */}
        <SmokeOverlay />
        <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-[#0e0d0d] via-transparent to-[#0e0d0d]/40"></div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 relative z-20 w-full pb-10">
          
          {/* Hero Title */}
          <motion.div 
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center mb-16 md:mb-24 mt-10 md:mt-20"
          >
            <h1 className={`${anton.className} text-6xl md:text-8xl lg:text-[10rem] tracking-widest text-[#F0EDE8] opacity-95 select-none text-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-6`}>
              CONTACT US
            </h1>
            <div className="w-32 md:w-48 h-1 md:h-1.5 bg-gradient-to-r from-[#C41A1A] to-[#8A0303] shadow-[0_0_20px_rgba(196,26,26,0.6)]" />
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`text-[#F0EDE8]/70 text-center max-w-2xl text-lg md:text-xl leading-relaxed mt-10 ${playfair.className} italic`}
            >
              Reach out to us for membership inquiries, personal training details, or general questions. Your journey starts here.
            </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-6xl mx-auto">
            
            {/* Instagram Card - using dark/steel approach */}
            <motion.a 
              href="https://www.instagram.com/svkscales?igsh=MTkzZjkzOHNkNHExbg%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative w-full rounded-2xl md:rounded-3xl p-10 md:p-16 text-center overflow-hidden group border border-white/10 shadow-2xl block"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#111111] opacity-90 transition-transform duration-[1.5s] group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[url('/noise.png')] mix-blend-overlay" />
              
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <svg className="w-16 h-16 text-white mb-6 group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                
                <h2 className={`${anton.className} text-4xl sm:text-5xl md:text-6xl text-white tracking-widest uppercase mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]`}>
                  INSTAGRAM
                </h2>
                
                <p className="text-[#F0EDE8]/90 text-xs sm:text-sm font-bold tracking-[0.2em] mb-10 drop-shadow-sm uppercase">
                  @SVKSCALES
                </p>
                
                <div className="px-10 py-3.5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs md:text-sm rounded-full hover:bg-transparent hover:text-white border-2 border-transparent hover:border-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-none inline-block">
                  Follow Us
                </div>
              </div>
            </motion.a>

            {/* Email Card - using the red hot Vanguard Steel CTA approach */}
            <motion.a 
              href="mailto:svkscales@gmail.com"
              className="relative w-full rounded-2xl md:rounded-3xl p-10 md:p-16 text-center overflow-hidden group border border-white/5 shadow-2xl block"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2a0000] via-[#8A0303] to-[#400000] opacity-90 transition-transform duration-[1.5s] group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[url('/noise.png')] mix-blend-overlay" />
              
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <svg className="w-16 h-16 text-white mb-6 group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                
                <h2 className={`${anton.className} text-4xl sm:text-5xl md:text-6xl text-white tracking-widest uppercase mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]`}>
                  EMAIL
                </h2>
                
                <p className="text-[#F0EDE8]/90 text-xs sm:text-sm font-bold tracking-[0.2em] mb-10 drop-shadow-sm uppercase">
                  SVKSCALES@GMAIL.COM
                </p>
                
                <div className="px-10 py-3.5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs md:text-sm rounded-full hover:bg-transparent hover:text-white border-2 border-transparent hover:border-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-none inline-block">
                  Send Message
                </div>
              </div>
            </motion.a>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
