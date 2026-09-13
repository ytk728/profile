import careerData from "./career.json";

export type CareerRole = {
  title: string;
  details: string[];
};

export type CareerEntry = {
  organization: string;
  initial: string;
  period: string;
  roles: CareerRole[];
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export const careerTimeline: CareerEntry[] = [...careerData.work, ...careerData.education];

export const skillCategories: SkillCategory[] = careerData.skills;
