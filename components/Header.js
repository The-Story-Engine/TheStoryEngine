import Link from "next/link";
import { useRouter } from "next/router";
import LogoSVG from "public/logo_banner.svg";

export default function Header({ buttons = null }) {
  const { pathname } = useRouter();
  const logo = (
    <>
      <LogoSVG
        title="The Story Engine"
        className="hidden sm:block h-14"
        style={{ transform: "translateY(-0.3rem)" }}
      />
      <img
        className="relative h-16 sm:hidden bottom-1"
        src="/stacked-logo.png"
      />
    </>
  );
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 pt-5 pb-5 space-x-3">
      {pathname !== "/" ? (
        <Link href="/">
          <a aria-label="Home">{logo}</a>
        </Link>
      ) : (
        logo
      )}
      <div className="flex-shrink-0 max-h-14">{buttons}</div>
    </div>
  );
}
