export type SkillCategory = {
  name: string;
  skills: string[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  { name: "Backend", skills: ["Java", "Spring Boot", "Node.js", "NestJS", "TypeScript"] },
  { name: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { name: "Middleware", skills: ["MySQL", "PostgreSQL", "Redis"] },
  { name: "Tools", skills: ["Git/GitHub", "AWS", "Docker", "Auth0"] },
];
