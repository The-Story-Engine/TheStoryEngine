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
          : "inline-flex items-center px-14 py-2 text-b2 font-semibold text-center border-3 border-solid shadow-sm rounded-3xl bg-foam disabled:bg-wild-sand disabled:cursor-default disabled:text-emperor hover:bg-foam-400 border-emperor hover:text-emperor-600"
      } ${className}`}
      ref={ref}
      whileHover={props.isDisabled ? null : { scale: 1.05 }}
      whileTap={props.isDisabled ? null : { scale: 1 }}
    >
      {children}
    </motion.button>
  );
}
