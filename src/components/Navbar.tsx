"use client";
import { useState, useRef, useEffect } from "react";
import ShopOverlay from "./ShopOverlay";
import { motion, AnimatePresence } from "framer-motion";
import { Anton, Cinzel } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });
const cinzel = Cinzel({ weight: ["400", "700"], subsets: ["latin"], display: "swap" });

/* ─── Inline Shield SVG (Vanguard) ─────────────────────────── */
function ShieldLogo({ id = "nav" }: { id?: string }) {
  const gradId = `chromeGrad-${id}`;
  return (
    <svg viewBox="0 0 110 70" className="h-10 md:h-14 lg:h-16 w-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SVK Vanguard">
      <defs>
        <linearGradient id={`${gradId}-red`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C41A1A" />
          <stop offset="50%" stopColor="#8A0303" />
          <stop offset="100%" stopColor="#400000" />
        </linearGradient>
      </defs>

      {/* S V K Text Logo Centerpiece */}
      <text y="55" className={cinzel.className} textAnchor="middle" fill="#FFFFFF">
        <tspan x="20" fontSize="45">S</tspan>
        <tspan x="55" fontSize="70" dy="5" fill={`url(#${gradId}-red)`}>V</tspan>
        <tspan x="90" fontSize="45" dy="-5">K</tspan>
      </text>
    </svg>
  );
}

/* ─── Search Overlay ────────────────────────────────────────────────────────── */
function SearchOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="border-t border-[#8A0303]/8 bg-[#0e0d0d]/95 px-5 py-4 flex items-center gap-4"
    >
      <svg className="w-4 h-4 text-[#8A0303]/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
      <input autoFocus type="text" placeholder="Search services, products…"
        className="flex-1 bg-transparent text-sm text-[#F0EDE8] placeholder:text-[#F0EDE8]/30 focus:outline-none tracking-wide" />
      <button onClick={onClose} className="text-[#F0EDE8]/30 hover:text-[#F0EDE8] transition-colors text-xs uppercase tracking-widest">ESC</button>
    </motion.div>
  );
}

