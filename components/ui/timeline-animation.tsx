"use client";

import { motion, useInView, Variants, HTMLMotionProps } from "framer-motion";
import React, { useRef, useMemo } from "react";

interface TimelineContentProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
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

  // Memoize so the motion component isn't recreated every render (which would reset its
  // state and trips react-hooks/static-components). `as` lets callers pick the element.
  const MotionComponent = useMemo(
    () => motion.create(Component as React.ComponentType) as React.ComponentType<HTMLMotionProps<"div">>,
    [Component]
  );

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
