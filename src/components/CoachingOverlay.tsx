"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Anton } from "next/font/google";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

export type CoachData = {
  name: string;
  title: string;
  slug: string;
};

type CoachingOverlayProps = {
  isOpen: boolean;
  coach: CoachData | null;
  onClose: () => void;
};

export default function CoachingOverlay({ isOpen, coach, onClose }: CoachingOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setName("");
    setEmail("");
    setPhone("");

    // Lock background scroll
    document.body.style.overflow = "hidden";

    // Safe popstate back block
    const handlePopState = () => onClose();
    window.addEventListener("popstate", handlePopState);
    
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !coach || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    
    window.dispatchEvent(new CustomEvent("show-toast", { detail: "Training Request Sent" }));
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col pt-10 md:pt-0"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#8A0303]/20 bg-[#0a0a0a] z-10 shrink-0 mt-8 md:mt-0">
          <div className="flex items-center gap-6">
            <button onClick={onClose} className="text-[#F0EDE8]/50 hover:text-white transition-colors flex items-center gap-1 text-xs uppercase tracking-widest font-medium group">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-1 transition-transform">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
            <h2 className={`${anton.className} text-[#F0EDE8] uppercase tracking-[0.2em] text-xl hidden sm:block`}>Book 1-to-1 Session</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-[#F0EDE8]/30 hover:text-[#C41A1A] transition-colors bg-white/5 rounded-full hover:bg-white/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto hide-scrollbar relative">
          <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="max-w-[800px] mx-auto p-6 md:p-12 w-full flex flex-col items-center relative z-10">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full bg-[#0e0d0d] border border-[#8A0303]/30 rounded-[2rem] p-8 md:p-12 shadow-[0_0_80px_rgba(138,3,3,0.15)] mb-16 relative overflow-hidden"
            >
              <div className="flex flex-col items-center border-b border-white/5 pb-8 mb-8">
                <h1 className={`${anton.className} text-4xl md:text-5xl text-white tracking-widest uppercase mb-2 text-center`}>{coach.name}</h1>
                <p className="text-[#C41A1A] text-center font-bold text-sm tracking-[0.2em] uppercase mb-6">{coach.title}</p>
                
                <div className="bg-[#151515] border border-white/5 px-8 py-6 rounded-2xl w-full flex flex-col md:flex-row justify-between items-center gap-4">
                   <div className="flex flex-col text-center md:text-left">
                     <span className="text-[#F0EDE8]/40 text-[10px] tracking-[0.2em] font-bold uppercase mb-1">Session Type</span>
                     <span className="text-white text-sm tracking-wider uppercase font-light">1-to-1 Coaching</span>
                   </div>
                   <div className="flex flex-col items-center md:items-end">
                     <span className="text-[#F0EDE8]/40 text-[10px] tracking-[0.2em] font-bold uppercase mb-1">Pricing Range</span>
                     <span className={`${anton.className} text-3xl text-white`}>£100 - £150</span>
                   </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="block text-[#F0EDE8]/50 text-[10px] uppercase font-bold tracking-[0.2em] mb-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-[#151515] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#C41A1A] transition-colors"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F0EDE8]/50 text-[10px] uppercase font-bold tracking-[0.2em] mb-2">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-[#151515] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#C41A1A] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F0EDE8]/50 text-[10px] uppercase font-bold tracking-[0.2em] mb-2">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-[#151515] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#C41A1A] transition-colors"
                      placeholder="+44 7700 900077"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="mt-6 w-full py-5 bg-[#F0EDE8] hover:bg-white text-black text-xs font-extrabold uppercase tracking-[0.3em] rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 block text-center"
                  >
                    Send Booking Request
                  </button>
                </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
