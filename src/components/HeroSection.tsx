import Image from "next/image";
import TokyoClock from "@/components/TokyoClock";
import { PROFILE } from "@/data/profile";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image src="/background.png" alt="" fill priority sizes="100vw" className="hero-photo" />
        <div className="hero-scrim absolute inset-0" />
        <div className="city-scanlines absolute inset-0" />
        <div className="city-glow absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-32 pb-14 md:pb-20">
        <p className="label-type text-primary">
          {PROFILE.name} — {PROFILE.location}
        </p>
        <h1 className="display-type mt-6">
          <span className="block">{PROFILE.headlineLead}</span>
          <span className="display-type-outlined block">{PROFILE.headlineTrail}</span>
        </h1>
        <p className="phrase-wrapped-japanese mt-8 max-w-md text-muted">{PROFILE.about}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#about"
            className="label-type border border-primary px-6 py-3 text-primary transition-colors hover:bg-primary hover:text-on-primary"
          >
            Explore
          </a>
          <a href="#contact" className="label-type neon-underline text-foreground">
            Get in touch
          </a>
        </div>
      </div>

      <div className="relative z-10 border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <TokyoClock />
          <span className="label-type text-subtle">Scroll ↓</span>
        </div>
      </div>
    </section>
  );
}
