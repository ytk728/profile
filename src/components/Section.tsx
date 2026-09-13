import Reveal from "@/components/Reveal";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
};

export default function Section({ id, index, title, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-border-soft py-24 md:py-32">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <div className="flex items-baseline gap-6">
            <span className="label-type text-accent">{index}</span>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
            <span className="h-px flex-1 bg-border" />
          </div>
        </Reveal>
        <Reveal delayMs={80} className="mt-12">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
