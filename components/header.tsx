import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import { Button } from './ui/button'
import { MenuBar } from './menu-bar'
import { Heart, Bookmark } from "lucide-react"
import { SparklesText } from "@/components/magicui/sparkles-text"
import { AnimatedThemeToggler } from './magicui/animated-theme-toggler'

const Header = () => {
    return (
        <header className="sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={30}
                                height={30}
                                priority
                                className="transition-all duration-300 brightness-100 contrast-100 dark:brightness-110 dark:contrast-100 dark:invert dark:filter dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
                            />
                        </div>
                        <SparklesText className="text-3xl">Movie Discovery</SparklesText>
                    </div>
                    <MenuBar />
                    <div className="flex items-center gap-5">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-colors bg-transparent"
                            >
                                <Link href="/favorites">
                                    <Heart className="h-4 w-4 mr-2" />
                                    Favorites
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-500 transition-colors bg-transparent"
                            >
                                <Link href="/watchlist">
                                    <Bookmark className="h-4 w-4 mr-2" />
                                    Watchlist
                                </Link>
                            </Button>
                        </div>
                        <AnimatedThemeToggler />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header