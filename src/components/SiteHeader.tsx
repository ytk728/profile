"use client";

import { useEffect, useRef, useState } from "react";
import DevThemeToggle from "@/components/DevThemeToggle";
import Icon from "@/components/Icon";
import { NAVIGATION_ITEMS } from "@/data/navigationItems";
import { PROFILE } from "@/data/profile";

const isDevThemeToggleEnabled = process.env.NODE_ENV === "development";

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mobileNav = mobileNavRef.current;
    if (!mobileNav) return;
    const closeMobileMenuOnNavigation = () => setIsMobileMenuOpen(false);
    mobileNav.addEventListener("click", closeMobileMenuOnNavigation);
    return () => mobileNav.removeEventListener("click", closeMobileMenuOnNavigation);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-8 py-6 flex justify-between items-center">
        <button
          type="button"
          onClick={scrollToTop}
          className="text-3xl font-bold text-primary cursor-pointer hover:text-primary-dark transition-colors"
        >
          {PROFILE.name}
        </button>
        <nav className="hidden md:flex space-x-8 text-2xl">
          {NAVIGATION_ITEMS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {label}
            </a>
          ))}
        </nav>
        {isDevThemeToggleEnabled && (
          <div className="hidden md:block">
            <DevThemeToggle />
          </div>
        )}
        <div className="md:hidden flex items-center gap-1">
          {isDevThemeToggleEnabled && <DevThemeToggle />}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="text-primary p-2 rounded-md hover:bg-primary/10 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <div
        className={`md:hidden bg-background border-b border-primary/20 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav ref={mobileNavRef} className="container mx-auto px-8 py-4 space-y-4">
          {NAVIGATION_ITEMS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="block text-xl hover:text-primary transition-colors cursor-pointer"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
