"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Envelope from "@/components/Envelope";
import InvitationContent from "@/components/InvitationContent";

type Stage = "closed" | "flashing" | "opened";

export default function Home() {
  const [stage, setStage] = useState<Stage>("closed");

  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden invite-gradient flex justify-center">
      <div className="w-full sm:max-w-[480px]">
        {stage !== "opened" ? (
          <div
            className="relative h-dvh w-full overflow-hidden
                       sm:my-6 sm:h-[calc(100dvh-3rem)] sm:rounded-[32px]
                       sm:shadow-[0_30px_80px_rgba(58,45,15,0.28)] sm:ring-1 sm:ring-black/5"
          >
            <Envelope onOpened={() => setStage("flashing")} />

            <AnimatePresence>
              {stage === "flashing" && (
                <motion.div
                  key="flash"
                  className="absolute inset-0 z-50 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.35, times: [0, 0.43, 0.43, 1] }}
                  onAnimationComplete={() => setStage("opened")}
                />
              )}
            </AnimatePresence>
          </div>
        ) : (
          <InvitationContent />
        )}
      </div>
    </main>
  );
}
