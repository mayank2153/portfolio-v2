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
  // New properties for dynamic text
  successText?: string;
  successDuration?: number;
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

// Smooth animation configuration with longer hover duration
const ANIMATION_CONFIG = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1] as const,
};

const HOVER_ANIMATION_CONFIG = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

const TEXT_CHANGE_ANIMATION = {
  duration: 0.3,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 35,
};

export function NavigationDock({
  tabs,
  className,
  isDark = true,
}: NavigationDockProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const [changedTextTabs, setChangedTextTabs] = React.useState<
    Map<number, string>
  >(new Map());
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Get active tab index based on current pathname
  const activeIndex = React.useMemo(() => {
    const index = tabs.findIndex(
      (tab) => tab.type === "navigation" && tab.href === pathname
    );
    return index !== -1 ? index : null;
  }, [pathname, tabs]);

  const handleMouseEnter = React.useCallback((index: number) => {
    setHoveredIndex(index);

    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Set a new timeout to expand the tab after 500ms
    hoverTimeoutRef.current = setTimeout(() => {
      setExpandedIndex(index);
    }, 500);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setHoveredIndex(null);
    setExpandedIndex(null);

    // Clear the timeout if mouse leaves before 500ms
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleTabClick = React.useCallback(
    (tab: TabItem, index: number) => {
      if (tab.type === "navigation") {
        router.push(tab.href);
      } else if (tab.type === "action") {
        tab.onClick();

        // Handle dynamic text change
        if (tab.successText) {
          setChangedTextTabs(
            (prev) => new Map(prev.set(index, tab.successText!))
          );

          // Reset text after specified duration
          const duration = tab.successDuration || 2000;
          setTimeout(() => {
            setChangedTextTabs((prev) => {
              const newMap = new Map(prev);
              newMap.delete(index);
              return newMap;
            });
          }, duration);
        }
      }
    },
    [router]
  );

  const SeparatorComponent = React.memo(() => (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={ANIMATION_CONFIG}
      className={cn(
        "h-6 w-px mx-1 self-center",
        isDark ? "bg-gray-600" : "bg-gray-300"
      )}
      aria-hidden="true"
    />
  ));

  SeparatorComponent.displayName = "SeparatorComponent";

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: ANIMATION_CONFIG.ease,
      }}
      className={cn(
        "flex items-center gap-1  rounded-2xl backdrop-blur-md border p-2",
        isDark
          ? "bg-gray-900/90 border-gray-700/50 shadow-xl shadow-black/20"
          : "bg-white/90 border-gray-200/50 shadow-xl shadow-gray-900/10",
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
        const isExpanded = expandedIndex === index;
        const isActive = activeIndex === index;
        const changedText = changedTextTabs.get(index);
        const displayText = changedText || tab.title;
        const hasTextChanged = Boolean(changedText);
        const shouldShowText = isExpanded || hasTextChanged;

        return (
          <motion.button
            key={`${tab.type}-${tab.title}-${index}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleTabClick(tab, index)}
            className={cn(
              "relative flex items-center justify-center rounded-xl overflow-hidden",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              isDark
                ? "focus-visible:ring-gray-400 focus-visible:ring-offset-gray-900"
                : "focus-visible:ring-gray-500 focus-visible:ring-offset-white"
            )}
            whileTap={{ scale: 0.95 }}
            transition={SPRING_CONFIG}
            aria-label={displayText}
            role={tab.type === "navigation" ? "tab" : "button"}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Single background layer for cleaner animations */}
            <motion.div
              className={cn(
                "absolute inset-0 rounded-xl",
                isActive
                  ? isDark
                    ? "bg-gray-700/80"
                    : "bg-gray-100"
                  : "bg-transparent"
              )}
              animate={{
                backgroundColor: isActive
                  ? isDark
                    ? "rgb(55 65 81 / 0.8)"
                    : "rgb(243 244 246)"
                  : isHovered || hasTextChanged
                  ? isDark
                    ? "rgb(75 85 99 / 0.5)"
                    : "rgb(249 250 251)"
                  : "transparent",
                scale: isHovered || hasTextChanged ? 1.02 : 1,
              }}
              transition={HOVER_ANIMATION_CONFIG}
            />

            {/* Content container */}
            <motion.div
              className="flex items-center relative z-10 px-3 py-2.5"
              animate={{
                width: shouldShowText ? "auto" : "2.75rem",
              }}
              transition={HOVER_ANIMATION_CONFIG}
            >
              {/* Icon */}
              <motion.div
                animate={{
                  scale: hasTextChanged ? 1.1 : 1,
                  rotate: hasTextChanged ? [0, -5, 5, 0] : 0,
                }}
                transition={TEXT_CHANGE_ANIMATION}
              >
                <Icon
                  size={18}
                  className={cn(
                    "transition-colors flex-shrink-0",
                    isActive
                      ? isDark
                        ? "text-gray-100"
                        : "text-gray-900"
                      : isHovered || hasTextChanged
                      ? isDark
                        ? "text-gray-200"
                        : "text-gray-700"
                      : isDark
                      ? "text-gray-400"
                      : "text-gray-500"
                  )}
                  style={{
                    transition: `color ${HOVER_ANIMATION_CONFIG.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                  }}
                />
              </motion.div>

              {/* Text label with smooth text change animation */}
              <AnimatePresence mode="wait">
                {shouldShowText && (
                  <motion.div
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
                      duration: 0.35,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={displayText}
                        initial={{
                          opacity: 0,
                          y: hasTextChanged ? -10 : 0,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: hasTextChanged ? 10 : 0,
                        }}
                        transition={TEXT_CHANGE_ANIMATION}
                        className={cn(
                          "whitespace-nowrap text-sm font-medium block",
                          isActive
                            ? isDark
                              ? "text-gray-100"
                              : "text-gray-900"
                            : isDark
                            ? "text-gray-200"
                            : "text-gray-700"
                        )}
                      >
                        {displayText}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Active indicator dot */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={SPRING_CONFIG}
                  className={cn(
                    "absolute top-2 right-2 w-1.5 h-1.5 rounded-full",
                    isDark ? "bg-gray-300" : "bg-gray-600"
                  )}
                />
              )}
            </AnimatePresence>

            {/* Success indicator for text change */}
            <AnimatePresence>
              {hasTextChanged && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={SPRING_CONFIG}
                  className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-green-400"
                />
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
