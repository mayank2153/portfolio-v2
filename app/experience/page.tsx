"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import { ExpandedTabs } from "@/components/ui/expanded-tabs";
import { DarkModeContext } from "@/app/layout";
import { cn } from "@/lib/utils";
import { Home, Bell, Settings, HelpCircle, Shield } from "lucide-react";
import { useExperienceData } from "./data";
const tabs = [
  { title: "Dashboard", icon: Home },
  { title: "Notifications", icon: Bell },
  { type: "separator" as const },
  { title: "Settings", icon: Settings },
  { title: "Support", icon: HelpCircle },
  { title: "Security", icon: Shield },
];

const Experience = () => {
  const { isDark } = useContext(DarkModeContext);

  return (
    <div
      className={cn(
        "min-h-screen relative overflow-hidden",
        isDark
          ? "bg-black text-white"
          : "bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900"
      )}
    >
      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl font-serif mb-6 leading-tight",
              isDark ? "text-white" : "text-gray-900"
            )}
          >
            Experience
          </h1>
          <p
            className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-gray-400" : "text-gray-600"
            )}
          >
            My professional journey and the impact I've made along the way.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Timeline data={useExperienceData()} />
        </motion.div>
      </div>

      {/* Fixed Tabs */}
      <div className="fixed z-20 bottom-12 sm:bottom-28 left-1/2 transform -translate-x-1/2 flex items-center px-4 sm:px-0">
        <ExpandedTabs tabs={tabs} isDark={isDark} />
      </div>
    </div>
  );
};

export default Experience;
