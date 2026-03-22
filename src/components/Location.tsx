"use client";

import { Anton } from "next/font/google";
import { Playfair_Display } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ weight: ["600", "700"], subsets: ["latin"], display: "swap" });

export default function Location() {
  return (
    <section id="location" className="relative py-24 md:py-32 bg-[#0A0A0A] border-t border-white/5 overflow-hidden z-20">
      
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
        <span className={`text-[12vw] leading-none text-white tracking-widest ${anton.className}`}>
          BASE
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <h2 className={`${anton.className} text-5xl md:text-7xl lg:text-8xl text-white tracking-widest uppercase drop-shadow-md`}>
            THERE IS NO <span className="text-[#C41A1A]">TOMORROW.</span>
          </h2>
          <p className="mt-6 text-[#F0EDE8]/60 text-sm md:text-base font-medium tracking-widest uppercase max-w-2xl">
            The definitive training facility in the North. Built for pure performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Side: Location Details */}
          <div className="flex flex-col text-white">
            
            <div className="flex items-start gap-5 mb-8">
              <svg className="w-6 h-6 shrink-0 text-[#C41A1A] mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h3 className="text-xl font-bold tracking-widest mb-2 uppercase">Vanguard HQ</h3>
                <p className="text-[#F0EDE8]/60 font-light leading-relaxed tracking-wide">
                  Unit 4, The Ancoats Foundry<br />
                  Manchester, M4 6LN
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 mb-8">
              <svg className="w-6 h-6 shrink-0 text-[#C41A1A] mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="text-[#F0EDE8]/60 font-light tracking-widest mt-1">
                  +44 161 829 3040
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 mb-12">
              <svg className="w-6 h-6 shrink-0 text-[#C41A1A] mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-[#F0EDE8]/60 font-light tracking-wide leading-relaxed">
                  <span className="text-white font-medium uppercase tracking-widest">Mon–Fri:</span> 5AM – 11PM<br />
                  <span className="text-white font-medium uppercase tracking-widest">Sat–Sun:</span> 6AM – 9PM
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-6 mb-12">
              <a 
                href="https://maps.google.com/?q=Ancoats+Foundry+Manchester+M4+6LN" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative overflow-hidden px-8 py-3.5 border border-white/30 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full group/btn block"
              >
                <span className="relative z-10 transition-colors duration-300 text-white">Get Directions</span>
                <div className="absolute inset-x-0 bottom-0 h-0 transition-all duration-300 ease-out group-hover/btn:h-full z-0" style={{ backgroundImage: 'linear-gradient(to top, #400000, #8A0303, #C41A1A)' }} />
              </a>
              <a 
                href="https://maps.google.com/?q=Ancoats+Foundry+Manchester+M4+6LN" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#C41A1A] font-bold text-xs uppercase tracking-[0.2em] hover:text-white transition-colors duration-300"
              >
                Find Your Base
              </a>
            </div>

            {/* Interactive Google Map Embed */}
            <div className="w-full h-64 bg-[#0e0d0d] rounded-2xl border border-white/10 relative overflow-hidden shadow-inner group">
              <iframe
                src="https://maps.google.com/maps?q=Ancoats+Foundry+Manchester+M4+6LN&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg) brightness(85%) contrast(110%) grayscale(20%)' }}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl" />
            </div>

          </div>

          {/* Right Side: Communication Form */}
          <div className="bg-[#151515] p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden shadow-2xl h-fit">
            {/* Soft red glow */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#C41A1A]/10 rounded-full blur-[100px] pointer-events-none" />
            
            <h3 className={`${anton.className} text-4xl text-white tracking-widest uppercase mb-2`}>
              COMMUNICATIONS
            </h3>
            <p className="text-[#F0EDE8]/50 text-xs font-medium mb-10 tracking-[0.2em] uppercase">
              Membership, training, or brand inquiries.
            </p>

            <form className="flex flex-col gap-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C41A1A] transition-colors font-light text-sm"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C41A1A] transition-colors font-light text-sm"
              />
              <input 
                type="tel" 
                placeholder="Phone (optional)" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C41A1A] transition-colors font-light text-sm"
              />
              <textarea 
                placeholder="How can we help?" 
                rows={4}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#C41A1A] transition-colors font-light text-sm resize-none"
              />
              
              <button 
                type="submit" 
                className="mt-6 w-full bg-[#C41A1A] text-white py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-xs hover:bg-white hover:text-black transition-colors duration-300 drop-shadow-[0_0_15px_rgba(196,26,26,0.3)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
