"use client";

import { useState, useRef, useEffect, createContext, useContext } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import { Spotlight } from "@/components/ui/spotlight";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import "./globals.css";

export const DarkModeContext = createContext<{
  isDark: boolean;
  toggleDark: () => void;
}>({
  isDark: true,
  toggleDark: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionOrigin, setTransitionOrigin] = useState({ x: 0, y: 0 });
  const [clipRadius, setClipRadius] = useState(0);
  const [hasHydrated, setHasHydrated] = useState(false);
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setHasHydrated(true); // delay transition logic until hydration completes
  }, []);

  const toggleDark = () => {
    if (themeButtonRef.current) {
      const rect = themeButtonRef.current.getBoundingClientRect();
      setTransitionOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    // Only read window sizes on the client
    const radius =
      typeof window !== "undefined"
        ? Math.max(window.innerWidth, window.innerHeight) * 1.5
        : 0;

    setClipRadius(radius);
    setIsTransitioning(true);

    setTimeout(() => setIsDark((prev) => !prev), 300);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  return (
    <html lang="en">
      <body
        className={cn(
          `font-serif antialiased transition-colors duration-300`,
          isDark ? "bg-black text-white" : "bg-slate-50 text-gray-900"
        )}
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        <DarkModeContext.Provider value={{ isDark, toggleDark }}>
          <Spotlight isDark={isDark} />

          <AnimatePresence>
            {hasHydrated && isTransitioning && (
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
                  clipPath: `circle(${clipRadius}px at ${transitionOrigin.x}px ${transitionOrigin.y}px)`,
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

          {/* Top-right theme toggle */}
          <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50">
            <button
              ref={themeButtonRef}
              onClick={toggleDark}
              className={cn(
                "p-2 rounded-full cursor-pointer transition-all duration-300 relative overflow-hidden",
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white shadow-lg"
                  : "bg-white/80 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm border border-white/20"
              )}
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

          {children}
        </DarkModeContext.Provider>
      </body>
    </html>
  );
}
