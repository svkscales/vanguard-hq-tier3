"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Anton } from "next/font/google";
import { createPortal } from "react-dom";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

export default function ToastNotification() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("Message Sent");
  const [phase, setPhase] = useState<"circle" | "pill">("circle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    let phaseTimer: NodeJS.Timeout;
    let closeTimer: NodeJS.Timeout;

    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) setMessage(customEvent.detail);
      
      clearTimeout(phaseTimer);
      clearTimeout(closeTimer);

      setIsOpen(false);
      
      setTimeout(() => {
        setIsOpen(true);
        setPhase("circle");
        
        phaseTimer = setTimeout(() => {
          setPhase("pill");
        }, 600);

        closeTimer = setTimeout(() => {
          setIsOpen(false);
        }, 3500);
      }, 50);
    };

    window.addEventListener("show-toast", handleToast);
    return () => window.removeEventListener("show-toast", handleToast);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[99999] pointer-events-none">
          <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.8, borderRadius: 32 }}
            animate={{ opacity: 1, y: 0, scale: 1, borderRadius: 32 }}
            exit={{ opacity: 0, y: 10, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ layout: { type: "spring", stiffness: 400, damping: 30 } }}
            className="bg-[#22c55e] text-white flex items-center shadow-[0_0_30px_rgba(34,197,94,0.3)] overflow-hidden"
            style={{ height: 48 }}
          >
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              <motion.svg 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
              >
                <motion.polyline points="20 6 9 17 4 12"></motion.polyline>
              </motion.svg>
            </div>
            
            <AnimatePresence>
              {phase === "pill" && (
                <motion.div
                  initial={{ width: 0, opacity: 0, paddingRight: 0 }}
                  animate={{ width: "auto", opacity: 1, paddingRight: 24 }}
                  exit={{ width: 0, opacity: 0, paddingRight: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={`${anton.className} uppercase tracking-widest text-sm whitespace-nowrap overflow-hidden pt-1`}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
