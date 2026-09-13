import Section from "@/components/Section";
import SocialLinkButton from "@/components/SocialLinkButton";
import { PROFILE } from "@/data/profile";
import { SOCIAL_LINKS } from "@/data/socialLinks";

export default function ContactSection() {
  return (
    <Section id="contact" index="04" title="Contact">
      <p className="display-type text-[clamp(2.25rem,7vw,4.5rem)] text-primary">
        {PROFILE.contactMessage}
      </p>
      <div className="mt-12 border-t border-border-soft">
        {SOCIAL_LINKS.map((socialLink) => (
          <SocialLinkButton key={socialLink.label} {...socialLink} />
        ))}
      </div>
    </Section>
  );
}
