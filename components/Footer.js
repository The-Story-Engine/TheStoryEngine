import { useLink } from "react-aria";
import { useRef } from "react";

const Instagram = () => {
  const ref = useRef();
  const { linkProps } = useLink(
    {
      href: "https://www.instagram.com/theinspirationaljellyfish/",
      target: "_blank",
    },
    ref
  );
  return (
    <a
      ref={ref}
      href="https://www.instagram.com/theinspirationaljellyfish/"
      target="blank"
      {...linkProps}
      className="flex items-center justify-center w-10"
    >
      <img alt="Instagram Logo" src="/instagram.png" />
    </a>
  );
};
const Facebook = ({
  href = "https://www.facebook.com/TheInspirationalJellyfish/",
  target = "_blank",
  rel = "noopener",
}) => {
  const ref = useRef();
  const { linkProps } = useLink({ href, target, rel }, ref);
  return (
    <a
      {...linkProps}
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className="flex items-center justify-center w-10"
    >
      <img
        alt="Facebook Logo"
        src="/facebook.png"
        className="relative"
        style={{ top: "2px" }}
      />
    </a>
  );
};
const Twitter = ({
  href = "https://twitter.com/TSEjellyfish/",
  target = "_blank",
  rel = "noopener",
}) => {
  const ref = useRef();
  const { linkProps } = useLink({ href, target, rel }, ref);
  return (
    <a
      {...linkProps}
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className="flex items-center justify-center w-10"
    >
      <img alt="Twitter Logo" src="/twitter.png" className="relative" />
    </a>
  );
};
const Ministry = ({
  href = "https://ministryofstories.org/",
  target = "_blank",
  rel = "noopener",
}) => {
  const ref = useRef();
  const { linkProps } = useLink({ href, target, rel }, ref);
  return (
    <a
      {...linkProps}
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className="flex items-center justify-center h-9"
    >
      <img
        alt="Ministry of Stories Logo"
        src="/ministry-small.jpg"
        className="h-full"
      />
    </a>
  );
};
const Innovate = ({
  href = "https://www.ukri.org/councils/innovate-uk/",
  target = "_blank",
  rel = "noopener",
}) => {
  const ref = useRef();
  const { linkProps } = useLink({ href, target, rel }, ref);
  return (
    <a
      {...linkProps}
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className="flex items-center justify-center h-9"
    >
      <img
        alt="Innovate UK Logo"
        src="/innovateuk-small.jpg"
        className="h-full"
      />
    </a>
  );
};
export default function Footer({ isWide }) {
  const linkRef = useRef();
  const { linkProps } = useLink(
    { href: "https://tseventures.com", target: "_blank", rel: "noopener" },
    linkRef
  );
  return (
    <footer className="bg-white">
      <div className="flex flex-col items-center px-8 py-12 mx-8 space-y-8 border-t-2 border-silver-chalice lg:mx-16">
        <div
          className={`flex flex-wrap items-center justify-center space-y-4 ${
            isWide ? "xl:space-x-6 xl:space-y-0" : ""
          }`}
        >
          <div className="flex flex-wrap items-center justify-center space-x-6 space-y-4 sm:space-y-0">
            <div className="flex-shrink-0 space-y-1">
              <p className="text-caption">Inspired By</p>
              <Ministry />
            </div>
            <div className="flex-shrink-0 space-y-1">
              <p className="text-caption">Funded By</p>
              <Innovate />
            </div>
            <div className="flex flex-shrink-0 space-x-2">
              <Instagram />
              <Facebook />
              <Twitter />
            </div>
          </div>
          <p
            className={`max-w-sm text-chat text-center ${
              isWide ? "xl:text-left" : ""
            }`}
          >
            The Story Engine is a space for inspired creative writing. Write
            stories and copy them to paste anywhere. We’ll be adding features to
            help inspire you through 2021. To follow us use the links here.
          </p>
        </div>
        <div className="font-semibold text-center">
          © 2021,{" "}
          <a
            ref={linkRef}
            {...linkProps}
            target="_blank"
            rel="noopener"
            href="https://tseventures.com"
          >
            TSE Ventures Limited
          </a>
        </div>
      </div>
    </footer>
  );
}
