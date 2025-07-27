"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  ExternalLink,
  Home,
  Bell,
  Settings,
  HelpCircle,
  Shield,
  Link as LinkIcon,
} from "lucide-react";
import SplitText from "@/components/ui/split-text";
import { ExpandedTabs } from "@/components/ui/expanded-tabs";
import ShareButton from "@/components/ui/share-button";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";
import { DarkModeContext } from "@/app/layout";

const tabs = [
  { title: "Dashboard", icon: Home },
  { title: "Notifications", icon: Bell },
  { type: "separator" as const },
  { title: "Settings", icon: Settings },
  { title: "Support", icon: HelpCircle },
  { title: "Security", icon: Shield },
];

export default function HomePage() {
  const { isDark, toggleDark } = useContext(DarkModeContext); // ✅ Use context

  const [showCards, setShowCards] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionOrigin, setTransitionOrigin] = useState({ x: 0, y: 0 });
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowCards(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleTheme = () => {
    if (themeButtonRef.current) {
      const rect = themeButtonRef.current.getBoundingClientRect();
      setTransitionOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    setIsTransitioning(true);

    setTimeout(() => toggleDark(), 300);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const cardData = [
    {
      id: "work",
      title: "Work",
      gradient: isDark
        ? "from-pink-500 to-orange-400"
        : "from-rose-400 to-pink-400",
    },
    {
      id: "projects",
      title: "Projects",
      gradient: isDark
        ? "from-purple-500 to-pink-400"
        : "from-violet-400 to-purple-400",
    },
    {
      id: "experience",
      title: "Experience",
      gradient: isDark
        ? "from-blue-500 to-purple-400"
        : "from-blue-400 to-indigo-400",
    },
  ];

  return (
    <div
      className={cn(
        "min-h-screen relative overflow-hidden",
        isDark
          ? "bg-black text-white"
          : "bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900"
      )}
    >
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className={cn(
              "fixed inset-0 z-50 pointer-events-none",
              !isDark
                ? "bg-black"
                : "bg-gradient-to-br from-slate-100 to-blue-50"
            )}
            style={{
              clipPath: `circle(0px at ${transitionOrigin.x}px ${transitionOrigin.y}px)`,
            }}
            initial={{
              clipPath: `circle(0px at ${transitionOrigin.x}px ${transitionOrigin.y}px)`,
            }}
            animate={{
              clipPath: `circle(${
                Math.max(window.innerWidth, window.innerHeight) * 1.5
              }px at ${transitionOrigin.x}px ${transitionOrigin.y}px)`,
            }}
            exit={{
              clipPath: `circle(0px at ${transitionOrigin.x}px ${transitionOrigin.y}px)`,
            }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        )}
      </AnimatePresence>

      <Spotlight isDark={isDark} />

      {/* Top-right controls */}

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
              "text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif mb-6 sm:mb-8 leading-tight",
              isDark ? "text-white" : "text-gray-900"
            )}
          >
            <SplitText
              text="Hey, I'm Mayank."
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={cn(
              "text-base sm:text-lg md:text-xl mb-6 sm:mb-8",
              isDark ? "text-gray-300" : "text-gray-600"
            )}
          >
            Software Engineer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className={cn(
              "text-base sm:text-lg md:text-lg max-w-2xl leading-relaxed mb-12",
              isDark ? "text-gray-400" : "text-gray-500"
            )}
          >
            Crafting elegant solutions to complex problems.
            <br />
            Always curious, always learning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-6 mb-20"
          >
            {["Resume", "X", "Github", "LinkedIn"].map((link) => (
              <motion.a
                key={link}
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300",
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm"
                )}
              >
                {link}
                <ExternalLink className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="fixed z-20 bottom-12 sm:bottom-28 left-1/2 transform -translate-x-1/2 flex items-center px-4 sm:px-0">
          <ExpandedTabs tabs={tabs} isDark={isDark} />
        </div>

        {/* Animated cards */}
        <div
          className="flex justify-center items-center min-h-[250px] sm:min-h-[300px] px-4"
          style={{ perspective: 1000 }}
        >
          <div className="relative w-full max-w-6xl h-48 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!showCards ? (
                <motion.div
                  key="single-card"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 1.1,
                    transition: { duration: 0.4, ease: "easeInOut" },
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={cn(
                    "w-72 sm:w-80 h-44 sm:h-48 rounded-2xl relative overflow-hidden",
                    isDark ? "shadow-xl" : "shadow-2xl shadow-blue-200/50"
                  )}
                  style={{
                    background: isDark
                      ? "linear-gradient(135deg, #ff6b9d 0%, #ffa07a 100%)"
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-2xl" />
                  <div className="relative z-10 p-4 sm:p-6 h-full flex items-center justify-center">
                    <h3 className="text-white text-lg sm:text-xl font-semibold">
                      Portfolio Preview
                    </h3>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="three-cards"
                  className="absolute inset-0 flex justify-center items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {cardData.map((card, i) => {
                    const finalX = (i - 1) * 280;
                    const finalRY = (i - 1) * 10;
                    const finalRZ = (i - 1) * 8;
                    return (
                      <motion.div
                        key={card.id}
                        className={cn(
                          "absolute w-64 sm:w-72 h-40 sm:h-48 rounded-2xl overflow-hidden cursor-pointer",
                          `bg-gradient-to-br ${card.gradient}`,
                          isDark ? "shadow-xl" : "shadow-2xl shadow-blue-200/30"
                        )}
                        style={{ transformStyle: "preserve-3d" }}
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                          x: 0,
                          z: -80 * i,
                          rotateY: 0,
                          rotateZ: 0,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: finalX,
                          y: 0,
                          z: 0,
                          rotateY: finalRY,
                          rotateZ: finalRZ,
                        }}
                        transition={{
                          duration: 1.2,
                          delay: i * 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        whileHover={{
                          scale: 1.05,
                          y: -10,
                          rotateY: finalRY * 1.2,
                          z: 20,
                          transition: { duration: 0.3, ease: "easeOut" },
                        }}
                      >
                        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-2xl" />
                        <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-between">
                          <motion.h3
                            className="text-white text-xl sm:text-2xl font-semibold"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                          >
                            {card.title}
                          </motion.h3>
                          <motion.div
                            className="text-white/80 text-xs sm:text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                          >
                            Explore my {card.title.toLowerCase()}
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
