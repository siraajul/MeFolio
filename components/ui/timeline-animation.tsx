"use client";

import { motion, useInView, Variants } from "framer-motion";
import React, { useRef } from "react";

interface TimelineContentProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLElement | null>;
  customVariants?: {
    visible: (i: number) => any;
    hidden: any;
  };
}

export const TimelineContent = ({
  children,
  as: Component = "div",
  className = "",
  animationNum = 0,
  timelineRef,
  customVariants,
}: TimelineContentProps) => {
  const localRef = useRef(null);
  const ref = timelineRef || localRef;
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const variants = customVariants || defaultVariants;

  // We explicitly type the motion component to any to allow dynamic 'as' prop usage with Framer Motion,
  // though typically you'd use motion[Component] if it were a string like 'div'.
  // However, for simplicity with creating dynamic motion components:
  const MotionComponent = motion.create(Component as any);

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={variants}
    >
      {children}
    </MotionComponent>
  );
};
