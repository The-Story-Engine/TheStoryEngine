import Link from "next/link";
import { useRouter } from "next/router";
import LogoSVG from "public/logo_banner.svg";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import Button from "@components/Button";

const MobileMenuButton = ({ isOpen = false, toggle }) => {
  const { t } = useTranslation("common");
  return (
    <Button
      ariaLabel={t("MOBILE_MENU.TOGGLE_LABEL")}
      onPress={toggle}
      noStyle={true}
      className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      ariaExpanded={isOpen}
    >
      <svg
        className={`h-8 w-8${isOpen ? " hidden" : " block"}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg
        className={`h-8 w-8${isOpen ? " block" : " hidden"}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </Button>
  );
};

const NavLink = ({ path, render, className }) => {
  const { pathname } = useRouter();
  return pathname !== `/${path}` ? (
    <Link href={`/${path}`}>
      <a className={className}>{render(false)}</a>
    </Link>
  ) : (
    <span className={className}>{render(true)}</span>
  );
};

export default function Header({ buttons = null }) {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="absolute top-0 left-0 right-0 z-30">
      <div className="flex items-center justify-between px-5 pt-5 pb-5">
        <span>
          <div className="absolute flex items-center top-6 left-5 sm:hidden">
            <MobileMenuButton
              toggle={() => setIsOpen(!isOpen)}
              isOpen={isOpen}
            />
          </div>
        </span>
        <span className="sm:hidden">
          <NavLink path="" render={() => logo} />
        </span>
        <nav className="items-center hidden space-x-2 sm:flex sm:flex-grow">
          <div className="mr-8">
            <NavLink path="" render={() => logo} />
          </div>
          <NavLink
            path="workspaces"
            className="p-3 text-h3"
            render={(isCurrent) => (
              <span className={`${isCurrent ? " font-bold" : ""}`}>
                {t("PAGE_NAMES.WORKSPACES")}
              </span>
            )}
          />
          <NavLink
            path="our-story"
            className="p-3 text-h3"
            render={(isCurrent) => (
              <span className={`${isCurrent ? " font-bold" : ""}`}>
                {t("PAGE_NAMES.OUR_STORY")}
              </span>
            )}
          />
          <NavLink
            path="roadmap"
            className="p-3 text-h3"
            render={(isCurrent) => (
              <span className={`${isCurrent ? " font-bold" : ""}`}>
                {t("PAGE_NAMES.ROADMAP")}
              </span>
            )}
          />
        </nav>
        <div className="flex-shrink-0 ml-3 max-h-14">{buttons}</div>
      </div>
      <div
        className={`${
          isOpen ? "relative" : "hidden"
        } -top-2 sm:hidden w-full pb-6 px-4 space-y-3 flex flex-col bg-gray-100`}
      >
        <NavLink
          path=""
          className="px-3 py-1 text-h3"
          render={(isCurrent) => (
            <span className={`${isCurrent ? " font-bold" : ""}`}>
              {t("PAGE_NAMES.HOME")}
            </span>
          )}
        />
        <NavLink
          path="workspaces"
          className="p-3 text-h3"
          render={(isCurrent) => (
            <span className={`${isCurrent ? " font-bold" : ""}`}>
              {t("PAGE_NAMES.WORKSPACES")}
            </span>
          )}
        />
        <NavLink
          path="our-story"
          className="px-3 py-1 text-h3"
          render={(isCurrent) => (
            <span className={`${isCurrent ? " font-bold" : ""}`}>
              {t("PAGE_NAMES.OUR_STORY")}
            </span>
          )}
        />
        <NavLink
          path="roadmap"
          className="p-3 text-h3"
          render={(isCurrent) => (
            <span className={`${isCurrent ? " font-bold" : ""}`}>
              {t("PAGE_NAMES.ROADMAP")}
            </span>
          )}
        />
      </div>
    </div>
  );
}
