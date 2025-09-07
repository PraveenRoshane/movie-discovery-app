import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MenuBar } from './menu-bar'
import { Heart, Bookmark } from 'lucide-react'
import { ExpandableSearch } from './expandable-search'
import { AnimatedThemeToggler } from './magicui/animated-theme-toggler'

const Header = () => {
    return (
        <header className="sticky top-0 z-20 transition-all duration-300">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className='px-5 py-2.5 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border-none shadow-lg relative overflow-hidden'>
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={100}
                            height={100}
                            priority
                            className="transition-all duration-300 brightness-100 contrast-100 dark:brightness-110 dark:contrast-100 dark:invert dark:filter dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
                        />
                    </div>
                    <div className="p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border-none shadow-lg relative overflow-hidden">
                        <MenuBar />
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ExpandableSearch />
                    </Suspense>
                    <div className="p-4.5 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border-none shadow-lg relative overflow-hidden">
                        <div className="flex items-center">
                            <div className="flex gap-2">
                                <Link href="/favorites">
                                    <Heart className="h-5 w-5 mr-2 hover:text-red-500 transition-colors bg-transparent" />
                                </Link>
                                <Link href="/watchlist">
                                    <Bookmark className="h-5 w-5 mr-2 hover:text-blue-500 transition-colors bg-transparent" />
                                </Link>
                                <AnimatedThemeToggler />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header