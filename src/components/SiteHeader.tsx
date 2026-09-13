"use client";

import { useEffect, useRef, useState } from "react";
import DevThemeToggle from "@/components/DevThemeToggle";
import Icon from "@/components/Icon";
import { NAVIGATION_ITEMS } from "@/data/navigationItems";
import { PROFILE } from "@/data/profile";

const isDevThemeToggleEnabled = process.env.NODE_ENV === "development";
const SCROLLED_PAST_HERO_THRESHOLD_PX = 24;

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mobileNav = mobileNavRef.current;
    if (!mobileNav) return;
    const closeMobileMenuOnNavigation = () => setIsMobileMenuOpen(false);
    mobileNav.addEventListener("click", closeMobileMenuOnNavigation);
    return () => mobileNav.removeEventListener("click", closeMobileMenuOnNavigation);
  }, []);

  useEffect(() => {
    const syncScrolledState = () =>
      setHasScrolled(window.scrollY > SCROLLED_PAST_HERO_THRESHOLD_PX);
    syncScrolledState();
    window.addEventListener("scroll", syncScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", syncScrolledState);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-300 ${
        hasScrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
        <button
          type="button"
          onClick={scrollToTop}
          className="label-type cursor-pointer text-foreground transition-colors hover:text-primary"
        >
          {PROFILE.name}
        </button>
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-8 md:flex">
            {NAVIGATION_ITEMS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="label-type neon-underline cursor-pointer text-subtle transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
          {isDevThemeToggleEnabled && <DevThemeToggle />}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="text-primary transition-colors hover:text-accent md:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div
        className={`overflow-hidden border-border bg-background/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? "max-h-72 border-b opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav ref={mobileNavRef} className="mx-auto w-full max-w-5xl px-6 py-4">
          {NAVIGATION_ITEMS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="label-type block cursor-pointer border-b border-border-soft py-4 text-subtle last:border-b-0"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
