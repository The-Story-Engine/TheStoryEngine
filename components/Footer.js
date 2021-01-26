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
      className="flex items-center justify-center w-12"
    >
      <img alt="Instagram Logo" src="/instagram.png" />
    </a>
  );
};
const Facebook = ({
  href = "https://www.facebook.com/TheInspirationalJellyfish/",
  target = "blank",
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
      className="flex items-center justify-center w-12"
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
  href = "https://twitter.com/InspirationalJF/",
  target = "blank",
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
      className="flex items-center justify-center w-12"
    >
      <img alt="Twitter Logo" src="/twitter.png" className="relative" />
    </a>
  );
};
export default function Footer() {
  const linkRef = useRef();
  const { linkProps } = useLink(
    { href: "https://tse.fish", target: "_blank", rel: "noopener" },
    linkRef
  );
  return (
    <footer className="bg-white">
      <div className="flex flex-col items-center px-8 py-12 mx-8 space-y-8 border-t-2 border-gray-400 lg:mx-16">
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <Instagram />
            <Facebook />
            <Twitter />
          </div>
          <p className="max-w-sm text-sm">
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
            href="https://tse.fish"
          >
            TSE Ventures Limited
          </a>
        </div>
      </div>
    </footer>
  );
}
