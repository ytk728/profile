import type { Experience } from "@/data/experiences";

export default function ExperienceTimelineItem({ organization, period, roles }: Experience) {
  return (
    <li className="group grid gap-3 border-b border-border-soft py-8 transition-colors hover:bg-surface md:grid-cols-[15rem_1fr] md:gap-8 md:px-4">
      <div className="flex items-start gap-3 md:pt-2">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
        <span className="meta-type text-subtle">{period}</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
          {organization}
        </h3>
        <div className="mt-4 space-y-3">
          {roles.map(({ title, achievements }) => (
            <div key={title} className="flex flex-col gap-1 md:flex-row md:gap-6">
              <p className="shrink-0 text-sm font-semibold text-accent md:w-48">{title}</p>
              <div className="text-muted">
                {achievements.map((achievement) => (
                  <p key={achievement}>{achievement}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}
