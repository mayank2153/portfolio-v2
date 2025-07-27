import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MinimalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  isDark?: boolean;
}

interface MinimalCardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  isDark?: boolean;
}

interface MinimalCardComponentProps
  extends React.HTMLAttributes<
    HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement
  > {
  isDark?: boolean;
}

const MinimalCard = React.forwardRef<HTMLDivElement, MinimalCardProps>(
  ({ className, children, isDark = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[24px] p-2 no-underline transition-all duration-300",
        // Light mode styles
        !isDark && [
          "bg-white shadow-sm hover:shadow-md",
          "shadow-[rgba(17,24,28,0.08)_0_0_0_1px,rgba(17,24,28,0.08)_0_1px_2px_-1px,rgba(17,24,28,0.04)_0_2px_4px]",
          "hover:shadow-[rgba(17,24,28,0.12)_0_0_0_1px,rgba(17,24,28,0.12)_0_2px_4px_-1px,rgba(17,24,28,0.08)_0_4px_8px]",
          "border border-gray-100",
        ],
        // Dark mode styles
        isDark && [
          "bg-neutral-900/60 backdrop-blur-sm border border-neutral-700/50 hover:bg-neutral-800/70",
          "shadow-[0_1px_0_0_rgba(255,255,255,0.02)_inset,0_0_0_1px_rgba(255,255,255,0.02)_inset,0_0_0_1px_rgba(0,0,0,0.3),0_2px_4px_0_rgba(0,0,0,0.4),0_4px_8px_0_rgba(0,0,0,0.2)]",
          "hover:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.4),0_4px_8px_0_rgba(0,0,0,0.5),0_8px_16px_0_rgba(0,0,0,0.3)]",
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
MinimalCard.displayName = "MinimalCard";

const MinimalCardImage = React.forwardRef<
  HTMLDivElement,
  MinimalCardImageProps
>(({ className, alt, src, isDark = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative mb-6 h-[190px] w-full rounded-[20px] overflow-hidden",
      // Light mode styles
      !isDark && [
        "shadow-[rgba(17,24,28,0.08)_0_0_0_1px,rgba(17,24,28,0.04)_0_1px_2px_-1px,rgba(17,24,28,0.02)_0_2px_4px]",
        "bg-gray-50",
      ],
      // Dark mode styles
      isDark && [
        "shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_0_0_1px_rgba(0,0,0,0.2),0_2px_4px_0_rgba(0,0,0,0.2)]",
        "bg-gray-800/30",
      ],
      className
    )}
    {...props}
  >
    <Image
      src={src}
      alt={alt}
      width={400}
      height={190}
      className="absolute inset-0 size-full rounded-[16px] object-cover transition-transform duration-300 hover:scale-105"
    />

    {/* Image overlay for better contrast */}
    <div
      className={cn(
        "absolute inset-0 rounded-[16px] transition-opacity duration-300",
        !isDark && "bg-black/5 hover:bg-black/10",
        isDark && "bg-black/30 hover:bg-black/20"
      )}
    />

    {/* Inner shadow for depth */}
    <div
      className={cn(
        "absolute inset-0 rounded-[16px] pointer-events-none",
        !isDark &&
          "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(0,0,0,0.05)]",
        isDark &&
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_2px_rgba(0,0,0,0.3)]"
      )}
    />
  </div>
));
MinimalCardImage.displayName = "MinimalCardImage";

const MinimalCardTitle = React.forwardRef<
  HTMLHeadingElement,
  MinimalCardComponentProps
>(({ className, isDark = false, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "mt-2 px-1 text-lg font-semibold leading-tight transition-colors duration-300",
      !isDark && "text-gray-900",
      isDark && "text-neutral-100",
      className
    )}
    {...props}
  />
));
MinimalCardTitle.displayName = "MinimalCardTitle";

const MinimalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  MinimalCardComponentProps
>(({ className, isDark = false, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "px-1 pb-2 text-sm transition-colors duration-300 leading-relaxed",
      !isDark && "text-gray-600",
      isDark && "text-neutral-300",
      className
    )}
    {...props}
  />
));
MinimalCardDescription.displayName = "MinimalCardDescription";

const MinimalCardContent = React.forwardRef<
  HTMLDivElement,
  MinimalCardComponentProps
>(({ className, isDark = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0 transition-colors duration-300", className)}
    {...props}
  />
));
MinimalCardContent.displayName = "MinimalCardContent";

const MinimalCardFooter = React.forwardRef<
  HTMLDivElement,
  MinimalCardComponentProps
>(({ className, isDark = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0 transition-colors duration-300",
      className
    )}
    {...props}
  />
));
MinimalCardFooter.displayName = "MinimalCardFooter";

export {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
  MinimalCardDescription,
  MinimalCardContent,
  MinimalCardFooter,
};

export default MinimalCard;
