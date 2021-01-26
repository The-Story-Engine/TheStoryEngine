import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { motion } from "framer-motion";
import ArrowSVG from "public/arrow.svg";

export default function Button({
  noStyle = false,
  className,
  children,
  direction = right,
  ...props
}) {
  const ref = useRef();
  const { buttonProps } = useButton(props, ref);
  const variants = {
    left: { rotate: 180 },
    right: { rotate: 0 },
  };
  return (
    <motion.button
      {...buttonProps}
      className={`w-8 h-8 ${className}`}
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      variants={variants}
      animate={direction}
      transition={{ duration: 0.5 }}
    >
      <ArrowSVG className="w-full h-full" title="Arrow" />
    </motion.button>
  );
}
