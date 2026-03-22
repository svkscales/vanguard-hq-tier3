"use client";
import { motion } from "framer-motion";
import { Anton } from "next/font/google";
import Link from "next/link";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

const coaches = [
  {
    slug: "gunter-voss",
    name: "GUNTER VOSS",
    title: "HEAD STRENGTH COACH",
    level: "ELITE",
    specialty: "Powerlifting & Strongman",
    bio: "Over two decades moving heavy iron. Gunter’s programming focuses on raw, absolute strength and central nervous system adaptation.",
    quote: "\"If you want to be pampered, go somewhere else. If you want to move weight you previously thought impossible, step into my rack.\"",
    inspiration: "Favorite Lifter: Dorian Yates",
    accent: "#C41A1A",
  },
  {
    slug: "jax-thorne",
    name: "JAX THORNE",
    title: "BOXING DIRECTOR",
    level: "PRO",
    specialty: "Ring IQ & Padwork",
    bio: "Former Golden Gloves champion. Jax runs the fight club with military precision. Endless rounds, sharp angles, and zero excuses.",
    quote: "\"If you're looking for a boxercise class to casually burn calories, don't bother. We train fighters here. Keep your hands up.\"",
    inspiration: "Favorite Fighter: 'Marvelous' Marvin Hagler",
    accent: "#C41A1A",
  },
  {
    slug: "marcus-hale",
    name: "MARCUS HALE",
    title: "PERFORMANCE COACH",
    level: "COACH",
    specialty: "Foundations & Body Recomp",
    bio: "Marcus specializes in breaking down complex biomechanics for newcomers, ensuring perfect form and building an unbreakable athletic foundation.",
    quote: "\"If you're intimidated by the heavy iron, that means you're exactly where you need to be. We all start with the empty bar.\"",
    inspiration: "Favorite Bodybuilder: Arnold Schwarzenegger",
    accent: "#C41A1A",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 60, damping: 20 } },
};

export default function TheCoaches() {
  return (
    <section id="coaching" className="relative bg-[#0e0d0d] py-24 md:py-32 overflow-hidden z-20">

      {/* Faint background lettering */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03] select-none">
        <span className={`text-[25vw] leading-none uppercase tracking-widest text-white ${anton.className}`}>
          VANGUARD
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <div className="w-16 h-1 bg-[#C41A1A] mb-6" />
          <h2 className={`text-5xl md:text-7xl lg:text-8xl uppercase tracking-widest text-white drop-shadow-md ${anton.className}`}>
            PERSONAL TRAINERS
          </h2>
          <p className="mt-6 text-sm md:text-base text-[#F0EDE8]/60 uppercase tracking-[0.2em] max-w-2xl font-medium">
            Elite programming. No compromises. Meet the Vanguard coaching staff.
          </p>
        </motion.div>

        {/* Coach Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {coaches.map((coach) => (
            <motion.div
              key={coach.slug}
              variants={cardVariants}
              className="group relative bg-[#151515] rounded-2xl border border-white/5 overflow-hidden flex flex-col hover:border-white/20 transition-colors duration-500"
            >
              {/* Portrait placeholder — deep gradient */}
              <div className="relative h-[300px] md:h-[350px] bg-[#0A0A0A] overflow-hidden flex items-end">
                {/* Red ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#8A0303]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Coach initial monogram */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`text-[9rem] leading-none text-white opacity-5 select-none transition-transform duration-700 group-hover:scale-110 ${anton.className}`}
                  >
                    {coach.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>

                {/* Level badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full bg-black/50 text-[#C41A1A] border border-[#C41A1A]/30 backdrop-blur-md">
                    {coach.level}
                  </span>
                </div>

                {/* Bottom gradient fade into card body */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#151515] to-transparent z-10" />
                
                {/* Coach Name Overlay inside image area */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <h3 className={`${anton.className} text-4xl sm:text-5xl text-white tracking-wide uppercase drop-shadow-lg`}>
                    {coach.name}
                  </h3>
                  <p className="text-[#C41A1A] text-xs sm:text-sm tracking-[0.2em] font-bold uppercase mt-1 drop-shadow-md">
                    {coach.title}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-6 md:p-8 relative z-20">
                <p className="text-[#F0EDE8]/90 font-light text-sm md:text-base leading-relaxed mb-6">
                  {coach.bio}
                </p>

                {/* Quote Box */}
                <div className="border-l-4 border-[#C41A1A] pl-4 mb-6">
                  <p className="italic text-[#F0EDE8]/70 text-sm leading-relaxed">
                    {coach.quote}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">Inspiration</span>
                    <span className="text-white/80 font-medium tracking-wide text-xs md:text-sm uppercase">
                      {coach.inspiration}
                    </span>
                  </div>
                </div>

                {/* Hover CTA */}
                <div className="mt-8 overflow-hidden">
                  <Link
                    href={`/coaches/${coach.slug}`}
                    className="relative overflow-hidden flex w-full items-center justify-center py-4 bg-transparent border border-white/20 text-white text-xs tracking-[0.2em] uppercase font-bold rounded-full group/btn"
                  >
                    <span className="relative z-10 transition-colors duration-300 text-white">View Profile</span>
                    <div className="absolute inset-x-0 bottom-0 h-0 transition-all duration-300 ease-out group-hover/btn:h-full z-0" style={{ backgroundImage: 'linear-gradient(to top, #400000, #8A0303, #C41A1A)' }} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
