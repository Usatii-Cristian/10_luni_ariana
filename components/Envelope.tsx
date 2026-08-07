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
    <div className="absolute inset-0 overflow-hidden invite-gradient select-none">
      <EnvelopePanels />
      <EnvelopeFoldLines />

      <div className="absolute inset-0" style={{ perspective: 1200 }}>
        <motion.div
          className="absolute top-0 left-0 w-full origin-top"
          style={{
            height: "50%",
            backfaceVisibility: "hidden",
            clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
            filter: "drop-shadow(0 14px 18px rgba(58, 45, 15, 0.18))",
          }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: phase === "flapOpening" ? -180 : 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (phase === "flapOpening") onOpened();
          }}
        >
          <div className="invite-gradient absolute inset-0 border-b border-[#B8AE93]/60" />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <AnimatePresence>
          {phase === "closed" && (
            <motion.button
              key="seal"
              type="button"
              aria-label="Deschide plicul"
              onClick={handleTap}
              className="pointer-events-auto cursor-pointer"
              style={{
                width: "clamp(85px, 25vw, 110px)",
                height: "clamp(85px, 25vw, 110px)",
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
    </div>
  );
}

function EnvelopePanels() {
  // Four soft-shaded panels (top/bottom/left/right), each lit a touch
  // differently, so the fold reads as real paper catching light rather
  // than flat color cut by lines. The apex matches the seal exactly.
  const apex = "50% 50%";
  const panels: { clipPath: string; gradient: string }[] = [
    {
      clipPath: `polygon(0% 0%, 100% 0%, ${apex})`,
      gradient:
        "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 55%, rgba(110,90,50,0.07) 100%)",
    },
    {
      clipPath: `polygon(0% 100%, 100% 100%, ${apex})`,
      gradient:
        "linear-gradient(0deg, rgba(255,255,255,0.16) 0%, rgba(110,90,50,0.1) 100%)",
    },
    {
      clipPath: `polygon(0% 0%, 0% 100%, ${apex})`,
      gradient:
        "linear-gradient(115deg, rgba(110,90,50,0.1) 0%, rgba(255,255,255,0.08) 100%)",
    },
    {
      clipPath: `polygon(100% 0%, 100% 100%, ${apex})`,
      gradient:
        "linear-gradient(245deg, rgba(110,90,50,0.1) 0%, rgba(255,255,255,0.08) 100%)",
    },
  ];

  return (
    <>
      {panels.map((panel, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ clipPath: panel.clipPath, background: panel.gradient }}
        />
      ))}
    </>
  );
}

function EnvelopeFoldLines() {
  // A single, faint set of corner-to-center seams for a touch of crispness
  // on top of the panel shading — the apex matches the seal's position
  // exactly, so the seal sits right where the folds meet.
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g stroke="#A69874" strokeWidth="0.22" opacity="0.4" strokeLinecap="round">
        <line x1="0" y1="0" x2="50" y2="50" />
        <line x1="100" y1="0" x2="50" y2="50" />
        <line x1="0" y1="100" x2="50" y2="50" />
        <line x1="100" y1="100" x2="50" y2="50" />
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
      <EngravedHeart />
    </svg>
  );
}

function EngravedHeart() {
  return (
    <g
      transform="translate(50 51) scale(0.62)"
      fill="none"
      stroke="#7A5B28"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0,13 C-2,9 -12,3 -12,-3 C-12,-9 -5,-12 0,-4 C5,-12 12,-9 12,-3 C12,3 2,9 0,13 Z" />
      <path d="M-16,4 C-19,2 -19,-2 -16,-4" strokeWidth="1.1" opacity="0.75" />
      <path d="M16,4 C19,2 19,-2 16,-4" strokeWidth="1.1" opacity="0.75" />
      <path d="M-3,-18 C-2,-20 2,-20 3,-18" strokeWidth="1.1" opacity="0.7" />
    </g>
  );
}
