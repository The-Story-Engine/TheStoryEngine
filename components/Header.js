import Link from "next/link";
import LogoSVG from "public/logo_banner.svg";

export default function Header({ buttons = null }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 pt-5 pb-5 space-x-3">
      <Link href="/">
        <a aria-label="Home" className="flex-shrink max-h-14">
          <LogoSVG
            className="h-12 sm:h-14"
            style={{ transform: "translateY(-0.3rem)" }}
          />
        </a>
      </Link>
      <div className="flex-shrink-0 max-h-14">{buttons}</div>
    </div>
  );
}
