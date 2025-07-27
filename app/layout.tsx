"use client";

import { useState, useRef, useEffect, createContext } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import { Spotlight } from "@/components/ui/spotlight";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import "./globals.css";
import ShareButton from "@/components/ui/share-button";
import { Twitter, Facebook, Linkedin, Link as LinkIcon } from "lucide-react";
import { NavigationDock } from "@/components/ui/expanded-tabs";
import { Home, Briefcase, User, Mail, Download, Calendar } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const shareLinks = [
  {
    icon: Twitter,
    onClick: () => window.open("https://twitter.com/share"),
    label: "Share on Twitter",
  },
  {
    icon: Facebook,
    onClick: () => window.open("https://facebook.com/share"),
    label: "Share on Facebook",
  },
  {
    icon: Linkedin,
    onClick: () => window.open("https://linkedin.com/share"),
    label: "Share on LinkedIn",
  },
  {
    icon: LinkIcon,
    onClick: () => {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    },
    label: "Copy link",
  },
];

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
    setHasHydrated(true);
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }
  }, []);

  const toggleDark = () => {
    if (themeButtonRef.current) {
      const rect = themeButtonRef.current.getBoundingClientRect();
      setTransitionOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    const radius =
      typeof window !== "undefined"
        ? Math.max(window.innerWidth, window.innerHeight) * 1.5
        : 0;

    setClipRadius(radius);
    setIsTransitioning(true);

    setTimeout(() => {
      const newTheme = !isDark;
      setIsDark(newTheme);
      localStorage.setItem("theme", newTheme ? "dark" : "light");
    }, 300);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // Portfolio tabs with proper navigation
  const portfolioTabs = [
    {
      title: "Home",
      icon: Home,
      href: "/",
      type: "navigation" as const,
    },
    {
      title: "Projects",
      icon: Briefcase,
      href: "/projects",
      type: "navigation" as const,
    },
    {
      title: "Experience",
      icon: User,
      href: "/experience",
      type: "navigation" as const,
    },
    // {
    //   type: "separator" as const,
    // },
    {
      title: "Email",
      icon: Mail,
      onClick: () => {
        navigator.clipboard.writeText("your.email@example.com");
      },
      type: "action" as const,
      successText: "Copied!",
      successDuration: 2000,
    },
    {
      title: "Resume",
      icon: Download,
      onClick: () => window.open("/your-resume.pdf", "_blank"),
      type: "action" as const,
    },
    {
      title: "Meeting",
      icon: Calendar,
      onClick: () =>
        window.open("https://cal.com/mayank-sachdeva/15min", "_blank"),
      type: "action" as const,
    },
  ];

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body
        className={cn(
          "font-serif antialiased min-h-screen transition-colors duration-300",
          isDark
            ? "bg-black text-white"
            : "bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900"
        )}
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        <DarkModeContext.Provider value={{ isDark, toggleDark }}>
          <Spotlight isDark={isDark} />

          {/* Top-right controls */}
          <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center space-x-2 sm:space-x-3">
            <ShareButton className="" links={shareLinks} />

            <motion.button
              ref={themeButtonRef}
              onClick={toggleDark}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "p-2.5 rounded-full cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur-sm",
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white shadow-xl border border-white/10"
                  : "bg-white/80 hover:bg-white text-gray-700 shadow-xl border border-white/20"
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
            </motion.button>
          </div>

          {/* Theme transition overlay */}
          <AnimatePresence>
            {hasHydrated && isTransitioning && (
              <motion.div
                className={cn(
                  "fixed inset-0 z-40 pointer-events-none",
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

          {/* Main content */}
          {children}

          {/* Bottom navigation */}
          <div className="fixed z-20 bottom-12 sm:bottom-28 left-1/2 transform -translate-x-1/2 flex items-center px-4 sm:px-0">
            <NavigationDock tabs={portfolioTabs} isDark={isDark} />
          </div>
        </DarkModeContext.Provider>
      </body>
    </html>
  );
}
