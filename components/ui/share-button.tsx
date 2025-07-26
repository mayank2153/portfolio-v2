"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Link } from "lucide-react";
interface ShareLink {
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  label?: string;
}

interface ShareButtonProps {
  links: ShareLink[];
  className?: string;
}

export default function ShareButton({ links, className }: ShareButtonProps) {
  const [open, setOpen] = useState(false);

  // Framer variants for the icon tray
  const trayVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      className={cn("relative flex items-center", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button
        aria-label="Share"
        className={cn(
          "p-2 rounded-full transition-colors",
          "bg-white/10 hover:bg-white/20 text-white",
          "dark:bg-black/10 dark:hover:bg-black/20 dark:text-gray-100"
        )}
      >
        {/* replace with your preferred share icon */}
        <Link className="h-5 w-5" />
      </button>

      {/* Icon tray */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={trayVariants}
            transition={{ type: "tween", duration: 0.2 }}
            className="absolute right-0 top-full mt-2 flex space-x-1 rounded-xl bg-black/30 backdrop-blur-md p-1"
          >
            {links.map((link, i) => {
              const Icon = link.icon;
              return (
                <button
                  key={i}
                  onClick={link.onClick}
                  aria-label={link.label}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    "bg-white hover:bg-white/20 text-black",
                    "dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
