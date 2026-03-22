"use client";
import { motion } from "framer-motion";
import { Anton } from "next/font/google";
import Link from "next/link";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

const memberships = [
  {
    name: "STANDARD ACCESS",
    price: "£125",
    period: "/ MONTH",
    features: ["Full Gym Access", "Locker Room & Saunas", "1x Free Inbody Scan"],
  },
  {
    name: "ELITE PERFORMANCE",
    price: "£185",
    period: "/ MONTH",
    features: ["Full Gym Access", "Unlimited Athletic Lab Recovery", "Priority Booking", "VIP Locker Access"],
    popular: true,
  },
];

const classes = [
  {
    name: "IRON FORGE",
    time: "MON/WED/FRI — 6:00 AM",
    features: ["Advanced Powerlifting", "Strength Mechanics", "Max Out Friday"],
  },
  {
    name: "FIGHT CLUB",
    time: "TUE/THU — 7:00 PM",
    features: ["Padwork & Speed", "Heavy Bag Drills", "Cardio Conditioning"],
  },
];

export default function Pricing() {
  return (
    <section id="info" className="relative py-24 md:py-32 bg-[#0e0d0d] overflow-hidden z-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 relative z-10 w-full">
        
        {/* Two Column Layout (Memberships & Classes first) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full mb-20 md:mb-28">
          
          {/* Left Side: Memberships */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col"
          >
            <h2 className={`${anton.className} text-6xl md:text-7xl text-white mb-8 tracking-widest uppercase drop-shadow-md`}>
              Memberships
            </h2>
            
            <div className="flex flex-col gap-6">
              {memberships.map((item, idx) => (
                <div key={idx} className={`relative p-8 rounded-3xl border ${item.popular ? 'border-[#8A0303]/50 bg-[#8A0303]/[0.03]' : 'border-white/10 bg-white/[0.01]'} backdrop-blur-sm transition-all duration-500 hover:border-white/30 group`}>
                  {item.popular && (
                    <div className="absolute -top-3 right-8 bg-gradient-to-r from-[#C41A1A] to-[#8A0303] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full shadow-lg">
                      Recommended
                    </div>
                  )}
                  <h3 className={`${anton.className} text-3xl md:text-4xl text-white tracking-wide uppercase mb-2 group-hover:text-[#F0EDE8] transition-colors duration-300`}>{item.name}</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl md:text-5xl text-white font-bold">{item.price}</span>
                    <span className="text-white/50 text-sm tracking-[0.2em] uppercase leading-none">{item.period}</span>
                  </div>
                  
                  <ul className="flex flex-col gap-4 mb-8">
                    {item.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-4 text-[#F0EDE8]/80 text-sm md:text-base font-light">
                        <svg className="w-5 h-5 text-[#C41A1A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="#" className={`relative overflow-hidden block w-full py-4 text-center text-xs tracking-[0.2em] uppercase font-medium rounded-full transition-all duration-300 border ${item.popular ? 'border-[#C41A1A] bg-[#8A0303]' : 'border-white/20 bg-transparent'} group/btn`}>
                    <span className="relative z-10 transition-colors duration-300 text-white">Select Plan</span>
                    <div className="absolute inset-x-0 bottom-0 h-0 transition-all duration-300 ease-out group-hover/btn:h-full z-0" style={{ backgroundImage: 'linear-gradient(to top, #400000, #8A0303, #C41A1A)' }} />
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Classes */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col"
          >
            <h2 className={`${anton.className} text-6xl md:text-7xl text-[#8A0303] mb-8 tracking-widest uppercase drop-shadow-md`}>
              Classes
            </h2>
            
            <div className="flex flex-col gap-6">
              {classes.map((item, idx) => (
                <div key={idx} className="relative p-8 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-sm transition-all duration-500 hover:border-white/30 group">
                  <h3 className={`${anton.className} text-3xl md:text-4xl text-white tracking-wide uppercase mb-2 group-hover:text-[#F0EDE8] transition-colors duration-300`}>{item.name}</h3>
                  <div className="text-[#C41A1A] font-bold text-sm tracking-[0.2em] uppercase mb-8">
                    {item.time}
                  </div>
                  
                  <ul className="flex flex-col gap-4 mb-8">
                    {item.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-4 text-[#F0EDE8]/80 text-sm md:text-base font-light">
                        <svg className="w-5 h-5 text-[#C41A1A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="#" className="relative overflow-hidden block w-full py-4 text-center text-xs tracking-[0.2em] uppercase font-medium rounded-full bg-transparent border border-white/20 text-white group/btn">
                    <span className="relative z-10 transition-colors duration-300 text-white">Book Class</span>
                    <div className="absolute inset-x-0 bottom-0 h-0 transition-all duration-300 ease-out group-hover/btn:h-full z-0" style={{ backgroundImage: 'linear-gradient(to top, #400000, #8A0303, #C41A1A)' }} />
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Membership Steel Card CTA (Moved beneath grid) */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative w-full max-w-4xl mx-auto rounded-2xl md:rounded-3xl p-10 md:p-16 text-center overflow-hidden group border border-white/5 shadow-2xl"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a0000] via-[#8A0303] to-[#400000] opacity-90 transition-transform duration-[1.5s] group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <h2 className={`${anton.className} text-4xl sm:text-5xl md:text-6xl text-white tracking-widest uppercase mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]`}>
              OWN VANGUARD CARD
            </h2>
            <p className="text-[#F0EDE8]/90 text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] max-w-lg mb-10 drop-shadow-sm uppercase">
              Official forged steel membership card. Get your steel membership card today.
            </p>
            <Link
              href="#"
              className="px-10 py-3.5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs md:text-sm rounded-full hover:bg-transparent hover:text-white border-2 border-transparent hover:border-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-none"
            >
              Get Your Card
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
