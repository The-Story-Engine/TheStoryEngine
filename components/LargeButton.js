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
          : "inline-flex items-center px-16 py-3 font-bold border-solid rounded-full shadow-sm cursor-pointer border-3 text-story md:px-20 md:py-4 md:text-b1 bg-foam border-emperor hover:text-emperor-600 hover:bg-foam-400"
      } ${className}`}
      ref={ref}
      whileHover={props.isDisabled ? null : { scale: 1.05 }}
      whileTap={props.isDisabled ? null : { scale: 1 }}
    >
      {children}
    </motion.button>
  );
}
