"use client";

import { PROFILE } from "@/data/profile";

const formatCurrentYearInJapan = () =>
  new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Tokyo", year: "numeric" }).format(new Date());

export default function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="label-type text-subtle" suppressHydrationWarning>
          © {formatCurrentYearInJapan()} {PROFILE.name}
        </p>
        <p className="label-type text-subtle">{PROFILE.location}</p>
      </div>
    </footer>
  );
}
