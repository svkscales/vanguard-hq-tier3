"use client";
import { motion } from "framer-motion";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

const reviews = [
  {
    name: "DAVID R.",
    platform: "Google",
    stars: 5,
    quote: "This place will literally change your life. The energy, the people, the equipment—it's everything a real gym should be. Left my commercial gym and haven't looked back.",
    location: "Manchester, UK"
  },
  {
    name: "SARAH M.",
    platform: "Google",
    stars: 5,
    quote: "Gunter's powerlifting programming is insane. I added 40kg to my total in three months. If you want to get strong, this is the only facility in the North.",
    location: "Leeds, UK"
  },
  {
    name: "CHRIS P.",
    platform: "Google",
    stars: 4,
    quote: "Incredible facility and truly elite coaching. Only giving 4 stars because someone else was using the ice bath so I had to wait my turn. Otherwise, it's flawless.",
    location: "Macclesfield, UK"
  },
  {
    name: "MICHAEL B.",
    platform: "Google",
    stars: 5,
    quote: "There isn't any gym around that can replicate the hardcore, no-BS atmosphere you get the second you walk through the doors. Words cannot describe how inspiring this place is.",
    location: "Salford, UK"
  },
  {
    name: "ELENA V.",
    platform: "Google",
    stars: 5,
    quote: "Staff was very welcoming and treated me like family. Marcus Hale broke down my squat mechanics and completely fixed my knee pain. Elite level coaching across the board.",
    location: "Manchester, UK"
  },
  {
    name: "TOM H.",
    platform: "Facebook",
    stars: 5,
    quote: "The equipment is leaps and bounds above the norm. Hand-picked calibrated plates, specialized bars—the commitment to high performance is evident everywhere.",
    location: "Stockport, UK"
  }
];

export default function Reviews() {
  return (
    <section className="relative py-24 md:py-32 bg-[#0a0a0a] overflow-hidden z-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 relative z-10 w-full">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <p className="text-[#C41A1A] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4">
            TESTIMONIALS
          </p>
          <h2 className={`${anton.className} text-5xl md:text-7xl lg:text-8xl text-white tracking-widest uppercase mb-6 drop-shadow-md`}>
            THE <span className="text-[#C41A1A]">VERDICT</span>
          </h2>
          <p className="text-[#F0EDE8]/60 text-sm md:text-base font-medium tracking-[0.2em] uppercase max-w-2xl">
            Real reviews from the Vanguard family.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#151515] rounded-3xl p-8 md:p-10 border border-white/5 hover:border-white/20 transition-all duration-500 relative flex flex-col h-full group shadow-lg"
            >
              {/* Stars & Platform */}
              <div className="flex justify-between items-center mb-10">
                <div className="flex gap-1.5">
                  {[...Array(rev.stars)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#C41A1A]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  {[...Array(5 - rev.stars)].map((_, i) => (
                    <svg key={`empty-${i}`} className="w-4 h-4 text-white/5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white/40 text-[10px] tracking-widest uppercase font-bold flex items-center gap-2">
                  {rev.platform === "Google" && (
                    <svg className="w-4 h-4 text-white/40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                  )}
                  {rev.platform === "Facebook" && (
                     <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                     </svg>
                  )}
                  {rev.platform}
                </span>
              </div>

              {/* Quote */}
              <p className="text-[#F0EDE8]/80 font-light text-[15px] leading-relaxed mb-12 flex-1">
                "{rev.quote}"
              </p>

              {/* Author */}
              <div className="flex flex-col mt-auto pt-6 border-t border-white/5 relative z-10 transition-colors duration-500 group-hover:border-white/20">
                <span className="text-white font-bold tracking-[0.2em] text-xs uppercase mb-1 drop-shadow-sm">
                  {rev.name}
                </span>
                <span className="text-[#C41A1A] text-[10px] tracking-widest uppercase font-medium">
                  {rev.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-16 md:mt-24 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="https://www.google.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 bg-white text-black text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Review us on Google
          </a>
          
          <a 
            href="https://www.facebook.com/?locale=en_GB" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 bg-[#1877F2] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#166FE5] hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Review us on Facebook
          </a>
        </div>

      </div>
    </section>
  );
}
