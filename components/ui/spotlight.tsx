// components/ui/spotlight.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface SpotlightProps {
  isDark: boolean;
  translateY?: number;
  bigWidth?: number;
  smallWidth?: number;
  height?: number;
  duration?: number;
  xOffset?: number;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  isDark,
  translateY = -350,
  bigWidth = 560,
  smallWidth = 240,
  height = 1380,
  duration = 7,
  xOffset = 100,
}) => {
  // choose gradients based on theme
  const gradients = isDark
    ? [
        "radial-gradient(68% 68% at 55% 31%, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.02) 50%, transparent 80%)",
        "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.06) 0, transparent 100%)",
        "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.04) 0, transparent 100%)",
      ]
    : [
        "radial-gradient(68% 68% at 55% 31%, rgba(0,0,0,0.08) 0, rgba(0,0,0,0.02) 50%, transparent 80%)",
        "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.06) 0, transparent 100%)",
        "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.04) 0, transparent 100%)",
      ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Left side */}
      <motion.div
        animate={{ x: [0, xOffset, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute inset-y-0 left-0 w-[100vw] flex"
      >
        {[0, 1, 2].map((i) => {
          const [grad, tx, origin] =
            i === 0
              ? [
                  gradients[0],
                  `translateY(${translateY}px) rotate(-45deg)`,
                  "top left",
                ]
              : i === 1
              ? [gradients[1], "rotate(-45deg) translate(5%, -50%)", "top left"]
              : [
                  gradients[2],
                  "rotate(-45deg) translate(-180%, -70%)",
                  "top left",
                ];

          const width = i === 0 ? bigWidth : smallWidth;
          return (
            <div
              key={`l${i}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: tx,
                transformOrigin: origin,
                background: grad,
                width: `${width}px`,
                height: `${height}px`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Right side */}
      <motion.div
        animate={{ x: [0, -xOffset, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute inset-y-0 right-0 w-[100vw] flex"
      >
        {[0, 1, 2].map((i) => {
          const [grad, tx, origin] =
            i === 0
              ? [
                  gradients[0],
                  `translateY(${translateY}px) rotate(45deg)`,
                  "top right",
                ]
              : i === 1
              ? [
                  gradients[1],
                  "rotate(45deg) translate(-5%, -50%)",
                  "top right",
                ]
              : [
                  gradients[2],
                  "rotate(45deg) translate(180%, -70%)",
                  "top right",
                ];

          const width = i === 0 ? bigWidth : smallWidth;
          return (
            <div
              key={`r${i}`}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                transform: tx,
                transformOrigin: origin,
                background: grad,
                width: `${width}px`,
                height: `${height}px`,
              }}
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
};
