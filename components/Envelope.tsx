"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scallopedCirclePath } from "./sealPath";

type Phase = "closed" | "sealExiting" | "flapOpening";

export default function Envelope({ onOpened }: { onOpened: () => void }) {
  const [phase, setPhase] = useState<Phase>("closed");

  const sealPath = useMemo(
    () => scallopedCirclePath(50, 50, 38, 6, 10, 140),
    []
  );

  function handleTap() {
    if (phase !== "closed") return;
    setPhase("sealExiting");
    window.setTimeout(() => setPhase("flapOpening"), 250);
  }

  return (
    <div className="fixed inset-0 w-screen h-dvh overflow-hidden invite-gradient select-none">
      <EnvelopeFoldLines />

      <div className="absolute inset-0" style={{ perspective: 1200 }}>
        <motion.div
          className="absolute top-0 left-0 w-full origin-top"
          style={{
            height: "48%",
            backfaceVisibility: "hidden",
            clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
          }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: phase === "flapOpening" ? -180 : 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (phase === "flapOpening") onOpened();
          }}
        >
          <div className="invite-gradient absolute inset-0 border-b border-[#D8D2C4]/40" />
        </motion.div>
      </div>

      <AnimatePresence>
        {phase === "closed" && (
          <motion.button
            key="seal"
            type="button"
            aria-label="Deschide plicul"
            onClick={handleTap}
            className="absolute z-10 cursor-pointer"
            style={{
              left: "50%",
              top: "48%",
              width: "clamp(85px, 25vw, 110px)",
              height: "clamp(85px, 25vw, 110px)",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: [1, 1.03, 1] }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.25, ease: "easeIn" } }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Seal path={sealPath} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function EnvelopeFoldLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g stroke="#D8D2C4" strokeWidth="0.15" opacity="0.5">
        <line x1="0" y1="0" x2="50" y2="48" />
        <line x1="100" y1="0" x2="50" y2="48" />
        <line x1="0" y1="100" x2="50" y2="48" />
        <line x1="100" y1="100" x2="50" y2="48" />
      </g>
    </svg>
  );
}

function Seal({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
      <defs>
        <radialGradient id="sealGradient" cx="32%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#E3C17E" />
          <stop offset="55%" stopColor="#C9A15C" />
          <stop offset="100%" stopColor="#9C7431" />
        </radialGradient>
      </defs>
      <path d={path} fill="url(#sealGradient)" />
      <Sprig />
    </svg>
  );
}

function Sprig() {
  return (
    <g
      transform="translate(50 52) scale(0.55)"
      fill="none"
      stroke="#7A5B28"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M0 26 C -1 10, 1 -6, 0 -24" />
      <path d="M0 14 C -8 10, -14 4, -18 -4" />
      <path d="M0 4 C 8 0, 14 -6, 18 -14" />
      <path d="M0 -8 C -6 -12, -9 -18, -8 -26" />
      <circle cx="-18" cy="-4" r="3.2" />
      <circle cx="18" cy="-14" r="3.2" />
      <circle cx="0" cy="-26" r="3.6" />
      <path d="M-9 -1 C -12 -3, -12 -7, -9 -9" />
      <path d="M9 -11 C 12 -13, 12 -17, 9 -19" />
    </g>
  );
}
