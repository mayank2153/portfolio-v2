"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState, useContext } from "react";
import { DarkModeContext } from "@/app/layout";
import { cn } from "@/lib/utils";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const { isDark } = useContext(DarkModeContext);
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className={cn(
        "w-full font-sans md:px-10 rounded-lg shadow-lg ",
        isDark ? "bg-[#1f1f1f]/10" : "bg-[#1f1f1f]/10"
      )}
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div
                className={cn(
                  "h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center",
                  isDark ? "bg-black" : "bg-white"
                )}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border p-2",
                    isDark
                      ? "bg-neutral-800 border-neutral-700"
                      : "bg-gray-100 border-gray-300"
                  )}
                />
              </div>
              <h3
                className={cn(
                  "hidden md:block text-xl md:pl-20 md:text-5xl font-bold",
                  isDark ? "text-neutral-500" : "text-gray-700"
                )}
              >
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3
                className={cn(
                  "md:hidden block text-2xl mb-4 text-left font-bold",
                  isDark ? "text-neutral-500" : "text-gray-400"
                )}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className={cn(
            "absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]",
            isDark
              ? "from-transparent via-neutral-700 to-transparent"
              : "from-transparent via-gray-300 to-transparent"
          )}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className={cn(
              "absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t rounded-full",
              isDark
                ? "from-purple-500 via-blue-500 to-transparent"
                : "from-blue-600 via-purple-600 to-transparent"
            )}
          />
        </div>
      </div>
    </div>
  );
};
