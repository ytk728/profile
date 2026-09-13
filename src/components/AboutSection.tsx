import Section from "@/components/Section";
import { PROFILE } from "@/data/profile";

export default function AboutSection() {
  const profileFacts = [
    { label: "Base", value: PROFILE.location },
    { label: "Role", value: PROFILE.title },
    { label: "Focus", value: PROFILE.focus },
  ];

  return (
    <Section id="about" index="01" title="About">
      <div className="grid items-start gap-12 md:grid-cols-[1.6fr_1fr]">
        <p className="phrase-wrapped-japanese border-l-2 border-primary pl-6 text-xl leading-relaxed text-muted md:text-2xl">
          {PROFILE.about}
        </p>
        <dl className="space-y-5">
          {profileFacts.map(({ label, value }) => (
            <div key={label} className="border-b border-border-soft pb-4">
              <dt className="label-type text-subtle">{label}</dt>
              <dd className="mt-2">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
