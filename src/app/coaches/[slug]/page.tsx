import { notFound } from "next/navigation";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import CoachBookingClient from "./CoachBookingClient";

const playfair = Playfair_Display({ weight: ["600", "700", "900"], subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ weight: ["300", "400"], style: ["italic", "normal"], subsets: ["latin"], display: "swap" });

const coachs = [
  {
    slug: "solomon-vane",
    name: "Solomon Vane",
    title: "Senior Coach",
    specialty: "Classic tapers, hot towel shaves & scissor work",
    bio: "Fifteen years behind the chair. Solomon's hands move like a surgeon's — unhurried, deliberate, exact. His fades are studied like scripture in this shop.",
    available: ["Mon", "Tue", "Thu", "Fri"],
  },
  {
    slug: "dorian-cross",
    name: "Dorian Cross",
    title: "Senior Coach",
    specialty: "Skin fades, beard sculpting & texture styling",
    bio: "A man of few words and sharp angles. Dorian's work speaks in gradients — seamless fades that blur like old photographs.",
    available: ["Tue", "Wed", "Fri", "Sat"],
  },
  {
    slug: "finn-ashby",
    name: "Finn Ashby",
    title: "Junior Coach",
    specialty: "Modern cuts, line-ups & creative styling",
    bio: "The youngest blade in the shop. Finn brings hunger and fresh perspective — obsessively refining his craft under the senior knights.",
    available: ["Mon", "Wed", "Thu", "Sat"],
  },
];

export async function generateStaticParams() {
  return coachs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const coach = coachs.find((b) => b.slug === slug);
  if (!coach) return { title: "Not Found" };
  return {
    title: `Book with ${coach.name} · Vanguard`,
    description: coach.specialty,
  };
}

export default async function CoachPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const coach = coachs.find((b) => b.slug === slug);
  if (!coach) notFound();

  return (
    <main className="min-h-screen bg-[#0e0d0d] text-[#F0EDE8]">

      {/* Header bar */}
      <div className="border-b border-[#C8C8C8]/8 bg-[#111010]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className={`text-xs tracking-[0.3em] uppercase text-[#C8C8C8]/50 hover:text-[#C8C8C8] transition-colors ${playfair.className}`}
          >
            ← Vanguard
          </Link>
          <span className={`text-xs tracking-[0.25em] uppercase text-[#C8C8C8]/30 ${playfair.className}`}>
            Booking
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* Coach Profile */}
        <div className="flex flex-col md:flex-row gap-12 mb-20">

          {/* Monogram portrait */}
          <div className="relative w-full md:w-64 h-64 shrink-0 bg-[#1a1816] border border-[#C8C8C8]/8 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(200,200,200,0.06) 0%, transparent 70%)" }} />
            <span className={`text-[6rem] leading-none font-black opacity-10 select-none bg-gradient-to-b from-[#C8C8C8] to-[#4a4a4a] bg-clip-text text-transparent ${playfair.className}`}>
              {coach.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className={`text-xs italic text-[#C8C8C8]/40 mb-2 tracking-wide ${cormorant.className}`}>
              {coach.title} · Vanguard
            </p>
            <h1 className={`text-5xl md:text-6xl tracking-[0.06em] bg-gradient-to-b from-[#F0EDE8] to-[#8a8a8a] bg-clip-text text-transparent mb-5 ${playfair.className}`}>
              {coach.name}
            </h1>
            <p className={`text-md italic text-[#C8C8C8]/50 mb-4 border-l-2 border-[#C8C8C8]/15 pl-4 ${cormorant.className}`}>
              {coach.specialty}
            </p>
            <p className={`text-base text-[#F0EDE8]/40 leading-relaxed max-w-lg ${cormorant.className}`}>
              {coach.bio}
            </p>

            <div className="flex gap-2 flex-wrap mt-6">
              <span className={`text-[9px] uppercase tracking-[0.25em] text-[#C8C8C8]/40 self-center mr-2 ${playfair.className}`}>Available:</span>
              {["Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => (
                <span
                  key={day}
                  className="text-[9px] uppercase tracking-[0.2em] px-3 py-1 border border-[#C8C8C8]/10 text-[#C8C8C8]/25"
                  style={
                    coach.available.includes(day)
                      ? { borderColor: "rgba(200,200,200,0.4)", color: "#C8C8C8" }
                      : {}
                  }
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Calendar — client component */}
        <div className="border-t border-[#C8C8C8]/8 pt-14">
          <h2 className={`text-2xl tracking-[0.1em] uppercase text-[#C8C8C8]/60 mb-10 ${playfair.className}`}>
            Select a Date
          </h2>
          <CoachBookingClient coachName={coach.name} />
        </div>
      </div>
    </main>
  );
}
