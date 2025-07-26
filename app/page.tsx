"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, ExternalLink } from "lucide-react";

export default function HomePage() {
  const [isDark, setIsDark] = useState(true);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCards(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDark ? "text-white" : "text-black"
      }`}
      style={{
        fontFamily: "Playfair Display, serif",
        background: isDark
          ? "linear-gradient(250deg, rgba(0,0,0,1) 0%, rgba(40, 40, 46, 1) 63%, rgba(0,0,0,1) 100%)"
          : "linear-gradient(250deg,rgba(240, 240, 240, 1) 0%, rgba(205, 205, 212, 1) 65%, rgba(230, 235, 237, 1) 100%)",
      }}
    >
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-300 ${
            isDark
              ? "hover:bg-white/10 text-white"
              : "hover:bg-black/10 text-gray-900"
          }`}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Sun className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Moon className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight"
          >
            Hey, I'm Mayank.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={`text-lg md:text-xl mb-8 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Currently a Software Engineer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className={`text-base md:text-lg max-w-2xl leading-relaxed mb-12 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            In pursuit of patterns the world has yet to notice. Insatiably
            curious.
            <br />
            Engineering systems, and subtle moments, that whisper more than they
            reveal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-6 mb-20"
          >
            {["Resume", "Medium", "Github", "LinkedIn"].map((link, index) => (
              <motion.a
                key={link}
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                }`}
              >
                {link}
                <ExternalLink className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center items-end min-h-[300px] perspective-1000">
          <div className="relative">
            {/* Single Card that transforms into multiple cards */}
            <AnimatePresence>
              {!showCards && (
                <motion.div
                  key="single-card"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.3 },
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-80 h-48 rounded-2xl relative overflow-hidden shadow-xl"
                  style={{
                    background: isDark
                      ? "linear-gradient(135deg, #ff6b9d 0%, #ffa07a 100%)"
                      : "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                  }}
                >
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-2xl" />
                  <div className="relative z-10 p-6 h-full flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">
                      Portfolio Preview
                    </h3>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Three Cards that appear with staggered animation */}
            <AnimatePresence>
              {showCards && (
                <div className="flex items-center justify-center gap-6">
                  {[
                    {
                      title: "Work",
                      gradient: isDark
                        ? "from-pink-500 to-orange-400"
                        : "from-pink-400 to-orange-300",
                      rotation: -8,
                      delay: 0,
                    },
                    {
                      title: "Projects",
                      gradient: isDark
                        ? "from-purple-500 to-pink-400"
                        : "from-purple-400 to-pink-300",
                      rotation: 0,
                      delay: 0.15,
                    },
                    {
                      title: "Writing",
                      gradient: isDark
                        ? "from-blue-500 to-purple-400"
                        : "from-blue-400 to-purple-300",
                      rotation: 8,
                      delay: 0.3,
                    },
                  ].map((card, index) => (
                    <motion.div
                      key={card.title}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        y: 50,
                        rotateY: 0,
                        rotateZ: 0,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        rotateY: 0,
                        rotateZ: card.rotation,
                      }}
                      transition={{
                        delay: card.delay,
                        duration: 0.8,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -10,
                        rotateZ: card.rotation * 0.5,
                        transition: {
                          duration: 0.3,
                          type: "spring",
                          stiffness: 200,
                        },
                      }}
                      className={`w-72 h-48 rounded-2xl bg-gradient-to-br ${card.gradient} relative overflow-hidden cursor-pointer shadow-xl transform-gpu`}
                      style={{
                        transformOrigin: "center center",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-2xl" />
                      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                        <div className="flex-1 flex items-center justify-center">
                          <h3 className="text-white text-2xl font-semibold">
                            {card.title}
                          </h3>
                        </div>
                        <div className="text-white/80 text-sm">
                          Explore my {card.title.toLowerCase()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
