"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Anton, Cinzel } from "next/font/google";
import { useState } from "react";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });
const cinzel = Cinzel({ weight: ["400", "700"], subsets: ["latin"], display: "swap" });

type ShopOverlayProps = {
  item: string | null;
  onClose: () => void;
  cartCount?: number;
  onAddToCart?: (name: string, price: number) => void;
  onOpenCart?: () => void;
  onChangeItem?: (item: string) => void;
};

export default function ShopOverlay({ item, onClose, cartCount = 0, onAddToCart, onOpenCart, onChangeItem }: ShopOverlayProps) {
  const [activeTab, setActiveTab] = useState("details");

  if (!item) return null;

  // Derive dynamic content based on the selected item
  const productData = {
    "wrist-wraps": {
      title: "VANGUARD WRIST WRAPS",
      price: "£25.00",
      description: "Heavy-duty cast woven wrist stability for maximum power output. Forged for the heaviest lifts.",
    },
    "merch": {
      title: "VANGUARD ATHLETIC TEE",
      price: "£45.00",
      description: "Premium heavyweight cotton oversized tee. Features the classic Vanguard Roman Medallion print on the back.",
    },
    "chalk": {
      title: "VANGUARD LIQUID CHALK",
      price: "£15.00",
      description: "Industrial grade grip enhancement. Dries instantly, lasts through entire high-volume heavy-iron sets.",
    }
  }[item] || { title: "VANGUARD GEAR", price: "£0.00", description: "" };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed inset-0 z-[100] bg-[#0a0a0b] flex flex-col overflow-y-auto"
      >
        {/* Secondary Navigation Bar (Shop Specific) */}
        <header className="sticky top-0 w-full border-b border-[#8A0303]/20 bg-[#0e0d0d]/90 backdrop-blur-md z-50">
          <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
            {/* Left: Vanguard Store Logo */}
            <div className="flex items-center gap-4">
              <button 
                onClick={onClose} 
                className="text-[#F0EDE8]/50 hover:text-white transition-colors"
                aria-label="Back to Gym Site"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <h2 className={`${cinzel.className} text-[#F0EDE8] text-xl md:text-2xl font-bold tracking-widest uppercase`}>
                VANGUARD <span className="text-[#C41A1A] font-light text-base md:text-lg ml-1">SUPPLY</span>
              </h2>
            </div>
            
            {/* Right: Tools (Search, Account, Basket) */}
            <div className="flex items-center gap-6">
              <button className="text-[#F0EDE8]/60 hover:text-[#C41A1A] transition-colors" aria-label="Search Shop">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
              <button className="text-[#F0EDE8]/60 hover:text-[#C41A1A] transition-colors" aria-label="My Account">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
              <button onClick={onOpenCart} className="text-[#F0EDE8]/60 hover:text-[#C41A1A] transition-colors relative" aria-label="Cart">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" x2="21" y1="6" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#C41A1A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{cartCount}</span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Shop Interface Layout */}
        <div className="flex-1 max-w-[1600px] w-full mx-auto p-6 lg:p-12 pb-32 flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
          
          {/* Left: Product Image Placeholder */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-[#111010] border border-[#8A0303]/10 relative rounded-sm flex items-center justify-center shadow-2xl relative overflow-hidden group">
               {/* Minimalist Vanguard watermark in background rendering as image placeholder */}
               <div className={`${anton.className} text-[6vw] lg:text-[100px] text-[#F0EDE8] opacity-[0.02] absolute transform -rotate-45 leading-none select-none pointer-events-none`}>
                 VANGUARD
               </div>
               <p className="text-[#F0EDE8]/20 font-light tracking-[0.2em] text-xs uppercase z-10">Product Image Placeholder</p>
               
               {/* Corner accents */}
               <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#8A0303]/30" />
               <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#8A0303]/30" />
               <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#8A0303]/30" />
               <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#8A0303]/30" />
            </div>
            
            {/* Thumbnails (mockups) */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((thumb) => (
                <div key={thumb} className="w-full aspect-square bg-[#111010] border border-[#8A0303]/10 hover:border-[#8A0303]/40 cursor-pointer transition-colors rounded-sm" />
              ))}
            </div>
          </div>

          {/* Right: Product Details & Checkout Column */}
          <div className="w-full lg:w-1/2 flex flex-col pt-8 lg:pt-12">
             <div className="mb-8">
               <p className="text-[#C41A1A] text-xs font-bold tracking-[0.3em] uppercase mb-3">Vanguard Supply</p>
               <h1 className={`${anton.className} text-5xl md:text-7xl text-white uppercase tracking-widest drop-shadow-md mb-6`}>
                 {productData.title}
               </h1>
               <div className="text-3xl md:text-4xl text-[#F0EDE8] font-bold mb-8 font-serif italic tracking-wide">
                 {productData.price}
               </div>
               
               <p className="text-[#F0EDE8]/70 font-light leading-relaxed max-w-lg mb-10">
                 {productData.description}
               </p>
             </div>

             {/* Add to Basket Action */}
             <div className="flex flex-col gap-4 mb-16 max-w-lg">
                <button 
                  onClick={() => onAddToCart && onAddToCart(productData.title, parseFloat(productData.price.replace('£', '')))}
                  className="relative overflow-hidden w-full py-5 border border-[#8A0303]/50 bg-[#8A0303]/10 group/btn transition-all duration-300 hover:border-[#C41A1A]"
                >
                  <span className="relative z-10 text-[#F0EDE8] text-sm tracking-[0.2em] uppercase font-bold transition-colors duration-300">ADD TO BASKET</span>
                  <div className="absolute inset-x-0 bottom-0 h-0 transition-all duration-300 ease-out group-hover/btn:h-full z-0" style={{ backgroundImage: 'linear-gradient(to top, #400000, #8A0303, #C41A1A)' }} />
                </button>
             </div>

             {/* Detailed Accordions (Information Area) */}
             <div className="border-t border-white/10 max-w-lg flex flex-col">
               
               {/* Details Tab */}
               <div className="border-b border-white/10">
                 <button 
                   onClick={() => setActiveTab(activeTab === "details" ? "" : "details")}
                   className="w-full py-5 flex items-center justify-between text-left group"
                 >
                   <span className="text-[#F0EDE8] text-xs uppercase tracking-[0.2em] font-semibold group-hover:text-[#C41A1A] transition-colors">Product Details</span>
                   <svg className={`w-4 h-4 text-white/50 transition-transform ${activeTab === "details" ? "rotate-45" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M12 5v14M5 12h14"/>
                   </svg>
                 </button>
                 {activeTab === "details" && (
                   <div className="pb-6 text-[#F0EDE8]/60 text-sm font-light leading-relaxed pr-8 animate-[fadeIn_0.3s]">
                     Engineered for the demands of the Vanguard Iron Forge. All supply equipment is rigorously tested within the facility by our Staff Trainers prior to public release. Superior build quality guaranteed.
                   </div>
                 )}
               </div>

               {/* Shipping Tab */}
               <div className="border-b border-white/10">
                 <button 
                   onClick={() => setActiveTab(activeTab === "shipping" ? "" : "shipping")}
                   className="w-full py-5 flex items-center justify-between text-left group"
                 >
                   <span className="text-[#F0EDE8] text-xs uppercase tracking-[0.2em] font-semibold group-hover:text-[#C41A1A] transition-colors">Shipping & Checkout info</span>
                   <svg className={`w-4 h-4 text-white/50 transition-transform ${activeTab === "shipping" ? "rotate-45" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M12 5v14M5 12h14"/>
                   </svg>
                 </button>
                 {activeTab === "shipping" && (
                   <div className="pb-6 text-[#F0EDE8]/60 text-sm font-light leading-relaxed pr-8 animate-[fadeIn_0.3s]">
                     Standard Delivery (2-4 working days): £4.99<br />Next Day Delivery (If ordered before 2PM): £7.99<br /><br />
                     Free shipping on all orders over £100. Local pickup is available directly at the Vanguard Ancoats Foundry front desk.
                   </div>
                 )}
               </div>

               {/* Returns Tab */}
               <div className="border-b border-white/10">
                 <button 
                   onClick={() => setActiveTab(activeTab === "returns" ? "" : "returns")}
                   className="w-full py-5 flex items-center justify-between text-left group"
                 >
                   <span className="text-[#F0EDE8] text-xs uppercase tracking-[0.2em] font-semibold group-hover:text-[#C41A1A] transition-colors">Returns Details</span>
                   <svg className={`w-4 h-4 text-white/50 transition-transform ${activeTab === "returns" ? "rotate-45" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M12 5v14M5 12h14"/>
                   </svg>
                 </button>
                 {activeTab === "returns" && (
                   <div className="pb-6 text-[#F0EDE8]/60 text-sm font-light leading-relaxed pr-8 animate-[fadeIn_0.3s]">
                     We accept returns within 30 days of the purchase date. Items must be unwashed, unworn, and in their original condition with all tags attached. Wrist wraps cannot be returned if seal is broken.
                   </div>
                 )}
               </div>

             </div>
             
             {/* Dynamic Upsell / "Others Also Bought" */}
             <div className="mt-16 border-t border-[#8A0303]/20 pt-10">
               <h3 className={`${cinzel.className} text-[#F0EDE8] text-lg mb-6 uppercase tracking-[0.2em]`}>Others Also Ordered</h3>
               <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                 {["merch", "wrist-wraps", "chalk"].filter(i => i !== item).map(upsellItem => {
                   const uData = {
                     "wrist-wraps": { title: "Wrist Wraps", price: "£25.00" },
                     "merch": { title: "Athletic Tee", price: "£45.00" },
                     "chalk": { title: "Liquid Chalk", price: "£15.00" }
                   }[upsellItem] as {title: string, price: string};
                   
                   return (
                     <div key={upsellItem} className="min-w-[160px] flex flex-col group cursor-pointer" onClick={() => onChangeItem && onChangeItem(upsellItem)}>
                       <div className="w-full aspect-square bg-[#111010] border border-[#8A0303]/10 group-hover:border-[#C41A1A]/50 transition-colors mb-4 flex items-center justify-center relative overflow-hidden">
                         <span className={`${anton.className} text-4xl text-white/5 absolute -rotate-45 select-none pointer-events-none`}>VANGUARD</span>
                       </div>
                       <p className="text-[#F0EDE8] text-xs font-bold tracking-widest uppercase truncate">{uData.title}</p>
                       <p className="text-[#C41A1A] text-xs italic mt-1">{uData.price}</p>
                     </div>
                   );
                 })}
               </div>
             </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
