"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";

const playfair = Playfair_Display({ weight: ["600", "700"], subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ weight: ["400"], subsets: ["latin"], display: "swap" });

const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

// Simulate some booked slots deterministically from coach name
function getBookedSlots(coachName: string) {
  const seed = coachName.length;
  return TIME_SLOTS.filter((_, i) => (i + seed) % 3 === 0);
}

const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function CoachBookingClient({ coachName }: { coachName: string }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const bookedSlots = getBookedSlots(coachName);

  useEffect(() => { setCurrentDate(new Date()); }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const isAvailable = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    return d >= today;
  };

  const handleConfirm = () => {
    if (selectedDay && selectedSlot) setConfirmed(true);
  };

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1816] border border-[#C8C8C8]/10 p-12 text-center"
      >
        <div className="w-14 h-14 rounded-full border border-[#C8C8C8]/30 flex items-center justify-center mx-auto mb-6">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8C8C8" strokeWidth="1.5" strokeLinecap="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className={`text-3xl tracking-[0.08em] text-[#F0EDE8] mb-3 ${playfair.className}`}>Session Reserved</h3>
        <p className={`text-base italic text-[#C8C8C8]/50 mb-1 ${cormorant.className}`}>
          {monthNames[month]} {selectedDay}, {year} · {selectedSlot}
        </p>
        <p className={`text-sm text-[#F0EDE8]/30 ${cormorant.className}`}>with {coachName}</p>
        <button
          onClick={() => { setConfirmed(false); setSelectedDay(null); setSelectedSlot(null); }}
          className={`mt-10 text-[9px] uppercase tracking-[0.3em] text-[#C8C8C8]/40 hover:text-[#C8C8C8] transition-colors border-b border-[#C8C8C8]/15 pb-0.5 ${playfair.className}`}
        >
          Book Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

      {/* Calendar */}
      <div className="bg-[#1a1816] border border-[#C8C8C8]/8 p-7">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-7">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center text-[#C8C8C8]/40 hover:text-[#F0EDE8] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span className={`text-sm tracking-[0.2em] uppercase bg-gradient-to-r from-[#C8C8C8] to-[#8a8a8a] bg-clip-text text-transparent ${playfair.className}`}>
            {monthNames[month]} {year}
          </span>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center text-[#C8C8C8]/40 hover:text-[#F0EDE8] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-3">
          {dayNames.map((d) => (
            <div key={d} className={`text-center text-[9px] uppercase tracking-[0.2em] text-[#C8C8C8]/25 pb-2 ${playfair.className}`}>{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`e-${i}`} />)}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const available = isAvailable(day);
            const selected = selectedDay === day;
            return (
              <button
                key={day}
                disabled={!available}
                onClick={() => { setSelectedDay(day); setSelectedSlot(null); }}
                className={`
                  aspect-square flex items-center justify-center text-xs transition-all rounded-sm
                  ${selected ? "bg-[#8A0303] text-[#F0EDE8]" : ""}
                  ${available && !selected ? "text-[#F0EDE8]/60 hover:bg-[#C8C8C8]/8 hover:text-[#F0EDE8]" : ""}
                  ${!available ? "text-[#F0EDE8]/15 cursor-default" : ""}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <AnimatePresence mode="wait">
          {selectedDay ? (
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <p className={`text-xs uppercase tracking-[0.25em] text-[#C8C8C8]/40 mb-5 ${playfair.className}`}>
                {monthNames[month]} {selectedDay} · Available Times
              </p>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {TIME_SLOTS.map((slot) => {
                  const booked = bookedSlots.includes(slot);
                  const sel = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      disabled={booked}
                      onClick={() => setSelectedSlot(slot)}
                      className={`
                        py-3 text-xs tracking-wide border transition-all
                        ${sel ? "bg-[#8A0303] border-[#8A0303] text-[#F0EDE8]" : ""}
                        ${!booked && !sel ? "border-[#C8C8C8]/12 text-[#F0EDE8]/50 hover:border-[#C8C8C8]/30 hover:text-[#F0EDE8]" : ""}
                        ${booked ? "border-[#C8C8C8]/5 text-[#F0EDE8]/15 cursor-default line-through" : ""}
                      `}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              {selectedSlot && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleConfirm}
                  className={`w-full py-4 bg-[#8A0303] text-[#F0EDE8] text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#a93226] transition-colors ${playfair.className}`}
                >
                  Confirm Session
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center"
            >
              <p className={`text-sm italic text-[#C8C8C8]/20 text-center ${cormorant.className}`}>
                Select a date to view available times
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
