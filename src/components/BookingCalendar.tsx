"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

interface BookingCalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingCalendar({ isOpen, onClose }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (isOpen) setCurrentDate(new Date());
  }, [isOpen]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(today.getDate() + 6);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0e0d0d]/85 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#1a1816] border border-[#C8C8C8]/15 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h3 className={`text-4xl bg-gradient-to-r from-[#C8C8C8] to-[#8a8a8a] bg-clip-text text-transparent ${bebasNeue.className} tracking-wide uppercase`}>
                {monthNames[month]} {year}
              </h3>
              <div className="flex gap-2">
                <button onClick={prevMonth} className="p-2 text-[#F0EDE8]/40 hover:text-[#C8C8C8] transition-colors rounded-full hover:bg-[#C8C8C8]/8">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button onClick={nextMonth} className="p-2 text-[#F0EDE8]/40 hover:text-[#C8C8C8] transition-colors rounded-full hover:bg-[#C8C8C8]/8">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {dayNames.map(day => (
                <div key={day} className="text-center text-[10px] uppercase tracking-widest text-[#C8C8C8]/50 font-bold">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const date = new Date(year, month, i + 1);
                date.setHours(0,0,0,0);
                
                const isPast = date < today;
                const isFullyBooked = date >= today && date <= sevenDaysFromNow;
                const isAvailable = date > sevenDaysFromNow;

                let btnClass = "relative h-10 md:h-12 w-full flex items-center justify-center rounded-lg text-sm transition-all duration-300 ";
                
                if (isPast) {
                  btnClass += "text-[#F0EDE8]/15 cursor-not-allowed";
                } else if (isFullyBooked) {
                  btnClass += "text-[#8A0303]/70 bg-[#8A0303]/10 border border-[#8A0303]/20 cursor-not-allowed font-medium opacity-70";
                } else if (isAvailable) {
                  btnClass += "text-[#F0EDE8]/80 hover:bg-gradient-to-br hover:from-[#C8C8C8] hover:to-[#8a8a8a] hover:text-[#111010] border border-[#C8C8C8]/10 hover:border-[#C8C8C8]/40 cursor-pointer font-medium";
                }

                return (
                  <div key={i} className="relative group">
                    <button className={btnClass} disabled={isPast || isFullyBooked}>
                      {i + 1}
                    </button>
                    {isFullyBooked && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a1816] border border-[#8A0303]/30 text-[#8A0303] text-[9px] uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                        Fully Booked
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-[#C8C8C8]/8 flex items-center justify-between text-xs font-medium uppercase tracking-[0.15em]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8A0303]/80 blur-[1px]"></span>
                <span className="text-[#F0EDE8]/40">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8C8C8] blur-[1px]"></span>
                <span className="text-[#F0EDE8]/40">Available</span>
              </div>
            </div>

            {/* Close Button */}
            <button onClick={onClose} className="absolute top-6 right-6 text-[#F0EDE8]/30 hover:text-[#F0EDE8] transition-colors bg-[#C8C8C8]/5 p-2 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
