"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const START_DATE = new Date(2025, 9, 8); // 8 Octombrie 2025
const MET_LOCATION = "Cluj-Napoca";
const QUOTE =
  "„Fiecare zi cu tine e o pagină nouă din cea mai frumoasă poveste pe care o scriem împreună.”";

function computeTimeTogether(start: Date) {
  const now = new Date();
  const days = Math.max(
    0,
    Math.floor((now.getTime() - start.getTime()) / 86_400_000)
  );

  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;
  months = Math.max(0, months);

  return { days, months };
}

function useTimeTogether(start: Date) {
  const [value, setValue] = useState(() => computeTimeTogether(start));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    function update() {
      setValue(computeTimeTogether(start));
    }

    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      update();
      intervalRef.current = setInterval(update, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [start]);

  return value;
}

export default function InvitationContent() {
  return (
    <div className="invite-gradient min-h-dvh w-full">
      <HeroSection />
      <PhotoSection />
      <CounterSection />
    </div>
  );
}

function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center px-6 pt-16 pb-14 text-center"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ilustratie-cuplu.png"
        alt="Ariana și Cristi"
        className="mx-auto w-full max-w-[280px]"
      />
      <h2 className="mt-8 font-serif tracking-[0.15em] uppercase text-sm text-ink">
        Începutul poveștii noastre
      </h2>
      <h1 className="mt-3 font-cursive text-6xl leading-none text-gold">
        Ariana &amp; Cristi
      </h1>
      <p className="mt-4 text-sm text-ink-soft">
        Doi oameni, o poveste, în fiecare zi
      </p>
    </motion.section>
  );
}

function PhotoSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="px-6 pb-16"
    >
      <div className="relative mx-auto max-w-[420px] overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/poza-ariana-cristi.jpg"
          alt="Ariana și Cristi împreună"
          className="w-full h-auto object-cover rounded-xl"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream-dark/90" />
      </div>
    </motion.section>
  );
}

function CounterSection() {
  const { days, months } = useTimeTogether(START_DATE);
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center px-6 pb-24 text-center"
    >
      <p className="font-serif text-2xl tracking-wide text-ink">
        8 Octombrie 2025
      </p>

      <p className="mt-8 font-serif text-5xl text-gold">{days}</p>
      <p className="text-sm tracking-[0.15em] uppercase text-ink-soft">
        zile împreună
      </p>

      <p className="mt-4 font-serif text-2xl text-ink">{months}</p>
      <p className="text-xs tracking-[0.15em] uppercase text-ink-soft">
        luni împreună
      </p>

      <div className="mt-10 flex items-center gap-6">
        <IconBadge label="Data">
          <CalendarIcon />
        </IconBadge>
        <IconBadge label="Locul">
          <PinIcon />
        </IconBadge>
        <IconBadge label="Mesaj" onClick={() => setShowModal(true)}>
          <HeartIcon />
        </IconBadge>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="max-w-sm rounded-2xl bg-card px-6 py-8 text-center shadow-xl"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-serif italic text-ink">{QUOTE}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.15em] text-gold">
                {MET_LOCATION}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function IconBadge({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-gold-light to-gold text-card shadow-md transition-transform active:scale-95"
    >
      {children}
    </button>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s7-6.5 7-11.5A7 7 0 1 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 20.5s-7.5-4.6-10-9.3C0.4 7.7 2 4.5 5.4 4c2-.3 3.8.7 4.6 2.4C10.8 4.7 12.6 3.7 14.6 4c3.4.5 5 3.7 3.4 7.2-2.5 4.7-10 9.3-10 9.3Z" />
    </svg>
  );
}
