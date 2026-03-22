"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Anton } from "next/font/google";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PlanData } from "./MembershipOverlay";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

export default function VanguardCardOverlay({ isOpen, onClose, allPlans }: { isOpen: boolean, onClose: () => void, allPlans: PlanData[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    const handlePopState = () => onClose();
    window.addEventListener("popstate", handlePopState);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  // Find standard vs recommended
  const standard = allPlans.find(p => p.name.includes("STANDARD"));
  const recommended = allPlans.find(p => p.popular);

  const displayPlans = [standard, recommended].filter(Boolean) as PlanData[];

  const handleAddToCart = (item: PlanData) => {
    const basePriceMatch = item.price?.match(/\d+/);
    const price = basePriceMatch ? parseFloat(basePriceMatch[0]) : 125; 

    const event = new CustomEvent("add-to-cart", {
      detail: {
        name: `${item.name} (MONTHLY)`,
        price,
        type: "Membership Plan"
      }
    });
    window.dispatchEvent(event);
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
            <h2 className={`${anton.className} text-[#F0EDE8] uppercase tracking-[0.2em] text-xl hidden sm:block`}>Vanguard Cards</h2>
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
          
          <div className="max-w-[1400px] mx-auto p-6 md:p-12 w-full flex flex-col items-center relative z-10">
            <h1 className={`${anton.className} text-4xl md:text-5xl text-white tracking-widest uppercase mb-12 text-center`}>
              Choose Your Vanguard Card
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
              {displayPlans.map((plan, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative overflow-hidden bg-[#0e0d0d] rounded-3xl p-8 md:p-12 flex flex-col border ${plan.popular ? 'border-[#C41A1A] shadow-[0_0_50px_rgba(138,3,3,0.15)]' : 'border-white/10'}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-[#C41A1A] text-white text-[10px] sm:text-xs tracking-[0.2em] font-bold uppercase py-2 px-10 translate-x-[25%] translate-y-[50%] rotate-45 shadow-lg z-10">
                      Recommended
                    </div>
                  )}

                  <h3 className={`${anton.className} text-3xl text-white tracking-widest uppercase mb-2`}>{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/10">
                    <span className={`${anton.className} text-5xl text-white`}>{plan.price}</span>
                    <span className="text-white/50 text-xs tracking-widest uppercase">{plan.period}</span>
                  </div>

                  <ul className="flex flex-col gap-4 flex-1 mb-10">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-4 text-[#F0EDE8]/80 text-sm font-light">
                        <svg className="w-4 h-4 text-[#C41A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleAddToCart(plan)}
                    className={`w-full py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 ${plan.popular ? 'bg-[#8A0303] text-white hover:bg-[#C41A1A]' : 'bg-transparent border border-white/20 text-white hover:bg-white/5'}`}
                  >
                    Select Plan
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
