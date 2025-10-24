import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { MenuBar } from './menu-bar'
import { MobileNavClient } from './mobile-nav-client'
import { ExpandableSearch } from './expandable-search'
import { Heart, Bookmark } from 'lucide-react'
import ExpandableSearchSkeleton from './expandable-search-skeleton'
import { AnimatedThemeToggler } from './magicui/animated-theme-toggler'

const Header = () => {
    return (
        <header className="sticky top-0 z-10 transition-all duration-300">
            <div className="hidden md:block container mx-auto p-4">
                <div className="flex flex-row items-center gap-0 sm:justify-between">
                    {/* Logo - Full width on mobile, normal on desktop */}
                    <div className='px-5 py-3 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border-none shadow-lg relative overflow-hidden'>
                        <Link href="/" aria-label="Home">
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={96}
                                height={34}
                                priority
                                className="transition-all duration-300 brightness-100 contrast-100 dark:brightness-110 dark:contrast-100 dark:invert dark:filter dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
                            />
                        </Link>
                    </div>

                    {/* Middle section - Menu and Search */}
                    <div className="flex flex-row items-center justify-center gap-2 w-auto order-2">
                        <div className="p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border-none shadow-lg relative overflow-hidden">
                            <MenuBar />
                        </div>
                        <Suspense fallback={<ExpandableSearchSkeleton />}>
                            <ExpandableSearch />
                        </Suspense>
                    </div>

                    {/* Icons section */}
                    <div className="p-4.5 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border-none shadow-lg relative overflow-hidden order-3">
                        <div className="flex items-center">
                            <div className="flex gap-2">
                                <Link href="/favorites" aria-label="Favorites" title='Favorites'>
                                    <Heart className="h-5 w-5 hover:text-red-500 transition-colors bg-transparent" />
                                </Link>
                                <Link href="/watchlist" aria-label="Watchlist" title='Watchlist'>
                                    <Bookmark className="h-5 w-5 hover:text-blue-500 transition-colors bg-transparent" />
                                </Link>
                                <AnimatedThemeToggler className="cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MobileNavClient />
        </header>
    )
}

export default Header