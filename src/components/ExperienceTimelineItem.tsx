import type { Experience } from "@/data/experiences";

export default function ExperienceTimelineItem({
  organization,
  organizationInitial,
  period,
  roles,
}: Experience) {
  return (
    <div className="flex items-start space-x-4 relative">
      <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary font-bold relative z-10">
        {organizationInitial}
      </div>
      <div className="flex-1 bg-surface p-6 rounded-lg border border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-xl font-bold text-primary">{organization}</h3>
          <span className="text-sm text-subtle">{period}</span>
        </div>
        {roles.map(({ title, achievements }, roleIndex) => (
          <div key={title}>
            <p className="text-primary font-semibold mb-2">{title}</p>
            <div
              className={`text-muted text-base space-y-1 ${roleIndex < roles.length - 1 ? "mb-3" : ""}`}
            >
              {achievements.map((achievement) => (
                <p key={achievement}>{achievement}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
