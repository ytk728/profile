import Image from "next/image";
import { PROFILE } from "@/data/profile";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/background.png)",
          opacity: "var(--hero-image-opacity)",
        }}
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      <div className="container mx-auto px-6 text-center fade-in relative z-10">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary-dark p-1">
            <div className="w-full h-full rounded-full bg-surface-alt flex items-center justify-center overflow-hidden">
              <Image
                src={PROFILE.avatarSrc}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          {PROFILE.name}
        </h1>
        <p className="text-2xl md:text-3xl text-muted mb-8 max-w-2xl mx-auto">{PROFILE.title}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#about"
            aria-label="Learn more about ytk728"
            className="px-8 py-3 bg-primary text-on-primary rounded-full hover:bg-primary-dark transition-colors font-medium cursor-pointer"
          >
            Learn More
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-on-primary transition-colors font-medium cursor-pointer"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
