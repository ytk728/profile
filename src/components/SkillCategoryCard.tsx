import type { SkillCategory } from "@/data/skillCategories";

export default function SkillCategoryCard({ name, skills }: SkillCategory) {
  return (
    <div className="bg-surface p-4 rounded-lg text-left border border-primary/10">
      <div className="text-primary font-semibold text-left mb-2">{name}</div>
      <div className="text-base text-subtle">
        <ul className="list-disc list-inside space-y-1">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
