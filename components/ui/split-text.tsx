// components/ui/SplitText.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // Hide the element until GSAP has split and is ready to animate
    el.style.visibility = "hidden";

    // Create a SplitText instance
    const splitter = new GSAPSplitText(el, {
      type: splitType,
      absolute: splitType === "lines",
      linesClass: "split-line",
    });

    // Determine which elements to animate
    const targets =
      splitType === "lines"
        ? splitter.lines
        : splitType === "words"
        ? splitter.words
        : splitter.chars;

    // Prepare ScrollTrigger start position
    const startPct = (1 - threshold) * 100;
    const m = /^(-?\d+)(px|%)?$/.exec(rootMargin) || [];
    const v = parseFloat(m[1] || "0"),
      u = m[2] || "px";
    const sign = v < 0 ? `-=${Math.abs(v)}${u}` : `+=${v}${u}`;
    const start = `top ${startPct}%${sign}`;

    // Build the GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
        once: true,
        onEnter: () => {
          // Reveal the element when the animation actually starts
          el.style.visibility = "visible";
        },
      },
      smoothChildTiming: true,
      onComplete: () => {
        onLetterAnimationComplete?.();
      },
    });

    // Set initial state for all split chars/words/lines
    tl.set(targets, { ...from, immediateRender: false, force3D: true });

    // Animate them to the final state
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    // Cleanup on unmount
    return () => {
      tl.kill();
      gsap.killTweensOf(targets);
      if (splitter) splitter.revert();
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    onLetterAnimationComplete,
  ]);

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
      style={{
        textAlign,
        wordWrap: "break-word",
      }}
    >
      {text}
    </p>
  );
};

export default SplitText;
