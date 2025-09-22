"use client";

import { Moon, SunDim } from "lucide-react";
import { useState, useRef } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const { setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const changeTheme = async () => {
    if (!buttonRef.current) return;

    const nextIsDark = !isDarkMode;

    if (typeof document !== 'undefined' && document.startViewTransition) {
      try {
        await document.startViewTransition(() => {
          flushSync(() => {
            document.documentElement.classList.toggle('dark', nextIsDark);
            setIsDarkMode(nextIsDark);
            setTheme(nextIsDark ? "dark" : "light");
          });
        }).ready;

        const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
        const y = top + height / 2;
        const x = left + width / 2;

        const right = window.innerWidth - left;
        const bottom = window.innerHeight - top;
        const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRad}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      } catch (e) {
        console.warn('View transition failed:', e);
        // Fallback
        flushSync(() => {
          document.documentElement.classList.toggle('dark', nextIsDark);
          setIsDarkMode(nextIsDark);
          setTheme(nextIsDark ? "dark" : "light");
        });
      }
    } else {
      // Direct toggle for unsupported browsers
      flushSync(() => {
        document.documentElement.classList.toggle('dark', nextIsDark);
        setIsDarkMode(nextIsDark);
        setTheme(nextIsDark ? "dark" : "light");
      });
    }
  };
  return (
    <button ref={buttonRef} onClick={changeTheme} className={cn(className)} aria-label="Toggle theme">
      {isDarkMode ? <SunDim className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};
