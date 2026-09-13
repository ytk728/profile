import ExperienceTimelineItem from "@/components/ExperienceTimelineItem";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { EXPERIENCES } from "@/data/experiences";

const TIMELINE_LINE_HEIGHT_STOPPING_BEFORE_LAST_ITEM = "calc(100% - 120px)";

export default function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading>Experience</SectionHeading>
      <div className="relative">
        <div
          className="absolute left-6 top-0 w-0.5 bg-primary/30"
          style={{ height: TIMELINE_LINE_HEIGHT_STOPPING_BEFORE_LAST_ITEM }}
        />
        <div className="space-y-8">
          {EXPERIENCES.map((experience) => (
            <ExperienceTimelineItem key={experience.organization} {...experience} />
          ))}
        </div>
      </div>
    </Section>
  );
}
