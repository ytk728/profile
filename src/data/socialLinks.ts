import type { IconName } from "@/components/Icon";

export type SocialLink = {
  label: string;
  href: string;
  icon: IconName;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/ytk728",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ytk-mac",
    icon: "linkedin",
  },
];
