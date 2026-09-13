import Icon from "@/components/Icon";
import type { SocialLink } from "@/data/socialLinks";

export default function SocialLinkButton({ label, href, icon }: SocialLink) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between border-b border-border-soft py-6 transition-colors hover:text-primary md:px-4"
    >
      <span className="flex items-center gap-4">
        <Icon name={icon} className="h-5 w-5" />
        <span className="text-lg font-medium">{label}</span>
      </span>
      <span className="label-type text-subtle transition-transform group-hover:translate-x-1 group-hover:text-primary">
        Visit ↗
      </span>
    </a>
  );
}
