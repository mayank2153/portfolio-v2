"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationTab {
  title: string;
  icon: LucideIcon;
  href: string;
  type: "navigation";
}

interface ActionTab {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
  type: "action";
}

interface Separator {
  type: "separator";
}

type TabItem = NavigationTab | ActionTab | Separator;

interface NavigationDockProps {
  tabs: TabItem[];
  className?: string;
  isDark?: boolean;
}

export function NavigationDock({
  tabs,
  className,
  isDark = true,
}: NavigationDockProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = React.useState<number | null>(null);

  // Get active tab index based on current pathname
  const activeIndex = React.useMemo(() => {
    const index = tabs.findIndex(
      (tab) => tab.type === "navigation" && tab.href === pathname
    );
    return index !== -1 ? index : null;
  }, [pathname, tabs]);

  const handleTabClick = React.useCallback(
    (tab: TabItem, index: number) => {
      if (tab.type === "navigation") {
        router.push(tab.href);
      } else if (tab.type === "action") {
        // Visual feedback for action buttons
        setClickedIndex(index);
        tab.onClick();

        // Reset click state after animation
        setTimeout(() => setClickedIndex(null), 300);
      }
    },
    [router]
  );

  const handleMouseEnter = React.useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const SeparatorComponent = React.memo(() => (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className={cn(
        "h-8 w-px mx-2 self-center",
        isDark ? "bg-white/20" : "bg-black/20"
      )}
      aria-hidden="true"
    />
  ));

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(
        "flex items-center gap-1 rounded-2xl backdrop-blur-md border shadow-xl p-2",
        isDark
          ? "bg-black/20 border-white/10 shadow-black/50"
          : "bg-white/80 border-black/10 shadow-gray-900/20",
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <SeparatorComponent key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const isHovered = hoveredIndex === index;
        const isActive = activeIndex === index;
        const isClicked = clickedIndex === index;

        return (
          <motion.button
            key={`${tab.type}-${tab.title}-${index}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleTabClick(tab, index)}
            className={cn(
              "relative flex items-center justify-center rounded-xl transition-all duration-200 overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              isDark
                ? "focus-visible:ring-white/50 focus-visible:ring-offset-black/20"
                : "focus-visible:ring-black/50 focus-visible:ring-offset-white/20"
            )}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            aria-label={tab.title}
            role={tab.type === "navigation" ? "tab" : "button"}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Background with smooth transitions */}
            <motion.div
              className={cn(
                "absolute inset-0 rounded-xl",
                isActive
                  ? isDark
                    ? "bg-white/20 shadow-lg shadow-white/10"
                    : "bg-white/90 shadow-lg shadow-black/10"
                  : "bg-transparent"
              )}
              animate={{
                backgroundColor: isActive
                  ? isDark
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(255, 255, 255, 0.9)"
                  : isHovered
                  ? isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(255, 255, 255, 0.5)"
                  : "rgba(255, 255, 255, 0)",
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />

            {/* Hover glow effect */}
            <motion.div
              className={cn(
                "absolute inset-0 rounded-xl opacity-0",
                isDark
                  ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30"
                  : "bg-gradient-to-r from-blue-500/20 to-purple-500/20"
              )}
              animate={{
                opacity: isHovered && !isActive ? 0.6 : 0,
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Content container with smooth expansion */}
            <motion.div
              className="flex items-center relative z-10 px-3 py-2"
              animate={{
                width: isHovered ? "auto" : "2.5rem",
              }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Icon with subtle active animation */}
              <motion.div
                animate={{
                  scale: isActive ? 1.05 : isClicked ? 0.9 : 1,
                  rotate: isClicked ? [0, -5, 5, 0] : 0,
                }}
                transition={{
                  duration: isClicked ? 0.3 : 0.2,
                  ease: "easeOut",
                }}
              >
                <Icon
                  size={20}
                  className={cn(
                    "transition-colors duration-200 flex-shrink-0",
                    isActive
                      ? isDark
                        ? "text-white drop-shadow-sm"
                        : "text-gray-900"
                      : isHovered
                      ? isDark
                        ? "text-white"
                        : "text-gray-900"
                      : isDark
                      ? "text-white/70"
                      : "text-gray-600"
                  )}
                />
              </motion.div>

              {/* Smooth text reveal */}
              <AnimatePresence mode="wait">
                {isHovered && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      width: 0,
                      marginLeft: 0,
                    }}
                    animate={{
                      opacity: 1,
                      width: "auto",
                      marginLeft: "0.5rem",
                    }}
                    exit={{
                      opacity: 0,
                      width: 0,
                      marginLeft: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className={cn(
                      "whitespace-nowrap text-sm font-medium overflow-hidden",
                      isActive
                        ? isDark
                          ? "text-white"
                          : "text-gray-900"
                        : isDark
                        ? "text-white/90"
                        : "text-gray-800"
                    )}
                  >
                    {tab.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Active indicator */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={cn(
                    "absolute top-1 right-1 w-2 h-2 rounded-full",
                    isDark
                      ? "bg-blue-400 shadow-sm shadow-blue-400/50"
                      : "bg-blue-500"
                  )}
                />
              )}
            </AnimatePresence>

            {/* Click ripple effect */}
            <AnimatePresence>
              {isClicked && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.3 }}
                  animate={{
                    scale: 2,
                    opacity: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={cn(
                    "absolute inset-0 rounded-xl pointer-events-none",
                    isDark ? "bg-white/30" : "bg-black/20"
                  )}
                />
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
