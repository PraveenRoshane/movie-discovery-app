"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Home, Film, Tv, Tag, Menu, Heart, Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedThemeToggler } from "./magicui/animated-theme-toggler"

const menuItems = [
    { icon: <Home className="h-5 w-5" />, label: "Home", href: "/" },
    { icon: <Film className="h-5 w-5" />, label: "Movies", href: "/movies" },
    { icon: <Tv className="h-5 w-5" />, label: "TV Shows", href: "/tv" },
    { icon: <Tag className="h-5 w-5" />, label: "Genres", href: "/genres" },
    { icon: <Heart className="h-5 w-5" />, label: "Favorites", href: "/favorites" },
    { icon: <Bookmark className="h-5 w-5" />, label: "Watchlist", href: "/watchlist" },
]

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const toggleMenu = () => setIsOpen(!isOpen)

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname.startsWith(href)
    }

    return (
        <>
            {/* Top bar */}
            <div className="sm:hidden p-4 bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg">
                <div className="flex flex-row items-center gap-3 relative py-2">
                    {/* Menu Button */}
                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        className="md:hidden focus:outline-none focus:ring-2 focus:ring-primary rounded"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Logo */}
                    <Link href="/" aria-label="Home" className="absolute left-1/2 -translate-x-1/2">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={96}
                            height={34}
                            priority
                            className="transition-all duration-300 dark:invert dark:filter dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
                        />
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center ml-auto gap-2">
                        <Link href="/favorites" aria-label="Favorites" title="Favorites">
                            <Heart className="h-5 w-5 hover:text-red-500 transition-colors" />
                        </Link>
                        <Link href="/watchlist" aria-label="Watchlist" title="Watchlist">
                            <Bookmark className="h-5 w-5 hover:text-blue-500 transition-colors" />
                        </Link>
                        <AnimatedThemeToggler />
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible",
                )}
                onClick={toggleMenu}
            />

            {/* Drawer */}
            <nav
                id="mobile-menu"
                role="navigation"
                className={cn(
                    "fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 md:hidden",
                    "bg-background/98 backdrop-blur-md border-l border-border/50 shadow-2xl",
                    "transform transition-transform duration-500 ease-out",
                    isOpen ? "translate-x-0" : "translate-x-full",
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-border/50 flex items-center justify-center">
                        <Link href="/" aria-label="Home" onClick={toggleMenu}>
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={96}
                                height={34}
                                priority
                                className="transition-all duration-300 dark:invert dark:filter dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
                            />
                        </Link>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 py-6">
                        <ul className="space-y-2 px-4">
                            {menuItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={toggleMenu}
                                        className={cn(
                                            "group flex items-center gap-4 px-4 py-3 rounded-xl",
                                            "transition-all duration-300 hover:bg-accent/50 active:scale-[0.98]",
                                            "transform-gpu will-change-transform",
                                            isActive(item.href) && "bg-primary text-primary-foreground shadow-md",
                                        )}
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                                            {item.icon}
                                        </div>
                                        <span className="font-medium transition-all duration-300 group-hover:translate-x-1">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
