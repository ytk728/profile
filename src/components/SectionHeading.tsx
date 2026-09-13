type SectionHeadingProps = {
  children: React.ReactNode;
  align?: "center" | "left";
};

export default function SectionHeading({ children, align = "center" }: SectionHeadingProps) {
  return (
    <h2
      className={`text-4xl md:text-5xl font-bold mb-16 text-primary ${align === "center" ? "text-center" : ""}`}
    >
      {children}
    </h2>
  );
}
