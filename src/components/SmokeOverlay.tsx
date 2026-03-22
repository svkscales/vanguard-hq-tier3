"use client";

export default function SmokeOverlay() {
  return (
    <>
      <style>{`
        @keyframes smoke-drift-1 {
          0%   { transform: translate(0%, 0%)    scale(1)   ; opacity: 0; }
          15%  { opacity: 0.18; }
          85%  { opacity: 0.12; }
          100% { transform: translate(35%, -20%) scale(1.6) ; opacity: 0; }
        }
        @keyframes smoke-drift-2 {
          0%   { transform: translate(0%, 0%)     scale(1)   ; opacity: 0; }
          15%  { opacity: 0.14; }
          85%  { opacity: 0.10; }
          100% { transform: translate(-30%, -25%) scale(1.5) ; opacity: 0; }
        }
        @keyframes smoke-drift-3 {
          0%   { transform: translate(0%, 0%)    scale(1)   ; opacity: 0; }
          20%  { opacity: 0.16; }
          80%  { opacity: 0.08; }
          100% { transform: translate(20%, -30%) scale(1.7) ; opacity: 0; }
        }
        @keyframes smoke-drift-4 {
          0%   { transform: translate(0%, 0%)     scale(1)   ; opacity: 0; }
          20%  { opacity: 0.12; }
          80%  { opacity: 0.06; }
          100% { transform: translate(-25%, -15%) scale(1.4) ; opacity: 0; }
        }
        @keyframes smoke-drift-5 {
          0%   { transform: translate(0%, 0%)    scale(1)   ; opacity: 0; }
          15%  { opacity: 0.10; }
          85%  { opacity: 0.06; }
          100% { transform: translate(15%, -25%) scale(1.5) ; opacity: 0; }
        }

        .smoke-puff {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, rgba(255,255,255,0.55), rgba(220,220,230,0.15) 55%, transparent 75%);
          filter: blur(48px);
          will-change: transform, opacity;
          pointer-events: none;
        }
        .smoke-puff-1 {
          width: 55vw; height: 55vw;
          bottom: -10%; left: 5%;
          animation: smoke-drift-1 18s ease-in-out infinite;
          animation-delay: 0s;
        }
        .smoke-puff-2 {
          width: 45vw; height: 45vw;
          bottom: -5%; right: 10%;
          animation: smoke-drift-2 22s ease-in-out infinite;
          animation-delay: -6s;
        }
        .smoke-puff-3 {
          width: 40vw; height: 40vw;
          bottom: 15%; left: 30%;
          animation: smoke-drift-3 20s ease-in-out infinite;
          animation-delay: -11s;
        }
        .smoke-puff-4 {
          width: 35vw; height: 35vw;
          bottom: -8%; left: 50%;
          animation: smoke-drift-4 25s ease-in-out infinite;
          animation-delay: -3s;
        }
        .smoke-puff-5 {
          width: 30vw; height: 30vw;
          bottom: 5%; right: 25%;
          animation: smoke-drift-5 17s ease-in-out infinite;
          animation-delay: -8s;
        }
      `}</style>

      {/* Smoke layer — sits above the black bg (z-[1]) but BELOW the canvas (z-[2]) */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="smoke-puff smoke-puff-1" />
        <div className="smoke-puff smoke-puff-2" />
        <div className="smoke-puff smoke-puff-3" />
        <div className="smoke-puff smoke-puff-4" />
        <div className="smoke-puff smoke-puff-5" />
      </div>
    </>
  );
}
