"use client" 

import * as React from "react"
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/components/ui/button";

interface ParticleButtonProps extends ButtonProps {
    onSuccess?: () => void;
    successDuration?: number;
}

// Fixed particle offsets, generated once at module load. Keeping Math.random out of render
// keeps the component pure (the burst is identical every click, which is imperceptible).
const PARTICLE_OFFSETS = Array.from({ length: 6 }, (_, i) => ({
    x: (i % 2 ? 1 : -1) * (Math.random() * 50 + 20),
    y: -Math.random() * 50 - 20,
}));

function SuccessParticles({
    centerX,
    centerY,
}: {
    centerX: number;
    centerY: number;
}) {
    return (
        <AnimatePresence>
            {PARTICLE_OFFSETS.map((offset, i) => (
                <motion.div
                    key={i}
                    className="fixed w-1 h-1 bg-black dark:bg-white rounded-full pointer-events-none z-50"
                    style={{ left: centerX, top: centerY }}
                    initial={{
                        scale: 0,
                        x: 0,
                        y: 0,
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        x: [0, offset.x],
                        y: [0, offset.y],
                    }}
                    transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: "easeOut",
                    }}
                />
            ))}
        </AnimatePresence>
    );
}

function ParticleButton({
    children,
    onClick,
    onSuccess,
    successDuration = 1000,
    className,
    ...props
}: ParticleButtonProps) {
    const [showParticles, setShowParticles] = useState(false);
    const [center, setCenter] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // Read the button's position here (event handler), not during render, then position
        // the particle burst from its center.
        const rect = buttonRef.current?.getBoundingClientRect();
        if (rect) {
            setCenter({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        }
        setShowParticles(true);

        setTimeout(() => {
            setShowParticles(false);
            if (onSuccess) onSuccess();
        }, successDuration);

        if (onClick) onClick(e);
    };

    return (
        <>
            {showParticles && <SuccessParticles centerX={center.x} centerY={center.y} />}
            <Button
                ref={buttonRef}
                onClick={handleClick}
                className={cn(
                    "relative",
                    showParticles && "scale-95",
                    "transition-transform duration-100",
                    className
                )}
                {...props}
            >
                {children}
            </Button>
        </>
    );
}

export { ParticleButton }
