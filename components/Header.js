import Link from "next/link";
import LogoSVG from "public/logo_banner.svg";

export default function Header({ buttons = null }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-5 space-x-3 md:w-page">
      <Link href="/">
        <a aria-label="Home" className="flex-shrink max-h-14">
          <LogoSVG
            className="block max-h-16"
            style={{ transform: "translateY(-0.5rem)" }}
          />
        </a>
      </Link>
      <div className="flex-shrink-0 max-h-14">{buttons}</div>
    </div>
  );
}
