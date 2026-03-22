import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({ weight: ["600", "700", "900"], subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ weight: ["300", "400"], style: ["italic"], subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Gallery · Vanguard",
  description: "Work from the chairs at Vanguard, London.",
};

// Placeholder slots — 9 images in a masonry-style grid
const slots = Array.from({ length: 9 }, (_, i) => i + 1);

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#0e0d0d] text-[#F0EDE8]">

      {/* Header */}
      <div className="border-b border-[#C8C8C8]/8 bg-[#111010]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className={`text-xs tracking-[0.3em] uppercase text-[#C8C8C8]/50 hover:text-[#C8C8C8] transition-colors ${playfair.className}`}>
            ← Vanguard
          </Link>
          <span className={`text-xs tracking-[0.25em] uppercase text-[#C8C8C8]/30 ${playfair.className}`}>Gallery</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Heading */}
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C8C8C8]/35 mb-4">Vanguard · Est. 2026</p>
          <h1 className={`text-7xl md:text-8xl uppercase tracking-[0.06em] bg-gradient-to-b from-[#F0EDE8] via-[#C8C8C8] to-[#7a7672] bg-clip-text text-transparent ${playfair.className}`}>
            The Facility
          </h1>
          <p className={`mt-5 text-lg italic text-[#F0EDE8]/35 ${cormorant.className}`}>
            Every corner is built for performance. Elite equipment and an atmosphere tailored for results.
          </p>
        </div>

        {/* Image grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {slots.map((i) => (
            <div
              key={i}
              className="break-inside-avoid relative bg-[#1a1816] border border-[#C8C8C8]/8 overflow-hidden group"
              style={{ height: i % 3 === 0 ? "340px" : i % 3 === 1 ? "260px" : "300px" }}
            >
              {/* Placeholder shimmer */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1f1d1b] to-[#141210]" />

              {/* Corner ornament */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#C8C8C8]/15" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#C8C8C8]/15" />

              {/* Centre label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-40 group-hover:opacity-60 transition-opacity">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8C8C8" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
                <span className={`text-[9px] uppercase tracking-[0.3em] text-[#C8C8C8]/60 ${playfair.className}`}>
                  Image {i}
                </span>
              </div>

              {/* Hover caption */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0e0d0d] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end px-4 pb-4">
                <span className={`text-[9px] uppercase tracking-[0.2em] text-[#C8C8C8]/50 ${playfair.className}`}>Vanguard · London</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className={`mt-16 text-center text-sm italic text-[#F0EDE8]/25 ${cormorant.className}`}>
          Images from Vanguard London studio. Portfolio placeholder — real work gallery coming soon.
        </p>
      </div>
    </main>
  );
}
