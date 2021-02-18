import Link from "next/link";
import { useRouter } from "next/router";
import LogoSVG from "public/logo_banner.svg";
import { useTranslation } from "next-i18next";

const NavLink = ({ path, render }) => {
  const { pathname } = useRouter();
  return pathname !== `/${path}` ? (
    <Link href={`/${path}`}>
      <a>{render(false)}</a>
    </Link>
  ) : (
    render(true)
  );
};

export default function Header({ buttons = null }) {
  const { pathname } = useRouter();
  const { t } = useTranslation("common");
  const logo = (
    <>
      <LogoSVG
        title="The Story Engine"
        className="hidden sm:block h-14"
        style={{ transform: "translateY(-0.3rem)" }}
      />
      <img
        className="relative h-16 sm:hidden bottom-1"
        src="/logo_stacked.png"
      />
    </>
  );
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 pt-5 pb-5">
      <nav className="flex items-center space-x-2">
        <div className="mr-8">
          <NavLink path="" render={() => logo} />
        </div>
        <NavLink
          path="our-story"
          render={(isCurrent) => (
            <span className={`p-3 text-h3${isCurrent ? " font-bold" : ""}`}>
              {t("PAGE_NAMES.OUR_STORY")}
            </span>
          )}
        />
      </nav>
      <div className="flex-shrink-0 ml-3 max-h-14">{buttons}</div>
    </div>
  );
}
