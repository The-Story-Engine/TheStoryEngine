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
export default function Footer() {
  const linkRef = useRef();
  const { linkProps } = useLink(
    { href: "https://tse.fish", target: "_blank", rel: "noopener" },
    linkRef
  );
  console.log({ linkProps });
  return (
    <footer className="bg-white">
      <div className="flex flex-col items-center px-8 py-12 mx-8 space-y-8 border-t-2 border-gray-400 lg:mx-16">
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <Instagram />
            <Facebook />
          </div>
          <p className="max-w-sm text-sm">
            The Story Engine is a space for inspired creative writing. Write
            stories and copy them to paste anywhere. We're excited to add
            features to help inspire you through 2021 as the jellyfish grows.
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
