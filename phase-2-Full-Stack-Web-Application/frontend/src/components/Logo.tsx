/**
 * Custom animated Logo component for Todo Pro.
 * Uses SVG with Framer Motion for a premium, interactive feel.
 */
"use client";

import { motion } from "framer-motion";

interface LogoProps {
    className?: string;
    size?: number;
}

export function Logo({ className, size = 40 }: LogoProps) {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Outer Pulsing Ring */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeOpacity="0.2"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Rotating Progress Ring */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray="60 180"
                    strokeLinecap="round"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{ originX: "50px", originY: "50px" }}
                />

                {/* Inner Gradient Circle */}
                <defs>
                    <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" />
                        <stop offset="100%" stopColor="#A855F7" /> {/* Purple-500 */}
                    </linearGradient>
                </defs>

                <motion.circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="url(#logo-gradient)"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />

                {/* The Manifesting Checkmark */}
                <motion.path
                    d="M35 50L45 60L65 40"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: "easeInOut",
                    }}
                />

                {/* Sparkle effects */}
                <motion.circle
                    cx="75"
                    cy="25"
                    r="2"
                    fill="white"
                    animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 1,
                    }}
                />
                <motion.circle
                    cx="20"
                    cy="30"
                    r="1.5"
                    fill="white"
                    animate={{
                        scale: [0, 1.2, 0],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.5,
                    }}
                />
            </svg>
        </div>
    );
}
