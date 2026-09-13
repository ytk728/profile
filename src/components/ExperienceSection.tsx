import ExperienceTimelineItem from "@/components/ExperienceTimelineItem";
import Section from "@/components/Section";
import { EXPERIENCES } from "@/data/experiences";

export default function ExperienceSection() {
  return (
    <Section id="experience" index="02" title="Experience">
      <ol className="border-t border-border-soft">
        {EXPERIENCES.map((experience) => (
          <ExperienceTimelineItem key={experience.organization} {...experience} />
        ))}
      </ol>
    </Section>
  );
}
