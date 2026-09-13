import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SocialLinkButton from "@/components/SocialLinkButton";
import { PROFILE } from "@/data/profile";
import { SOCIAL_LINKS } from "@/data/socialLinks";

export default function ContactSection() {
  return (
    <Section id="contact" contentClassName="text-center">
      <SectionHeading>Contact</SectionHeading>
      <div className="bg-surface p-8 rounded-lg border border-primary/20">
        <p className="text-2xl text-muted mb-8">{PROFILE.contactMessage}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {SOCIAL_LINKS.map((socialLink) => (
            <SocialLinkButton key={socialLink.label} {...socialLink} />
          ))}
        </div>
      </div>
    </Section>
  );
}
