import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({ weight: ["600", "700", "900"], subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ weight: ["300", "400"], style: ["italic", "normal"], subsets: ["latin"], display: "swap" });

const gymMemberships = [
  {
    name: "Standard Membership",
    description: "Full access to the strength and conditioning floor. Includes use of olympic lifting platforms, cardio equipment, and saunas.",
    difficulty: "Essential",
    recommended: "All Members",
    price: "£145/m",
  },
  {
    name: "Boxing Club",
    description: "Standard access plus unlimited boxing classes. Perfect for those looking to build striking fundamentals and elite conditioning.",
    difficulty: "Advanced",
    recommended: "Dorian Cross",
    price: "£185/m",
  },
  {
    name: "Performance Cohort",
    description: "Small group training focused on Olympic lifting and MetCon. Limited to 6 members. Highly intense, highly technical.",
    difficulty: "Expert",
    recommended: "Finn Ashby",
    price: "£250/m",
  },
];

const ptServices = [
  {
    name: "1-on-1 Strength & Conditioning",
    description: "Deep dive into your biomechanics and max strength goals. 4 sessions per month focused on linear progression.",
    difficulty: "Mastery",
    recommended: "Solomon Vane",
    price: "£500/m",
  },
  {
    name: "1-on-1 Padwork & Ring IQ",
    description: "Private boxing lessons focusing on footwork, slipping, and power generation. Not for the faint-hearted.",
    difficulty: "Advanced",
    recommended: "Dorian Cross",
    price: "£450/m",
  },
];

const difficultyColour: Record<string, string> = {
  Essential: "#C8C8C8",
  Advanced: "#8A0303",
  Expert: "#8A0303",
  Mastery: "#8B7536",
};

export const metadata = {
  title: "Memberships & Training · Vanguard",
  description: "Elite memberships and personal training at Vanguard, London.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0e0d0d] text-[#F0EDE8]">

      {/* Header */}
      <div className="border-b border-[#C8C8C8]/8 bg-[#111010]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className={`text-xs tracking-[0.3em] uppercase text-[#C8C8C8]/50 hover:text-[#C8C8C8] transition-colors ${playfair.className}`}>
            ← Vanguard
          </Link>
          <span className={`text-xs tracking-[0.25em] uppercase text-[#C8C8C8]/30 ${playfair.className}`}>Services</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* Hero heading */}
        <div className="mb-20">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C8C8C8]/35 mb-4">Vanguard · Est. 2026</p>
          <h1 className={`text-7xl md:text-8xl uppercase tracking-[0.06em] bg-gradient-to-b from-[#F0EDE8] via-[#C8C8C8] to-[#7a7672] bg-clip-text text-transparent ${playfair.className}`}>
            The Menu
          </h1>
          <p className={`mt-5 text-lg italic text-[#F0EDE8]/35 ${cormorant.className}`}>
            Every membership and training session is strictly assessed by intensity level. Coach recommendations are our honest advice.
          </p>
        </div>

        {/* Difficulty key */}
        <div className="flex gap-6 mb-16 flex-wrap">
          {Object.entries(difficultyColour).map(([level, colour]) => (
            <div key={level} className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: colour }} />
              <span className={`text-[9px] uppercase tracking-[0.25em] text-[#C8C8C8]/50 ${playfair.className}`}>{level}</span>
            </div>
          ))}
        </div>

        {/* MEMBERSHIPS */}
        <Section title="Memberships" services={gymMemberships} playfair={playfair.className} cormorant={cormorant.className} />

        {/* PERSONAL TRAINING */}
        <Section title="Personal Training" services={ptServices} playfair={playfair.className} cormorant={cormorant.className} />

        {/* Book CTA */}
        <div className="mt-20 pt-12 border-t border-[#C8C8C8]/8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className={`text-sm italic text-[#F0EDE8]/40 ${cormorant.className}`}>Ready to step onto the floor?</p>
          <Link
            href="/#barbers"
            className={`px-10 py-4 border border-[#8A0303]/50 text-[#8A0303] text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#8A0303] hover:text-[#F0EDE8] transition-all ${playfair.className}`}
          >
            Choose Your Coach
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ title, services, playfair, cormorant }: { title: string; services: typeof gymMemberships; playfair: string; cormorant: string }) {
  return (
    <div className="mb-16">
      <h2 className={`text-xs uppercase tracking-[0.4em] text-[#C8C8C8]/40 mb-8 ${playfair}`}>{title}</h2>
      <div className="divide-y divide-[#C8C8C8]/6">
        {services.map((s) => (
          <div key={s.name} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 py-7 group hover:bg-[#1a1816] px-4 -mx-4 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`text-[8px] uppercase tracking-[0.25em] px-2 py-0.5 border ${playfair}`}
                  style={{ color: difficultyColour[s.difficulty], borderColor: `${difficultyColour[s.difficulty]}40` }}
                >
                  {s.difficulty}
                </span>
              </div>
              <h3 className={`text-xl md:text-2xl tracking-[0.04em] text-[#F0EDE8] mb-2 ${playfair}`}>{s.name}</h3>
              <p className={`text-sm text-[#F0EDE8]/40 leading-relaxed max-w-xl ${cormorant}`}>{s.description}</p>
              <p className={`text-xs italic text-[#C8C8C8]/40 mt-3 ${cormorant}`}>
                Recommended: <span className="text-[#C8C8C8]/70">{s.recommended}</span>
              </p>
            </div>
            <div className="flex flex-col items-end justify-center gap-3 shrink-0">
              <span className={`text-2xl text-[#F0EDE8]/70 ${playfair}`}>{s.price}</span>
              <Link
                href="/#barbers"
                className={`text-[9px] uppercase tracking-[0.25em] text-[#8A0303] border border-[#8A0303]/30 px-4 py-2 hover:bg-[#8A0303] hover:text-[#F0EDE8] transition-all ${playfair}`}
              >
                Book
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
