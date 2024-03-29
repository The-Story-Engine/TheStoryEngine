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
        className="inline-flex items-center px-10 py-2 font-semibold text-center border-solid shadow-sm cursor-pointer text-b2 border-3 rounded-3xl bg-foam disabled:bg-wild-sand disabled:cursor-default disabled:text-emperor hover:bg-foam-400 border-emperor hover:text-emperor-600"
      >
        {children}
      </motion.a>
    </Link>
  );
}
