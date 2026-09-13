import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SkillCategoryCard from "@/components/SkillCategoryCard";
import { SKILL_CATEGORIES } from "@/data/skillCategories";

export default function SkillsSection() {
  return (
    <Section id="skills" tone="surface">
      <SectionHeading>Skills</SectionHeading>
      <div className="bg-surface-alt p-8 rounded-lg border border-primary/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((skillCategory) => (
            <SkillCategoryCard key={skillCategory.name} {...skillCategory} />
          ))}
        </div>
      </div>
    </Section>
  );
}
