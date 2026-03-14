import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const paragraphs = [
  {
    text: `My lovely Ilma, Eid Mubarak`,
    isTitle: true,
  },
  {
    text: `Every day I wake up thinking about you, and, every night, I can feel your smile that carry me softly to my dreams.\nWhen the sun appears, you appear in my mind and when the moon appears, you are already there.\nBc you are my sunlight, and my moonlight. You are my light.\nIf distance is just a shadow, you are the light that crosses it.\nIf days feel ordinary, you are the light that makes them extraordinary.\nAnd while Eid is being celebrated, I celebrate life through the light of your presence.\nBc you are, and you will always be, my light.`,
  },
  {
    text: `Sometimes I think of our friendship as a dream that we share. While we are apart, we dream of good days together, but, even at the distance, you make my days convert into good days.\nNo matter how far away we are, being together is always possible, and that makes my life happier.\nAnd if whenever my world seems simple it's bc I imagine it being with you.\nAnd whenever life is hard or challenging, knowing you exist brings light to everything.\nBc you are, and you will be forever, my light.`,
  },
  {
    text: `There are mountains like stakes scratching the belly of the sky. Oceans trying to meet the horizon. And when we look up we see us wrapped under the blue blanket of the Earth.\nWe see the sun rise and shine, and then hiding itself and changing the colour of the sky. And when the blue turns black, we can watch the little lamps that Allah used to decorate. Farther we can see galaxies, more far away we can see black holes, and farther there is even the time stretching, all farther that we can ever imagine.\nThere are things that look infinite, distances that seems to never finish and a void that can't fit inside our minds.\nAnd yet, when I think of you, all of it feels little. Bc Ilma, my love for you rises more than the higher mountains, runs deeper than the ocean, shines brighter than stars, is more infinite than the infinite, and is longer than time.\nAnd of all universes, you will always be my brightest star.\nBc you are, forever.`,
  },
  {
    text: `Every day that passes, I feel more proud of you, of having you, of your strength, your dedication, and the way you light up everything around you with your heart.\nYou inspire me without even trying, and most of the time I find myself learning to be better just by looking at you.\nThank you for being who you are, for showing me that beauty lives in small things, and for teaching me what's real love. Thanks for being the brightest star of my universe.\nMay this Eid brings you happiness, peace, and laughter, and that you can feel, even from far away, as if it was carried by the wind, my love and my prayers.\nI am extremely grateful for having you, for the way you see the world, for the way you love, and specially, for letting me be part of your life.\nDistance can never lessen what we are, and no matter where we are, I carry you with me always, in my thoughts, my heart, and in every good day that we dream of together.`,
  },
  {
    text: `With all the love that I have, endlessly and more than infinite,`,
    isClosing: true,
  },
  {
    text: `Tvoj J`,
    isSignature: true,
  },
  {
    text: `P.S.:\n Volim te\n(I miss you so much)`,
    isPostscript: true,
  },
];

export default function Celebration() {
  const [, setLocation] = useLocation();

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="flex flex-col gap-10"
        >
          {paragraphs.map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.18, duration: 0.9, ease: "easeOut" }}
            >
              {para.isTitle ? (
                <h1
                  className="text-center leading-tight"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "clamp(1.6rem, 5vw, 3rem)",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 40%, #c9a84c 70%, #a07830 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "0.05em",
                    textShadow: "none",
                    filter: "drop-shadow(0 0 18px rgba(201,168,76,0.35))",
                  }}
                >
                  {para.text}
                </h1>
              ) : para.isSignature ? (
                <p
                  className="text-right"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 12px rgba(201,168,76,0.4))",
                    letterSpacing: "0.08em",
                  }}
                >
                  {para.text}
                </p>
              ) : para.isClosing ? (
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    color: "#c9a84c",
                    opacity: 0.85,
                    lineHeight: 1.9,
                  }}
                >
                  {para.text}
                </p>
              ) : para.isPostscript ? (
                <div
                  className="border-t pt-8 mt-4"
                  style={{ borderColor: "rgba(201,168,76,0.2)" }}
                >
                  {para.text.split("\n").map((line, li) => (
                    <p
                      key={li}
                      style={{
                        fontFamily: li === 0 ? "'Cinzel', serif" : "'Playfair Display', serif",
                        fontStyle: li === 2 ? "italic" : "normal",
                        fontSize: li === 1 ? "clamp(1.1rem, 3vw, 1.5rem)" : "clamp(0.85rem, 2vw, 1rem)",
                        fontWeight: li === 1 ? 600 : 400,
                        color: li === 1 ? "#e8c96a" : "#9a7e3a",
                        letterSpacing: li === 0 ? "0.1em" : "normal",
                        lineHeight: 1.8,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {para.text.split("\n").map((line, li) => (
                    <p
                      key={li}
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(0.95rem, 2.2vw, 1.15rem)",
                        color: line.startsWith("Bc") ? "#f0d080" : "#d4aa5a",
                        lineHeight: 1.95,
                        fontStyle: line.startsWith("Bc") ? "italic" : "normal",
                        fontWeight: line.startsWith("Bc") ? 600 : 400,
                        textShadow: line.startsWith("Bc") ? "0 0 12px rgba(240,208,128,0.3)" : "none",
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: paragraphs.length * 0.18 + 0.5, duration: 1 }}
            className="flex justify-center pt-8"
          >
            <button
              onClick={() => setLocation("/")}
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                color: "#7a6030",
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              back
            </button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
