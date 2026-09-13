import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { PROFILE } from "@/data/profile";

export default function AboutSection() {
  return (
    <Section id="about" tone="surface">
      <SectionHeading>About Me</SectionHeading>
      <div className="bg-surface-alt p-8 rounded-lg border border-primary/20">
        <p className="text-lg text-muted leading-relaxed">{PROFILE.about}</p>
      </div>
    </Section>
  );
}
