"use client";

import { PROFILE } from "@/data/profile";

const formatCurrentYearInJapan = () =>
  new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Tokyo", year: "numeric" }).format(new Date());

export default function SiteFooter() {
  return (
    <footer className="py-8 bg-surface border-t border-primary/20">
      <div className="container mx-auto px-6 text-center">
        <p className="text-subtle" suppressHydrationWarning>
          © {formatCurrentYearInJapan()} {PROFILE.name}
        </p>
      </div>
    </footer>
  );
}
