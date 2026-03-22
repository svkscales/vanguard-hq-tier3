import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Anton } from "next/font/google";
import Link from "next/link";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

export default async function FacilityGallery(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const facilityName = params.slug.replace(/-/g, " ").toUpperCase();

  return (
    <main className="min-h-screen bg-[#0e0d0d] text-[#F0EDE8] flex flex-col font-sans selection:bg-[#8A0303] selection:text-white">
      <Navbar />

      {/* Gallery Header */}
      <section className="relative pt-40 pb-16 px-6 lg:px-12 flex flex-col items-center justify-center text-center mt-20 md:mt-0">
        <Link 
          href="/"
          className="mb-8 text-xs tracking-[0.2em] text-white/50 hover:text-white uppercase transition-colors border-b border-white/20 hover:border-white pb-1"
        >
          ← Return to Hub
        </Link>
        <h1 className={`${anton.className} text-5xl md:text-7xl lg:text-8xl text-white tracking-widest uppercase drop-shadow-2xl`}>
          {facilityName}
        </h1>
        <p className="mt-6 text-sm md:text-base max-w-2xl mx-auto text-white/70 font-light tracking-wide leading-relaxed">
          The definitive visual gallery of the {facilityName.toLowerCase()}. This dynamically routed page lets you add high-quality facility photography for potential members.
        </p>
      </section>

      {/* Deep Red Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#8A0303] to-transparent opacity-50 my-8" />

      {/* Masonry / Bento Gallery Grid - Empty Placeholders */}
      <section className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(6)].map((_, idx) => (
            <div 
              key={idx} 
              className={`relative group flex flex-col items-center justify-center overflow-hidden bg-[#151515] rounded-xl ring-1 ring-white/5 hover:ring-white/20 hover:bg-[#1a1a1a] transition-all duration-300 cursor-pointer ${
                idx === 0 || idx === 3 ? "md:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-square"
              }`}
            >
              {/* Empty state icon/text */}
              <div className="flex flex-col items-center justify-center text-[#F0EDE8]/20 group-hover:text-[#F0EDE8]/60 transition-colors duration-300">
                <svg className="w-10 h-10 mb-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1">
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs uppercase tracking-[0.2em] font-medium">Add Image</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
