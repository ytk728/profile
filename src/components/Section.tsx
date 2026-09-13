type SectionProps = {
  id: string;
  tone?: "base" | "surface";
  contentClassName?: string;
  children: React.ReactNode;
};

export default function Section({
  id,
  tone = "base",
  contentClassName = "",
  children,
}: SectionProps) {
  return (
    <section id={id} className={`py-20 ${tone === "surface" ? "bg-surface" : ""}`}>
      <div className="container mx-auto px-6">
        <div className={`max-w-6xl mx-auto ${contentClassName}`}>{children}</div>
      </div>
    </section>
  );
}
