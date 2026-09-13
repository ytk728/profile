import Icon from "@/components/Icon";
import type { SocialLink } from "@/data/socialLinks";

const EMPHASIS_CLASS_NAMES = {
  solid: "bg-primary text-on-primary hover:bg-primary-dark",
  outline: "border border-primary text-primary hover:bg-primary hover:text-on-primary",
} as const;

export default function SocialLinkButton({ label, href, icon, emphasis }: SocialLink) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-40 py-3 rounded-full transition-colors font-medium inline-flex items-center justify-center ${EMPHASIS_CLASS_NAMES[emphasis]}`}
    >
      <Icon name={icon} className="w-5 h-5 mr-2" />
      {label}
    </a>
  );
}
