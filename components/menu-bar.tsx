"use client"

import * as React from "react"
import { motion, Transition, Variants } from "framer-motion"
import { Home, Film, Tv, Shapes } from "lucide-react"
import { useTheme } from "next-themes"

interface MenuItem {
    icon: React.ReactNode
    label: string
    href: string
    gradient: string
    iconColor: string
}

const menuItems: MenuItem[] = [
    {
        icon: <Home className="h-5 w-5" />,
        label: "Home",
        href: "/",
        gradient: "linear-gradient(circle,rgba(255, 255, 255, 1) 0%, rgba(128, 128, 128, 1) 50%, rgba(0, 0, 0, 1) 100%)",
        iconColor: "text-white-500",
    },
    {
        icon: <Film className="h-5 w-5" />,
        label: "Movies",
        href: "#",
        gradient: "linear-gradient(circle,rgba(255, 255, 255, 1) 0%, rgba(128, 128, 128, 1) 50%, rgba(0, 0, 0, 1) 100%)",
        iconColor: "text-white-500",
    },
    {
        icon: <Tv className="h-5 w-5" />,
        label: "TV Shows",
        href: "#",
        gradient: "linear-gradient(circle,rgba(255, 255, 255, 1) 0%, rgba(128, 128, 128, 1) 50%, rgba(0, 0, 0, 1) 100%)",
        iconColor: "text-white-500",
    },
    {
        icon: <Shapes className="h-5 w-5" />,
        label: "Genres",
        href: "#",
        gradient: "linear-gradient(circle,rgba(255, 255, 255, 1) 0%, rgba(128, 128, 128, 1) 50%, rgba(0, 0, 0, 1) 100%)",
        iconColor: "text-white-500",
    },
]

const itemVariants: Variants = {
    initial: { rotateX: 0, opacity: 1 },
    hover: { rotateX: -90, opacity: 0 },
}

const backVariants: Variants = {
    initial: { rotateX: 90, opacity: 0 },
    hover: { rotateX: 0, opacity: 1 },
}

const glowVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
        opacity: 1,
        scale: 2,
        transition: {
            opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
        },
    },
}

const navGlowVariants: Variants = {
    initial: { opacity: 0 },
    hover: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
        },
    },
}

const sharedTransition: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    duration: 0.5,
}

export function MenuBar() {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // After mounting, we have access to the theme
    React.useEffect(() => setMounted(true), [])

    const isDarkTheme = mounted && (resolvedTheme === "dark" || theme === "dark")

    return (
        <motion.nav
            className="p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden"
            initial="initial"
            whileHover="hover"
        >
            <motion.div
                className={`absolute -inset-2 bg-gradient-radial from-transparent ${mounted
                    ? isDarkTheme
                        ? "via-blue-400/30 via-30% via-purple-400/30 via-60% via-red-400/30 via-90%"
                        : "via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90%"
                    : "via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90%"
                    } to-transparent rounded-3xl z-0 pointer-events-none`}
                variants={navGlowVariants}
            />
            <ul className="flex items-center gap-2 relative z-10">
                {menuItems.map((item) => (
                    <motion.li key={item.label} className="relative">
                        <motion.div
                            className="block rounded-xl overflow-visible group relative"
                            style={{ perspective: "600px" }}
                            whileHover="hover"
                            initial="initial"
                        >
                            <motion.div
                                className="absolute inset-0 z-0 pointer-events-none"
                                variants={glowVariants}
                                style={{
                                    background: item.gradient,
                                    opacity: 0,
                                    borderRadius: "16px",
                                }}
                            />
                            <motion.a
                                href={item.href}
                                className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
                                variants={itemVariants}
                                transition={sharedTransition}
                                style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                            >
                                <span className={`transition-colors duration-300 ${item.iconColor} text-foreground`}>
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </motion.a>
                            <motion.a
                                href={item.href}
                                className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
                                variants={backVariants}
                                transition={sharedTransition}
                                style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
                            >
                                <span className={`transition-colors duration-300 ${item.iconColor} text-foreground`}>
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </motion.a>
                        </motion.div>
                    </motion.li>
                ))}
            </ul>
        </motion.nav>
    )
}
