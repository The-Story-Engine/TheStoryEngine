import Link from "next/link";
import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function LinkButton({ href, children }) {
  const ref = useRef();
  const { aProps } = useButton({ elementType: "a" }, ref);
  return (
    <Link href={href}>
      <motion.a
        {...aProps}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        className="inline-flex items-center px-16 py-3 mt-8 text-xl font-bold border-solid rounded-full shadow-sm cursor-pointer md:px-20 md:py-4 md:text-2xl md:mt-14 border-6 bg-foam border-emperor hover:text-emperor-600 hover:bg-foam-400"
      >
        {children}
      </motion.a>
    </Link>
  );
}
