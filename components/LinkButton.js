import Link from "next/link";
import { useButton } from "@react-aria/button";
import { useRef } from "react";

export default function LinkButton({ href, children }) {
  const ref = useRef();
  const { aProps } = useButton({ elementType: "a" }, ref);
  return (
    <Link href={href}>
      <a
        {...aProps}
        className="inline-flex items-center px-16 py-3 mt-8 text-xl font-bold border-solid rounded-full shadow-sm md:px-20 md:py-4 md:text-2xl md:mt-14 border-6 bg-bloo-500 border-grey-700"
      >
        {children}
      </a>
    </Link>
  );
}
