"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SplitText from "@/components/ui/split-text";
import SlideButton from "@/components/ui/slide-button";
import { cn } from "@/lib/utils";
import { DarkModeContext } from "@/app/layout";
import { Spotlight } from "@/components/ui/spotlight";
import { useRouter } from "next/navigation";
import wmonitor from "../public/wmonitor.jpeg";
import inSocial from "../public/inSocial.png";
import campussync from "../public/campussync.png";
export default function HomePage() {
  const { isDark, toggleDark } = useContext(DarkModeContext);
  const router = useRouter();
  const [showCards, setShowCards] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionOrigin, setTransitionOrigin] = useState({ x: 0, y: 0 });
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowCards(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const cardData = [
    {
      id: "insocial",
      title: "inSocial",
      gradient: isDark
        ? "from-pink-500 to-purple-400"
        : "from-pink-400 to-rose-400",
      image: inSocial,
      link: "/projects/insocial",
    },

    {
      id: "wmonitor",
      title: "W-Monitor",
      gradient: isDark
        ? "from-indigo-500 to-sky-400"
        : "from-indigo-400 to-blue-400",
      image: wmonitor,
      link: "/projects/wmonitor",
    },
    {
      id: "campussync",
      title: "CampusSync",
      gradient: isDark
        ? "from-teal-500 to-blue-400"
        : "from-teal-400 to-cyan-400",
      image: campussync,
      link: "/projects/campussync",
    },
  ];

  return (
    <div
      className={cn(
        "min-h-screen relative bg-transparent overflow-hidden",
        isDark
          ? "bg-black text-white"
          : "bg-gradient-to-br from-slate-200 to-blue-100 text-gray-900"
      )}
    >
      <Spotlight isDark={isDark} />
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
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
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
            {[
              {
                label: "Resume",
                href: "https://drive.google.com/file/d/1CRGWKtAnau8gQtPunT_iSK3BwGZh94ib/view?usp=sharing",
              },
              { label: "X", href: "https://x.com/mayankbytes" },
              { label: "Github", href: "https://github.com/mayank2153" },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/mayank-sachdeva-559537224/",
              },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300",
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm"
                )}
              >
                {item.label}
                <ExternalLink className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Animated Cards */}
        <div
          className="flex justify-center items-center min-h-[250px] sm:min-h-[300px] px-4"
          style={{ perspective: 1000 }}
        >
          <div className="relative w-full max-w-6xl h-48 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {showCards && (
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
                        initial={{ opacity: 0, scale: 0.8, x: 0, z: -80 * i }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: finalX,
                          y: 0,
                          z: 0,
                          rotateY: finalRY,
                          rotateZ: finalRZ,
                        }}
                        whileHover={{
                          scale: 1.05,
                          y: -10,
                          rotateY: finalRY * 1.2,
                          z: 20,
                          transition: { duration: 0.3, ease: "easeOut" },
                        }}
                        transition={{
                          duration: 1.2,
                          delay: i * 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        onClick={() => router.push(card.link)}
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
                          <motion.img
                            src={
                              typeof card.image === "string"
                                ? card.image
                                : card.image.src
                            }
                            alt={`${card.title} preview`}
                            className="rounded-md mt-2 object-cover w-full h-20 sm:h-24"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center justify-center mb-8"
        >
          <motion.p
            className={cn(
              "text-lg mb-1 font-medium",
              isDark ? "text-gray-300" : "text-gray-600"
            )}
          >
            Slide to see all my projects
          </motion.p>
          <SlideButton
            className="transition-all duration-300 pt-0"
            onSlideComplete={() => router.push("/projects")}
          />
        </motion.div>
      </div>
    </div>
  );
}
