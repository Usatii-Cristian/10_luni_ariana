"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Envelope from "@/components/Envelope";
import InvitationContent from "@/components/InvitationContent";

type Stage = "closed" | "flashing" | "opened";

export default function Home() {
  const [stage, setStage] = useState<Stage>("closed");

  return (
    <main className="relative w-screen min-h-dvh overflow-x-hidden">
      {stage !== "opened" && (
        <Envelope onOpened={() => setStage("flashing")} />
      )}

      <AnimatePresence>
        {stage === "flashing" && (
          <motion.div
            key="flash"
            className="fixed inset-0 z-50 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.35, times: [0, 0.43, 0.43, 1] }}
            onAnimationComplete={() => setStage("opened")}
          />
        )}
      </AnimatePresence>

      {stage === "opened" && <InvitationContent />}
    </main>
  );
}
