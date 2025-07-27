"use client";

import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Eye,
  ArrowRight,
  Code,
  Database,
  Zap,
} from "lucide-react";
import { DarkModeContext } from "../layout";
import { cn } from "@/lib/utils";
import {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
  MinimalCardDescription,
  MinimalCardContent,
  MinimalCardFooter,
} from "@/components/ui/minimal-card";

const Projects = () => {
  const { isDark } = useContext(DarkModeContext);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = [
    {
      id: "ai-interviewer",
      title: "AI-Powered Interviewer Platform",
      description:
        "A comprehensive platform that conducts AI-driven interviews using advanced natural language processing and machine learning algorithms.",
      longDescription:
        "This platform revolutionizes the hiring process by leveraging cutting-edge AI to conduct intelligent, adaptive interviews that assess both technical skills and cultural fit.",
      image: "/placeholder.svg?height=190&width=400",
      technologies: ["React", "Node.js", "GCP", "Gemini AI", "TypeScript"],
      stats: { users: "10K+", accuracy: "95%", interviews: "50K+" },
      icon: Zap,
      links: { github: "#", live: "#", demo: "#" },
    },
    {
      id: "crm-system",
      title: "Enterprise CRM System",
      description:
        "A scalable customer relationship management system with robust APIs, real-time analytics, and comprehensive user management.",
      longDescription:
        "Built for enterprise-scale operations, this CRM system handles millions of customer interactions with real-time insights and predictive analytics.",
      image: "/placeholder.svg?height=190&width=400",
      technologies: ["React", "Node.js", "MongoDB", "Prisma", "Express"],
      stats: { clients: "500+", uptime: "99.9%", records: "1M+" },
      icon: Database,
      links: { github: "#", live: "#", demo: "#" },
    },
    {
      id: "notification-service",
      title: "Centralized Notification Service",
      description:
        "A unified notification system supporting multiple channels including email, SMS, push notifications, and in-app messaging.",
      longDescription:
        "This microservice architecture handles millions of notifications daily across multiple channels with intelligent routing and delivery optimization.",
      image: "/placeholder.svg?height=190&width=400",
      technologies: ["Node.js", "Redis", "WebSocket", "MongoDB", "React"],
      stats: { messages: "1M+/day", channels: "8", latency: "<100ms" },
      icon: Code,
      links: { github: "#", live: "#", demo: "#" },
    },
  ];

  return (
    <div
      className={cn(
        "min-h-screen relative overflow-hidden transition-colors duration-300",
        isDark ? "bg-black text-white" : "bg-white text-gray-900"
      )}
    >
      {/* Background Gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-50 transition-opacity duration-300",
          isDark
            ? "bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"
            : "bg-gradient-to-br from-purple-50 via-transparent to-blue-50"
        )}
      />

      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative inline-block mb-8"
          >
            <h1
              className={cn(
                "text-4xl sm:text-5xl md:text-6xl font-serif leading-tight relative z-10",
                isDark ? "text-white" : "text-gray-900"
              )}
            >
              Projects
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={cn(
              "text-lg max-w-2xl mx-auto leading-relaxed",
              isDark ? "text-gray-400" : "text-gray-600"
            )}
          >
            A collection of web applications that showcase my expertise in
            building scalable, user-centric solutions with modern technologies.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className="group"
                >
                  <MinimalCard
                    isDark={isDark}
                    className="h-full transition-all duration-300 hover:shadow-2xl"
                  >
                    {/* Project Image with Overlay */}
                    <div className="relative">
                      <MinimalCardImage
                        src={project.image}
                        alt={project.title}
                        isDark={isDark}
                      />

                      {/* Icon Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                        className="absolute top-4 left-4 z-10"
                      >
                        <div
                          className={cn(
                            "p-2 rounded-full backdrop-blur-sm border transition-colors duration-300",
                            isDark
                              ? "bg-black/60 border-white/20 text-white"
                              : "bg-white/90 border-gray-200 text-gray-700"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                      </motion.div>

                      {/* Hover Overlay with Actions */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredProject === project.id ? 1 : 0,
                        }}
                        className="absolute inset-2 rounded-[20px] bg-black/60 flex items-center justify-center gap-3 z-20"
                      >
                        {Object.entries(project.links).map(
                          ([key, url], linkIndex) => {
                            const LinkIcon =
                              key === "github"
                                ? Github
                                : key === "live"
                                ? ExternalLink
                                : Eye;
                            return (
                              <motion.a
                                key={key}
                                href={url}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{
                                  scale: hoveredProject === project.id ? 1 : 0,
                                  rotate:
                                    hoveredProject === project.id ? 0 : -180,
                                }}
                                transition={{
                                  delay: linkIndex * 0.1,
                                  duration: 0.3,
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                              >
                                <LinkIcon className="w-5 h-5" />
                              </motion.a>
                            );
                          }
                        )}
                      </motion.div>

                      {/* Stats Overlay */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: hoveredProject === project.id ? 1 : 0,
                          y: hoveredProject === project.id ? 0 : 20,
                        }}
                        className="absolute bottom-4 left-4 right-4 z-10"
                      >
                        <div
                          className={cn(
                            "grid grid-cols-3 gap-2 p-3 rounded-xl backdrop-blur-sm border",
                            "bg-white/10 border-white/20"
                          )}
                        >
                          {Object.entries(project.stats).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-xs text-white/80 capitalize">
                                {key}
                              </div>
                              <div className="text-sm font-semibold text-white">
                                {value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <MinimalCardContent>
                      {/* Title */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                      >
                        <MinimalCardTitle
                          isDark={isDark}
                          className="font-serif text-xl mb-3"
                        >
                          {project.title}
                        </MinimalCardTitle>
                      </motion.div>

                      {/* Description */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      >
                        <MinimalCardDescription
                          isDark={isDark}
                          className="mb-4 leading-relaxed"
                        >
                          {project.description}
                        </MinimalCardDescription>
                      </motion.div>

                      {/* Technologies */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                        className="flex flex-wrap gap-2 mb-4"
                      >
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.2 + 0.7 + techIndex * 0.05,
                            }}
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
                              isDark
                                ? "bg-gray-800/60 text-gray-300 border border-gray-700 hover:bg-gray-700/60"
                                : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                            )}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>

                      {/* Learn More Link */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: hoveredProject === project.id ? 1 : 0.7,
                          x: hoveredProject === project.id ? 0 : -10,
                        }}
                        className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-300"
                      >
                        <span
                          className={cn(
                            "transition-colors",
                            isDark
                              ? "text-purple-400 group-hover:text-purple-300"
                              : "text-purple-600 group-hover:text-purple-700"
                          )}
                        >
                          View Project
                        </span>
                        <motion.div
                          animate={{
                            x: hoveredProject === project.id ? [0, 4, 0] : 0,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat:
                              hoveredProject === project.id ? Infinity : 0,
                            ease: "easeInOut",
                          }}
                        >
                          <ArrowRight
                            className={cn(
                              "w-4 h-4 transition-colors",
                              isDark
                                ? "text-purple-400 group-hover:text-purple-300"
                                : "text-purple-600 group-hover:text-purple-700"
                            )}
                          />
                        </motion.div>
                      </motion.div>
                    </MinimalCardContent>
                  </MinimalCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-20"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className={cn(
              "text-lg mb-8",
              isDark ? "text-gray-300" : "text-gray-600"
            )}
          >
            Each project represents a unique challenge solved with innovative
            thinking.
            <br />
            <span className="text-sm opacity-75">
              Interested in collaborating or learning more about my work?
            </span>
          </motion.p>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300",
              isDark
                ? "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-sm"
                : "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
            )}
          >
            <span>Get In Touch</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
