import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useAnimate } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoveSliderProps {
  onReachEleven: () => void;
  className?: string;
}

export function LoveSlider({ onReachEleven, className }: LoveSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isEleven, setIsEleven] = useState(false);
  const [hitCount, setHitCount] = useState(0);

  const x = useMotionValue(0);

  const hitCountRef = useRef(0);
  const atTenRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const shouldSnapBackRef = useRef(false);

  const [trackBarScope, animateTrackBar] = useAnimate();

  const THUMB_SIZE = 48;
  const ELEVEN_EXTRA = 88;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setTrackWidth(containerRef.current.offsetWidth - THUMB_SIZE);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const displayValue = useTransform(x, (latestX) => {
    if (isEleven) return 11;
    if (trackWidth === 0) return 1;
    const progress = Math.max(0, Math.min(1, latestX / trackWidth));
    return Math.round(progress * 9) + 1;
  });

  const heartColor = useTransform(displayValue, [1, 5, 10, 11], ["#6b7280", "#9ca3af", "#c9a84c", "#f0d080"]);

  const handleDrag = async (_event: any, info: any) => {
    if (isEleven || isAnimatingRef.current) return;

    const reachedTen = info.offset.x >= trackWidth - 5;

    if (reachedTen && !atTenRef.current) {
      atTenRef.current = true;
      const count = hitCountRef.current;

      if (count <= 2) {
        isAnimatingRef.current = true;
        hitCountRef.current = count + 1;

        if (count === 0) {
          shouldSnapBackRef.current = true;
          setHitCount(1);
          await animateTrackBar(
            trackBarScope.current,
            { x: [0, -9, 9, -7, 7, -5, 5, -3, 3, 0] },
            { duration: 0.42, ease: "easeOut" }
          );
        } else if (count === 1) {
          shouldSnapBackRef.current = true;
          setHitCount(2);
          await animateTrackBar(
            trackBarScope.current,
            { x: [0, -13, 13, -12, 12, -10, 10, -8, 8, -6, 6, -4, 4, -2, 2, 0] },
            { duration: 0.58, ease: "easeOut" }
          );
        } else if (count === 2) {
          shouldSnapBackRef.current = false;
          setHitCount(3);
          await animateTrackBar(
            trackBarScope.current,
            { x: [0, -17, 17, -16, 16, -14, 14, -13, 13, -11, 11, -10, 10, -8, 8, -6, 6, -4, 4, -2, 2, -1, 1, 0] },
            { duration: 1.0, ease: "easeOut" }
          );
          setIsEleven(true);
          onReachEleven();
          animate(x, trackWidth + ELEVEN_EXTRA, {
            type: "spring",
            stiffness: 280,
            damping: 14,
            mass: 1.4,
          });
        }

        isAnimatingRef.current = false;
      }
    }

    if (!reachedTen && atTenRef.current) {
      atTenRef.current = false;
    }
  };

  const handleDragEnd = () => {
    if (shouldSnapBackRef.current) {
      shouldSnapBackRef.current = false;
      atTenRef.current = false;
      animate(x, 0, { type: "spring", stiffness: 480, damping: 28 });
    }
  };

  const hintText = () => {
    if (isEleven) return "";
    if (hitCount === 0) return "Drag to tell me...";
    if (hitCount === 1) return "Try again... push harder";
    return "HARDER";
  };

  const hintColor = hitCount >= 2 ? "#c9a84c" : "#5a5a5a";
  const hintStyle: React.CSSProperties = hitCount >= 2
    ? { fontFamily: "'Mada', sans-serif", fontWeight: 700, letterSpacing: "0.18em", fontSize: "0.95rem" }
    : { fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.875rem" };

  return (
    <div className={cn("flex flex-col items-center gap-12 w-full", className)}>
      {/* Big Number Display */}
      <motion.div
        className="relative flex items-center justify-center h-32 w-32 rounded-full backdrop-blur-sm border-2"
        style={{ background: "rgba(20,20,20,0.8)" }}
        animate={{
          scale: isEleven ? [1, 1.2, 1] : 1,
          rotate: isEleven ? [0, -10, 10, -5, 5, 0] : 0,
          borderColor: isEleven ? "#c9a84c" : "#2a2a2a",
          boxShadow: isEleven
            ? "0 20px 25px -5px rgba(201,168,76,0.45), 0 8px 10px -6px rgba(201,168,76,0.25)"
            : "0 8px 16px rgba(0,0,0,0.4)",
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="text-6xl font-bold text-primary"
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          {displayValue}
        </motion.span>

        {isEleven && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-4 -right-4 text-2xl"
          >
            ✨
          </motion.div>
        )}
      </motion.div>

      {/* Slider Track Container — containerRef just for width, trackBarScope for shaking */}
      <div className="relative w-full max-w-sm h-16 flex items-center" ref={containerRef}>

        {/* Shakeable track bars */}
        <div ref={trackBarScope} className="absolute inset-0 pointer-events-none">
          {/* Base track */}
          <div
            className="absolute h-3 rounded-full top-1/2 -translate-y-1/2 w-full"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
          />
          {/* Fill track */}
          <motion.div
            className="absolute h-3 rounded-full top-1/2 -translate-y-1/2"
            style={{
              width: useTransform(x, v => v + THUMB_SIZE / 2),
              background: "linear-gradient(90deg, #4b4b4b 0%, #9a7e3a 60%, #c9a84c 100%)",
            }}
          />
          {/* Extension fill (11) */}
          <motion.div
            initial={false}
            animate={{
              opacity: isEleven ? 1 : 0,
              width: isEleven ? trackWidth + ELEVEN_EXTRA + THUMB_SIZE / 2 : trackWidth + THUMB_SIZE / 2,
            }}
            transition={{ duration: 0.6 }}
            className="absolute h-3 rounded-full top-1/2 -translate-y-1/2 -z-10"
            style={{ background: "linear-gradient(90deg, transparent 60%, #f0d080 100%)" }}
          />
        </div>

        {/* Thumb — not inside shake scope so it stays grabbable */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
          style={{
            x,
            background: "#1a1a1a",
            border: "2px solid #3a3a3a",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          }}
          drag="x"
          dragConstraints={{ left: 0, right: isEleven ? trackWidth + ELEVEN_EXTRA : trackWidth }}
          dragElastic={0.04}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div style={{ color: heartColor }}>
            <Heart fill="currentColor" className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Labels */}
        <div className="absolute top-full left-2 mt-2 text-xs font-bold" style={{ color: "#5a5a5a" }}>1</div>
        <div
          className="absolute top-full right-2 mt-2 text-xs font-bold transition-opacity"
          style={{ color: "#5a5a5a", opacity: isEleven ? 0.25 : 1 }}
        >
          10
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isEleven ? 1 : 0 }}
          className="absolute top-full mt-2 text-xs font-bold"
          style={{ left: trackWidth + ELEVEN_EXTRA + 16, color: "#c9a84c" }}
        >
          11!
        </motion.div>
      </div>

      {/* Hint text */}
      <motion.p
        key={hitCount}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: isEleven ? 0 : 0.75, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-6"
        style={{ color: hintColor, ...hintStyle }}
      >
        {hintText()}
      </motion.p>
    </div>
  );
}
