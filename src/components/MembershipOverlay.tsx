"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Anton } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

export type PlanData = {
  name: string;
  price?: string;
  period?: string;
  time?: string;
  features: string[];
  type: "membership" | "class";
  popular?: boolean;
};

type MembershipOverlayProps = {
  isOpen: boolean;
  item: PlanData | null;
  onClose: () => void;
  onChangeItem: (newItem: PlanData) => void;
  allPlans: PlanData[];
};

export default function MembershipOverlay({ isOpen, item, onClose, onChangeItem, allPlans }: MembershipOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (item && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      setBilling("monthly");
    }
  }, [item]);

  // Handle browser back button smoothly without pushing history state
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    
    const handlePopState = () => onClose();
    window.addEventListener("popstate", handlePopState);
    
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item || !mounted) return null;

  const basePriceMatch = item.price?.match(/\d+/);
  const basePrice = basePriceMatch ? parseFloat(basePriceMatch[0]) : 25; 
  
  const monthlyPrice = basePrice;
  const yearlyPrice = basePrice * 10;

  const currentPrice = billing === "monthly" ? monthlyPrice : yearlyPrice;
  const currentPeriod = billing === "monthly" ? "MONTH" : "YEAR";

  const handleAddToCart = () => {
    const event = new CustomEvent("add-to-cart", {
      detail: {
        name: `${item.name} (${billing.toUpperCase()})`,
        price: currentPrice,
        type: item.type === "membership" ? "Membership Plan" : "Class Session"
      }
    });
    window.dispatchEvent(event);
  };

  const otherPlans = allPlans.filter(p => p.name !== item.name);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#8A0303]/20 bg-[#0a0a0a] z-10 shrink-0">
          <div className="flex items-center gap-6">
            <button onClick={onClose} className="text-[#F0EDE8]/50 hover:text-white transition-colors flex items-center gap-1 text-xs uppercase tracking-widest font-medium group">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-1 transition-transform">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
            <h2 className={`${anton.className} text-[#F0EDE8] uppercase tracking-[0.2em] text-xl hidden sm:block`}>Configure Plan</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-[#F0EDE8]/30 hover:text-[#C41A1A] transition-colors bg-white/5 rounded-full hover:bg-white/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto hide-scrollbar relative">
          
          <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="max-w-[1200px] mx-auto p-6 md:p-12 w-full flex flex-col items-center relative z-10">
            
            {/* Main Plan Display */}
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-2xl bg-[#0e0d0d] border border-[#8A0303]/30 rounded-[2rem] p-8 md:p-12 shadow-[0_0_80px_rgba(138,3,3,0.15)] mb-16 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C41A1A] to-transparent opacity-50"></div>
              
              <h1 className={`${anton.className} text-4xl md:text-5xl text-white tracking-widest uppercase mb-4 text-center`}>{item.name}</h1>
              {item.time && <p className="text-[#C41A1A] text-center font-bold text-sm tracking-[0.2em] uppercase mb-8">{item.time}</p>}
              
              {/* Billing Toggle (Only for memberships) */}
              {item.type === "membership" && (
                <div className="flex bg-black/60 rounded-full p-1.5 mb-10 mx-auto w-fit border border-white/10 shadow-inner">
                  <button 
                    onClick={() => setBilling("monthly")}
                    className={`px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${billing === "monthly" ? "bg-[#8A0303] text-white shadow-[0_0_20px_rgba(138,3,3,0.5)]" : "text-white/40 hover:text-white"}`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setBilling("yearly")}
                    className={`px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${billing === "yearly" ? "bg-[#8A0303] text-white shadow-[0_0_20px_rgba(138,3,3,0.5)]" : "text-white/40 hover:text-white"}`}
                  >
                    Annually
                  </button>
                </div>
              )}

              {/* Price Details */}
              <div className="flex flex-col items-center justify-center mb-10 pb-10 border-b border-white/5">
                <div className="flex items-baseline gap-2">
                  <span className={`${anton.className} text-7xl md:text-8xl text-white font-bold drop-shadow-md`}>£{currentPrice}</span>
                  <span className="text-white/50 text-sm tracking-[0.2em] uppercase leading-none">/ {currentPeriod}</span>
                </div>
                {billing === "yearly" && (
                  <span className="text-[#C41A1A] text-[10px] font-bold uppercase tracking-[0.3em] mt-4 bg-[#C41A1A]/10 px-4 py-2 rounded-full border border-[#C41A1A]/20">Save over 15%</span>
                )}
              </div>

              {/* Features List */}
              <div className="mb-12 max-w-sm mx-auto">
                <h4 className="text-[#F0EDE8]/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-center">What's Included</h4>
                <ul className="flex flex-col gap-5">
                  {item.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-4 text-[#F0EDE8]/80 text-sm md:text-base font-light">
                      <div className="w-5 h-5 rounded-full bg-[#8A0303]/20 flex items-center justify-center shrink-0 border border-[#8A0303]/30">
                        <svg className="w-3 h-3 text-[#C41A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Basket */}
              <button 
                onClick={() => {
                   handleAddToCart();
                   // Removed onClose() so the user remains on the overlay
                }}
                className="w-full py-5 bg-[#F0EDE8] hover:bg-white text-black text-xs font-extrabold uppercase tracking-[0.3em] rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 block text-center"
              >
                Add to Basket
              </button>
            </motion.div>

            {/* Cross-Sells Section */}
            <div className="w-full max-w-5xl">
              <h3 className={`${anton.className} text-2xl md:text-3xl text-[#F0EDE8]/80 uppercase tracking-widest pl-4 mb-8 border-l-4 border-[#8A0303]`}>
                Other Plans & Classes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherPlans.map((plan, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => onChangeItem(plan)}
                    className="group bg-[#0e0d0d] border border-white/5 rounded-2xl p-6 md:p-8 cursor-pointer hover:border-[#8A0303]/50 transition-all duration-500 hover:bg-[#151515] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8A0303]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className={`${anton.className} text-2xl text-white tracking-widest uppercase group-hover:text-[#F0EDE8]`}>{plan.name}</h4>
                        <span className="text-[#C41A1A] font-light text-[10px] tracking-widest border border-[#C41A1A]/30 px-2 py-1 rounded">
                          {plan.type === "membership" ? "PLAN" : "CLASS"}
                        </span>
                      </div>
                      {plan.price && (
                        <span className="text-white/60 text-sm tracking-wide block mb-4 font-light">{plan.price} /m</span>
                      )}
                      <p className="text-[#F0EDE8]/30 text-xs leading-relaxed line-clamp-2">
                        {plan.features.join(" • ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
