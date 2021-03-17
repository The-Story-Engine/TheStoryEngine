import Link from "next/link";
import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function LinkButtonLarge({ href, children }) {
  const ref = useRef();
  const { aProps } = useButton({ elementType: "a" }, ref);
  return (
    <Link href={href}>
      <motion.a
        {...aProps}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        className="inline-flex items-center px-16 py-3 font-bold border-solid rounded-full shadow-sm cursor-pointer border-3 text-story md:px-20 md:py-4 md:text-b1 bg-foam border-emperor hover:text-emperor-600 hover:bg-foam-400"
      >
        {children}
      </motion.a>
    </Link>
  );
}
