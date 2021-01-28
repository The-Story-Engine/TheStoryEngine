import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function Button({
  noStyle = false,
  className,
  children,
  ...props
}) {
  const ref = useRef();
  const { buttonProps } = useButton(props, ref);
  return (
    <motion.button
      {...buttonProps}
      className={`${
        noStyle
          ? ""
          : "inline-flex items-center px-8 py-2 text-lg font-semibold text-center border-2 border-solid shadow-sm rounded-3xl text-l bg-bloo-500 hover:bg-bloo-400 border-grey-700 hover:text-gray-700"
      } ${className}`}
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
    >
      {children}
    </motion.button>
  );
}
