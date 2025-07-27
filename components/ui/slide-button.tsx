"use client";

import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
  type JSX,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Check, Loader2, SendHorizontal, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { useContext } from "react";
import { DarkModeContext } from "@/app/layout";

const DRAG_CONSTRAINTS = { left: 0, right: 155 };
const DRAG_THRESHOLD = 0.9;

const BUTTON_STATES = {
  initial: { width: "12rem" },
  completed: { width: "8rem" },
};

const ANIMATION_CONFIG = {
  spring: {
    type: "spring" as const,
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  },
};

type StatusIconProps = {
  status: string;
  isDark: boolean;
};

const StatusIcon: React.FC<StatusIconProps> = ({ status, isDark }) => {
  const iconMap: Record<string, JSX.Element> = useMemo(
    () => ({
      loading: (
        <Loader2
          className={cn(
            "animate-spin",
            isDark ? "text-white" : "text-gray-900"
          )}
          size={20}
        />
      ),
      success: (
        <Check
          className={cn(isDark ? "text-white" : "text-gray-900")}
          size={20}
        />
      ),
      error: (
        <X className={cn(isDark ? "text-white" : "text-gray-900")} size={20} />
      ),
    }),
    [isDark]
  );

  if (!iconMap[status]) return null;
  return (
    <motion.div
      key={`${status}-${isDark}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
    >
      {iconMap[status]}
    </motion.div>
  );
};

const useButtonStatus = (resolveTo: "success" | "error") => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = useCallback(() => {
    setStatus("loading");
    setTimeout(() => {
      setStatus(resolveTo);
    }, 1000); // Reduced time for better UX
  }, [resolveTo]);

  const reset = useCallback(() => {
    setStatus("idle");
  }, []);

  return { status, handleSubmit, reset };
};

interface SlideButtonProps extends ButtonProps {
  onSlideComplete?: () => void;
  resolveTo?: "success" | "error";
}

const SlideButton = forwardRef<HTMLButtonElement, SlideButtonProps>(
  ({ className, onSlideComplete, resolveTo = "success", ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [completed, setCompleted] = useState(false);
    const dragHandleRef = useRef<HTMLDivElement | null>(null);
    const { status, handleSubmit, reset } = useButtonStatus(resolveTo);
    const { isDark } = useContext(DarkModeContext);

    const dragX = useMotionValue(0);
    const springX = useSpring(dragX, ANIMATION_CONFIG.spring);
    const dragProgress = useTransform(
      springX,
      [0, DRAG_CONSTRAINTS.right],
      [0, 1]
    );

    // Reset function for external use
    const resetButton = useCallback(() => {
      setCompleted(false);
      setIsDragging(false);
      dragX.set(0);
      reset();
    }, [dragX, reset]);

    const handleDragStart = useCallback(() => {
      if (completed) return;
      setIsDragging(true);
    }, [completed]);

    const handleDragEnd = useCallback(() => {
      if (completed) return;
      setIsDragging(false);

      const progress = dragProgress.get();
      if (progress >= DRAG_THRESHOLD) {
        setCompleted(true);
        handleSubmit();
        // Call the completion handler after a delay to show the success state
        setTimeout(() => {
          onSlideComplete?.();
        }, 1500); // Show success for 1.5s then route
      } else {
        dragX.set(0);
      }
    }, [completed, dragProgress, handleSubmit, onSlideComplete, dragX]);

    const handleDrag = useCallback(
      (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (completed) return;
        const newX = Math.max(
          0,
          Math.min(info.offset.x, DRAG_CONSTRAINTS.right)
        );
        dragX.set(newX);
      },
      [completed, dragX]
    );

    const adjustedWidth = useTransform(springX, (x) => x + 40);

    return (
      <motion.div
        animate={completed ? BUTTON_STATES.completed : BUTTON_STATES.initial}
        transition={ANIMATION_CONFIG.spring}
        className={cn(
          "relative flex h-12 items-center justify-center rounded-full transition-all duration-300",
          // Minimal container styling
          isDark
            ? "bg-white/10 backdrop-blur-sm border border-white/20"
            : "bg-gray-100 border border-gray-200"
        )}
      >
        {/* Progress track background - subtle */}
        {!completed && (
          <motion.div
            style={{
              width: adjustedWidth,
            }}
            className={cn(
              "absolute inset-y-1 left-1 z-0 rounded-full transition-all duration-200",
              isDark ? "bg-white/10" : "bg-gray-300/50"
            )}
          />
        )}

        {/* Slide text */}
        {/* {!completed && (
          <motion.div
            className={cn(
              "absolute inset-0 flex items-center justify-center text-sm font-medium pointer-events-none z-5",
              isDark ? "text-white/70" : "text-gray-600"
            )}
            animate={{
              opacity: isDragging ? 0.5 : 1,
            }}
          >
            <span className="ml-8">Slide to continue</span>
          </motion.div>
        )} */}

        {/* Draggable handle */}
        <AnimatePresence>
          {!completed && (
            <motion.div
              ref={dragHandleRef}
              drag="x"
              dragConstraints={DRAG_CONSTRAINTS}
              dragElastic={0.05}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrag={handleDrag}
              style={{ x: springX }}
              className="absolute left-1 z-10 flex cursor-grab items-center justify-start active:cursor-grabbing"
              whileDrag={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                ref={ref}
                disabled={status === "loading"}
                {...props}
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full transition-all duration-200",
                  isDark
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800",
                  className
                )}
              >
                <SendHorizontal className="size-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completed state - minimal styling */}
        <AnimatePresence>
          {completed && (
            <motion.div
              className="absolute inset-1 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                ref={ref}
                disabled={status === "loading"}
                onClick={resetButton}
                {...props}
                className={cn(
                  "size-full rounded-full transition-all duration-300",
                  // Minimal completed state styling
                  isDark
                    ? "bg-white/20 hover:bg-white/30 text-white border border-white/20"
                    : "bg-gray-900 hover:bg-gray-800 text-white",
                  className
                )}
              >
                <AnimatePresence mode="wait">
                  <StatusIcon status={status} isDark={isDark} />
                </AnimatePresence>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle loading indicator */}
        {status === "loading" && (
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full opacity-10",
              isDark ? "bg-white" : "bg-gray-900"
            )}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>
    );
  }
);

SlideButton.displayName = "SlideButton";

export default SlideButton;
