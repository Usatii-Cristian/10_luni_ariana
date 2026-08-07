"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrnamentDivider, CornerFlourish } from "./Ornament";

const START_DATE = new Date(2025, 9, 8); // 8 Octombrie 2025
const QUOTE = "„Nu e o poveste perfectă. E doar a noastră — și exact așa o vreau.”";

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
      <NoteSection />
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
      className="flex flex-col items-center px-6 pt-16 pb-10 text-center"
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
      <p className="mt-5 max-w-[300px] text-[15px] leading-relaxed text-ink-soft">
        N-a fost nimic ieșit din comun în ziua aceea. Doar noi doi, vorbind ca
        și cum ne știam de mult. De atunci, zilele obișnuite au început să
        pară, cumva, altfel.
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
      className="px-6 pb-14"
    >
      <div className="relative mx-auto max-w-[420px]">
        <CornerFlourish className="absolute -left-2 -top-2 h-9 w-9" />
        <CornerFlourish className="absolute -right-2 -top-2 h-9 w-9 -scale-x-100" />
        <div className="relative overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/poza-ariana-cristi.jpg"
            alt="Ariana și Cristi împreună"
            className="w-full h-auto object-cover rounded-xl"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream-dark/90" />
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-[300px] text-center text-sm italic text-ink-soft">
        Poza asta n-are nimic aranjat. Suntem doar noi, așa cum suntem de
        obicei.
      </p>
    </motion.section>
  );
}

function NoteSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center px-6 pb-14 text-center"
    >
      <OrnamentDivider />
      <p className="mx-auto mt-6 max-w-[320px] font-serif text-lg italic leading-relaxed text-ink">
        Nu știu exact în ce zi s-a schimbat ceva. Poate într-o seară
        obișnuită, poate într-o discuție care a ținut până târziu. Ce știu
        sigur e că, de atunci, ești primul gând bun din fiecare dimineață.
      </p>
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
      <p className="max-w-[280px] text-sm text-ink-soft">
        Numărăm timpul nu ca să bifăm zile, ci pentru că fiecare zi cu tine
        chiar contează.
      </p>

      <p className="mt-6 font-serif text-2xl tracking-wide text-ink">
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

      <p className="mt-6 max-w-[280px] text-sm text-ink-soft">
        Și simțim că abia am început.
      </p>

      <motion.button
        type="button"
        aria-label="Un gând pentru tine"
        onClick={() => setShowModal(true)}
        className="mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-gold-light to-gold text-card shadow-lg"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.92 }}
      >
        <HeartIcon />
      </motion.button>

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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 20.5s-7.5-4.6-10-9.3C0.4 7.7 2 4.5 5.4 4c2-.3 3.8.7 4.6 2.4C10.8 4.7 12.6 3.7 14.6 4c3.4.5 5 3.7 3.4 7.2-2.5 4.7-10 9.3-10 9.3Z" />
    </svg>
  );
}
