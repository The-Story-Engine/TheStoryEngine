import JellyfishSVG from "public/jellyfish.svg";
import { useTranslation } from "next-i18next";

export default function InkJellyfish({ className = "" }) {
  const { t } = useTranslation("common");
  return (
    <JellyfishSVG
      title={t("SVG_ALT.JELLYFISH")}
      className={`bg-no-repeat bg-ink bg-jf-tl bg-50% ${className}`}
    />
  );
}
