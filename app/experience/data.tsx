import {
  MapPin,
  Calendar,
  Code,
  Database,
  Cloud,
  Users,
  Layers,
} from "lucide-react";
import { motion } from "motion/react";
import { useContext } from "react";
import { DarkModeContext } from "@/app/layout";
import { cn } from "@/lib/utils";

export const useExperienceData = () => {
  const { isDark } = useContext(DarkModeContext);

  return [
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
                  Founding Engineer at{" "}
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
              Leading end-to-end development of critical backend systems and
              frontend components, including comprehensive CRM solutions,
              AI-powered platforms, and unified authentication services for
              multi-tenant operations.
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
                    Led CRM Development: Managed end-to-end development of
                    scalable CRM to streamline consultant workflows
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    Delivered Report Engine: Architected editable student
                    reports with in-browser editing and PDF export
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    Built AI Interviewer: Developed full-stack mock-interview
                    platform using React, Cloud Tasks, Cloud Run & Gemini
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    Established Unified Auth: Designed and deployed single
                    sign-on microservice across subdomains
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
                    "Cloud Tasks",
                    "Cloud Run",
                    "Gemini",
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
      title: "Nov 2024 – Jan 2025",
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
                  Engineer Intern at{" "}
                  <motion.span
                    className="relative inline-block group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    WhatBytes
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
                      Nov 2024 – Jan 2025
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
              Developed high-performance frontend solutions and critical backend
              features for a platform serving thousands of concurrent users,
              focusing on optimization and real-time data synchronization.
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
                    High-Traffic Frontend: Implemented React-based UI optimizing
                    load times and responsiveness
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    Developed Critical Features: Implemented core Next.js and
                    Node.js functionalities
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    Enhanced real-time data sync and performance optimization
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
                  {["React", "Next.js", "Node.js", "JavaScript"].map((tech) => (
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
    {
      title: "Mar 2024 – Jun 2024",
      content: (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  isDark
                    ? "bg-gradient-to-br from-green-500/20 to-teal-500/20"
                    : "bg-gradient-to-br from-green-100 to-teal-100"
                )}
              >
                <Layers
                  className={cn(
                    "h-5 w-5",
                    isDark ? "text-green-400" : "text-green-600"
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
                  Frontend Developer Intern at{" "}
                  <motion.span
                    className="relative inline-block group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    Antim Pravakta Media Pvt. Ltd.
                    <motion.div
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r",
                        isDark
                          ? "from-green-400 to-teal-400"
                          : "from-green-600 to-teal-600"
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
                      Mar 2024 – Jun 2024
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
              Focused on building reusable React components and integrating
              frontend solutions with RESTful APIs to accelerate feature
              delivery and enhance user experience.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
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
                    UI Components: Developed reusable React components to
                    accelerate feature delivery
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    API Integration: Connected frontend to RESTful services for
                    dynamic data rendering
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      )}
                    />
                    Enhanced user interface design and responsiveness
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
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
                  {["React", "JavaScript", "RESTful APIs", "CSS"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105",
                          isDark
                            ? "bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-300 border border-green-500/30"
                            : "bg-gradient-to-r from-green-50 to-teal-50 text-green-700 border border-green-200"
                        )}
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      ),
    },
  ];
};
