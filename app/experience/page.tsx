"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import { ExpandedTabs } from "@/components/ui/expanded-tabs";
import { DarkModeContext } from "@/app/layout";
import { cn } from "@/lib/utils";
import {
  Home,
  Bell,
  Settings,
  HelpCircle,
  Shield,
  MapPin,
  Calendar,
  Code,
  Database,
  Cloud,
  Users,
} from "lucide-react";

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

  const experienceData = [
    {
      title: "Jan 2025 – Present",
      content: (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  isDark
                    ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                    : "bg-gradient-to-br from-blue-100 to-purple-100"
                )}
              >
                <Code
                  className={cn(
                    "h-5 w-5",
                    isDark ? "text-blue-400" : "text-blue-600"
                  )}
                />
              </div>
              <div>
                <h4
                  className={cn(
                    "text-lg font-semibold mb-2",
                    isDark ? "text-white" : "text-gray-900"
                  )}
                >
                  Full Stack Engineer at{" "}
                  <motion.span
                    className="relative inline-block group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    Experiment Labs
                    <motion.div
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r",
                        isDark
                          ? "from-blue-400 to-purple-400"
                          : "from-blue-600 to-purple-600"
                      )}
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </motion.span>
                </h4>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar
                      className={cn(
                        "h-4 w-4",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}
                    >
                      Jan 2025 – Present
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin
                      className={cn(
                        "h-4 w-4",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}
                    >
                      Remote
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p
              className={cn(
                "text-base leading-relaxed",
                isDark ? "text-gray-300" : "text-gray-600"
              )}
            >
              Led the development of critical backend systems and frontend
              components, including a comprehensive CRM, Report Service,
              AI-powered Interviewer platform, unified authentication service,
              plugins, recommendation algorithms, and a centralized notification
              service.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={cn(
                  "p-6 rounded-xl border transition-all duration-300 hover:shadow-lg",
                  isDark
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white/80 border-gray-200 hover:bg-white backdrop-blur-sm"
                )}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users
                    className={cn(
                      "h-5 w-5",
                      isDark ? "text-emerald-400" : "text-emerald-600"
                    )}
                  />
                  <h5
                    className={cn(
                      "font-semibold",
                      isDark ? "text-white" : "text-gray-900"
                    )}
                  >
                    Key Contributions
                  </h5>
                </div>
                <ul
                  className={cn(
                    "space-y-2 text-sm",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}
                >
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    Built scalable CRM backend with robust APIs
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    Developed AI Interviewer (frontend & backend) using GCP and
                    Gemini models
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    Implemented unified authentication and notification systems
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    Optimized recommendation algorithms for student profiles
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={cn(
                  "p-6 rounded-xl border transition-all duration-300 hover:shadow-lg",
                  isDark
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white/80 border-gray-200 hover:bg-white backdrop-blur-sm"
                )}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Database
                    className={cn(
                      "h-5 w-5",
                      isDark ? "text-purple-400" : "text-purple-600"
                    )}
                  />
                  <h5
                    className={cn(
                      "font-semibold",
                      isDark ? "text-white" : "text-gray-900"
                    )}
                  >
                    Technologies
                  </h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Node.js",
                    "GCP",
                    "Prisma",
                    "MongoDB",
                    "TypeScript",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105",
                        isDark
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30"
                          : "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200"
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      title: "Nov 2024 – Dec 2024",
      content: (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  isDark
                    ? "bg-gradient-to-br from-orange-500/20 to-red-500/20"
                    : "bg-gradient-to-br from-orange-100 to-red-100"
                )}
              >
                <Cloud
                  className={cn(
                    "h-5 w-5",
                    isDark ? "text-orange-400" : "text-orange-600"
                  )}
                />
              </div>
              <div>
                <h4
                  className={cn(
                    "text-lg font-semibold mb-2",
                    isDark ? "text-white" : "text-gray-900"
                  )}
                >
                  Software Engineer Intern at{" "}
                  <motion.span
                    className="relative inline-block group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    Whatbytes
                    <motion.div
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r",
                        isDark
                          ? "from-orange-400 to-red-400"
                          : "from-orange-600 to-red-600"
                      )}
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </motion.span>
                </h4>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar
                      className={cn(
                        "h-4 w-4",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}
                    >
                      Nov 2024 – Dec 2024
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin
                      className={cn(
                        "h-4 w-4",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}
                    >
                      Remote
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p
              className={cn(
                "text-base leading-relaxed",
                isDark ? "text-gray-300" : "text-gray-600"
              )}
            >
              Managed backend services using Node.js and handled frontend tasks
              for a high-traffic application serving thousands of concurrent
              users.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className={cn(
                  "p-6 rounded-xl border transition-all duration-300 hover:shadow-lg",
                  isDark
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white/80 border-gray-200 hover:bg-white backdrop-blur-sm"
                )}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users
                    className={cn(
                      "h-5 w-5",
                      isDark ? "text-emerald-400" : "text-emerald-600"
                    )}
                  />
                  <h5
                    className={cn(
                      "font-semibold",
                      isDark ? "text-white" : "text-gray-900"
                    )}
                  >
                    Key Contributions
                  </h5>
                </div>
                <ul
                  className={cn(
                    "space-y-2 text-sm",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}
                >
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    Enhanced backend performance and stability
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    Improved frontend responsiveness
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    Managed high-concurrency application deployments
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className={cn(
                  "p-6 rounded-xl border transition-all duration-300 hover:shadow-lg",
                  isDark
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white/80 border-gray-200 hover:bg-white backdrop-blur-sm"
                )}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Database
                    className={cn(
                      "h-5 w-5",
                      isDark ? "text-purple-400" : "text-purple-600"
                    )}
                  />
                  <h5
                    className={cn(
                      "font-semibold",
                      isDark ? "text-white" : "text-gray-900"
                    )}
                  >
                    Technologies
                  </h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "React", "Express", "JavaScript"].map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105",
                        isDark
                          ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30"
                          : "bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border border-orange-200"
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      ),
    },
  ];

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
          <Timeline data={experienceData} />
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
