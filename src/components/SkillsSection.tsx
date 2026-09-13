import Section from "@/components/Section";
import SkillCategoryCard from "@/components/SkillCategoryCard";
import { SKILL_CATEGORIES } from "@/data/skillCategories";

export default function SkillsSection() {
  return (
    <Section id="skills" index="03" title="Skills">
      <div className="grid gap-px bg-border sm:grid-cols-2">
        {SKILL_CATEGORIES.map((skillCategory) => (
          <SkillCategoryCard key={skillCategory.name} {...skillCategory} />
        ))}
      </div>
    </Section>
  );
}
