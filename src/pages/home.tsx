import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { LoveSlider } from "@/components/LoveSlider";
import { FloatingHearts } from "@/components/FloatingHearts";

export default function Home() {
  const [isBroken, setIsBroken] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = () => {
    setLocation("/love");
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden bg-background">
      <FloatingHearts />

      <motion.div
        className="relative z-10 w-full max-w-xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Card with softly rounded corners */}
        <div
          style={{
            background: "rgba(18, 18, 18, 0.88)",
            border: "1px solid rgba(201,168,76,0.18)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
            borderRadius: "10px",
          }}
          className="flex flex-col items-center px-10 py-12 gap-10"
        >
          {/* Question */}
          <motion.h1
            className="text-center leading-snug gold-shimmer-text"
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: "clamp(1.8rem, 4.6vw, 2.6rem)",
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: "0em",
              lineHeight: 1.55,
            }}
            animate={isBroken ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            From a scale 1 to 10,<br />
            how much do you love me?
          </motion.h1>

          {/* Slider */}
          <LoveSlider
            onReachEleven={() => setIsBroken(true)}
            className="w-full"
          />

          {/* Submit button */}
          <div className="h-14 flex items-center justify-center w-full">
            <AnimatePresence>
              {isBroken && (
                <motion.button
                  onClick={handleSubmit}
                  initial={{ opacity: 0, y: 16, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 30px -5px rgba(201,168,76,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-3 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #9a7e3a 0%, #c9a84c 40%, #f0d080 60%, #c9a84c 100%)",
                    color: "#0a0a0a",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    letterSpacing: "0.12em",
                    boxShadow: "0 4px 20px rgba(201,168,76,0.25)",
                  }}
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative flex items-center gap-2">
                    SUBMIT
                    <Heart className="w-4 h-4 fill-current" />
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
