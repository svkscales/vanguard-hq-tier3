"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Anton, Cinzel } from "next/font/google";
import { useState } from "react";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });
const cinzel = Cinzel({ weight: ["400", "700"], subsets: ["latin"], display: "swap" });

type CartItem = { id: number; name: string; barber: string; date: string; price: number };

type CheckoutOverlayProps = {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
};

export default function CheckoutOverlay({ items, isOpen, onClose }: CheckoutOverlayProps) {
  const [step, setStep] = useState<"receipt" | "payment">("receipt");

  // Calculations
  const shopItemsTotal = items.filter(i => i.barber === "Vanguard Supply").reduce((s, i) => s + i.price, 0);
  const otherItemsTotal = items.filter(i => i.barber !== "Vanguard Supply").reduce((s, i) => s + i.price, 0);
  const discount = shopItemsTotal * 0.25;
  const subtotal = shopItemsTotal + otherItemsTotal - discount;

  const vatRate = 0.20; // 20% VAT
  const vatAmount = subtotal * vatRate;
  const total = subtotal + vatAmount;

  const handleClose = () => {
    // Reset to receipt view when closed
    setTimeout(() => setStep("receipt"), 300);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: 50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg bg-[#131211] border border-[#8A0303]/20 shadow-[0_0_50px_rgba(138,3,3,0.15)] flex flex-col overflow-hidden"
          >
            {/* Dark Vanguard noise texture */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/noise.png')] mix-blend-overlay"></div>

            {/* Header */}
            <div className="px-8 py-6 border-b border-[#8A0303]/10 flex justify-between items-center relative z-10 bg-[#0e0d0d]">
              <div>
                <h2 className={`${cinzel.className} text-[#F0EDE8] uppercase tracking-[0.2em] text-lg`}>
                  {step === "receipt" ? "Order Receipt" : "Payment"}
                </h2>
                <p className="text-[#8A0303] text-[9px] uppercase tracking-[0.25em] mt-1">Vanguard Secure Checkout</p>
              </div>
              <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center text-[#F0EDE8]/30 hover:text-[#C41A1A] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="relative z-10 p-8 flex flex-col">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: RECEIPT VIEW */}
                {step === "receipt" ? (
                  <motion.div
                    key="receipt"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex justify-between text-[10px] uppercase font-bold tracking-[0.2em] text-[#F0EDE8]/40 border-b border-white/5 pb-2">
                      <span>Item</span>
                      <span>Price</span>
                    </div>

                    {/* Order Items */}
                    <div className="flex flex-col gap-4 max-h-48 overflow-y-auto hide-scrollbar">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start group">
                          <div className="flex flex-col">
                            <span className="text-sm text-[#F0EDE8]/90 font-medium tracking-wide">{item.name}</span>
                            <span className="text-[10px] text-[#8A0303]/60 uppercase tracking-widest mt-1">{item.barber}</span>
                          </div>
                          <span className="text-sm text-[#F0EDE8]/70">£{item.price.toFixed(2)}</span>
                        </div>
                      ))}
                      {items.length === 0 && (
                        <span className="text-xs text-[#F0EDE8]/30 italic opacity-50 text-center py-4">No items in order.</span>
                      )}
                    </div>

                    {/* Totals */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-[#8A0303]/20">
                      {discount > 0 && (
                        <div className="flex justify-between items-center text-xs text-[#C41A1A] font-bold uppercase tracking-[0.1em]">
                          <span>Shop Discount (25%)</span>
                          <span>-£{discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-xs text-[#F0EDE8]/50 uppercase tracking-[0.1em]">
                        <span>Subtotal</span>
                        <span>£{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-[#F0EDE8]/50 uppercase tracking-[0.1em]">
                        <span>VAT (20%)</span>
                        <span>£{vatAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 pb-2 border-t border-white/5">
                        <span className={`${anton.className} text-xl tracking-widest text-[#F0EDE8]`}>TOTAL</span>
                        <span className="text-2xl text-[#C41A1A] font-light">£{total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button 
                      onClick={() => setStep("payment")}
                      disabled={items.length === 0}
                      className="mt-6 w-full py-4 bg-[#8A0303] text-[#F0EDE8] text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#a93226] transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                      <span className="relative z-10 transition-colors">Buy Now</span>
                      <div className="absolute inset-x-0 bottom-0 h-0 transition-all duration-300 ease-out group-hover:h-full z-0 bg-gradient-to-t from-[#400000] to-[#C41A1A]" />
                    </button>
                  </motion.div>
                ) : (
                  
                  /* STEP 2: PAYMENT METHODS */
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col gap-6 w-full"
                  >
                    <div className="flex justify-between items-center mb-2">
                       <span className={`${anton.className} text-3xl tracking-widest text-[#F0EDE8]`}>£{total.toFixed(2)}</span>
                       <button onClick={() => setStep("receipt")} className="text-[#8A0303] text-[9px] uppercase tracking-widest hover:text-[#C41A1A] underline underline-offset-4 decoration-[#8A0303]/30">Edit Order</button>
                    </div>
                    
                    <p className="text-[#F0EDE8]/50 text-xs font-light leading-relaxed mb-4">
                      Select your preferred payment method below to complete your transaction via Vanguard&apos;s encrypted terminal.
                    </p>

                    <div className="flex flex-col gap-4">
                      
                      {/* Apple Pay Option */}
                      <button className="relative w-full p-5 bg-white rounded-md border border-transparent shadow-[0_4px_15px_rgba(255,255,255,0.05)] hover:bg-[#f0f0f0] transition-colors group flex items-center justify-center gap-3">
                         <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.876 15.65c-1.332 0-1.896-.708-3.324-.708-1.524 0-2.028.696-3.312.696-2.016-.012-3.888-1.812-4.944-3.66C3.216 12.112 3.828 9.388 5.4 7.9c.744-.708 1.632-1.092 2.592-1.092 1.356 0 2.22.756 3.012.756.84 0 1.872-.792 3.192-.792 1.092.024 2.112.444 2.844 1.152-1.872 1.188-1.632 3.732.18 4.608-.528 1.404-1.392 2.832-2.58 4.392-.564.744-1.284 1.488-2.088 1.488L12.552 18.4zm.516-9.108C13.56 8.356 14.16 6.94 13.752 5.5c-1.296.06-2.82.936-3.684 2.1-.648.864-1.272 2.376-.948 3.84 1.464.12 2.82-.78 3.66-1.848z"/>
                         </svg>
                         <span className="text-black font-semibold text-sm tracking-wide">Apple Pay</span>
                      </button>

                      {/* Klarna Option */}
                      <button className="relative w-full p-5 bg-[#FFB3C7] rounded-md border border-transparent shadow-[0_4px_15px_rgba(255,179,199,0.1)] hover:bg-[#ff9db6] transition-colors group flex items-center justify-center gap-3">
                         <span className="text-black font-extrabold text-sm tracking-widest uppercase">Klarna.</span>
                      </button>

                      {/* Default Card Option */}
                      <button className="relative w-full py-4 border border-white/20 bg-black/40 text-[#F0EDE8] hover:bg-black/60 hover:border-[#8A0303]/60 transition-all rounded-md flex justify-center items-center gap-3">
                        <svg className="w-5 h-5 text-[#8A0303]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
                          <line x1="2" y1="10" x2="22" y2="10"/>
                        </svg>
                        <span className="font-medium text-xs uppercase tracking-[0.2em] text-[#F0EDE8]/80 group-hover:text-white">Credit / Debit Card</span>
                      </button>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
