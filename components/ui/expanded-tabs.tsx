"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
}

type TabItem = Tab | Separator;

interface ExpandedTabsProps {
  tabs: TabItem[];
  className?: string;
  isDark?: boolean;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isHovered: boolean) => ({
    gap: isHovered ? ".5rem" : 0,
    paddingLeft: isHovered ? "1rem" : ".5rem",
    paddingRight: isHovered ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

export function ExpandedTabs({
  tabs,
  className,
  isDark = true,
}: ExpandedTabsProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const Separator = () => (
    <div
      className={`h-[24px] w-[1.2px] ${isDark ? "bg-white/20" : "bg-black/20"}`}
      aria-hidden="true"
    />
  );

  return (
    <div
      className={cn(
        "flex gap-2 rounded-2xl bg-gray-100/20 border p-1 shadow-lg",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`sep-${index}`} />;
        }
        const Icon = tab.icon;
        const isHovered = hovered === index;

        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            custom={isHovered}
            transition={{
              delay: 0.1,
              type: "spring",
              bounce: 0,
              duration: 0.6,
            }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300",
              isHovered
                ? isDark
                  ? "bg-white/20 text-white shadow-md"
                  : "bg-black/20 text-black shadow-md"
                : isDark
                ? "text-white/70 hover:text-white"
                : "text-black/70 hover:text-black"
            )}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {isHovered && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    bounce: 0,
                    duration: 0.6,
                  }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
