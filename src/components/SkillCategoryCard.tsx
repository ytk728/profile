import type { SkillCategory } from "@/data/skillCategories";

export default function SkillCategoryCard({ name, skills }: SkillCategory) {
  return (
    <div className="bg-background p-8">
      <h3 className="label-type text-subtle">{name}</h3>
      <ul className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="border border-border px-3 py-1.5 font-mono text-sm text-muted transition-colors hover:border-primary hover:text-primary"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
