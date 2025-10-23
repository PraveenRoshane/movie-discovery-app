"use client"

import dynamic from 'next/dynamic'

const MobileNav = dynamic(() => import('./mobile-nav').then((mod) => mod.MobileNav), {
    ssr: false,
    loading: () => null,
})

export function MobileNavClient() {
    return <MobileNav />
}