/* ─── Account Dropdown ──────────────────────────────────────────────────────── */
function AccountDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className="absolute right-0 top-[calc(100%+8px)] w-72 bg-[#131211] border border-[#8A0303]/10 shadow-[0_24px_60px_rgba(0,0,0,0.7)] z-50"
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-[#8A0303]/6">
        <ShieldLogo id="dropdown" />
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#8A0303]/30 mt-3">Member Access</p>
      </div>

      {/* Actions */}
      <div className="p-4 flex flex-col gap-2">
        <a
          href="/login"
          onClick={onClose}
          className="flex items-center justify-between px-4 py-3.5 border border-[#8A0303]/10 text-[#F0EDE8]/70 hover:text-[#F0EDE8] hover:border-[#8A0303]/25 transition-all group"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-semibold">Sign In</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-30 group-hover:opacity-70 transition-opacity">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
        <a
          href="/register"
          onClick={onClose}
          className="flex items-center justify-between px-4 py-3.5 bg-[#8A0303] text-[#F0EDE8] hover:bg-[#a93226] transition-colors group"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-semibold">Create Account</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70 group-hover:opacity-100 transition-opacity">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      {/* Footer hint */}
      <div className="px-6 pb-5">
        <p className="text-[9px] text-[#F0EDE8]/20 leading-relaxed">
          Members get priority booking, saved preferences, and early access to Vanguard drops.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Cart Drawer ───────────────────────────────────────────────────────────── */
type CartItem = { id: number, name: string, barber: string, date: string, price: number };

function CartDrawer({ onClose, items, setItems }: { onClose: () => void, items: CartItem[], setItems: React.Dispatch<React.SetStateAction<CartItem[]>> }) {
  const subtotal = items.reduce((s, i) => s + i.price, 0);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
      />

      {/* Slide-in panel from RIGHT */}
      <motion.aside
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#131211] border-l border-[#8A0303]/8 z-[120] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-[#8A0303]/6">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#F0EDE8]/70 font-semibold">Your Basket</h2>
            <p className="text-[9px] tracking-[0.2em] text-[#8A0303]/30 mt-0.5 uppercase">{items.length} {items.length === 1 ? "item" : "items"}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[#F0EDE8]/30 hover:text-[#F0EDE8] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#8A0303]/6">
          <AnimatePresence initial={false}>
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 gap-3 px-7">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8A0303" strokeWidth="1.2" opacity="0.2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" x2="21" y1="6" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <p className="text-xs text-[#8A0303]/25 uppercase tracking-[0.2em]">Your basket is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-4 px-7 py-5"
                >
                  {/* Scissors icon */}
                  <div className="w-9 h-9 shrink-0 border border-[#8A0303]/10 flex items-center justify-center mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A0303" strokeWidth="1.4" opacity="0.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                    </svg>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#F0EDE8]/85 font-medium truncate">{item.name}</p>
                    <p className="text-[10px] text-[#8A0303]/40 uppercase tracking-wide mt-0.5">{item.barber}</p>
                    <p className="text-[10px] text-[#8A0303]/30 mt-1">{item.date}</p>
                  </div>

                  {/* Price + remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-sm text-[#F0EDE8]/70">£{item.price}</span>
                    <button
                      onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                      className="text-[9px] uppercase tracking-[0.15em] text-[#8A0303]/20 hover:text-[#8A0303] transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Summary + Checkout */}
        {items.length > 0 && (
          <div className="border-t border-[#8A0303]/8 px-7 py-6 flex flex-col gap-4">
            {/* Line items summary */}
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-[10px] text-[#8A0303]/35 uppercase tracking-wide">
                  <span>{item.name}</span>
                  <span>£{item.price}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#8A0303]/15 to-transparent" />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8A0303]/50">Total</span>
              <span className="text-2xl text-[#F0EDE8]">£{subtotal}</span>
            </div>

            {/* Checkout CTA */}
            <button className="w-full py-4 bg-[#8A0303] text-[#F0EDE8] text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#a93226] transition-colors">
              Proceed to Checkout
            </button>
            <button onClick={onClose} className="w-full py-3 text-[9px] uppercase tracking-[0.25em] text-[#8A0303]/30 hover:text-[#8A0303] transition-colors border border-[#8A0303]/8">
              Continue Browsing
            </button>
          </div>
        )}
      </motion.aside>
    </>
  );
}

/* ─── Nav Drawer (hamburger menu) ───────────────────────────────────────────── */
function NavDrawer({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />
      <motion.nav
        initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 32 }}
        className="fixed top-0 left-0 h-full w-72 bg-[#131211] border-r border-[#8A0303]/8 z-50 flex flex-col py-12 px-8"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-[#F0EDE8]/40 hover:text-[#F0EDE8] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="mb-10"><ShieldLogo id="drawer" /></div>

        <div className="flex flex-col gap-1 mt-4">
          {[
            ["Info", "#info"],
            ["The Gym", "#gym"],
            ["Coaching", "#coaching"],
            ["Location", "#location"],
            ["Shop", "#shop"],
            ["Contact Us", "#location"]
          ].map(([label, href]) => (
            <a key={label} href={href} onClick={onClose}
              className={`py-4 text-2xl font-light text-[#F0EDE8]/80 hover:text-[#8A0303] hover:pl-3 transition-all duration-300 border-b border-[#8A0303]/10 last:border-0 tracking-[0.15em] uppercase`}>
              {label}
            </a>
          ))}
        </div>

        <div className="mt-auto">
          <p className="text-[10px] text-[#F0EDE8]/20 uppercase tracking-[0.25em]">Est. 2026 · London</p>
        </div>
      </motion.nav>
    </>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen]       = useState(false);
  const [shopOverlayItem, setShopOverlayItem] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<{ id: number, name: string, barber: string, date: string, price: number }[]>([]);
  const accountRef = useRef<HTMLDivElement>(null);

  // Close account dropdown on outside click
  useEffect(() => {
    if (!accountOpen) return;
    function handle(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [accountOpen]);

  return (
    <>
      {/* Full-width banner bar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="relative bg-black/80 backdrop-blur-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-b border-[#8A0303]/15">
          <div className="max-w-[1500px] mx-auto px-5 h-20 flex items-center justify-between">

            {/* ── LEFT: Navigation Links ── */}
            <div className="hidden md:flex items-center justify-between px-8 w-2/5">
              <a href="#info" className={`text-[#F0EDE8]/85 hover:text-[#8A0303] text-lg font-light uppercase tracking-[0.15em] transition-colors`}>Info</a>
              <a href="#gym" className={`text-[#F0EDE8]/85 hover:text-[#8A0303] text-lg font-light uppercase tracking-[0.15em] transition-colors`}>The Gym</a>
              <a href="#coaching" className={`text-[#F0EDE8]/85 hover:text-[#8A0303] text-lg font-light uppercase tracking-[0.15em] transition-colors`}>Coaching</a>
            </div>

            {/* ── MOBILE LEFT: Hamburger ── */}
            <div className="flex md:hidden items-center gap-3 w-1/3">
              <button onClick={() => setDrawerOpen(true)} aria-label="Open menu"
                className="w-10 h-10 flex items-center justify-center text-[#8A0303]/80 hover:text-[#8A0303] hover:bg-[#8A0303]/10 rounded-lg transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
                  <line x1="3" x2="21" y1="6"  y2="6"  />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── CENTRE: Vanguard Shield ── */}
            <div className="flex justify-center w-1/5">
              <a href="/#home" aria-label="Vanguard home" className="opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300">
                <ShieldLogo />
              </a>
            </div>

            {/* ── RIGHT: Navigation Links ── */}
            <div className="hidden md:flex items-center justify-between px-8 w-2/5">
              <a href="#location" className={`text-[#F0EDE8]/85 hover:text-[#8A0303] text-lg font-light uppercase tracking-[0.15em] transition-colors`}>Location</a>
              
              {/* Shop Dropdown */}
              <div className="relative group/shop py-6">
                <span className={`cursor-pointer flex items-center gap-2 text-[#F0EDE8]/85 group-hover/shop:text-[#8A0303] text-lg font-light uppercase tracking-[0.15em] transition-colors`}>
                  Shop
                </span>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 opacity-0 invisible group-hover/shop:opacity-100 group-hover/shop:visible transition-all duration-200 z-50">
                  <div className="bg-[#0a0a0b]/95 backdrop-blur-md border-t-2 border-[#8A0303] flex flex-col min-w-[200px] shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                    <button onClick={() => setShopOverlayItem('wrist-wraps')} className={`text-left px-6 py-4 text-[#F0EDE8]/70 hover:bg-[#8A0303]/10 hover:text-[#8A0303] text-base font-light uppercase tracking-[0.15em] transition-colors border-b border-[#8A0303]/10`}>Wrist Wraps</button>
                    <button onClick={() => setShopOverlayItem('merch')} className={`text-left px-6 py-4 text-[#F0EDE8]/70 hover:bg-[#8A0303]/10 hover:text-[#8A0303] text-base font-light uppercase tracking-[0.15em] transition-colors border-b border-[#8A0303]/10`}>Merch</button>
                    <button onClick={() => setShopOverlayItem('chalk')} className={`text-left px-6 py-4 text-[#F0EDE8]/70 hover:bg-[#8A0303]/10 hover:text-[#8A0303] text-base font-light uppercase tracking-[0.15em] transition-colors`}>Chalk</button>
                  </div>
                </div>
              </div>

              <a href="#location" className={`text-[#F0EDE8]/85 hover:text-[#8A0303] text-lg font-light uppercase tracking-[0.15em] transition-colors`}>Contact Us</a>
            </div>

            {/* ── MOBILE RIGHT: Empty spacer ── */}
            <div className="flex md:hidden items-center justify-end w-1/3">
              {/* Hidden intentionally to balance center logo */}
            </div>
          </div>

          {/* Search expand panel */}
          <AnimatePresence>
            {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
          </AnimatePresence>
        </div>
      </header>

      {/* Nav Drawer (left) */}
      <AnimatePresence>
        {drawerOpen && <NavDrawer onClose={() => setDrawerOpen(false)} />}
      </AnimatePresence>

      {/* Cart Drawer (right) */}
      <AnimatePresence>
        {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} items={cartItems} setItems={setCartItems} />}
      </AnimatePresence>
      
      {/* Full Screen Shop Implementation */}
      <ShopOverlay 
        item={shopOverlayItem} 
        onClose={() => setShopOverlayItem(null)} 
        cartCount={cartItems.length}
        onOpenCart={() => setCartOpen(true)}
        onAddToCart={(name, price) => {
          setCartItems(prev => [...prev, { id: Date.now(), name, barber: "Vanguard Supply", date: "Standard Shipping", price }]);
          setCartOpen(true);
        }}
        onChangeItem={(newItem) => setShopOverlayItem(newItem)}
      />
    </>
  );
}
