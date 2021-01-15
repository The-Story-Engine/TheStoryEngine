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
        className="inline-flex items-center px-20 py-4 text-2xl font-bold border-solid rounded-full shadow-sm mt-14 border-6 bg-bloo-500 border-grey-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {children}
      </a>
    </Link>
  );
}
