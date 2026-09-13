const ICON_ASSET_PATHS = {
  menu: "/icons/menu.svg",
  close: "/icons/close.svg",
  sun: "/icons/sun.svg",
  moon: "/icons/moon.svg",
  github: "/icons/github.svg",
  linkedin: "/icons/linkedin.svg",
} as const;

export type IconName = keyof typeof ICON_ASSET_PATHS;

type IconProps = {
  name: IconName;
  className?: string;
};

export default function Icon({ name, className = "w-6 h-6" }: IconProps) {
  const maskedAssetUrl = `url(${ICON_ASSET_PATHS[name]})`;

  return (
    <span
      aria-hidden="true"
      className={`icon-masked-asset ${className}`}
      style={{ maskImage: maskedAssetUrl, WebkitMaskImage: maskedAssetUrl }}
    />
  );
}
