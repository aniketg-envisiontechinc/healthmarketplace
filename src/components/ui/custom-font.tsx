"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CustomFontProps {
  children: React.ReactNode;
  className?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption";
  animate?: boolean;
}

const variants = {
  h1: "text-4xl sm:text-5xl font-bold tracking-tight",
  h2: "text-3xl sm:text-4xl font-semibold tracking-tight",
  h3: "text-2xl sm:text-3xl font-semibold",
  h4: "text-xl sm:text-2xl font-medium",
  body: "text-base sm:text-lg",
  caption: "text-sm sm:text-base text-muted-foreground",
};

const animationVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function CustomFont({
  children,
  className,
  variant = "body",
  animate = true,
}: CustomFontProps) {
  const baseClasses = cn(
    'font-["Space_Grotesk"] tracking-wide',
    variants[variant],
    className,
  );

  if (animate) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animationVariants}
        transition={{ duration: 0.5 }}
        className={baseClasses}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{children}</div>;
}
