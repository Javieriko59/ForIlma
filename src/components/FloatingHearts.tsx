import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FloatingHeartProps {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeartProps[]>([]);

  useEffect(() => {
    // Generate random hearts
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage vw
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 15,
      size: 16 + Math.random() * 32,
      color: ["#4b5563", "#6b7280", "#374151", "#9ca3af"][Math.floor(Math.random() * 4)],
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 opacity-40"
          style={{ left: `${heart.x}vw`, color: heart.color }}
          initial={{ y: "10vh", x: 0, rotate: 0 }}
          animate={{ 
            y: "-110vh", 
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            rotate: [0, 90, -90, 0]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}
